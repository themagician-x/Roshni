import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week4: WeekContent = {
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
            "Role play at a bank: open an account, fill a form, withdraw money.",
            "Tell the teacher how you feel today and why, and give your opinion on one thing (میرے خیال میں …).",
            "Tell the story ایمان دار لکڑہارا in your own words.",
            "Read the lesson قائدِ اعظم aloud with correct pauses at ، and ۔",
          ],
        },
        {
          title: "سوال ۱: قواعد",
          dir: "rtl",
          items: [
            "اسم، ضمیر، فعل اور صفت کی تعریف لکھیں اور ہر ایک کی دو مثالیں دیں۔",
            "ان جملوں میں صفت اور فعل الگ لکھیں: سفید گائے دودھ دیتی ہے۔ — محنتی لڑکا کامیاب ہوا۔",
            "خالی جگہ میں ضمیر لکھیں: سارہ استانی ہے۔ ___ اسکول میں پڑھاتی ہے۔",
          ],
        },
        {
          title: "سوال ۲: رموزِ اوقاف",
          dir: "rtl",
          items: [
            "علامتیں لگائیں: امی نے کہا جلدی آؤ کھانا تیار ہے",
            "علامتیں لگائیں: بازار سے آلو پیاز ٹماٹر اور دہی لائیں",
            "علامتیں لگائیں: واہ کتنا خوب صورت منظر ہے آپ نے دیکھا",
          ],
        },
        {
          title: "سوال ۳: تحریر",
          dir: "rtl",
          items: [
            "معنی لکھیں: روزی، انکار، ایمان داری، جدوجہد، اتحاد، تنظیم",
            "قائدِ اعظم کے بارے میں پانچ جملے لکھیں۔",
            "«میرا پسندیدہ کھیل» پر چھ جملوں کا پیراگراف لکھیں۔",
            "بیماری کی وجہ سے دو دن کی چھٹی کے لیے درخواست لکھیں۔",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Describe your daily routine in the simple present (6 sentences).",
            "Tell the teacher what you did yesterday in the simple past (5 sentences).",
            "Compare two people or things in the room using -er / more … than.",
            "Read ‘The River Indus’ aloud.",
          ],
        },
        {
          title: "Q1: Tenses",
          items: [
            "Fill in the simple present: She ___ (work) in a bank. They ___ (not / live) here. ___ he ___ (play) cricket?",
            "Write the past: go, come, see, eat, buy, write, take, give",
            "Change to the past: I go to the market. He eats rice. We play cricket.",
          ],
        },
        {
          title: "Q2: Words",
          items: [
            "Write the comparing forms: tall, big, easy, good, bad, expensive",
            "Fill in at / on / in: ___ Monday, ___ 9 o'clock, ___ June, ___ the morning",
            "Fill in the question word: ___ is this shirt? — Rs 800.  ___ do you live? — In Multan.",
          ],
        },
        {
          title: "Q3: Writing",
          items: ["Answer: Where does the Indus start? What does Tarbela Dam make?", "Write a paragraph: My best friend (6 sentences).", "Write a leave application to your manager for 3 days (sister's wedding)."],
        },
      ],
      math: [
        {
          title: "Q1: Fractions, decimals, percent",
          items: [
            "1/2 of 60 =    1/4 of 80 =    3/4 of 40 =    2/9 + 5/9 =",
            "Write as a decimal and a percent: 1/2, 1/4, 3/4, 1/10",
            "10% of 700 =    25% of 200 =    50% of 900 =",
            "A bag costs Rs 2,000 with 20% off. How much do you pay?",
          ],
        },
        {
          title: "Q2: HCF, LCM, unitary method",
          items: [
            "Write all the factors of 24. Write the first 5 multiples of 6.",
            "Find the HCF of 12 and 16. Find the LCM of 4 and 10.",
            "6 pens cost Rs 180. How much do 10 pens cost?",
            "A worker earns Rs 5,600 in 8 days. How much in 15 days?",
          ],
        },
        {
          title: "Q3: Area and travel",
          items: [
            "A room is 6 m long and 4 m wide. Find its perimeter and area.",
            "A square field has a side of 15 m. Find its perimeter and area.",
            "A bus travels at 60 km/h for 5 hours. How far does it go?",
            "Multan to Bahawalpur is about 100 km. A car takes 2 hours. What is its speed?",
          ],
        },
      ],
    },
  },
};
