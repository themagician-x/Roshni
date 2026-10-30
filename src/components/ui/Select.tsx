import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Option = { value: string; label: string };

/** Themed dropdown, used instead of the system <select> everywhere. */
export function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
  compact,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  /** Borderless, for use inside another control. */
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", esc);
    list.current?.querySelector("[aria-selected=true]")?.scrollIntoView({ block: "nearest" });
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-left font-semibold transition ${
          compact ? "text-sm" : `rounded-xl border-2 bg-card px-3 py-2 ${open ? "border-accent" : "border-line hover:border-accent/60"}`
        }`}
      >
        <span className={`truncate whitespace-nowrap ${current ? "" : "font-normal text-muted"}`}>{current?.label ?? placeholder}</span>
        <svg viewBox="0 0 24 24" className={`size-4 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          ref={list}
          role="listbox"
          className="absolute top-full right-0 z-40 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-xl bg-card p-1 shadow-xl ring-1 ring-line"
        >
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-1.5 text-left text-sm whitespace-nowrap ${
                    selected ? "bg-accent text-white" : "hover:bg-accent-soft"
                  }`}
                >
                  {o.label}
                  {selected && <Check className="size-4" strokeWidth={3} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
