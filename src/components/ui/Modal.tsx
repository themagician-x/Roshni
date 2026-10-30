import { type ReactNode, useEffect } from "react";

/** Themed popup window with a blurred backdrop. Esc or a click outside closes it. */
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm" onMouseDown={onClose}>
      <div role="dialog" aria-modal className="w-full max-w-md rounded-3xl bg-card p-6 shadow-2xl ring-1 ring-line" onMouseDown={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
