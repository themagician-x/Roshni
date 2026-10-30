import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week8: WeekContent = {
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
            "Mock job interview: answer 5 questions about yourself, your skills and why you want the job.",
            "Read the lesson علم کی اہمیت aloud fluently (a full Class 8 level reading).",
            "Use 3 proverbs (ضرب الامثال) in your own spoken sentences.",
          ],
        },
        {
          title: "سوال ۱: زبان",
          dir: "rtl",
          items: [
            "ضرب الامثال کا مطلب لکھیں: جیسی کرنی ویسی بھرنی — جتنی چادر ہو اتنے پاؤں پھیلاؤ — قطرہ قطرہ دریا بنتا ہے — نیکی کر دریا میں ڈال",
            "جملے درست کریں: میری بہن آیا ہے۔ — امی نے کھانا پکائی۔ — میں نے کل لاہور جانا ہے۔ — ہمارا گاڑی خراب ہے۔",
          ],
        },
        {
          title: "سوال ۲: درخواست اور مکالمہ",
          dir: "rtl",
          items: ["کسی دکان میں سیلز مین کی نوکری کے لیے درخواست لکھیں۔", "دو دوستوں کے درمیان صفائی مہم کے بارے میں مکالمہ لکھیں (دس جملے)۔"],
        },
        {
          title: "سوال ۳: مضمون",
          dir: "rtl",
          items: ["ان میں سے کسی ایک موضوع پر مضمون لکھیں (تمہید، نفسِ مضمون، خاتمہ): ماحولیاتی آلودگی — علم کی اہمیت — محنت کی عظمت"],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Act out a dialogue at the doctor's with the teacher.", "Talk for one minute about Pakistan.", "Tell the story ‘The gift’ in your own words."],
        },
        {
          title: "Q1: Writing",
          items: ["Write a job application for the post of salesman.", "Write a dialogue between a customer and a shopkeeper (10 lines)."],
        },
        {
          title: "Q2: Essay",
          items: ["Write an essay (4 paragraphs) on: The importance of education OR Pollution in our cities."],
        },
        {
          title: "Q3: Correct the mistakes",
          items: ["He go to work daily. — I am agree with you. — She didn't went home. — I have seen him yesterday. — Give me one advice."],
        },
      ],
      math: [
        {
          title: "Q1: Angles and shapes",
          items: [
            "Name the angle: 30°, 90°, 135°, 180°",
            "Two angles on a straight line; one is 72°. Find the other.",
            "Two angles of a triangle are 48° and 67°. Find the third.",
            "Three angles of a quadrilateral are 85°, 95° and 110°. Find the fourth.",
          ],
        },
        {
          title: "Q2: Area and volume",
          items: [
            "Area of a triangle with base 16 cm and height 9 cm.",
            "Area of a parallelogram with base 15 m and height 8 m.",
            "Volume of a box 12 cm × 10 cm × 5 cm.",
            "A water tank is 2 m × 2 m × 1 m. How many litres does it hold?",
          ],
        },
        {
          title: "Q3: Averages",
          items: ["Find the average of 45, 60, 75, 80 and 90.", "Draw a bar graph of these sales: Mon 10, Tue 15, Wed 8, Thu 12, Fri 20. Which day had the most sales?"],
        },
      ],
    },
  },
};
