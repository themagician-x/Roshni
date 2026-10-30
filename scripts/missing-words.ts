// Lists English words in readings and phrase lists that have no Urdu meaning yet (for word-by-word translation).
import { WEEKS } from "@/content/plan";
import { bareWord, glossOf } from "@/content/glossary";

const count = new Map<string, number>();
for (const w of WEEKS) {
  if (!w.content) continue;
  for (const s of ["urdu", "english", "math"] as const)
    for (const l of w.content[s])
      for (const b of l.blocks) {
        if ((b.type !== "reading" && b.type !== "phrases") || b.lang !== "en") continue;
        const items = b.type === "reading" ? b.lines : b.items;
        for (const it of items)
          for (const tok of (it.en ?? "").split(/\s+/)) {
            const bare = bareWord(tok);
            if (!bare || glossOf(tok) || /^[\d,.:/%−-]+$/.test(bare) || !/[a-z]/i.test(bare)) continue;
            const k = bare.toLowerCase();
            count.set(k, (count.get(k) ?? 0) + 1);
          }
      }
}
const list = [...count.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
console.log(`${list.length} words missing`);
if (process.argv.includes("--list")) console.log(list.join("\n"));
