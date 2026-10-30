import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

/** Advanced weeks are written for 10 days: one core lesson per subject each day, plus the daily packs. */
const TEN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const week9: WeekContent = {
  contentDays: 10,
  urdu: withPacks(onDays(urdu, TEN), daily.urdu),
  english: withPacks(onDays(english, TEN), daily.english),
  math: onDays(math, TEN),
  test: {
    kind: "written",
    parts: {
      urdu: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Read the lesson سرسید احمد خان aloud with correct pronunciation (تلفظ).",
            "Explain the central idea (مرکزی خیال) of کفایت شعاری in your own words.",
            "Speak for two minutes on: پاکستان کی زراعت کے مسائل.",
          ],
        },
        {
          title: "سوال ۱: تشریح",
          dir: "rtl",
          items: ["حوالۂ متن، سیاق و سباق اور تشریح لکھیں: «سرسید نے محسوس کیا کہ اس زوال کا اصل سبب جدید تعلیم سے دوری ہے۔»"],
        },
        {
          title: "سوال ۲: خلاصہ اور سوالات",
          dir: "rtl",
          items: ["سبق «مادرِ ملت» کا خلاصہ لکھیں۔", "کفایت شعاری اور کنجوسی میں فرق لکھیں۔", "پاکستان کی زراعت کے تین مسائل اور ان کا حل لکھیں۔"],
        },
        {
          title: "سوال ۳: زبان",
          dir: "rtl",
          items: [
            "اعراب لگائیں: علم (جاننا)، علم (جھنڈا)، معلم، عزت، محبت، ملک (وطن)",
            "معنی لکھیں: ایثار، استقلال، شجاعت، فراست، یکجہتی، متانت",
            "جملے درست کریں: وہ واپس لوٹ آیا۔ — مجھے خط موصول ملا۔ — یہ باتیں سچ ہے۔",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Talk about what you have been doing for the last nine weeks (present perfect continuous).", "Translate 5 Urdu sentences given by the teacher into spoken English."],
        },
        {
          title: "Q1: Tenses and voice",
          items: [
            "Write ‘study’ in all 12 tenses.",
            "Change to passive: They are building a school. — Someone has stolen my phone. — We must save water. — Who wrote this letter?",
          ],
        },
        {
          title: "Q2: Translation",
          items: ["Translate into English: ہمارا گاؤں دریائے چناب کے کنارے واقع ہے۔ یہاں کے زیادہ تر لوگ کسان ہیں۔ پچھلے سال سیلاب نے ہماری فصلیں تباہ کر دیں۔ اب ہمارے کھیت دوبارہ ہرے بھرے ہو گئے ہیں۔"],
        },
        {
          title: "Q3: Vocabulary",
          items: ["Use in sentences: give up, look after, run out of, set up, look forward to.", "Fill in: good ___, interested ___, proud ___, depend ___."],
        },
      ],
      math: [
        {
          title: "Q1: Expressions",
          items: ["(3x² + 2x − 1) + (x² − 5x + 4) =    (5a − 3) − (2a − 7) =", "Expand: (x + 6)²,  (2y − 5)²,  (m + 8)(m − 8),  (x + 3)(x − 7)", "Use an identity: 105²,  98 × 102"],
        },
        {
          title: "Q2: Factorisation",
          items: ["8x + 12,  x² − 81,  x² + 10x + 25,  x² + 9x + 20,  x² − 2x − 15,  ab + 3a + 2b + 6"],
        },
        {
          title: "Q3: Equations",
          items: ["Solve: 4(x − 2) = 20;  7x + 3 = 3x + 19;  x/5 + 4 = 7", "Two numbers differ by 9 and add up to 45. Find them.", "The length of a field is twice its width. Its perimeter is 180 m. Find its length and width."],
        },
      ],
    },
  },
};
