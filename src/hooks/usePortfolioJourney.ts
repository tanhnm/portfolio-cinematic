import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type PortfolioMode = "engineer" | "cinematic";
type Landing = "top" | "chapter-transition" | "about" | "work" | "contact";
const COVER_MS = 350;
const HOLD_MS = 4000;
const REVEAL_MS = 350;

export function usePortfolioJourney() {
  const [mode, setMode] = useState<PortfolioMode>(() =>
    location.hash === "#films" ? "cinematic" : "engineer",
  );
  const [stage, setStage] = useState<"idle" | "cover" | "reveal">("idle");
  const [nextMode, setNextMode] = useState<PortfolioMode>("cinematic");
  const [titleVisible, setTitleVisible] = useState(false);
  const current = useRef(mode);
  const transitioning = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pending = useRef<{ mode: PortfolioMode; landing: Landing } | null>(
    null,
  );
  const arrivalLock = useRef(true);
  const chapterLock = useRef(false);
  const downward = useRef(false);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    if (pending.current) {
      current.current = pending.current.mode;
      setMode(pending.current.mode);
    }
    transitioning.current = false;
    setStage("idle");
    setTitleVisible(false);
  }, []);

  const changeMode = useCallback(
    (next: PortfolioMode, landing: Landing = "top") => {
      if (transitioning.current || next === current.current) return;
      pending.current = { mode: next, landing };
      arrivalLock.current = true;
      chapterLock.current = landing === "chapter-transition";
      downward.current = false;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }
      transitioning.current = true;
      setNextMode(next);
      setStage("cover");
      setTitleVisible(false);
      timers.current = [
        setTimeout(() => {
          current.current = next;
          setMode(next);
        }, COVER_MS),
        setTimeout(() => setTitleVisible(true), COVER_MS + HOLD_MS - 900),
        setTimeout(() => setStage("reveal"), COVER_MS + HOLD_MS),
        setTimeout(finish, COVER_MS + HOLD_MS + REVEAL_MS),
      ];
    },
    [finish],
  );

  useLayoutEffect(() => {
    if (!pending.current) return;
    const landing = pending.current.landing;
    document
      .getElementById(landing)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
    // Keep URL and visible chapter consistent without creating artificial history entries.
    history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}#${mode === "cinematic" ? "films" : landing}`,
    );
  }, [mode]);

  useEffect(() => {
    if (stage === "idle" && pending.current) {
      const target = document.getElementById(pending.current.landing);
      (target ?? document.getElementById("top"))?.focus({
        preventScroll: true,
      });
      pending.current = null;
    }
    if (stage === "idle") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [stage, finish]);

  useEffect(() => {
    let lastY = window.scrollY;
    let touchY = 0;
    const scroll = () => {
      if (transitioning.current) {
        lastY = window.scrollY;
        return;
      }
      const delta = window.scrollY - lastY;
      if (Math.abs(delta) > 2) {
        downward.current = delta > 0;
        arrivalLock.current = false;
        if (delta < 0) chapterLock.current = false;
      }
      lastY = window.scrollY;
    };
    const returnAtEdge = () => {
      if (
        current.current === "cinematic" &&
        window.scrollY <= 2 &&
        !arrivalLock.current &&
        !transitioning.current &&
        !document.querySelector("dialog[open]") &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        changeMode("engineer", "chapter-transition");
    };
    const wheel = (event: WheelEvent) => {
      if (event.deltaY < -12) returnAtEdge();
    };
    const touchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const touchEnd = (event: TouchEvent) => {
      if ((event.changedTouches[0]?.clientY ?? 0) - touchY > 60) returnAtEdge();
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [changeMode]);

  const canAutoTransition = useCallback(
    () =>
      downward.current &&
      !chapterLock.current &&
      !arrivalLock.current &&
      !transitioning.current &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !document.querySelector("dialog[open]"),
    [],
  );
  return {
    mode,
    stage,
    nextMode,
    titleVisible,
    changeMode,
    finish,
    canAutoTransition,
  };
}
