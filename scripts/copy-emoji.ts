// Copies the Twemoji SVG for every emoji used in src/ into public/emoji.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMOJI_RE, emojiFile } from "@/lib/emoji";

const root = fileURLToPath(new URL("..", import.meta.url));
const src = join(root, "node_modules/@twemoji/svg");
const out = join(root, "public/emoji");
mkdirSync(out, { recursive: true });

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(f) ? [p] : [];
  });
}

const found = new Set<string>();
for (const f of walk(join(root, "src"))) for (const m of readFileSync(f, "utf8").matchAll(EMOJI_RE)) found.add(m[0]);

const missing: string[] = [];
for (const e of found) {
  const file = emojiFile(e);
  if (existsSync(join(src, file))) copyFileSync(join(src, file), join(out, file));
  else missing.push(`${e} (${file})`);
}
console.log(`${found.size - missing.length} emoji copied`);
if (missing.length) console.log("missing:", missing.join(", "));
