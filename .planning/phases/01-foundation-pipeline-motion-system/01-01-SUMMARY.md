---
phase: 01-foundation-pipeline-motion-system
plan: 01
subsystem: infra
tags: [tailwind-v4, motion, next-font-local, design-tokens, static-export, reduced-motion]

# Dependency graph
requires: []
provides:
  - Tailwind CSS v4 active via CSS-first @theme (PostCSS plugin, no JS config)
  - Cinematic sci-fi design tokens as --ufa-* CSS vars + typed TS mirror (styles/tokens.css + tokens.ts)
  - Self-hosted variable fonts (Orbitron display, Inter body) via next/font/local exposed as --font-display / --font-body
  - Reduced-motion-first contract: global <MotionConfig reducedMotion="user"> + useReducedMotionSafe hook
  - npm scripts typecheck + verify:build, and scripts/verify-build.mjs build-integrity gate
affects: [01-02, 01-03, motion-primitives, sections, hero]

# Tech tracking
tech-stack:
  added: [tailwindcss@4.3.0, "@tailwindcss/postcss@4.3.0", motion@12.40.0, gsap@3.15.0, "@gsap/react@2.1.2", lenis@1.3.23, "@next/bundle-analyzer"]
  patterns: [Dual-representation design tokens (CSS vars + typed TS mirror), Reduced-motion as base path via MotionConfig + gate hook, Self-hosted WOFF2 variable fonts with zero external requests, CSS-first Tailwind v4 @theme token mapping]

key-files:
  created:
    - styles/tokens.css
    - styles/tokens.ts
    - components/motion/MotionProvider.tsx
    - components/motion/useReducedMotionSafe.ts
    - postcss.config.mjs
    - scripts/verify-build.mjs
    - public/fonts/Orbitron-Variable.woff2
    - public/fonts/Inter-Variable.woff2
    - public/fonts/.gitkeep
  modified:
    - package.json
    - app/globals.css
    - app/layout.tsx

key-decisions:
  - "Used Orbitron (geometric sci-fi display) + Inter (body), both SIL-OFL variable WOFF2, self-hosted to avoid licensing/runtime-fetch risk"
  - "Kept npm caret (^) version ranges (resolved to exact target versions in lockfile) rather than hard pins, matching existing repo convention"
  - "reducedMotion=\"user\" + useReducedMotionSafe defaulting to true makes the reduced path the structural base, not a retrofit"

patterns-established:
  - "Dual-representation tokens: styles/tokens.css is source of truth; styles/tokens.ts mirrors numeric values for JS/motion"
  - "Tailwind v4 @theme maps --ufa-* tokens + font vars into the utility system (CSS-first, no tailwind.config)"
  - "Motion layer is reduced-motion-first: every primitive will gate on useReducedMotionSafe()"

requirements-completed: [SITE-01, SITE-04, MOTION-02]

# Metrics
duration: 3min
completed: 2026-06-08
---

# Phase 01 Plan 01: Foundation Pipeline & Motion System Summary

**Activated Tailwind v4 (CSS-first @theme) with a dual-representation cinematic sci-fi token system, self-hosted Orbitron/Inter variable fonts via next/font/local, and a reduced-motion-first MotionConfig contract — all while keeping the GitHub Pages static export green (CNAME/.nojekyll preserved, basePath empty).**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-06-08T08:23:08Z
- **Completed:** 2026-06-08T08:25:30Z
- **Tasks:** 3
- **Files modified:** 12 (created 9, modified 3)

## Accomplishments
- Installed the full Phase-1 dependency set (motion, gsap, @gsap/react, lenis, Tailwind v4, bundle-analyzer) at target versions; three.js deliberately NOT installed (later phase).
- Tailwind CSS v4 active via the dedicated PostCSS plugin and CSS-first `@theme` — build emits hashed CSS under `out/_next/static`.
- Cinematic sci-fi design tokens exist in two synced forms: `styles/tokens.css` (`--ufa-*` CSS vars incl. iridescent gradient + fluid display type) and `styles/tokens.ts` (typed mirror with easeOut + parallaxRange).
- Self-hosted variable fonts (Orbitron display, Inter body) load via `next/font/local` as `--font-display` / `--font-body` with zero external font requests (verified: no googleapis/gstatic refs in `out/`).
- Reduced-motion is the structural base path: `<MotionConfig reducedMotion="user">` wraps the app and `useReducedMotionSafe()` defaults to `true`.
- Existing Coming Soon page preserved structurally and restyled against the new tokens; build green with CNAME + .nojekyll intact.

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Phase-1 deps, scripts, activate Tailwind v4 PostCSS** - `fd9517a` (chore)
2. **Task 2: Define cinematic sci-fi tokens + wire Tailwind @theme** - `091704f` (feat)
3. **Task 3: Self-host fonts, mount MotionConfig, wire layout** - `5507c43` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `package.json` - Added deps + `typecheck` / `verify:build` scripts
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin
- `scripts/verify-build.mjs` - Post-build gate: asserts out/CNAME, out/.nojekyll, index.html, hashed Tailwind CSS
- `styles/tokens.css` - `--ufa-*` cinematic sci-fi CSS variables (source of truth)
- `styles/tokens.ts` - Typed mirror (accent palette, easeOut, revealDuration, parallaxRange)
- `app/globals.css` - `@import "tailwindcss"` + tokens, `@theme` mapping, base resets, restyled utility classes, reduced-motion guard
- `app/layout.tsx` - `next/font/local` fonts as CSS vars on `<html>`, MotionProvider wrapping children, metadata preserved
- `components/motion/MotionProvider.tsx` - Global `<MotionConfig reducedMotion="user">`
- `components/motion/useReducedMotionSafe.ts` - Reduced-motion gate hook (defaults true)
- `public/fonts/Orbitron-Variable.woff2`, `public/fonts/Inter-Variable.woff2`, `public/fonts/.gitkeep` - Self-hosted fonts

## Decisions Made
- Orbitron + Inter chosen as the SIL-OFL variable faces (no commercial display face yet) to eliminate licensing and runtime-fetch risk while delivering the geometric sci-fi display tone.
- Retained npm caret (`^`) ranges; the lockfile resolves them to the exact target versions, and this matches the existing repo convention (next/react already use `^`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created the missing scripts/verify-build.mjs referenced by verify:build**
- **Found during:** Task 1 (adding the `verify:build` npm script)
- **Issue:** The plan instructs adding `"verify:build": "node scripts/verify-build.mjs"` but never specifies creating that script; without it the script (and the plan's CNAME/.nojekyll success criterion) would fail.
- **Fix:** Authored `scripts/verify-build.mjs` to assert `out/CNAME`, `out/.nojekyll`, `out/index.html`, and the presence of hashed CSS under `out/_next/static` (Tailwind-active check).
- **Files modified:** scripts/verify-build.mjs
- **Verification:** `npm run verify:build` exits 0 after build, reporting all artifacts present.
- **Committed in:** fd9517a (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The verify-build script was required for the plan's own success criteria. No scope creep.

## Issues Encountered
- Next.js emitted a workspace-root warning due to a parent `pnpm-lock.yaml` at `/Users/prakshaljain/`. It is informational only; the build correctly used the local `package-lock.json` and produced a clean static export. No action taken (out of scope — pre-existing environment condition).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Tokens, fonts, and the reduced-motion-default provider are mounted at the root and ready for consumption.
- Plan 01-02 and Plan 01-03 can run without touching `package.json` or `app/layout.tsx` (dependency install + layout ownership done here, as intended for parallel waves).
- No blockers.

---
*Phase: 01-foundation-pipeline-motion-system*
*Completed: 2026-06-08*

## Self-Check: PASSED

All 12 declared files exist on disk and all 3 task commits (fd9517a, 091704f, 5507c43) are present in git history.
