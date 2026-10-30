/** Small builders shared by the week content files. In every builder the first option given is the right one. */
import type { Lesson, QuizQuestion, Item } from "@/lib/types";

export type DraftLesson = Omit<Lesson, "day">;

/** Gives each lesson the content day (1–6) it opens on. */
export const onDays = (lessons: DraftLesson[], days: number[]): Lesson[] => lessons.map((l, i) => ({ ...l, day: days[i] }));

const sorted = (xs: string[]) => [...xs].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

/** Written question with Urdu options. */
export const askUr = (q: string, right: string, ...wrong: string[]): QuizQuestion => {
  const options = sorted([right, ...wrong]);
  return { q, options: options.map((ur) => ({ ur })), answer: options.indexOf(right) };
};

/** Hear an Urdu word or sentence, pick it from written options. */
export const hearUr = (q: string, said: string, options: string[]): QuizQuestion => ({
  q,
  prompt: { ur: said },
  listen: true,
  options: options.map((ur) => ({ ur })),
  answer: options.indexOf(said),
});

/** Hear an Urdu word, pick its picture. Options are [word, emoji] pairs. */
export const picUr = (q: string, pairs: [string, string][]): QuizQuestion => {
  const options = [...pairs].sort((a, b) => a[1].localeCompare(b[1]));
  return { q, prompt: { ur: pairs[0][0] }, listen: true, options: options.map(([, emoji]) => ({ emoji })), answer: options.indexOf(pairs[0]) };
};

/** Written question with English (or number) options. */
export const askEn = (q: string, right: string, ...wrong: string[]): QuizQuestion => {
  const options = sorted([right, ...wrong]);
  return { q, options: options.map((en) => ({ en })), answer: options.indexOf(right) };
};

/** Hear an English word, pick its picture. Options are [word, emoji] pairs. */
export const picEn = (pairs: [string, string][]): QuizQuestion => {
  const options = [...pairs].sort((a, b) => a[0].localeCompare(b[0]));
  return { q: "Which one?", prompt: { en: pairs[0][0] }, listen: true, options: options.map(([en, emoji]) => ({ en, emoji })), answer: options.indexOf(pairs[0]) };
};

/** Pick the Urdu meaning of an English sentence. */
export const meanEn = (en: string, right: string, ...wrong: string[]): QuizQuestion => {
  const options = sorted([right, ...wrong]);
  return { q: "What does this mean?", prompt: { en }, options: options.map((ur) => ({ ur })), answer: options.indexOf(right) };
};

/** An English word card with its Urdu meaning. */
export const W = (en: string, ur: string, emoji?: string): Item => ({ en, ur, emoji });

/* ---------- Daily packs: the extra English and Urdu work for each study day ---------- */

/** Question, right answer, wrong answers. */
type Q = [string, string, ...string[]];

export type DailyPack = {
  /** Content day (1–6). */
  day: number;
  /** English reading: lines are [English, Urdu]; words are [English, Urdu, emoji?]. */
  en: { title: string; titleUr: string; lines: [string, string][]; words: [string, string, string?][]; questions: Q[]; write?: string };
  /** Translation drill: [Urdu, English]. */
  tr: [string, string][];
  /** Urdu reading: one paragraph; words are [word, meaning]. */
  ur: { title: string; titleUr: string; lines: string[]; words: [string, string][]; questions: Q[]; write?: string };
};

/** Picks n items spread evenly through a list (stable, no randomness, so lessons don't change between runs). */
const spread = <T,>(xs: T[], n: number) => Array.from({ length: Math.min(n, xs.length) }, (_, i) => xs[Math.floor((i * xs.length) / Math.min(n, xs.length))]);

/** Three options: the right one and its two neighbours in the list, sorted. */
function neighbours(all: string[], i: number): string[] {
  const n = all.length;
  return [all[i], all[(i + 1) % n], all[(i + n - 1) % n]];
}

/** Builds the four extra lessons of one study day. */
export function packLessons(week: number, packs: DailyPack[]): { english: Lesson[]; urdu: Lesson[] } {
  const english: Lesson[] = [];
  const urdu: Lesson[] = [];
  for (const p of packs) {
    const id = `w${week}-d${p.day}`;
    const lines = p.en.lines.map(([en, ur]) => ({ en, ur }));
    const enTexts = p.en.lines.map(([en]) => en);

    english.push({
      id: `${id}-en-read`,
      day: p.day,
      title: `Reading: ${p.en.title}`,
      titleUr: p.en.titleUr,
      minutes: 75,
      blocks: [
        { type: "reading", title: p.en.title, lang: "en", lines },
        { type: "cards", title: "New words", lang: "en", size: "md", items: p.en.words.map(([en, ur, emoji]) => W(en, ur, emoji)) },
        { type: "quiz", title: "Questions on the passage", lang: "en", questions: p.en.questions.map(([q, r, ...w]) => askEn(q, r, ...w)) },
        {
          type: "write",
          lang: "en",
          items: p.en.words.map(([en]) => en),
          note: p.en.write ?? "Copy the whole passage into your notebook. Under each new word write its Urdu meaning. Then read the passage aloud three times.",
        },
      ],
    });

    english.push({
      id: `${id}-en-listen`,
      day: p.day,
      title: `Listen and speak: ${p.en.title}`,
      titleUr: "سنیں اور بولیں",
      minutes: 45,
      blocks: [
        { type: "phrases", title: "Listen to each line, then say it aloud three times", lang: "en", items: lines },
        {
          type: "quiz",
          title: "Which sentence did you hear?",
          lang: "en",
          questions: spread(
            enTexts.map((_, i) => i),
            8,
          ).map((i) => {
            const opts = neighbours(enTexts, i);
            const sorted = [...opts].sort((a, b) => a.localeCompare(b));
            return { q: "Listen. Which sentence did you hear?", prompt: { en: enTexts[i] }, listen: true, options: sorted.map((en) => ({ en })), answer: sorted.indexOf(enTexts[i]) };
          }),
        },
        { type: "write", lang: "en", items: ["Dictation"], note: "Ask someone to read 5 lines of the passage to you (or play them). Write them without looking, then check your spelling." },
      ],
    });

    const trEn = p.tr.map(([, en]) => en);
    english.push({
      id: `${id}-en-translate`,
      day: p.day,
      title: "Translation practice",
      titleUr: "ترجمہ: اردو سے انگریزی",
      minutes: 60,
      blocks: [
        { type: "reading", title: "Say these in English (try first, then check below)", lang: "ur", lines: p.tr.map(([ur]) => ({ ur })) },
        { type: "phrases", title: "Check your answers", lang: "en", items: p.tr.map(([ur, en]) => ({ en, ur })) },
        {
          type: "quiz",
          title: "Choose the correct English",
          lang: "en",
          questions: spread(
            p.tr.map((_, i) => i),
            8,
          ).map((i) => {
            const opts = neighbours(trEn, i);
            const sorted = [...opts].sort((a, b) => a.localeCompare(b));
            return { q: "Choose the correct English.", prompt: { ur: p.tr[i][0] }, options: sorted.map((en) => ({ en })), answer: sorted.indexOf(trEn[i]) };
          }),
        },
        { type: "write", lang: "en", items: ["Translate all sentences"], note: "Cover the answers. Translate every Urdu sentence into English in your notebook, then check and correct each one." },
      ],
    });

    urdu.push({
      id: `${id}-ur-read`,
      day: p.day,
      title: `Urdu reading: ${p.ur.title}`,
      titleUr: p.ur.titleUr,
      minutes: 60,
      blocks: [
        { type: "reading", lang: "ur", paragraph: true, lines: p.ur.lines.map((ur) => ({ ur })) },
        { type: "table", title: "لفظ اور معنی", dir: "rtl", headers: ["لفظ", "معنی"], rows: p.ur.words },
        { type: "quiz", title: "سبق کے سوال", lang: "ur", questions: p.ur.questions.map(([q, r, ...w]) => askUr(q, r, ...w)) },
        { type: "write", lang: "ur", items: p.ur.words.map(([w]) => w), note: p.ur.write ?? "ہر لفظ کا معنی لکھیں اور اس سے جملہ بنائیں۔ پھر سبق کا خلاصہ پانچ جملوں میں لکھیں۔" },
      ],
    });
  }
  return { english, urdu };
}

/** Adds the daily packs to a week's lessons, keeping each subject in day order (lessons unlock in this order). */
export function withPacks(base: Lesson[], extra: Lesson[]): Lesson[] {
  return [...base, ...extra].sort((a, b) => a.day - b.day);
}
