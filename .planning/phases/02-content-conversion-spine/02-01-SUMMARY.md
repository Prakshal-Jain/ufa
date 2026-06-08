---
phase: 02-content-conversion-spine
plan: 01
subsystem: content-data-layer
tags: [data, content, typescript, placeholder, conversion]
requires: []
provides:
  - "data/site.ts: brand, tagline, nav anchors, contact email, socials, Formspree fallback id"
  - "data/concept.ts: conceptCopy, howItWorks (4 steps), lineage (3 nodes), lineageStatement"
  - "data/matches.ts: Match[] showcase entries with /media poster + optional clip paths"
  - "data/prizes.ts: prizePool tiers + totalCredits headline"
  - "data/standings.ts: StandingRow[] static teaser + standingsNote"
  - "data/sponsors.ts: sponsorValue + partners wall + partnersNote"
  - "data/traction.ts: metrics strip figures"
  - "data/endorsements.ts: endorsements quotes"
  - "ASSETS-NEEDED.md: user checklist mapping every placeholder to its data file"
affects:
  - "components/sections/* (Wave-2): consume these typed exports via the @/data/* alias"
tech-stack:
  added: []
  patterns:
    - "Build-time typed TS data layer (no fetch/API/CMS) - static-export safe"
    - "Content decoupled from presentation (research ARCHITECTURE Pattern 5): swapping real values is a one-file edit"
    - "Root-relative /media asset path strings resolve from apex root with images.unoptimized + trailingSlash"
key-files:
  created:
    - data/site.ts
    - data/concept.ts
    - data/matches.ts
    - data/prizes.ts
    - data/standings.ts
    - data/sponsors.ts
    - data/traction.ts
    - data/endorsements.ts
    - ASSETS-NEEDED.md
  modified: []
decisions:
  - "All content is clearly-marked PLACEHOLDER with honest 'Season 1 - founding sponsors wanted' framing so no section renders empty"
  - "Formspree endpoint sourced from NEXT_PUBLIC_FORMSPREE_ENDPOINT env, with site.formspreeFallbackId as the swappable placeholder"
metrics:
  duration: ~1min
  completed: 2026-06-08
---

# Phase 02 Plan 01: Content & Conversion Data Spine Summary

Typed, build-time local data layer (`data/*.ts`) driving every content-dependent section of the page, plus a repo-root `ASSETS-NEEDED.md` checklist that maps each placeholder to its data file so swapping real content is a one-file edit.

## What Was Built

- **`data/site.ts`** - site-wide strings: `brand`, `fullName`, `tagline`, `contactEmail`, in-page `anchors` (including `sponsor`), `socials` (`SocialLink[]`), and `formspreeFallbackId`. Typed `Site` export.
- **`data/concept.ts`** - `conceptCopy` (headline + lede stating agents interrogate then fight for credits/money + 3 clarity points), `howItWorks` (exactly 4 typed steps: matchup, interrogation, fight, verdict), `lineage` (exactly 3 nodes: UFC -> UFB -> UFA), and `lineageStatement` ("UFA is the UFC of AI."). Interfaces exported for downstream typing.
- **`data/matches.ts`** - `Match[]` with 3 Season-1 entries, `/media` poster paths and optional clip paths.
- **`data/prizes.ts`** - `prizePool` (`PrizeTier[]` with concrete `$50,000`/`$15,000`/`$5,000` figures + credit notes) and `totalCredits` headline ("1,000,000 compute credits at stake").
- **`data/standings.ts`** - `standings` (5 descending `StandingRow` entries) + `standingsNote`.
- **`data/sponsors.ts`** - `sponsorValue` (headline + pitch with "Reach 10k+ AI builders" claim + `audience[]`), `partners` (4 founding-partner entries, `/media/logos/*.svg`), and `partnersNote`.
- **`data/traction.ts`** - `metrics` (4 concrete `Metric` figures: matches run, prizes awarded, agents competed, viewers).
- **`data/endorsements.ts`** - `endorsements` (3 credible `Endorsement` quotes for placement near the CTA).
- **`ASSETS-NEEDED.md`** - repo-root checklist (`- [ ]` items) mapping matches, prizes, logos, standings, traction, endorsements, and contact/Formspree to their data files + `public/media` locations, referencing `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

## Verification

- `npm run typecheck` (`tsc --noEmit`) exits 0.
- `npm run build` exits 0; `out/CNAME` = `ufa.foundation` and `out/.nojekyll` present.
- `grep -ri "lorem ipsum" data/` returns nothing.
- `data/concept.ts` contains "credits"; `data/prizes.ts` contains a `$` figure.
- `ASSETS-NEEDED.md` references every `data/*.ts` file and the Formspree env var.
- No section/page files touched (plan owns only `data/` + `ASSETS-NEEDED.md`).

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

All `data/*.ts` values are intentional, clearly-marked PLACEHOLDER content (top-of-file comment in every module, plus inline notes). This is the explicit purpose of this plan: ship compelling, honest "Season 1 - founding sponsors wanted" placeholder content now, with `ASSETS-NEEDED.md` documenting exactly which real assets the user supplies later via one-file edits. Referenced `/media` and `/media/logos` asset files do not exist yet (expected); Wave-2 sections render poster fallbacks / honest placeholders until supplied.

## Self-Check: PASSED

- All 9 created files verified present on disk.
- All 3 task commits verified in git log.
