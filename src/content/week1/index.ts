import type { Lesson, WeekContent } from "@/lib/types";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

const onDays = (lessons: Omit<Lesson, "day">[], days: number[]): Lesson[] => lessons.map((l, i) => ({ ...l, day: days[i] }));

export const week1: WeekContent = {
  urdu: onDays(urdu, [1, 1, 2, 3, 3, 4, 5, 5, 6]),
  english: onDays(english, [1, 2, 3, 4, 5, 6]),
  math: onDays(math, [1, 2, 3, 4, 5, 6]),
  test: {
    kind: "oral",
    parts: {
      urdu: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Greet the teacher in Urdu and introduce yourself: name, age, where you live.",
            "Name 6 family members in Urdu (ابو، امی، بھائی …).",
            "Count from ایک to دس in Urdu.",
            "Answer: یہ کیا ہے؟ for 5 things in the room, with a full sentence.",
            "Say in Urdu: I am hungry. / I need water. / How much is this?",
          ],
        },
        {
          title: "Letters (oral)",
          oral: true,
          items: [
            "Teacher points to 15 letters in random order. Student says each letter's name.",
            "Teacher says a letter name. Student points to it (10 letters).",
            "Which letters sound like ‘s’? Which sound like ‘z’?",
          ],
        },
        {
          title: "Writing",
          dir: "rtl",
          items: [
            "پوری حروفِ تہجی ا سے ے تک لکھیں۔",
            "پہلا حرف لکھیں: انگور، بکری، چاند، شیر، قلم، مچھلی، ہاتھی، گھڑی",
            "ایک جیسی شکل والے حروف ایک ساتھ لکھیں: ب پ ت ٹ ث — ج چ ح خ — د ڈ ذ — ر ڑ ز ژ",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Greet the teacher in English and introduce yourself: name, age, where you live.",
            "Say the alphabet A to Z.",
            "Count 1 to 20 in English.",
            "Name 6 colours you can see.",
            "Point and say: This is my ___. / That is a ___. (5 sentences)",
          ],
        },
        {
          title: "Reading",
          oral: true,
          items: ["Read these words: cat, pen, lip, dog, sun, bus, hen, box, cup, bed", "Read: The sun is hot. The dog is on the bed."],
        },
        {
          title: "Writing",
          items: [
            "Write A to Z in capital letters.",
            "Write a to z in small letters.",
            "Write the first letter: apple, ball, fish, kite, lion, nose, queen, tree, watch, zebra",
            "Write the number words: one to ten.",
            "Circle the vowels: b a t e m i k o s u",
          ],
        },
      ],
      math: [
        {
          title: "Numbers",
          items: [
            "Write 1 to 100.",
            "Fill in: 37, 38, __, __, 41    |    10, 20, __, 40, __",
            "Write the place value of each digit in 538.",
            "Write in expanded form: 274 = __ + __ + __",
            "Put > < or =:  56 __ 65    |    300 __ 299    |    48 __ 48",
          ],
        },
        {
          title: "Add and subtract",
          items: ["6 + 7 =", "9 + 8 =", "24 + 35 =", "41 + 52 =", "15 − 9 =", "17 − 8 =", "86 − 34 =", "99 − 47 ="],
        },
        {
          title: "Money",
          items: [
            "Rs 100 + Rs 50 + Rs 20 + Rs 10 = ?",
            "Milk costs Rs 80. You pay Rs 100. How much change?",
            "How many Rs 50 notes make Rs 500?",
          ],
        },
      ],
    },
  },
};
