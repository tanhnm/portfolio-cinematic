# Yusers — engineering, with a filmmaker’s eye

A two-chapter portfolio for Huynh Nguyen Minh Tan. The engineering chapter explains real product constraints through interactive project walkthroughs; the cinematic chapter collects visual studies from Vietnam.

The existing editorial identity is intentional: warm paper, black rules, sky accents, monospace annotations and a mix of contemporary and serif typography.

## Run locally

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Node 22.12 or newer is supported. Build with `npm run build`; preview the production output with `npm run preview -- --host 127.0.0.1`.

## Verify changes

```sh
npm run check
```

Runs Oxlint, interaction regression tests, strict TypeScript, a production build and asset budgets. `npm run format` formats project code. No API credentials or backend services are needed.

## Experience

- **Selected work:** a reporting pipeline explorer and role-based delivery product decisions, followed by expandable case studies. Deep-dive code loads on demand and prefetches on focus or pointer intent.
- **Quick navigation:** Ctrl/Cmd+K opens a searchable native dialog. Arrow keys move through results, Enter opens a destination and Escape closes it. The mobile header exposes the same menu.
- **Two chapters:** a quick horizontal cover, four-second film hold and reveal. Skip or Escape exits immediately. Reduced-motion users switch immediately and retain explicit control over film playback.
- **Media:** local posters render before video. Video sources attach only in the viewport; playback pauses offscreen or when the document is hidden. Manual pause is respected, and Save-Data/reduced-motion visitors see stills until they press Play.
- **Contact:** email links remain usable if clipboard access fails. Copy has an announced success/error state.

## Code map

```text
src/
  App.tsx                     Chapter composition and shared contact/journey sections
  hooks/usePortfolioJourney   Transition lifecycle, timing, landing and scroll guards
  components/
    PortfolioHero             Shared introduction for both chapters
    SiteHeader                Header scroll state and quick-navigation entry
    CommandPalette            Search, native dialog and focus restoration
    SelectedWork              Project briefs and interactive decision explorers
    PcToolAgentSection        On-demand automation case study
    VeoGiaoSection             On-demand delivery case study
    AboutSection              Experience, skills and expandable capstone
    CinematicGallery          On-demand film journal
    VideoPlayer               Viewport/visibility-aware media lifecycle
    ui/                       Tabs, copy feedback, error boundary and content primitives
  data/                       Typed experience and automation content
  styles/                     Self-hosted fonts and shared interaction styles
tests/                        Keyboard, media, clipboard and transition regressions
scripts/                      Reproducible media/font preparation and size budgets
```

State stays where it is used. Header scroll changes do not rerender the portfolio tree; scroll progress uses one animation frame and a transform. The portfolio content is memoized across transition-stage updates. There is no unused API/query layer or global state library.

## Assets and delivery

Original footage remains in `src/assets/cinematic/` and is not imported into the application. Web derivatives live in `public/media/`: silent H.264, 24 fps, fast-start MP4, and WebP stills. `scripts/optimize-media.py` rebuilds them using `imageio-ffmpeg` installed into `.tools` or the Python environment. It preserves full film durations; the separate hero loop is 12 seconds.

`scripts/download-fonts.py` vendors the used Google Fonts subsets and their OFL licenses into `public/fonts/`. Runtime font requests stay on the same origin.

Firebase hosting configuration caches fingerprinted bundles immutably and revalidates named media/font files after one day. The HTML entry revalidates on each load. Building changes local output; deployment is a separate action.

See [quality notes](docs/QUALITY.md) for measured improvements, verification scope and remaining limitations.
