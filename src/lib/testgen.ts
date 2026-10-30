import { WEEKS } from "@/content/plan";
import { SUBJECT_ORDER } from "./schedule";
import type { QuizQuestion, Subject } from "./types";

export type TestQuestion =
  | { kind: "choice"; subject: Subject; lessonId: string; q: QuizQuestion }
  | { kind: "number"; subject: Subject; lessonId: string; text: string; answer: number };

/** How many questions of each kind the weekly laptop test takes per subject. */
const PER_SUBJECT: Record<Subject, { choice: number; number: number }> = {
  urdu: { choice: 15, number: 0 },
  english: { choice: 15, number: 0 },
  math: { choice: 8, number: 10 },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}

const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

/** A number as written in a sum: true minus sign, and brackets around a negative second number. */
export const signed = (n: number, bracket = false) => (n < 0 ? (bracket ? `(−${-n})` : `−${-n}`) : String(n));

/** "−5 + (−7)", "12 × 3" … */
export function problemText(op: string, x: number, y: number) {
  return `${signed(x)} ${op === "-" ? "−" : op} ${signed(y, true)}`;
}

export function makeProblem(op: string, a: [number, number], b: [number, number]) {
  let x = rnd(...a);
  let y = rnd(...b);
  if (op === "-" && y > x) [x, y] = [y, x];
  if (op === "÷") x = x * y;
  const answer = op === "+" ? x + y : op === "-" ? x - y : op === "×" ? x * y : x / y;
  return { x, y, answer };
}

/** Builds a fresh random test from the week's lesson quizzes and drills. */
export function makeTest(week: number): TestQuestion[] {
  const content = WEEKS[week - 1].content!;
  return SUBJECT_ORDER.flatMap((subject) => {
    const choice: TestQuestion[] = [];
    const number: TestQuestion[] = [];
    for (const lesson of content[subject]) {
      for (const block of lesson.blocks) {
        if (block.type === "quiz") {
          for (const q of block.questions) choice.push({ kind: "choice", subject, lessonId: lesson.id, q: shuffleOptions(q) });
        } else if (block.type === "drill") {
          for (let i = 0; i < 3; i++) {
            const p = makeProblem(block.op, block.a, block.b);
            number.push({ kind: "number", subject, lessonId: lesson.id, text: `${problemText(block.op, p.x, p.y)} =`, answer: p.answer });
          }
        }
      }
    }
    const want = PER_SUBJECT[subject];
    return [...shuffle(choice).slice(0, want.choice), ...shuffle(number).slice(0, want.number)];
  });
}
