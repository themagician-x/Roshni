import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

const TEN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const week11: WeekContent = {
  contentDays: 10,
  urdu: withPacks(onDays(urdu, TEN), daily.urdu),
  english: withPacks(onDays(english, TEN), daily.english),
  math: onDays(math, TEN),
  test: {
    kind: "written",
    parts: {
      urdu: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Give a two-minute speech: پاکستان میری محبت",
            "Read aloud the passage «محنت کی عظمت» without stopping.",
            "Explain in Urdu: what is نظم و ضبط and why is it important?",
          ],
        },
        {
          title: "سوال ۱: مضمون (کسی ایک پر)",
          dir: "rtl",
          items: ["تعلیم کی اہمیت", "سائنس اور ہماری زندگی", "پانی کی قلت"],
        },
        {
          title: "سوال ۲: خط یا درخواست",
          dir: "rtl",
          items: ["اپنے چھوٹے بھائی کو پڑھائی پر توجہ دینے کی نصیحت کا خط لکھیں۔", "ہیڈ ماسٹر صاحب کے نام فیس معافی کی درخواست لکھیں۔"],
        },
        {
          title: "سوال ۳: مکالمہ اور کہانی",
          dir: "rtl",
          items: ["دکان دار اور گاہک کے درمیان مکالمہ لکھیں۔", "کہانی لکھیں جس کا سبق ہو: «وعدے کی پابندی»"],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: ["Role play: a job interview. Answer ‘Tell me about yourself’ and ‘What is your strength?’", "Give a two-minute speech on ‘The value of education’."],
        },
        { title: "Q1: Essay (any one)", items: ["My aim in life", "A visit to a historical place", "Climate change and Pakistan"] },
        {
          title: "Q2: Letter / application",
          items: ["Write an application to the headmaster for fee concession.", "Write a letter of complaint to a company about a faulty product."],
        },
        { title: "Q3: Story and dialogue", items: ["Write the story ‘The empty pot’ with its moral.", "Write a dialogue between two friends about passing Matric as private candidates."] },
        { title: "Q4: Translation", items: ["Translate into English: تعلیم کی کوئی عمر نہیں۔ — میں دن میں کام کرتا ہوں اور رات کو پڑھتا ہوں۔ — ہمیں پانی کا بہتر انتظام کرنا چاہیے۔"] },
      ],
      math: [
        { title: "Q1: Pythagoras", items: ["The two shorter sides of a right triangle are 6 cm and 8 cm. Find the longest side.", "A 13 m ladder reaches a wall 12 m high. How far is its foot from the wall?"] },
        { title: "Q2: Circles and cylinders (π = 22/7)", items: ["Find the circumference and area of a circle of radius 7 cm.", "A water tank (cylinder) has radius 7 m and height 10 m. Find its volume."] },
        { title: "Q3: Statistics", items: ["Marks: 12, 15, 11, 18, 15, 20, 14. Find the mean, median and mode."] },
      ],
    },
  },
};
