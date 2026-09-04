import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AboutSection, VeoGiaoSection } from "./components/PortfolioSections";
import shot1Video from "./assets/cinematic/Shot_1.mp4";
import shot2Video from "./assets/cinematic/Shot_2.mp4";
import shot5Video from "./assets/cinematic/PhuYenShort-1.mp4";
import shot6Video from "./assets/cinematic/Shot_6.mp4";
import shot7Video from "./assets/cinematic/Shot_7.mp4";
import shotUni from "./assets/cinematic/Shot_Uni.mp4";

type PortfolioMode = "engineer" | "cinematic";
type TransitionStage = "idle" | "cover" | "reveal";
type TransitionLanding = "start" | "engineer-ending";

const MODE_COVER_MS = 1000;
const MODE_VIDEO_HOLD_MS = 1500;
const MODE_REVEAL_MS = 1000;
const MODE_SWAP_MS = MODE_COVER_MS + MODE_VIDEO_HOLD_MS;
const MODE_TRANSITION_MS = MODE_SWAP_MS + MODE_REVEAL_MS;
const MODE_TITLE_MS = 500;
const MODE_TITLE_START_MS = MODE_SWAP_MS - MODE_TITLE_MS;
const EDGE_SCROLL_THRESHOLD = 12;

const FILMS = [
  {
    src: shotUni,
    title: "Passing through",
    meta: "Hồ Chí Minh / 2025",
    format: "7:10",
  },
  {
    src: shot7Video,
    title: "After rain",
    meta: "Vietnam / 2025",
    format: "4:5",
  },
  {
    src: shot6Video,
    title: "A slower morning",
    meta: "Vietnam / 2025",
    format: "4:5",
  },
  {
    src: shot1Video,
    title: "In motion",
    meta: "Phú Yên / 2025",
    format: "16:10",
  },
  {
    src: shot2Video,
    title: "Salt and light",
    meta: "Phú Yên / 2025",
    format: "4:5",
  },
  {
    src: shot5Video,
    title: "Southbound",
    meta: "Phú Yên / 2025",
    format: "4:5",
  },
];

const PRACTICE = [
  [
    "01",
    "Observe",
    "Start with the real world: people, constraints, and the behaviour underneath the brief.",
  ],
  [
    "02",
    "Shape",
    "Turn complexity into a system that feels clear, useful, and calm to navigate.",
  ],
  [
    "03",
    "Ship",
    "Build the detail all the way through — responsive, resilient, and ready for use.",
  ],
] as const;

function VideoPlayer({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting
          ? videoRef.current?.play().catch(() => undefined)
          : videoRef.current?.pause(),
      { threshold: 0.12 },
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      loop
      muted
      playsInline
      autoPlay
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
}) {
  return (
    <div
      className="mode-switch"
      role="group"
      aria-label="Choose a portfolio view"
    >
      <button
        className={mode === "engineer" ? "is-active" : ""}
        onClick={() => onChange("engineer")}
        aria-pressed={mode === "engineer"}
      >
        <span>01</span>
        <b>Engineer</b>
      </button>
      <button
        className={mode === "cinematic" ? "is-active" : ""}
        onClick={() => onChange("cinematic")}
        aria-pressed={mode === "cinematic"}
      >
        <span>02</span>
        <b>Cinematic</b>
      </button>
    </div>
  );
}

function ScrollRail({
  fillRef,
  valueRef,
}: {
  fillRef: RefObject<HTMLElement | null>;
  valueRef: RefObject<HTMLElement | null>;
}) {
  return (
    <div className="scroll-rail" aria-hidden="true">
      <span>Scroll</span>
      <i>
        <b ref={fillRef} />
      </i>
      <em ref={valueRef}>00</em>
    </div>
  );
}

function PortfolioHero({
  mode,
  onChange,
}: {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
}) {
  const isEngineer = mode === "engineer";
  const primaryTarget = isEngineer ? "#veogiao" : "#films";

  return (
    <section
      className="hero-section"
      aria-label={
        isEngineer
          ? "Software engineering introduction"
          : "Cinematic portfolio introduction"
      }
    >
      <div className="hero-section__copy">
        <div className="hero-section__inner">
          <p className="eyebrow">
            {isEngineer ? "01 — Software engineer" : "02 — Cinematic creator"}
          </p>
          <p className="hero-section__overline">Huynh Nguyen Minh Tan</p>
          <h1>
            {isEngineer ? (
              <>
                Building clarity
                <br />
                for <i>real life.</i>
              </>
            ) : (
              <>
                Light, place,
                <br />
                and <i>the in-between.</i>
              </>
            )}
          </h1>
          <p className="hero-section__lede">
            {isEngineer
              ? "I build thoughtful products for people, teams, and complex operations — with a creative eye for the details that make software feel human."
              : "Visual notes from Vietnam: landscapes, street scenes, and small moments that deserve to be held a little longer."}
          </p>
          <div className="hero-section__actions">
            <a href={primaryTarget} className="primary-link">
              {isEngineer ? "See selected work" : "Enter the film journal"}{" "}
              <span aria-hidden>→</span>
            </a>
            <button
              className="secondary-link"
              onClick={() => onChange(isEngineer ? "cinematic" : "engineer")}
            >
              {isEngineer ? "Switch to cinematic" : "Switch to engineering"}{" "}
              <span aria-hidden>↗</span>
            </button>
          </div>
        </div>
        <div className="hero-section__coordinates">
          <span>10° 49′ N</span>
          <span>106° 38′ E</span>
        </div>
      </div>
      <div className="hero-section__media">
        <VideoPlayer src={shot5Video} className="h-full w-full object-cover" />
        <div className="hero-section__vignette" />
        <div className="hero-section__stamp">
          <span>{isEngineer ? "Systems / interfaces" : "Phú Yên, VN"}</span>
          <span>{isEngineer ? "Frontend / product" : "Film study no. 01"}</span>
        </div>
        <p className="hero-section__side-title">
          {isEngineer ? "The builder" : "The observer"}
        </p>
      </div>
      <a href={primaryTarget} className="hero-section__scroll-cue">
        <span>Scroll to explore</span>
        <i />
      </a>
    </section>
  );
}

function EngineeringIntroduction({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="engineering-intro" data-reveal>
      <div className="engineering-intro__headline">
        <p className="eyebrow">Engineering practice</p>
        <h2>
          Good software is
          <br />a <i>felt</i> experience.
        </h2>
      </div>
      <p className="engineering-intro__statement">
        The same sensitivity that draws me to a frame shapes the way I build a
        product: attention to rhythm, context, and what a person needs next.
      </p>
      <div className="practice-grid">
        {PRACTICE.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <button className="engineering-intro__link" onClick={onExplore}>
        There is another way I tell stories <span>→</span>
      </button>
    </section>
  );
}

function CinematicGallery() {
  return (
    <section id="films" className="films-section" data-reveal>
      <div className="films-intro">
        <div>
          <p className="eyebrow">Selected visual studies</p>
          <span>2025 / Vietnam</span>
        </div>
        <h2>
          Not postcards.
          <br />
          <i>Fragments of feeling.</i>
        </h2>
        <p>
          Travelling slowly enough to notice the texture of a place: light on
          concrete, a road after rain, the way a day slips into evening.
        </p>
      </div>
      <div className="films-grid">
        {FILMS.map((film, index) => (
          <article
            key={film.title}
            className={`film-card film-card--${index + 1}`}
          >
            <VideoPlayer
              src={film.src}
              className="film-card__video h-full w-full object-cover"
            />
            <div className="film-card__caption">
              <div>
                <p>
                  {film.meta} <span>— {film.format}</span>
                </p>
                <h3>{film.title}</h3>
              </div>
              <span className="film-card__arrow" aria-hidden>
                ↗
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="films-outro">
        Each frame is a small invitation to look twice.
      </p>
    </section>
  );
}

function ChapterTransition({
  onArrive,
  canTransition,
}: {
  onArrive: () => void;
  canTransition: () => boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasArrived = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasArrived.current && canTransition()) {
          hasArrived.current = true;
          onArrive();
        }
      },
      { threshold: 0.58 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [canTransition, onArrive]);

  return (
    <section
      id="chapter-transition"
      ref={sectionRef}
      className="chapter-transition"
      aria-label="Transition to the cinematic portfolio"
    >
      <div className="chapter-transition__content">
        <p className="eyebrow">End of act I</p>
        <p className="chapter-transition__index">
          01 <span>→</span> 02
        </p>
        <h2>
          Now, let the
          <br />
          <i>light lead.</i>
        </h2>
        <p>Moving from systems to stories.</p>
      </div>
    </section>
  );
}

function CinematicOutro({ onReturn }: { onReturn: () => void }) {
  return (
    <section className="cinematic-outro" data-reveal>
      <p className="eyebrow">End credits</p>
      <h2>
        The eye behind the
        <br />
        <i>interface.</i>
      </h2>
      <p>
        Behind these moving images is the same person who builds products with
        care, patience, and a feeling for the details.
      </p>
      <button className="text-link" onClick={onReturn}>
        Return to engineering <span>←</span>
      </button>
    </section>
  );
}

export default function App() {
  const [mode, setMode] = useState<PortfolioMode>("engineer");
  const [showHeader, setShowHeader] = useState(true);
  const [transitionStage, setTransitionStage] =
    useState<TransitionStage>("idle");
  const [nextMode, setNextMode] = useState<PortfolioMode>("cinematic");
  const [showTransitionTitle, setShowTransitionTitle] = useState(false);
  const transitionTimers = useRef<number[]>([]);
  const modeRef = useRef(mode);
  const transitionStageRef = useRef(transitionStage);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);
  const chapterReturnLockRef = useRef(false);
  const arrivalLockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const headerVisibleRef = useRef(true);
  const scrollRailFillRef = useRef<HTMLElement>(null);
  const scrollRailValueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    transitionStageRef.current = transitionStage;
  }, [transitionStage]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;
    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const total = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        const progress = Math.min(currentScrollY / total, 1);
        if (currentScrollY !== lastScrollY) {
          scrollDirectionRef.current =
            currentScrollY > lastScrollY ? "down" : "up";
          if (scrollDirectionRef.current === "down") {
            // A deliberate downward scroll re-arms edge-triggered switches,
            // so arrival momentum right after a mode change never fires them.
            arrivalLockRef.current = false;
          }
          if (
            modeRef.current === "engineer" &&
            scrollDirectionRef.current === "up"
          ) {
            chapterReturnLockRef.current = false;
          }
        }
        const shouldShowHeader = !(
          currentScrollY > lastScrollY && currentScrollY > 110
        );
        if (headerVisibleRef.current !== shouldShowHeader) {
          headerVisibleRef.current = shouldShowHeader;
          setShowHeader(shouldShowHeader);
        }
        scrollRailFillRef.current?.style.setProperty(
          "transform",
          `scaleY(${progress})`,
        );
        if (scrollRailValueRef.current) {
          scrollRailValueRef.current.textContent = String(
            Math.round(progress * 100),
          ).padStart(2, "0");
        }
        lastScrollY = currentScrollY;
        frameId = null;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(
    () => () => transitionTimers.current.forEach(window.clearTimeout),
    [],
  );

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        );
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [mode]);

  const changeMode = useCallback(
    (next: PortfolioMode, landing: TransitionLanding = "start") => {
      if (next === modeRef.current || transitionStageRef.current !== "idle")
        return;
      transitionTimers.current.forEach(window.clearTimeout);
      transitionTimers.current = [];
      arrivalLockRef.current = true;
      setNextMode(next);
      setShowTransitionTitle(false);
      transitionStageRef.current = "cover";
      setTransitionStage("cover");

      // Once the wipe fully covers the viewport, mount the destination underneath it.
      // The four-second video hold gives its layout and visible media time to initialize.
      const preloadTimer = window.setTimeout(() => {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        root.style.scrollBehavior = previousScrollBehavior;
        setMode(next);
        window.requestAnimationFrame(() => {
          if (landing === "engineer-ending") {
            const chapter = document.getElementById("chapter-transition");
            if (chapter) {
              const nextRoot = document.documentElement;
              const nextScrollBehavior = nextRoot.style.scrollBehavior;
              nextRoot.style.scrollBehavior = "auto";
              window.scrollTo(
                0,
                chapter.getBoundingClientRect().top + window.scrollY,
              );
              nextRoot.style.scrollBehavior = nextScrollBehavior;
            }
          }
        });
      }, MODE_COVER_MS);
      const titleTimer = window.setTimeout(
        () => setShowTransitionTitle(true),
        MODE_TITLE_START_MS,
      );
      const revealTimer = window.setTimeout(
        () => setTransitionStage("reveal"),
        MODE_SWAP_MS,
      );
      const finishTimer = window.setTimeout(() => {
        setTransitionStage("idle");
        setShowTransitionTitle(false);
      }, MODE_TRANSITION_MS);
      transitionTimers.current.push(
        preloadTimer,
        titleTimer,
        revealTimer,
        finishTimer,
      );
    },
    [],
  );

  useEffect(() => {
    const atCinematicStart = () =>
      modeRef.current === "cinematic" &&
      window.scrollY <= EDGE_SCROLL_THRESHOLD;
    const shouldReturnToEngineer = () =>
      atCinematicStart() &&
      transitionStageRef.current === "idle" &&
      !arrivalLockRef.current;
    const returnToEngineer = () => {
      if (!shouldReturnToEngineer()) return false;
      arrivalLockRef.current = true;
      chapterReturnLockRef.current = true;
      changeMode("engineer", "engineer-ending");
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (transitionStageRef.current !== "idle") {
        event.preventDefault();
        return;
      }
      if (event.deltaY >= 0 || !returnToEngineer()) return;
      event.preventDefault();
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        transitionStageRef.current !== "idle" &&
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      ) {
        event.preventDefault();
        return;
      }
      if (
        !["ArrowUp", "PageUp", "Home"].includes(event.key) ||
        !returnToEngineer()
      )
        return;
      event.preventDefault();
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartY.current;
      const endY = event.changedTouches[0]?.clientY;
      touchStartY.current = null;
      if (startY === null || endY === undefined) return;
      if (endY - startY > 44) returnToEngineer();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [changeMode]);

  const isEngineer = mode === "engineer";

  return (
    <div
      className={`tekina-page portfolio-page mode-${mode} ${transitionStage !== "idle" ? "is-transitioning" : ""} min-h-screen text-black selection:bg-sky-200`}
    >
      <header
        className={`site-header sticky top-0 z-50 transition-transform duration-500 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="site-header__inner">
          <a
            href="#top"
            className="tekina-logo text-3xl font-black leading-none sm:text-4xl"
            aria-label="Home"
          >
            Yusers
          </a>
          <div className="site-header__controls">
            <ModeSwitch mode={mode} onChange={changeMode} />
            <nav className="site-nav" aria-label="Main navigation">
              <a href={isEngineer ? "#veogiao" : "#films"}>Work</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </div>
      </header>

      <ScrollRail fillRef={scrollRailFillRef} valueRef={scrollRailValueRef} />
      <div
        className={`portfolio-wipe portfolio-wipe--${transitionStage} ${showTransitionTitle ? "portfolio-wipe--title-visible" : ""}`}
        aria-hidden="true"
      >
        <video
          key={nextMode}
          className="portfolio-wipe__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src={nextMode === "cinematic" ? shot5Video : shotUni}
            type="video/mp4"
          />
        </video>
        <span>
          <small>{nextMode === "cinematic" ? "02" : "01"}</small>
          {nextMode === "cinematic" ? "Cinematic creator" : "Engineer"}
        </span>
      </div>
      <main
        id="top"
        className={`mode-content mode-content--${mode}`}
        key={mode}
      >
        <PortfolioHero mode={mode} onChange={changeMode} />
        {isEngineer ? (
          <>
            <EngineeringIntroduction
              onExplore={() => changeMode("cinematic")}
            />
            <VeoGiaoSection />
            <AboutSection />
            <ChapterTransition
              onArrive={() => changeMode("cinematic")}
              canTransition={() =>
                scrollDirectionRef.current === "down" &&
                !chapterReturnLockRef.current &&
                !arrivalLockRef.current
              }
            />
          </>
        ) : (
          <>
            <CinematicGallery />
            <CinematicOutro onReturn={() => changeMode("engineer")} />
          </>
        )}
      </main>
      <footer className="portfolio-footer">
        <span>Huynh Nguyen Minh Tan</span>
        <span>Software engineer / cinematic creator</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
