import type { DateStr } from "./dates";
import type { Subject } from "./types";

export type Settings = {
  /** Minimum % on every lesson quiz and drill. */
  lessonPass: number;
  /** Minimum % on the on-laptop part of the weekly test. */
  testPass: number;
  /** Minimum % on the teacher-marked (oral / written) part. */
  teacherPass: number;
  /** A lesson can only be finished after this % of its planned minutes. */
  minTimePct: number;
  /** Stop counting study time after this many seconds without input. */
  idleSeconds: number;
  /** Study days before each weekly test; the week's lessons are spread over them. */
  studyDays: number;
  /** Per-week override of studyDays, by week number. */
  weekDays: Record<number, number>;
  /** Testing mode: every week and lesson is open on the student screens. */
  unlockAll: boolean;
};

/** Teacher password on a fresh install; can be changed in Settings. */
export const DEFAULT_PASSWORD = "255245";

export const DEFAULT_SETTINGS: Settings = { lessonPass: 90, testPass: 90, teacherPass: 90, minTimePct: 80, idleSeconds: 120, studyDays: 6, weekDays: {}, unlockAll: false };

export type WeekStatus = "studying" | "awaiting-teacher" | "revision" | "passed" | "skipped";

export type WeekState = {
  start: DateStr;
  /** Calendar days before the test (week 1 may be stretched to reach a Thursday). */
  studyDays: number;
  /** Days the lessons are spread over; older saves without it used 6. */
  planDays?: number;
  testDate: DateStr;
  status: WeekStatus;
  revision?: { lessonIds: string[]; redone: string[]; retestDate: DateStr };
  endedOn?: DateStr;
};

export type LessonRecord = {
  seconds: number;
  /** Best % per block index (quizzes and drills). */
  best: Record<string, number>;
  /** Writing blocks the student confirmed. */
  written: Record<string, boolean>;
  quizAttempts: number;
  done?: DateStr;
};

export type TestAttempt = {
  id: string;
  week: number;
  date: DateStr;
  seconds: number;
  auto: { correct: number; total: number; bySubject: Record<Subject, { correct: number; total: number }>; wrongLessons: string[] };
  teacher?: { score: number; total: number; notes: string; date: DateStr };
  result?: "pass" | "fail";
};

export type AnswerLog = { t: number; lessonId: string; q: string; ok: boolean };

export type DB = {
  version: 1;
  studentName: string;
  studentAge?: number;
  password: { salt: string; hash: string };
  settings: Settings;
  current: number;
  weeks: Record<number, WeekState>;
  lessons: Record<string, LessonRecord>;
  days: Record<DateStr, { seconds: number }>;
  tests: TestAttempt[];
  answers: AnswerLog[];
  maxDateSeen: DateStr;
  events: { t: number; text: string }[];
};

const KEY = "roshni-db";

declare global {
  interface Window {
    roshni?: { platform: string; load(): Promise<string | null>; save(json: string): Promise<boolean> };
  }
}

export async function loadDB(): Promise<DB | null> {
  const raw = window.roshni ? await window.roshni.load() : localStorage.getItem(KEY);
  if (!raw) return null;
  const db = JSON.parse(raw) as DB;
  db.settings = { ...DEFAULT_SETTINGS, ...db.settings };
  return db;
}

export async function saveDB(db: DB) {
  const json = JSON.stringify(db);
  if (window.roshni) await window.roshni.save(json);
  else localStorage.setItem(KEY, json);
}

export function lessonRecord(db: DB, id: string): LessonRecord {
  return (db.lessons[id] ??= { seconds: 0, best: {}, written: {}, quizAttempts: 0 });
}

export function logEvent(db: DB, text: string) {
  db.events.push({ t: Date.now(), text });
  if (db.events.length > 500) db.events.splice(0, db.events.length - 500);
}

async function pbkdf2(password: string, salt: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 150000, hash: "SHA-256" }, key, 256);
  return btoa(String.fromCharCode(...new Uint8Array(bits)));
}

export async function makePassword(password: string) {
  const salt = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  return { salt, hash: await pbkdf2(password, salt) };
}

export async function checkPassword(db: DB, password: string) {
  return (await pbkdf2(password, db.password.salt)) === db.password.hash;
}
