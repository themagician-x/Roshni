import { type DraftLesson, askEn as ask } from "../helpers";

export const math: DraftLesson[] = [
  {
    id: "w6-ma-1",
    title: "Ratio",
    titleUr: "نسبت",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Comparing with a ratio (نسبت)",
        points: [
          "A ratio compares two amounts of the same kind. 3 boys and 2 girls → boys : girls = 3 : 2 (three to two).",
          "Order matters: girls : boys = 2 : 3.",
          "Simplify like a fraction: 10 : 15 = 2 : 3 (divide both by 5).",
          "Use the same units: 50 paisa : Rs 2 = 50 : 200 = 1 : 4.",
          "Sharing in a ratio: share Rs 500 in the ratio 2 : 3 → total parts 2 + 3 = 5, one part = 500 ÷ 5 = 100, so Rs 200 and Rs 300.",
        ],
      },
      { type: "drill", title: "One part = total ÷ number of parts", op: "÷", a: [20, 150], b: [3, 9], count: 8 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Simplify 8 : 12", "2 : 3", "4 : 3", "8 : 12"),
          ask("Simplify 25 : 100", "1 : 4", "4 : 1", "1 : 5"),
          ask("In a class there are 12 boys and 18 girls. Boys : girls = ?", "2 : 3", "3 : 2", "12 : 30"),
          ask("Share Rs 600 in the ratio 1 : 2. The bigger share is…", "Rs 400", "Rs 300", "Rs 200"),
          ask("Cement and sand are mixed 1 : 4. For 3 bags of cement, how many bags of sand?", "12", "7", "4"),
          ask("1 metre : 25 cm = ?", "4 : 1", "1 : 25", "25 : 1"),
        ],
      },
    ],
  },
  {
    id: "w6-ma-2",
    title: "Proportion: direct and inverse",
    titleUr: "تناسب: راست اور معکوس",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "When one changes, the other changes",
        points: [
          "Direct proportion (راست تناسب): more of one → more of the other. More kilos → more price. More hours → more pay.",
          "5 kg cost Rs 600. 1 kg = 600 ÷ 5 = 120. 8 kg = 120 × 8 = Rs 960.",
          "Inverse proportion (معکوس تناسب): more of one → LESS of the other. More workers → fewer days.",
          "6 workers build a wall in 10 days. 1 worker needs 6 × 10 = 60 days. 12 workers need 60 ÷ 12 = 5 days.",
          "Ask yourself first: if one goes up, does the other go up (direct) or down (inverse)?",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Direct or inverse?",
        questions: [
          ask("Litres of petrol and its cost", "direct", "inverse"),
          ask("Speed of a car and time for a journey", "inverse", "direct"),
          ask("Number of workers and days to finish a job", "inverse", "direct"),
          ask("Hours worked and wages", "direct", "inverse"),
          ask("4 shirts cost Rs 2,000. 7 shirts cost…", "Rs 3,500", "Rs 3,000", "Rs 14,000"),
          ask("5 men dig a field in 12 days. 10 men take…", "6 days", "24 days", "10 days"),
          ask("A car goes 240 km in 4 hours. How far in 6 hours (same speed)?", "360 km", "160 km", "300 km"),
          ask("Food lasts 20 days for 30 people. For 60 people it lasts…", "10 days", "40 days", "15 days"),
        ],
      },
    ],
  },
  {
    id: "w6-ma-3",
    title: "Percentages in daily life",
    titleUr: "فیصد: روزمرہ زندگی میں",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Working with percent",
        points: [
          "x% of an amount = amount × x ÷ 100. 15% of 400 = 400 × 15 ÷ 100 = 60.",
          "As a percent: part ÷ whole × 100. 45 out of 60 = 45 ÷ 60 × 100 = 75%.",
          "Increase: new = old + (percent of old). Rent Rs 10,000 goes up 10% → 10,000 + 1,000 = Rs 11,000.",
          "Decrease: new = old − (percent of old). Price Rs 800 falls 25% → 800 − 200 = Rs 600.",
        ],
      },
      { type: "drill", title: "1% of an amount (divide by 100)", op: "÷", a: [2, 90], b: [100, 100], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("20% of 350 = ?", "70", "35", "700"),
          ask("5% of 1,200 = ?", "60", "120", "600"),
          ask("You got 36 out of 40. Percent?", "90%", "80%", "36%"),
          ask("A salary of Rs 20,000 goes up by 10%. New salary?", "Rs 22,000", "Rs 20,010", "Rs 30,000"),
          ask("A bag of flour was Rs 1,500. The price fell 20%. New price?", "Rs 1,200", "Rs 1,300", "Rs 1,480"),
          ask("In a village of 2,000 people, 60% can read. How many can read?", "1,200", "600", "1,400"),
        ],
      },
    ],
  },
  {
    id: "w6-ma-4",
    title: "Profit and loss",
    titleUr: "نفع اور نقصان",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Buying and selling",
        points: [
          "Cost price (قیمتِ خرید) = what the shopkeeper paid. Selling price (قیمتِ فروخت) = what the customer pays.",
          "Selling price > cost price → profit (نفع) = SP − CP.",
          "Selling price < cost price → loss (نقصان) = CP − SP.",
          "Profit % = profit ÷ cost price × 100. A phone bought for Rs 8,000 and sold for Rs 10,000 → profit 2,000 → 2,000 ÷ 8,000 × 100 = 25%.",
          "To find the selling price for a profit: CP + profit%. Bought Rs 500, want 20% profit → 500 + 100 = Rs 600.",
        ],
      },
      {
        type: "table",
        title: "Examples",
        headers: ["Item", "Cost price", "Selling price", "Result"],
        rows: [
          ["Phone", "Rs 8,000", "Rs 10,000", "Profit Rs 2,000 (25%)"],
          ["Bicycle", "Rs 12,000", "Rs 10,800", "Loss Rs 1,200 (10%)"],
          ["Mangoes (box)", "Rs 1,000", "Rs 1,150", "Profit Rs 150 (15%)"],
        ],
      },
      { type: "drill", title: "Profit = selling price − cost price", op: "-", a: [500, 2000], b: [300, 1500], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("CP Rs 400, SP Rs 500. Profit?", "Rs 100", "Rs 900", "Rs 50"),
          ask("CP Rs 1,000, SP Rs 850. Result?", "Loss Rs 150", "Profit Rs 150", "Loss Rs 850"),
          ask("CP Rs 200, profit Rs 50. Profit %?", "25%", "50%", "20%"),
          ask("CP Rs 2,000, loss 10%. SP?", "Rs 1,800", "Rs 2,200", "Rs 1,900"),
          ask("A shopkeeper buys a fan for Rs 5,000 and wants 20% profit. Selling price?", "Rs 6,000", "Rs 5,200", "Rs 7,000"),
          ask("Ali buys 10 phone covers for Rs 1,500 and sells each for Rs 200. Profit?", "Rs 500", "Rs 300", "Rs 2,000"),
        ],
      },
    ],
  },
  {
    id: "w6-ma-5",
    title: "Discount",
    titleUr: "رعایت",
    minutes: 35,
    blocks: [
      {
        type: "rule",
        title: "Sale prices",
        points: [
          "Marked price (لکھی ہوئی قیمت) = the price on the tag.",
          "Discount (رعایت) = money taken off the marked price.",
          "Sale price = marked price − discount.",
          "20% off a Rs 2,500 shirt → discount 500 → you pay Rs 2,000.",
          "Check two offers: 25% off Rs 1,200 (pay 900) vs Rs 250 off (pay 950) → the 25% offer is better.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Marked price Rs 1,000, discount 10%. You pay…", "Rs 900", "Rs 990", "Rs 100"),
          ask("Marked price Rs 3,000, discount 30%. Discount amount?", "Rs 900", "Rs 300", "Rs 2,100"),
          ask("A pair of shoes is Rs 4,000 with Rs 600 off. Discount %?", "15%", "6%", "60%"),
          ask("Which is better on Rs 2,000? A: 15% off, B: Rs 250 off", "A (pay Rs 1,700)", "B (pay Rs 1,750)", "They are the same"),
          ask("Sale price Rs 720 after 10% off. Marked price?", "Rs 800", "Rs 792", "Rs 730"),
        ],
      },
    ],
  },
  {
    id: "w6-ma-6",
    title: "Simple interest",
    titleUr: "سادہ منافع (سود)",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Money that grows",
        points: [
          "Principal (اصل رقم) = the money put in a bank or borrowed.",
          "Rate = percent per year. Time = number of years.",
          "Simple interest = principal × rate × time ÷ 100.",
          "Rs 10,000 at 8% for 3 years → 10,000 × 8 × 3 ÷ 100 = Rs 2,400.",
          "Amount (کل رقم) = principal + interest = 10,000 + 2,400 = Rs 12,400.",
          "Banks also call it profit (منافع) on savings. Always read the rate before you borrow.",
        ],
      },
      { type: "drill", title: "Interest for one year at 10% (divide by 10)", op: "÷", a: [100, 900], b: [10, 10], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Rs 5,000 at 10% for 1 year. Interest?", "Rs 500", "Rs 50", "Rs 5,500"),
          ask("Rs 20,000 at 5% for 2 years. Interest?", "Rs 2,000", "Rs 1,000", "Rs 200"),
          ask("Rs 20,000 at 5% for 2 years. Amount?", "Rs 22,000", "Rs 21,000", "Rs 2,000"),
          ask("Rs 8,000 at 12% for 3 years. Interest?", "Rs 2,880", "Rs 960", "Rs 2,400"),
          ask("Which gives more interest on Rs 10,000 for 1 year?", "9%", "7%", "8%"),
        ],
      },
    ],
  },
];
