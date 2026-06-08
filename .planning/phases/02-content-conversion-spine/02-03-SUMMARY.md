---
phase: 02-content-conversion-spine
plan: 03
subsystem: content-sections
tags: [sections, showcase, prize, standings, mobile-safe, reduced-motion]
requires:
  - "components/ui/SectionShell.tsx (Phase 1)"
  - "components/ui/GradientText.tsx (Phase 1)"
  - "components/motion/Reveal.tsx (Phase 1)"
  - "data/matches.ts, data/prizes.ts, data/standings.ts, data/site.ts (Plan 02-01)"
provides:
  - "components/sections/MatchShowcase.tsx — match/spectacle proof grid"
  - "components/sections/PrizePool.tsx — concrete stakes display"
  - "components/sections/Standings.tsx — living-league teaser table"
affects:
  - "Plan 02-05 (page assembly) consumes these three section components"
tech-stack:
  added: []
  patterns:
    - "Poster-first, CLS-safe media frames (reserved aspect-ratio)"
    - "Mobile-safe <video>: muted/loop/playsInline/preload=none, no autoplay sound"
    - "Server Components; all entrance motion delegated to Phase-1 Reveal primitive"
key-files:
  created:
    - "components/sections/MatchShowcase.tsx"
    - "components/sections/PrizePool.tsx"
    - "components/sections/Standings.tsx"
  modified: []
decisions:
  - "Video rendered only when match.clip present; poster-only card is the safe default"
  - "Standings is a static snapshot table (no sorting/live data) per no-backend constraint"
metrics:
  duration: "~1.5min"
  tasks: 3
  files: 3
  completed: "2026-06-08"
---

# Phase 2 Plan 03: Proof & Stakes Sections Summary

Built the three credibility-engine sections — MatchShowcase, PrizePool, and Standings — as self-contained Server Components that render typed placeholder data from Plan 02-01, reuse Phase-1 primitives, and stay mobile-safe and reduced-motion-legible by construction.

## What Was Built

- **MatchShowcase** (`components/sections/MatchShowcase.tsx`): Responsive `auto-fit` grid of match cards. Each card has a 16/9 media frame (reserved `aspectRatio` → no CLS) showing a lazy poster `<img>`, or a `muted loop playsInline preload="none"` `<video poster=...>` when `match.clip` exists — never autoplaying sound. Missing `/media` files 404 gracefully. Caption shows title (accent label), "A vs B" (display font), and result (muted). Wrapped in staggered `Reveal`.
- **PrizePool** (`components/sections/PrizePool.tsx`): Leads with the `totalCredits` headline rendered very large in `GradientText` with a subtle `--ufa-glow` box-shadow, followed by a responsive grid of concrete `prizePool` tiers (amount in accent, label in display font, optional note).
- **Standings** (`components/sections/Standings.tsx`): Semantic `<table>` (Rank/Agent/W/L/Rating) of `standings` rows inside an `overflowX: auto` wrapper for mobile, top rank emphasized in accent with tabular numerics, plus the honest `standingsNote` snapshot framing. Single `Reveal` wrapping the block.

All three carry their `site.anchors.*` id, reuse `SectionShell` + `Reveal`, and contain no `motion/react` import (motion comes only from Phase-1 primitives, so reduced-motion is the base case via `Reveal`'s passthrough).

## Verification

- `npx tsc --noEmit` exits 0 (per-task) and `npm run typecheck` exits 0 (final).
- grep checks pass: data-module imports, `playsInline`/`loading="lazy"`, `aspectRatio`, `prizePool`, `<table`, `SectionShell`.
- No `motion/react` import anywhere in `components/sections/`.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- FOUND: components/sections/MatchShowcase.tsx
- FOUND: components/sections/PrizePool.tsx
- FOUND: components/sections/Standings.tsx
- FOUND commit 084ae05 (MatchShowcase)
- FOUND commit 935b9a7 (PrizePool)
- FOUND commit 51ab78b (Standings)

## Commits

- `084ae05` feat(02-03): build MatchShowcase section
- `935b9a7` feat(02-03): build PrizePool section
- `51ab78b` feat(02-03): build Standings teaser section
