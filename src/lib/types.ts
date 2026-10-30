export type Lang = "ur" | "en";
export type Subject = "urdu" | "english" | "math";

/**
 * A speakable piece of content. `ur` is spoken in Urdu, `en` in English.
 * `say` / `sayEn` override what the voice reads (e.g. a letter's name instead of the bare letter).
 */
export type Item = {
  ur?: string;
  en?: string;
  say?: string;
  sayEn?: string;
  roman?: string;
  emoji?: string;
  note?: string;
  word?: Item;
};

export type QuizQuestion = {
  q?: string;
  prompt?: Item;
  /** Hide the prompt text: the learner only hears it. */
  listen?: boolean;
  options: Item[];
  answer: number;
};

export type Block =
  | { type: "cards"; title?: string; lang: Lang; items: Item[]; size?: "xl" | "lg" | "md" }
  | { type: "phrases"; title?: string; lang: Lang; items: Item[] }
  | { type: "reading"; title?: string; lang: Lang; lines: Item[]; /** Show as flowing text (a story) instead of one line per row. */ paragraph?: boolean; /** Test mode: English text only, without word meanings or the Urdu line. */ plain?: boolean }
  | { type: "rule"; title: string; points: string[]; lang?: Lang; examples?: Item[] }
  | { type: "quiz"; title?: string; lang: Lang; questions: QuizQuestion[] }
  | { type: "write"; title?: string; lang: Lang; items: string[]; note?: string }
  | { type: "table"; title?: string; headers: string[]; rows: (string | number)[][]; dir?: "rtl" | "ltr" }
  | { type: "drill"; title?: string; op: "+" | "-" | "×" | "÷"; a: [number, number]; b: [number, number]; count: number }
  | { type: "numbergrid"; from: number; to: number };

export type Lesson = {
  id: string;
  /** Content day of the week (1…contentDays, usually 1–6) on which this lesson opens. */
  day: number;
  title: string;
  titleUr?: string;
  minutes?: number;
  blocks: Block[];
};

export type TestPart = { title: string; items: string[]; dir?: "rtl" | "ltr"; oral?: boolean };

export type WeekContent = {
  /** Number of days the lessons are written for (their `day` runs 1…contentDays). Default 6. */
  contentDays?: number;
  urdu: Lesson[];
  english: Lesson[];
  math: Lesson[];
  /** The part of the weekly test the teacher marks by hand; the on-laptop part is generated from the lessons. */
  test: { kind: "oral" | "written"; parts: Record<Subject, TestPart[]> };
};

export type WeekPlan = {
  n: number;
  stage: string;
  title: string;
  goals: Record<Subject, string[]>;
  books: { label: string; url: string }[];
  /** Default study days for this week (the teacher can still change it). Falls back to the general setting. */
  days?: number;
  content?: WeekContent;
};
