import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

const TEN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const week12: WeekContent = {
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
            "Read aloud «ہمارا گاؤں» with correct pauses.",
            "Speak for two minutes without notes: «میری زندگی کا مقصد» or «کامیابی کا راز».",
            "Recite and explain: «تو شاہیں ہے پرواز ہے کام تیرا».",
          ],
        },
        {
          title: "سوال ۱: قواعد",
          dir: "rtl",
          items: [
            "اسمِ معرفہ اور اسمِ نکرہ کی دو دو مثالیں لکھیں۔ «احمد ایک محنتی لڑکا ہے» میں صفت اور موصوف بتائیں۔",
            "واحد سے جمع بنائیں: شاعر، حق، مسئلہ، ملک۔ متضاد لکھیں: نفع، عزت، آغاز، علم۔",
            "محاورے جملوں میں استعمال کریں: پانی پانی ہونا، کمر کسنا، آنکھوں کا تارا۔",
            "تشبیہ اور استعارہ کی ایک ایک مثال دیں۔ مطلع اور مقطع کی تعریف کریں۔",
          ],
        },
        {
          title: "سوال ۲: تحریر",
          dir: "rtl",
          items: [
            "مضمون (کسی ایک پر): سادگی، کفایت شعاری، ٹریفک کے مسائل۔",
            "اپنے دوست کو میٹرک کی تیاری کے بارے میں خط لکھیں، یا ہیڈ ماسٹر کے نام کریکٹر سرٹیفکیٹ کی درخواست۔",
            "سر سید احمد خان کی خدمات پر پانچ جملے لکھیں۔",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Introduce yourself for one minute.", "Speak for two minutes on ‘My village’ or ‘The value of sports’.", "Role play: opening a bank account."],
        },
        {
          title: "Q1: Grammar",
          items: [
            "Change the voice: The farmer grows wheat. — Someone has stolen my phone. — The board will announce the result.",
            "Change into indirect speech: He said, “I will come tomorrow.” — She asked, “Where do you live?” — Mother said, “Don't play in the sun.”",
            "Fill in a / an / the and at / on / in: He is ___ honest man. — We celebrate Independence Day ___ 14 August.",
            "Correct: He don't know. — I am agree with you. — I have seen him yesterday.",
          ],
        },
        { title: "Q2: Comprehension", items: ["Read ‘The honest woodcutter’ and answer: Why was the old man pleased? What happened to the neighbour? Write the moral."] },
        { title: "Q3: Writing", items: ["Essay (any one): The importance of time / Road safety / My learning journey.", "Write a letter to your mother from a city far away, telling her about your work."] },
        { title: "Q4: Translation", items: ["Translate: «ہمیشہ ہیلمٹ پہنیں۔ گاڑی چلاتے ہوئے فون استعمال نہ کریں۔ دیر سے پہنچنا مر جانے سے بہتر ہے۔»"] },
      ],
      math: [
        { title: "Q1: Numbers and money", items: ["Work out: 36 ÷ 4 + 5 × 2 and (−8) + 3 × (−2).", "A shirt of Rs 1,500 is sold at 20% off. Find the sale price.", "Find zakat on Rs 400,000."] },
        { title: "Q2: Algebra", items: ["Solve 5x − 4 = 21.", "Solve x + y = 20, x − y = 4.", "Factorise x² + 7x + 12 and x² − 16."] },
        { title: "Q3: Geometry and data", items: ["Find the area of a circle of radius 14 cm (π = 22/7).", "Find the hypotenuse of a right triangle with sides 9 and 12.", "Find the mean, median and mode of 4, 7, 7, 9, 13."] },
        { title: "Q4: Daily life", items: ["Meter: previous 2,150, present 2,400, rate Rs 30 per unit. Find the bill.", "A loan of Rs 60,000 is paid in 12 equal instalments. Find each instalment."] },
      ],
    },
  },
};
