"""Generates public/audio/<id>.mp3 for every phrase in scripts/speech.json (skips existing files).

Urdu uses Google's Urdu voice (gTTS): it pronounces whole words, where the Microsoft Urdu
voices cut word endings short. English uses Microsoft's Ava voice (edge-tts).

Needs: pip install edge-tts gTTS
Pass --redo-urdu to re-record every Urdu file.
"""
import asyncio, json, pathlib, sys
import edge_tts
from gtts import gTTS

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio"
EN_VOICE = "en-US-AvaNeural"


def urdu(text: str, path: pathlib.Path):
    gTTS(text, lang="ur", timeout=30).save(str(path))


async def one(sem, item):
    path = OUT / f"{item['id']}.mp3"
    if path.exists() and path.stat().st_size > 0:
        return 0
    async with sem:
        for attempt in range(4):
            try:
                if item["lang"] == "ur":
                    await asyncio.to_thread(urdu, item["text"], path)
                else:
                    await asyncio.wait_for(edge_tts.Communicate(item["text"], EN_VOICE, rate="-10%").save(str(path)), 60)
                if path.stat().st_size == 0:
                    raise RuntimeError("empty audio")
                return 1
            except Exception as e:  # network hiccups and rate limits
                path.unlink(missing_ok=True)
                if attempt == 3:
                    print("FAILED", item, e, file=sys.stderr)
                await asyncio.sleep(3 * (attempt + 1))
    return 0


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    items = json.loads((ROOT / "scripts" / "speech.json").read_text())
    if "--redo-urdu" in sys.argv:
        for i in items:
            if i["lang"] == "ur":
                (OUT / f"{i['id']}.mp3").unlink(missing_ok=True)
    sem = asyncio.Semaphore(4)
    made = sum(await asyncio.gather(*(one(sem, i) for i in items)))
    print(f"{made} new files, {len(items)} total")


asyncio.run(main())
