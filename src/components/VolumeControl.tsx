import { useEffect, useRef, useState } from "react";
import { getVolume, play, setVolume } from "@/lib/audio";

const STEPS = 10;

function VolumeIcon({ level, className = "size-4" }: { level: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {level === 0 ? (
        <>
          <path d="m22 9-6 6" />
          <path d="m16 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          {level > 0.5 && <path d="M19 5a10 10 0 0 1 0 14" />}
        </>
      )}
    </svg>
  );
}

/** Speaker button in the top bar; opens a slider that sets the volume of all lesson audio. */
export function VolumeControl() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(getVolume);
  const [beforeMute, setBeforeMute] = useState(1);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [open]);

  const change = (v: number) => {
    v = Math.round(v * STEPS) / STEPS;
    setLevel(v);
    setVolume(v);
  };

  return (
    <div ref={box} className="relative" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Volume"
        className={`flex size-7 items-center justify-center rounded-md transition hover:bg-paper ${open ? "bg-paper text-ink" : level === 0 ? "text-bad" : "text-muted hover:text-ink"}`}
      >
        <VolumeIcon level={level} />
      </button>
      {open && (
        <div className="absolute top-9 right-0 z-30 flex w-64 items-center gap-2 rounded-xl bg-card p-3 shadow-xl ring-1 ring-line">
          <button
            type="button"
            onClick={() => {
              if (level > 0) {
                setBeforeMute(level);
                change(0);
              } else change(beforeMute || 1);
            }}
            aria-label={level === 0 ? "Unmute" : "Mute"}
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg hover:bg-paper ${level === 0 ? "text-bad" : "text-accent"}`}
          >
            <VolumeIcon level={level} className="size-5" />
          </button>
          <div className="flex flex-1 items-center justify-between" role="group" aria-label="Volume level">
            {Array.from({ length: STEPS }, (_, i) => {
              const v = (i + 1) / STEPS;
              const on = level >= v - 0.001;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    change(v);
                    // A short sample so the new loudness can be heard.
                    play("en", "one");
                  }}
                  aria-label={`${Math.round(v * 100)}%`}
                  className="group/dot flex h-6 w-3.5 items-center justify-center"
                >
                  <span className={`size-2.5 rounded-full transition group-hover/dot:scale-125 ${on ? "bg-accent" : "bg-line group-hover/dot:bg-muted/40"}`} />
                </button>
              );
            })}
          </div>
          <span className="w-9 text-right text-xs font-semibold tabular-nums text-muted">{Math.round(level * 100)}%</span>
        </div>
      )}
    </div>
  );
}
