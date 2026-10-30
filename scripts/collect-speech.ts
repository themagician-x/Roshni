// Writes every phrase the site can speak to scripts/speech.json for gen_audio.py.
import { writeFileSync } from "node:fs";
import { NUMBERS } from "@/content/numbers";
import { WEEKS } from "@/content/plan";
import { collectSpeech } from "@/lib/speech";
import { GLOSSARY } from "@/content/glossary";

// Single words too, so a word clicked in word-by-word translation can be spoken.
const all = collectSpeech([WEEKS.map((w) => w.content), NUMBERS, Object.keys(GLOSSARY).map((en) => ({ en }))]);
const list = [...all].map(([id, v]) => ({ id, ...v }));
writeFileSync(new URL("./speech.json", import.meta.url), JSON.stringify(list, null, 1));
console.log(`${list.length} phrases`);
