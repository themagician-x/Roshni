import { Clock } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ConfirmHost } from "@/components/ui/Confirm";
import { StatusBar } from "@/components/StatusBar";
import { today } from "@/lib/dates";
import { type DB, lessonRecord, loadDB, saveDB } from "@/lib/db";
import { AppContext, type Screen } from "@/lib/store";
import { Admin, AdminLogin, forgetAdminTab } from "@/screens/Admin";
import { Home } from "@/screens/Home";
import { LessonScreen } from "@/screens/Lesson";
import { PrintTest } from "@/screens/PrintTest";
import { Setup } from "@/screens/Setup";
import { TestScreen } from "@/screens/Test";

/** Active seconds are counted every second but written to the database in batches. */
const FLUSH_EVERY = 5;

type History = { stack: Screen[]; i: number };

const isTeacherScreen = (s: Screen) => s.name === "admin" || s.name === "admin-login" || (s.name === "print" && s.back.name === "admin");

export default function App() {
  const [db, setDb] = useState<DB | null | undefined>(undefined);
  const [date, setDate] = useState(today);
  const [history, setHistory] = useState<History>({ stack: [{ name: "home" }], i: 0 });
  const screen = history.stack[history.i];
  const activeLesson = useRef<string | null>(null);
  const lastInput = useRef(Date.now());
  const pending = useRef(0);
  const active = useRef(false);
  /** Only the student's own screens count as study time (not the teacher panel or previews). */
  const counting = useRef(true);
  const idleLimit = useRef(120);
  const loaded = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadDB().then((d) => {
      setDb(d);
      loaded.current = true;
    });
  }, []);

  // Save shortly after every change.
  useEffect(() => {
    if (!db || !loaded.current) return;
    idleLimit.current = db.settings.idleSeconds;
    const t = setTimeout(() => saveDB(db), 600);
    return () => clearTimeout(t);
  }, [db]);

  const update = useCallback((fn: (db: DB) => void) => {
    setDb((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  /** Moves the counted seconds into the database, crediting the lesson that was open. */
  const flush = useCallback(() => {
    const secs = pending.current;
    const lesson = activeLesson.current;
    if (!secs) return;
    pending.current = 0;
    const now = today();
    setDb((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      (next.days[now] ??= { seconds: 0 }).seconds += secs;
      if (lesson) lessonRecord(next, lesson).seconds += secs;
      if (now > next.maxDateSeen) next.maxDateSeen = now;
      return next;
    });
  }, []);

  // Study time: only counted while the window is focused and the student touched something recently.
  useEffect(() => {
    const mark = () => (lastInput.current = Date.now());
    const events = ["mousemove", "mousedown", "keydown", "wheel", "roshni-activity"];
    events.forEach((e) => window.addEventListener(e, mark));
    let ticks = 0;
    const id = setInterval(() => {
      setDate(today());
      active.current = counting.current && document.hasFocus() && (Date.now() - lastInput.current) / 1000 <= idleLimit.current;
      if (active.current) pending.current++;
      if (++ticks % FLUSH_EVERY === 0) flush();
    }, 1000);
    return () => {
      clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, mark));
    };
  }, [flush]);

  const go = useCallback((s: Screen) => {
    setHistory((h) => {
      let stack = [...h.stack.slice(0, h.i + 1), s];
      // Leaving the teacher panel removes it from history, so Back cannot reopen it without the password.
      if (!isTeacherScreen(s)) stack = stack.filter((x) => !isTeacherScreen(x));
      return { stack, i: stack.length - 1 };
    });
    mainRef.current?.scrollTo(0, 0);
  }, []);

  const step = useCallback((by: number) => {
    setHistory((h) => ({ ...h, i: Math.min(Math.max(h.i + by, 0), h.stack.length - 1) }));
    mainRef.current?.scrollTo(0, 0);
  }, []);

  // Hidden teacher shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (screen.name !== "admin") go({ name: "admin-login" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, screen.name]);

  const setActiveLesson = useCallback(
    (id: string | null) => {
      flush();
      activeLesson.current = id;
    },
    [flush],
  );

  const ctx = useMemo(() => (db ? { db, date, update, go, setActiveLesson } : null), [db, date, update, go, setActiveLesson]);

  if (db === undefined) return null;
  if (db === null || !ctx)
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Setup onCreate={(d) => (setDb(d), saveDB(d))} />
        </main>
      </div>
    );

  const clockWrong = date < db.maxDateSeen;
  const studentView = !["admin", "admin-login", "print"].includes(screen.name);
  counting.current = studentView && !("preview" in screen && screen.preview);

  return (
    <AppContext.Provider value={ctx}>
      {/* Only the page body scrolls, so the scrollbar never runs through the header. */}
      <div className="flex h-screen flex-col print:block print:h-auto">
        <Header
          nav={
            studentView
              ? {
                  canBack: history.i > 0,
                  canForward: history.i < history.stack.length - 1,
                  onBack: () => step(-1),
                  onForward: () => step(1),
                  onHome: () => go({ name: "home" }),
                  liveSeconds: () => (db.days[date]?.seconds ?? 0) + pending.current,
                  isActive: () => active.current,
                }
              : undefined
          }
          onStudentView={screen.name === "admin" || screen.name === "admin-login" ? () => (forgetAdminTab(), go({ name: "home" })) : undefined}
        />
        <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto print:overflow-visible">
          <div className={screen.name === "print" ? "" : "mx-auto w-full max-w-6xl px-6 py-6"}>
            {clockWrong && studentView ? (
              <ClockWarning />
            ) : screen.name === "home" ? (
              <Home />
            ) : screen.name === "lesson" ? (
              <LessonScreen key={screen.id} id={screen.id} preview={screen.preview} />
            ) : screen.name === "test" ? (
              <TestScreen key={`${screen.week}-${history.i}`} week={screen.week} preview={screen.preview} />
            ) : screen.name === "print" ? (
              <PrintTest week={screen.week} back={screen.back} />
            ) : screen.name === "admin-login" ? (
              <AdminLogin />
            ) : (
              <Admin />
            )}
          </div>
        </main>
        {studentView && <StatusBar />}
      </div>
      <ConfirmHost />
    </AppContext.Provider>
  );
}

export function Logo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="roshni-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#roshni-logo)" />
      <circle cx="20" cy="22" r="7" fill="#fffaf2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="20" y1="22" x2="20" y2="9" stroke="#fffaf2" strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${a} 20 22)`} strokeDasharray="0 9 4 20" />
      ))}
    </svg>
  );
}

function ClockWarning() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-3xl bg-card p-8 text-center shadow-sm ring-1 ring-line">
      <div className="text-5xl">
        <Clock className="mx-auto size-12 text-accent" />
      </div>
      <h1 className="mt-4 text-2xl font-bold">The computer's date looks wrong</h1>
      <p className="mt-2 text-muted">Please ask your teacher to fix the date and time on this laptop.</p>
    </div>
  );
}
