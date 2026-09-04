import { useEffect, useRef, useState } from 'react';
import { AboutSection, VeoGiaoSection } from './components/PortfolioSections';
import shot1Video from './assets/cinematic/Shot_1.mp4';
import shot2Video from './assets/cinematic/Shot_2.mp4';
import shot5Video from './assets/cinematic/PhuYenShort-1.mp4';
import shot6Video from './assets/cinematic/Shot_6.mp4';
import shot7Video from './assets/cinematic/Shot_7.mp4';
import shotUni from './assets/cinematic/Shot_Uni.mp4';

type PortfolioMode = 'engineer' | 'cinematic';

const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || u.pathname.split('/').pop() || null;
  } catch {
    // Local videos do not need a YouTube id.
  }
  return null;
};

const VideoPlayer = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeId = getYouTubeId(src);

  useEffect(() => {
    if (youtubeId || !videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? videoRef.current?.play().catch(() => undefined) : videoRef.current?.pause(),
      { threshold: 0.12 },
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [youtubeId]);

  if (youtubeId) {
    return (
      <div className={`relative overflow-hidden ${className ?? ''}`}>
        <iframe
          className="absolute top-0 left-1/2 h-full -translate-x-1/2"
          style={{ aspectRatio: '16 / 9' }}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&showinfo=0&playsinline=1&rel=0&fs=0&mute=1&loop=1&vq=hd2160`}
          title="Cinematic film"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="absolute inset-0 z-10" />
      </div>
    );
  }

  return (
    <video ref={videoRef} className={className} loop muted playsInline autoPlay>
      <source src={src} type={src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
    </video>
  );
};

const ModeSwitch = ({ mode, onChange }: { mode: PortfolioMode; onChange: (mode: PortfolioMode) => void }) => (
  <div className="mode-switch" role="group" aria-label="Portfolio view">
    <button className={mode === 'engineer' ? 'is-active' : ''} onClick={() => onChange('engineer')} aria-pressed={mode === 'engineer'}>
      <span>01</span> Engineer
    </button>
    <button className={mode === 'cinematic' ? 'is-active' : ''} onClick={() => onChange('cinematic')} aria-pressed={mode === 'cinematic'}>
      <span>02</span> Cinematic
    </button>
  </div>
);

function EngineerPrelude({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="world-bridge border-t-2 border-black bg-[#f7f7f2]" data-reveal>
      <div className="world-bridge__copy">
        <p className="eyebrow">The other side</p>
        <h2>Built with logic.<br />Remembered in light.</h2>
        <p>Outside the interface, I collect the landscapes, streets, and in-between moments that shape how I see a product.</p>
        <button className="text-link" onClick={onExplore}>Explore cinematic work <span aria-hidden>→</span></button>
      </div>
      <div className="world-bridge__media">
        <VideoPlayer src={shot6Video} className="h-full w-full object-cover" />
        <p>Vietnam / personal studies</p>
      </div>
    </section>
  );
}

function CinematicGallery() {
  const films = [
    { src: shotUni, title: 'Passing through', meta: 'Hồ Chí Minh / 2025' },
    { src: shot7Video, title: 'After rain', meta: 'Vietnam / 2025' },
    { src: shot6Video, title: 'A slower morning', meta: 'Vietnam / 2025' },
    { src: shot1Video, title: 'In motion', meta: 'Phú Yên / 2025' },
    { src: shot2Video, title: 'Salt and light', meta: 'Phú Yên / 2025' },
    { src: shot5Video, title: 'Southbound', meta: 'Phú Yên / 2025' },
  ];

  return (
    <section id="films" className="films-section" data-reveal>
      <div className="films-intro">
        <p className="eyebrow">Selected moments</p>
        <h2>Stories found<br />between destinations.</h2>
        <p>Small studies in rhythm, place, weather, and the people moving through them.</p>
      </div>
      <div className="films-grid">
        {films.map((film, index) => (
          <article key={film.title} className={`film-card film-card--${index + 1}`}>
            <VideoPlayer src={film.src} className="film-card__video h-full w-full object-cover" />
            <div className="film-card__caption">
              <div><p>{film.meta}</p><h3>{film.title}</h3></div>
              <span aria-hidden>↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [mode, setMode] = useState<PortfolioMode>('cinematic');
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(!(currentScrollY > lastScrollY && currentScrollY > 100));
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [mode]);

  const changeMode = (next: PortfolioMode) => {
    if (next === mode) return;
    setMode(next);
    window.setTimeout(() => document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  const isEngineer = mode === 'engineer';
  const heroKicker = isEngineer ? '01 — Software engineer' : '02 — Cinematic creator';
  const heroTitle = isEngineer ? <>Digital products<br />for the real world.</> : <>Cinematic<br />video<br />portfolio.</>;
  const heroText = isEngineer
    ? 'I build considered, production-ready experiences for complex systems, local businesses, and the people who rely on them.'
    : 'A growing collection of landscapes, streets, and stories captured through the lens.';

  return (
    <div className={`tekina-page portfolio-page mode-${mode} min-h-screen text-black selection:bg-sky-200`}>
      <header className={`site-header sticky top-0 z-50 transition-transform duration-500 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="grid h-[76px] grid-cols-[1fr_auto] items-center px-5 sm:h-[90px] sm:px-[7vw]">
          <a href="#top" className="tekina-logo text-3xl font-black leading-none sm:text-4xl" aria-label="Home">Yus trip</a>
          <div className="flex items-center gap-5">
            <ModeSwitch mode={mode} onChange={changeMode} />
            <nav className="hidden items-center gap-5 font-mono text-xs font-black uppercase sm:flex">
              <a href={isEngineer ? '#veogiao' : '#films'}>Work</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="top" className="mode-content" key={mode}>
        <section className="hero-section grid min-h-[calc(100svh-76px)] border-b-2 border-black lg:grid-cols-[.95fr_1.05fr] sm:min-h-[calc(100svh-90px)]">
          <div className="hero-section__copy flex items-center px-6 py-14 sm:px-[7vw]">
            <div className="max-w-[650px]">
              <p className="eyebrow">{heroKicker}</p>
              <h1>{heroTitle}</h1>
              <p className="hero-section__lede">{heroText}</p>
              <div className="hero-section__actions">
                <a href={isEngineer ? '#veogiao' : '#films'} className="primary-link">{isEngineer ? 'View selected work' : 'Watch the stories'} <span aria-hidden>→</span></a>
                <button className="secondary-link" onClick={() => changeMode(isEngineer ? 'cinematic' : 'engineer')}>Meet my {isEngineer ? 'cinematic side' : 'engineering side'} <span aria-hidden>↗</span></button>
              </div>
            </div>
          </div>
          <div className="hero-section__media relative min-h-[400px] overflow-hidden border-t-2 border-black lg:min-h-0 lg:border-l-2 lg:border-t-0">
            <iframe className="h-full min-h-[400px] w-full scale-[1.03]" src="https://www.youtube.com/embed/rL_pTWWOiRs?autoplay=1&rel=0&showinfo=0&mute=1&loop=1&playlist=rL_pTWWOiRs&vq=hd2160" title="Phú Yên Cinematic — Sony FX30" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <div className="hero-section__stamp"><span>{isEngineer ? 'Product-minded' : 'Phú Yên, VN'}</span><span>{isEngineer ? 'Frontend / systems' : '2025 / Sony FX30'}</span></div>
          </div>
        </section>

        {isEngineer ? <EngineerPrelude onExplore={() => changeMode('cinematic')} /> : <CinematicGallery />}
        <VeoGiaoSection />
        <AboutSection />
      </main>
      <footer className="portfolio-footer"><span>Huynh Nguyen Minh Tan</span><span>Software engineer / cinematic creator</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
