import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week7: WeekContent = {
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
            "Role play: complain politely at a shop, then apologise as the shopkeeper.",
            "Use 4 idioms (محاورے) in your own spoken sentences.",
            "Tell the story گاؤں کا میلہ or your own travel story in Urdu.",
          ],
        },
        {
          title: "سوال ۱: الفاظ",
          dir: "rtl",
          items: [
            "مترادف لکھیں: سورج، رات، خوشی، دوست، دل، آگ",
            "دونوں لفظوں سے جملے بنائیں: آم / عام — صدا / سدا — صورت / سورت",
            "سابقے یا لاحقے سے نئے لفظ بنائیں: بے، نا، بد، دار، گار، خانہ",
          ],
        },
        {
          title: "سوال ۲: محاورے",
          dir: "rtl",
          items: ["معنی لکھ کر جملوں میں استعمال کریں: آگ بگولا ہونا، آنکھ کا تارا، ناک میں دم کرنا، ہاتھ پاؤں پھول جانا، دانت کھٹے کرنا، کان کھڑے ہونا"],
        },
        {
          title: "سوال ۳: سبق اور تحریر",
          dir: "rtl",
          items: [
            "میجر عزیز بھٹی شہید کی بہادری پر پانچ جملے لکھیں۔",
            "یہ اشارات استعمال کر کے کہانی لکھیں: ایک غریب لڑکا — راستے میں بٹوا ملتا ہے — مالک کو ڈھونڈتا ہے — انعام سے انکار — سبق۔",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Say 4 passive sentences about things made or grown in Pakistan.", "Report 3 things your teacher said today (He said that …).", "Tell ‘The two friends and the bear’ in English."],
        },
        {
          title: "Q1: Grammar",
          items: [
            "Change to passive: Farmers grow rice. — Ali wrote the letter. — Someone stole my bag.",
            "Change to reported speech: He said, “I am busy.” — She said, “I will come tomorrow.” — They said, “We can help.”",
            "Punctuate: ali said where is my phone i left it here on monday",
          ],
        },
        {
          title: "Q2: Words",
          items: ["Synonyms: big, begin, clever, buy", "Antonyms: rich, victory, honest, possible, agree"],
        },
        { title: "Q3: Writing", items: ["Write a story (10–12 sentences) with a moral: ‘Honesty is the best policy’."] },
      ],
      math: [
        {
          title: "Q1: Expressions",
          items: [
            "Write in algebra: 9 more than x; 4 less than y; six times n; half of m.",
            "Simplify: 6x + 4x − 3x;  5a + 3b − 2a + b;  4(n + 3)",
            "If x = 3 and y = 5, find: 2x + y;  xy;  y² − x",
          ],
        },
        {
          title: "Q2: Equations",
          items: ["Solve: x + 14 = 30;  n − 9 = 12;  7k = 63;  m/5 = 4", "Solve: 3x + 4 = 25;  5y − 8 = 32;  x/4 + 3 = 9"],
        },
        {
          title: "Q3: Word problems",
          items: [
            "6 notebooks and a Rs 120 pen cost Rs 720. Find the price of one notebook.",
            "A father is 4 times as old as his son. Together they are 50. Find their ages.",
          ],
        },
      ],
    },
  },
};
