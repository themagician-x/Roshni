import { type DraftLesson, askEn as ask } from "../helpers";

export const math: DraftLesson[] = [
  {
    id: "w11-ma-1",
    title: "Pythagoras theorem",
    titleUr: "مسئلہ فیثاغورث",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "In a right-angled triangle",
        points: [
          "The longest side, opposite the right angle, is the hypotenuse (وتر).",
          "Pythagoras: hypotenuse² = base² + perpendicular². c² = a² + b².",
          "Sides 3 and 4 → c² = 9 + 16 = 25 → c = 5.",
          "To find a shorter side: a² = c² − b². Hypotenuse 13, side 5 → a² = 169 − 25 = 144 → a = 12.",
          "Famous triples: (3, 4, 5), (5, 12, 13), (6, 8, 10), (8, 15, 17).",
        ],
      },
      { type: "drill", title: "Multiplication warm-up", op: "×", a: [3, 20], b: [3, 20], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Find the missing side",
        questions: [
          ask("Sides 6 and 8. Hypotenuse =", "10", "14", "12"),
          ask("Sides 5 and 12. Hypotenuse =", "13", "17", "15"),
          ask("Hypotenuse 10, one side 6. Other side =", "8", "4", "16"),
          ask("Hypotenuse 17, one side 8. Other side =", "15", "9", "12"),
          ask("Which is a right-angled triangle?", "7, 24, 25", "4, 5, 6", "2, 3, 4"),
          ask("The longest side of a right triangle is called the…", "hypotenuse", "base", "perpendicular"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-2",
    title: "Pythagoras in real life",
    titleUr: "فیثاغورث روزمرہ زندگی میں",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Ladders, diagonals and distances",
        points: [
          "A 5 m ladder leans on a wall with its foot 3 m from the wall. Height reached = √(25 − 9) = 4 m.",
          "Diagonal of a rectangle 8 m × 6 m = √(64 + 36) = 10 m.",
          "A man walks 12 km north and 5 km east. Distance from start = √(144 + 25) = 13 km.",
          "TV screens are measured by their diagonal.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Word problems",
        questions: [
          ask("A 10 m ladder, foot 6 m from the wall. Height reached =", "8 m", "4 m", "16 m"),
          ask("Diagonal of a 9 m × 12 m room =", "15 m", "21 m", "13 m"),
          ask("Walk 8 km east, then 6 km north. Distance from start =", "10 km", "14 km", "2 km"),
          ask("A square field has side 10 m. Its diagonal is about…", "14.1 m", "20 m", "10 m"),
          ask("A pole 12 m high casts a shadow 5 m long. Distance from top of pole to end of shadow =", "13 m", "17 m", "7 m"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-3",
    title: "Circles: circumference",
    titleUr: "دائرہ: محیط",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "The distance around a circle",
        points: [
          "Radius (نصف قطر, r) = centre to edge. Diameter (قطر, d) = 2r.",
          "π (pi) ≈ 3.14 or 22/7.",
          "Circumference (محیط) = 2πr = πd.",
          "Radius 7 cm → 2 × 22/7 × 7 = 44 cm.",
          "A wheel of radius 35 cm moves 2 × 22/7 × 35 = 220 cm in one turn.",
        ],
      },
      { type: "drill", title: "Multiply by 22 (then divide by 7)", op: "×", a: [7, 70], b: [22, 22], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice (use π = 22/7)",
        questions: [
          ask("Diameter of a circle with radius 9 cm =", "18 cm", "4.5 cm", "81 cm"),
          ask("Circumference, radius 7 cm =", "44 cm", "22 cm", "154 cm"),
          ask("Circumference, diameter 14 m =", "44 m", "88 m", "154 m"),
          ask("Circumference, radius 21 cm =", "132 cm", "66 cm", "441 cm"),
          ask("A wheel of radius 14 cm makes 10 turns. Distance =", "880 cm", "88 cm", "440 cm"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-4",
    title: "Circles: area",
    titleUr: "دائرہ: رقبہ",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Space inside a circle",
        points: [
          "Area = πr².",
          "Radius 7 cm → 22/7 × 7 × 7 = 154 cm².",
          "Radius 14 m → 22/7 × 14 × 14 = 616 m².",
          "If you know the diameter, halve it first to get the radius.",
          "A round table top of radius 0.7 m has area 22/7 × 0.49 = 1.54 m².",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice (use π = 22/7)",
        questions: [
          ask("Area, radius 7 cm =", "154 cm²", "44 cm²", "49 cm²"),
          ask("Area, radius 14 cm =", "616 cm²", "88 cm²", "196 cm²"),
          ask("Area, diameter 14 m =", "154 m²", "616 m²", "44 m²"),
          ask("Area, radius 21 m =", "1,386 m²", "132 m²", "441 m²"),
          ask("If the radius doubles, the area becomes…", "4 times", "2 times", "the same"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-5",
    title: "Surface area and composite shapes",
    titleUr: "سطحی رقبہ اور مرکب اشکال",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Add or subtract simple shapes",
        points: [
          "Composite shape: break it into rectangles, triangles and circles, find each area, then add.",
          "Path around a garden: big rectangle − small rectangle.",
          "Surface area of a cuboid = 2(lw + lh + wh).",
          "Box 5 × 4 × 3 → 2(20 + 15 + 12) = 94 cm².",
          "Surface area of a cube = 6 × side². Side 4 → 96 cm².",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Surface area of a cube with side 3 cm =", "54 cm²", "27 cm²", "18 cm²"),
          ask("Surface area of a box 6 × 4 × 2 =", "88 cm²", "48 cm²", "96 cm²"),
          ask("A garden 20 m × 15 m has a 2 m path inside its edge. Area of the inner garden =", "176 m²", "300 m²", "124 m²"),
          ask("An L-shape made of a 10 × 4 and a 6 × 3 rectangle. Total area =", "58 m²", "40 m²", "64 m²"),
          ask("Painting the 4 walls of a room 5 m × 4 m, height 3 m (no doors). Wall area =", "54 m²", "60 m²", "20 m²"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-6",
    title: "Cylinders",
    titleUr: "اسطوانہ (سلنڈر)",
    minutes: 45,
    blocks: [
      {
        type: "rule",
        title: "Tanks, pipes and drums",
        points: [
          "A cylinder has two circles and a curved side, like a water tank or a drum.",
          "Volume = πr²h.",
          "Tank radius 7 dm, height 10 dm → 22/7 × 49 × 10 = 1,540 dm³ = 1,540 litres (1 dm³ = 1 litre).",
          "Curved surface area = 2πrh.",
          "Total surface area = 2πrh + 2πr².",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice (use π = 22/7)",
        questions: [
          ask("Volume, r = 7 cm, h = 10 cm =", "1,540 cm³", "440 cm³", "154 cm³"),
          ask("Volume, r = 14 cm, h = 5 cm =", "3,080 cm³", "440 cm³", "1,540 cm³"),
          ask("Curved surface area, r = 7 cm, h = 10 cm =", "440 cm²", "1,540 cm²", "154 cm²"),
          ask("A tank of volume 2,000 litres holds how many cubic decimetres?", "2,000 dm³", "200 dm³", "20 dm³"),
          ask("If the height of a cylinder doubles, the volume…", "doubles", "stays the same", "becomes 4 times"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-7",
    title: "Mean (average)",
    titleUr: "اوسط (حسابی اوسط)",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "The arithmetic mean",
        points: [
          "Mean = sum of all values ÷ number of values.",
          "Marks 60, 70, 80, 90 → (300) ÷ 4 = 75.",
          "If the mean of 5 numbers is 20, their total is 5 × 20 = 100.",
          "One very big or very small value can pull the mean a lot.",
        ],
      },
      { type: "drill", title: "Total ÷ number", op: "÷", a: [10, 80], b: [3, 8], count: 6 },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Mean of 4, 6, 8, 10, 12 =", "8", "10", "40"),
          ask("Mean of 25, 35, 45 =", "35", "45", "105"),
          ask("The mean of 6 numbers is 15. Their total =", "90", "21", "2.5"),
          ask("Daily sales: 20, 30, 25, 45. Mean =", "30", "25", "120"),
          ask("Salaries: 20k, 22k, 21k, 23k, 100k. Why is the mean misleading?", "One very high value pulls it up.", "It is always wrong.", "There are too few values."),
        ],
      },
    ],
  },
  {
    id: "w11-ma-8",
    title: "Median",
    titleUr: "وسطانیہ",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "The middle value",
        points: [
          "Put the values in order, from smallest to largest.",
          "Odd number of values: the median is the middle one. 3, 5, 7, 9, 11 → median 7.",
          "Even number of values: the median is the mean of the two middle ones. 2, 4, 6, 8 → (4 + 6) ÷ 2 = 5.",
          "The median is not affected much by one extreme value, so it is useful for salaries and prices.",
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Median of 9, 2, 7, 4, 5 =", "5", "7", "4"),
          ask("Median of 10, 20, 30, 40 =", "25", "20", "30"),
          ask("Median of 3, 8, 8, 9, 15, 21, 30 =", "9", "8", "15"),
          ask("Salaries 20k, 21k, 22k, 23k, 100k. Median =", "22k", "37.2k", "100k"),
          ask("First step to find the median is to…", "arrange the values in order", "add them", "find the biggest"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-9",
    title: "Mode and choosing an average",
    titleUr: "عادہ اور مناسب اوسط",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "The most common value",
        points: [
          "Mode = the value that appears most often. 2, 3, 3, 5, 3, 7 → mode 3.",
          "There can be more than one mode, or no mode at all.",
          "A shopkeeper uses the mode to know the most popular shoe size.",
          "Mean: good for fair sharing. Median: good when there are extreme values. Mode: good for the most popular choice.",
        ],
      },
      {
        type: "table",
        title: "Shoe sizes sold in a week",
        headers: ["Size", "6", "7", "8", "9", "10"],
        rows: [["Pairs sold", 4, 9, 15, 7, 2]],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Practice",
        questions: [
          ask("Mode of 4, 7, 4, 9, 4, 7 =", "4", "7", "9"),
          ask("Which shoe size is the mode in the table?", "8", "7", "10"),
          ask("How many pairs were sold in total?", "37", "40", "15"),
          ask("To find the most popular item, use the…", "mode", "mean", "median"),
          ask("To share money fairly, use the…", "mean", "mode", "median"),
          ask("For house prices with a few very expensive houses, use the…", "median", "mean", "mode"),
        ],
      },
    ],
  },
  {
    id: "w11-ma-10",
    title: "Week 11 review",
    titleUr: "دہرائی",
    minutes: 50,
    blocks: [
      {
        type: "quiz",
        lang: "en",
        title: "Mixed test",
        questions: [
          ask("Sides 9 and 12. Hypotenuse =", "15", "21", "13"),
          ask("A 13 m ladder, foot 5 m from the wall. Height =", "12 m", "8 m", "18 m"),
          ask("Circumference, radius 14 cm (π = 22/7) =", "88 cm", "44 cm", "616 cm"),
          ask("Area, radius 7 m (π = 22/7) =", "154 m²", "44 m²", "49 m²"),
          ask("Volume of a cylinder, r = 7, h = 20 (π = 22/7) =", "3,080", "1,540", "880"),
          ask("Mean of 12, 15, 18, 21, 24 =", "18", "15", "90"),
          ask("Median of 7, 3, 9, 1, 5, 11 =", "6", "5", "7"),
          ask("Mode of 2, 5, 5, 6, 6, 6, 8 =", "6", "5", "8"),
        ],
      },
      { type: "write", lang: "en", items: ["Pythagoras", "Circle", "Averages"], note: "Measure 5 round things at home (plate, bucket, wheel…). Find their circumference and area. Then find the mean, median and mode of your family members' ages." },
    ],
  },
];
