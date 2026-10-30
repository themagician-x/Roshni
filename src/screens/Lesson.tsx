import { sfx } from "@/lib/sfx";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Blocks } from "@/components/Blocks";
import { SUBJECTS } from "@/content/plan";
import { prettyDate } from "@/lib/dates";
import { lessonRecord, logEvent } from "@/lib/db";
import { findLesson, lessonState } from "@/lib/schedule";
import { useApp } from "@/lib/store";
import { UiLangContext, uiStrings } from "@/lib/ui";

const MAX_ANSWERS = 5000;

/** In preview (teacher browsing), nothing is locked and nothing is recorded. */
export function LessonScreen({ id, preview }: { id: string; preview?: boolean }) {
  const { db, date, update, go, setActiveLesson } = useApp();
  const ref = findLesson(id)!;
  const st = lessonState(db, ref, date);
  const revision = !preview && !!st.revision && st.state === "open";
  // In revision and preview, quiz results live only in this visit.
  const [sessionBest, setSessionBest] = useState<Record<string, number>>({});

  const [sessionWritten, setSessionWritten] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (preview) return;
    setActiveLesson(id);
    return () => setActiveLesson(null);
  }, [id, preview, setActiveLesson]);

  useEffect(() => {
    if (!preview && st.state === "locked") go({ name: "home" });
  }, [preview, st.state, go]);

  const { lesson, subject } = ref;
  const s = SUBJECTS.find((x) => x.key === subject)!;
  // Urdu lessons speak to the student in Urdu throughout.
  const ui = uiStrings(subject === "urdu" ? "ur" : "en");
  const minutes = (sec: number) => ui.minutes(Math.floor(sec / 60));
  const saved = db.lessons[id] ?? { seconds: 0, best: {}, written: {}, quizAttempts: 0 };
  const rec = preview ? { seconds: 0, best: {}, written: sessionWritten, quizAttempts: 0 } : saved;
  const pass = db.settings.lessonPass;
  const best = revision || preview ? sessionBest : rec.best;
  const minSeconds = Math.round(((lesson.minutes ?? 30) * 60 * db.settings.minTimePct) / 100);

  const checks = lesson.blocks.flatMap((b, i): { label: string; ok: boolean; score?: number }[] => {
    if (b.type === "quiz") return [{ label: ui.quizCheck(b.title ?? ui.practice), ok: (best[i] ?? 0) >= pass, score: best[i] }];
    if (b.type === "drill") return [{ label: ui.quizCheck(b.title ?? ui.practice), ok: (best[i] ?? 0) >= pass, score: best[i] }];
    if (b.type === "write") return [{ label: ui.writingCheck, ok: !!rec.written[i], score: undefined }];
    return [];
  });
  if (!revision) checks.push({ label: ui.timeCheck(minutes(minSeconds)), ok: rec.seconds >= minSeconds, score: undefined });
  const ready = checks.every((c) => c.ok);
  const done = !preview && st.state === "done";

  function finish() {
    sfx.celebrate();
    update((d) => {
      if (revision) {
        d.weeks[ref.week].revision!.redone.push(id);
        logEvent(d, `Revised: ${lesson.title}`);
      } else {
        lessonRecord(d, id).done = date;
        logEvent(d, `Finished: ${lesson.title}`);
      }
    });
    go({ name: "home" });
  }

  return (
    <UiLangContext.Provider value={ui.lang}>
    <article data-subject={subject} className="mx-auto max-w-5xl">
      {preview && <PreviewBanner />}
      <header className="mb-8 border-b border-line pb-6">
        {ui.rtl ? (
          // Urdu lessons: one title, in Urdu only.
          <div className="ur" dir="rtl">
            <p className="text-lg font-bold text-accent">
              {s.nameUr}
              {revision && ` · ${ui.revision}`}
            </p>
            <h1 className="text-4xl leading-[2] font-bold">{lesson.titleUr ?? lesson.title}</h1>
          </div>
        ) : (
          // English and Math: English title on the left, Urdu title on the right.
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-accent">
                {s.name}
                {revision && ` · ${ui.revision}`}
              </p>
              <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>
            </div>
            {lesson.titleUr && (
              <p className="ur text-3xl leading-[1.8] text-muted" dir="rtl">
                {lesson.titleUr}
              </p>
            )}
          </div>
        )}
        {done && !st.revision && (
          <p className={`mt-2 font-semibold text-good ${ui.rtl ? "ur text-lg" : ""}`} dir={ui.rtl ? "rtl" : "ltr"}>
            {ui.completedOn(prettyDate(rec.done!, { day: "numeric", month: "long" }, ui.rtl ? "ur-PK" : "en-GB"))}
          </p>
        )}
      </header>

      <Blocks
        blocks={lesson.blocks}
        tracking={{
          passMark: pass,
          best,
          written: rec.written,
          onScore: (i, pct, answers) => {
            if (revision || preview) setSessionBest((b) => ({ ...b, [i]: Math.max(b[i] ?? 0, pct) }));
            if (preview) return;
            update((d) => {
              const r = lessonRecord(d, id);
              r.best[i] = Math.max(r.best[i] ?? 0, pct);
              r.quizAttempts++;
              for (const a of answers ?? []) d.answers.push({ t: Date.now(), lessonId: id, q: a.q, ok: a.ok });
              if (d.answers.length > MAX_ANSWERS) d.answers.splice(0, d.answers.length - MAX_ANSWERS);
            });
          },
          onWritten: (i, v) => (preview ? setSessionWritten((w) => ({ ...w, [i]: v })) : update((d) => void (lessonRecord(d, id).written[i] = v))),
        }}
      />

      {!done && !preview && (
        <footer className={`mt-12 rounded-3xl bg-card p-6 ring-1 ring-line ${ui.rtl ? "ur" : ""}`} dir={ui.rtl ? "rtl" : "ltr"}>
          <h2 className={`font-bold ${ui.rtl ? "text-2xl" : "text-xl"}`}>{ui.toFinish}</h2>
          <ul className={`mt-3 ${ui.rtl ? "space-y-1 leading-[2.4]" : "space-y-2"}`}>
            {checks.map((c, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <span className={`flex size-7 items-center justify-center rounded-full text-sm ${c.ok ? "bg-good text-white" : "border-2 border-line"}`}>{c.ok && <Check className="size-4" strokeWidth={3} />}</span>
                <span className={c.ok ? "" : "text-muted"}>{c.label}</span>
                {c.score !== undefined && !c.ok && <span className="text-sm text-bad">{ui.bestSoFar(c.score)}</span>}
              </li>
            ))}
          </ul>
          {!revision && !checks.at(-1)!.ok && (
            <p className="mt-2 text-sm text-muted">{ui.timeSoFar(minutes(rec.seconds))}</p>
          )}
          <button type="button" disabled={!ready} onClick={finish} className="mt-5 rounded-full bg-good px-8 py-3 text-lg font-semibold text-white disabled:opacity-40">
            {ready ? ui.finish : ui.notReady}
          </button>
        </footer>
      )}
    </article>
    </UiLangContext.Provider>
  );
}

export function PreviewBanner() {
  return (
    <div className="mb-6 rounded-xl border border-warn/40 bg-warn-soft px-4 py-2 text-sm font-semibold">
      Preview — nothing here is locked or saved to the student's record. Use ‹ in the top bar to go back to the teacher panel.
    </div>
  );
}
