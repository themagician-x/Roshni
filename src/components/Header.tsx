import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { Logo } from "@/App";
import { VolumeControl } from "./VolumeControl";

const icon = "size-4";

// The header doubles as the window's title bar: it drags the window, and its controls opt out.
const drag = { WebkitAppRegion: "drag" } as CSSProperties;
const noDrag = { WebkitAppRegion: "no-drag" } as CSSProperties;

/** Room left for the window buttons the OS draws over the title bar. */
function osInsets() {
  const platform = window.roshni?.platform;
  if (platform === "darwin") return "pl-[78px] pr-3";
  if (platform) return "pl-3 pr-[144px]";
  return "px-3";
}

function NavButton({ onClick, disabled, label, children }: { onClick: () => void; disabled?: boolean; label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={noDrag}
      className="flex size-7 items-center justify-center rounded-md text-muted transition hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Today's active study time, ticking every second. Grey when the student is idle. */
function LiveTimer({ seconds, isActive }: { seconds: () => number; isActive: () => boolean }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const s = seconds();
  const on = isActive();
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-xs font-semibold tabular-nums ring-1 ${on ? "bg-good-soft text-good ring-good/30" : "bg-paper text-muted ring-line"}`}
      title={on ? "Active study time today" : "Paused — move the mouse or press a key"}
    >
      <span className={`size-1.5 rounded-full ${on ? "animate-pulse bg-good" : "bg-muted/50"}`} />
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}
      {!on && <span className="font-sans text-[11px] font-normal">paused</span>}
    </div>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <button type="button" onClick={onClick} disabled={!onClick} style={onClick ? noDrag : undefined} className="flex items-center gap-1.5">
        <Logo className="size-5" />
        <span className="text-sm font-bold tracking-tight">Roshni</span>
      </button>
      <span className="ml-1.5 flex items-center gap-1 text-xs text-muted">
        · Made with
        <svg viewBox="0 0 24 24" className="size-3 fill-[#f472b6]" aria-label="love">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.3 1.1 4.1 2.3h3C14.3 6.1 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" />
        </svg>
        by Aqeel
      </span>
    </>
  );
}

type Nav = {
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
  liveSeconds: () => number;
  isActive: () => boolean;
};

/**
 * Title bar. Without `nav` it only shows the brand (setup, teacher panel, print view);
 * `onStudentView` adds the button that locks the teacher panel and returns to the student.
 */
export function Header({ nav, onStudentView }: { nav?: Nav; onStudentView?: () => void }) {
  return (
    <header className="shrink-0 border-b border-line bg-card select-none print:hidden" style={drag}>
      <div className={`flex h-10 items-center gap-0.5 ${osInsets()}`}>
        {nav && (
          <>
            <NavButton onClick={nav.onBack} disabled={!nav.canBack} label="Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={icon}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </NavButton>
            <NavButton onClick={nav.onHome} label="Today">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={icon}>
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
              </svg>
            </NavButton>
            <NavButton onClick={nav.onForward} disabled={!nav.canForward} label="Forward">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={icon}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </NavButton>
            <span className="w-2" />
          </>
        )}
        <Brand onClick={nav?.onHome} />
        {onStudentView && (
          <button
            type="button"
            onClick={onStudentView}
            style={noDrag}
            title="Lock the teacher panel and go back to the student"
            aria-label="Student view"
            className="ml-auto flex size-8 items-center justify-center rounded-md text-muted transition hover:bg-paper hover:text-ink"
          >
            <GraduationCap className="size-[18px]" />
          </button>
        )}
        {nav && (
          <div className="ml-auto flex items-center gap-2" style={noDrag}>
            {/* Volume sits after the timer: the timer changes width when it shows "paused". */}
            <LiveTimer seconds={nav.liveSeconds} isActive={nav.isActive} />
            <VolumeControl />
          </div>
        )}
      </div>
    </header>
  );
}
