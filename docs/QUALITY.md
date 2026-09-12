# Quality review — September 12, 2026

## Scope and baseline

Reviewed the React/Vite entry, all application components, both style sheets, TypeScript configuration, dependencies, HTML metadata, hosting configuration and local assets. Existing uncommitted automation and experience content was retained and reorganized.

This is a static portfolio. There are no application API requests, data tables or transactional forms to cache, paginate or validate. Axios and TanStack Query were unused and removed. Interactive architecture examples describe project decisions; they do not connect to factory or delivery systems.

## Measured changes

| Item                                   |                    Before |        After |
| -------------------------------------- | ------------------------: | -----------: |
| Initial JavaScript, Vite output        |                 277.35 KB | about 219 KB |
| Initial JavaScript, Vite gzip estimate |                  83.56 KB |  about 69 KB |
| Original films imported into build     |                 361.45 MB |            0 |
| Delivered MP4s, including hero loop    | 361.45 MB of source films |     13.73 MB |
| Hero source                            |                  95.79 MB |     585.8 KB |
| Initial CSS, Vite output               |                  51.78 KB |  about 65 KB |

The CSS increase supports the new project explorers, responsive layouts, dialog and interaction states. Lazy-loaded chunks are additional downloads when their features are needed. These are artifact sizes, not field Core Web Vitals results.

Budgets fail the check command when initial JavaScript exceeds 85 KB gzip, hero video exceeds 750 KB, or total MP4s exceed 16 MB. The same check verifies fast-start metadata placement, film posters and the absence of original MP4 imports in the bundled asset folder.

## Fixes

- Replaced unconditional video autoplay and the permanently mounted hidden transition video with a controlled media lifecycle.
- Removed the zoom restriction and restored a visible keyboard focus system and skip link.
- Preserved Engineer-first navigation, the cinematic hold and return to the closing chapter. Added Skip/Escape and immediate reduced-motion switching.
- Replaced broken Cinematic → About navigation with a chapter-aware landing.
- Added a permanent About anchor around its lazy boundary, so navigation remains meaningful while the chunk loads.
- Added semantic tabs with roving focus, Arrow/Home/End support and panel relationships.
- Added clipboard failure recovery, announced feedback and timer cleanup.
- Added a native modal search dialog with focus restoration and a useful no-results state.
- Added local error boundaries and recovery instructions for interrupted content loading.
- Enabled strict TypeScript and separated content data, media, navigation and transition logic.
- Updated compatible dependency security fixes. The latest install/audit in this work reported zero known vulnerabilities.

## Verification

`npm run check` passed lint, 12 interaction tests, TypeScript, production build and asset budgets. Tests cover keyboard tab navigation, deferred video loading, viewport pause, explicit pause, reduced motion, Save-Data, media error feedback, clipboard outcomes, early transition skip, duplicate transition guards and timer cleanup.

Browser checks cover the main layout at 320, 375, 768, 1024, 1440 and 1920 px, opening both lazy case studies, long automation identifiers on narrow screens, project tabs, quick navigation search and empty results, and the two chapter views. Native keyboard and playback behavior are also checked on the local build.

The production walkthrough verified working autoplay, detached offscreen film sources, Skip/Escape restoring scroll, and Cinematic → About restoring focus to the correct section. It also caught and fixed the cinematic grid's aspect-ratio minimum-width overflow at 320 px: all seven cards now measure 278 px inside the available 314 px viewport content width. The final browser console contained no errors or warnings. Both About and Films retain their anchor targets while lazy content loads.

## Practical limits

- No production deployment was performed. Firebase cache headers are configuration changes until deployed.
- LCP, INP and CLS have not been established from real visitors or a controlled Lighthouse mobile run. Validate them on the deployed origin under representative network and CPU conditions; do not infer them from bundle size.
- Browser layout checks and semantic tests are not a full screen-reader or WCAG conformance certification. Safari/iOS and real devices remain a useful release check.
- Project metrics and work history are portfolio content supplied by the existing project. Their original evidence was not independently audited here. The automation case study’s unlogged-baseline disclaimer and the separate experience timeline’s time-saved claim should be reconciled with source evidence before public recruiting use.
- Web videos intentionally remove audio and compress source footage for background/gallery use. Original files remain available for future quality adjustments.
