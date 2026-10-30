import { Fragment } from "react";
import { EMOJI_RE, emojiFile } from "@/lib/emoji";

/** Renders text, swapping every emoji for its bundled image. */
export function Emo({ text, className = "" }: { text: string; className?: string }) {
  const parts: (string | { e: string })[] = [];
  let last = 0;
  for (const m of text.matchAll(EMOJI_RE)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ e: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <img key={i} src={`emoji/${emojiFile(p.e)}`} alt={p.e} draggable={false} className={`inline-block h-[1.15em] w-[1.15em] align-[-0.2em] ${className}`} />
        ),
      )}
    </>
  );
}
