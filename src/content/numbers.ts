import type { Item } from "@/lib/types";

const UR = `ایک دو تین چار پانچ چھ سات آٹھ نو دس
گیارہ بارہ تیرہ چودہ پندرہ سولہ سترہ اٹھارہ انیس بیس
اکیس بائیس تئیس چوبیس پچیس چھبیس ستائیس اٹھائیس انتیس تیس
اکتیس بتیس تینتیس چونتیس پینتیس چھتیس سینتیس اڑتیس انتالیس چالیس
اکتالیس بیالیس تینتالیس چوالیس پینتالیس چھیالیس سینتالیس اڑتالیس انچاس پچاس
اکیاون باون ترپن چون پچپن چھپن ستاون اٹھاون انسٹھ ساٹھ
اکسٹھ باسٹھ تریسٹھ چونسٹھ پینسٹھ چھیاسٹھ سڑسٹھ اڑسٹھ انہتر ستر
اکہتر بہتر تہتر چوہتر پچھتر چھہتر ستتر اٹھہتر اناسی اسی
اکیاسی بیاسی تراسی چوراسی پچاسی چھیاسی ستاسی اٹھاسی نواسی نوے
اکیانوے بانوے ترانوے چورانوے پچانوے چھیانوے ستانوے اٹھانوے ننانوے سو`.split(/\s+/);

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function english(n: number): string {
  if (n === 100) return "one hundred";
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
}

const URDU_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const toUrduDigits = (n: number) => String(n).replace(/\d/g, (d) => URDU_DIGITS[+d]);

export const NUMBERS: Item[] = Array.from({ length: 100 }, (_, i) => ({ en: english(i + 1), ur: UR[i] }));

/** Number in Urdu words (0–100); larger numbers fall back to Urdu digits. */
export function urduNumberWord(n: number): string {
  if (n === 0) return "صفر";
  if (n >= 1 && n <= 100 && Number.isInteger(n)) return NUMBERS[n - 1].ur!;
  return toUrduDigits(n);
}
