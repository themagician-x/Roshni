import { sfx } from "@/lib/sfx";
import { useState } from "react";
import { NUMBERS, urduNumberWord } from "@/content/numbers";
import { play } from "@/lib/audio";
import { spokenEn, spokenUr } from "@/lib/speech";
import { makeProblem, problemText, shuffleOptions } from "@/lib/testgen";
import type { Item, Lang, QuizQuestion } from "@/lib/types";
import { useUi } from "@/lib/ui";
import { Emo } from "@/components/Emo";
import { bareWord, glossOf } from "@/content/glossary";

const fontOf = (lang: Lang) => (lang === "ur" ? "ur" : "");

export function speakItem(item: Item, lang: Lang) {
  const text = lang === "ur" ? spokenUr(item) : spokenEn(item);
  return text ? play(lang, text) : undefined;
}

export const questionKey = (q: QuizQuestion) => q.prompt?.ur ?? q.prompt?.en ?? q.q ?? "";

export function SpeakerIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  );
}

export function Speak({ item, lang }: { item: Item; lang: Lang }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakItem(item, lang);
      }}
      className="inline-flex shrink-0 items-center rounded-full bg-accent-soft px-2.5 py-1.5 text-accent hover:bg-accent hover:text-white"
      aria-label="Listen"
    >
      <SpeakerIcon className="size-4" />
    </button>
  );
}

/** A single line of text in either language with its own listen button. */
export function Line({ item, lang, big }: { item: Item; lang: Lang; big?: boolean }) {
  const text = lang === "ur" ? item.ur : item.en;
  if (!text) return null;
  return (
    <span className={`inline-flex items-center gap-2 ${lang === "ur" ? "flex-row-reverse" : ""}`}>
      <span dir={lang === "ur" ? "rtl" : "ltr"} className={`${fontOf(lang)} ${big ? "text-2xl" : ""}`}>
        {text}
      </span>
      <Speak item={item} lang={lang} />
    </span>
  );
}

const SIZE = {
  xl: { grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", main: "text-7xl leading-[1.9]" },
  lg: { grid: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-7", main: "text-5xl leading-[2]" },
  md: { grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", main: "text-3xl" },
};

/** Urdu content is shown in Urdu only; English content keeps its Urdu meaning underneath. */
const showGloss = (lang: Lang) => lang === "en";

export function Cards({ items, lang, size = "md" }: { items: Item[]; lang: Lang; size?: keyof typeof SIZE }) {
  const other: Lang = lang === "ur" ? "en" : "ur";
  const gloss = showGloss(lang);
  const s = SIZE[size];
  return (
    <div className={`grid gap-3 ${s.grid}`} dir={lang === "ur" ? "rtl" : "ltr"}>
      {items.map((item, i) => (
        <div
          key={i}
          role="button"
          tabIndex={0}
          onClick={() => speakItem(item, lang)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), speakItem(item, lang))}
          className="group flex cursor-pointer flex-col items-center gap-1 rounded-2xl border border-line bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
        >
          {item.emoji && !item.word && <div className={size === "md" ? "text-3xl" : "text-4xl"}><Emo text={item.emoji} /></div>}
          <div className={`${fontOf(lang)} ${s.main} ${lang === "en" ? "leading-tight" : ""} text-ink`} dir={lang === "ur" ? "rtl" : "ltr"}>
            {lang === "ur" ? item.ur : item.en}
          </div>
          {gloss && item.roman && (
            <div className="text-sm text-muted" dir="ltr">
              {item.roman}
            </div>
          )}
          {gloss && item.ur && (
            <div className="mt-1 text-sm text-muted hover:text-accent" onClick={(e) => (e.stopPropagation(), speakItem(item, other))}>
              <span className={other === "ur" ? "ur text-lg" : ""} dir={other === "ur" ? "rtl" : "ltr"}>
                {other === "ur" ? item.ur : item.en}
              </span>
            </div>
          )}
          {item.word && (
            <div
              className="mt-2 flex w-full flex-col items-center rounded-xl bg-paper px-2 py-2 hover:bg-accent-soft"
              onClick={(e) => (e.stopPropagation(), speakItem(item.word!, lang))}
            >
              <span className="text-4xl">{item.word.emoji && <Emo text={item.word.emoji} />}</span>
              <span className={`${fontOf(lang)} text-2xl ${lang === "ur" ? "leading-[2.3]" : ""}`}>{lang === "ur" ? item.word.ur : item.word.en}</span>
              {gloss && (
                <span className="ur text-lg leading-[2] text-muted" dir="rtl">
                  {item.word.ur}
                </span>
              )}
            </div>
          )}
          {item.note && (
            <div className={`mt-1 text-muted ${lang === "ur" ? "ur text-sm" : "text-xs"}`} dir={lang === "ur" ? "rtl" : "ltr"}>
              {item.note}
            </div>
          )}
          <SpeakerIcon className="mt-1 size-4 text-muted opacity-0 transition group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}

/** A story as flowing paragraphs. Every sentence can be clicked to hear it; the one playing is highlighted. */
export function Paragraph({ lines, lang }: { lines: Item[]; lang: Lang }) {
  const [active, setActive] = useState<number | null>(null);
  const text = (item: Item) => (lang === "ur" ? item.ur : item.en) ?? "";
  // A closing moral ("سبق: …" / "Moral: …") stands on its own line.
  const isMoral = (item: Item) => /^(سبق|Moral)\s*:/.test(text(item));
  const body = lines.filter((l) => !isMoral(l));
  const morals = lines.filter(isMoral);

  function say(item: Item, i: number) {
    const a = speakItem(item, lang);
    setActive(i);
    const stop = () => setActive((cur) => (cur === i ? null : cur));
    a?.addEventListener("ended", stop);
    a?.addEventListener("pause", stop);
    a?.addEventListener("error", () => setTimeout(stop, 3000));
  }

  const sentence = (item: Item, i: number) => (
    <span
      key={i}
      role="button"
      tabIndex={0}
      onClick={() => say(item, i)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), say(item, i))}
      className={`cursor-pointer rounded-lg px-0.5 transition-colors ${active === i ? "bg-accent text-white" : "hover:bg-accent-soft hover:text-accent"}`}
    >
      {text(item)}
    </span>
  );

  return (
    <div
      className={`rounded-2xl border border-line bg-card px-6 py-5 ${lang === "ur" ? "ur text-2xl leading-[2.6]" : "text-xl leading-loose"}`}
      dir={lang === "ur" ? "rtl" : "ltr"}
    >
      <p>{body.map((item, i) => [i > 0 && " ", sentence(item, i)])}</p>
      {morals.map((item, j) => (
        <p key={j} className="mt-3 border-t border-line pt-3 font-bold text-accent">
          {sentence(item, body.length + j)}
        </p>
      ))}
    </div>
  );
}

/** An English sentence with the Urdu meaning printed under every word. Clicking a word speaks it. */
function WordByWord({ text }: { text: string }) {
  return (
    <span className="flex flex-wrap gap-x-2.5 gap-y-1" dir="ltr">
      {text.split(/\s+/).map((tok, i) => {
        const meaning = glossOf(tok);
        return (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              const w = bareWord(tok).toLowerCase();
              if (w) play("en", w);
            }}
            className="inline-flex flex-col items-center rounded-md px-0.5 hover:bg-accent-soft"
          >
            <span className="text-xl font-medium">{tok}</span>
            <span className="ur min-h-[2em] text-base leading-[2] text-ink/65" dir="rtl">
              {meaning ?? ""}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Phrases({ items, lang, plain }: { items: Item[]; lang: Lang; plain?: boolean }) {
  const gloss = showGloss(lang);
  if (lang === "en") {
    // English: word-by-word meanings under the sentence, then the whole sentence in Urdu.
    return (
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {items.map((item, i) => (
          <li key={i} onClick={() => speakItem(item, lang)} className="cursor-pointer px-4 py-3 hover:bg-paper">
            <div className="flex items-start gap-3">
              <span className="mt-1">
                <Speak item={item} lang={lang} />
              </span>
              {item.en && (plain ? <span className="text-xl font-medium">{item.en}</span> : <WordByWord text={item.en} />)}
            </div>
            {item.ur && !plain && (
              <div
                className="ur mt-1 text-right text-xl text-ink/80 hover:text-accent"
                dir="rtl"
                onClick={(e) => (e.stopPropagation(), speakItem(item, "ur"))}
              >
                {item.ur}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => speakItem(item, lang)}
            className="flex cursor-pointer flex-col gap-1 px-4 py-3 hover:bg-paper sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:flex-row-reverse"
          >
            <div className="flex flex-row-reverse items-center gap-3">
              <Speak item={item} lang={lang} />
              <span className={`${fontOf(lang)} text-2xl`} dir="rtl">
                {item.ur}
              </span>
            </div>
            {gloss && item.roman && <span className="text-sm text-muted italic">{item.roman}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OptionLabel({ item }: { item: Item }) {
  return (
    <span className="flex flex-col items-center gap-1">
      {item.emoji && <span className="text-4xl"><Emo text={item.emoji} /></span>}
      {item.ur && (
        <span className="ur text-2xl" dir="rtl">
          {item.ur}
        </span>
      )}
      {item.en && <span className={item.emoji ? "text-sm text-muted" : "text-lg"}>{item.en}</span>}
    </span>
  );
}

export function PromptButton({ q }: { q: QuizQuestion }) {
  if (!q.prompt) return null;
  const lang: Lang = q.prompt.ur ? "ur" : "en";
  return (
    <button
      type="button"
      onClick={() => speakItem(q.prompt!, lang)}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-semibold text-white hover:opacity-90"
    >
      <SpeakerIcon />
      {!q.listen && <span className={lang === "ur" ? "ur" : ""}>{q.prompt.ur ?? q.prompt.en}</span>}
    </button>
  );
}

const reshuffle = (qs: QuizQuestion[]) => qs.map(shuffleOptions).sort(() => Math.random() - 0.5);

export type QuizAnswer = { q: string; ok: boolean };

export function Quiz({
  questions,
  lang,
  passMark,
  passedBefore,
  onResult,
}: {
  questions: QuizQuestion[];
  lang: Lang;
  passMark: number;
  passedBefore?: boolean;
  onResult: (pct: number, answers: QuizAnswer[]) => void;
}) {
  const ui = useUi();
  const [qs, setQs] = useState(questions);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const score = picked.filter((p, i) => p === qs[i].answer).length;
  const finished = picked.every((p) => p !== null);
  const pct = Math.round((score / qs.length) * 100);
  const passed = finished && pct >= passMark;

  function choose(qi: number, oi: number) {
    const next = picked.map((v, i) => (i === qi ? oi : v));
    setPicked(next);
    if (oi === qs[qi].answer) sfx.correct();
    else sfx.wrong();
    if (next.every((p) => p !== null)) {
      const s = next.filter((p, i) => p === qs[i].answer).length;
      const finalPct = Math.round((s / qs.length) * 100);
      setTimeout(() => (finalPct >= passMark ? sfx.passed() : sfx.tryAgain()), 450);
      onResult(
        Math.round((s / qs.length) * 100),
        qs.map((q, i) => ({ q: questionKey(q), ok: next[i] === q.answer })),
      );
    }
  }

  return (
    <div className="space-y-4">
      {qs.map((q, qi) => {
        const p = picked[qi];
        return (
          <div key={`${qi}-${questionKey(q)}`} className="rounded-2xl border border-line bg-card p-4">
            <div className="mb-3 flex flex-wrap items-center gap-3" dir={ui.rtl ? "rtl" : "ltr"}>
              <span className={`flex h-7 min-w-7 items-center justify-center rounded-full bg-paper px-2 font-bold text-muted ${ui.rtl ? "ur text-base" : "text-sm"}`}>
                {ui.rtl ? urduNumberWord(qi + 1) : qi + 1}
              </span>
              {q.q && (
                <span className={ui.rtl ? "ur text-xl" : "font-medium"}>
                  <Emo text={q.q} />
                </span>
              )}
              <PromptButton q={q} />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3" dir={lang === "ur" && q.options[0]?.ur && !q.options[0]?.emoji ? "rtl" : "ltr"}>
              {q.options.map((o, oi) => {
                const state = p === null ? "idle" : oi === q.answer ? "right" : oi === p ? "wrong" : "idle";
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={p !== null}
                    onClick={() => choose(qi, oi)}
                    className={`rounded-xl border-2 px-3 py-3 transition ${
                      state === "right" ? "border-good bg-good-soft" : state === "wrong" ? "border-bad bg-bad-soft" : "border-line hover:border-accent"
                    }`}
                  >
                    <OptionLabel item={o} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        dir={ui.rtl ? "rtl" : "ltr"}
        className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 ${finished ? (passed ? "bg-good-soft" : "bg-bad-soft") : "bg-paper"}`}
      >
        <span className={ui.rtl ? "ur text-lg" : "font-semibold"}>
          {finished ? (passed ? ui.passed(pct) : ui.needMore(pct)) : ui.answerAll(qs.length)}
          {passedBefore && !finished && <span className="ms-2 text-good">{ui.alreadyPassed}</span>}
        </span>
        {finished && (
          <button
            type="button"
            onClick={() => {
              setQs(reshuffle(questions));
              setPicked(questions.map(() => null));
            }}
            className={`rounded-full bg-accent px-4 py-2 font-semibold text-white ${ui.rtl ? "ur" : "text-sm"}`}
          >
            {ui.tryAgain}
          </button>
        )}
      </div>
    </div>
  );
}

type Problem = { x: number; y: number; answer: number };

export function Drill({
  op,
  a,
  b,
  count,
  passMark,
  passedBefore,
  onResult,
}: {
  op: "+" | "-" | "×" | "÷";
  a: [number, number];
  b: [number, number];
  count: number;
  passMark: number;
  passedBefore?: boolean;
  onResult: (pct: number) => void;
}) {
  const make = () => Array.from({ length: count }, () => makeProblem(op, a, b));
  const [problems, setProblems] = useState<Problem[]>(make);
  const [values, setValues] = useState<string[]>(() => Array(count).fill(""));
  const [checked, setChecked] = useState(false);

  const filled = values.every((v) => v !== "");
  const right = problems.filter((p, i) => values[i] !== "" && Number(values[i]) === p.answer).length;
  const pct = Math.round((right / count) * 100);

  function check() {
    if (!filled) return;
    setChecked(true);
    if (pct >= passMark) sfx.passed();
    else sfx.tryAgain();
    onResult(pct);
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {problems.map((p, i) => {
          const ok = checked && Number(values[i]) === p.answer;
          const bad = checked && !ok;
          return (
            <label key={i} className="flex items-center gap-3 font-mono text-2xl">
              <span className="w-56 text-right tabular-nums whitespace-nowrap">{problemText(op, p.x, p.y)} =</span>
              <input
                inputMode="numeric"
                value={values[i]}
                disabled={checked}
                onChange={(e) => setValues((v) => v.map((x, j) => (j === i ? e.target.value.replace(/[^\d-]/g, "") : x)))}
                onKeyDown={(e) => e.key === "Enter" && check()}
                className={`w-24 rounded-lg border-2 px-2 py-1 text-center tabular-nums outline-none focus:border-accent ${ok ? "border-good bg-good-soft" : bad ? "border-bad bg-bad-soft" : "border-line"}`}
              />
              {bad && <span className="text-base text-bad">{p.answer}</span>}
            </label>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button type="button" onClick={check} disabled={!filled} className="rounded-full bg-accent px-4 py-2 font-semibold text-white disabled:opacity-40">
            Check
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setProblems(make());
              setValues(Array(count).fill(""));
              setChecked(false);
            }}
            className="rounded-full bg-accent px-4 py-2 font-semibold text-white"
          >
            New questions
          </button>
        )}
        <span className={`font-semibold ${checked ? (pct >= passMark ? "text-good" : "text-bad") : "text-muted"}`}>
          {checked
            ? pct >= passMark
              ? `✓ ${right}/${count} — passed!`
              : `${right}/${count} — try new questions.`
            : filled
              ? "Press Check"
              : `Fill all ${count} answers.`}
          {passedBefore && !checked && <span className="ml-2 text-good">(already passed ✓)</span>}
        </span>
      </div>
    </div>
  );
}

export function NumberGrid({ from, to }: { from: number; to: number }) {
  const [shown, setShown] = useState<number | null>(null);
  const nums = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  return (
    <div>
      <div className="grid grid-cols-10 gap-1.5">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setShown(n);
              const item = NUMBERS[n - 1];
              play("en", item.en!);
              setTimeout(() => play("ur", item.ur!), 1300);
            }}
            className={`rounded-lg border py-2 text-lg font-semibold tabular-nums transition hover:border-accent ${
              shown === n ? "border-accent bg-accent !text-white" : "border-line bg-card"
            } ${n % 10 === 0 ? "text-accent" : ""}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-3 flex min-h-12 items-center justify-center gap-6 rounded-xl bg-paper px-4 py-2 text-xl">
        {shown ? (
          <>
            <span className="font-bold tabular-nums">{shown}</span>
            <Line item={NUMBERS[shown - 1]} lang="en" />
            <Line item={NUMBERS[shown - 1]} lang="ur" />
          </>
        ) : (
          <span className="text-base text-muted">Click a number</span>
        )}
      </div>
    </div>
  );
}
