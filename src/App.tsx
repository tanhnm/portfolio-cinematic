import { lazy, memo, Suspense, useCallback, useEffect, useRef } from "react";
import { PortfolioHero } from "./components/PortfolioHero";
import { SiteHeader } from "./components/SiteHeader";
import { SelectedWork, CaseSkeleton } from "./components/SelectedWork";
import { CopyEmail, EMAIL } from "./components/ui/CopyEmail";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import {
  usePortfolioJourney,
  type PortfolioMode,
} from "./hooks/usePortfolioJourney";

const AboutSection = lazy(() => import("./components/AboutSection"));
const CinematicGallery = lazy(() => import("./components/CinematicGallery"));
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
      tabIndex={-1}
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
        <button className="chapter-button" onClick={onArrive}>
          Enter the film journal <span aria-hidden="true">→</span>
        </button>
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

function Contact() {
  return (
    <section id="contact" className="contact-section" tabIndex={-1}>
      <div>
        <p className="eyebrow">Good work starts with a conversation</p>
        <h2>
          Something in mind?
          <br />
          <i>Let’s make it real.</i>
        </h2>
      </div>
      <div className="contact-section__actions">
        <a className="contact-email" href={`mailto:${EMAIL}`}>
          {EMAIL} <span aria-hidden="true">↗</span>
        </a>
        <div>
          <CopyEmail />
          <a
            className="utility-button"
            href="https://www.linkedin.com/in/tanhnm03"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p>Ho Chi Minh, Vietnam · Software engineering & product</p>
      </div>
    </section>
  );
}

const PortfolioContent = memo(function PortfolioContent({
  mode,
  onChange,
  canTransition,
}: {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
  canTransition: () => boolean;
}) {
  const cinematic = useCallback(() => onChange("cinematic"), [onChange]);
  return (
    <>
      <PortfolioHero mode={mode} onChange={onChange} />
      {mode === "engineer" ? (
        <>
          <div className="practice-strip">
            <span>Frontend craft</span>
            <i>×</i>
            <span>Systems thinking</span>
            <i>×</i>
            <span>A filmmaker’s eye</span>
            <a href="#work">Explore the work ↓</a>
          </div>
          <SelectedWork />
          <EngineeringIntroduction onExplore={cinematic} />
          <div id="about" tabIndex={-1}>
            <ErrorBoundary>
              <Suspense fallback={<CaseSkeleton />}>
                <AboutSection />
              </Suspense>
            </ErrorBoundary>
          </div>
          <Contact />
          <ChapterTransition
            onArrive={cinematic}
            canTransition={canTransition}
          />
        </>
      ) : (
        <>
          <div id="films" tabIndex={-1}>
            <ErrorBoundary>
              <Suspense fallback={<CaseSkeleton />}>
                <CinematicGallery />
              </Suspense>
            </ErrorBoundary>
          </div>
          <CinematicOutro onReturn={() => onChange("engineer")} />
          <Contact />
        </>
      )}
    </>
  );
});

export default function App() {
  const {
    mode,
    stage,
    nextMode,
    titleVisible,
    changeMode,
    finish,
    canAutoTransition,
  } = usePortfolioJourney();
  const transitioning = stage !== "idle";
  return (
    <div
      className={`tekina-page portfolio-page mode-${mode} ${transitioning ? "is-transitioning" : ""}`}
    >
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <SiteHeader mode={mode} onChange={changeMode} disabled={transitioning} />
      <div
        className={`portfolio-wipe portfolio-wipe--${stage} ${titleVisible ? "portfolio-wipe--title-visible" : ""}`}
        aria-hidden="true"
      >
        {transitioning && (
          <video
            className="portfolio-wipe__video"
            src="/media/hero-loop.mp4"
            poster="/media/PhuYenShort-1.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          />
        )}
        <span>
          <small>{nextMode === "cinematic" ? "02" : "01"}</small>
          {nextMode === "cinematic" ? "Cinematic creator" : "Engineer"}
        </span>
      </div>
      {transitioning && (
        <button className="skip-transition" onClick={finish}>
          Skip intro <kbd>Esc</kbd>
        </button>
      )}
      <p role="status" className="sr-only">
        {transitioning
          ? `Opening ${nextMode} portfolio`
          : `${mode === "engineer" ? "Engineering" : "Cinematic"} portfolio`}
      </p>
      <main
        id="top"
        tabIndex={-1}
        className={`mode-content mode-content--${mode}`}
        inert={transitioning}
      >
        <PortfolioContent
          mode={mode}
          onChange={changeMode}
          canTransition={canAutoTransition}
        />
      </main>
      <footer className="portfolio-footer" inert={transitioning}>
        <span>Huynh Nguyen Minh Tan</span>
        <span>Made with intention. Built to be used.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
