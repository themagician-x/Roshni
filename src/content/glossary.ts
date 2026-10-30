/**
 * Urdu meanings for English words, shown under every word of English readings (word-by-word translation).
 * Keys are lower case. Word forms (went, children) have their own entries.
 */
import { WORDS } from "./glossary-words";

export const GLOSSARY: Record<string, string> = WORDS;

/** The word as written, without surrounding quotes or punctuation. */
export function bareWord(token: string): string {
  return token.replace(/[’‘]/g, "'").replace(/^[“”"'(\[]+|[”“"'),.!?:;\]…—–-]+$/g, "");
}

/** Urdu meaning of one written token, or undefined (numbers, unknown words). */
export function glossOf(token: string): string | undefined {
  const w = bareWord(token).toLowerCase();
  if (!w || /^[\d,.:/%−-]+$/.test(w) || !/[a-z]/.test(w)) return undefined;
  if (GLOSSARY[w]) return GLOSSARY[w];
  if (w.endsWith("'s") && GLOSSARY[w.slice(0, -2)]) return `${GLOSSARY[w.slice(0, -2)]} کا`;
  return undefined;
}
