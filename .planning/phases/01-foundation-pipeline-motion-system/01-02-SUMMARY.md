---
phase: 01-foundation-pipeline-motion-system
plan: 02
subsystem: infra
tags: [github-pages, github-actions, next-export, opengraph, next-og, ci-guard]

# Dependency graph
requires:
  - phase: 01-01
    provides: "package.json scripts (typecheck, verify:build), next.config.mjs (output:export, no basePath), Tailwind CSS pipeline, fonts"
provides:
  - "Dependency-free build-output guard (scripts/verify-build.mjs) asserting CNAME content, .nojekyll, index.html, Tailwind CSS, and empty basePath/assetPrefix"
  - "Hardened GitHub Actions deploy pipeline gated by typecheck -> build -> verify guard before upload"
  - "Static, build-time-prerendered Open Graph image (app/opengraph-image.tsx -> out/opengraph-image, 1200x630 PNG)"
affects: [content-conversion-spine, hero-static-poster, launch-qa]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Build-output integrity guard run in CI between build and artifact upload"
    - "Static OG image via Next metadata file convention with force-static under output:export"

key-files:
  created:
    - app/opengraph-image.tsx
  modified:
    - scripts/verify-build.mjs
    - .github/workflows/deploy.yml

key-decisions:
  - "Resolve project root from import.meta.url (not process.cwd()) so the guard is invocation-directory agnostic"
  - "Assert CNAME content equals ufa.foundation, not just presence, to catch a wrong/empty domain file"
  - "OG image is force-static and non-dynamic so it prerenders into out/ under output:export (dynamic OG routes do not statically generate)"

patterns-established:
  - "CI delivery guard: any push that drops GH Pages host files or sets a non-empty basePath fails the pipeline before deploy"
  - "Metadata-convention static OG card with inline styles only (no external fonts), cinematic sci-fi palette"

requirements-completed: [SITE-02, SITE-03, SITE-04]

# Metrics
duration: 5min
completed: 2026-06-08
---

# Phase 1 Plan 2: CI/Build Guards & Deploy Hardening + Static OG Image Summary

**A dependency-free build-output guard (CNAME content + .nojekyll + empty basePath/assetPrefix + Tailwind CSS) wired into a typecheck->build->verify CI pipeline, plus a static force-static next/og Open Graph image prerendered into out/.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-08T08:24Z
- **Completed:** 2026-06-08T08:29Z
- **Tasks:** 3
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments
- Hardened `scripts/verify-build.mjs` into a robust, zero-dependency guard: resolves root from `import.meta.url`, asserts `out/CNAME` content === `ufa.foundation`, `out/.nojekyll` + `out/index.html` presence, no non-empty `basePath`/`assetPrefix` in `next.config.mjs`, and Tailwind CSS shipped under `out/_next/static`. Prints `verify-build: OK` / exits 0 on pass.
- Verified the guard catches a dropped `.nojekyll` (GUARD-CATCHES-MISSING) and a non-empty `basePath` (spot-checked the regex logic).
- Added `app/opengraph-image.tsx` (next/og `ImageResponse`, `force-static`, 1200x630, `image/png`) producing a cinematic sci-fi share card; build prerenders it to `out/opengraph-image` (confirmed 1200x630 RGBA PNG).
- Hardened `.github/workflows/deploy.yml`: inserted `npm run typecheck` after `npm ci` and `npm run verify:build` between `npm run build` and `upload-pages-artifact`, leaving trigger, permissions, concurrency, and the deploy job untouched.

## Task Commits

Each task was committed atomically (with --no-verify, parallel-executor mode):

1. **Task 1: Write the build-output guard** - `d3249b9` (fix)
2. **Task 2: Add a static, build-time Open Graph image** - `69bdb79` (feat)
3. **Task 3: Harden the GitHub Actions deploy workflow** - `41ee713` (chore)

**Plan metadata:** see final docs commit.

## Files Created/Modified
- `scripts/verify-build.mjs` (modified) - Post-build integrity guard: CNAME content, .nojekyll, index.html, empty basePath/assetPrefix, Tailwind CSS presence; root resolved from import.meta.url.
- `app/opengraph-image.tsx` (created) - Static force-static next/og OG card (1200x630 PNG) prerendered into out/.
- `.github/workflows/deploy.yml` (modified) - Added typecheck and verify:build gates around the build in the build job.

## Decisions Made
- Resolve project root via `import.meta.url` rather than `process.cwd()` so the guard works regardless of invocation directory.
- Verify CNAME *content* (=== `ufa.foundation`), not just its presence, to catch a corrupted/empty domain file.
- OG image kept non-dynamic with `export const dynamic = "force-static"` so it prerenders under `output:"export"` (per PITFALLS: dynamic OG routes don't statically generate).

## Deviations from Plan

None - plan executed exactly as written. The existing `scripts/verify-build.mjs` from 01-01 was extended (not clobbered): its .nojekyll/index.html/Tailwind checks were retained while CNAME content, basePath/assetPrefix, and import.meta.url root resolution were added per the Task 1 spec.

## Issues Encountered
None. `out/opengraph-image` is emitted without a hashed suffix (single static route), satisfying the `find out -name 'opengraph-image*'` acceptance gate.

## User Setup Required
None - no external service configuration required. CI gates run automatically on push to main.

## Next Phase Readiness
- Delivery pipeline is now regression-proof against the #1 catastrophic risk (dead/broken apex link) and shared links preview correctly.
- Ready for Phase 2 content sections; the deploy guard will protect every subsequent push.
- Note: `app/layout.tsx` still carries placeholder "coming soon" title/description metadata from earlier; Phase 2 content work should update copy (OG image alt/text already reflect the real UFA value line).

## Self-Check: PASSED

All claimed files exist (scripts/verify-build.mjs, app/opengraph-image.tsx, .github/workflows/deploy.yml, out/opengraph-image) and all task commits (d3249b9, 69bdb79, 41ee713) are present in git history.

---
*Phase: 01-foundation-pipeline-motion-system*
*Completed: 2026-06-08*
