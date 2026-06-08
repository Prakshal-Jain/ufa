---
phase: 02-content-conversion-spine
plan: 05
subsystem: ui
tags: [next, react, lenis, gsap, motion, static-export, seo, opengraph]

# Dependency graph
requires:
  - phase: 01-foundation-pipeline-motion
    provides: motion primitives (SmoothScroll/Reveal), design tokens, CTAButton/GradientText/SectionShell, fonts, build/verify guard
  - phase: 02-content-conversion-spine (plans 01-04)
    provides: typed data layer + all Wave-2 sections (Concept, HowItWorks, Lineage, MatchShowcase, PrizePool, Standings, SponsorValue, Traction, SponsorCTA, Footer, SponsorForm)
provides:
  - Static CSS-only hero header (first-screen value statement + sponsor CTA)
  - Minimal sticky nav with persistent sponsor CTA
  - Composition root (app/page.tsx) ordering all 11 beats in the locked conversion sequence, wrapped once in SmoothScroll
  - Real-site share metadata (title/description/OpenGraph)
  - Global reduced-motion CSS backstop
affects: [phase-03-static-poster-hero, phase-04-webgl-hero-beat]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Thin composition root: page.tsx imports + orders sections, owns no animation logic"
    - "CSS-only cinematic background (layered radial/linear gradients) for the Phase-2 static hero - upgradeable by Phase 3/4 without touching composition"
    - "Reduced-motion defense-in-depth: JS primitive gating + global CSS backstop"

key-files:
  created:
    - components/sections/HeroHeader.tsx
    - components/ui/Nav.tsx
  modified:
    - app/page.tsx
    - app/layout.tsx
    - app/globals.css

key-decisions:
  - "Phase-2 hero is intentionally static and CSS-only (no video/canvas/WebGL); Phases 3-4 replace/enhance it as the cinematic beat"
  - "Lineage placed as a positioning beat before the final SponsorCTA, per the plan's locked narrative order"
  - "Hero H1 inlines the value phrase ('AI agents fight for real money - live.') with the key clause in GradientText, keeping it legible if background-clip:text is unsupported"

patterns-established:
  - "Composition root: app/page.tsx is the single edit point for section order"
  - "Persistent sponsor CTA in both nav and hero keeps the ask above the fold"

requirements-completed: [MOTION-01, MOTION-03]

# Metrics
duration: 2min
completed: 2026-06-08
---

# Phase 2 Plan 5: Conversion-Spine Assembly Summary

**Full scrolling landing page assembled: a static CSS-only hero header (value statement + sponsor CTA in the first screen) leads into all 11 Wave-2 sections in the locked conversion order, wrapped once in SmoothScroll with reduced-motion as the base case and real share metadata.**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-06-08T08:56:32Z
- **Completed:** 2026-06-08T08:58:10Z
- **Tasks:** 3
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments
- Built a strong static hero header (`HeroHeader.tsx`) stating "AI agents fight for real money — live" with a CSS-only cinematic gradient background, a lede subhead, a primary `Get in touch / Sponsor` CTA, and a secondary `See how it works` anchor — all within `100svh`, legible with motion stripped.
- Added a minimal sticky `Nav` with the brand wordmark and a persistent sponsor CTA so the ask stays above the fold throughout the scroll.
- Replaced the Coming Soon placeholder with the thin composition root ordering all 11 beats (HeroHeader → Concept → HowItWorks → MatchShowcase → PrizePool → Standings → SponsorValue → Traction → Lineage → SponsorCTA → Footer), wrapped once in `SmoothScroll`.
- Updated `layout.tsx` metadata (title/description/OpenGraph) to describe the real site; removed all dead placeholder CSS and added a global `prefers-reduced-motion` backstop.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build static HeroHeader + Nav** - `d104346` (feat)
2. **Task 2: Compose app/page.tsx + mount SmoothScroll** - `7c57303` (feat)
3. **Task 3: Update layout metadata, clean globals, verify build** - `4b22ad1` (feat)

## Files Created/Modified
- `components/ui/Nav.tsx` - Sticky brand wordmark + persistent sponsor CTAButton (Server Component)
- `components/sections/HeroHeader.tsx` - Static first-screen hero: CSS-only gradient bg, H1 value statement with GradientText, lede, primary + secondary CTA, Reveal-staggered, reduced-motion safe
- `app/page.tsx` - Composition root: all 11 sections in locked order, wrapped once in SmoothScroll; placeholder removed
- `app/layout.tsx` - Real-site metadata (title/description/OG mention Ultimate Agent Fight); fonts + MotionProvider untouched; opengraph-image still emitted
- `app/globals.css` - Removed dead Coming Soon classes (.screen/.content/.wordmark/.tagline/.rule/.soon/@keyframes rise); kept @theme/resets/body; added global reduced-motion CSS backstop

## Decisions Made
- Phase-2 hero is deliberately static and CSS-only (no video/canvas/WebGL) per the locked constraint; Phases 3-4 own the cinematic upgrade.
- Followed the plan's stated locked order placing Lineage as a positioning beat directly before the final SponsorCTA.
- The hero H1 value phrase is inlined ("AI agents fight for real money — live.") rather than reading `conceptCopy.headline` verbatim, so the key clause could be wrapped in `<GradientText>`; the same substance ("fight for real money, live") and the `conceptCopy.lede` subhead are preserved.

## Deviations from Plan

None - plan executed exactly as written. All three task verification gates passed on the first run (typecheck, build, verify:build, reduced-motion smoke). No bugs, missing functionality, or blocking issues encountered.

## Issues Encountered
None. The Task 1 grep for `video|canvas|three|webgl` matched only explanatory comments in HeroHeader.tsx (the words "WebGL"/"video" describing what is intentionally absent); no actual forbidden elements are present, so the no-WebGL acceptance criterion holds.

## User Setup Required
None - no external service configuration required. (The sponsor form's Formspree endpoint remains the Phase-2 placeholder/env-driven value from prior plans; not in scope here.)

## Next Phase Readiness
- The deployed-shaped static export is now a complete, sendable landing page: hero states the value + surfaces the sponsor CTA in the first screen, every section follows in the locked conversion order, SmoothScroll eases the spine with reduced-motion as base, and the build is green with CNAME/.nojekyll intact and real share metadata.
- Phase 3 can replace `components/sections/HeroHeader.tsx` with the static-poster hero (and Phase 4 the WebGL beat) without touching the composition root or any other section — the swap point is isolated to that one file.
- No blockers.

## Known Stubs
None introduced by this plan. The hero and nav use real `data/site.ts` + `data/concept.ts` copy; sections wire to the typed data layer built in plans 02-04 (content there is clearly-marked PLACEHOLDER with honest "Season 1 — founding sponsors wanted" framing, tracked since Plan 02).

## Self-Check: PASSED

All created/modified files verified present on disk; all three task commits (d104346, 7c57303, 4b22ad1) verified in git history.

---
*Phase: 02-content-conversion-spine*
*Completed: 2026-06-08*
