import { sfx } from "@/lib/sfx";
import { Check, ClipboardPen, Clock, GraduationCap, Lock, PartyPopper, Printer } from "lucide-react";
import type { WeekState } from "@/lib/db";
import type { ReactNode } from "react";
import { SUBJECTS, WEEKS } from "@/content/plan";
import { prettyDate } from "@/lib/dates";
import { type LessonRef, TOTAL_WEEKS, daysFor, getPhase, lessonDay, lessonState, openLessonDay, planDaysOf, weekLessons } from "@/lib/schedule";
import { useApp } from "@/lib/store";
import { useState } from "react";
import { uiStrings } from "@/lib/ui";

function Card({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "good" | "warn" | "accent" }) {
  const t = { plain: "bg-card ring-line", good: "bg-good-soft ring-good/30", warn: "bg-warn-soft ring-warn/30", accent: "bg-accent-soft ring-accent/30" }[tone];
  return <div className={`rounded-3xl p-6 ring-1 ${t}`}>{children}</div>;
}

/** Big faint symbol on each subject's card header. */
const SUBJECT_MARK = { urdu: "ا ب", english: "Aa", math: "123" } as const;

function LessonCard({ r }: { r: LessonRef }) {
  const { db, date, go } = useApp();
  const st = lessonState(db, r, date);
  const subject = SUBJECTS.find((s) => s.key === r.subject)!;
  const open = st.state !== "locked";
  const done = st.state === "done";
  // Urdu cards are written entirely in Urdu.
  const ui = uiStrings(r.subject === "urdu" ? "ur" : "en");
  const lockText = st.opensOn ? ui.opensOn(st.opensOn) : ui.finishPrevious;

  return (
    <button
      type="button"
      disabled={!open}
      onClick={() => (sfx.open(), go({ name: "lesson", id: r.lesson.id }))}
      data-subject={r.subject}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-card text-start ring-1 ring-line transition ${
        open ? "hover:-translate-y-1 hover:shadow-xl hover:ring-accent" : "cursor-not-allowed opacity-55 grayscale"
      }`}
    >
      <div className="relative h-24 overflow-hidden bg-accent px-5 pt-4 text-white" dir={ui.rtl ? "rtl" : "ltr"}>
        {ui.rtl ? (
          <span className="ur block text-2xl leading-[1.9] text-white" dir="rtl">
            {subject.nameUr}
          </span>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white/85">{subject.name}</span>
            <span className="ur text-lg leading-[1.8] text-white/90" dir="rtl">
              {subject.nameUr}
            </span>
          </div>
        )}
        <span
          className={`pointer-events-none absolute font-black text-white/15 select-none ${ui.rtl ? "-bottom-2 left-4 ur text-7xl leading-none" : "-bottom-4 right-3 text-7xl"}`}
          aria-hidden
        >
          {SUBJECT_MARK[r.subject]}
        </span>
        {done && (
          <span className="absolute top-3 end-3 flex size-8 items-center justify-center rounded-full bg-white text-good shadow">
            <Check className="size-5" strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {ui.rtl ? (
          <span className="ur block text-2xl leading-[2] font-semibold" dir="rtl">
            {r.lesson.titleUr ?? r.lesson.title}
          </span>
        ) : (
          <>
            <span className="text-lg font-semibold leading-snug">{r.lesson.title}</span>
            {r.lesson.titleUr && (
              <span className="ur mt-1 block text-left text-xl text-muted" dir="rtl">
                {r.lesson.titleUr}
              </span>
            )}
          </>
        )}
        {/* Always left-to-right so the play button sits on the right of every card. */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5" dir="ltr">
          {st.state === "locked" ? (
            <span className={`text-muted ${ui.rtl ? "ur text-base" : "text-sm"}`} dir={ui.rtl ? "rtl" : "ltr"}>
              {lockText}
            </span>
          ) : (
            <span className="text-sm text-muted" dir="ltr">
              {r.lesson.minutes ?? 30} min
            </span>
          )}
          {st.state === "locked" ? (
            <Lock className="size-5 text-muted" />
          ) : done ? (
            <span className={`rounded-full bg-good-soft px-3 py-1 font-semibold text-good ${ui.rtl ? "ur text-base" : "text-sm"}`}>{st.revision ? ui.revised : ui.doneReview}</span>
          ) : (
            <span
              className="flex size-11 items-center justify-center rounded-full bg-accent text-white shadow-md transition group-hover:scale-110"
              aria-label={st.revision ? "Revise" : "Start"}
            >
              <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-current" aria-hidden>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export function Home() {
  const { db, date, go } = useApp();
  const phase = getPhase(db, date);
  const week = Math.min(db.current, WEEKS.length);
  const plan = WEEKS[week - 1];
  const lessons = weekLessons(week);

  return (
    <div className="space-y-6">
      <h1 className="flex flex-wrap items-baseline gap-x-4 text-4xl font-bold">
        Assalam-o-alaikum, {db.studentName}!
        <span className="ur text-3xl font-normal text-muted" dir="rtl">
          السلام علیکم
        </span>
      </h1>

      {db.settings.unlockAll ? (
        <UnlockedView />
      ) : (
        <>

      {phase.kind === "complete" && (
        <Card tone="good">
          <h2 className="text-3xl font-bold"><GraduationCap className="inline-block size-[1.1em] align-[-0.15em]" /> Course complete!</h2>
          <p className="mt-2 text-lg">You have finished all {TOTAL_WEEKS} weeks. Well done!</p>
        </Card>
      )}

      {phase.kind === "not-ready" && (
        <Card tone="warn">
          <h2 className="text-2xl font-bold">Week {phase.week} is being prepared</h2>
          <p className="mt-2 text-lg">Please ask your teacher.</p>
        </Card>
      )}

      {phase.kind === "waiting" && (
        <Card tone="good">
          <h2 className="text-3xl font-bold"><PartyPopper className="inline-block size-[1.1em] align-[-0.15em]" /> Week {phase.week - 1} passed!</h2>
          <p className="mt-2 text-lg">
            Week {phase.week}: <b>{plan.title}</b> starts on {prettyDate(phase.start)}. Rest well today.
          </p>
        </Card>
      )}

      {phase.kind === "test" && (
        <Card tone="accent">
          <h2 className="text-3xl font-bold"><ClipboardPen className="inline-block size-[1.1em] align-[-0.15em]" /> {phase.retest ? "Retest" : "Test"} day — Week {phase.week}</h2>
          <p className="mt-2 text-lg">
            The test has Urdu, English and Math questions. Sit in a quiet place. Once you start, finish it in one go.
          </p>
          <button type="button" onClick={() => go({ name: "test", week: phase.week })} className="mt-5 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-white">
            Start the test
          </button>
        </Card>
      )}

      {phase.kind === "awaiting-teacher" && (
        <Card tone="good">
          <h2 className="text-2xl font-bold">
            ✓ Laptop test passed: {Math.round((phase.attempt.auto.correct / phase.attempt.auto.total) * 100)}%
          </h2>
          <p className="mt-2 text-lg">
            {WEEKS[phase.week - 1].content!.test.kind === "oral"
              ? "Now your teacher will take your speaking (oral) test. Go to your teacher."
              : "Now print the written test, solve it on paper, and give it to your teacher."}
          </p>
          <button
            type="button"
            onClick={() => go({ name: "print", week: phase.week, back: { name: "home" } })}
            className="mt-5 rounded-full bg-accent px-6 py-3 font-semibold text-white"
          >
            <Printer className="inline-block size-[1.1em] align-[-0.15em]" /> {WEEKS[phase.week - 1].content!.test.kind === "oral" ? "Show the test sheet" : "Print the written test"}
          </button>
        </Card>
      )}

      {phase.kind === "revision" && (
        <>
          <Card tone="warn">
            <h2 className="text-2xl font-bold">Revision time</h2>
            <p className="mt-2 text-lg">
              The last test was not good enough yet. Redo these lessons carefully. Your retest is on <b>{prettyDate(phase.ws.revision!.retestDate)}</b>.
            </p>
          </Card>
          <LessonList refs={lessons.filter((r) => phase.ws.revision!.lessonIds.includes(r.lesson.id))} />
        </>
      )}

      {phase.kind === "study" && <StudyView phase={phase} lessons={lessons} />}
        </>
      )}
    </div>
  );
}

function LessonList({ refs }: { refs: LessonRef[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {refs.map((r) => (
        <LessonCard key={r.lesson.id} r={r} />
      ))}
    </div>
  );
}

function CheckRow({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${ok ? "bg-good text-white" : "border-2 border-line bg-card"}`}>
        {ok && <Check className="size-4" strokeWidth={3} />}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}

/** What still stands between the student and this week's test. */
function TestChecklist({ week, ws, lessons, testDue }: { week: number; ws: WeekState; lessons: LessonRef[]; testDue: boolean }) {
  const { db } = useApp();
  const done = lessons.filter((r) => db.lessons[r.lesson.id]?.done).length;
  const allDone = done === lessons.length;
  const tone = allDone && testDue ? "good" : testDue ? "warn" : allDone ? "good" : "plain";
  return (
    <Card tone={tone}>
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <ClipboardPen className="size-5 text-accent" /> Before your week {week} test
      </h2>
      <ul className="mt-4 space-y-3">
        <CheckRow ok={allDone}>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <span className="font-semibold">Finish every lesson of the week</span>
            <span className="tabular-nums text-muted">
              {done} / {lessons.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-good transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const refs = lessons.filter((r) => r.subject === s.key);
              const n = refs.filter((r) => db.lessons[r.lesson.id]?.done).length;
              if (!refs.length) return null;
              return (
                <span key={s.key} data-subject={s.key} className="rounded-full bg-accent-soft px-3 py-0.5 text-sm font-semibold text-accent">
                  {s.name} {n}/{refs.length}
                </span>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-muted">A lesson is finished when every quiz is passed, the notebook writing is done and enough time is spent on it.</p>
        </CheckRow>
        <CheckRow ok={testDue}>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <span className="font-semibold">Test day</span>
            <span className="text-muted">{testDue ? "Today" : prettyDate(ws.testDate)}</span>
          </div>
        </CheckRow>
      </ul>
      <p className="mt-4 font-semibold">
        {testDue && !allDone
          ? "Test day is here. Finish the lessons above and the test opens straight away."
          : allDone
            ? "All lessons finished! Practise any lesson again until test day."
            : "The test opens when both are ticked."}
      </p>
    </Card>
  );
}

/** "1 hour", "6 hours 40 min" — the planned study time of a day's lessons. */
function hoursText(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hours = h === 0 ? "" : `${h} ${h === 1 ? "hour" : "hours"}`;
  return [hours, m ? `${m} min` : ""].filter(Boolean).join(" ");
}

/** Badge next to a day heading with the total time of its lessons. */
function DayTime({ refs }: { refs: LessonRef[] }) {
  const minutes = refs.reduce((sum, r) => sum + (r.lesson.minutes ?? 30), 0);
  if (!minutes) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
      <Clock className="size-4" />
      {hoursText(minutes)}
    </span>
  );
}

function StudyView({ phase, lessons }: { phase: Extract<ReturnType<typeof getPhase>, { kind: "study" }>; lessons: LessonRef[] }) {
  const { db, date } = useApp();
  const openDay = openLessonDay(phase.ws, date);
  const todays = lessons.filter((r) => lessonDay(phase.ws, r) === openDay);
  const behind = lessons.filter((r) => lessonDay(phase.ws, r) < openDay && !db.lessons[r.lesson.id]?.done);
  const allDone = lessons.every((r) => db.lessons[r.lesson.id]?.done);
  const todayDone = todays.every((r) => db.lessons[r.lesson.id]?.done) && behind.length === 0;
  const extraDay = phase.day > planDaysOf(phase.ws);
  // On test day (or once everything is done) the checklist leads; otherwise today's lessons come first.
  const checklistFirst = phase.testDue || allDone;
  const checklist = <TestChecklist week={phase.week} ws={phase.ws} lessons={lessons} testDue={phase.testDue} />;

  return (
    <div className="space-y-6">
      {checklistFirst && checklist}
      {!allDone && todayDone && (
        <Card tone="good">
          <h2 className="text-2xl font-bold">✓ Today's lessons are finished. Excellent!</h2>
          <p className="mt-2 text-lg">New lessons open tomorrow. You can review today's lessons again.</p>
        </Card>
      )}

      {behind.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold text-bad">Unfinished from earlier days</h2>
          <LessonList refs={behind} />
        </section>
      )}

      {extraDay || allDone ? (
        <section>
          <h2 className="mb-3 text-xl font-bold">{extraDay ? "Revision day — practise this week's lessons" : "This week's lessons"}</h2>
          <LessonList refs={lessons} />
        </section>
      ) : (
        <section>
          <h2 className="mb-3 flex items-center gap-3 text-xl font-bold">
            <span>
              Today's lessons <span className="font-normal text-muted">— Day {openDay}</span>
            </span>
            <DayTime refs={todays} />
          </h2>
          <LessonList refs={todays} />
        </section>
      )}
      {!checklistFirst && checklist}
    </div>
  );
}

/** Remembered so coming back from a lesson keeps the week that was picked. */
let lastWeek: number | null = null;

/** Testing mode: pick any ready week and see all its lessons, every one open. */
function UnlockedView() {
  const { db, go } = useApp();
  const ready = WEEKS.filter((w) => w.content);
  const [week, setWeekState] = useState(() => lastWeek ?? (WEEKS[db.current - 1]?.content ? db.current : ready[0].n));
  const setWeek = (n: number) => setWeekState((lastWeek = n));
  const lessons = weekLessons(week);
  const isCurrent = week === db.current;
  // Days as they are (or would be) planned for this week.
  const ws = db.weeks[week] ?? { start: "", studyDays: daysFor(db, week), planDays: daysFor(db, week), testDate: "", status: "studying" as const };
  const plan = planDaysOf(ws);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {WEEKS.map((w) => (
          <button
            key={w.n}
            type="button"
            disabled={!w.content}
            onClick={() => setWeek(w.n)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition disabled:opacity-35 ${
              w.n === week ? "bg-accent text-white" : "bg-card ring-1 ring-line hover:ring-accent"
            }`}
          >
            Week {w.n}
          </button>
        ))}
      </div>
      {Array.from({ length: plan }, (_, i) => i + 1).map((day) => {
        const refs = lessons.filter((r) => lessonDay(ws, r) === day);
        return (
          refs.length > 0 && (
            <section key={day}>
              <h2 className="mb-3 flex items-center gap-3 text-xl font-bold">
                Day {day} <DayTime refs={refs} />
              </h2>
              <LessonList refs={refs} />
            </section>
          )
        );
      })}
      <Card tone="accent">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Week {week}: {WEEKS[week - 1].title}
            </h2>
            <p className="mt-1 text-muted">{isCurrent ? "His current week — the test result is saved." : "Not his current week — the test is a practice run and is not saved."}</p>
          </div>
          <button type="button" onClick={() => go({ name: "test", week, preview: !isCurrent })} className="rounded-full bg-accent px-6 py-3 font-semibold text-white">
            <ClipboardPen className="inline-block size-[1.1em] align-[-0.15em]" /> Take the week {week} test
          </button>
        </div>
      </Card>
    </div>
  );
}
