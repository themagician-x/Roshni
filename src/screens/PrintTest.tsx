import { Printer } from "lucide-react";
import { SUBJECTS, WEEKS } from "@/content/plan";
import { type Screen, useApp } from "@/lib/store";

export function PrintTest({ week, back }: { week: number; back: Screen }) {
  const { db, go } = useApp();
  const plan = WEEKS[week - 1];
  const test = plan.content!.test;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 print:p-0">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <button type="button" onClick={() => go(back)} className="text-sm text-muted hover:text-accent">
          ← Back
        </button>
        <button type="button" onClick={() => window.print()} className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white">
          <Printer className="inline-block size-[1.1em] align-[-0.15em]" /> Print
        </button>
      </div>

      <header className="border-b-2 border-ink pb-4">
        <h1 className="text-3xl font-bold">
          Roshni — Week {week} {test.kind === "oral" ? "Oral" : "Written"} Test
        </h1>
        <p className="text-muted">{plan.title}</p>
        <div className="mt-4 grid grid-cols-3 gap-6 text-sm">
          <span>Name: {db.studentName}</span>
          <span>Date: ____________________</span>
          <span>Marks: ________ / ________</span>
        </div>
      </header>

      {SUBJECTS.filter((s) => test.parts[s.key].length).map((s) => (
        <section key={s.key} data-subject={s.key} className="mt-8">
          <h2 className="flex items-baseline justify-between border-b border-line pb-1 text-2xl font-bold text-accent">
            {s.name}
            <span className="ur text-2xl" dir="rtl">
              {s.nameUr}
            </span>
          </h2>
          {test.parts[s.key].map((part, pi) => (
            <div key={pi} className="mt-4 break-inside-avoid">
              <h3 className="font-semibold">
                {String.fromCharCode(65 + pi)}. {part.title}
                {part.oral && <span className="ml-2 rounded bg-paper px-2 py-0.5 text-xs font-normal text-muted">teacher asks, student answers</span>}
              </h3>
              <ol className={`mt-2 list-decimal space-y-3 ps-6 ${part.dir === "rtl" ? "ur pe-6 text-xl" : "text-lg"}`} dir={part.dir}>
                {part.items.map((item, i) => (
                  <li key={i}>
                    <div className="flex items-start justify-between gap-4">
                      <span>{item}</span>
                      {part.oral && (
                        <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted" dir="ltr">
                          <span className="inline-block size-3.5 border border-ink/50" /> pass <span className="ml-2 inline-block size-3.5 border border-ink/50" /> retry
                        </span>
                      )}
                    </div>
                    {!part.oral && <div className="mt-6 border-b border-dotted border-line" />}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
