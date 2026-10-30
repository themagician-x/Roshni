/**
 * Weeks 14–17: exam practice. One 4-hour test a day (Urdu, English and Math papers), drawn from Weeks 1–12.
 * Questions are picked with a fixed seed, so a test never changes between runs, and no question repeats
 * until its week's pool is used up. Later weeks weigh more than the basic ones.
 */
import type { Block, Lesson, QuizQuestion, Subject, WeekContent } from "@/lib/types";
import { week1 } from "./week1";
import { week2 } from "./week2";
import { week3 } from "./week3";
import { week4 } from "./week4";
import { week5 } from "./week5";
import { week6 } from "./week6";
import { week7 } from "./week7";
import { week8 } from "./week8";
import { week9 } from "./week9";
import { week10 } from "./week10";
import { week11 } from "./week11";
import { week12 } from "./week12";
import { week13 } from "./week13";
import { SETS, gapQ, swapAlikes, toUrduQ, translateQ, urChangeQ, urPickQ } from "./tenses";

const SOURCE = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13];
/** How many questions a week gives per test, relative to the others: basic 1, intermediate 2, advanced 3. */
const WEIGHT = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];

export const EXAM_WEEKS = [14, 15, 16, 17];
export const EXAM_DAYS = 7;

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(xs: T[], rand: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Hands out items in a fixed shuffled order, starting again when the list runs out. */
function queue<T>(xs: T[], seed: number) {
  const order = shuffled(xs, rng(seed));
  let i = 0;
  return (n: number) => Array.from({ length: Math.min(n, order.length) }, () => order[i++ % order.length]);
}

const hasReading = (l: Lesson) => l.blocks.some((b) => b.type === "reading");

/** Tables holding data that the next quiz asks about (a price list, a graph, a salary chart…). */
const DATA_TABLE = /price list|graph|data|salary|sold|temperature/i;
/** Context kept in a quiz title, e.g. "Practice (data: 4, 7, 7, 9, 13)" or "(use π = 22/7)". */
const TITLE_CONTEXT = /\((data:[^)]*|use π[^)]*)\)/;

/** Questions that make sense without their lesson's passage or data table. */
function standalone(lessons: Lesson[]): QuizQuestion[] {
  return lessons.flatMap((l) =>
    l.blocks.flatMap((b, i) => {
      if (b.type !== "quiz") return [];
      const before = l.blocks.slice(0, i).reverse().find((x) => x.type !== "drill" && x.type !== "write");
      if (before?.type === "table" && DATA_TABLE.test(before.title ?? "")) return [];
      const context = b.title?.match(TITLE_CONTEXT)?.[1];
      // The data goes only to questions that have no numbers of their own ("Median =").
      const needs = (q: string) => context && (context.startsWith("use π") ? !q.includes("π") : !/\d/.test(q));
      return b.questions.filter((q) => q.prompt || !hasReading(l)).map((q) => (q.q && needs(q.q) ? { ...q, q: `${q.q} (${context})` } : q));
    }),
  );
}

/** "What does X mean?" questions from the word tables (Urdu) and word cards (English). */
function vocab(lessons: Lesson[], subject: Subject, seed: number): QuizQuestion[] {
  const pairs: [string, string][] = [];
  for (const l of lessons)
    for (const b of l.blocks) {
      if (subject === "urdu" && b.type === "table" && b.headers[0] === "لفظ" && b.headers[1] === "معنی" && b.headers.length === 2)
        for (const [w, m] of b.rows) pairs.push([String(w), String(m)]);
      if (subject === "english" && b.type === "cards" && b.lang === "en")
        for (const it of b.items) if (it.en && it.ur && !it.en.includes(" ")) pairs.push([it.en, it.ur]);
    }
  const seen = new Set<string>();
  const uniq = pairs.filter(([w]) => !seen.has(w) && seen.add(w));
  const rand = rng(seed);
  return uniq.map(([w, m], i) => {
    const others = shuffled(uniq.filter((p, j) => j !== i && p[1] !== m), rand).slice(0, 2).map((p) => p[1]);
    const options = [m, ...others].sort((a, b) => a.localeCompare(b));
    return subject === "urdu"
      ? { q: `«${w}» کا مطلب کیا ہے؟`, options: options.map((ur) => ({ ur })), answer: options.indexOf(m) }
      : { q: "What does this word mean?", prompt: { en: w }, options: options.map((ur) => ({ ur })), answer: options.indexOf(m) };
  });
}

/** A passage and the questions on it. */
type Passage = { reading: Block; quiz: Block };
function passages(lessons: Lesson[], lang: "ur" | "en"): Passage[] {
  return lessons.flatMap((l) => {
    const i = l.blocks.findIndex((b) => b.type === "reading" && b.lang === lang && b.lines.length >= 6);
    const quiz = l.blocks.slice(i + 1).find((b) => b.type === "quiz");
    return i >= 0 && quiz ? [{ reading: l.blocks[i], quiz }] : [];
  });
}

type Drill = Extract<Block, { type: "drill" }>;
const drills = (lessons: Lesson[]) => lessons.flatMap((l) => l.blocks.filter((b): b is Drill => b.type === "drill"));

/**
 * Per-week question queues for one subject. `take(n)` gives each week a share by weight × pool size,
 * so small pools are not repeated more often than big ones, and never repeats a question inside one test.
 */
function weighted(subject: Subject, seed: number) {
  const pools = SOURCE.map((wk) => standalone(wk[subject]));
  const queues = pools.map((p, w) => queue(p, seed + w));
  const share = pools.map((p, w) => p.length * WEIGHT[w]);
  const total = share.reduce((s, x) => s + x, 0);
  let carry = share.map(() => 0);
  return (n: number) => {
    const out: QuizQuestion[] = [];
    const seen = new Set<QuizQuestion>();
    // Fractional shares carry over to the next test, so every week gets its due over the four weeks.
    carry = carry.map((c, w) => c + (n * share[w]) / total);
    const order = carry.map((_, w) => w).sort((x, y) => carry[y] - carry[x]);
    for (const w of order) {
      let k = Math.min(Math.floor(carry[w] + 0.5), n - out.length, pools[w].length);
      carry[w] -= k;
      while (k-- > 0) {
        const q = queues[w](1)[0];
        if (!seen.has(q)) seen.add(q) && out.push(q);
      }
    }
    // Rounding can leave a few short: top up from the biggest shares.
    for (let i = 0; out.length < n && i < n * 4; i++) {
      const w = order[i % order.length];
      const q = queues[w](1)[0];
      if (q && !seen.has(q)) seen.add(q) && out.push(q) && (carry[w] -= 1);
    }
    return out;
  };
}

const allLessons = (s: Subject) => SOURCE.flatMap((w) => w[s]);

const urduQ = weighted("urdu", 101);
const urduVocab = queue(vocab(allLessons("urdu"), "urdu", 7), 107);
/** Urdu passages from Week 5 on (the basic weeks are too short for a test). */
const urduPassages = queue(passages(SOURCE.slice(4).flatMap((w) => w.urdu), "ur"), 109);
const englishQ = weighted("english", 201);
const englishVocab = queue(vocab(allLessons("english"), "english", 11), 207);
const englishPassages = queue(passages(allLessons("english").filter((l) => l.id.includes("-en-read")), "en"), 209);
const translateLines = queue(
  allLessons("english").flatMap((l) => (l.id.includes("-en-translate") ? l.blocks.flatMap((b) => (b.type === "phrases" ? b.items : [])) : [])),
  211,
);
const urduFromEnglish = queue(
  allLessons("english").flatMap((l) => (l.id.includes("-en-read") ? l.blocks.flatMap((b) => (b.type === "reading" ? b.lines.filter((x) => x.en && x.en.length < 90) : [])) : [])),
  213,
);
const mathQ = weighted("math", 301);

/** A tense question for a random sentence set and tense (look-alike options). */
function tenseQs(seed: number, make: (set: (typeof SETS)[number], t: number, turn: number) => QuizQuestion) {
  const rand = rng(seed);
  let turn = 0;
  return (n: number) =>
    Array.from({ length: n }, () => make(SETS[Math.floor(rand() * SETS.length)], Math.floor(rand() * 12), turn++));
}
const tenseTranslate = tenseQs(401, translateQ);
const tenseToUrdu = tenseQs(403, toUrduQ);
const tenseGap = tenseQs(405, gapQ);
const tenseUrPick = tenseQs(407, urPickQ);
const tenseUrChange = tenseQs(409, (set, t, turn) => urChangeQ(set, (t + 1 + (turn % 11)) % 12, t, turn));

/** Translation sentences from the daily packs, with look-alike options made by changing one helping verb. */
const lookAlikeTranslate = queue(
  allLessons("english")
    .filter((l) => l.id.includes("-en-translate"))
    .flatMap((l) => l.blocks.flatMap((b) => (b.type === "phrases" ? b.items : [])))
    .flatMap((it, i): QuizQuestion[] => {
      const alikes = swapAlikes(it.en ?? "");
      if (!it.ur || alikes.length < 2) return [];
      const opts = [it.en!, alikes[i % alikes.length], alikes[(i + 1) % alikes.length]];
      if (new Set(opts).size < 3) return [];
      const sorted = [...opts].sort((a, b) => a.localeCompare(b));
      return [{ q: "Choose the correct English.", prompt: { ur: it.ur }, options: sorted.map((en) => ({ en })), answer: sorted.indexOf(it.en!) }];
    }),
  413,
);
const mathDrills = queue(drills(allLessons("math")), 307);

const URDU_ESSAYS = [
  "تعلیم کی اہمیت", "وقت کی پابندی", "میرا پسندیدہ شاعر", "سائنس کے کرشمے", "حب الوطنی", "محنت کی عظمت", "صفائی نصف ایمان ہے",
  "موبائل فون کے فائدے اور نقصانات", "پانی کی قلت", "میرا گاؤں", "کفایت شعاری", "ہمارا قومی کھیل", "سادگی", "بزرگوں کا احترام",
  "ٹریفک کے مسائل", "درخت لگائیں", "میری زندگی کا مقصد", "حسنِ اخلاق", "علامہ اقبال", "قائدِ اعظم", "کسان کی زندگی",
  "موسمیاتی تبدیلی", "وعدے کی پابندی", "نظم و ضبط", "ہمسایوں کے حقوق", "کامیابی کا راز", "سچائی", "اتحاد میں برکت ہے",
];
const URDU_LETTERS = [
  "اپنے چھوٹے بھائی کو پڑھائی پر توجہ دینے کی نصیحت کا خط", "ہیڈ ماسٹر صاحب کے نام فیس معافی کی درخواست", "دوست کو سیلاب کا حال بتانے کا خط",
  "والد صاحب کو امتحان کی تیاری کے بارے میں خط", "ڈی سی او کے نام علاقے میں صفائی کی درخواست", "دوست کو عید کی مبارک باد کا خط",
  "مدیر اخبار کے نام لوڈ شیڈنگ پر خط", "ہیڈ ماسٹر کے نام کریکٹر سرٹیفکیٹ کی درخواست", "امی کو پردیس سے خط",
  "دوست کو کامیابی پر مبارک باد کا خط", "ایس ایچ او کے نام موبائل گم ہونے کی درخواست", "واپڈا کے نام بجلی کے زیادہ بل کی درخواست",
  "دوست کو اپنے گاؤں آنے کی دعوت کا خط", "پرنسپل کے نام بیماری کی چھٹی کی درخواست",
];
const URDU_STORIES = [
  "کہانی: لالچ بری بلا ہے", "کہانی: ایمان دار لکڑہارا", "کہانی: جیسی کرنی ویسی بھرنی", "مکالمہ: دکان دار اور گاہک", "کہانی: محنت کا پھل میٹھا ہوتا ہے",
  "مکالمہ: مریض اور ڈاکٹر", "کہانی: اتفاق میں برکت ہے", "مکالمہ: دو دوست میٹرک کی تیاری پر", "کہانی: سچ کی جیت", "رسید: دکان سے خریدے گئے سامان کی رسید",
];
const COUPLETS = [
  "تو شاہیں ہے پرواز ہے کام تیرا / ترے سامنے آسماں اور بھی ہیں",
  "ستاروں سے آگے جہاں اور بھی ہیں / ابھی عشق کے امتحاں اور بھی ہیں",
  "لب پہ آتی ہے دعا بن کے تمنا میری / زندگی شمع کی صورت ہو خدایا میری",
  "افراد کے ہاتھوں میں ہے اقوام کی تقدیر / ہر فرد ہے ملت کے مقدر کا ستارا",
  "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے / خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
];
const EN_ESSAYS = [
  "My aim in life", "A visit to a historical place", "The importance of time", "My village", "Road safety", "Climate change and Pakistan",
  "The value of education", "My favourite book", "A hardworking farmer", "The value of sports", "Mobile phones: a blessing or a curse?",
  "Cleanliness", "My best friend", "Quaid-e-Azam", "Allama Iqbal", "Water shortage", "Honesty is the best policy", "A rainy day",
  "Good manners", "My learning journey", "Our national heroes", "Trees are our friends", "A visit to a hospital", "The life of a nurse",
  "Saving money", "Load-shedding", "Patriotism", "Discipline",
];
const EN_LETTERS = [
  "an application to the headmaster for fee concession", "a letter to your friend about your Matric preparation",
  "a letter of complaint to a company about a faulty product", "an application to the headmaster for a character certificate",
  "a letter to your mother from a city far away, telling her about your work", "a letter to the editor about broken roads",
  "an application for sick leave", "a letter to your younger brother advising him to work hard", "a job application with a short CV",
  "a letter to a friend inviting him to your village", "a letter to the editor about load-shedding", "an application to a bank manager to open an account",
  "a letter congratulating a friend on passing an exam", "a letter thanking an uncle for a birthday gift",
];
const EN_STORIES = [
  "Story: ‘Greed is a curse’", "Story: ‘The empty pot’", "Story: ‘The honest woodcutter’", "Dialogue: a customer and a mobile shopkeeper",
  "Story: ‘Hard work pays’", "Dialogue: a patient and a doctor", "Story: ‘Union is strength’", "Dialogue: two friends about passing Matric",
  "Story: ‘A friend in need is a friend indeed’", "Dialogue: opening a bank account",
];

/** 12 → ۱۲ */
const ud = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const pick = <T,>(xs: T[], t: number, step = 1) => xs[(t * step) % xs.length];

function urduPaper(week: number, day: number, t: number): Lesson {
  const [p1, p2] = urduPassages(2);
  const toUrdu = urduFromEnglish(4)
    .map((x) => x.en)
    .join(" ");
  return {
    id: `w${week}-t${day}-ur`,
    day,
    title: `Test ${t} — Urdu paper`,
    titleUr: `امتحان ${ud(t)}: اردو کا پرچہ`,
    minutes: 90,
    blocks: [
      {
        type: "rule",
        title: "ہدایات (نوے منٹ)",
        points: [
          "یہ پورے کورس کا امتحان ہے۔ ہر حصے میں کم از کم نوے فیصد سوال درست ہونے چاہئیں۔",
          "معروضی سوالات اور ملتے جلتے جملے: تیس منٹ۔ عبارتیں اور ان کے سوال: پچیس منٹ۔ انشا (مضمون، خط، کہانی، تشریح): پینتیس منٹ۔",
          "ملتے جلتے جملے غور سے پڑھیں: ان میں صرف ایک لفظ کا فرق ہوتا ہے۔",
          "تحریری حصہ کاپی پر صاف خط میں لکھیں اور استاد کو دکھائیں۔",
        ],
      },
      { type: "quiz", title: "حصہ الف: معروضی سوالات", lang: "ur", questions: urduQ(16) },
      { type: "quiz", title: "حصہ ب: الفاظ کے معنی", lang: "ur", questions: urduVocab(10) },
      { type: "quiz", title: "حصہ ج: ملتے جلتے جملے (زمانے)", lang: "ur", questions: [...tenseUrPick(4), ...tenseUrChange(4)] },
      { ...p1.reading, title: "حصہ د: عبارت ۱ پڑھیں" } as Block,
      { ...p1.quiz, title: "عبارت ۱ کے سوال" } as Block,
      { ...p2.reading, title: "عبارت ۲ پڑھیں" } as Block,
      { ...p2.quiz, title: "عبارت ۲ کے سوال" } as Block,
      {
        type: "write",
        title: "حصہ ہ: انشا",
        lang: "ur",
        items: ["مضمون", "خط یا درخواست", "کہانی / مکالمہ", "شعر کی تشریح", "ترجمہ"],
        note:
          `(۱) مضمون (تین سو الفاظ): «${pick(URDU_ESSAYS, t)}»۔ ` +
          `(۲) ${pick(URDU_LETTERS, t, 3)}۔ ` +
          `(۳) ${pick(URDU_STORIES, t, 7)}۔ ` +
          `(۴) اس شعر کی تشریح کریں: «${pick(COUPLETS, t)}»۔ ` +
          `(۵) اردو میں ترجمہ کریں: “${toUrdu}”`,
      },
    ],
  };
}

function englishPaper(week: number, day: number, t: number): Lesson {
  const p = englishPassages(1)[0];
  const lines = translateLines(5);
  return {
    id: `w${week}-t${day}-en`,
    day,
    title: `Test ${t} — English paper`,
    titleUr: `امتحان ${ud(t)}: انگریزی کا پرچہ`,
    minutes: 100,
    blocks: [
      {
        type: "rule",
        title: "Instructions (100 minutes)",
        points: [
          "This test covers the whole course. You need at least 90% in every section.",
          "Objective, vocabulary, translation and look-alike: 40 minutes. Comprehension: 15 minutes. Writing: 45 minutes.",
          "Look-alike options differ by only one or two words. Read every option carefully.",
          "Write Section G in your notebook and show it to your teacher.",
        ],
      },
      { type: "quiz", title: "Section A: Objective questions", lang: "en", questions: englishQ(20) },
      { type: "quiz", title: "Section B: Word meanings", lang: "en", questions: englishVocab(10) },
      { type: "quiz", title: "Section C: Translation, Urdu → English", lang: "en", questions: [...tenseTranslate(5), ...lookAlikeTranslate(5)] },
      { type: "quiz", title: "Section D: Translation, English → Urdu", lang: "en", questions: tenseToUrdu(6) },
      { type: "quiz", title: "Section E: Look-alike sentences: fill the gap", lang: "en", questions: tenseGap(8) },
      { ...p.reading, title: "Section F: Read the passage", plain: true } as Block,
      { ...p.quiz, title: "Questions on the passage" } as Block,
      {
        type: "write",
        title: "Section G: Writing",
        lang: "en",
        items: ["Essay", "Letter / application", "Story / dialogue", "Translation"],
        note:
          `(1) Essay (250–300 words): ‘${pick(EN_ESSAYS, t)}’. ` +
          `(2) Write ${pick(EN_LETTERS, t, 3)}. ` +
          `(3) ${pick(EN_STORIES, t, 7)}. ` +
          `(4) Translate into English: «${lines.map((x) => x.ur).join(" ")}»`,
      },
    ],
  };
}

function mathPaper(week: number, day: number, t: number): Lesson {
  const [d1, d2] = mathDrills(2);
  return {
    id: `w${week}-t${day}-ma`,
    day,
    title: `Test ${t} — Math paper`,
    titleUr: `امتحان ${ud(t)}: ریاضی کا پرچہ`,
    minutes: 50,
    blocks: [
      {
        type: "rule",
        title: "Instructions (50 minutes)",
        points: ["Use rough paper and write every step.", "You need at least 90% in every section.", "Check each answer by putting it back into the question."],
      },
      { type: "quiz", title: "Section A: Questions", lang: "en", questions: mathQ(25) },
      { ...d1, title: "Section B: Quick sums 1", count: 8 },
      { ...d2, title: "Section B: Quick sums 2", count: 8 },
    ],
  };
}

const DAYS = Array.from({ length: EXAM_DAYS }, (_, i) => i + 1);

function examWeek(week: number): WeekContent {
  const urdu: Lesson[] = [];
  const english: Lesson[] = [];
  const math: Lesson[] = [];
  for (const day of DAYS) {
    const t = (week - EXAM_WEEKS[0]) * EXAM_DAYS + day;
    urdu.push(urduPaper(week, day, t));
    english.push(englishPaper(week, day, t));
    math.push(mathPaper(week, day, t));
  }
  const n = week - EXAM_WEEKS[0] + 1;
  return {
    contentDays: EXAM_DAYS,
    urdu,
    english,
    math,
    test: {
      kind: "written",
      parts: {
        urdu: [
          { title: "Speaking (oral)", oral: true, items: [`Read aloud any passage from this week's tests.`, `Speak for three minutes without notes: «${pick(URDU_ESSAYS, n * 5)}».`] },
          {
            title: "مکمل نمونہ پرچہ",
            dir: "rtl",
            items: [
              `شعر کی تشریح: «${pick(COUPLETS, n + 2)}»`,
              `مضمون: «${pick(URDU_ESSAYS, n * 3 + 1)}»`,
              `${pick(URDU_LETTERS, n * 2 + 1)}`,
              `${pick(URDU_STORIES, n * 2)}`,
              "دس محاورے جملوں میں استعمال کریں اور دس الفاظ کے متضاد لکھیں۔",
            ],
          },
        ],
        english: [
          { title: "Speaking (oral)", oral: true, items: ["Introduce yourself for one minute.", `Speak for three minutes on ‘${pick(EN_ESSAYS, n * 5)}’.`] },
          {
            title: "Full mock paper",
            items: [
              `Essay: ‘${pick(EN_ESSAYS, n * 3 + 1)}’.`,
              `Write ${pick(EN_LETTERS, n * 2 + 1)}.`,
              `${pick(EN_STORIES, n * 2)}.`,
              "Change five sentences into the passive voice and five into indirect speech.",
              "Translate a paragraph of six Urdu sentences into English.",
            ],
          },
        ],
        math: [
          {
            title: "Full mock paper",
            items: [
              "Five sums on BODMAS, fractions and negative numbers.",
              "Three questions on percentage, profit and loss, and zakat.",
              "Solve two linear and one pair of simultaneous equations; factorise two expressions.",
              "Area of a circle, volume of a cylinder and one Pythagoras problem.",
              "Mean, median and mode of a set of seven numbers; an electricity bill.",
            ],
          },
        ],
      },
    },
  };
}

export const week14 = examWeek(14);
export const week15 = examWeek(15);
export const week16 = examWeek(16);
export const week17 = examWeek(17);
