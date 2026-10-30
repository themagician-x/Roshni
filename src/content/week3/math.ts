import { type DraftLesson, askEn as ask } from "../helpers";

const tableRows = (from: number, to: number) =>
  Array.from({ length: 10 }, (_, i) => Array.from({ length: to - from + 1 }, (_, j) => `${from + j} × ${i + 1} = ${(from + j) * (i + 1)}`));

const tableHeaders = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, j) => `Table of ${from + j}`);

export const math: DraftLesson[] = [
  {
    id: "w3-ma-1",
    title: "Multiplication: tables 2 to 5",
    titleUr: "ضرب: پہاڑے ۲ سے ۵",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "What is multiplication? (ضرب)",
        points: [
          "Multiplication is quick adding of equal groups.",
          "3 groups of 4 apples: 4 + 4 + 4 = 12, so 3 × 4 = 12 (تین چوکے بارہ).",
          "Order does not matter: 3 × 4 = 4 × 3 = 12.",
          "Any number × 1 = the same number. Any number × 0 = 0. Any number × 10: add a 0 → 7 × 10 = 70.",
        ],
      },
      { type: "table", title: "Tables 2 to 5", headers: tableHeaders(2, 5), rows: tableRows(2, 5) },
      { type: "write", lang: "en", items: ["Tables of 2, 3, 4 and 5"], note: "Write each table twice in your notebook and say it aloud while writing." },
      { type: "drill", title: "Tables 2 to 5", op: "×", a: [2, 5], b: [1, 10], count: 12 },
      {
        type: "quiz",
        lang: "en",
        title: "Think",
        questions: [
          ask("5 + 5 + 5 = 3 × ?", "5", "3", "15"),
          ask("4 × 6 = ?", "24", "20", "28"),
          ask("3 × 9 = ?", "27", "24", "36"),
          ask("A bike has 2 wheels. How many wheels on 7 bikes?", "14", "9", "16"),
          ask("8 × 1 = ?", "8", "1", "9"),
          ask("5 × 0 = ?", "0", "5", "50"),
        ],
      },
    ],
  },
  {
    id: "w3-ma-2",
    title: "Tables 6 to 10",
    titleUr: "پہاڑے ۶ سے ۱۰",
    minutes: 40,
    blocks: [
      { type: "table", title: "Tables 6 to 10", headers: tableHeaders(6, 10), rows: tableRows(6, 10) },
      {
        type: "rule",
        title: "Tricks",
        points: [
          "Table of 9: the digits of the answer add up to 9 → 9 × 4 = 36 (3 + 6 = 9).",
          "Table of 5: answers end in 5 or 0.",
          "Table of 10: put a 0 at the end.",
          "If you know 6 × 8 = 48, you also know 8 × 6 = 48.",
        ],
      },
      { type: "write", lang: "en", items: ["Tables of 6, 7, 8, 9 and 10"], note: "Write each table twice. Learn one table every morning until you can say it without looking." },
      { type: "drill", title: "Tables 6 to 10", op: "×", a: [6, 10], b: [1, 10], count: 12 },
      { type: "drill", title: "All tables mixed", op: "×", a: [2, 10], b: [2, 10], count: 10 },
      {
        type: "quiz",
        lang: "en",
        title: "Quick check",
        questions: [ask("7 × 8 = ?", "56", "54", "64"), ask("9 × 6 = ?", "54", "56", "45"), ask("6 × 7 = ?", "42", "48", "36"), ask("8 × 8 = ?", "64", "68", "56"), ask("A week has 7 days. How many days in 6 weeks?", "42", "13", "48")],
      },
    ],
  },
  {
    id: "w3-ma-3",
    title: "Multiplying bigger numbers",
    titleUr: "بڑے اعداد کی ضرب",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Two-digit × one-digit",
        points: [
          "Multiply the ones first, then the tens. Carry like in addition.",
          "Example: 24 × 3 → 4 × 3 = 12 (write 2, carry 1). 2 × 3 = 6, + 1 = 7 → 72.",
          "Example: 45 × 6 → 5 × 6 = 30 (write 0, carry 3). 4 × 6 = 24, + 3 = 27 → 270.",
          "× 10 → add one 0: 36 × 10 = 360. × 100 → add two 0s: 36 × 100 = 3,600.",
        ],
      },
      {
        type: "table",
        title: "Worked example: 24 × 3",
        headers: ["", "Tens", "Ones"],
        rows: [
          ["carry", "1", ""],
          ["", "2", "4"],
          ["×", "", "3"],
          ["=", "7", "2"],
        ],
      },
      { type: "drill", title: "Two-digit × one-digit", op: "×", a: [11, 49], b: [2, 9], count: 10 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("23 × 4 = ?", "92", "82", "812"),
          ask("15 × 6 = ?", "90", "80", "96"),
          ask("48 × 10 = ?", "480", "4,800", "58"),
          ask("7 × 100 = ?", "700", "70", "7,000"),
          ask("One shirt costs Rs 450. How much for 2 shirts?", "Rs 900", "Rs 800", "Rs 452"),
        ],
      },
    ],
  },
  {
    id: "w3-ma-4",
    title: "Division: sharing equally",
    titleUr: "تقسیم: برابر بانٹنا",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "What is division? (تقسیم)",
        points: [
          "Division means sharing equally. 12 sweets shared by 3 boys → each gets 4. 12 ÷ 3 = 4.",
          "Division is the opposite of multiplication: 3 × 4 = 12, so 12 ÷ 3 = 4 and 12 ÷ 4 = 3.",
          "To divide, ask: which number × 3 gives 12? Use your tables.",
          "Any number ÷ 1 = the same number. A number ÷ itself = 1.",
        ],
      },
      {
        type: "table",
        title: "One fact, four sentences",
        headers: ["×", "×", "÷", "÷"],
        rows: [
          ["3 × 4 = 12", "4 × 3 = 12", "12 ÷ 3 = 4", "12 ÷ 4 = 3"],
          ["6 × 7 = 42", "7 × 6 = 42", "42 ÷ 6 = 7", "42 ÷ 7 = 6"],
          ["8 × 9 = 72", "9 × 8 = 72", "72 ÷ 8 = 9", "72 ÷ 9 = 8"],
        ],
      },
      { type: "drill", title: "Divide using tables", op: "÷", a: [2, 10], b: [2, 10], count: 12 },
      {
        type: "quiz",
        lang: "en",
        title: "Share it",
        questions: [
          ask("20 rupees shared by 4 people. Each gets?", "Rs 5", "Rs 4", "Rs 16"),
          ask("35 ÷ 5 = ?", "7", "6", "8"),
          ask("If 6 × 9 = 54, then 54 ÷ 9 = ?", "6", "9", "45"),
          ask("A box has 24 eggs in 4 rows. How many in each row?", "6", "8", "20"),
          ask("9 ÷ 9 = ?", "1", "0", "9"),
        ],
      },
    ],
  },
  {
    id: "w3-ma-5",
    title: "Dividing bigger numbers",
    titleUr: "بڑے اعداد کی تقسیم",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Long division by one digit",
        points: [
          "Start from the left. 84 ÷ 4 → 8 ÷ 4 = 2. Then 4 ÷ 4 = 1. Answer 21.",
          "If the first digit is too small, take two digits: 96 ÷ 8 → 9 ÷ 8 = 1, 1 left. Bring down 6 → 16 ÷ 8 = 2. Answer 12.",
          "Check by multiplying back: 12 × 8 = 96 ✓",
          "Sometimes something is left over. That is the remainder (باقی): 17 ÷ 5 = 3, remainder 2 (because 3 × 5 = 15, and 17 − 15 = 2).",
        ],
      },
      { type: "drill", title: "Bigger numbers", op: "÷", a: [11, 30], b: [2, 6], count: 10 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("84 ÷ 4 = ?", "21", "24", "12"),
          ask("96 ÷ 8 = ?", "12", "11", "13"),
          ask("75 ÷ 5 = ?", "15", "17", "13"),
          ask("17 ÷ 5 = 3, remainder ?", "2", "3", "5"),
          ask("23 ÷ 4 = 5, remainder ?", "3", "1", "4"),
          ask("Rs 600 shared by 3 brothers. Each gets?", "Rs 200", "Rs 300", "Rs 180"),
        ],
      },
    ],
  },
  {
    id: "w3-ma-6",
    title: "Word problems: × and ÷",
    titleUr: "سوالات: ضرب اور تقسیم",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Multiply or divide?",
        points: [
          "Many groups of the same size, find the total → multiply (×). ‘each … how many in all’",
          "A total split into equal groups → divide (÷). ‘shared equally, each gets, how many groups’",
          "Read the question twice. Write the sum. Then solve.",
        ],
      },
      { type: "drill", title: "Multiply", op: "×", a: [12, 60], b: [3, 9], count: 6 },
      { type: "drill", title: "Divide", op: "÷", a: [5, 25], b: [3, 9], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Word problems",
        questions: [
          ask("A dozen eggs costs Rs 300. How much for 3 dozen?", "Rs 900", "Rs 600", "Rs 303"),
          ask("A worker earns Rs 800 a day. How much in 6 days?", "Rs 4,800", "Rs 4,000", "Rs 806"),
          ask("48 students sit in rows of 6. How many rows?", "8", "6", "42"),
          ask("A bus has 45 seats. How many seats in 4 buses?", "180", "160", "49"),
          ask("Rs 900 is shared by 3 friends. Each gets?", "Rs 300", "Rs 270", "Rs 600"),
          ask("A farmer puts 56 mangoes in 7 bags equally. How many in each bag?", "8", "7", "9"),
        ],
      },
    ],
  },
];
