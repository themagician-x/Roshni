import { createContext, useContext } from "react";
import type { DateStr } from "./dates";
import type { DB } from "./db";

export type Screen =
  | { name: "home" }
  | { name: "lesson"; id: string; preview?: boolean }
  | { name: "test"; week: number; preview?: boolean }
  | { name: "print"; week: number; back: Screen }
  | { name: "admin-login" }
  | { name: "admin" };

export type AppCtx = {
  db: DB;
  date: DateStr;
  update: (fn: (db: DB) => void) => void;
  go: (s: Screen) => void;
  /** The lesson currently open, so study time is credited to it. */
  setActiveLesson: (id: string | null) => void;
};

export const AppContext = createContext<AppCtx | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside AppContext");
  return ctx;
}
