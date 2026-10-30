import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week5: WeekContent = {
  urdu: withPacks(onDays(urdu, [1, 1, 2, 3, 3, 4, 5, 5, 6, 6]), daily.urdu),
  english: withPacks(onDays(english, [1, 2, 3, 4, 5, 5, 6]), daily.english),
  math: onDays(math, [1, 2, 3, 4, 5, 6]),
  test: {
    kind: "written",
    parts: {
      urdu: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Introduce yourself in detail for two minutes: family, work, hobbies, strengths and dreams.",
            "Tell the teacher about a memorable day, using پہلے، پھر، اچانک، آخر میں.",
            "Read the lesson عبدالستار ایدھی aloud with correct pauses.",
            "Name 8 professions and say what each one does.",
          ],
        },
        {
          title: "سوال ۱: قواعد",
          dir: "rtl",
          items: [
            "اسمِ معرفہ اور اسمِ نکرہ کی تعریف لکھیں۔ ہر ایک کی پانچ مثالیں دیں۔",
            "ان جملوں سے اسمِ معرفہ الگ کریں: احمد لاہور گیا۔ — راوی ایک دریا ہے۔ — کے ٹو اونچا پہاڑ ہے۔",
            "خالی جگہ میں صحیح حرف لکھیں: وہ غریب ہے ___ ایمان دار ہے۔ — ___ محنت کرو گے تو کامیاب ہو گے۔ — وہ نہیں آیا ___ بیمار تھا۔",
            "حروف کی چار قسمیں مثالوں کے ساتھ لکھیں۔",
          ],
        },
        {
          title: "سوال ۲: سبق",
          dir: "rtl",
          items: [
            "معنی لکھیں: خدمت، یتیم، بے سہارا، زرخیز، دارالحکومت، ہمدرد، ضائع",
            "عبدالستار ایدھی نے انسانیت کی خدمت کیسے کی؟ پانچ جملے لکھیں۔",
            "پاکستان کے چار صوبوں اور پانچ قومی نشانیوں کے نام لکھیں۔",
            "کہانی «نیکی کا بدلہ» کا خلاصہ چھ جملوں میں لکھیں۔",
          ],
        },
        {
          title: "سوال ۳: تحریر",
          dir: "rtl",
          items: ["اپنا تعارف دس جملوں میں لکھیں۔", "کل کے دن کا روزنامچہ لکھیں۔"],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Talk about your past, present and future: what you did last year, what you do now, what you will do next year.",
            "Tell the story ‘The boy who cried wolf’ in English.",
            "Read ‘Mobile phones — friend or enemy?’ aloud.",
          ],
        },
        {
          title: "Q1: Tenses",
          items: [
            "Write ‘work’ in five tenses: present simple, present continuous, past simple, past continuous, future simple.",
            "Fill in will or going to: Look at the clouds — it ___ rain. I promise I ___ help you. We ___ visit Lahore next month (we have tickets).",
            "Correct the mistakes: He go to school yesterday. I will helping you. She don't like tea.",
          ],
        },
        {
          title: "Q2: Words",
          items: [
            "Fill in a / an / the / –: I saw ___ owl. ___ owl was white. ___ sun is hot. ___ Ali lives in Multan.",
            "Make adverbs: slow, careful, quiet, happy, good. Use two in sentences.",
            "Join with and / but / so / because: I was hungry. I ate a roti. — He is poor. He is honest.",
          ],
        },
        {
          title: "Q3: Reading and writing",
          items: ["Answer: Why was the shepherd boy bored? Why did nobody help him at the end?", "Write 8 sentences: ‘My phone and me’."],
        },
      ],
      math: [
        {
          title: "Q1: Integers",
          items: ["−7 + 12 =    −5 + (−8) =    4 − 10 =    6 − (−3) =", "−6 × 7 =    −9 × −4 =    −48 ÷ 6 =    −35 ÷ −5 =", "Put in order, smallest first: 3, −8, 0, −2, 5, −11"],
        },
        {
          title: "Q2: BODMAS and fractions",
          items: [
            "Solve step by step: 8 + 2 × 5    |    (8 + 2) × 5    |    36 ÷ (4 + 2) − 3",
            "1/3 + 1/4 =    5/6 − 1/3 =    2/5 × 5/8 =    3/4 ÷ 3/8 =",
            "Simplify: 12/16, 15/25, 18/24",
          ],
        },
        {
          title: "Q3: Decimals and squares",
          items: [
            "12.6 + 4.75 =    20 − 6.35 =    3.08 × 100 =    0.6 × 0.3 =",
            "Write the squares of 11 to 15. Find √64, √121, √196.",
            "A square plot has an area of 400 m². How long is each side? What is its perimeter?",
          ],
        },
      ],
    },
  },
};
