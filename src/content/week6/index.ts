import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week6: WeekContent = {
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
            "Role play: ask the teacher for advice about a job, then give advice to a friend before an exam.",
            "Read the lesson وقت کی قدر aloud, then tell its main idea in your own words.",
            "Tell the story عقل مند قاضی in your own words.",
          ],
        },
        {
          title: "سوال ۱: قواعد",
          dir: "rtl",
          items: [
            "«لکھنا، جانا، آنا» سے ماضی، حال اور مستقبل کے جملے بنائیں۔",
            "مصدر، امر اور نہی کی تعریف لکھیں اور ہر ایک کی تین مثالیں دیں۔",
            "زمانہ پہچانیں: احمد کل آئے گا۔ — بچے کھیل رہے ہیں۔ — امی نے کھانا پکایا۔",
          ],
        },
        {
          title: "سوال ۲: سبق",
          dir: "rtl",
          items: [
            "معنی لکھیں: نعمت، فضول، پابند، شخصیت، ماحول، ذمہ داری، گواہ، جرم",
            "سبق «صفائی» کا خلاصہ پانچ جملوں میں لکھیں۔",
            "وقت کی قدر کرنے کے تین طریقے لکھیں۔",
          ],
        },
        {
          title: "سوال ۳: خط",
          dir: "rtl",
          items: ["اپنے والد کے نام خط لکھیں جس میں اپنی پڑھائی کا حال بتائیں۔", "یا: اپنے دوست کو بہن کی شادی پر بلانے کے لیے خط لکھیں۔"],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Say 5 things you have done this week (present perfect).", "Give advice to a friend with should and must.", "Tell the story ‘The golden touch’."],
        },
        {
          title: "Q1: Grammar",
          items: [
            "Write the three forms: go, eat, see, write, take, give, do, be",
            "Fill in for / since: I have lived here ___ 2015. She has worked ___ six months.",
            "Fill in can / should / must / may: You ___ see a doctor. Drivers ___ stop at red. It ___ rain today. I ___ swim.",
          ],
        },
        {
          title: "Q2: Words and reading",
          items: [
            "Complete the families: success – succeed – ___ ; care – ___ – carefully ; ___ – decide – decisive",
            "Answer: How do we waste water at home? Give two ways to save it.",
          ],
        },
        { title: "Q3: Writing", items: ["Write a letter to a friend about your new habits (10–12 sentences)."] },
      ],
      math: [
        {
          title: "Q1: Ratio and proportion",
          items: ["Simplify: 12 : 18, 35 : 50, 1 m : 40 cm", "Share Rs 1,200 in the ratio 3 : 5.", "7 kg of rice cost Rs 2,100. Find the cost of 12 kg.", "8 workers finish a job in 15 days. How long will 12 workers take?"],
        },
        {
          title: "Q2: Percent, profit and loss",
          items: [
            "15% of 600 =    42 out of 60 = ___ %",
            "A phone bought for Rs 12,000 is sold for Rs 15,000. Find profit and profit %.",
            "A cycle bought for Rs 9,000 is sold at a 10% loss. Find the selling price.",
          ],
        },
        {
          title: "Q3: Discount and interest",
          items: [
            "Marked price Rs 3,500, discount 20%. Find the sale price.",
            "Find the simple interest on Rs 15,000 at 8% for 2 years. Find the amount.",
          ],
        },
      ],
    },
  },
};
