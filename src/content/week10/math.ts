import { type DraftLesson, askEn as ask } from "../helpers";

export const math: DraftLesson[] = [
  {
    id: "w10-ma-1",
    title: "Simultaneous equations: substitution",
    titleUr: "ہم زمانی مساوات: بدل کا طریقہ",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Two equations, two unknowns",
        points: [
          "Simultaneous equations are two equations that are true at the same time, e.g. x + y = 10 and x − y = 2.",
          "Substitution method: make one letter the subject of one equation, then put it into the other.",
          "From x + y = 10 → y = 10 − x. Put into x − y = 2: x − (10 − x) = 2 → 2x − 10 = 2 → x = 6. Then y = 4.",
          "Check in both equations: 6 + 4 = 10 ✓, 6 − 4 = 2 ✓.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Solve",
        questions: [
          ask("x + y = 7, y = 3. x =", "4", "10", "3"),
          ask("y = 2x, x + y = 9. x =", "3", "6", "4.5"),
          ask("x = y + 4, x + y = 12. y =", "4", "8", "6"),
          ask("y = x + 1, 2x + y = 10. x =", "3", "4", "5"),
          ask("x + y = 15, x − y = 5. (x, y) =", "(10, 5)", "(5, 10)", "(15, 0)"),
          ask("a = 2b, a + b = 18. a =", "12", "6", "9"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-2",
    title: "Simultaneous equations: elimination",
    titleUr: "ہم زمانی مساوات: حذف کا طریقہ",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Add or subtract to remove a letter",
        points: [
          "If one letter has the same coefficient with opposite signs, add the equations.",
          "x + y = 10 and x − y = 2 → add: 2x = 12 → x = 6 → y = 4.",
          "If the coefficients are the same with the same sign, subtract.",
          "2x + 3y = 13 and 2x + y = 7 → subtract: 2y = 6 → y = 3 → 2x = 4 → x = 2.",
          "If needed, first multiply one equation so a coefficient matches.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Solve",
        questions: [
          ask("x + y = 8, x − y = 2. x =", "5", "3", "6"),
          ask("3x + y = 11, x + y = 5. x =", "3", "2", "4"),
          ask("2a + b = 9, a − b = 3. a =", "4", "3", "6"),
          ask("x + 2y = 8, x + y = 5. y =", "3", "2", "1"),
          ask("4x − y = 7, 2x + y = 11. x =", "3", "2", "5"),
          ask("2x + 3y = 12, x + 3y = 9. x =", "3", "2", "6"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-3",
    title: "Word problems with two unknowns",
    titleUr: "دو نامعلوم کے سوالات",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Make two equations from the story",
        points: [
          "3 pens and 2 notebooks cost Rs 270. 1 pen and 2 notebooks cost Rs 170.",
          "Let pen = p, notebook = n. 3p + 2n = 270 and p + 2n = 170.",
          "Subtract: 2p = 100 → p = 50. Then 50 + 2n = 170 → n = 60.",
          "Answer: a pen costs Rs 50 and a notebook Rs 60.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Word problems",
        questions: [
          ask("Two numbers add to 30 and differ by 6. The bigger one is…", "18", "12", "24"),
          ask("2 kg apples + 1 kg bananas = Rs 700; 1 kg apples + 1 kg bananas = Rs 450. 1 kg apples =", "Rs 250", "Rs 200", "Rs 350"),
          ask("A man is 4 times his son's age. Together they are 50. The son is…", "10", "12", "40"),
          ask("In a class there are 40 students. There are 8 more girls than boys. Girls =", "24", "16", "32"),
          ask("5 chairs and 2 tables cost Rs 23,000. 3 chairs and 2 tables cost Rs 17,000. One chair =", "Rs 3,000", "Rs 2,000", "Rs 4,000"),
          ask("A shop sells 60 tickets: adult Rs 100, child Rs 50, total Rs 4,500. Adult tickets =", "30", "45", "20"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-4",
    title: "Sales tax and GST",
    titleUr: "سیلز ٹیکس",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Tax on things we buy",
        points: [
          "Sales tax is a percentage added to the price of goods. In Pakistan it is commonly around 17–18%.",
          "Tax amount = price × rate ÷ 100.",
          "A phone costs Rs 20,000 + 18% tax → tax = 20,000 × 18 ÷ 100 = 3,600 → total = Rs 23,600.",
          "Price before tax = total ÷ (1 + rate/100). Total Rs 11,800 with 18% → 11,800 ÷ 1.18 = Rs 10,000.",
          "Always ask for a proper receipt; the tax you pay helps build roads, schools and hospitals.",
        ],
      },
      { type: "drill", title: "10% of a price (divide by 10)", op: "÷", a: [100, 2000], b: [10, 10], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Price Rs 5,000, tax 18%. Tax =", "Rs 900", "Rs 1,800", "Rs 90"),
          ask("Price Rs 5,000, tax 18%. Total =", "Rs 5,900", "Rs 5,180", "Rs 6,800"),
          ask("A fridge is Rs 60,000 + 17% tax. Total =", "Rs 70,200", "Rs 61,700", "Rs 77,000"),
          ask("Total paid Rs 23,600 including 18% tax. Price before tax =", "Rs 20,000", "Rs 19,352", "Rs 21,000"),
          ask("A bill is Rs 1,000 + 16% tax. Total =", "Rs 1,160", "Rs 1,016", "Rs 1,600"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-5",
    title: "Zakat",
    titleUr: "زکوٰۃ کا حساب",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Calculating zakat",
        points: [
          "Zakat is paid once a year on savings that have been kept for one full year and are above the minimum amount (nisab).",
          "The rate of zakat is 2.5%, which is 1/40 of the savings.",
          "Zakat = savings × 2.5 ÷ 100 = savings ÷ 40.",
          "Savings of Rs 400,000 → zakat = 400,000 ÷ 40 = Rs 10,000.",
          "Zakat is given to the poor and needy. Ask a scholar about the current nisab and special cases.",
        ],
      },
      { type: "drill", title: "Divide by 40", op: "÷", a: [100, 5000], b: [40, 40], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("2.5% as a fraction is…", "1/40", "1/25", "1/4"),
          ask("Zakat on Rs 200,000 =", "Rs 5,000", "Rs 50,000", "Rs 2,500"),
          ask("Zakat on Rs 80,000 =", "Rs 2,000", "Rs 8,000", "Rs 2,500"),
          ask("Zakat on Rs 1,000,000 =", "Rs 25,000", "Rs 2,500", "Rs 250,000"),
          ask("A shopkeeper's zakat was Rs 15,000. His savings were…", "Rs 600,000", "Rs 150,000", "Rs 375,000"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-6",
    title: "Electricity bills and instalments",
    titleUr: "بجلی کا بل اور قسطیں",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Everyday calculations",
        points: [
          "Electricity is measured in units (kilowatt-hours). Bill = units × rate per unit + taxes.",
          "Units used = present meter reading − previous reading. 4,560 − 4,360 = 200 units.",
          "200 units at Rs 30 per unit = Rs 6,000 (before taxes).",
          "Instalments: a motorbike costs Rs 150,000. Down payment Rs 30,000, the rest in 12 equal instalments → (150,000 − 30,000) ÷ 12 = Rs 10,000 per month.",
          "Buying on instalments often costs more in total than paying cash. Always compare.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Previous reading 2,350, present 2,500. Units used =", "150", "250", "4,850"),
          ask("150 units at Rs 30 per unit =", "Rs 4,500", "Rs 450", "Rs 3,000"),
          ask("A fan uses 0.1 units per hour. In 10 hours it uses…", "1 unit", "10 units", "0.01 units"),
          ask("A phone costs Rs 60,000. Down payment Rs 12,000, rest in 6 instalments. Each instalment =", "Rs 8,000", "Rs 10,000", "Rs 12,000"),
          ask("Cash price Rs 100,000. Instalment plan: Rs 20,000 + 10 × Rs 9,000. Extra cost of instalments =", "Rs 10,000", "Rs 0", "Rs 20,000"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-7",
    title: "Reading bar graphs and line graphs",
    titleUr: "بار گراف اور لائن گراف",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Read the axes first",
        points: [
          "Every graph has a title, a horizontal axis and a vertical axis. Read them first.",
          "A bar graph compares amounts in different groups.",
          "A line graph shows how something changes over time; a rising line means increase, a falling line means decrease.",
          "Look at the scale: each step on the axis may stand for 1, 10, 100 or more.",
        ],
      },
      {
        type: "table",
        title: "Bar graph: wheat production of a farm (in maunds)",
        headers: ["Year", "Maunds", "Bar"],
        rows: [
          ["2021", 120, "████████████"],
          ["2022", 80, "████████"],
          ["2023", 140, "██████████████"],
          ["2024", 150, "███████████████"],
          ["2025", 160, "████████████████"],
        ],
      },
      {
        type: "table",
        title: "Line graph data: temperature in Multan (°C, one day)",
        headers: ["Time", "6 am", "9 am", "12 pm", "3 pm", "6 pm", "9 pm"],
        rows: [["°C", 28, 34, 41, 45, 39, 33]],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Use the graphs",
        questions: [
          ask("In which year was production lowest?", "2022", "2021", "2025"),
          ask("How much did production increase from 2022 to 2023?", "60 maunds", "20 maunds", "140 maunds"),
          ask("Average production over the 5 years =", "130 maunds", "120 maunds", "150 maunds"),
          ask("When was it hottest?", "3 pm", "12 pm", "6 pm"),
          ask("By how much did the temperature rise from 6 am to 3 pm?", "17 °C", "45 °C", "11 °C"),
          ask("Between 3 pm and 9 pm the line…", "falls", "rises", "stays the same"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-8",
    title: "Pie charts and percentages",
    titleUr: "پائی چارٹ",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "A whole circle = 100% = 360°",
        points: [
          "A pie chart shows how a whole is divided into parts.",
          "The whole circle is 360°, which stands for 100%.",
          "1% = 3.6°. A quarter of the circle = 90° = 25%.",
          "To find an amount: part = (angle ÷ 360) × total.",
        ],
      },
      {
        type: "table",
        title: "Ali's monthly salary of Rs 36,000",
        headers: ["Item", "Percent", "Angle", "Amount"],
        rows: [
          ["Food", "40%", "144°", "Rs 14,400"],
          ["Rent", "25%", "90°", "Rs 9,000"],
          ["Travel", "10%", "36°", "Rs 3,600"],
          ["Sent home", "15%", "54°", "Rs 5,400"],
          ["Savings", "10%", "36°", "Rs 3,600"],
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Half of a pie chart is how many degrees?", "180°", "90°", "360°"),
          ask("25% of a pie chart =", "90°", "25°", "45°"),
          ask("What does Ali spend most on?", "food", "rent", "travel"),
          ask("How much does Ali save?", "Rs 3,600", "Rs 9,000", "Rs 14,400"),
          ask("A slice of 72° is what percent?", "20%", "72%", "10%"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-9",
    title: "Income, expenses and a family budget",
    titleUr: "آمدنی، اخراجات اور بجٹ",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Planning money",
        points: [
          "Income = all money that comes in (salary, sales, rent).",
          "Expenses = all money that goes out.",
          "Savings = income − expenses. If expenses are more than income, the family goes into debt.",
          "Good rule of thumb: save at least 10% of income every month.",
        ],
      },
      { type: "drill", title: "Savings = income − expenses", op: "-", a: [25000, 60000], b: [15000, 40000], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Income Rs 45,000, expenses Rs 39,000. Savings =", "Rs 6,000", "Rs 84,000", "Rs 4,000"),
          ask("10% of Rs 45,000 =", "Rs 4,500", "Rs 450", "Rs 45,000"),
          ask("Income Rs 30,000, expenses Rs 33,000. The family…", "goes Rs 3,000 into debt", "saves Rs 3,000", "breaks even"),
          ask("Saving Rs 5,000 a month for a year =", "Rs 60,000", "Rs 50,000", "Rs 5,000"),
          ask("A family spends 30% of Rs 50,000 on food. Food =", "Rs 15,000", "Rs 30,000", "Rs 1,500"),
        ],
      },
    ],
  },
  {
    id: "w10-ma-10",
    title: "Week 10 review",
    titleUr: "دہرائی",
    minutes: 50,
    blocks: [
      {
        type: "quiz",
        lang: "en",
        title: "Mixed test",
        questions: [
          ask("x + y = 20, x − y = 4. x =", "12", "8", "16"),
          ask("2x + y = 13, x + y = 8. x =", "5", "3", "4"),
          ask("Two pens and a notebook cost Rs 160; one pen and a notebook cost Rs 110. A pen =", "Rs 50", "Rs 60", "Rs 55"),
          ask("Price Rs 8,000 + 18% tax. Total =", "Rs 9,440", "Rs 8,180", "Rs 9,800"),
          ask("Zakat on Rs 320,000 =", "Rs 8,000", "Rs 32,000", "Rs 6,400"),
          ask("Previous reading 1,800, present 2,050, rate Rs 28. Bill before tax =", "Rs 7,000", "Rs 5,600", "Rs 7,840"),
          ask("A 54° slice of a pie chart is…", "15%", "54%", "25%"),
          ask("Income Rs 52,000, expenses Rs 46,800. Savings % =", "10%", "5%", "12%"),
        ],
      },
      { type: "write", lang: "en", items: ["Equations", "Tax and zakat", "Graph"], note: "Make your own family budget for one month, draw it as a bar graph, and calculate how much zakat would be due on a year's savings." },
    ],
  },
];
