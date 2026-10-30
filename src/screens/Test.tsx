import { sfx } from "@/lib/sfx";
import { RotateCcw, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OptionLabel, PromptButton, questionKey } from "@/components/Interactive";
import { SUBJECTS } from "@/content/plan";
import type { TestAttempt } from "@/lib/db";
import { getPhase, recordAutoTest } from "@/lib/schedule";
import { useApp } from "@/lib/store";
import { makeTest } from "@/lib/testgen";
import type { Subject } from "@/lib/types";
import { Emo } from "@/components/Emo";

export function TestScreen({ week, preview }: { week: number; preview?: boolean }) {
  const { db, date, update, go } = useApp();
  const [questions] = useState(() => makeTest(week));
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState<TestAttempt | null>(null);
  const startedAt = useRef(Date.now());
  const phase = getPhase(db, date);

  useEffect(() => {
    if (!preview && !finished && phase.kind !== "test" && !db.settings.unlockAll) go({ name: "home" });
  }, [preview, finished, phase.kind, db.settings.unlockAll, go]);

  if (finished) {
    const pct = Math.round((finished.auto.correct / finished.auto.total) * 100);
    const ok = pct >= db.settings.testPass;
    return (
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="flex justify-center">{ok ? <Trophy className="size-20 text-warn" /> : <RotateCcw className="size-20 text-accent" />}</div>
        <h1 className="text-4xl font-bold">{pct}%</h1>
        <p className="text-xl">
          {ok
            ? "You passed the laptop test! Now your teacher will give you the next part."
            : "Don't worry — you get 2 days of revision, then a retest."}
        </p>
        <div className="mx-auto flex max-w-md justify-center gap-3 *:flex-1">
          {SUBJECTS.filter((s) => finished.auto.bySubject[s.key].total).map((s) => {
            const b = finished.auto.bySubject[s.key];
            return (
              <div key={s.key} data-subject={s.key} className="rounded-2xl bg-card p-3 ring-1 ring-line">
                <div className="font-semibold text-accent">{s.name}</div>
                <div className="text-lg font-bold">
                  {b.correct}/{b.total}
                </div>
              </div>
            );
          })}
        </div>
        {preview && <p className="text-sm text-muted">Preview — this result was not saved.</p>}
        <button type="button" onClick={() => go({ name: preview ? "admin" : "home" })} className="rounded-full bg-accent px-8 py-3 text-lg font-semibold text-white">
          {preview ? "Back to teacher panel" : "Continue"}
        </button>
      </div>
    );
  }

  const q = questions[i];
  const answered = q.kind === "choice" ? choice !== null : typed.trim() !== "";

  function next() {
    const ok = q.kind === "choice" ? choice === q.q.answer : Number(typed) === q.answer;
    const all = [...results, ok];
    setChoice(null);
    setTyped("");
    if (i + 1 < questions.length) {
      setResults(all);
      setI(i + 1);
      return;
    }
    const bySubject = Object.fromEntries(SUBJECTS.map((s) => [s.key, { correct: 0, total: 0 }])) as Record<Subject, { correct: number; total: number }>;
    questions.forEach((x, k) => {
      bySubject[x.subject].total++;
      if (all[k]) bySubject[x.subject].correct++;
    });
    const attempt: TestAttempt = {
      id: `${week}-${Date.now()}`,
      week,
      date,
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
      auto: {
        correct: all.filter(Boolean).length,
        total: all.length,
        bySubject,
        wrongLessons: [...new Set(questions.filter((_, k) => !all[k]).map((x) => x.lessonId))],
      },
    };
    if (!preview)
      update((d) => {
        questions.forEach((x, k) => d.answers.push({ t: Date.now(), lessonId: x.lessonId, q: x.kind === "choice" ? questionKey(x.q) : x.text, ok: all[k] }));
        recordAutoTest(d, attempt);
      });
    if ((attempt.auto.correct / attempt.auto.total) * 100 >= db.settings.testPass) sfx.celebrate();
    else sfx.notPassed();
    setFinished(attempt);
  }

  const subject = SUBJECTS.find((s) => s.key === q.subject)!;
  return (
    <div data-subject={q.subject} className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between text-sm font-semibold text-muted">
        <span>
          Week {week} test · Question {i + 1} of {questions.length}
        </span>
        <span className="text-accent">{subject.name}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>

      <div className="mt-8 rounded-3xl bg-card p-8 ring-1 ring-line">
        {q.kind === "choice" ? (
          <>
            <div className="flex flex-wrap items-center gap-4 text-xl font-semibold">
              {q.q.q && <span><Emo text={q.q.q} /></span>}
              <PromptButton q={q.q} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {q.q.options.map((o, oi) => (
                <button
                  key={oi}
                  type="button"
                  onClick={() => (sfx.tap(), setChoice(oi))}
                  className={`rounded-2xl border-2 px-3 py-5 transition ${choice === oi ? "border-accent bg-accent-soft" : "border-line hover:border-accent"}`}
                >
                  <OptionLabel item={o} />
                </button>
              ))}
            </div>
          </>
        ) : (
          <label className="flex items-center justify-center gap-4 font-mono text-4xl">
            <span className="tabular-nums">{q.text}</span>
            <input
              autoFocus
              inputMode="numeric"
              value={typed}
              onChange={(e) => setTyped(e.target.value.replace(/[^\d-]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && answered && next()}
              className="w-36 rounded-xl border-2 border-line px-3 py-2 text-center tabular-nums outline-none focus:border-accent"
            />
          </label>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="ur text-lg text-muted" dir="rtl">
          آپ پچھلے سوالوں پر واپس نہیں جا سکتے۔
        </span>
        <button type="button" disabled={!answered} onClick={next} className="rounded-full bg-accent px-8 py-3 text-lg font-semibold text-white disabled:opacity-40">
          {i + 1 < questions.length ? "Next →" : "Finish test"}
        </button>
      </div>
    </div>
  );
}
