import type { Lesson } from "@/lib/types";

type DraftLesson = Omit<Lesson, "day">;

export const math: DraftLesson[] = [
  {
    id: "w1-ma-1",
    title: "Counting 1 to 100",
    titleUr: "گنتی ۱ سے ۱۰۰ تک",
    minutes: 35,
    blocks: [
      { type: "numbergrid", from: 1, to: 100 },
      {
        type: "table",
        title: "Urdu digits and English digits",
        headers: ["English", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        rows: [["Urdu", "۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]],
      },
      {
        type: "rule",
        title: "Patterns",
        points: [
          "Each row of the grid is ten numbers.",
          "Going down one row adds 10: 3 → 13 → 23 → 33.",
          "Counting in tens: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
        ],
        lang: "en",
        examples: [
          { en: "ten, twenty, thirty, forty, fifty", ur: "دس، بیس، تیس، چالیس، پچاس" },
          { en: "sixty, seventy, eighty, ninety, one hundred", ur: "ساٹھ، ستر، اسی، نوے، سو" },
        ],
      },
      { type: "write", lang: "en", items: ["1 to 100"], note: "Write 1 to 100 in your notebook, ten numbers in each line." },
      {
        type: "quiz",
        lang: "en",
        title: "What comes next?",
        questions: [
          { q: "23, 24, __", options: [{ en: "26" }, { en: "25" }, { en: "35" }], answer: 1 },
          { q: "49, __", options: [{ en: "40" }, { en: "59" }, { en: "50" }], answer: 2 },
          { q: "What comes before 70?", options: [{ en: "69" }, { en: "71" }, { en: "60" }], answer: 0 },
          { q: "10, 20, 30, __", options: [{ en: "31" }, { en: "40" }, { en: "50" }], answer: 1 },
          { q: "Which number?", prompt: { ur: "پچاس" }, listen: true, options: [{ en: "15" }, { en: "50" }, { en: "55" }], answer: 1 },
          { q: "Which number?", prompt: { en: "ninety" }, listen: true, options: [{ en: "19" }, { en: "90" }, { en: "9" }], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "w1-ma-2",
    title: "Ones, tens and hundreds",
    titleUr: "اکائی، دہائی، سینکڑہ",
    minutes: 35,
    blocks: [
      {
        type: "rule",
        title: "Place value",
        points: [
          "Every digit has a place. From the right: ones (اکائی), tens (دہائی), hundreds (سینکڑہ).",
          "In 345: 5 ones, 4 tens, 3 hundreds. 345 = 300 + 40 + 5.",
          "Bigger place = bigger value. The 3 in 345 is worth 300, not 3.",
        ],
      },
      {
        type: "table",
        title: "Examples",
        headers: ["Number", "Hundreds", "Tens", "Ones", "Expanded"],
        rows: [
          [27, 0, 2, 7, "20 + 7"],
          [58, 0, 5, 8, "50 + 8"],
          [145, 1, 4, 5, "100 + 40 + 5"],
          [306, 3, 0, 6, "300 + 0 + 6"],
          [999, 9, 9, 9, "900 + 90 + 9"],
        ],
      },
      {
        type: "rule",
        title: "Bigger or smaller: > < =",
        points: ["> means ‘is bigger than’: 45 > 32", "< means ‘is smaller than’: 18 < 81", "= means ‘is equal to’: 50 = 50", "Compare the hundreds first, then tens, then ones."],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          { q: "In 472, what is the tens digit?", options: [{ en: "4" }, { en: "7" }, { en: "2" }], answer: 1 },
          { q: "In 863, the 8 is worth…", options: [{ en: "8" }, { en: "80" }, { en: "800" }], answer: 2 },
          { q: "200 + 50 + 3 = ?", options: [{ en: "253" }, { en: "235" }, { en: "2503" }], answer: 0 },
          { q: "64 __ 46", options: [{ en: ">" }, { en: "<" }, { en: "=" }], answer: 0 },
          { q: "109 __ 190", options: [{ en: ">" }, { en: "<" }, { en: "=" }], answer: 1 },
          { q: "Which is the biggest?", options: [{ en: "599" }, { en: "905" }, { en: "950" }], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "w1-ma-3",
    title: "Addition",
    titleUr: "جمع",
    minutes: 35,
    blocks: [
      {
        type: "rule",
        title: "Adding (+)",
        points: [
          "Adding means putting together. 3 + 4 = 7 (تین جمع چار برابر سات).",
          "Order does not matter: 3 + 4 = 4 + 3.",
          "For bigger numbers, write them one under the other. Add the ones first, then the tens.",
          "Example: 32 + 45 → ones: 2 + 5 = 7, tens: 3 + 4 = 7 → 77.",
        ],
        lang: "ur",
        examples: [{ ur: "جمع", en: "plus" }, { ur: "برابر", en: "equals" }],
      },
      { type: "drill", title: "Small numbers", op: "+", a: [1, 9], b: [1, 9], count: 10 },
      { type: "drill", title: "Bigger numbers (no carrying)", op: "+", a: [10, 50], b: [10, 40], count: 8 },
    ],
  },
  {
    id: "w1-ma-4",
    title: "Subtraction",
    titleUr: "تفریق",
    minutes: 35,
    blocks: [
      {
        type: "rule",
        title: "Subtracting (−)",
        points: [
          "Subtracting means taking away. 9 − 4 = 5 (نو منفی چار برابر پانچ).",
          "Always put the bigger number first.",
          "For bigger numbers: ones first, then tens. 68 − 23 → ones: 8 − 3 = 5, tens: 6 − 2 = 4 → 45.",
          "Check: answer + smaller number = bigger number. 45 + 23 = 68 ✓",
        ],
        lang: "ur",
        examples: [{ ur: "منفی", en: "minus" }, { ur: "تفریق", en: "subtraction" }],
      },
      { type: "drill", title: "Small numbers", op: "-", a: [5, 18], b: [1, 5], count: 10 },
      { type: "drill", title: "Bigger numbers (no borrowing)", op: "-", a: [55, 99], b: [11, 44], count: 8 },
    ],
  },
  {
    id: "w1-ma-5",
    title: "Pakistani money",
    titleUr: "پاکستانی کرنسی",
    minutes: 35,
    blocks: [
      {
        type: "table",
        title: "Notes and coins",
        headers: ["Type", "Values (Rupees)"],
        rows: [
          ["Coins (سکے)", "1, 2, 5, 10"],
          ["Notes (نوٹ)", "10, 20, 50, 100, 500, 1000, 5000"],
        ],
      },
      {
        type: "rule",
        title: "Counting money",
        points: [
          "Start with the biggest note, then add smaller ones.",
          "100 + 50 + 20 = Rs 170",
          "Change (بقایا): you pay Rs 100 for something that costs Rs 70 → you get 100 − 70 = Rs 30 back.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Shop problems",
        questions: [
          { q: "You have one Rs 50 note and two Rs 20 notes. How much money?", options: [{ en: "Rs 70" }, { en: "Rs 90" }, { en: "Rs 80" }], answer: 1 },
          { q: "Bread costs Rs 60. You give Rs 100. How much change?", options: [{ en: "Rs 40" }, { en: "Rs 30" }, { en: "Rs 50" }], answer: 0 },
          { q: "Tea Rs 40 + biscuits Rs 30 = ?", options: [{ en: "Rs 60" }, { en: "Rs 70" }, { en: "Rs 80" }], answer: 1 },
          { q: "How many Rs 10 notes make Rs 100?", options: [{ en: "5" }, { en: "10" }, { en: "100" }], answer: 1 },
          { q: "How many Rs 100 notes make Rs 1000?", options: [{ en: "10" }, { en: "100" }, { en: "20" }], answer: 0 },
          { q: "Eggs cost Rs 25. You give Rs 50. How much change?", options: [{ en: "Rs 15" }, { en: "Rs 20" }, { en: "Rs 25" }], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "w1-ma-6",
    title: "Mixed practice",
    titleUr: "ملی جلی مشق",
    minutes: 30,
    blocks: [
      { type: "drill", title: "Add", op: "+", a: [10, 60], b: [5, 30], count: 8 },
      { type: "drill", title: "Subtract", op: "-", a: [40, 99], b: [10, 30], count: 8 },
      {
        type: "quiz",
        lang: "en",
        title: "Word problems",
        questions: [
          { q: "There are 12 boys and 15 girls. How many children?", options: [{ en: "27" }, { en: "25" }, { en: "3" }], answer: 0 },
          { q: "You had 45 rupees and spent 20. How many left?", options: [{ en: "65" }, { en: "25" }, { en: "20" }], answer: 1 },
          { q: "A box has 30 eggs. 6 broke. How many are good?", options: [{ en: "24" }, { en: "36" }, { en: "26" }], answer: 0 },
        ],
      },
    ],
  },
];
