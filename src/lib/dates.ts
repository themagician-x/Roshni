/** Local calendar dates as "YYYY-MM-DD" strings. */
export type DateStr = string;

const pad = (n: number) => String(n).padStart(2, "0");

export function toDateStr(d: Date): DateStr {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const today = (): DateStr => toDateStr(new Date());

function parse(s: DateStr): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}

export function addDays(s: DateStr, n: number): DateStr {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

export function diffDays(a: DateStr, b: DateStr): number {
  return Math.round((parse(a).getTime() - parse(b).getTime()) / 86400000);
}

export const weekday = (s: DateStr) => parse(s).getDay();

export function prettyDate(s: DateStr, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }, locale = "en-GB") {
  return parse(s).toLocaleDateString(locale, opts);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${m % 60} min`;
}
