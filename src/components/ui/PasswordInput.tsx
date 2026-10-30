import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";

/** Password field with an eye button that shows or hides what was typed. */
export function PasswordInput({ className = "", ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [shown, setShown] = useState(false);
  return (
    <div className={`flex items-center rounded-xl border-2 border-line bg-card focus-within:border-accent ${className}`}>
      <input {...props} type={shown ? "text" : "password"} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-lg outline-none" />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        // Keep the cursor in the field, so Enter still submits after toggling.
        onMouseDown={(e) => e.preventDefault()}
        tabIndex={-1}
        aria-label={shown ? "Hide password" : "Show password"}
        className="flex size-10 shrink-0 items-center justify-center text-muted hover:text-ink"
      >
        {shown ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
