import { useEffect, useRef, useState } from "react";

export interface QuickAction {
  label: string;
  detail: string;
  run: () => void;
}

export default function CommandPalette({
  actions,
  onClose,
}: {
  actions: QuickAction[];
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const filtered = actions.filter((action) =>
    `${action.label} ${action.detail}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const run = (action: QuickAction) => {
    onClose();
    requestAnimationFrame(action.run);
  };
  return (
    <dialog
      ref={dialog}
      className="command-palette"
      aria-labelledby="command-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="command-palette__inner"
        onKeyDown={(event) => {
          if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
          event.preventDefault();
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
              "[data-command]",
            ),
          );
          const current = buttons.indexOf(
            document.activeElement as HTMLButtonElement,
          );
          buttons[
            (current + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
              buttons.length
          ]?.focus();
        }}
      >
        <header>
          <h2 id="command-title">Where would you like to go?</h2>
          <button
            className="utility-button"
            onClick={onClose}
            aria-label="Close quick navigation"
          >
            Esc
          </button>
        </header>
        <label className="sr-only" htmlFor="command-search">
          Search portfolio
        </label>
        <input
          id="command-search"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search work, experience, films…"
          onKeyDown={(event) => {
            if (event.key === "Enter" && filtered[0]) run(filtered[0]);
          }}
        />
        <div className="command-results">
          {filtered.map((action) => (
            <button data-command key={action.label} onClick={() => run(action)}>
              <span>
                {action.label}
                <small>{action.detail}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
          {!filtered.length && (
            <p className="command-empty" role="status">
              No match for “{query}”. Try “work”, “films” or “contact”.
            </p>
          )}
        </div>
        <footer>
          ↑ ↓ Navigate <span>Enter Open · Esc Close</span>
        </footer>
      </div>
    </dialog>
  );
}
