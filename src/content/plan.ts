import type { Subject, WeekPlan } from "@/lib/types";
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
import { week14, week15, week16, week17 } from "./exams";

const T = "https://www.taleem360.com/";
const book = (label: string, slug: string) => ({ label, url: T + slug });

const BOOKS = {
  urduKG: book("Urdu Primer (Kachi)", "pre-1-urdu-primer-punjab-text-book-2022-snc-xeo"),
  urdu1: book("Urdu Class 1", "class-1-urdu-snc-punjab-textbook-2022-pdf-iep"),
  urdu2: book("Urdu Class 2", "class-2-urdu-snc-punjab-textbook-2022-23-lfz"),
  urdu3: book("Urdu Class 3", "class-3-urdu-snc-punjab-textbook-2022-23-nkk"),
  urdu4: book("Urdu Class 4", "class-4th-urdu-pctb-snc-text-book-2022-8mq"),
  urdu5: book("Urdu Class 5", "class-5-urdu-pctb-snc-text-book-2022-za5"),
  urdu6: book("Urdu Class 6", "6th-class-urdu-book-snc-punjab-board-pdf-wnu"),
  urdu8: book("Urdu Class 8", "8th-class-urdu-textbook-in-pdf-by-punjab-board-was"),
  urdu8q: book("Urdu Qawaid o Insha (Class 8)", "8th-class-urdu-qawaid-o-insha-textbook-in-pdf-by-punjab-board-dbx"),
  urdu9: book("Urdu Class 9", "9th-class-urdu-new-snc-punjab-textbook-pdf"),
  urdu10: book("Urdu Class 10", "10th-class-urdu-new-pectaa-punjab-text-book-pdf"),
  engKG: book("English Primer (Kachi)", "pre-1-english-primer-punjab-text-book-2022-snc-uqb"),
  eng1: book("English Class 1", "class-1-english-pctb-text-book-2022-snc-zxl"),
  eng2: book("English Class 2", "class-2-english-snc-punjab-textbook-2022-23-itz"),
  eng3: book("English Class 3", "class-3-english-snc-punjab-textbook-2022-23-wce"),
  eng4: book("English Class 4", "4th-class-english-punjab-text-book-2022-23-snc-jqr"),
  eng5: book("English Class 5", "5th-class-english-snc-punjab-text-book-2022-yjx"),
  eng6: book("English Class 6", "sixth-6th-class-english-textbook-by-pctb-in-pdf-ohz"),
  eng7: book("English Class 7", "7th-class-english-textbook-in-pdf-by-punjab-board-bmy"),
  eng8: book("English Class 8", "8th-class-english-textbook-in-pdf-by-punjab-board-qsy"),
  eng9: book("English Class 9", "9th-class-english-new-snc-punjab-text-book-pdf"),
  eng10: book("English Class 10", "10th-class-english-new-text-book-2026-27-pectaa-pdf"),
  mathKG: book("Maths Primer (Kachi)", "pre-1-maths-primer-pctb-snc-textbook-2022-23-qsf"),
  math1: book("Maths Class 1", "class-1-maths-punjab-textbook-2022-23-snc-ziw"),
  math2: book("Maths Class 2", "class-2-maths-snc-punjab-textbook-2022-23-h0a"),
  math3: book("Maths Class 3", "class-3-maths-snc-pctb-textbook-2022-23-job"),
  math4: book("Maths Class 4", "4th-class-maths-punjab-text-book-2022-23-snc-els"),
  math5: book("Maths Class 5", "5th-class-maths-snc-punjab-text-book-2022-9sa"),
  math6: book("Maths Class 6", "6th-class-mathematics-english-medium-textbook-in-pdf-tvf"),
  math7: book("Maths Class 7", "7th-class-maths-punjab-text-book-snc-pdf-bmi"),
  math8: book("Maths Class 8", "8th-class-mathematics-english-medium-textbook-in-pdf-by-punjab-board-1dw"),
  math9: book("Maths Class 9", "9th-class-math-em-new-punjab-text-book-2026-pdf"),
};

export const STAGES = [
  { name: "Basic", level: "PlayGroup – Class 5", weeks: [1, 2, 3, 4] },
  { name: "Intermediate", level: "Class 6 – 8", weeks: [5, 6, 7, 8] },
  { name: "Advanced", level: "Class 9 – 10", weeks: [9, 10, 11, 12, 13] },
  { name: "Exam practice", level: "Matric tests", weeks: [14, 15, 16, 17] },
];

export const SUBJECTS: { key: Subject; name: string; nameUr: string }[] = [
  { key: "urdu", name: "Urdu", nameUr: "اردو" },
  { key: "english", name: "English", nameUr: "انگریزی" },
  { key: "math", name: "Math", nameUr: "ریاضی" },
];

export const WEEKS: WeekPlan[] = [
  {
    n: 1,
    stage: "Basic",
    title: "First words, the alphabet and counting",
    goals: {
      urdu: ["Greet, introduce himself and name his family in Urdu", "Recognise and say all letters ا to ے", "Hear the difference between similar-sounding letters"],
      english: ["Greet and introduce himself in English", "Say and write A–Z, capital and small", "Read first three-letter words, numbers 1–20 and colours"],
      math: ["Count and write 1–100", "Understand ones, tens and hundreds", "Add and subtract small numbers, count Pakistani money"],
    },
    books: [BOOKS.urduKG, BOOKS.engKG, BOOKS.mathKG, BOOKS.math1],
    content: week1,
  },
  {
    n: 2,
    stage: "Basic",
    title: "Joining letters, first reading",
    goals: {
      urdu: ["Letter shapes at the start, middle and end of a word", "اعراب: زبر، زیر، پیش، جزم، تشدید، مد", "Read and write 2–3 letter words; speak about food, home and the market"],
      english: ["Short vowel sounds and CVC words", "Sight words; I am / You are / This is / That is", "Body parts, animals, things at home"],
      math: ["Numbers up to 1,000", "Adding with carrying, subtracting with borrowing", "Money and telling the time"],
    },
    books: [BOOKS.urdu1, BOOKS.urdu2, BOOKS.eng1, BOOKS.eng2, BOOKS.math2],
    content: week2,
  },
  {
    n: 3,
    stage: "Basic",
    title: "Sentences and short stories",
    goals: {
      urdu: ["Read short sentences and stories (Class 2–3 level)", "واحد جمع، مذکر مؤنث، متضاد الفاظ", "Ask and answer questions: کیا، کب، کہاں، کیوں، کون"],
      english: ["Nouns, singular/plural, a / an / the", "Pronouns; is / am / are; has / have", "Present continuous; read short passages"],
      math: ["Multiplication tables 2–10", "Multiplication and division", "Word problems from daily life"],
    },
    books: [BOOKS.urdu3, BOOKS.eng3, BOOKS.math3],
    content: week3,
  },
  {
    n: 4,
    stage: "Basic",
    title: "Class 4–5 reading, grammar and writing",
    goals: {
      urdu: ["اسم، ضمیر، فعل، صفت", "Read Class 5 lessons; رموزِ اوقاف", "Write a short paragraph and a leave application (درخواست)"],
      english: ["Simple present and simple past", "Adjectives, prepositions, question words", "Read a Class 5 passage; write a paragraph and leave application"],
      math: ["Fractions, decimals and percentages", "HCF and LCM, unitary method", "Perimeter, area, distance and time"],
    },
    books: [BOOKS.urdu4, BOOKS.urdu5, BOOKS.eng4, BOOKS.eng5, BOOKS.math4, BOOKS.math5],
    content: week4,
  },
  {
    n: 5,
    stage: "Intermediate",
    title: "Parts of speech in depth",
    goals: {
      urdu: ["حروف کی اقسام، اسم کی اقسام (معرفہ، نکرہ)", "Read Class 6 lessons; build vocabulary", "Speak fluently about himself and his day"],
      english: ["All tenses introduced (present, past, future)", "Articles, adverbs, conjunctions", "Reading comprehension"],
      math: ["Integers and BODMAS", "Operations on fractions and decimals", "Squares and square roots"],
    },
    books: [BOOKS.urdu6, BOOKS.urdu8q, BOOKS.eng6, BOOKS.math6],
    content: week5,
  },
  {
    n: 6,
    stage: "Intermediate",
    title: "Verbs, tenses and letters",
    goals: {
      urdu: ["فعل کی اقسام: ماضی، حال، مستقبل، امر، نہی؛ مصدر", "خطوط: letters to father, brother, friend", "Reading and summary"],
      english: ["Tenses practice; modals (can, should, must)", "Letter writing", "Vocabulary building"],
      math: ["Ratio and proportion", "Percentage, profit and loss", "Simple interest, discount"],
    },
    books: [BOOKS.urdu8q, BOOKS.eng7, BOOKS.math7],
    content: week6,
  },
  {
    n: 7,
    stage: "Intermediate",
    title: "Words, idioms and stories",
    goals: {
      urdu: ["مترادف، متضاد، تشابہ الفاظ، سابقے لاحقے", "روزمرہ و محاورات", "کہانی نویسی"],
      english: ["Active and passive voice", "Direct and indirect speech (intro); punctuation", "Story writing; synonyms and antonyms"],
      math: ["Algebra: variables and expressions", "Simple equations", "Word problems with equations"],
    },
    books: [BOOKS.urdu8q, BOOKS.urdu8, BOOKS.eng8, BOOKS.math8],
    content: week7,
  },
  {
    n: 8,
    stage: "Intermediate",
    title: "Essays, applications and geometry",
    goals: {
      urdu: ["ضرب الامثال، غلط جملوں کی درستی", "درخواستیں اور مضمون نویسی", "Read a Class 8 lesson aloud fluently"],
      english: ["Dialogue writing, applications", "Paragraph and short essay", "Class 8 reading"],
      math: ["Angles, triangles, quadrilaterals", "Perimeter, area and volume", "Averages and bar graphs"],
    },
    books: [BOOKS.urdu8q, BOOKS.urdu8, BOOKS.eng8, BOOKS.math8],
    content: week8,
  },
  {
    n: 9,
    stage: "Advanced",
    title: "Matric prose and grammar",
    goals: {
      urdu: ["Class 9 prose lessons: reading, meanings, خلاصہ", "تلفظ و اعراب", "Matric-level vocabulary"],
      english: ["Tenses mastery; active and passive voice", "Comprehension of Class 9 units", "Translation: Urdu to English sentences"],
      math: ["Algebraic expressions and identities", "Basic factorisation", "Linear equations"],
    },
    books: [BOOKS.urdu9, BOOKS.eng9, BOOKS.math9],
    days: 10,
    content: week9,
  },
  {
    n: 10,
    stage: "Advanced",
    title: "Poetry, narration and real-life math",
    goals: {
      urdu: ["نظم اور غزل: reading and تشریح", "نظم کا خلاصہ", "Class 10 prose lessons"],
      english: ["Direct and indirect speech", "Sentence structure; summary writing", "Class 10 reading"],
      math: ["Simultaneous equations", "Tax, discount, zakat, profit", "Reading graphs"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 10,
    content: week10,
  },
  {
    n: 11,
    stage: "Advanced",
    title: "Matric writing",
    goals: {
      urdu: ["مضمون نویسی (Matric essays)", "خطوط، درخواستیں، مکالمہ", "کہانی اور رسید نویسی"],
      english: ["Essay, letter, application, story", "Paragraph translation Urdu ↔ English", "Dialogue writing"],
      math: ["Pythagoras theorem", "Area and volume of common shapes", "Mean, median, mode"],
    },
    books: [BOOKS.urdu10, BOOKS.urdu8q, BOOKS.eng10, BOOKS.math9],
    days: 10,
    content: week11,
  },
  {
    n: 12,
    stage: "Advanced",
    title: "Revision and mock papers",
    goals: {
      urdu: ["Revise all grammar", "Full Matric-style mock paper", "Reading and speaking assessment"],
      english: ["Revise all grammar", "Full Matric-style mock paper", "Speaking assessment"],
      math: ["Revise all topics", "Mock paper", "Daily-life calculation test"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 10,
    content: week12,
  },
  {
    n: 13,
    stage: "Advanced",
    title: "The 12 tenses",
    goals: {
      urdu: ["بارہ زمانے: حال، ماضی، مستقبل", "سادہ، جاری، مکمل، مکمل جاری", "زمانہ بدلنا اور ملتے جلتے جملے"],
      english: ["All 12 tenses in very simple words", "Positive, negative and question", "Translation Urdu ⇄ English"],
      math: ["No math this week"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10],
    days: 7,
    content: week13,
  },
  {
    n: 14,
    stage: "Exam practice",
    title: "Exam practice 1: daily tests",
    goals: {
      urdu: ["One full Urdu paper every day", "Objective, word meanings, two passages", "Essay, letter, story, tashreeh, translation"],
      english: ["One full English paper every day", "Objective, word meanings, comprehension", "Essay, letter, story, translation"],
      math: ["One Math paper every day", "Questions from all 12 weeks", "Quick sums"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 7,
    content: week14,
  },
  {
    n: 15,
    stage: "Exam practice",
    title: "Exam practice 2: daily tests",
    goals: {
      urdu: ["One full Urdu paper every day", "Objective, word meanings, two passages", "Essay, letter, story, tashreeh, translation"],
      english: ["One full English paper every day", "Objective, word meanings, comprehension", "Essay, letter, story, translation"],
      math: ["One Math paper every day", "Questions from all 12 weeks", "Quick sums"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 7,
    content: week15,
  },
  {
    n: 16,
    stage: "Exam practice",
    title: "Exam practice 3: daily tests",
    goals: {
      urdu: ["One full Urdu paper every day", "Objective, word meanings, two passages", "Essay, letter, story, tashreeh, translation"],
      english: ["One full English paper every day", "Objective, word meanings, comprehension", "Essay, letter, story, translation"],
      math: ["One Math paper every day", "Questions from all 12 weeks", "Quick sums"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 7,
    content: week16,
  },
  {
    n: 17,
    stage: "Exam practice",
    title: "Exam practice 4: daily tests",
    goals: {
      urdu: ["One full Urdu paper every day", "Objective, word meanings, two passages", "Essay, letter, story, tashreeh, translation"],
      english: ["One full English paper every day", "Objective, word meanings, comprehension", "Essay, letter, story, translation"],
      math: ["One Math paper every day", "Questions from all 12 weeks", "Quick sums"],
    },
    books: [BOOKS.urdu10, BOOKS.eng10, BOOKS.math9],
    days: 7,
    content: week17,
  },
];

export function getWeek(n: number) {
  return WEEKS.find((w) => w.n === n);
}
