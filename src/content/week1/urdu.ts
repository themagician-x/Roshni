import type { Item, Lesson } from "@/lib/types";

type DraftLesson = Omit<Lesson, "day">;

const L = (ur: string, say: string, roman: string, word: Item): Item => ({ ur, say, roman, word });

const letters1: Item[] = [
  L("ا", "الف", "alif", { ur: "انگور", en: "grapes", emoji: "🍇" }),
  L("آ", "الف مد", "alif madd", { ur: "آم", en: "mango", emoji: "🥭" }),
  L("ب", "بے", "bay", { ur: "بکری", en: "goat", emoji: "🐐" }),
  L("پ", "پے", "pay", { ur: "پتنگ", en: "kite", emoji: "🪁" }),
  L("ت", "تے", "tay", { ur: "تتلی", en: "butterfly", emoji: "🦋" }),
  L("ٹ", "ٹے", "ṭay", { ur: "ٹماٹر", en: "tomato", emoji: "🍅" }),
  L("ث", "ثے", "say", { ur: "ثانیہ", en: "a second (of time)", emoji: "⏱️" }),
];

const letters2: Item[] = [
  L("ج", "جیم", "jeem", { ur: "جہاز", en: "aeroplane", emoji: "✈️" }),
  L("چ", "چے", "chay", { ur: "چاند", en: "moon", emoji: "🌙" }),
  L("ح", "بڑی حے", "baṛi hay", { ur: "حلوہ", en: "halwa (sweet)", emoji: "🍮" }),
  L("خ", "خے", "khay", { ur: "خرگوش", en: "rabbit", emoji: "🐇" }),
  L("د", "دال", "daal", { ur: "دروازہ", en: "door", emoji: "🚪" }),
  L("ڈ", "ڈال", "ḍaal", { ur: "ڈبہ", en: "box", emoji: "📦" }),
  L("ذ", "ذال", "zaal", { ur: "ذائقہ", en: "taste", emoji: "👅" }),
];

const letters3: Item[] = [
  L("ر", "رے", "ray", { ur: "رسی", en: "rope", emoji: "🪢" }),
  L("ڑ", "ڑے", "ṛay", { ur: "پہاڑ", en: "mountain", emoji: "⛰️", note: "ڑ سے کوئی لفظ شروع نہیں ہوتا" }),
  L("ز", "زے", "zay", { ur: "زرافہ", en: "giraffe", emoji: "🦒" }),
  L("ژ", "ژے", "zhay", { ur: "ژالہ", en: "hail (ice rain)", emoji: "🌨️" }),
  L("س", "سین", "seen", { ur: "سیب", en: "apple", emoji: "🍎" }),
  L("ش", "شین", "sheen", { ur: "شیر", en: "lion", emoji: "🦁" }),
  L("ص", "صاد", "swaad", { ur: "صابن", en: "soap", emoji: "🧼" }),
  L("ض", "ضاد", "zwaad", { ur: "ضرب", en: "multiplication", emoji: "✖️" }),
];

const letters4: Item[] = [
  L("ط", "طوئے", "toay", { ur: "طوطا", en: "parrot", emoji: "🦜" }),
  L("ظ", "ظوئے", "zoay", { ur: "ظرف", en: "pot, vessel", emoji: "🏺" }),
  L("ع", "عین", "ain", { ur: "عینک", en: "glasses", emoji: "👓" }),
  L("غ", "غین", "ghain", { ur: "غبارہ", en: "balloon", emoji: "🎈" }),
  L("ف", "فے", "fay", { ur: "فوارہ", en: "fountain", emoji: "⛲" }),
  L("ق", "قاف", "qaaf", { ur: "قلم", en: "pen", emoji: "🖊️" }),
  L("ک", "کاف", "kaaf", { ur: "کتاب", en: "book", emoji: "📕" }),
  L("گ", "گاف", "gaaf", { ur: "گھڑی", en: "watch, clock", emoji: "⌚" }),
];

const letters5: Item[] = [
  L("ل", "لام", "laam", { ur: "لڑکا", en: "boy", emoji: "👦" }),
  L("م", "میم", "meem", { ur: "مچھلی", en: "fish", emoji: "🐟" }),
  L("ن", "نون", "noon", { ur: "ناک", en: "nose", emoji: "👃" }),
  L("ں", "نون غنہ", "noon ghunna", { ur: "ماں", en: "mother", emoji: "👩", note: "ناک کی آواز، صرف لفظ کے آخر میں" }),
  L("و", "واؤ", "wao", { ur: "وقت", en: "time", emoji: "⏰" }),
  L("ہ", "چھوٹی ہے", "choṭi hay", { ur: "ہاتھی", en: "elephant", emoji: "🐘" }),
  L("ھ", "دو چشمی ہے", "do chashmi hay", { ur: "گھر", en: "house", emoji: "🏠", note: "حروف کے ساتھ ملتی ہے: بھ، پھ، گھ" }),
  L("ء", "ہمزہ", "hamza", { ur: "گائے", en: "cow", emoji: "🐄" }),
  L("ی", "چھوٹی یے", "choṭi yay", { ur: "یخ", en: "ice cold", emoji: "🧊" }),
  L("ے", "بڑی یے", "baṛi yay", { ur: "انڈے", en: "eggs", emoji: "🥚", note: "صرف لفظ کے آخر میں" }),
];

const letterQuiz = (items: Item[], picks: number[][]) =>
  picks.map(([ans, ...others]) => {
    const opts = [ans, ...others].map((i) => ({ ur: items[i].ur, say: items[i].say }));
    const order = [...opts].sort((a, b) => a.ur!.localeCompare(b.ur!));
    return {
      q: "سنیں۔ یہ کون سا حرف ہے؟",
      prompt: { ur: items[ans].ur, say: items[ans].say },
      listen: true,
      options: order,
      answer: order.findIndex((o) => o.ur === items[ans].ur),
    };
  });

const wordQuiz = (items: Item[], picks: number[][]) =>
  picks.map(([ans, ...others]) => {
    const opts = [ans, ...others].map((i) => ({ ...items[i].word!, ur: items[i].word!.ur }));
    const order = [...opts].sort((a, b) => a.en!.localeCompare(b.en!));
    return {
      q: "لفظ سنیں اور اس کی تصویر چنیں۔",
      prompt: { ur: items[ans].word!.ur },
      listen: true,
      options: order.map((o) => ({ emoji: o.emoji })),
      answer: order.findIndex((o) => o.ur === items[ans].word!.ur),
    };
  });

export const urdu: DraftLesson[] = [
  {
    id: "w1-ur-1",
    title: "Speaking 1: Greetings and introducing yourself",
    titleUr: "بول چال ۱: سلام اور تعارف",
    minutes: 40,
    blocks: [
      {
        type: "phrases",
        title: "یہ جملے روز بولیں",
        lang: "ur",
        items: [
          { ur: "السلام علیکم", roman: "Assalam-o-alaikum", en: "Peace be upon you (hello)" },
          { ur: "وعلیکم السلام", roman: "Wa-alaikum-assalam", en: "And peace be upon you (reply)" },
          { ur: "آپ کیسے ہیں؟", roman: "Aap kaise hain?", en: "How are you?" },
          { ur: "میں ٹھیک ہوں، شکریہ۔", roman: "Main theek hoon, shukriya.", en: "I am fine, thank you." },
          { ur: "آپ کا نام کیا ہے؟", roman: "Aap ka naam kya hai?", en: "What is your name?" },
          { ur: "میرا نام علی ہے۔", roman: "Mera naam Ali hai.", en: "My name is Ali." },
          { ur: "آپ کی عمر کتنی ہے؟", roman: "Aap ki umar kitni hai?", en: "How old are you?" },
          { ur: "میری عمر انیس سال ہے۔", roman: "Meri umar unees saal hai.", en: "I am nineteen years old." },
          { ur: "آپ کہاں رہتے ہیں؟", roman: "Aap kahan rehte hain?", en: "Where do you live?" },
          { ur: "میں پاکستان میں رہتا ہوں۔", roman: "Main Pakistan mein rehta hoon.", en: "I live in Pakistan." },
          { ur: "آپ سے مل کر خوشی ہوئی۔", roman: "Aap se mil kar khushi hui.", en: "Nice to meet you." },
          { ur: "خدا حافظ", roman: "Khuda hafiz", en: "Goodbye" },
        ],
      },
      {
        type: "phrases",
        title: "چھوٹے مگر ضروری الفاظ",
        lang: "ur",
        items: [
          { ur: "جی ہاں", roman: "Ji haan", en: "Yes" },
          { ur: "جی نہیں", roman: "Ji nahin", en: "No" },
          { ur: "شکریہ", roman: "Shukriya", en: "Thank you" },
          { ur: "مہربانی", roman: "Meharbani", en: "Kindness / please" },
          { ur: "معاف کیجیے", roman: "Maaf kijiye", en: "Sorry / excuse me" },
          { ur: "دوبارہ بولیں", roman: "Dobara bolein", en: "Please say it again" },
          { ur: "مجھے سمجھ نہیں آئی", roman: "Mujhe samajh nahin aayi", en: "I did not understand" },
        ],
      },
      {
        type: "reading",
        title: "بات چیت سنیں",
        lang: "ur",
        lines: [
          { ur: "استاد: السلام علیکم!", say: "السلام علیکم!" },
          { ur: "علی: وعلیکم السلام!", say: "وعلیکم السلام!" },
          { ur: "استاد: آپ کا نام کیا ہے؟", say: "آپ کا نام کیا ہے؟" },
          { ur: "علی: میرا نام علی ہے۔", say: "میرا نام علی ہے۔" },
          { ur: "استاد: آپ کی عمر کتنی ہے؟", say: "آپ کی عمر کتنی ہے؟" },
          { ur: "علی: میری عمر انیس سال ہے۔", say: "میری عمر انیس سال ہے۔" },
          { ur: "استاد: آپ سے مل کر خوشی ہوئی۔", say: "آپ سے مل کر خوشی ہوئی۔" },
          { ur: "علی: شکریہ۔ خدا حافظ!", say: "شکریہ۔ خدا حافظ!" },
        ],
      },
      {
        type: "quiz",
        title: "سنیں اور صحیح جملہ چنیں",
        lang: "ur",
        questions: [
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "آپ کا نام کیا ہے؟" }, listen: true, options: [{ ur: "آپ کیسے ہیں؟" }, { ur: "آپ کا نام کیا ہے؟" }, { ur: "آپ کہاں رہتے ہیں؟" }], answer: 1 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "شکریہ" }, listen: true, options: [{ ur: "شکریہ" }, { ur: "خدا حافظ" }, { ur: "معاف کیجیے" }], answer: 0 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "آپ کہاں رہتے ہیں؟" }, listen: true, options: [{ ur: "آپ کی عمر کتنی ہے؟" }, { ur: "آپ سے مل کر خوشی ہوئی۔" }, { ur: "آپ کہاں رہتے ہیں؟" }], answer: 2 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "خدا حافظ" }, listen: true, options: [{ ur: "السلام علیکم" }, { ur: "خدا حافظ" }, { ur: "جی ہاں" }], answer: 1 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "مجھے سمجھ نہیں آئی" }, listen: true, options: [{ ur: "مجھے سمجھ نہیں آئی" }, { ur: "میں ٹھیک ہوں، شکریہ۔" }, { ur: "دوبارہ بولیں" }], answer: 0 },
        ],
      },
    ],
  },
  {
    id: "w1-ur-2",
    title: "Letters ا to ث",
    titleUr: "حروف: ا سے ث تک",
    minutes: 40,
    blocks: [
      { type: "cards", lang: "ur", size: "xl", items: letters1 },
      {
        type: "rule",
        title: "نقطوں پر غور کریں",
        points: [
          "ب پ ت ٹ ث کی شکل ایک جیسی ہے۔ صرف نقطے بدلتے ہیں۔",
          "ب کے نیچے ایک نقطہ ہے۔ پ کے نیچے تین نقطے ہیں۔",
          "ت کے اوپر دو نقطے ہیں۔ ث کے اوپر تین نقطے ہیں۔ ٹ کے اوپر چھوٹا سا ط ہے۔",
        ],
        lang: "ur",
        examples: [{ ur: "ب" , say: "بے"}, { ur: "پ", say: "پے" }, { ur: "ت", say: "تے" }, { ur: "ٹ", say: "ٹے" }, { ur: "ث", say: "ثے" }],
      },
      { type: "write", lang: "ur", items: ["ا", "آ", "ب", "پ", "ت", "ٹ", "ث"], note: "ہر حرف اپنی کاپی میں دس بار لکھیں۔ صفحے کے دائیں طرف سے شروع کریں۔" },
      { type: "quiz", title: "سنیں اور چنیں", lang: "ur", questions: letterQuiz(letters1, [[2, 3, 4], [5, 4, 6], [1, 0, 2], [6, 4, 3], [3, 2, 5]]) },
      { type: "quiz", title: "سنیں اور تصویر چنیں", lang: "ur", questions: wordQuiz(letters1, [[2, 3, 5], [1, 4, 0], [4, 2, 3]]) },
    ],
  },
  {
    id: "w1-ur-3",
    title: "Letters ج to ذ",
    titleUr: "حروف: ج سے ذ تک",
    minutes: 40,
    blocks: [
      { type: "cards", lang: "ur", size: "xl", items: letters2 },
      {
        type: "rule",
        title: "ایک شکل، الگ نقطے",
        points: ["ج کے اندر ایک نقطہ ہے۔ چ کے اندر تین نقطے ہیں۔ ح میں کوئی نقطہ نہیں۔ خ کے اوپر ایک نقطہ ہے۔", "د میں کوئی نقطہ نہیں۔ ذ کے اوپر ایک نقطہ ہے۔ ڈ کے اوپر چھوٹا سا ط ہے۔"],
        lang: "ur",
        examples: [{ ur: "ج", say: "جیم" }, { ur: "چ", say: "چے" }, { ur: "ح", say: "بڑی حے" }, { ur: "خ", say: "خے" }, { ur: "د", say: "دال" }, { ur: "ڈ", say: "ڈال" }, { ur: "ذ", say: "ذال" }],
      },
      { type: "write", lang: "ur", items: ["ج", "چ", "ح", "خ", "د", "ڈ", "ذ"], note: "ہر حرف دس بار لکھیں۔" },
      { type: "quiz", title: "سنیں اور چنیں", lang: "ur", questions: letterQuiz(letters2, [[1, 0, 2], [3, 2, 0], [6, 4, 5], [5, 4, 6], [0, 1, 3]]) },
      { type: "quiz", title: "سنیں اور تصویر چنیں", lang: "ur", questions: wordQuiz(letters2, [[1, 0, 3], [3, 4, 5], [4, 1, 5]]) },
    ],
  },
  {
    id: "w1-ur-4",
    title: "Speaking 2: My family and counting",
    titleUr: "بول چال ۲: میرا خاندان اور گنتی",
    minutes: 40,
    blocks: [
      {
        type: "cards",
        title: "خاندان",
        lang: "ur",
        size: "md",
        items: [
          { ur: "ابو", roman: "abbu", en: "father", emoji: "👨" },
          { ur: "امی", roman: "ammi", en: "mother", emoji: "👩" },
          { ur: "بھائی", roman: "bhai", en: "brother", emoji: "👦" },
          { ur: "بہن", roman: "behan", en: "sister", emoji: "👧" },
          { ur: "دادا", roman: "dada", en: "grandfather (father's father)", emoji: "👴" },
          { ur: "دادی", roman: "dadi", en: "grandmother (father's mother)", emoji: "👵" },
          { ur: "نانا", roman: "nana", en: "grandfather (mother's father)", emoji: "👴" },
          { ur: "نانی", roman: "nani", en: "grandmother (mother's mother)", emoji: "👵" },
          { ur: "چچا", roman: "chacha", en: "uncle (father's brother)", emoji: "🧔" },
          { ur: "ماموں", roman: "mamoon", en: "uncle (mother's brother)", emoji: "🧔" },
          { ur: "خالہ", roman: "khala", en: "aunt (mother's sister)", emoji: "👩" },
          { ur: "پھوپھی", roman: "phuphi", en: "aunt (father's sister)", emoji: "👩" },
        ],
      },
      {
        type: "phrases",
        title: "اپنے خاندان کے بارے میں بولیں",
        lang: "ur",
        items: [
          { ur: "یہ میرے ابو ہیں۔", roman: "Yeh mere abbu hain.", en: "This is my father." },
          { ur: "یہ میری امی ہیں۔", roman: "Yeh meri ammi hain.", en: "This is my mother." },
          { ur: "میرے دو بھائی ہیں۔", roman: "Mere do bhai hain.", en: "I have two brothers." },
          { ur: "میری ایک بہن ہے۔", roman: "Meri aik behan hai.", en: "I have one sister." },
          { ur: "ہمارے گھر میں سات لوگ ہیں۔", roman: "Hamare ghar mein saat log hain.", en: "There are seven people in our house." },
          { ur: "میں سب سے بڑا ہوں۔", roman: "Main sab se baṛa hoon.", en: "I am the eldest." },
        ],
      },
      {
        type: "cards",
        title: "گنتی ایک سے دس تک",
        lang: "ur",
        size: "md",
        items: [
          { ur: "ایک", roman: "aik", en: "one", emoji: "۱" },
          { ur: "دو", roman: "do", en: "two", emoji: "۲" },
          { ur: "تین", roman: "teen", en: "three", emoji: "۳" },
          { ur: "چار", roman: "chaar", en: "four", emoji: "۴" },
          { ur: "پانچ", roman: "paanch", en: "five", emoji: "۵" },
          { ur: "چھ", roman: "chhe", en: "six", emoji: "۶" },
          { ur: "سات", roman: "saat", en: "seven", emoji: "۷" },
          { ur: "آٹھ", roman: "aaṭh", en: "eight", emoji: "۸" },
          { ur: "نو", roman: "nau", en: "nine", emoji: "۹" },
          { ur: "دس", roman: "das", en: "ten", emoji: "۱۰" },
        ],
      },
      {
        type: "quiz",
        title: "سنیں اور چنیں",
        lang: "ur",
        questions: [
          { q: "یہ کون ہے؟", prompt: { ur: "امی" }, listen: true, options: [{ ur: "ابو", emoji: "👨" }, { ur: "امی", emoji: "👩" }, { ur: "بہن", emoji: "👧" }], answer: 1 },
          { q: "یہ کون ہے؟", prompt: { ur: "ماموں" }, listen: true, options: [{ ur: "ماموں" }, { ur: "چچا" }, { ur: "دادا" }], answer: 0 },
          { q: "کون سا عدد ہے؟", prompt: { ur: "سات" }, listen: true, options: [{ en: "۶" }, { en: "۷" }, { en: "۸" }], answer: 1 },
          { q: "کون سا عدد ہے؟", prompt: { ur: "چار" }, listen: true, options: [{ en: "۴" }, { en: "۵" }, { en: "۹" }], answer: 0 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "میری ایک بہن ہے۔" }, listen: true, options: [{ ur: "میرا ایک بھائی ہے۔" }, { ur: "میری ایک بہن ہے۔" }, { ur: "یہ میری امی ہیں۔" }], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "w1-ur-5",
    title: "Letters ر to ض",
    titleUr: "حروف: ر سے ض تک",
    minutes: 40,
    blocks: [
      { type: "cards", lang: "ur", size: "xl", items: letters3 },
      {
        type: "rule",
        title: "شکلیں اور نقطے",
        points: ["ر ڑ ز ژ کی ایک ہی شکل ہے۔ ز پر ایک نقطہ، ژ پر تین نقطے اور ڑ پر چھوٹا سا ط ہے۔", "س میں کوئی نقطہ نہیں، ش پر تین نقطے ہیں۔", "ص میں کوئی نقطہ نہیں، ض پر ایک نقطہ ہے۔"],
        lang: "ur",
        examples: [{ ur: "ر", say: "رے" }, { ur: "ز", say: "زے" }, { ur: "س", say: "سین" }, { ur: "ش", say: "شین" }, { ur: "ص", say: "صاد" }, { ur: "ض", say: "ضاد" }],
      },
      { type: "write", lang: "ur", items: ["ر", "ڑ", "ز", "ژ", "س", "ش", "ص", "ض"], note: "ہر حرف دس بار لکھیں۔" },
      { type: "quiz", title: "سنیں اور چنیں", lang: "ur", questions: letterQuiz(letters3, [[5, 4, 6], [1, 0, 2], [7, 6, 2], [3, 2, 1], [4, 5, 0]]) },
      { type: "quiz", title: "سنیں اور تصویر چنیں", lang: "ur", questions: wordQuiz(letters3, [[5, 2, 4], [6, 1, 7], [4, 6, 0]]) },
    ],
  },
  {
    id: "w1-ur-6",
    title: "Letters ط to گ",
    titleUr: "حروف: ط سے گ تک",
    minutes: 40,
    blocks: [
      { type: "cards", lang: "ur", size: "xl", items: letters4 },
      {
        type: "rule",
        title: "جوڑے",
        points: ["ط میں کوئی نقطہ نہیں، ظ پر ایک نقطہ ہے۔", "ع میں کوئی نقطہ نہیں، غ پر ایک نقطہ ہے۔", "ف پر ایک نقطہ ہے، ق پر دو نقطے ہیں۔", "گ دراصل ک ہے جس کے اوپر ایک لکیر زیادہ ہے۔"],
        lang: "ur",
        examples: [{ ur: "ط", say: "طوئے" }, { ur: "ظ", say: "ظوئے" }, { ur: "ع", say: "عین" }, { ur: "غ", say: "غین" }, { ur: "ف", say: "فے" }, { ur: "ق", say: "قاف" }, { ur: "ک", say: "کاف" }, { ur: "گ", say: "گاف" }],
      },
      { type: "write", lang: "ur", items: ["ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ"], note: "ہر حرف دس بار لکھیں۔" },
      { type: "quiz", title: "سنیں اور چنیں", lang: "ur", questions: letterQuiz(letters4, [[3, 2, 4], [5, 4, 6], [7, 6, 5], [1, 0, 3], [2, 3, 0]]) },
      { type: "quiz", title: "سنیں اور تصویر چنیں", lang: "ur", questions: wordQuiz(letters4, [[0, 3, 6], [5, 6, 7], [3, 2, 4]]) },
    ],
  },
  {
    id: "w1-ur-7",
    title: "Speaking 3: Things around you",
    titleUr: "بول چال ۳: آس پاس کی چیزیں",
    minutes: 40,
    blocks: [
      {
        type: "cards",
        title: "روزمرہ کی چیزیں",
        lang: "ur",
        size: "md",
        items: [
          { ur: "پانی", roman: "paani", en: "water", emoji: "💧" },
          { ur: "روٹی", roman: "roṭi", en: "bread (roti)", emoji: "🫓" },
          { ur: "چائے", roman: "chaaye", en: "tea", emoji: "🍵" },
          { ur: "دودھ", roman: "doodh", en: "milk", emoji: "🥛" },
          { ur: "چاول", roman: "chaawal", en: "rice", emoji: "🍚" },
          { ur: "کرسی", roman: "kursi", en: "chair", emoji: "🪑" },
          { ur: "بستر", roman: "bistar", en: "bed", emoji: "🛏️" },
          { ur: "کھڑکی", roman: "khiṛki", en: "window", emoji: "🪟" },
          { ur: "پنکھا", roman: "pankha", en: "fan", emoji: "🌀" },
          { ur: "موبائل", roman: "mobile", en: "mobile phone", emoji: "📱" },
          { ur: "پیسے", roman: "paise", en: "money", emoji: "💵" },
          { ur: "بازار", roman: "bazaar", en: "market", emoji: "🏪" },
        ],
      },
      {
        type: "phrases",
        title: "کام کے جملے",
        lang: "ur",
        items: [
          { ur: "یہ کیا ہے؟", roman: "Yeh kya hai?", en: "What is this?" },
          { ur: "یہ پانی ہے۔", roman: "Yeh paani hai.", en: "This is water." },
          { ur: "مجھے پانی چاہیے۔", roman: "Mujhe paani chahiye.", en: "I need water." },
          { ur: "مجھے بھوک لگی ہے۔", roman: "Mujhe bhook lagi hai.", en: "I am hungry." },
          { ur: "مجھے پیاس لگی ہے۔", roman: "Mujhe pyaas lagi hai.", en: "I am thirsty." },
          { ur: "میں بازار جا رہا ہوں۔", roman: "Main bazaar ja raha hoon.", en: "I am going to the market." },
          { ur: "یہ کتنے کا ہے؟", roman: "Yeh kitne ka hai?", en: "How much is this?" },
          { ur: "یہ سو روپے کا ہے۔", roman: "Yeh sau rupay ka hai.", en: "This is one hundred rupees." },
          { ur: "یہ بہت مہنگا ہے۔", roman: "Yeh bohat mehnga hai.", en: "This is very expensive." },
          { ur: "ٹھیک ہے۔", roman: "Theek hai.", en: "OK." },
        ],
      },
      {
        type: "quiz",
        title: "سنیں اور تصویر چنیں",
        lang: "ur",
        questions: [
          { q: "کون سی چیز ہے؟", prompt: { ur: "دودھ" }, listen: true, options: [{ emoji: "🍵" }, { emoji: "🥛" }, { emoji: "💧" }], answer: 1 },
          { q: "کون سی چیز ہے؟", prompt: { ur: "کھڑکی" }, listen: true, options: [{ emoji: "🪟" }, { emoji: "🪑" }, { emoji: "🛏️" }], answer: 0 },
          { q: "کون سی چیز ہے؟", prompt: { ur: "چاول" }, listen: true, options: [{ emoji: "🫓" }, { emoji: "💵" }, { emoji: "🍚" }], answer: 2 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "مجھے بھوک لگی ہے۔" }, listen: true, options: [{ ur: "مجھے پیاس لگی ہے۔" }, { ur: "مجھے بھوک لگی ہے۔" }, { ur: "مجھے پانی چاہیے۔" }], answer: 1 },
          { q: "سنیں اور صحیح جملہ چنیں۔", prompt: { ur: "یہ کتنے کا ہے؟" }, listen: true, options: [{ ur: "یہ کیا ہے؟" }, { ur: "یہ کتنے کا ہے؟" }, { ur: "یہ بہت مہنگا ہے۔" }], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "w1-ur-8",
    title: "Letters ل to ے",
    titleUr: "حروف: ل سے ے تک",
    minutes: 45,
    blocks: [
      { type: "cards", lang: "ur", size: "xl", items: letters5 },
      {
        type: "rule",
        title: "خاص حروف",
        points: [
          "ں (نون غنہ) ناک سے نکلنے والی آواز ہے، جیسے ماں میں۔ اس پر نقطہ نہیں ہوتا۔",
          "ھ (دو چشمی ہے) دوسرے حروف کے ساتھ مل کر بھ، پھ، تھ، چھ، کھ، گھ جیسی آوازیں بناتی ہے۔",
          "ی (چھوٹی یے) اور ے (بڑی یے): ے ہمیشہ لفظ کے آخر میں آتی ہے۔",
        ],
        lang: "ur",
        examples: [{ ur: "ماں" }, { ur: "بھائی" }, { ur: "کھانا" }, { ur: "گھر" }, { ur: "انڈے" }],
      },
      { type: "write", lang: "ur", items: ["ل", "م", "ن", "ں", "و", "ہ", "ھ", "ء", "ی", "ے"], note: "ہر حرف دس بار لکھیں۔" },
      { type: "quiz", title: "سنیں اور چنیں", lang: "ur", questions: letterQuiz(letters5, [[1, 0, 2], [5, 6, 4], [9, 8, 7], [2, 3, 1], [7, 4, 8]]) },
      { type: "quiz", title: "سنیں اور تصویر چنیں", lang: "ur", questions: wordQuiz(letters5, [[5, 1, 9], [6, 4, 2], [7, 0, 3]]) },
    ],
  },
  {
    id: "w1-ur-9",
    title: "Full alphabet review",
    titleUr: "حروفِ تہجی: دہرائی",
    minutes: 45,
    blocks: [
      { type: "cards", lang: "ur", size: "lg", items: [...letters1, ...letters2, ...letters3, ...letters4, ...letters5].map(({ ur, say, roman }) => ({ ur, say, roman })) },
      {
        type: "rule",
        title: "الگ حروف، ایک آواز",
        points: [
          "س، ص، ث — تینوں کی آواز «س» ہے۔",
          "ز، ذ، ض، ظ — چاروں کی آواز «ز» ہے۔",
          "ت، ط — دونوں کی آواز «ت» ہے۔",
          "ح، ہ — دونوں کی آواز «ہ» ہے۔",
          "کس لفظ میں کون سا حرف آتا ہے، یہ بار بار پڑھنے اور لکھنے سے یاد ہوتا ہے۔",
        ],
        lang: "ur",
        examples: [{ ur: "سیب" }, { ur: "صابن" }, { ur: "ثانیہ" }, { ur: "زرافہ" }, { ur: "ذائقہ" }, { ur: "تتلی" }, { ur: "طوطا" }],
      },
      { type: "write", lang: "ur", items: ["ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ہ ء ی ے"], note: "پوری حروفِ تہجی ترتیب سے تین بار لکھیں۔" },
      {
        type: "quiz",
        title: "ملا جلا سننے کا امتحان",
        lang: "ur",
        questions: [
          ...letterQuiz(letters2, [[4, 5, 6]]),
          ...letterQuiz(letters3, [[6, 4, 7]]),
          ...letterQuiz(letters4, [[6, 7, 5]]),
          ...letterQuiz(letters5, [[3, 2, 0]]),
          ...letterQuiz(letters1, [[6, 5, 3]]),
          ...wordQuiz(letters4, [[2, 3, 1]]),
          ...wordQuiz(letters5, [[1, 2, 7]]),
        ],
      },
    ],
  },
];
