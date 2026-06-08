---
phase: 02-content-conversion-spine
plan: 02
subsystem: ui
tags: [react, nextjs, server-components, motion, content-sections]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: SectionShell/GradientText UI primitives, Reveal/ScrollParallax motion primitives, --ufa-* design tokens, --font-display/--font-body
  - phase: 02-content-conversion-spine (plan 01)
    provides: typed data/concept.ts (conceptCopy, howItWorks, lineage, lineageStatement) and data/site.ts anchors
provides:
  - Concept explainer section (what UFA is) rendering conceptCopy
  - HowItWorks 4-step match-format section rendering howItWorks
  - Lineage UFC -> UFB -> UFA brand-beat section rendering lineage + lineageStatement
affects: [02-content-conversion-spine plan 05 (page assembly)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server-Component sections that compose client motion primitives as children (no 'use client' at section level)"
    - "Data-driven sections: copy from data/*.ts, inline style objects with --ufa-* vars (matches primitive convention)"

key-files:
  created:
    - components/sections/Concept.tsx
    - components/sections/HowItWorks.tsx
    - components/sections/Lineage.tsx
  modified: []

key-decisions:
  - "Sections stay Server Components; Reveal/ScrollParallax imported as client children (no animation reimplemented)"
  - "Emphasis on the final UFA lineage node via GradientText to make the brand beat land"

patterns-established:
  - "Section = SectionShell wrapper + Reveal-staggered content + inline --ufa-* styles"
  - "Reduced-motion is the base case: every section reads fully with motion stripped"

requirements-completed: [CONCEPT-01, CONCEPT-02, CONCEPT-03]

# Metrics
duration: 2min
completed: 2026-06-08
---

# Phase 02 Plan 02: Narrative-Foundation Sections Summary

**Concept, HowItWorks (4-step match format), and Lineage (UFC -> UFB -> UFA) sections as data-driven Server Components reusing Phase-1 UI + motion primitives, fully legible with motion stripped.**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-06-08T08:52:20Z
- **Completed:** 2026-06-08T08:53:26Z
- **Tasks:** 3
- **Files modified:** 3 (created)

## Accomplishments
- Concept section renders the plain-language UFA explainer (interrogate + fight for credits/money) from `conceptCopy`, with the key phrase in `GradientText` and clarity bullets.
- HowItWorks section renders the 4 match-format steps as a responsive auto-fit grid of cards, each staggered via `Reveal`, layout reserved to avoid CLS.
- Lineage section renders the UFC -> UFB -> UFA chain with the final UFA node emphasized via `GradientText`, plus the "UFA is the UFC of AI." statement, under a transform-only `ScrollParallax`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Concept section (CONCEPT-01)** - `aae2bcc` (feat)
2. **Task 2: Build HowItWorks section (CONCEPT-02)** - `886b83a` (feat)
3. **Task 3: Build Lineage section (CONCEPT-03)** - `0a6f827` (feat)

## Files Created/Modified
- `components/sections/Concept.tsx` - "What is UFA" explainer; renders conceptCopy headline/lede/points; SectionShell + GradientText + Reveal.
- `components/sections/HowItWorks.tsx` - 4-step match-format grid of cards from howItWorks; SectionShell + per-card Reveal stagger.
- `components/sections/Lineage.tsx` - UFC -> UFB -> UFA chain with GradientText emphasis on UFA + lineageStatement; SectionShell + ScrollParallax + Reveal.

## Decisions Made
- Kept all three sections as Server Components, importing Reveal/ScrollParallax as client children rather than marking the sections "use client" — keeps animation logic entirely inside the Phase-1 primitives (no reimplementation).
- Used the design display font via `var(--font-display)` and section/heading scale via `--ufa-type-*` tokens to match the established cinematic type system.

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three narrative sections are built and type-clean; ready for Plan 05 to assemble into `app/page.tsx`.
- No blockers. Section ids (`concept`, `how-it-works`) wired from `site.anchors` for nav/CTA targeting; Lineage has no anchor by design (not a CTA target).

## Self-Check: PASSED

- FOUND: components/sections/Concept.tsx
- FOUND: components/sections/HowItWorks.tsx
- FOUND: components/sections/Lineage.tsx
- FOUND commit: aae2bcc
- FOUND commit: 886b83a
- FOUND commit: 0a6f827
- `npm run typecheck` exits 0
- No direct `motion/react` imports in components/sections/ (animation not reimplemented)

---
*Phase: 02-content-conversion-spine*
*Completed: 2026-06-08*
