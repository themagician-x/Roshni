import { useEffect, useState } from "react";

type Request = { title: string; message?: string; confirmLabel?: string; danger?: boolean; resolve: (ok: boolean) => void };

let show: ((r: Request) => void) | null = null;

/** Themed replacement for window.confirm. Resolves true when the user confirms. */
export function confirmDialog(opts: Omit<Request, "resolve">): Promise<boolean> {
  return new Promise((resolve) => (show ? show({ ...opts, resolve }) : resolve(window.confirm(opts.title))));
}

/** Renders the dialog; mounted once near the root of the app. */
export function ConfirmHost() {
  const [req, setReq] = useState<Request | null>(null);

  useEffect(() => {
    show = setReq;
    return () => {
      show = null;
    };
  }, []);

  useEffect(() => {
    if (!req) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(false);
      if (e.key === "Enter") finish(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!req) return null;
  function finish(ok: boolean) {
    req!.resolve(ok);
    setReq(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm" onMouseDown={() => finish(false)}>
      <div role="alertdialog" aria-modal className="w-full max-w-md rounded-3xl bg-card p-6 shadow-2xl ring-1 ring-line" onMouseDown={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold">{req.title}</h2>
        {req.message && <p className="mt-2 text-muted">{req.message}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => finish(false)} className="rounded-full border border-line px-5 py-2 font-semibold hover:bg-paper">
            Cancel
          </button>
          <button type="button" autoFocus onClick={() => finish(true)} className={`rounded-full px-5 py-2 font-semibold text-white ${req.danger ? "bg-bad" : "bg-accent"}`}>
            {req.confirmLabel ?? "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}
