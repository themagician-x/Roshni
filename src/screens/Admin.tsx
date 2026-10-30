import { BookOpen, Check, ClipboardCheck, FileText, LayoutDashboard, Lock, type LucideIcon, Printer, Settings as SettingsIcon, SlidersHorizontal, Target } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { Logo } from "@/App";
import { STAGES, SUBJECTS, WEEKS } from "@/content/plan";
import { addDays, formatDuration, prettyDate } from "@/lib/dates";
import { type DB, type Settings, checkPassword, logEvent, makePassword } from "@/lib/db";
import {
  TOTAL_WEEKS,
  findLesson,
  daysFor,
  firstWeekState,
  lessonDay,
  replanCurrentWeek,
  getPhase,
  lastAttempt,
  moveTo,
  openTestNow,
  recordTeacherMarks,
  repeatWeek,
  skipWeek,
  studyDay,
  weekLessons,
} from "@/lib/schedule";
import { useApp } from "@/lib/store";
import type { Subject } from "@/lib/types";
import { AgeSelect, input } from "./Setup";
import { confirmDialog } from "@/components/ui/Confirm";
import { Modal } from "@/components/ui/Modal";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select } from "@/components/ui/Select";

const btn = "rounded-full px-5 py-2 font-semibold";
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

export function AdminLogin() {
  const { db, go } = useApp();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  async function submit() {
    if (await checkPassword(db, pw)) go({ name: "admin" });
    else setError(true);
  }

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-3xl bg-card p-8 shadow-sm ring-1 ring-line">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="text-2xl font-bold">Teacher panel</h1>
      </div>
      <PasswordInput autoFocus className="mt-6" placeholder="Password" value={pw} onChange={(e) => (setPw(e.target.value), setError(false))} onKeyDown={(e) => e.key === "Enter" && submit()} />
      {error && <p className="mt-2 font-semibold text-bad">Wrong password</p>}
      <div className="mt-5 flex justify-between">
        <button type="button" onClick={() => go({ name: "home" })} className={`${btn} border border-line`}>
          Cancel
        </button>
        <button type="button" onClick={submit} className={`${btn} bg-accent text-white`}>
          Open
        </button>
      </div>
    </div>
  );
}

const TABS = ["Overview", "Tests", "Lessons", "Weak spots", "Report", "Controls", "Settings"] as const;
type Tab = (typeof TABS)[number];

/** Remembered so returning from a previewed lesson reopens the same tab. */
let lastTab: Tab | null = null;

/** Leaving the panel (the Student view button) opens it on the default tab next time. */
export const forgetAdminTab = () => void (lastTab = null);

const TAB_ICONS: Record<Tab, LucideIcon> = {
  Overview: LayoutDashboard,
  Tests: ClipboardCheck,
  Lessons: BookOpen,
  "Weak spots": Target,
  Report: FileText,
  Controls: SlidersHorizontal,
  Settings: SettingsIcon,
};

export function Admin() {
  const { db, go } = useApp();
  const [tab, setTabState] = useState<Tab>(() => lastTab ?? (db.weeks[db.current]?.status === "awaiting-teacher" ? "Tests" : "Overview"));
  const setTab = (t: Tab) => {
    lastTab = t;
    setTabState(t);
  };
  const week = Math.min(db.current, TOTAL_WEEKS);
  const needsMarks = db.weeks[db.current]?.status === "awaiting-teacher";

  return (
    <div className="grid grid-cols-[13rem_1fr] items-start gap-8 print:block">
      <aside className="sticky top-0 flex flex-col gap-4 print:hidden">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-line">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">{db.studentName.slice(0, 1).toUpperCase()}</span>
            <div className="min-w-0">
              <div className="truncate font-bold">{db.studentName}</div>
              <div className="text-xs text-muted">{db.studentAge ? `${db.studentAge} years` : "Age not set"}</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-paper px-3 py-1.5 text-xs font-semibold text-muted">
            Week {week} of {TOTAL_WEEKS}
          </div>
        </div>
        <nav className="flex flex-col gap-0.5">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left font-semibold transition ${tab === t ? "bg-accent text-white shadow-sm" : "text-muted hover:bg-card hover:text-ink"}`}
            >
              {(() => {
                const Icon = TAB_ICONS[t];
                return <Icon className="size-[18px]" />;
              })()}
              <span className="flex-1">{t}</span>
              {t === "Tests" && needsMarks && <span className="size-2 rounded-full bg-bad" title="Marks needed" />}
            </button>
          ))}
        </nav>
      </aside>
      <section className="min-w-0">
        <h1 className="mb-5 text-2xl font-bold print:hidden">{tab}</h1>
        {tab === "Overview" && <Overview />}
        {tab === "Tests" && <Tests />}
        {tab === "Lessons" && <Lessons />}
        {tab === "Weak spots" && <WeakSpots />}
        {tab === "Report" && <Report />}
        {tab === "Controls" && <Controls />}
        {tab === "Settings" && <SettingsTab />}
      </section>
    </div>
  );
}

function Panel({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-6 ring-1 ring-line break-inside-avoid">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {sub && <div className="text-sm text-muted">{sub}</div>}
    </div>
  );
}

function statusText(db: DB, date: string) {
  const p = getPhase(db, date);
  switch (p.kind) {
    case "complete":
      return "Course complete";
    case "not-ready":
      return `Week ${p.week} content not available yet`;
    case "waiting":
      return `Week ${p.week} starts ${prettyDate(p.start)}`;
    case "study":
      return p.testDue ? "Test due — lessons unfinished" : `Studying, day ${p.day}`;
    case "test":
      return p.retest ? "Retest is open" : "Test is open";
    case "awaiting-teacher":
      return "Waiting for your marks";
    case "revision":
      return `Revision — retest ${prettyDate(p.ws.revision!.retestDate)}`;
  }
}

function TimeChart({ days }: { days: number }) {
  const { db, date } = useApp();
  const list = Array.from({ length: days }, (_, i) => addDays(date, i - days + 1));
  const max = Math.max(3600, ...list.map((d) => db.days[d]?.seconds ?? 0));
  return (
    <div className="flex h-48 items-end gap-1.5">
      {list.map((d) => {
        const s = db.days[d]?.seconds ?? 0;
        return (
          <div key={d} className="flex flex-1 flex-col items-center gap-1" title={`${prettyDate(d)}: ${formatDuration(s)}`}>
            <span className="text-[10px] text-muted">{s ? Math.round(s / 60) : ""}</span>
            <div className={`w-full rounded-t-md ${s ? "bg-accent" : "bg-paper"}`} style={{ height: `${Math.max(3, (s / max) * 140)}px` }} />
            <span className="text-[10px] text-muted">{prettyDate(d, { day: "numeric" })}</span>
          </div>
        );
      })}
    </div>
  );
}

function Overview() {
  const { db, date } = useApp();
  const week = Math.min(db.current, TOTAL_WEEKS);
  const ws = db.weeks[week];
  const lessons = weekLessons(week);
  const done = lessons.filter((r) => db.lessons[r.lesson.id]?.done).length;
  const weekSeconds = ws ? Array.from({ length: 14 }, (_, i) => addDays(ws.start, i)).filter((d) => d <= date).reduce((a, d) => a + (db.days[d]?.seconds ?? 0), 0) : 0;
  const totalSeconds = Object.values(db.days).reduce((a, d) => a + d.seconds, 0);
  const last = lastAttempt(db, week);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Current" value={`Week ${week}`} sub={statusText(db, date)} />
        <Stat label="Today" value={formatDuration(db.days[date]?.seconds ?? 0)} sub="active study time" />
        <Stat label="This week" value={`${done}/${lessons.length}`} sub={`lessons · ${formatDuration(weekSeconds)}`} />
        <Stat label="All time" value={formatDuration(totalSeconds)} sub={`${Object.keys(db.days).length} days studied`} />
      </div>
      {ws && (
        <Panel title={`Week ${week}: ${WEEKS[week - 1].title}`}>
          <p className="text-muted">
            Started {prettyDate(ws.start)} · {ws.studyDays} study days · test {prettyDate(ws.status === "revision" ? ws.revision!.retestDate : ws.testDate)}
            {ws.start <= date && ` · today is day ${studyDay(ws, date)}`}
          </p>
          {last && (
            <p className="mt-2">
              Last test: laptop {pct(last.auto.correct, last.auto.total)}%{last.teacher && `, teacher ${pct(last.teacher.score, last.teacher.total)}%`}
              {last.result && ` — ${last.result.toUpperCase()}`}
            </p>
          )}
        </Panel>
      )}
      <Panel title="Study time — last 21 days (minutes)">
        <TimeChart days={21} />
      </Panel>
      <Panel title="Recent activity">
        <ul className="space-y-1 text-sm">
          {db.events
            .slice(-15)
            .reverse()
            .map((e, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-40 shrink-0 text-muted">{new Date(e.t).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                {e.text}
              </li>
            ))}
        </ul>
      </Panel>
    </div>
  );
}

function MarksForm({ week }: { week: number }) {
  const { date, update } = useApp();
  const [score, setScore] = useState("");
  const [total, setTotal] = useState("");
  const [notes, setNotes] = useState("");
  const [revise, setRevise] = useState<Subject[]>(["urdu", "english", "math"]);
  const s = Number(score);
  const t = Number(total);
  const valid = total !== "" && score !== "" && t > 0 && s >= 0 && s <= t;

  return (
    <div className="rounded-2xl border-2 border-accent bg-accent-soft p-5">
      <h3 className="text-lg font-bold">Enter marks for the week {week} {WEEKS[week - 1].content!.test.kind} test</h3>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label>
          <span className="text-sm font-semibold">Marks obtained</span>
          <input className={`${input} w-32`} inputMode="numeric" value={score} onChange={(e) => setScore(e.target.value.replace(/\D/g, ""))} />
        </label>
        <span className="pb-3 text-xl">/</span>
        <label>
          <span className="text-sm font-semibold">Total marks</span>
          <input className={`${input} w-32`} inputMode="numeric" value={total} onChange={(e) => setTotal(e.target.value.replace(/\D/g, ""))} />
        </label>
        {valid && <span className="pb-3 text-xl font-bold">{pct(s, t)}%</span>}
      </div>
      <label className="mt-3 block">
        <span className="text-sm font-semibold">Notes (optional)</span>
        <textarea className={input} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <div className="mt-3 text-sm">
        <span className="font-semibold">If he fails, revise these subjects: </span>
        {SUBJECTS.map((x) => (
          <label key={x.key} className="ml-3 inline-flex items-center gap-1.5">
            <input type="checkbox" checked={revise.includes(x.key)} onChange={(e) => setRevise((r) => (e.target.checked ? [...r, x.key] : r.filter((k) => k !== x.key)))} />
            {x.name}
          </label>
        ))}
      </div>
      <button
        type="button"
        disabled={!valid}
        onClick={() => update((d) => recordTeacherMarks(d, week, date, { score: s, total: t, notes, revise }))}
        className={`${btn} mt-4 bg-accent text-white disabled:opacity-40`}
      >
        Save marks
      </button>
    </div>
  );
}

function Tests() {
  const { db, go } = useApp();
  const awaiting = db.weeks[db.current]?.status === "awaiting-teacher";
  return (
    <div className="space-y-6">
      {awaiting && <MarksForm week={db.current} />}
      <Panel
        title="All tests"
        right={
          db.current <= TOTAL_WEEKS &&
          WEEKS[db.current - 1].content && (
            <button type="button" onClick={() => go({ name: "print", week: db.current, back: { name: "admin" } })} className={`${btn} border border-line`}>
              <Printer className="inline-block size-[1.1em] align-[-0.15em]" /> Week {db.current} teacher test sheet
            </button>
          )
        }
      >
        {db.tests.length === 0 ? (
          <p className="text-muted">No tests taken yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="text-sm text-muted">
              <tr>
                <th className="py-2">Week</th>
                <th>Date</th>
                <th>Laptop test</th>
                <th>Urdu / English / Math</th>
                <th>Teacher</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {[...db.tests].reverse().map((t) => (
                <tr key={t.id} className="border-t border-line align-top">
                  <td className="py-2 font-semibold">{t.week}</td>
                  <td>{prettyDate(t.date, { day: "numeric", month: "short" })}</td>
                  <td>
                    {pct(t.auto.correct, t.auto.total)}% <span className="text-sm text-muted">({formatDuration(t.seconds)})</span>
                  </td>
                  <td className="text-sm">{SUBJECTS.map((s) => `${t.auto.bySubject[s.key].correct}/${t.auto.bySubject[s.key].total}`).join(" · ")}</td>
                  <td>
                    {t.teacher ? (
                      <>
                        {t.teacher.score}/{t.teacher.total} ({pct(t.teacher.score, t.teacher.total)}%)
                        {t.teacher.notes && <div className="text-sm text-muted">{t.teacher.notes}</div>}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className={`font-bold ${t.result === "pass" ? "text-good" : t.result === "fail" ? "text-bad" : "text-muted"}`}>{t.result ?? "pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}

function WeekPicker({ week, setWeek }: { week: number; setWeek: (n: number) => void }) {
  return (
    <Select
      className="w-36"
      value={String(week)}
      onChange={(v) => setWeek(Number(v))}
      options={WEEKS.filter((w) => w.content).map((w) => ({ value: String(w.n), label: `Week ${w.n}` }))}
    />
  );
}

function Lessons() {
  const { db, update } = useApp();
  const [week, setWeek] = useState(Math.min(db.current, TOTAL_WEEKS));
  const lessons = weekLessons(week);
  return (
    <Panel title="Lessons" right={<WeekPicker week={week} setWeek={setWeek} />}>
      <table className="w-full text-left">
        <thead className="text-sm text-muted">
          <tr>
            <th className="py-2">Day</th>
            <th>Subject</th>
            <th>Lesson</th>
            <th>Time</th>
            <th>Quiz tries</th>
            <th>Scores</th>
            <th>Done</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {lessons.map((r) => {
            const rec = db.lessons[r.lesson.id];
            return (
              <tr key={r.lesson.id} className="border-t border-line">
                <td className="py-2">{lessonDay(db.weeks[week], r)}</td>
                <td className="capitalize">{r.subject}</td>
                <td>{r.lesson.title}</td>
                <td>{rec ? formatDuration(rec.seconds) : "—"}</td>
                <td>{rec?.quizAttempts ?? 0}</td>
                <td className="text-sm">{rec ? Object.values(rec.best).map((v) => `${v}%`).join(", ") || "—" : "—"}</td>
                <td className={rec?.done ? "text-good" : "text-muted"}>{rec?.done ? prettyDate(rec.done, { day: "numeric", month: "short" }) : "no"}</td>
                <td>
                  {rec && (
                    <button
                      type="button"
                      onClick={async () =>
                        (await confirmDialog({ title: `Reset "${r.lesson.title}"?`, message: "Its progress will be cleared and he must do it again.", danger: true, confirmLabel: "Reset" })) &&
                        update((d) => (delete d.lessons[r.lesson.id], logEvent(d, `Teacher reset: ${r.lesson.title}`)))
                      }
                      className="text-sm font-semibold text-bad hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}

function useWeakSpots(week?: number) {
  const { db } = useApp();
  return useMemo(() => {
    const map = new Map<string, { q: string; lessonId: string; tries: number; wrong: number }>();
    for (const a of db.answers) {
      if (week && findLesson(a.lessonId)?.week !== week) continue;
      const key = `${a.lessonId}|${a.q}`;
      const e = map.get(key) ?? { q: a.q, lessonId: a.lessonId, tries: 0, wrong: 0 };
      e.tries++;
      if (!a.ok) e.wrong++;
      map.set(key, e);
    }
    return [...map.values()].filter((e) => e.wrong > 0).sort((a, b) => b.wrong / b.tries - a.wrong / a.tries || b.wrong - a.wrong);
  }, [db.answers, week]);
}

function WeakTable({ rows }: { rows: ReturnType<typeof useWeakSpots> }) {
  if (!rows.length) return <p className="text-muted">No mistakes recorded.</p>;
  return (
    <table className="w-full text-left">
      <thead className="text-sm text-muted">
        <tr>
          <th className="py-2">Question</th>
          <th>Lesson</th>
          <th>Wrong</th>
        </tr>
      </thead>
      <tbody>
        {rows.slice(0, 30).map((r) => (
          <tr key={r.lessonId + r.q} className="border-t border-line">
            <td className={`py-1.5 ${/[؀-ۿ]/.test(r.q) ? "ur text-lg" : ""}`}>{r.q}</td>
            <td className="text-sm text-muted">{findLesson(r.lessonId)?.lesson.title}</td>
            <td className="font-semibold text-bad">
              {r.wrong}/{r.tries}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function WeakSpots() {
  const { db } = useApp();
  const [week, setWeek] = useState(Math.min(db.current, TOTAL_WEEKS));
  const rows = useWeakSpots(week);
  return (
    <Panel title="Questions he gets wrong most" right={<WeekPicker week={week} setWeek={setWeek} />}>
      <WeakTable rows={rows} />
    </Panel>
  );
}

function Report() {
  const { db, date } = useApp();
  const [week, setWeek] = useState(Math.min(db.current, TOTAL_WEEKS));
  const ws = db.weeks[week];
  const lessons = weekLessons(week);
  const end = ws?.endedOn ?? date;
  const days = ws ? Array.from({ length: Math.max(1, Math.min(30, (new Date(end).getTime() - new Date(ws.start).getTime()) / 86400000 + 1)) }, (_, i) => addDays(ws.start, i)) : [];
  const weak = useWeakSpots(week);
  const tests = db.tests.filter((t) => t.week === week);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <WeekPicker week={week} setWeek={setWeek} />
        <button type="button" onClick={() => window.print()} className={`${btn} bg-accent text-white`}>
          <Printer className="inline-block size-[1.1em] align-[-0.15em]" /> Print / save as PDF
        </button>
      </div>
      <header>
        <h2 className="text-3xl font-bold">
          Roshni weekly report — {db.studentName}
          {db.studentAge ? ` (${db.studentAge})` : ""}, week {week}
        </h2>
        <p className="text-muted">
          {WEEKS[week - 1].title}
          {ws && ` · ${prettyDate(ws.start)} – ${prettyDate(end)}`} · printed {prettyDate(date)}
        </p>
      </header>
      {!ws ? (
        <p className="text-muted">This week has not started.</p>
      ) : (
        <>
          <Panel title="Study time per day">
            <table className="w-full text-left">
              <tbody>
                {days.map((d) => (
                  <tr key={d} className="border-t border-line">
                    <td className="py-1.5">{prettyDate(d)}</td>
                    <td className="font-semibold">{formatDuration(db.days[d]?.seconds ?? 0)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-ink font-bold">
                  <td className="py-1.5">Total</td>
                  <td>{formatDuration(days.reduce((a, d) => a + (db.days[d]?.seconds ?? 0), 0))}</td>
                </tr>
              </tbody>
            </table>
          </Panel>
          <Panel title={`Lessons — ${lessons.filter((r) => db.lessons[r.lesson.id]?.done).length} of ${lessons.length} done`}>
            <table className="w-full text-left text-sm">
              <tbody>
                {lessons.map((r) => {
                  const rec = db.lessons[r.lesson.id];
                  return (
                    <tr key={r.lesson.id} className="border-t border-line">
                      <td className="py-1.5 capitalize">{r.subject}</td>
                      <td>{r.lesson.title}</td>
                      <td>{rec ? formatDuration(rec.seconds) : "—"}</td>
                      <td>{rec?.quizAttempts ?? 0} tries</td>
                      <td className={rec?.done ? "text-good" : "text-bad"}>{rec?.done ? "✓" : "not done"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Panel>
          <Panel title="Tests">
            {tests.length === 0 ? (
              <p className="text-muted">No test yet.</p>
            ) : (
              <ul className="space-y-1">
                {tests.map((t) => (
                  <li key={t.id}>
                    {prettyDate(t.date)}: laptop {pct(t.auto.correct, t.auto.total)}% (
                    {SUBJECTS.map((s) => `${s.name} ${pct(t.auto.bySubject[s.key].correct, t.auto.bySubject[s.key].total)}%`).join(", ")})
                    {t.teacher && ` · teacher ${t.teacher.score}/${t.teacher.total}`} — <b>{t.result ?? "pending"}</b>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Weak spots">
            <WeakTable rows={weak.slice(0, 15)} />
          </Panel>
        </>
      )}
    </div>
  );
}

function Controls() {
  const { db, date, update } = useApp();
  const [week, setWeek] = useState(Math.min(db.current, TOTAL_WEEKS));
  const [day, setDay] = useState(1);
  const cur = db.current;
  const inCourse = cur <= TOTAL_WEEKS;

  const act = async (msg: string, fn: (d: DB) => void, danger = false) =>
    (await confirmDialog({ title: msg, danger, confirmLabel: danger ? "Yes, do it" : "Yes" })) && update(fn);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel title="Unlock everything (testing mode)">
        <p className="text-muted">Opens every ready week and lesson on the student screens, so you can check the whole course. Turn it off before he starts.</p>
        <label className="mt-4 flex w-fit cursor-pointer items-center gap-3 font-semibold">
          <input
            type="checkbox"
            className="size-5"
            checked={db.settings.unlockAll}
            onChange={(e) => update((d) => ((d.settings.unlockAll = e.target.checked), logEvent(d, `Testing mode ${e.target.checked ? "on" : "off"}`)))}
          />
          {db.settings.unlockAll ? "On — everything is unlocked" : "Off"}
        </label>
      </Panel>
      <Panel title="Reset everything">
        <p className="text-muted">Clears all progress, time, tests and history. Keeps the name, age, password and settings. He starts week 1 today.</p>
        <button
          type="button"
          onClick={() =>
            act("Reset ALL progress? This cannot be undone.", (d) => {
              Object.assign(d, { current: 1, weeks: { 1: firstWeekState(date, daysFor(d, 1)) }, lessons: {}, days: {}, tests: [], answers: [], events: [], maxDateSeen: date });
              logEvent(d, "Teacher reset all progress");
            }, true)
          }
          className={`${btn} mt-4 bg-bad text-white`}
        >
          Reset everything
        </button>
      </Panel>
      {inCourse && (
        <Panel title={`Skip week ${cur}`}>
          <p className="text-muted">Mark week {cur} as skipped and start week {cur + 1} today.</p>
          <button type="button" onClick={() => act(`Skip week ${cur}? Week ${cur + 1} starts today.`, (d) => skipWeek(d, cur, date))} className={`${btn} mt-4 bg-warn text-white`}>
            Skip week {cur}
          </button>
        </Panel>
      )}
      {inCourse && (
        <Panel title="Open the test today">
          <p className="text-muted">Lets him take this week's test today (all lessons must still be finished).</p>
          <button type="button" onClick={() => act("Open the test today?", (d) => openTestNow(d, date))} className={`${btn} mt-4 bg-accent text-white`}>
            Open test now
          </button>
        </Panel>
      )}
      <Panel title="Move student to any week and day">
        <p className="mb-4 text-muted">From today, his home screen starts at the week and day you choose.</p>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            className="w-48"
            value={String(week)}
            onChange={(v) => (setWeek(Number(v)), setDay(1))}
            options={WEEKS.map((w) => ({ value: String(w.n), label: `Week ${w.n}${w.content ? "" : " (not ready)"}` }))}
          />
          <Select
            className="w-28"
            value={String(day)}
            onChange={(v) => setDay(Number(v))}
            options={Array.from({ length: daysFor(db, week) }, (_, i) => ({ value: String(i + 1), label: `Day ${i + 1}` }))}
          />
        </div>
        <button type="button" onClick={() => act(`Move him to week ${week}, day ${day}?`, (d) => moveTo(d, week, day, date))} className={`${btn} mt-4 bg-accent text-white`}>
          Move
        </button>
      </Panel>
      {inCourse && (
        <Panel title={`Restart week ${cur}`}>
          <p className="text-muted">Clears all lesson progress of week {cur}. He starts from day 1 today.</p>
          <button type="button" onClick={() => act(`Restart week ${cur}? All its lesson progress is cleared.`, (d) => repeatWeek(d, cur, date), true)} className={`${btn} mt-4 bg-bad text-white`}>
            Restart week {cur}
          </button>
        </Panel>
      )}
      {date < db.maxDateSeen && (
        <Panel title="Date lock">
          <p className="text-muted">The laptop's date went backwards, so the student screen is locked. Fix the laptop's date, or unlock here.</p>
          <button type="button" onClick={() => update((d) => void (d.maxDateSeen = date))} className={`${btn} mt-4 bg-accent text-white`}>
            Unlock
          </button>
        </Panel>
      )}
    </div>
  );
}

/** A settings row: label and hint on the left, control on the right. */
function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-3.5">
      <div>
        <div className="font-semibold">{label}</div>
        {hint && <div className="text-sm text-muted">{hint}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">{title}</h2>
      <div className="divide-y divide-line rounded-2xl bg-card ring-1 ring-line">{children}</div>
    </section>
  );
}

function NumberBox({ value, onChange, unit, min = 0, max = 100 }: { value: number; onChange: (n: number) => void; unit: string; min?: number; max?: number }) {
  return (
    <label className="flex items-center overflow-hidden rounded-xl border-2 border-line bg-card focus-within:border-accent">
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-16 px-2 py-1.5 text-right font-semibold tabular-nums outline-none" />
      <span className="bg-paper px-2.5 py-1.5 text-sm text-muted">{unit}</span>
    </label>
  );
}

const SUBJECT_COLOR = { urdu: "#047857", english: "#2563eb", math: "#e1533d" } as const;

/** Pick a week, see what it contains, and choose how many study days it gets. */
function WeekDaysEditor({ settings, onChange }: { settings: Settings; onChange: (weekDays: Record<number, number>) => void }) {
  const { db } = useApp();
  const [week, setWeek] = useState(Math.min(db.current, TOTAL_WEEKS));
  const plan = WEEKS[week - 1];
  const stage = STAGES.find((x) => x.weeks.includes(week))!;
  const lessons = weekLessons(week);
  const chosen = settings.weekDays?.[week];
  const fallback = WEEKS[week - 1]?.days ?? settings.studyDays;
  const days = chosen ?? fallback;
  const ws = db.weeks[week];
  const status =
    week === db.current
      ? { text: "Current week", tone: "bg-accent text-white" }
      : ws?.status === "passed"
        ? { text: `Passed ${prettyDate(ws.endedOn!, { day: "numeric", month: "short" })}`, tone: "bg-good-soft text-good" }
        : ws?.status === "skipped"
          ? { text: "Skipped", tone: "bg-warn-soft text-warn" }
          : { text: "Upcoming", tone: "bg-paper text-muted" };
  const perDay = Array.from({ length: days }, (_, i) => {
    const refs = lessons.filter((r) => lessonDay(undefined, r, days) === i + 1);
    return { refs, minutes: refs.reduce((m, r) => m + (r.lesson.minutes ?? 30), 0) };
  });
  const maxMinutes = Math.max(60, ...perDay.map((d) => d.minutes));
  const totalMinutes = lessons.reduce((m, r) => m + (r.lesson.minutes ?? 30), 0);

  function choose(v: number | null) {
    const weekDays = { ...settings.weekDays };
    if (v) weekDays[week] = v;
    else delete weekDays[week];
    onChange(weekDays);
  }

  return (
    <div className="px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold">Study days for each week</div>
          <div className="text-sm text-muted">Choose a week to see what it contains and set its days.</div>
        </div>
        <Select
          className="w-48 shrink-0"
          value={String(week)}
          onChange={(v) => setWeek(Number(v))}
          options={WEEKS.map((w) => ({ value: String(w.n), label: `Week ${w.n}${settings.weekDays?.[w.n] ? ` · ${settings.weekDays[w.n]} days` : ""}` }))}
        />
      </div>

      <div className="mt-4 rounded-2xl bg-paper p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-card px-2.5 py-0.5 text-xs font-bold text-muted ring-1 ring-line">
            {stage.name} · {stage.level}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${status.tone}`}>{status.text}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold">
          Week {week}: {plan.title}
        </h3>
        {lessons.length > 0 ? (
          <p className="text-sm text-muted">
            {SUBJECTS.map((x) => `${lessons.filter((r) => r.subject === x.key).length} ${x.name}`).join(" · ")} · {lessons.length} lessons · {formatDuration(totalMinutes * 60)} in total
          </p>
        ) : (
          <p className="text-sm font-semibold text-warn">Lessons for this week are not written yet.</p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {SUBJECTS.map((x) => (
            <div key={x.key} className="rounded-xl bg-card p-3 ring-1 ring-line">
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: SUBJECT_COLOR[x.key] }}>
                {x.name}
              </div>
              <ul className="mt-1 space-y-0.5 text-xs text-muted">
                {plan.goals[x.key].map((g) => (
                  <li key={g}>• {g}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold">Study days for week {week}</span>
        <div className="flex rounded-xl bg-paper p-1 ring-1 ring-line">
          {[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((v) => {
            const on = (chosen ?? null) === v;
            return (
              <button
                key={String(v)}
                type="button"
                onClick={() => choose(v)}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold transition ${on ? "bg-accent text-white shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {v ?? `Default · ${fallback}`}
              </button>
            );
          })}
        </div>
      </div>

      {lessons.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {perDay.map((d, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-12 shrink-0 font-semibold">Day {i + 1}</span>
              <div className="flex h-5 flex-1 overflow-hidden rounded-md bg-paper">
                {d.refs.map((r) => (
                  <span
                    key={r.lesson.id}
                    title={r.lesson.title}
                    className="h-full border-r border-card"
                    style={{ width: `${((r.lesson.minutes ?? 30) / maxMinutes) * 100}%`, background: SUBJECT_COLOR[r.subject] }}
                  />
                ))}
              </div>
              <span className="w-40 shrink-0 text-right text-muted tabular-nums">
                {d.refs.length} lessons · {formatDuration(d.minutes * 60)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const small = "rounded-xl border-2 border-line bg-card px-3 py-1.5 font-semibold outline-none focus:border-accent";

function SettingsTab() {
  const { db, update } = useApp();
  const initial = { settings: db.settings, name: db.studentName, age: db.studentAge ? String(db.studentAge) : "" };
  const [s, setS] = useState<Settings>(initial.settings);
  const [name, setName] = useState(initial.name);
  const [age, setAge] = useState(initial.age);
  const [pwOpen, setPwOpen] = useState(false);
  const [note, setNote] = useState("");
  const dirty = JSON.stringify([s, name, age]) !== JSON.stringify([db.settings, db.studentName, initial.age]);
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS({ ...s, [k]: v });

  function save() {
    update((d) => {
      d.settings = { ...s, studyDays: Math.min(10, Math.max(1, s.studyDays || 4)) };
      d.studentName = name.trim() || d.studentName;
      if (age) d.studentAge = Number(age);
      replanCurrentWeek(d);
      logEvent(d, "Teacher changed settings");
    });
    setNote("Settings saved");
    setTimeout(() => setNote(""), 2500);
  }

  function discard() {
    setS(db.settings);
    setName(db.studentName);
    setAge(initial.age);
  }

  return (
    <div className="max-w-3xl space-y-7 pb-24">
      <Group title="Schedule">
        <Row label="Study days per week" hint="Days of lessons before each test. The week's lessons are spread over them.">
          <NumberBox value={s.studyDays} onChange={(v) => set("studyDays", v)} unit="days" min={1} max={10} />
        </Row>
        <WeekDaysEditor settings={s} onChange={(weekDays) => set("weekDays", weekDays)} />
      </Group>

      <Group title="Pass marks">
        <Row label="Lesson quizzes and drills" hint="Every quiz in a lesson must reach this.">
          <NumberBox value={s.lessonPass} onChange={(v) => set("lessonPass", v)} unit="%" />
        </Row>
        <Row label="Weekly laptop test" hint="Below this he goes to revision.">
          <NumberBox value={s.testPass} onChange={(v) => set("testPass", v)} unit="%" />
        </Row>
        <Row label="Teacher-marked test" hint="The oral / written part you mark.">
          <NumberBox value={s.teacherPass} onChange={(v) => set("teacherPass", v)} unit="%" />
        </Row>
      </Group>

      <Group title="Study rules">
        <Row label="Minimum lesson time" hint="Share of a lesson's planned minutes before it can be finished.">
          <NumberBox value={s.minTimePct} onChange={(v) => set("minTimePct", v)} unit="%" />
        </Row>
        <Row label="Idle cut-off" hint="Study time stops counting after this long without mouse or keyboard.">
          <NumberBox value={s.idleSeconds} onChange={(v) => set("idleSeconds", v)} unit="sec" max={3600} />
        </Row>
      </Group>

      <Group title="Student">
        <Row label="Name">
          <input className={`${small} w-56`} value={name} onChange={(e) => setName(e.target.value)} />
        </Row>
        <Row label="Age">
          <AgeSelect className="w-56" value={age} onChange={setAge} />
        </Row>
      </Group>

      <Group title="Security">
        <Row label="Teacher password" hint="Used to open this panel with Ctrl + Shift + D.">
          <button type="button" onClick={() => setPwOpen(true)} className={`${btn} border border-line hover:bg-paper`}>
            Change password
          </button>
        </Row>
      </Group>

      {pwOpen && (
        <ChangePassword
          onClose={() => setPwOpen(false)}
          onDone={() => {
            setPwOpen(false);
            setNote("Password changed");
            setTimeout(() => setNote(""), 2500);
          }}
        />
      )}
      {(dirty || note) && (
        <div className="fixed inset-x-0 bottom-6 z-20 flex justify-center print:hidden">
          <div className="flex items-center gap-4 rounded-2xl bg-ink px-5 py-3 text-white shadow-2xl">
            {dirty ? (
              <>
                <span className="font-semibold">You have unsaved changes</span>
                <button type="button" onClick={discard} className="rounded-full px-4 py-1.5 font-semibold text-white/80 hover:bg-white/10">
                  Discard
                </button>
                <button type="button" onClick={save} className="rounded-full bg-good px-5 py-1.5 font-semibold">
                  Save
                </button>
              </>
            ) : (
              <span className="flex items-center gap-2 font-semibold">
                <Check className="size-4 text-good" strokeWidth={3} /> {note}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ChangePassword({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const { update } = useApp();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");

  async function save() {
    if (pw.length < 4) return setError("The password must be at least 4 characters.");
    if (pw !== pw2) return setError("The two passwords do not match.");
    const p = await makePassword(pw);
    update((d) => {
      d.password = p;
      logEvent(d, "Teacher changed the password");
    });
    onDone();
  }

  return (
    <Modal title="Change password" onClose={onClose}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold">New password</span>
          <PasswordInput autoFocus value={pw} onChange={(e) => (setPw(e.target.value), setError(""))} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Type it again</span>
          <PasswordInput value={pw2} onChange={(e) => (setPw2(e.target.value), setError(""))} onKeyDown={(e) => e.key === "Enter" && save()} />
        </label>
        {error && <p className="text-sm font-semibold text-bad">{error}</p>}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="rounded-full border border-line px-5 py-2 font-semibold hover:bg-paper">
          Cancel
        </button>
        <button type="button" onClick={save} className="rounded-full bg-accent px-5 py-2 font-semibold text-white">
          Save password
        </button>
      </div>
    </Modal>
  );
}
