import { audioId } from "./speech";
import type { Lang } from "./types";

let current: HTMLAudioElement | null = null;

const VOLUME_KEY = "volume";

/** Playback volume, 0–1. Remembered on this laptop. */
export function getVolume(): number {
  try {
    const v = Number(localStorage.getItem(VOLUME_KEY) ?? "1");
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 1;
  } catch {
    return 1;
  }
}

export function setVolume(v: number) {
  try {
    localStorage.setItem(VOLUME_KEY, String(v));
  } catch {}
  if (current) current.volume = v;
}

function speakWithBrowser(lang: Lang, text: string) {
  if (typeof speechSynthesis === "undefined") return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "ur" ? "ur-PK" : "en-US";
  u.rate = 0.9;
  u.volume = getVolume();
  speechSynthesis.speak(u);
}

/** Plays the pre-generated recording; falls back to the browser voice if it is missing. */
export function play(lang: Lang, text: string): HTMLAudioElement {
  window.dispatchEvent(new Event("roshni-activity"));
  current?.pause();
  if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  const a = new Audio(`audio/${audioId(lang, text)}.mp3`);
  a.volume = getVolume();
  current = a;
  a.play().catch(() => speakWithBrowser(lang, text));
  return a;
}
