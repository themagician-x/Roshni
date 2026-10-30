import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week3: WeekContent = {
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
            "Teacher asks 5 questions using کیا، کون، کہاں، کب، کیوں. Student answers each in a full sentence.",
            "Role play at the doctor: tell what is wrong and since when.",
            "Tell the story پیاسا کوا or لالچی کتا in your own words.",
          ],
        },
        {
          title: "سوال ۱: واحد جمع اور مذکر مؤنث",
          dir: "rtl",
          items: [
            "جمع لکھیں: لڑکا، کتاب، کرسی، کمرہ، روٹی، بچہ",
            "واحد لکھیں: کپڑے، لڑکیاں، باتیں، انڈے",
            "مؤنث لکھیں: بیٹا، مرغا، گھوڑا، شیر، استاد، بادشاہ",
          ],
        },
        {
          title: "سوال ۲: متضاد اور سوالیہ الفاظ",
          dir: "rtl",
          items: [
            "متضاد لکھیں: دن، گرم، خوش، امیر، سچ، اوپر، نیا، اندر",
            "خالی جگہ میں صحیح سوالیہ لفظ لکھیں: آپ ___ رہتے ہیں؟ — یہ ___ کی کتاب ہے؟ — آپ دیر سے ___ آئے؟",
            "جملے درست کریں: لڑکی اسکول جاتا ہے۔ — میز پر دو کتاب ہیں۔",
          ],
        },
        {
          title: "سوال ۳: کہانی",
          dir: "rtl",
          items: [
            "معنی لکھیں: تلاش، ترکیب، کنکر، عکس، لالچ، پچھتانا",
            "پیاسا کوا: کوے نے پانی کیسے پیا؟ تین جملوں میں لکھیں۔",
            "لالچی کتا کہانی کا سبق کیا ہے؟",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Say what 4 people in your house are doing right now (present continuous).",
            "Say 3 sentences with has / have about your family.",
            "Read the story ‘A busy Sunday’ aloud.",
          ],
        },
        {
          title: "Q1: Nouns",
          items: [
            "Write a or an: ___ apple, ___ book, ___ egg, ___ umbrella, ___ cat",
            "Write the plural: bus, box, baby, man, child, woman, mouse, city",
          ],
        },
        {
          title: "Q2: Grammar",
          items: [
            "Fill in he / she / it / they: Sara is my sister. ___ is a nurse.  My phone is new. ___ is black.",
            "Fill in has / have: I ___ a bike. She ___ two brothers. They ___ a cow.",
            "Fill in am / is / are + -ing: Mother ___ (cook). I ___ (read). The boys ___ (run).",
            "Make questions: He is sleeping. / They are going home.",
          ],
        },
        {
          title: "Q3: Writing",
          items: ["Answer: What is Hamid's mother making? Where is Hamid sitting?", "Write 5 sentences about your Sunday."],
        },
      ],
      math: [
        {
          title: "Q1: Tables",
          items: ["Write the table of 7 and the table of 9.", "6 × 8 =    7 × 7 =    9 × 4 =    8 × 9 =    6 × 6 =    7 × 8 ="],
        },
        {
          title: "Q2: Multiply and divide",
          items: ["24 × 3 =", "45 × 6 =", "37 × 8 =", "56 × 100 =", "84 ÷ 4 =", "96 ÷ 8 =", "72 ÷ 6 =", "29 ÷ 5 = ___ remainder ___"],
        },
        {
          title: "Q3: Word problems",
          items: [
            "A worker earns Rs 750 a day. How much does he earn in 6 days?",
            "Rs 840 is shared equally by 4 brothers. How much does each get?",
            "There are 9 rows of chairs with 8 chairs in each row. How many chairs?",
            "63 mangoes are put into bags of 7. How many bags?",
          ],
        },
      ],
    },
  },
};
