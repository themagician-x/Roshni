import { useEffect, useRef, useState } from "react";
import { type DateStr, addDays, prettyDate, toDateStr, today } from "@/lib/dates";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Themed calendar popover, used instead of the system date picker. */
export function DatePicker({ value, onChange }: { value: DateStr; onChange: (d: DateStr) => void }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => value.slice(0, 7));
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [open]);

  const [y, m] = month.split("-").map(Number);
  const first = toDateStr(new Date(y, m - 1, 1));
  const lead = (new Date(y, m - 1, 1).getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(y, m, 0).getDate();
  const cells: (DateStr | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i))];
  const shift = (by: number) => setMonth(toDateStr(new Date(y, m - 1 + by, 1)).slice(0, 7));
  const now = today();

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => (setMonth(value.slice(0, 7)), setOpen((o) => !o))}
        className={`flex w-full items-center justify-between rounded-xl border-2 bg-card px-3 py-2 text-lg transition ${open ? "border-accent" : "border-line hover:border-accent/60"}`}
      >
        {prettyDate(value, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        <svg viewBox="0 0 24 24" className="size-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-40 mt-1.5 w-80 rounded-2xl bg-card p-4 shadow-xl ring-1 ring-line">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-paper hover:text-ink">
              ‹
            </button>
            <span className="font-bold">{new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
            <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-paper hover:text-ink">
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1 text-xs font-semibold text-muted">
                {d}
              </span>
            ))}
            {cells.map((d, i) =>
              d ? (
                <button
                  key={d}
                  type="button"
                  onClick={() => (onChange(d), setOpen(false))}
                  className={`aspect-square rounded-lg text-sm font-semibold transition ${
                    d === value ? "bg-accent text-white" : d === now ? "text-accent ring-1 ring-accent hover:bg-accent-soft" : "hover:bg-accent-soft"
                  }`}
                >
                  {Number(d.slice(8))}
                </button>
              ) : (
                <span key={`e${i}`} />
              ),
            )}
          </div>
          <button type="button" onClick={() => (onChange(now), setOpen(false))} className="mt-3 w-full rounded-lg py-1.5 text-sm font-semibold text-accent hover:bg-accent-soft">
            Today
          </button>
        </div>
      )}
    </div>
  );
}
