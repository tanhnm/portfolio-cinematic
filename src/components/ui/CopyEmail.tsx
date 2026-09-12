import { useEffect, useRef, useState } from "react";

export const EMAIL = "hnmtan03@gmail.com";

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="copy-email">
      <button
        className="utility-button"
        onClick={copy}
        disabled={status === "copying"}
      >
        {status === "copied"
          ? "Copied ✓"
          : status === "copying"
            ? "Copying…"
            : "Copy email"}
      </button>
      <span
        role="status"
        className={status === "error" ? "copy-email__error" : "sr-only"}
      >
        {status === "copied"
          ? "Email address copied to clipboard."
          : status === "error"
            ? `Copy unavailable. Select ${EMAIL} or use the email link.`
            : ""}
      </span>
    </div>
  );
}
