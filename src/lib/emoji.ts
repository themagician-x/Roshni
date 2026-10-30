/** Emoji are shown as bundled Twemoji SVGs (public/emoji), because Windows 10 lacks many emoji glyphs. */
export const EMOJI_RE = /\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*|[0-9#*]️?⃣/gu;

export function emojiFile(emoji: string): string {
  const cps = [...emoji].map((c) => c.codePointAt(0)!.toString(16));
  // Twemoji drops the variation selector unless the sequence has a zero-width joiner.
  const parts = cps.includes("200d") ? cps : cps.filter((c) => c !== "fe0f");
  return `${parts.join("-")}.svg`;
}
