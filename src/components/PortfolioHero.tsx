import type { PortfolioMode } from "../hooks/usePortfolioJourney";
import { VideoPlayer } from "./VideoPlayer";
export function PortfolioHero({
  mode,
  onChange,
}: {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
}) {
  const isEngineer = mode === "engineer";
  const primaryTarget = isEngineer ? "#work" : "#films";

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
                and <i>the in‑between.</i>
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
          <span>Based in Vietnam</span>
          <a href="#contact">Let’s build something useful ↗</a>
        </div>
      </div>
      <div className="hero-section__media">
        <VideoPlayer
          src="/media/hero-loop.mp4"
          poster="/media/PhuYenShort-1.webp"
          label="Phú Yên coastal study"
          priority
        />
        <div className="hero-section__vignette" />
        <div className="hero-section__stamp">
          <span>{isEngineer ? "Systems / interfaces" : "Phú Yên, VN"}</span>
          <span>{isEngineer ? "Frontend / product" : "Film study no. 01"}</span>
        </div>
        <p className="hero-section__side-title">
          {isEngineer ? "The builder" : "The observer"}
        </p>
      </div>
    </section>
  );
}
