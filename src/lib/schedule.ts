/**
 * The weekly cycle: a few study days (lessons open one day at a time), then a test.
 * Week 1 is stretched so its test falls on a Thursday. A failed test gives 2 revision days, then a retest.
 * A passed week starts the next week the following day, with its full study days again.
 */
import { WEEKS } from "@/content/plan";
import { addDays, diffDays, type DateStr, weekday } from "./dates";
import { type DB, type TestAttempt, type WeekState, logEvent } from "./db";
import type { Lesson, Subject } from "./types";

export const SUBJECT_ORDER: Subject[] = ["urdu", "english", "math"];
/** Lessons are usually written across 6 days; they are packed into however many study days the week has. */
export const CONTENT_DAYS = 6;

/** Days a week's lessons are written for (Weeks 9–12 use more). */
export const contentDaysOf = (week: number) => WEEKS[week - 1]?.content?.contentDays ?? CONTENT_DAYS;
export const TOTAL_WEEKS = WEEKS.length;
const THURSDAY = 4;
const REVISION_DAYS = 2;

export type LessonRef = { lesson: Lesson; subject: Subject; index: number; week: number };

export function weekLessons(n: number): LessonRef[] {
  const content = WEEKS[n - 1]?.content;
  if (!content) return [];
  return SUBJECT_ORDER.flatMap((subject) => content[subject].map((lesson, index) => ({ lesson, subject, index, week: n }))).sort(
    (a, b) => a.lesson.day - b.lesson.day || SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject) || a.index - b.index,
  );
}

export function findLesson(id: string): LessonRef | undefined {
  for (const w of WEEKS) {
    const ref = weekLessons(w.n).find((r) => r.lesson.id === id);
    if (ref) return ref;
  }
}

export function newWeekState(start: DateStr, planDays: number, studyDays = planDays): WeekState {
  return { start, planDays, studyDays, testDate: addDays(start, studyDays), status: "studying" };
}

/** Week 1 runs until the first Thursday that leaves at least 6 study days. */
export function firstWeekState(start: DateStr, planDays: number): WeekState {
  let days = planDays;
  while (weekday(addDays(start, days)) !== THURSDAY) days++;
  return newWeekState(start, planDays, days);
}

export const planDaysOf = (ws: WeekState) => ws.planDays ?? CONTENT_DAYS;

/** Study days for a week: the teacher's per-week choice, else the general setting. */
export const daysFor = (db: DB, week: number) => db.settings.weekDays?.[week] ?? WEEKS[week - 1]?.days ?? db.settings.studyDays;

/**
 * Study day on which a lesson opens. Up to the written number of days the lessons keep their grouping;
 * with more days they are spread evenly in order, so no day is empty.
 */
export function lessonDay(ws: WeekState | undefined, ref: LessonRef, days = ws ? planDaysOf(ws) : contentDaysOf(ref.week)) {
  const written = contentDaysOf(ref.week);
  if (days <= written) return Math.ceil((ref.lesson.day * days) / written);
  const all = weekLessons(ref.week);
  const i = all.findIndex((r) => r.lesson.id === ref.lesson.id);
  return Math.floor((i * days) / all.length) + 1;
}

/** 1-based study day for a date, 0 if the week has not started. */
export function studyDay(ws: WeekState, date: DateStr) {
  return Math.max(0, diffDays(date, ws.start) + 1);
}

/** Highest lesson day that is open. Extra days in a stretched week are for revision. */
export function openLessonDay(ws: WeekState, date: DateStr) {
  return Math.min(studyDay(ws, date), planDaysOf(ws));
}

export const isDone = (db: DB, id: string) => !!db.lessons[id]?.done;

/** `opensOn` is set when the lesson waits for a later study day; otherwise a locked lesson waits for the one before it. */
export type LessonState = { state: "done" | "open" | "locked"; reason?: string; opensOn?: number; revision?: boolean };

export function lessonState(db: DB, ref: LessonRef, date: DateStr): LessonState {
  if (db.settings.unlockAll) return { state: isDone(db, ref.lesson.id) ? "done" : "open" };
  const ws = db.weeks[ref.week];
  if (!ws) return { state: "locked", reason: "Not started" };
  if (ws.status === "revision" && ws.revision?.lessonIds.includes(ref.lesson.id)) {
    return ws.revision.redone.includes(ref.lesson.id) ? { state: "done", revision: true } : { state: "open", revision: true };
  }
  if (isDone(db, ref.lesson.id)) return { state: "done" };
  const day = lessonDay(ws, ref);
  if (day > openLessonDay(ws, date)) return { state: "locked", reason: `Opens on day ${day}`, opensOn: day };
  const prev = WEEKS[ref.week - 1].content![ref.subject][ref.index - 1];
  if (prev && !isDone(db, prev.id)) return { state: "locked", reason: "Finish the lesson before it first" };
  return { state: "open" };
}

export type Phase =
  | { kind: "complete" }
  | { kind: "not-ready"; week: number }
  | { kind: "waiting"; week: number; start: DateStr }
  | { kind: "study"; week: number; ws: WeekState; day: number; testDue: boolean }
  | { kind: "test"; week: number; retest: boolean }
  | { kind: "awaiting-teacher"; week: number; attempt: TestAttempt }
  | { kind: "revision"; week: number; ws: WeekState };

export function getPhase(db: DB, date: DateStr): Phase {
  const n = db.current;
  if (n > TOTAL_WEEKS) return { kind: "complete" };
  if (!WEEKS[n - 1].content) return { kind: "not-ready", week: n };
  const ws = db.weeks[n];
  if (date < ws.start) return { kind: "waiting", week: n, start: ws.start };
  if (ws.status === "awaiting-teacher") return { kind: "awaiting-teacher", week: n, attempt: lastAttempt(db, n)! };
  if (ws.status === "revision") {
    const r = ws.revision!;
    const ready = date >= r.retestDate && r.lessonIds.every((id) => r.redone.includes(id));
    return ready ? { kind: "test", week: n, retest: true } : { kind: "revision", week: n, ws };
  }
  const allDone = weekLessons(n).every((r) => isDone(db, r.lesson.id));
  if (date >= ws.testDate && allDone) return { kind: "test", week: n, retest: db.tests.some((t) => t.week === n) };
  return { kind: "study", week: n, ws, day: studyDay(ws, date), testDue: date >= ws.testDate };
}

export const lastAttempt = (db: DB, week: number) => db.tests.filter((t) => t.week === week).at(-1);

const pct = (a: number, b: number) => (b ? (a / b) * 100 : 0);

export function pass(db: DB, week: number, date: DateStr) {
  const ws = db.weeks[week];
  ws.status = "passed";
  ws.endedOn = date;
  delete ws.revision;
  const t = lastAttempt(db, week);
  if (t) t.result = "pass";
  db.current = week + 1;
  if (week < TOTAL_WEEKS) db.weeks[week + 1] = newWeekState(addDays(date, 1), daysFor(db, week + 1));
  logEvent(db, `Week ${week} passed`);
}

export function fail(db: DB, week: number, date: DateStr, lessonIds: string[]) {
  const ws = db.weeks[week];
  const ids = lessonIds.length ? lessonIds : weekLessons(week).map((r) => r.lesson.id);
  ws.status = "revision";
  ws.revision = { lessonIds: [...new Set(ids)], redone: [], retestDate: addDays(date, REVISION_DAYS + 1) };
  const t = lastAttempt(db, week);
  if (t) t.result = "fail";
  logEvent(db, `Week ${week} test failed — ${ws.revision.lessonIds.length} lessons to revise, retest on ${ws.revision.retestDate}`);
}

/** After the on-laptop part. Passing it hands over to the teacher for the oral / written part. */
export function recordAutoTest(db: DB, attempt: TestAttempt) {
  db.tests.push(attempt);
  const ok = pct(attempt.auto.correct, attempt.auto.total) >= db.settings.testPass;
  logEvent(db, `Week ${attempt.week} laptop test: ${attempt.auto.correct}/${attempt.auto.total}`);
  if (ok) db.weeks[attempt.week].status = "awaiting-teacher";
  else fail(db, attempt.week, attempt.date, attempt.auto.wrongLessons);
}

export function recordTeacherMarks(db: DB, week: number, date: DateStr, marks: { score: number; total: number; notes: string; revise: Subject[] }) {
  const t = lastAttempt(db, week)!;
  t.teacher = { score: marks.score, total: marks.total, notes: marks.notes, date };
  logEvent(db, `Week ${week} teacher marks: ${marks.score}/${marks.total}`);
  if (pct(marks.score, marks.total) >= db.settings.teacherPass) pass(db, week, date);
  else
    fail(
      db,
      week,
      date,
      weekLessons(week)
        .filter((r) => marks.revise.includes(r.subject))
        .map((r) => r.lesson.id),
    );
}

export function skipWeek(db: DB, week: number, date: DateStr) {
  db.weeks[week] = { ...(db.weeks[week] ?? newWeekState(date, daysFor(db, week))), status: "skipped", endedOn: date };
  db.current = week + 1;
  if (week < TOTAL_WEEKS) db.weeks[week + 1] = newWeekState(date, daysFor(db, week + 1));
  logEvent(db, `Teacher skipped week ${week}`);
}

export function moveTo(db: DB, week: number, day: number, date: DateStr) {
  db.current = week;
  db.weeks[week] = newWeekState(addDays(date, -(day - 1)), daysFor(db, week));
  logEvent(db, `Teacher moved student to week ${week}, day ${day}`);
}

export function repeatWeek(db: DB, week: number, date: DateStr) {
  for (const r of weekLessons(week)) delete db.lessons[r.lesson.id];
  moveTo(db, week, 1, date);
  logEvent(db, `Teacher restarted week ${week}`);
}

export function openTestNow(db: DB, date: DateStr) {
  const ws = db.weeks[db.current];
  if (ws.status === "revision" && ws.revision) ws.revision.retestDate = date;
  else ws.testDate = date;
  logEvent(db, `Teacher opened the week ${db.current} test early`);
}

/** Applies changed study-day settings to the week in progress. */
export function replanCurrentWeek(db: DB) {
  const ws = db.weeks[db.current];
  if (!ws || ws.status !== "studying") return;
  const n = daysFor(db, db.current);
  const next = db.current === 1 && ws.studyDays !== planDaysOf(ws) ? firstWeekState(ws.start, n) : newWeekState(ws.start, n);
  db.weeks[db.current] = { ...ws, ...next, status: ws.status };
}
