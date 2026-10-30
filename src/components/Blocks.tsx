import { sfx } from "@/lib/sfx";
import { Lightbulb, PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import type { Block, Item } from "@/lib/types";
import { Cards, Drill, Line, NumberGrid, Paragraph, Phrases, Quiz, type QuizAnswer } from "./Interactive";
import { Emo } from "@/components/Emo";
import { useUi } from "@/lib/ui";
import { urduNumberWord } from "@/content/numbers";

export type BlockTracking = {
  passMark: number;
  /** Best % already reached on each quiz / drill block (by block index). */
  best: Record<string, number>;
  written: Record<string, boolean>;
  onScore: (index: number, pct: number, answers?: QuizAnswer[]) => void;
  onWritten: (index: number, done: boolean) => void;
};

function Heading({ children, kicker }: { children?: ReactNode; kicker: string }) {
  const ui = useUi();
  return (
    <div className={`mb-3 ${ui.rtl ? "ur" : ""}`} dir={ui.rtl ? "rtl" : "ltr"}>
      {/* A section title already says what to do, so the label only shows when there is no title. */}
      {children ? (
        <h3 className={ui.rtl ? "text-2xl font-semibold" : "text-xl font-bold"}>{children}</h3>
      ) : (
        <span className={`font-bold text-accent ${ui.rtl ? "text-base" : "text-lg"}`}>{kicker}</span>
      )}
    </div>
  );
}

function Examples({ items }: { items?: Item[] }) {
  if (!items) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
      {items.map((ex, i) => (
        <span key={i} className="flex flex-col gap-1 rounded-xl bg-paper px-3 py-2">
          {ex.ur && <Line item={ex} lang="ur" big />}
          {ex.en && <Line item={ex} lang="en" />}
        </span>
      ))}
    </div>
  );
}

const URDU_RUN = "[\\u0600-\\u06FF](?:[\\u0600-\\u06FF /]*[\\u0600-\\u06FF])?";
// One term of a sum: 12, 1/2, Rs 50, −3, 2x, x/3, n², optionally in brackets: (−5).
const TERM = "\\(?(?:Rs\\s)?[−-]?(?:\\d+(?:[,.]\\d+)*(?:/\\d+)?[a-z]?²?|[a-z]²?(?:/\\d+)?)\\)?";
// Not the tail of "any number × 0 = 0", and never starting inside a word.
const SUM = `(?<![+\\-−×÷=<>/]\\s*)(?<![\\w/])${TERM}(?:\\s*[+\\-−×÷=<>]\\s*${TERM})+`;
/** Urdu words (with or without brackets) and worked sums like 3 × 4 = 12. */
const RICH = new RegExp(`\\(\\s*(${URDU_RUN})\\s*\\)|(${URDU_RUN})|(${SUM})`, "g");

/** English text with Urdu words set in Nastaliq and sums picked out, so neither gets lost in the sentence. */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(RICH)) {
    if (m.index > last) parts.push(<Emo key={last} text={text.slice(last, m.index)} />);
    const urdu = m[1] ?? m[2];
    parts.push(
      urdu ? (
        <bdi key={m.index} className="ur mx-0.5 inline-block rounded-md bg-accent-soft px-2 align-middle text-lg leading-[1.9] text-accent" dir="rtl">
          {urdu}
        </bdi>
      ) : (
        <span key={m.index} className="whitespace-nowrap rounded-md bg-paper px-1.5 py-0.5 font-semibold tabular-nums ring-1 ring-line">
          {m[3]}
        </span>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Emo key={last} text={text.slice(last)} />);
  return <>{parts}</>;
}

/** A rule: icon, title (with its Urdu term in English and Math lessons), numbered points. */
function LearnCard({ block }: { block: Extract<Block, { type: "rule" }> }) {
  const { rtl } = useUi();
  // "What is multiplication? (ضرب)" → title + the Urdu term shown on its own.
  const m = rtl ? null : block.title.match(new RegExp(`^(.*?)\\s*\\((${URDU_RUN})\\)\\s*$`));
  const title = m ? m[1] : block.title;
  const term = m?.[2];
  // English text gets Urdu words and sums picked out; Urdu text is shown as it is.
  const text = (t: string) => (rtl ? <Emo text={t} /> : <RichText text={t} />);
  return (
    <section className="rounded-2xl border border-line bg-card p-5" dir={rtl ? "rtl" : "ltr"}>
      <div className="mb-4 flex w-full items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Lightbulb className="size-6" />
        </span>
        <h3 className={`min-w-0 ${rtl ? "ur text-2xl font-semibold" : "text-xl font-bold"}`}>{text(title)}</h3>
        {term && (
          <span className="ur ml-auto shrink-0 rounded-xl bg-accent-soft px-4 text-2xl leading-[2] text-accent" dir="rtl">
            {term}
          </span>
        )}
      </div>
      <ol className="space-y-3">
        {block.points.map((p, i) => (
          <li key={i} className={`flex gap-3 ${rtl ? "ur text-xl" : "text-lg leading-relaxed"}`}>
            <span
              className={`flex min-w-7 shrink-0 items-center justify-center rounded-full bg-accent px-2.5 font-bold text-white ${rtl ? "mt-1 h-8 text-base" : "mt-0.5 h-7 text-sm"}`}
            >
              {rtl ? urduNumberWord(i + 1) : i + 1}
            </span>
            <span className="min-w-0">{text(p)}</span>
          </li>
        ))}
      </ol>
      <Examples items={block.examples} />
    </section>
  );
}

function BlockView({ block, index, t }: { block: Block; index: number; t: BlockTracking }) {
  const ui = useUi();
  const passedBefore = (t.best[index] ?? 0) >= t.passMark;
  switch (block.type) {
    case "cards":
      return (
        <section>
          <Heading kicker={ui.listenRepeat}>{block.title}</Heading>
          <Cards items={block.items} lang={block.lang} size={block.size} />
        </section>
      );
    case "phrases":
      return (
        <section>
          <Heading kicker={ui.speak}>{block.title}</Heading>
          <Phrases items={block.items} lang={block.lang} />
        </section>
      );
    case "reading":
      return (
        <section>
          <Heading kicker={ui.read}>{block.title}</Heading>
          {block.paragraph ? <Paragraph lines={block.lines} lang={block.lang} /> : <Phrases items={block.lines} lang={block.lang} plain={block.plain} />}
        </section>
      );
    case "rule":
      return <LearnCard block={block} />;
    case "quiz":
      return (
        <section>
          <Heading kicker={ui.practice}>{block.title}</Heading>
          <Quiz questions={block.questions} lang={block.lang} passMark={t.passMark} passedBefore={passedBefore} onResult={(pct, answers) => t.onScore(index, pct, answers)} />
        </section>
      );
    case "write":
      return (
        <section className="rounded-2xl border border-dashed border-line bg-card p-5">
          <Heading kicker={ui.writeNotebook} />
          {block.note && (
            <p className={`mb-3 ${ui.rtl ? "ur text-xl" : "text-lg"}`} dir={ui.rtl ? "rtl" : "ltr"}>
              <PencilLine className="me-2 inline-block size-5 align-[-0.2em] text-accent" />
              <Emo text={block.note} />
            </p>
          )}
          <div className={`flex flex-wrap gap-4 ${block.lang === "ur" ? "ur text-5xl" : "font-mono text-4xl"}`} dir={block.lang === "ur" ? "rtl" : "ltr"}>
            {block.items.map((x, i) => (
              <span key={i} className="rounded-xl bg-paper px-4 py-2 text-ink/80">
                {x}
              </span>
            ))}
          </div>
          <label dir={ui.rtl ? "rtl" : "ltr"} className={`mt-4 flex w-fit cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2 font-semibold ${ui.rtl ? "ur text-lg" : ""} ${t.written[index] ? "border-good bg-good-soft text-good" : "border-line"}`}>
            <input type="checkbox" className="size-5 accent-[var(--good)]" checked={!!t.written[index]} onChange={(e) => (e.target.checked && sfx.pop(), t.onWritten(index, e.target.checked))} />
            {ui.wrote}
          </label>
        </section>
      );
    case "table":
      return (
        <section>
          {block.title && <Heading kicker={ui.table}>{block.title}</Heading>}
          <div className="overflow-x-auto overflow-y-hidden rounded-2xl border border-line bg-card">
            <table className="w-full text-center text-lg" dir={block.dir}>
              <thead className="bg-paper">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    {r.map((c, j) => (
                      <td key={j} className={`px-3 py-2 tabular-nums ${/[؀-ۿ]/.test(String(c)) ? "ur text-xl" : ""}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case "drill":
      return (
        <section>
          <Heading kicker={ui.practice}>{block.title}</Heading>
          <Drill op={block.op} a={block.a} b={block.b} count={block.count} passMark={t.passMark} passedBefore={passedBefore} onResult={(pct) => t.onScore(index, pct)} />
        </section>
      );
    case "numbergrid":
      return (
        <section>
          <Heading kicker={ui.count}>
            Numbers {block.from} to {block.to}
          </Heading>
          <NumberGrid from={block.from} to={block.to} />
        </section>
      );
  }
}

export function Blocks({ blocks, tracking }: { blocks: Block[]; tracking: BlockTracking }) {
  return (
    <div className="space-y-8">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} index={i} t={tracking} />
      ))}
    </div>
  );
}
