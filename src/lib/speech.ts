import type { Item, Lang } from "./types";

/** FNV-1a hash; must match the file names produced by scripts/gen_audio.py. */
export function audioId(lang: Lang, text: string): string {
  let h = 0x811c9dc5;
  const s = `${lang}|${text}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export function spokenUr(item: Item): string | undefined {
  return item.say ?? item.ur;
}

export function spokenEn(item: Item): string | undefined {
  return item.sayEn ?? item.en;
}

/** Walks any content tree and returns every phrase the voice must be able to read. */
export function collectSpeech(node: unknown, out = new Map<string, { lang: Lang; text: string }>()) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectSpeech(n, out));
  } else if (node && typeof node === "object") {
    const item = node as Item;
    const ur = typeof item.ur === "string" ? spokenUr(item) : undefined;
    const en = typeof item.en === "string" ? spokenEn(item) : undefined;
    if (ur) out.set(audioId("ur", ur), { lang: "ur", text: ur });
    if (en) out.set(audioId("en", en), { lang: "en", text: en });
    Object.values(node).forEach((v) => collectSpeech(v, out));
  }
  return out;
}
