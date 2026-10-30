import type { Item, Lesson } from "@/lib/types";

type DraftLesson = Omit<Lesson, "day">;

const A = (letter: string, word: string, ur: string, emoji: string): Item => ({
  en: `${letter} ${letter.toLowerCase()}`,
  sayEn: `${letter}. ${letter} for ${word}.`,
  word: { en: word, ur, emoji },
});

const am: Item[] = [
  A("A", "apple", "سیب", "🍎"),
  A("B", "ball", "گیند", "⚽"),
  A("C", "cat", "بلی", "🐈"),
  A("D", "dog", "کتا", "🐕"),
  A("E", "egg", "انڈا", "🥚"),
  A("F", "fish", "مچھلی", "🐟"),
  A("G", "goat", "بکری", "🐐"),
  A("H", "hat", "ٹوپی", "🎩"),
  A("I", "ink", "سیاہی", "🖋️"),
  A("J", "jug", "جگ", "🫗"),
  A("K", "kite", "پتنگ", "🪁"),
  A("L", "lion", "شیر", "🦁"),
  A("M", "mango", "آم", "🥭"),
];

const nz: Item[] = [
  A("N", "nose", "ناک", "👃"),
  A("O", "orange", "مالٹا", "🍊"),
  A("P", "pen", "قلم", "🖊️"),
  A("Q", "queen", "ملکہ", "👑"),
  A("R", "rabbit", "خرگوش", "🐇"),
  A("S", "sun", "سورج", "☀️"),
  A("T", "tree", "درخت", "🌳"),
  A("U", "umbrella", "چھتری", "☂️"),
  A("V", "van", "وین", "🚐"),
  A("W", "watch", "گھڑی", "⌚"),
  { en: "X x", sayEn: "X. X as in box.", word: { en: "box", ur: "ڈبہ", emoji: "📦" }, note: "x comes at the end: bo-x" },
  A("Y", "yellow", "پیلا", "💛"),
  A("Z", "zebra", "زیبرا", "🦓"),
];

const firstLetterQuiz = (items: Item[], picks: [number, number, number][]) =>
  picks.map(([a, b, c]) => {
    const opts = [items[a], items[b], items[c]].map((i) => ({ en: i.en }));
    const order = [...opts].sort((x, y) => x.en!.localeCompare(y.en!));
    return {
      q: `${items[a].word!.emoji}  ${items[a].word!.en} starts with which letter?`,
      prompt: { en: items[a].word!.en },
      options: order,
      answer: order.findIndex((o) => o.en === items[a].en),
    };
  });

export const english: DraftLesson[] = [
  {
    id: "w1-en-1",
    title: "Greetings and introducing yourself",
    titleUr: "سلام دعا اور تعارف",
    minutes: 35,
    blocks: [
      {
        type: "phrases",
        lang: "en",
        title: "Say these every day",
        items: [
          { en: "Hello!", ur: "سلام / ہیلو" },
          { en: "Good morning.", ur: "صبح بخیر" },
          { en: "Good night.", ur: "شب بخیر" },
          { en: "How are you?", ur: "آپ کیسے ہیں؟" },
          { en: "I am fine, thank you.", ur: "میں ٹھیک ہوں، شکریہ۔" },
          { en: "What is your name?", ur: "آپ کا نام کیا ہے؟" },
          { en: "My name is Ali.", ur: "میرا نام علی ہے۔" },
          { en: "How old are you?", ur: "آپ کی عمر کتنی ہے؟" },
          { en: "I am nineteen years old.", ur: "میری عمر انیس سال ہے۔" },
          { en: "Where do you live?", ur: "آپ کہاں رہتے ہیں؟" },
          { en: "I live in Pakistan.", ur: "میں پاکستان میں رہتا ہوں۔" },
          { en: "Nice to meet you.", ur: "آپ سے مل کر خوشی ہوئی۔" },
          { en: "Goodbye.", ur: "خدا حافظ" },
        ],
      },
      {
        type: "phrases",
        lang: "en",
        title: "Magic words",
        items: [
          { en: "Yes.", ur: "جی ہاں" },
          { en: "No.", ur: "جی نہیں" },
          { en: "Please.", ur: "مہربانی کر کے" },
          { en: "Thank you.", ur: "شکریہ" },
          { en: "Sorry.", ur: "معاف کیجیے" },
          { en: "Please say it again.", ur: "دوبارہ بولیں" },
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Listen and choose the meaning",
        questions: [
          { q: "What does this mean?", prompt: { en: "What is your name?" }, listen: true, options: [{ ur: "آپ کیسے ہیں؟" }, { ur: "آپ کا نام کیا ہے؟" }, { ur: "خدا حافظ" }], answer: 1 },
          { q: "What does this mean?", prompt: { en: "Good morning." }, listen: true, options: [{ ur: "صبح بخیر" }, { ur: "شب بخیر" }, { ur: "شکریہ" }], answer: 0 },
          { q: "What does this mean?", prompt: { en: "Where do you live?" }, listen: true, options: [{ ur: "آپ کی عمر کتنی ہے؟" }, { ur: "آپ سے مل کر خوشی ہوئی۔" }, { ur: "آپ کہاں رہتے ہیں؟" }], answer: 2 },
          { q: "What does this mean?", prompt: { en: "Sorry." }, listen: true, options: [{ ur: "جی ہاں" }, { ur: "معاف کیجیے" }, { ur: "شکریہ" }], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "w1-en-2",
    title: "The alphabet: A to M",
    titleUr: "انگریزی حروف: A سے M تک",
    minutes: 35,
    blocks: [
      { type: "cards", lang: "en", size: "xl", items: am },
      { type: "write", lang: "en", items: am.map((i) => i.en!), note: "Write each pair (capital and small) one full line in your notebook." },
      { type: "quiz", lang: "en", title: "First letter", questions: firstLetterQuiz(am, [[1, 3, 4], [6, 2, 9], [10, 7, 11], [5, 0, 12], [12, 11, 8]]) },
    ],
  },
  {
    id: "w1-en-3",
    title: "The alphabet: N to Z",
    titleUr: "انگریزی حروف: N سے Z تک",
    minutes: 35,
    blocks: [
      { type: "cards", lang: "en", size: "xl", items: nz },
      { type: "write", lang: "en", items: nz.map((i) => i.en!), note: "Write each pair one full line. Then write A to Z in one go." },
      {
        type: "reading",
        lang: "en",
        title: "Say the whole alphabet",
        lines: [{ en: "A B C D E F G", sayEn: "A, B, C, D, E, F, G" }, { en: "H I J K L M N", sayEn: "H, I, J, K, L, M, N" }, { en: "O P Q R S T U", sayEn: "O, P, Q, R, S, T, U" }, { en: "V W X Y Z", sayEn: "V, W, X, Y, Z" }],
      },
      { type: "quiz", lang: "en", title: "First letter", questions: firstLetterQuiz(nz, [[5, 2, 6], [4, 1, 12], [7, 9, 8], [3, 2, 0], [12, 11, 10]]) },
    ],
  },
  {
    id: "w1-en-4",
    title: "Vowels and first words",
    titleUr: "حروفِ علت اور پہلے الفاظ",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "Vowels and consonants",
        points: ["Five letters are vowels: a, e, i, o, u.", "All the other 21 letters are consonants.", "Most short words have a vowel in the middle: c-a-t, p-e-n, l-i-p, d-o-g, s-u-n."],
        lang: "en",
        examples: [{ en: "a", sayEn: "a, as in cat" }, { en: "e", sayEn: "e, as in pen" }, { en: "i", sayEn: "i, as in lip" }, { en: "o", sayEn: "o, as in dog" }, { en: "u", sayEn: "u, as in sun" }],
      },
      {
        type: "cards",
        lang: "en",
        size: "md",
        items: [
          { en: "cat", ur: "بلی", emoji: "🐈" },
          { en: "bat", ur: "بلا", emoji: "🏏" },
          { en: "hat", ur: "ٹوپی", emoji: "🎩" },
          { en: "pen", ur: "قلم", emoji: "🖊️" },
          { en: "hen", ur: "مرغی", emoji: "🐔" },
          { en: "ten", ur: "دس", emoji: "🔟" },
          { en: "lip", ur: "ہونٹ", emoji: "👄" },
          { en: "pin", ur: "پن", emoji: "📌" },
          { en: "dog", ur: "کتا", emoji: "🐕" },
          { en: "box", ur: "ڈبہ", emoji: "📦" },
          { en: "sun", ur: "سورج", emoji: "☀️" },
          { en: "bus", ur: "بس", emoji: "🚌" },
          { en: "cup", ur: "پیالی", emoji: "☕" },
          { en: "bed", ur: "بستر", emoji: "🛏️" },
        ],
      },
      {
        type: "reading",
        lang: "en",
        title: "Read these sentences",
        lines: [
          { en: "A cat.", ur: "ایک بلی۔" },
          { en: "A big cat.", ur: "ایک بڑی بلی۔" },
          { en: "The sun is hot.", ur: "سورج گرم ہے۔" },
          { en: "A pen and a cup.", ur: "ایک قلم اور ایک پیالی۔" },
          { en: "The dog is on the bed.", ur: "کتا بستر پر ہے۔" },
          { en: "I can see a red bus.", ur: "میں ایک لال بس دیکھ سکتا ہوں۔" },
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Listen and pick the picture",
        questions: [
          { q: "Which one?", prompt: { en: "hen" }, listen: true, options: [{ emoji: "🐔", en: "hen" }, { emoji: "🖊️", en: "pen" }, { emoji: "🔟", en: "ten" }], answer: 0 },
          { q: "Which one?", prompt: { en: "bus" }, listen: true, options: [{ emoji: "☀️", en: "sun" }, { emoji: "🚌", en: "bus" }, { emoji: "☕", en: "cup" }], answer: 1 },
          { q: "Which one?", prompt: { en: "box" }, listen: true, options: [{ emoji: "🐕", en: "dog" }, { emoji: "🛏️", en: "bed" }, { emoji: "📦", en: "box" }], answer: 2 },
          { q: "Which letter is a vowel?", options: [{ en: "b" }, { en: "o" }, { en: "t" }], answer: 1 },
          { q: "Which letter is a vowel?", options: [{ en: "e" }, { en: "m" }, { en: "s" }], answer: 0 },
        ],
      },
    ],
  },
  {
    id: "w1-en-5",
    title: "Numbers 1–20 and colours",
    titleUr: "گنتی ۱ سے ۲۰ اور رنگ",
    minutes: 40,
    blocks: [
      {
        type: "cards",
        title: "Numbers",
        lang: "en",
        size: "md",
        items: [
          ["one", "ایک"], ["two", "دو"], ["three", "تین"], ["four", "چار"], ["five", "پانچ"],
          ["six", "چھ"], ["seven", "سات"], ["eight", "آٹھ"], ["nine", "نو"], ["ten", "دس"],
          ["eleven", "گیارہ"], ["twelve", "بارہ"], ["thirteen", "تیرہ"], ["fourteen", "چودہ"], ["fifteen", "پندرہ"],
          ["sixteen", "سولہ"], ["seventeen", "سترہ"], ["eighteen", "اٹھارہ"], ["nineteen", "انیس"], ["twenty", "بیس"],
        ].map(([en, ur], i) => ({ en, ur, emoji: String(i + 1) })),
      },
      {
        type: "cards",
        title: "Colours",
        lang: "en",
        size: "md",
        items: [
          { en: "red", ur: "لال", emoji: "🟥" },
          { en: "blue", ur: "نیلا", emoji: "🟦" },
          { en: "green", ur: "سبز", emoji: "🟩" },
          { en: "yellow", ur: "پیلا", emoji: "🟨" },
          { en: "black", ur: "کالا", emoji: "⬛" },
          { en: "white", ur: "سفید", emoji: "⬜" },
          { en: "orange", ur: "نارنجی", emoji: "🟧" },
          { en: "pink", ur: "گلابی", emoji: "🩷" },
          { en: "brown", ur: "بھورا", emoji: "🟫" },
          { en: "purple", ur: "جامنی", emoji: "🟪" },
        ],
      },
      {
        type: "reading",
        lang: "en",
        lines: [
          { en: "The sky is blue.", ur: "آسمان نیلا ہے۔" },
          { en: "The grass is green.", ur: "گھاس سبز ہے۔" },
          { en: "I have two red apples.", ur: "میرے پاس دو لال سیب ہیں۔" },
          { en: "I am nineteen years old.", ur: "میری عمر انیس سال ہے۔" },
        ],
      },
      { type: "write", lang: "en", items: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], note: "Write the number words 1 to 10, three times each." },
      {
        type: "quiz",
        lang: "en",
        title: "Listen and choose",
        questions: [
          { q: "Which number?", prompt: { en: "twelve" }, listen: true, options: [{ en: "12" }, { en: "20" }, { en: "2" }], answer: 0 },
          { q: "Which number?", prompt: { en: "fifteen" }, listen: true, options: [{ en: "50" }, { en: "15" }, { en: "5" }], answer: 1 },
          { q: "Which number?", prompt: { en: "eighteen" }, listen: true, options: [{ en: "8" }, { en: "80" }, { en: "18" }], answer: 2 },
          { q: "Which colour?", prompt: { en: "green" }, listen: true, options: [{ emoji: "🟩", en: "green" }, { emoji: "🟥", en: "red" }, { emoji: "🟦", en: "blue" }], answer: 0 },
          { q: "Which colour?", prompt: { en: "yellow" }, listen: true, options: [{ emoji: "🟫", en: "brown" }, { emoji: "🟨", en: "yellow" }, { emoji: "🟧", en: "orange" }], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "w1-en-6",
    title: "My family and my things",
    titleUr: "میرا خاندان اور میری چیزیں",
    minutes: 40,
    blocks: [
      {
        type: "cards",
        title: "Family",
        lang: "en",
        size: "md",
        items: [
          { en: "father", ur: "ابو / والد", emoji: "👨" },
          { en: "mother", ur: "امی / والدہ", emoji: "👩" },
          { en: "brother", ur: "بھائی", emoji: "👦" },
          { en: "sister", ur: "بہن", emoji: "👧" },
          { en: "grandfather", ur: "دادا / نانا", emoji: "👴" },
          { en: "grandmother", ur: "دادی / نانی", emoji: "👵" },
          { en: "uncle", ur: "چچا / ماموں", emoji: "🧔" },
          { en: "aunt", ur: "خالہ / پھوپھی", emoji: "👩" },
        ],
      },
      {
        type: "cards",
        title: "Things",
        lang: "en",
        size: "md",
        items: [
          { en: "book", ur: "کتاب", emoji: "📕" },
          { en: "pencil", ur: "پنسل", emoji: "✏️" },
          { en: "bag", ur: "بستہ", emoji: "🎒" },
          { en: "chair", ur: "کرسی", emoji: "🪑" },
          { en: "door", ur: "دروازہ", emoji: "🚪" },
          { en: "window", ur: "کھڑکی", emoji: "🪟" },
          { en: "phone", ur: "فون", emoji: "📱" },
          { en: "house", ur: "گھر", emoji: "🏠" },
        ],
      },
      {
        type: "rule",
        title: "This is / That is",
        points: ["Use ‘This is’ for something near you (یہ).", "Use ‘That is’ for something far from you (وہ).", "Use ‘my’ for things that belong to you (میرا / میری)."],
        lang: "en",
        examples: [
          { en: "This is my father.", ur: "یہ میرے ابو ہیں۔" },
          { en: "This is my book.", ur: "یہ میری کتاب ہے۔" },
          { en: "That is a door.", ur: "وہ ایک دروازہ ہے۔" },
          { en: "That is my house.", ur: "وہ میرا گھر ہے۔" },
        ],
      },
      {
        type: "quiz",
        lang: "en",
        title: "Choose the right meaning",
        questions: [
          { q: "This is my sister.", prompt: { en: "This is my sister." }, options: [{ ur: "یہ میری بہن ہے۔" }, { ur: "یہ میرا بھائی ہے۔" }, { ur: "وہ میری امی ہیں۔" }], answer: 0 },
          { q: "That is a window.", prompt: { en: "That is a window." }, options: [{ ur: "یہ ایک دروازہ ہے۔" }, { ur: "وہ ایک کھڑکی ہے۔" }, { ur: "وہ ایک کرسی ہے۔" }], answer: 1 },
          { q: "Which word means بستہ?", options: [{ en: "book" }, { en: "bed" }, { en: "bag" }], answer: 2 },
          { q: "Which word means دادی / نانی?", options: [{ en: "grandmother" }, { en: "mother" }, { en: "aunt" }], answer: 0 },
        ],
      },
    ],
  },
];
