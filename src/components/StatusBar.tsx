import { LockOpen } from "lucide-react";
import { STAGES, WEEKS } from "@/content/plan";
import { prettyDate } from "@/lib/dates";
import { getPhase, isDone, weekLessons } from "@/lib/schedule";
import { useApp } from "@/lib/store";

/** Slim bar along the bottom of the student screens: where he is in the course and this week's progress. */
export function StatusBar() {
  const { db, date } = useApp();
  const phase = getPhase(db, date);
  const week = Math.min(db.current, WEEKS.length);
  const stage = STAGES.find((s) => s.weeks.includes(week))!;
  const lessons = weekLessons(week);
  const done = lessons.filter((r) => isDone(db, r.lesson.id)).length;
  const pct = lessons.length ? (done / lessons.length) * 100 : 0;

  const where =
    phase.kind === "study"
      ? `Day ${Math.min(phase.day, phase.ws.studyDays)} of ${phase.ws.studyDays}`
      : phase.kind === "test"
        ? "Test day"
        : phase.kind === "revision"
          ? "Revision"
          : phase.kind === "awaiting-teacher"
            ? "Teacher test"
            : null;

  return (
    <footer className="flex h-7 shrink-0 items-center gap-4 border-t border-line bg-card px-4 text-xs text-muted select-none print:hidden">
      <span className="flex items-center gap-1.5">
        <span className="font-semibold text-accent">{stage.name} level</span>
        <span>·</span>
        <span>Week {week}</span>
        {where && (
          <>
            <span>·</span>
            <span>{where}</span>
          </>
        )}
        <span>·</span>
        <span>{prettyDate(date)}</span>
        {db.settings.unlockAll && <span className="ml-2 rounded bg-warn-soft px-1.5 font-semibold text-warn"><LockOpen className="inline-block size-[1.1em] align-[-0.15em]" /> Unlocked (testing)</span>}
      </span>
      {lessons.length > 0 && (
        <span className="ml-auto flex items-center gap-2">
          <span>This week</span>
          <span className="h-1.5 w-40 overflow-hidden rounded-full bg-paper ring-1 ring-line">
            <span className="block h-full rounded-full bg-good transition-all" style={{ width: `${pct}%` }} />
          </span>
          <span className="font-semibold tabular-nums text-ink">
            {done} / {lessons.length} lessons
          </span>
        </span>
      )}
    </footer>
  );
}
