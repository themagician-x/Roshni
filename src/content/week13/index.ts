/**
 * Week 13: the 12 tenses, English and Urdu only, in very simple words.
 * Two tenses a day (present, then past, then future), a practice lesson each day, and a full review on day 7.
 * Every sentence comes from the sentence sets in ../tenses, so all options are look-alikes of each other.
 */
import type { Lesson, QuizQuestion, WeekContent } from "@/lib/types";
import { askUr } from "../helpers";
import { SETS, TENSES, gapQ, nameQ, negative, question, sentence, toUrduQ, translateQ, urChangeQ, urNameQ, urPickQ } from "../tenses";

/** The two tenses taught on each of days 1–6. */
const PLAN: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
];

/** The k-th sentence set for tense t (turns through all sets so each lesson uses different ones). */
const set = (t: number, k: number) => SETS[(k + t * 3) % SETS.length];
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
/** Tenses learned up to and including day d. */
const learned = (d: number) => PLAN.slice(0, d).flat();

const URDU_NUM = ["پہلا", "دوسرا", "تیسرا", "چوتھا", "پانچواں", "چھٹا", "ساتواں", "آٹھواں", "نواں", "دسواں", "گیارھواں", "بارھواں"];

function enIntro(): Lesson {
  return {
    id: "w13-en-intro",
    day: 1,
    title: "What is a tense? (زمانہ)",
    titleUr: "زمانہ کیا ہے؟",
    minutes: 40,
    blocks: [
      {
        type: "rule",
        title: "What is a tense? (زمانہ)",
        points: [
          "A tense tells us WHEN something happens. (کام کب ہوا)",
          "There are 3 times: present = now (حال), past = before (ماضی), future = later (مستقبل).",
          "Each time has 4 kinds: simple, continuous, perfect, perfect continuous.",
          "3 times × 4 kinds = 12 tenses.",
          "Simple = the plain action. Continuous = still going on (ing). Perfect = finished (3rd form). Perfect continuous = going on for some time (been + ing).",
        ],
      },
      {
        type: "table",
        title: "All 12 tenses with ‘eat’",
        headers: ["", "Simple", "Continuous", "Perfect", "Perfect continuous"],
        rows: ["Present", "Past", "Future"].map((time, i) => [time, ...range(4).map((a) => sentence(SETS[0], i * 4 + a))]),
      },
      {
        type: "reading",
        title: "The 3 times in one picture",
        lang: "en",
        lines: [
          { en: "Yesterday I ate lunch.", ur: "کل میں نے دوپہر کا کھانا کھایا۔" },
          { en: "Now I am eating lunch.", ur: "اب میں دوپہر کا کھانا کھا رہا ہوں۔" },
          { en: "Tomorrow I will eat lunch.", ur: "کل میں دوپہر کا کھانا کھاؤں گا۔" },
        ],
      },
      {
        type: "quiz",
        title: "Check",
        lang: "en",
        questions: [
          q("A tense tells us…", "when something happens", "who does something", "where something happens"),
          q("‘Present’ means…", "now", "before", "later"),
          q("‘Past’ means…", "before", "now", "later"),
          q("‘Future’ means…", "later", "now", "before"),
          q("How many tenses are there in English?", "12", "3", "4"),
          q("Which word shows ‘still going on’?", "eating", "ate", "eaten"),
        ],
      },
      { type: "write", lang: "en", items: ["Copy the table of 12 tenses"], note: "Copy the table into your notebook. Say each sentence aloud." },
    ],
  };
}

function q(question: string, right: string, ...wrong: string[]): QuizQuestion {
  const opts = [right, ...wrong].sort((a, b) => a.localeCompare(b));
  return { q: question, options: opts.map((en) => ({ en })), answer: opts.indexOf(right) };
}

function enTense(t: number, day: number): Lesson {
  const T = TENSES[t];
  return {
    id: `w13-en-${T.key}`,
    day,
    title: `${T.name} (${T.ur})`,
    titleUr: T.ur,
    minutes: 75,
    blocks: [
      {
        type: "rule",
        title: `${T.name} (${T.ur})`,
        points: [`Use it for: ${T.use} (${T.useUr})`, `Formula: ${T.formula}`, `Signal words: ${T.signals}`, `Example: ${sentence(SETS[0], t)}`],
      },
      {
        type: "table",
        title: "Yes, no and question",
        headers: ["", "I", "He", "They"],
        rows: [
          ["Positive", ...[SETS[1], SETS[0], SETS[3]].map((s) => sentence(s, t))],
          ["Negative", ...[SETS[1], SETS[0], SETS[3]].map((s) => negative(s, t))],
          ["Question", ...[SETS[1], SETS[0], SETS[3]].map((s) => question(s, t))],
        ],
      },
      {
        type: "reading",
        title: "Listen, read and say each sentence",
        lang: "en",
        lines: range(10).map((k) => ({ en: sentence(set(t, k), t), ur: set(t, k).ur[t] })),
      },
      { type: "quiz", title: "Choose the correct English", lang: "en", questions: range(6).map((k) => translateQ(set(t, k + 3), t, k)) },
      { type: "quiz", title: "Fill the gap", lang: "en", questions: range(6).map((k) => gapQ(set(t, k + 7), t, k + 1)) },
      { type: "quiz", title: "Which tense is this?", lang: "en", questions: range(4).map((k) => nameQ(set(t, k + 10), t, k)) },
      {
        type: "write",
        lang: "en",
        items: ["5 positive sentences", "Make them negative", "Make them questions"],
        note: `Write 5 sentences about your own life in the ${T.name.toLowerCase()}. Then make each one negative, and then a question.`,
      },
    ],
  };
}

function enPractice(d: number): Lesson {
  const ts = learned(d);
  const [a, b] = PLAN[d - 1];
  const pick = (k: number) => ts[(k * 5 + d) % ts.length];
  const lines = range(8).map((k) => set(pick(k), k + 2).ur[pick(k)]);
  return {
    id: `w13-en-practice-${d}`,
    day: d,
    title: `Practice: ${TENSES[a].name} and ${TENSES[b].name}`,
    titleUr: "مشق: ترجمہ اور ملتے جلتے جملے",
    minutes: 60,
    blocks: [
      { type: "quiz", title: "Urdu to English: choose the correct one", lang: "en", questions: range(10).map((k) => translateQ(set(pick(k), k + 5), pick(k), k)) },
      { type: "quiz", title: "English to Urdu: choose the correct one", lang: "en", questions: range(6).map((k) => toUrduQ(set(pick(k + 3), k + 9), pick(k + 3), k)) },
      { type: "quiz", title: "Which tense is this?", lang: "en", questions: range(8).map((k) => nameQ(set(pick(k + 1), k + 12), pick(k + 1), k)) },
      { type: "write", lang: "en", items: ["Translate 8 sentences"], note: `Translate into English: ${lines.map((x, i) => `(${i + 1}) ${x}`).join(" ")}` },
    ],
  };
}

function urIntro(): Lesson {
  return {
    id: "w13-ur-intro",
    day: 1,
    title: "Urdu tenses: what is زمانہ?",
    titleUr: "زمانہ کیا ہے؟",
    minutes: 35,
    blocks: [
      {
        type: "rule",
        title: "زمانہ کیا ہے؟",
        points: [
          "زمانہ بتاتا ہے کہ کام کب ہوا۔",
          "تین وقت ہیں: حال (اب)، ماضی (پہلے)، مستقبل (بعد میں)۔",
          "ہر وقت کی چار قسمیں ہیں: سادہ، جاری، مکمل، مکمل جاری۔",
          "یوں کل بارہ زمانے بنتے ہیں، بالکل انگریزی کی طرح۔",
        ],
      },
      {
        type: "table",
        title: "بارہ زمانے، ایک ہی جملہ",
        dir: "rtl",
        headers: ["", "سادہ", "جاری", "مکمل", "مکمل جاری"],
        rows: ["حال", "ماضی", "مستقبل"].map((time, i) => [time, ...range(4).map((a) => SETS[1].ur[i * 4 + a])]),
      },
      {
        type: "quiz",
        title: "جانچ",
        lang: "ur",
        questions: [
          askUr("زمانہ کیا بتاتا ہے؟", "کام کب ہوا", "کام کس نے کیا", "کام کہاں ہوا"),
          askUr("«اب» کس وقت کو کہتے ہیں؟", "حال", "ماضی", "مستقبل"),
          askUr("«پہلے، گزرا ہوا وقت» کو کیا کہتے ہیں؟", "ماضی", "حال", "مستقبل"),
          askUr("«بعد میں، آنے والا وقت» کو کیا کہتے ہیں؟", "مستقبل", "ماضی", "حال"),
          askUr("کل کتنے زمانے ہیں؟", "بارہ", "تین", "چار"),
          askUr("«رہا ہے» کس قسم کی نشانی ہے؟", "جاری", "سادہ", "مکمل"),
        ],
      },
      { type: "write", lang: "ur", items: ["بارہ زمانوں کا جدول"], note: "جدول کاپی پر لکھیں اور ہر جملہ بلند آواز سے پڑھیں۔" },
    ],
  };
}

function urTense(t: number, day: number): Lesson {
  const T = TENSES[t];
  return {
    id: `w13-ur-${T.key}`,
    day,
    title: `Urdu: ${T.ur}`,
    titleUr: `${T.ur} (${T.urOld})`,
    minutes: 60,
    blocks: [
      {
        type: "rule",
        title: `${T.ur} (${T.urOld})`,
        points: [`پہچان: ${T.useUr}۔`, `نشانی: ${T.sign}۔`, `مثال: ${SETS[1].ur[t]}`, `یہ بارہ زمانوں میں ${URDU_NUM[t]} زمانہ ہے۔`],
      },
      { type: "reading", title: "مثالیں: سنیں اور پڑھیں", lang: "ur", lines: range(10).map((k) => ({ ur: set(t, k).ur[t] })) },
      { type: "quiz", title: "درست جملہ چنیں", lang: "ur", questions: range(6).map((k) => urPickQ(set(t, k + 3), t, k)) },
      { type: "quiz", title: "زمانہ پہچانیں", lang: "ur", questions: range(6).map((k) => urNameQ(set(t, k + 8), t, k)) },
      { type: "write", lang: "ur", items: ["پانچ جملے"], note: `اپنی زندگی کے بارے میں «${T.ur}» میں پانچ جملے لکھیں۔` },
    ],
  };
}

function urPractice(d: number): Lesson {
  const ts = learned(d);
  const pick = (k: number) => ts[(k * 5 + d) % ts.length];
  return {
    id: `w13-ur-practice-${d}`,
    day: d,
    title: "Urdu practice: changing tenses",
    titleUr: "مشق: زمانہ بدلیں",
    minutes: 45,
    blocks: [
      {
        type: "quiz",
        title: "جملے کا زمانہ بدلیں",
        lang: "ur",
        questions: range(8).map((k) => {
          const from = pick(k);
          const to = pick(k + 1) === from ? (from + 4) % 12 : pick(k + 1);
          return urChangeQ(set(from, k + 4), from, to, k);
        }),
      },
      { type: "quiz", title: "زمانہ پہچانیں", lang: "ur", questions: range(8).map((k) => urNameQ(set(pick(k + 2), k + 11), pick(k + 2), k)) },
      { type: "write", lang: "ur", items: ["ایک جملہ، کئی زمانے"], note: "«میں اسکول جاتا ہوں» کو آج تک سیکھے ہوئے سب زمانوں میں لکھیں۔" },
    ],
  };
}

const ALL = range(12);

function enReview(): Lesson[] {
  return [
    {
      id: "w13-en-review-chart",
      day: 7,
      title: "All 12 tenses: the big chart",
      titleUr: "بارہ زمانے: ایک نظر میں",
      minutes: 60,
      blocks: [
        { type: "table", title: "The 12 tenses", headers: ["Tense", "Formula", "Example", "Urdu"], rows: ALL.map((t) => [TENSES[t].name, TENSES[t].formula, sentence(SETS[6], t), SETS[6].ur[t]]) },
        { type: "quiz", title: "Which tense is this?", lang: "en", questions: ALL.map((t) => nameQ(set(t, t + 1), t, t)) },
        { type: "write", lang: "en", items: ["The chart from memory"], note: "Close the app. Write all 12 tenses with the formula and one example each. Then check." },
      ],
    },
    {
      id: "w13-en-review-alike",
      day: 7,
      title: "Look-alike sentences",
      titleUr: "ملتے جلتے جملے",
      minutes: 75,
      blocks: [
        { type: "quiz", title: "Choose the correct English", lang: "en", questions: range(20).map((k) => translateQ(set(k % 12, k + 4), k % 12, k)) },
        { type: "quiz", title: "Fill the gap", lang: "en", questions: range(10).map((k) => gapQ(set((k * 5) % 12, k + 2), (k * 5) % 12, k)) },
      ],
    },
    {
      id: "w13-en-review-translate",
      day: 7,
      title: "Translation: Urdu ⇄ English",
      titleUr: "ترجمہ: اردو اور انگریزی",
      minutes: 90,
      blocks: [
        { type: "reading", title: "Say these in English (try first, then check below)", lang: "ur", lines: ALL.map((t) => ({ ur: set(t, 9).ur[t] })) },
        { type: "phrases", title: "Check your answers", lang: "en", items: ALL.map((t) => ({ en: sentence(set(t, 9), t), ur: set(t, 9).ur[t] })) },
        { type: "quiz", title: "English to Urdu: choose the correct one", lang: "en", questions: ALL.map((t) => toUrduQ(set(t, 5), t, t)) },
        { type: "write", lang: "en", items: ["Translate all 12 sentences"], note: "Cover the answers. Translate every Urdu sentence above into English, then check each one." },
      ],
    },
  ];
}

function urReview(): Lesson[] {
  return [
    {
      id: "w13-ur-review-chart",
      day: 7,
      title: "Urdu: all 12 tenses",
      titleUr: "بارہ زمانے: ایک نظر میں",
      minutes: 60,
      blocks: [
        { type: "table", title: "بارہ زمانے", dir: "rtl", headers: ["زمانہ", "پرانا نام", "نشانی", "مثال"], rows: ALL.map((t) => [TENSES[t].ur, TENSES[t].urOld, TENSES[t].sign, SETS[5].ur[t]]) },
        { type: "quiz", title: "زمانہ پہچانیں", lang: "ur", questions: ALL.map((t) => urNameQ(set(t, t + 2), t, t)) },
        { type: "write", lang: "ur", items: ["جدول زبانی"], note: "ایپ بند کریں۔ بارہ زمانوں کے نام، نشانی اور ایک ایک مثال لکھیں، پھر ملا کر دیکھیں۔" },
      ],
    },
    {
      id: "w13-ur-review-alike",
      day: 7,
      title: "Urdu: look-alike sentences",
      titleUr: "ملتے جلتے جملے",
      minutes: 60,
      blocks: [{ type: "quiz", title: "درست جملہ چنیں", lang: "ur", questions: range(15).map((k) => urPickQ(set(k % 12, k + 6), k % 12, k)) }],
    },
    {
      id: "w13-ur-review-change",
      day: 7,
      title: "Urdu: change the tense",
      titleUr: "زمانہ بدلیں",
      minutes: 60,
      blocks: [
        { type: "quiz", title: "جملے کا زمانہ بدلیں", lang: "ur", questions: range(12).map((k) => urChangeQ(set(k, k + 1), k, (k + 5) % 12, k)) },
        { type: "write", lang: "ur", items: ["دس جملے، تین زمانے"], note: "اپنے دن کے بارے میں دس جملے لکھیں: پہلے حال سادہ میں، پھر ماضی سادہ میں، پھر مستقبل سادہ میں۔" },
      ],
    },
  ];
}

const english: Lesson[] = [enIntro(), ...PLAN.flatMap(([a, b], i) => [enTense(a, i + 1), enTense(b, i + 1), enPractice(i + 1)]), ...enReview()];
const urdu: Lesson[] = [urIntro(), ...PLAN.flatMap(([a, b], i) => [urTense(a, i + 1), urTense(b, i + 1), urPractice(i + 1)]), ...urReview()];

export const week13: WeekContent = {
  contentDays: 7,
  urdu,
  english,
  math: [],
  test: {
    kind: "written",
    parts: {
      urdu: [
        { title: "Speaking (oral)", oral: true, items: ["Say «میں اسکول جاتا ہوں» in all 12 tenses without looking.", "Tell what you did yesterday, what you are doing now, and what you will do tomorrow."] },
        {
          title: "سوال: زمانے",
          dir: "rtl",
          items: [
            "بارہ زمانوں کے نام اور نشانیاں لکھیں۔",
            "«وہ خط لکھتا ہے» کو ماضی جاری، حال مکمل اور مستقبل سادہ میں بدلیں۔",
            "ہر زمانے کی ایک ایک مثال اپنے گاؤں کے بارے میں لکھیں۔",
          ],
        },
      ],
      english: [
        { title: "Speaking (oral)", oral: true, items: ["Say ‘I go to school’ in all 12 tenses.", "Tell your teacher about yesterday, today and tomorrow in English."] },
        {
          title: "Q: Tenses",
          items: [
            "Write the formula and one example of each of the 12 tenses.",
            "Change into negative and question: She cooks rice. — They were playing cricket. — He has eaten lunch. — We will write letters.",
            "Translate: میں دو گھنٹے سے پڑھ رہا ہوں۔ — بارش ہو چکی تھی۔ — وہ کل آئے گا۔ — بچہ سو رہا ہے۔",
          ],
        },
      ],
      math: [],
    },
  },
};
