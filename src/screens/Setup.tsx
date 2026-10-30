import { useState } from "react";
import { Logo } from "@/App";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { today } from "@/lib/dates";
import { type DB, DEFAULT_PASSWORD, DEFAULT_SETTINGS, makePassword } from "@/lib/db";
import { firstWeekState } from "@/lib/schedule";

export const input = "w-full rounded-xl border-2 border-line bg-card px-3 py-2 text-lg outline-none focus:border-accent";

/** First run: asks only for the student's name. The teacher password starts as DEFAULT_PASSWORD. */
export function Setup({ onCreate }: { onCreate: (db: DB) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [start, setStart] = useState(today);
  const [busy, setBusy] = useState(false);
  const ws = firstWeekState(start, DEFAULT_SETTINGS.studyDays);

  async function create() {
    if (!name.trim() || !age) return;
    setBusy(true);
    onCreate({
      version: 1,
      studentName: name.trim(),
      studentAge: Number(age),
      password: await makePassword(DEFAULT_PASSWORD),
      settings: DEFAULT_SETTINGS,
      current: 1,
      weeks: { 1: ws },
      lessons: {},
      days: {},
      tests: [],
      answers: [],
      maxDateSeen: today(),
      events: [{ t: Date.now(), text: `Course set up for ${name.trim()}, week 1 starts ${start}` }],
    });
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <div className="flex items-center gap-3">
        <Logo className="size-12" />
        <div>
          <h1 className="text-3xl font-bold">Welcome to Roshni</h1>
          <p className="ur text-xl text-muted" dir="rtl">
            روشنی میں خوش آمدید
          </p>
        </div>
      </div>
      <div className="mt-8 space-y-5 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-line">
        <label className="block">
          <span className="font-semibold">What is your name?</span>
          <input autoFocus className={input} placeholder="e.g. Ahmed" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div>
          <span className="font-semibold">How old are you?</span>
          <AgeSelect value={age} onChange={setAge} />
        </div>
        <div>
          <span className="font-semibold">Course starts on</span>
          <DatePicker value={start} onChange={setStart} />
        </div>
        <button type="button" disabled={busy || !name.trim() || !age} onClick={create} className="w-full rounded-full bg-accent py-3 text-lg font-semibold text-white disabled:opacity-40">
          Start learning
        </button>
      </div>
    </div>
  );
}

const AGES = Array.from({ length: 51 }, (_, i) => ({ value: String(i + 10), label: `${i + 10} years` }));

export function AgeSelect({ value, onChange, className = "" }: { value: string; onChange: (v: string) => void; className?: string }) {
  return <Select value={value} onChange={onChange} options={AGES} placeholder="Select age" className={className} />;
}
