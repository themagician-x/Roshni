import { createContext, useContext } from "react";
import type { Lang } from "./types";

import { urduNumberWord } from "@/content/numbers";

/** Urdu text writes its numbers as words: 90 → نوے. */
const u = urduNumberWord;

/** Wording of the lesson screens. Urdu lessons use the Urdu set, everything else English. */
const STRINGS = {
  en: {
    listenRepeat: "Listen & repeat",
    speak: "Speak",
    read: "Read",
    learn: "Learn",
    practice: "Practice",
    writeNotebook: "Write in your notebook",
    table: "Table",
    count: "Count",
    tryAgain: "Try again",
    passed: (pct: number) => `✓ ${pct}% — passed!`,
    needMore: (pct: number) => `${pct}% — listen again and try once more.`,
    answerAll: (n: number) => `Answer all ${n} questions.`,
    alreadyPassed: "(already passed ✓)",
    wrote: "I have written all of this in my notebook",
    toFinish: "To finish this lesson",
    quizCheck: (title: string) => title,
    writingCheck: "Writing practice in notebook",
    timeCheck: (time: string) => `Study at least ${time}`,
    bestSoFar: (pct: number) => `best so far ${pct}%`,
    timeSoFar: (time: string) => `Time studied on this lesson: ${time}. Take your time — listen and repeat everything.`,
    finish: "✓ Finish lesson",
    notReady: "Complete everything above first",
    completedOn: (date: string) => `✓ Completed on ${date} — you are reviewing it.`,
    revision: "Revision",
    doneReview: "Done · Review",
    revised: "Revised ✓",
    opensOn: (day: number) => `Opens on day ${day}`,
    finishPrevious: "Finish the lesson before it first",
    minutes: (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`),
  },
  ur: {
    listenRepeat: "سنیں اور دہرائیں",
    speak: "بولیں",
    read: "پڑھیں",
    learn: "سیکھیں",
    practice: "مشق",
    writeNotebook: "کاپی میں لکھیں",
    table: "جدول",
    count: "گنتی",
    tryAgain: "دوبارہ کوشش کریں",
    passed: (pct: number) => `✓ ${u(pct)} فیصد — شاباش! آپ پاس ہو گئے۔`,
    needMore: (pct: number) => `${u(pct)} فیصد — دوبارہ سنیں اور پھر کوشش کریں۔`,
    answerAll: (n: number) => `سب ${u(n)} سوالوں کے جواب دیں۔`,
    alreadyPassed: "(پہلے ہی پاس ✓)",
    wrote: "میں نے یہ سب اپنی کاپی میں لکھ لیا ہے",
    toFinish: "یہ سبق مکمل کرنے کے لیے",
    quizCheck: (title: string) => title,
    writingCheck: "کاپی میں لکھنے کی مشق",
    timeCheck: (time: string) => `کم از کم ${time} پڑھیں`,
    bestSoFar: (pct: number) => `اب تک بہترین ${u(pct)} فیصد`,
    timeSoFar: (time: string) => `اس سبق پر اب تک کا وقت: ${time}۔ آرام سے پڑھیں — ہر چیز سنیں اور دہرائیں۔`,
    finish: "✓ سبق مکمل کریں",
    notReady: "پہلے اوپر والی سب چیزیں مکمل کریں",
    completedOn: (date: string) => `✓ یہ سبق ${date} کو مکمل ہوا — آپ اسے دہرا رہے ہیں۔`,
    revision: "دہرائی",
    doneReview: "مکمل · دہرائیں",
    revised: "دہرا لیا ✓",
    opensOn: (day: number) => `دن ${u(day)} کو کھلے گا`,
    finishPrevious: "پہلے پچھلا سبق مکمل کریں",
    minutes: (m: number) => (m < 60 ? `${u(m)} منٹ` : `${u(Math.floor(m / 60))} گھنٹے ${u(m % 60)} منٹ`),
  },
};

export type UiStrings = (typeof STRINGS)["en"];

export const UiLangContext = createContext<Lang>("en");

export function uiStrings(lang: Lang): UiStrings & { lang: Lang; rtl: boolean } {
  return { ...STRINGS[lang], lang, rtl: lang === "ur" };
}

export function useUi() {
  return uiStrings(useContext(UiLangContext));
}
