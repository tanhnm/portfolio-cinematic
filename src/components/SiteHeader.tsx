import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PortfolioMode } from "../hooks/usePortfolioJourney";
import { ErrorBoundary } from "./ui/ErrorBoundary";

const loadPalette = () => import("./CommandPalette");
const CommandPalette = lazy(loadPalette);

export function SiteHeader({
  mode,
  onChange,
  disabled,
}: {
  mode: PortfolioMode;
  onChange: (
    mode: PortfolioMode,
    landing?: "top" | "about" | "work" | "contact",
  ) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - previous;
        if (Math.abs(delta) > 8 || y < 80) setHidden(delta > 0 && y > 160);
        previous = y;
        const total = document.documentElement.scrollHeight - innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${total > 0 ? y / total : 0})`;
        frame = 0;
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k" &&
        !disabled
      ) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [disabled]);

  function navigate(target: "work" | "about" | "contact") {
    if (mode === "cinematic" && target !== "contact")
      onChange("engineer", target);
    else {
      location.hash = target;
      document.getElementById(target)?.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <header
        className={`site-header ${hidden && !open ? "site-header--hidden" : ""}`}
        inert={disabled}
      >
        <div className="site-header__inner">
          <a href="#top" className="tekina-logo" aria-label="Yusers home">
            Yusers
          </a>
          <div className="site-header__controls">
            <div
              className="mode-switch"
              role="group"
              aria-label="Choose a portfolio view"
            >
              <button
                aria-pressed={mode === "engineer"}
                className={mode === "engineer" ? "is-active" : ""}
                onClick={() => onChange("engineer")}
              >
                <span>01</span>
                <b>Engineer</b>
              </button>
              <button
                aria-pressed={mode === "cinematic"}
                className={mode === "cinematic" ? "is-active" : ""}
                onClick={() => onChange("cinematic")}
              >
                <span>02</span>
                <b>Cinematic</b>
              </button>
            </div>
            <nav className="site-nav" aria-label="Main navigation">
              {mode === "engineer" ? (
                <a href="#work">Work</a>
              ) : (
                <a href="#films">Films</a>
              )}
              {mode === "engineer" ? (
                <a href="#about">About</a>
              ) : (
                <button onClick={() => navigate("about")}>About</button>
              )}
              <a href="#contact">Contact ↗</a>
            </nav>
          </div>
          <button
            className="quick-nav-button"
            aria-label="Open quick navigation"
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+k Meta+k"
            onPointerEnter={() => {
              void loadPalette().catch(() => undefined);
            }}
            onFocus={() => {
              void loadPalette().catch(() => undefined);
            }}
            onClick={() => setOpen(true)}
          >
            <span aria-hidden="true">⌕</span>
            <span className="quick-nav-label">Jump to</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
        <div className="reading-progress" aria-hidden="true" ref={progress} />
      </header>
      {open && (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="quick-nav-loading" role="status">
                Opening navigation…
              </div>
            }
          >
            <CommandPalette
              onClose={close}
              actions={[
                {
                  label: "Selected work",
                  detail: "Automation & rural delivery",
                  run: () => navigate("work"),
                },
                {
                  label: "Experience & skills",
                  detail: "The engineer behind the work",
                  run: () => navigate("about"),
                },
                {
                  label: "Film journal",
                  detail: "Films & visual studies from Vietnam",
                  run: () => {
                    if (mode === "cinematic") location.hash = "films";
                    else onChange("cinematic");
                  },
                },
                {
                  label: "Contact",
                  detail: "Start a conversation",
                  run: () => navigate("contact"),
                },
              ]}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
