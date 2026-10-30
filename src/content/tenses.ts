/**
 * The 12 tenses, as data. Each sentence set is one action written in all 12 tenses, in English and Urdu,
 * so lessons and exams can ask "look-alike" questions: the options are the same sentence in different tenses.
 */
import type { QuizQuestion } from "@/lib/types";

export type Tense = {
  /** Short key, e.g. "pres-simple". */
  key: string;
  name: string;
  /** Simple Urdu name used in the lessons, and the traditional grammar name. */
  ur: string;
  urOld: string;
  use: string;
  useUr: string;
  formula: string;
  signals: string;
  /** How to spot it in Urdu. */
  sign: string;
};

/** In order: present, past, future × simple, continuous, perfect, perfect continuous. */
export const TENSES: Tense[] = [
  { key: "pres-simple", name: "Present simple", ur: "حال سادہ", urOld: "حال مطلق", use: "Things we do every day, and facts.", useUr: "روز کے کام اور سچی باتیں", formula: "I / you / we / they + verb. He / she / it + verb + s.", signals: "every day, always, usually, often", sign: "آخر میں «تا / تی / تے» اور «ہے / ہیں / ہوں»" },
  { key: "pres-cont", name: "Present continuous", ur: "حال جاری", urOld: "حال ناتمام", use: "Things happening right now.", useUr: "جو کام ابھی ہو رہا ہے", formula: "am / is / are + verb + ing", signals: "now, right now, at the moment, look!", sign: "«رہا / رہی / رہے» اور «ہے / ہیں / ہوں»" },
  { key: "pres-perf", name: "Present perfect", ur: "حال مکمل", urOld: "ماضی قریب", use: "A job just finished. Its result is here now.", useUr: "جو کام ابھی ابھی ختم ہوا", formula: "have / has + 3rd form of verb", signals: "just, already, yet, ever, never", sign: "«چکا / چکی / چکے» اور «ہے / ہیں / ہوں»" },
  { key: "pres-perf-cont", name: "Present perfect continuous", ur: "حال مکمل جاری", urOld: "حال تمام استمراری", use: "Started before, and still going on now.", useUr: "جو کام پہلے شروع ہوا اور اب بھی جاری ہے", formula: "have / has + been + verb + ing", signals: "for (two hours), since (morning)", sign: "وقت کے ساتھ «سے»، پھر «رہا ہے»" },
  { key: "past-simple", name: "Past simple", ur: "ماضی سادہ", urOld: "ماضی مطلق", use: "A job finished in the past.", useUr: "جو کام گزرے وقت میں ختم ہو گیا", formula: "2nd form of verb (went, ate, played)", signals: "yesterday, last week, ago, in 2020", sign: "«کھایا، گیا، کیا» — آخر میں «ہے» یا «تھا» نہیں" },
  { key: "past-cont", name: "Past continuous", ur: "ماضی جاری", urOld: "ماضی استمراری", use: "Something was going on in the past.", useUr: "جو کام گزرے وقت میں ہو رہا تھا", formula: "was / were + verb + ing", signals: "at 9 last night, while, when", sign: "«رہا / رہی / رہے» اور «تھا / تھی / تھے»" },
  { key: "past-perf", name: "Past perfect", ur: "ماضی مکمل", urOld: "ماضی بعید", use: "A job finished before another past time.", useUr: "جو کام گزرے وقت میں پہلے ہی ختم ہو چکا تھا", formula: "had + 3rd form of verb", signals: "before, after, already, by then", sign: "«چکا / چکی / چکے» اور «تھا / تھی / تھے»" },
  { key: "past-perf-cont", name: "Past perfect continuous", ur: "ماضی مکمل جاری", urOld: "ماضی تمام استمراری", use: "Was going on for some time in the past.", useUr: "جو کام گزرے وقت میں کچھ دیر سے جاری تھا", formula: "had + been + verb + ing", signals: "for (two hours), since (morning)", sign: "وقت کے ساتھ «سے»، پھر «رہا تھا»" },
  { key: "fut-simple", name: "Future simple", ur: "مستقبل سادہ", urOld: "مستقبل مطلق", use: "Things that will happen later.", useUr: "جو کام آنے والے وقت میں ہوگا", formula: "will + verb", signals: "tomorrow, next week, soon, later", sign: "آخر میں «گا / گی / گے»" },
  { key: "fut-cont", name: "Future continuous", ur: "مستقبل جاری", urOld: "مستقبل استمراری", use: "Something will be going on at a time later.", useUr: "جو کام آنے والے وقت میں ہو رہا ہوگا", formula: "will + be + verb + ing", signals: "at this time tomorrow, at 8 tonight", sign: "«رہا / رہی / رہے» اور «ہوگا / ہوگی / ہوں گے»" },
  { key: "fut-perf", name: "Future perfect", ur: "مستقبل مکمل", urOld: "مستقبل تمام", use: "A job will be finished before a time later.", useUr: "جو کام آنے والے وقت سے پہلے ختم ہو چکا ہوگا", formula: "will + have + 3rd form of verb", signals: "by tomorrow, by next week, by then", sign: "«چکا / چکی / چکے» اور «ہوگا / ہوگی / ہوں گے»" },
  { key: "fut-perf-cont", name: "Future perfect continuous", ur: "مستقبل مکمل جاری", urOld: "مستقبل تمام استمراری", use: "Will have been going on for some time, at a time later.", useUr: "جو کام آنے والے وقت تک کچھ دیر سے جاری ہوگا", formula: "will + have + been + verb + ing", signals: "for (two hours), since (morning) — at a time later", sign: "وقت کے ساتھ «سے»، پھر «رہا ہوگا»" },
];

type Verb = { base: string; s: string; ing: string; past: string; pp: string };
/** One action in all 12 tenses. `who` decides is/are/has/have; `time` is used only in the perfect continuous tenses. */
export type TenseSet = { subj: string; who: "I" | "you" | "he" | "they"; verb: Verb; rest: string; time: string; ur: string[] };

const v = (base: string, s: string, ing: string, past: string, pp: string): Verb => ({ base, s, ing, past, pp });

export const SETS: TenseSet[] = [
  {
    subj: "He", who: "he", verb: v("eat", "eats", "eating", "ate", "eaten"), rest: "lunch", time: "for an hour",
    ur: ["وہ دوپہر کا کھانا کھاتا ہے۔", "وہ دوپہر کا کھانا کھا رہا ہے۔", "وہ دوپہر کا کھانا کھا چکا ہے۔", "وہ ایک گھنٹے سے دوپہر کا کھانا کھا رہا ہے۔", "اس نے دوپہر کا کھانا کھایا۔", "وہ دوپہر کا کھانا کھا رہا تھا۔", "وہ دوپہر کا کھانا کھا چکا تھا۔", "وہ ایک گھنٹے سے دوپہر کا کھانا کھا رہا تھا۔", "وہ دوپہر کا کھانا کھائے گا۔", "وہ دوپہر کا کھانا کھا رہا ہوگا۔", "وہ دوپہر کا کھانا کھا چکا ہوگا۔", "وہ ایک گھنٹے سے دوپہر کا کھانا کھا رہا ہوگا۔"],
  },
  {
    subj: "I", who: "I", verb: v("study", "studies", "studying", "studied", "studied"), rest: "English", time: "for two hours",
    ur: ["میں انگریزی پڑھتا ہوں۔", "میں انگریزی پڑھ رہا ہوں۔", "میں انگریزی پڑھ چکا ہوں۔", "میں دو گھنٹے سے انگریزی پڑھ رہا ہوں۔", "میں نے انگریزی پڑھی۔", "میں انگریزی پڑھ رہا تھا۔", "میں انگریزی پڑھ چکا تھا۔", "میں دو گھنٹے سے انگریزی پڑھ رہا تھا۔", "میں انگریزی پڑھوں گا۔", "میں انگریزی پڑھ رہا ہوں گا۔", "میں انگریزی پڑھ چکا ہوں گا۔", "میں دو گھنٹے سے انگریزی پڑھ رہا ہوں گا۔"],
  },
  {
    subj: "She", who: "he", verb: v("cook", "cooks", "cooking", "cooked", "cooked"), rest: "rice", time: "since morning",
    ur: ["وہ چاول پکاتی ہے۔", "وہ چاول پکا رہی ہے۔", "وہ چاول پکا چکی ہے۔", "وہ صبح سے چاول پکا رہی ہے۔", "اس نے چاول پکائے۔", "وہ چاول پکا رہی تھی۔", "وہ چاول پکا چکی تھی۔", "وہ صبح سے چاول پکا رہی تھی۔", "وہ چاول پکائے گی۔", "وہ چاول پکا رہی ہوگی۔", "وہ چاول پکا چکی ہوگی۔", "وہ صبح سے چاول پکا رہی ہوگی۔"],
  },
  {
    subj: "They", who: "they", verb: v("play", "plays", "playing", "played", "played"), rest: "cricket", time: "for three hours",
    ur: ["وہ کرکٹ کھیلتے ہیں۔", "وہ کرکٹ کھیل رہے ہیں۔", "وہ کرکٹ کھیل چکے ہیں۔", "وہ تین گھنٹے سے کرکٹ کھیل رہے ہیں۔", "انہوں نے کرکٹ کھیلی۔", "وہ کرکٹ کھیل رہے تھے۔", "وہ کرکٹ کھیل چکے تھے۔", "وہ تین گھنٹے سے کرکٹ کھیل رہے تھے۔", "وہ کرکٹ کھیلیں گے۔", "وہ کرکٹ کھیل رہے ہوں گے۔", "وہ کرکٹ کھیل چکے ہوں گے۔", "وہ تین گھنٹے سے کرکٹ کھیل رہے ہوں گے۔"],
  },
  {
    subj: "We", who: "they", verb: v("write", "writes", "writing", "wrote", "written"), rest: "letters", time: "for an hour",
    ur: ["ہم خط لکھتے ہیں۔", "ہم خط لکھ رہے ہیں۔", "ہم خط لکھ چکے ہیں۔", "ہم ایک گھنٹے سے خط لکھ رہے ہیں۔", "ہم نے خط لکھے۔", "ہم خط لکھ رہے تھے۔", "ہم خط لکھ چکے تھے۔", "ہم ایک گھنٹے سے خط لکھ رہے تھے۔", "ہم خط لکھیں گے۔", "ہم خط لکھ رہے ہوں گے۔", "ہم خط لکھ چکے ہوں گے۔", "ہم ایک گھنٹے سے خط لکھ رہے ہوں گے۔"],
  },
  {
    subj: "Ali", who: "he", verb: v("repair", "repairs", "repairing", "repaired", "repaired"), rest: "phones", time: "for five hours",
    ur: ["علی فون ٹھیک کرتا ہے۔", "علی فون ٹھیک کر رہا ہے۔", "علی فون ٹھیک کر چکا ہے۔", "علی پانچ گھنٹے سے فون ٹھیک کر رہا ہے۔", "علی نے فون ٹھیک کیے۔", "علی فون ٹھیک کر رہا تھا۔", "علی فون ٹھیک کر چکا تھا۔", "علی پانچ گھنٹے سے فون ٹھیک کر رہا تھا۔", "علی فون ٹھیک کرے گا۔", "علی فون ٹھیک کر رہا ہوگا۔", "علی فون ٹھیک کر چکا ہوگا۔", "علی پانچ گھنٹے سے فون ٹھیک کر رہا ہوگا۔"],
  },
  {
    subj: "The farmers", who: "they", verb: v("work", "works", "working", "worked", "worked"), rest: "in the fields", time: "since morning",
    ur: ["کسان کھیتوں میں کام کرتے ہیں۔", "کسان کھیتوں میں کام کر رہے ہیں۔", "کسان کھیتوں میں کام کر چکے ہیں۔", "کسان صبح سے کھیتوں میں کام کر رہے ہیں۔", "کسانوں نے کھیتوں میں کام کیا۔", "کسان کھیتوں میں کام کر رہے تھے۔", "کسان کھیتوں میں کام کر چکے تھے۔", "کسان صبح سے کھیتوں میں کام کر رہے تھے۔", "کسان کھیتوں میں کام کریں گے۔", "کسان کھیتوں میں کام کر رہے ہوں گے۔", "کسان کھیتوں میں کام کر چکے ہوں گے۔", "کسان صبح سے کھیتوں میں کام کر رہے ہوں گے۔"],
  },
  {
    subj: "You", who: "you", verb: v("drink", "drinks", "drinking", "drank", "drunk"), rest: "tea", time: "for half an hour",
    ur: ["تم چائے پیتے ہو۔", "تم چائے پی رہے ہو۔", "تم چائے پی چکے ہو۔", "تم آدھے گھنٹے سے چائے پی رہے ہو۔", "تم نے چائے پی۔", "تم چائے پی رہے تھے۔", "تم چائے پی چکے تھے۔", "تم آدھے گھنٹے سے چائے پی رہے تھے۔", "تم چائے پیو گے۔", "تم چائے پی رہے ہو گے۔", "تم چائے پی چکے ہو گے۔", "تم آدھے گھنٹے سے چائے پی رہے ہو گے۔"],
  },
  {
    subj: "The baby", who: "he", verb: v("sleep", "sleeps", "sleeping", "slept", "slept"), rest: "", time: "for two hours",
    ur: ["بچہ سوتا ہے۔", "بچہ سو رہا ہے۔", "بچہ سو چکا ہے۔", "بچہ دو گھنٹے سے سو رہا ہے۔", "بچہ سویا۔", "بچہ سو رہا تھا۔", "بچہ سو چکا تھا۔", "بچہ دو گھنٹے سے سو رہا تھا۔", "بچہ سوئے گا۔", "بچہ سو رہا ہوگا۔", "بچہ سو چکا ہوگا۔", "بچہ دو گھنٹے سے سو رہا ہوگا۔"],
  },
  {
    subj: "Mother", who: "he", verb: v("wash", "washes", "washing", "washed", "washed"), rest: "the clothes", time: "since nine o'clock",
    ur: ["امی کپڑے دھوتی ہیں۔", "امی کپڑے دھو رہی ہیں۔", "امی کپڑے دھو چکی ہیں۔", "امی نو بجے سے کپڑے دھو رہی ہیں۔", "امی نے کپڑے دھوئے۔", "امی کپڑے دھو رہی تھیں۔", "امی کپڑے دھو چکی تھیں۔", "امی نو بجے سے کپڑے دھو رہی تھیں۔", "امی کپڑے دھوئیں گی۔", "امی کپڑے دھو رہی ہوں گی۔", "امی کپڑے دھو چکی ہوں گی۔", "امی نو بجے سے کپڑے دھو رہی ہوں گی۔"],
  },
  {
    subj: "The students", who: "they", verb: v("learn", "learns", "learning", "learned", "learned"), rest: "new words", time: "for a week",
    ur: ["طالب علم نئے الفاظ سیکھتے ہیں۔", "طالب علم نئے الفاظ سیکھ رہے ہیں۔", "طالب علم نئے الفاظ سیکھ چکے ہیں۔", "طالب علم ایک ہفتے سے نئے الفاظ سیکھ رہے ہیں۔", "طالب علموں نے نئے الفاظ سیکھے۔", "طالب علم نئے الفاظ سیکھ رہے تھے۔", "طالب علم نئے الفاظ سیکھ چکے تھے۔", "طالب علم ایک ہفتے سے نئے الفاظ سیکھ رہے تھے۔", "طالب علم نئے الفاظ سیکھیں گے۔", "طالب علم نئے الفاظ سیکھ رہے ہوں گے۔", "طالب علم نئے الفاظ سیکھ چکے ہوں گے۔", "طالب علم ایک ہفتے سے نئے الفاظ سیکھ رہے ہوں گے۔"],
  },
  {
    subj: "It", who: "he", verb: v("rain", "rains", "raining", "rained", "rained"), rest: "", time: "since last night",
    ur: ["بارش ہوتی ہے۔", "بارش ہو رہی ہے۔", "بارش ہو چکی ہے۔", "کل رات سے بارش ہو رہی ہے۔", "بارش ہوئی۔", "بارش ہو رہی تھی۔", "بارش ہو چکی تھی۔", "کل رات سے بارش ہو رہی تھی۔", "بارش ہوگی۔", "بارش ہو رہی ہوگی۔", "بارش ہو چکی ہوگی۔", "کل رات سے بارش ہو رہی ہوگی۔"],
  },
  {
    subj: "She", who: "he", verb: v("teach", "teaches", "teaching", "taught", "taught"), rest: "the children", time: "for ten years",
    ur: ["وہ بچوں کو پڑھاتی ہے۔", "وہ بچوں کو پڑھا رہی ہے۔", "وہ بچوں کو پڑھا چکی ہے۔", "وہ دس سال سے بچوں کو پڑھا رہی ہے۔", "اس نے بچوں کو پڑھایا۔", "وہ بچوں کو پڑھا رہی تھی۔", "وہ بچوں کو پڑھا چکی تھی۔", "وہ دس سال سے بچوں کو پڑھا رہی تھی۔", "وہ بچوں کو پڑھائے گی۔", "وہ بچوں کو پڑھا رہی ہوگی۔", "وہ بچوں کو پڑھا چکی ہوگی۔", "وہ دس سال سے بچوں کو پڑھا رہی ہوگی۔"],
  },
  {
    subj: "I", who: "I", verb: v("wait", "waits", "waiting", "waited", "waited"), rest: "for the bus", time: "for twenty minutes",
    ur: ["میں بس کا انتظار کرتا ہوں۔", "میں بس کا انتظار کر رہا ہوں۔", "میں بس کا انتظار کر چکا ہوں۔", "میں بیس منٹ سے بس کا انتظار کر رہا ہوں۔", "میں نے بس کا انتظار کیا۔", "میں بس کا انتظار کر رہا تھا۔", "میں بس کا انتظار کر چکا تھا۔", "میں بیس منٹ سے بس کا انتظار کر رہا تھا۔", "میں بس کا انتظار کروں گا۔", "میں بس کا انتظار کر رہا ہوں گا۔", "میں بس کا انتظار کر چکا ہوں گا۔", "میں بیس منٹ سے بس کا انتظار کر رہا ہوں گا۔"],
  },
];

/** The verb part only, e.g. "has been eating". */
export function verbPhrase(set: TenseSet, t: number): string {
  const { verb: vb, who } = set;
  const third = who === "he";
  const be = who === "I" ? "am" : third ? "is" : "are";
  const have = third ? "has" : "have";
  const was = who === "I" || third ? "was" : "were";
  return [
    third ? vb.s : vb.base,
    `${be} ${vb.ing}`,
    `${have} ${vb.pp}`,
    `${have} been ${vb.ing}`,
    vb.past,
    `${was} ${vb.ing}`,
    `had ${vb.pp}`,
    `had been ${vb.ing}`,
    `will ${vb.base}`,
    `will be ${vb.ing}`,
    `will have ${vb.pp}`,
    `will have been ${vb.ing}`,
  ][t];
}

const perfCont = (t: number) => t % 4 === 3;
const join = (...xs: string[]) => xs.filter(Boolean).join(" ");

/** The whole English sentence in tense t. */
export const sentence = (set: TenseSet, t: number) => `${join(set.subj, verbPhrase(set, t), set.rest, perfCont(t) ? set.time : "")}.`;

/** The sentence with a gap for the verb: "He ___ lunch for an hour." */
export const gapped = (set: TenseSet, t: number) => `${join(set.subj, "___", set.rest, perfCont(t) ? set.time : "")}.`;

/** Negative: "He does not eat lunch." / "He has not eaten lunch." */
export function negative(set: TenseSet, t: number): string {
  const vp = verbPhrase(set, t);
  let neg: string;
  if (t === 0) neg = `${set.who === "he" ? "does" : "do"} not ${set.verb.base}`;
  else if (t === 4) neg = `did not ${set.verb.base}`;
  else {
    const [aux, ...more] = vp.split(" ");
    neg = join(aux, "not", ...more);
  }
  return `${join(set.subj, neg, set.rest, perfCont(t) ? set.time : "")}.`;
}

/** Question: "Does he eat lunch?" / "Has he eaten lunch?" */
export function question(set: TenseSet, t: number): string {
  const subj = set.subj === "I" ? "I" : set.subj.charAt(0).toLowerCase() + set.subj.slice(1);
  const name = /^(Ali|Mother)$/.test(set.subj) ? set.subj : subj;
  const vp = verbPhrase(set, t);
  let aux: string, rest: string;
  if (t === 0) [aux, rest] = [set.who === "he" ? "Does" : "Do", set.verb.base];
  else if (t === 4) [aux, rest] = ["Did", set.verb.base];
  else {
    const [a, ...more] = vp.split(" ");
    [aux, rest] = [a.charAt(0).toUpperCase() + a.slice(1), more.join(" ")];
  }
  return `${join(aux, name, rest, set.rest, perfCont(t) ? set.time : "")}?`;
}

/**
 * Two "look-alike" tenses for tense t: the same time with a different aspect,
 * and the same aspect at a different time. The pick turns with `turn` so questions vary.
 */
export function lookAlikes(t: number, turn = 0): [number, number] {
  const time = Math.floor(t / 4);
  const aspect = t % 4;
  const sameTime = time * 4 + ((aspect + 1 + (turn % 3)) % 4);
  const sameAspect = ((time + 1 + (turn % 2)) % 3) * 4 + aspect;
  return [sameTime, sameAspect];
}

const sortedOpts = (xs: string[]) => [...xs].sort((a, b) => a.localeCompare(b));

/** Urdu sentence shown, choose the English: the options are the same sentence in three tenses. */
export function translateQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => sentence(set, x)));
  return { q: "Choose the correct English.", prompt: { ur: set.ur[t] }, options: opts.map((en) => ({ en })), answer: opts.indexOf(sentence(set, t)) };
}

/** English sentence heard and shown, choose the Urdu: the options are look-alike Urdu sentences. */
export function toUrduQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => set.ur[x]));
  return { q: "Choose the correct Urdu.", prompt: { en: sentence(set, t) }, options: opts.map((ur) => ({ ur })), answer: opts.indexOf(set.ur[t]) };
}

/** Fill the gap with the right verb form; the Urdu sentence says which tense. */
export function gapQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => verbPhrase(set, x)));
  return { q: gapped(set, t), prompt: { ur: set.ur[t] }, options: opts.map((en) => ({ en })), answer: opts.indexOf(verbPhrase(set, t)) };
}

/** English sentence: which tense is it? */
export function nameQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => TENSES[x].name));
  return { q: "Which tense is this?", prompt: { en: sentence(set, t) }, options: opts.map((en) => ({ en })), answer: opts.indexOf(TENSES[t].name) };
}

/** Urdu sentence: which زمانہ is it? (all in Urdu) */
export function urNameQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => TENSES[x].ur));
  return { q: "یہ جملہ کس زمانے میں ہے؟", prompt: { ur: set.ur[t] }, options: opts.map((ur) => ({ ur })), answer: opts.indexOf(TENSES[t].ur) };
}

/** Which of three look-alike Urdu sentences is in زمانہ t? */
export function urPickQ(set: TenseSet, t: number, turn = 0): QuizQuestion {
  const opts = sortedOpts([t, ...lookAlikes(t, turn)].map((x) => set.ur[x]));
  return { q: `کون سا جملہ «${TENSES[t].ur}» میں ہے؟`, options: opts.map((ur) => ({ ur })), answer: opts.indexOf(set.ur[t]) };
}

/** Urdu sentence in one tense; choose the same sentence changed into tense `to`. */
export function urChangeQ(set: TenseSet, from: number, to: number, turn = 0): QuizQuestion {
  // The unchanged sentence may well be one of the wrong options: a good trap.
  const opts = sortedOpts([to, ...lookAlikes(to, turn)].map((x) => set.ur[x]));
  return { q: `اس جملے کو «${TENSES[to].ur}» میں بدلیں۔`, prompt: { ur: set.ur[from] }, options: opts.map((ur) => ({ ur })), answer: opts.indexOf(set.ur[to]) };
}

/**
 * Look-alike options for any English sentence: change one helping verb (is ↔ was, has ↔ had, does ↔ did…).
 * The changed sentence is either wrong grammar or the wrong tense for the Urdu, so it is never also right.
 */
const SWAPS: Record<string, string[]> = {
  is: ["was", "are"], are: ["were", "is"], am: ["was", "is"], was: ["is", "were"], were: ["are", "was"],
  has: ["had", "have"], have: ["had", "has"], had: ["has", "have"], does: ["did", "do"], do: ["did", "does"], did: ["does", "do"],
  "don't": ["didn't", "doesn't"], "doesn't": ["don't", "didn't"], "didn't": ["don't", "doesn't"],
  "isn't": ["wasn't", "aren't"], "aren't": ["weren't", "isn't"], "wasn't": ["isn't", "weren't"],
};
export function swapAlikes(en: string): string[] {
  const words = en.split(" ");
  const out: string[] = [];
  words.forEach((w, i) => {
    const lower = w.toLowerCase();
    for (const to of SWAPS[lower] ?? []) {
      const rep = w[0] === w[0].toUpperCase() ? to.charAt(0).toUpperCase() + to.slice(1) : to;
      const s = [...words.slice(0, i), rep, ...words.slice(i + 1)].join(" ");
      if (s !== en && !out.includes(s)) out.push(s);
    }
  });
  return out;
}
