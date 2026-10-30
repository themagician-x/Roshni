import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

const TEN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const week10: WeekContent = {
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
            "Recite بچے کی دعا and the four couplets of ستاروں سے آگے from memory.",
            "Explain one couplet of Iqbal in your own words.",
            "Give a two-minute speech on حب الوطنی.",
          ],
        },
        {
          title: "سوال ۱: اشعار کی تشریح",
          dir: "rtl",
          items: ["تو شاہیں ہے پرواز ہے کام تیرا / ترے سامنے آسماں اور بھی ہیں", "افراد کے ہاتھوں میں ہے اقوام کی تقدیر / ہر فرد ہے ملت کے مقدر کا ستارا"],
        },
        {
          title: "سوال ۲: نظم اور نثر",
          dir: "rtl",
          items: ["نظم «بچے کی دعا» کا خلاصہ لکھیں۔", "مرزا غالب کی خطوط نگاری پر نوٹ لکھیں۔", "نظم اور غزل میں فرق لکھیں۔ مطلع، مقطع، ردیف اور قافیہ کی تعریف کریں۔"],
        },
        {
          title: "سوال ۳: زبان",
          dir: "rtl",
          items: ["تشبیہ اور استعارہ کی تعریف لکھیں اور دو دو مثالیں دیں۔", "مضمون لکھیں: میرا وطن پاکستان یا حب الوطنی"],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Give a two-minute speech on ‘The value of education’.", "Role play: career advice between a teacher and a student."],
        },
        {
          title: "Q1: Grammar",
          items: [
            "Change to reported speech: He said, “I have finished.” — She asked, “Where do you live?” — The officer said, “Don't park here.”",
            "Complete: If it rains, … / If I were rich, … / If I had studied, …",
            "Join with who / which / whose: This is the man. He repaired my phone.",
          ],
        },
        { title: "Q2: Writing", items: ["Write a letter to the editor about load-shedding or broken roads.", "Write a 60-word summary of ‘The Pakistan Movement’."] },
        { title: "Q3: Vocabulary", items: ["Use in sentences: a piece of cake, burn the midnight oil, a blessing in disguise, under the weather."] },
      ],
      math: [
        { title: "Q1: Simultaneous equations", items: ["x + y = 25, x − y = 7", "3x + 2y = 18, x + 2y = 10", "4 pens and 3 notebooks cost Rs 430; 2 pens and 3 notebooks cost Rs 350. Find the price of each."] },
        { title: "Q2: Money", items: ["A TV costs Rs 45,000 + 18% sales tax. Find the total.", "Find zakat on savings of Rs 640,000.", "Meter: previous 3,420, present 3,700, rate Rs 32/unit. Find the bill before tax."] },
        { title: "Q3: Graphs", items: ["Draw a bar graph of a farm's wheat (maunds): 2021–120, 2022–80, 2023–140, 2024–150. Find the average.", "A salary of Rs 40,000: food 40%, rent 25%, travel 10%, savings 25%. Find each amount and its angle in a pie chart."] },
      ],
    },
  },
};
