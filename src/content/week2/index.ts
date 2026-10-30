import type { WeekContent } from "@/lib/types";
import { onDays, withPacks } from "../helpers";
import { daily } from "./daily";
import { english } from "./english";
import { math } from "./math";
import { urdu } from "./urdu";

export const week2: WeekContent = {
  urdu: withPacks(onDays(urdu, [1, 1, 2, 3, 3, 4, 5, 5, 6, 6]), daily.urdu),
  english: withPacks(onDays(english, [1, 2, 3, 4, 5, 6]), daily.english),
  math: onDays(math, [1, 2, 3, 4, 5, 6]),
  test: {
    kind: "oral",
    parts: {
      urdu: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Tell the teacher in Urdu what you eat for breakfast and what food you like.",
            "Describe your day in Urdu: when you wake up, eat, work and sleep (5 sentences).",
            "Role play at a vegetable shop: ask the price, buy 2 things, ask for change.",
            "Name 5 rooms or things in your house in Urdu.",
            "Answer: کل آپ نے کیا کیا؟ in two sentences.",
          ],
        },
        {
          title: "Reading (oral)",
          oral: true,
          items: [
            "Read these words with their vowel marks: بَس، دِل، گُل، اَبّو، بِلّی، آم، گَرْم",
            "Read these words: قلم، نمک، سڑک، شہر، بطخ، گھر، پھل، دانت",
            "Read the passage علی کا گھر aloud from the lesson.",
            "Teacher points to 5 letters. Student says whether each joins the next letter or not.",
          ],
        },
        {
          title: "Writing",
          dir: "rtl",
          items: [
            "حروف جوڑ کر لفظ لکھیں: ب + س، ج + ب، د + ل، ق + ل + م، ش + ہ + ر",
            "اعراب لگائیں: بس (زبر)، دل (زیر)، گل (پیش)، امی (تشدید)",
            "وہ نو حروف لکھیں جو اگلے حرف سے نہیں ملتے۔",
            "اپنے گھر کے بارے میں تین جملے لکھیں۔",
          ],
        },
      ],
      english: [
        {
          title: "Speaking (oral)",
          oral: true,
          items: [
            "Point to 8 parts of your body and name them in English.",
            "Name 6 animals and say one sentence about each: It is a ___. It can ___.",
            "Say: I am ___. He is ___. She is ___. We are ___. They are ___.",
            "Look around the room and say 3 sentences with in, on and under.",
          ],
        },
        {
          title: "Reading",
          oral: true,
          items: [
            "Read these words: hat, fan, hen, net, pin, big, dog, pot, sun, bug, cup, frog",
            "Read the story ‘Ali's home’ aloud from the lesson.",
            "Read: The cat is on the mat. A frog is on a log. The dog can run.",
          ],
        },
        {
          title: "Writing",
          items: [
            "Write 3 words in each family: -at, -en, -ig, -og, -un",
            "Fill in am / is / are: I __ Ali. She __ my sister. They __ at home. It __ a dog.",
            "Write the names of 6 body parts and 6 animals.",
            "Write 3 sentences about your home using in, on, under.",
          ],
        },
      ],
      math: [
        {
          title: "Numbers to 1,000",
          items: [
            "Write in figures: four hundred and sixty-two | seven hundred and five | one thousand",
            "Write in words: 318, 640, 909",
            "Fill in: 498, 499, __, __, 502    |    700, 800, __, 1,000",
            "Put > < or =:  508 __ 580    |    999 __ 1,000",
          ],
        },
        {
          title: "Add and subtract",
          items: ["38 + 47 =", "256 + 178 =", "409 + 395 =", "52 − 27 =", "81 − 46 =", "700 − 365 =", "642 − 287 ="],
        },
        {
          title: "Money and time",
          items: [
            "Milk Rs 200 + eggs Rs 300 + bread Rs 150 = ?   You give Rs 1,000. How much change?",
            "Draw a clock showing: 3 o'clock, half past 7, quarter past 9.",
            "Write in Urdu words: 2:30, 1:30, 4:15, 5:45",
            "A shop opens at 9:00 AM and closes at 6:00 PM. How many hours is it open?",
          ],
        },
      ],
    },
  },
};
