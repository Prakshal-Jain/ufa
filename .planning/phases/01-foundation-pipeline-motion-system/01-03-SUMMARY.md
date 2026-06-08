---
phase: 01-foundation-pipeline-motion-system
plan: 03
subsystem: motion-and-ui-primitives
tags: [motion, reduced-motion, accessibility, lenis, gsap, ui-primitives]
requires:
  - "components/motion/useReducedMotionSafe.ts (01-01)"
  - "components/motion/MotionProvider.tsx (01-01)"
  - "styles/tokens.ts + styles/tokens.css (01-01)"
provides:
  - "components/motion/Reveal.tsx — whileInView fade/slide entrance, reduced-motion-gated"
  - "components/motion/ScrollParallax.tsx — transform-only translateY parallax, reduced-motion-gated"
  - "components/motion/SmoothScroll.tsx — Lenis smooth-scroll on GSAP ticker, disabled under reduced motion"
  - "components/ui/SectionShell.tsx — token-driven section rhythm + container"
  - "components/ui/GradientText.tsx — iridescent clipped-text with AA fallback"
  - "components/ui/CTAButton.tsx — accessible keyboard-reachable primary CTA"
  - "components/motion/reduced-motion.smoke.mjs — dependency-free base-path gate"
affects:
  - "All Phase 2+ section components (consume motion + UI primitives)"
tech-stack:
  added: []
  patterns:
    - "Reduced motion is the base path: every motion primitive early-returns a static/native render via the single useReducedMotionSafe gate"
    - "Animations touch transform/opacity only (no layout-shifting properties)"
    - "Client-leaf GSAP/Lenis init guarded inside useEffect (SSR/static-export safe)"
    - "Scoped <style> for component-local :focus-visible (no global CSS coupling)"
key-files:
  created:
    - components/motion/Reveal.tsx
    - components/motion/ScrollParallax.tsx
    - components/motion/SmoothScroll.tsx
    - components/ui/SectionShell.tsx
    - components/ui/GradientText.tsx
    - components/ui/CTAButton.tsx
    - components/motion/motion.test.tsx
    - components/motion/reduced-motion.smoke.mjs
  modified: []
decisions:
  - "Wrote a dependency-free node:test smoke gate (reduced-motion.smoke.mjs) instead of installing a React test runner — keeps package.json untouched (out of scope) while still proving the reduced-motion contract in CI today"
  - "CTAButton carries its own scoped :focus-visible ring via an inline <style> tag, so it stays accessible without depending on app/globals.css (owned by another plan)"
  - "GradientText sets color:var(--ufa-fg) as the base before background-clip:text so the text degrades to a legible AA solid color where clip is unsupported"
metrics:
  duration: "~2 min"
  completed: "2026-06-08"
  tasks: 3
  files: 8
---

# Phase 01 Plan 03: Motion-Layer & UI Primitives Summary

Reduced-motion-first motion primitives (Reveal, ScrollParallax, SmoothScroll) plus shared UI primitives (SectionShell, GradientText, CTAButton), all gating through the single `useReducedMotionSafe` hook so the static/native path is the base case and full motion is the enhancement.

## What Was Built

- **Reveal** — `whileInView` opacity/translateY entrance with `viewport once`, using `tokens.revealDuration` + `tokens.easeOut`. Under reduced motion it early-returns `<>{children}</>` fully visible with no transition. Transform/opacity only.
- **ScrollParallax** — scroll-linked `translateY` over `tokens.parallaxRange` via `useScroll`/`useTransform`. Hooks called unconditionally (rules-of-hooks safe), then `if (reduced) return <div>{children}</div>` skips the transform/scroll listener. No layout-shifting properties.
- **SmoothScroll** — instantiates Lenis inside `useEffect`, drives its RAF off `gsap.ticker` (`lagSmoothing(0)`), syncs `ScrollTrigger.update` on Lenis scroll, and cleans up (`ticker.remove` + `lenis.destroy()`). Effect early-returns when reduced → native scroll, no scroll-jacking. All GSAP/Lenis usage is effect-scoped to keep it an SSR-safe client leaf.
- **SectionShell** — server `<section>` applying `padding-block: var(--ufa-space-section)`, fluid horizontal padding, and a centered max-width container.
- **GradientText** — span with iridescent gradient clipped to text; `color: var(--ufa-fg)` fallback keeps it legible if `background-clip:text` is unsupported.
- **CTAButton** — renders a real `<a href>` when `href` present, else `<button type="button">`; keyboard reachable with an accessible name from children and a scoped `:focus-visible` outline using `--ufa-accent-3`.
- **Tests** — `reduced-motion.smoke.mjs` (Node built-in `node:test`) statically asserts each primitive calls `useReducedMotionSafe` and contains the reduced-motion early-return; `motion.test.tsx` documents the RTL behavioral spec to run once a test runner is added.

## Verification

- `npm run typecheck` — exits 0.
- `node --test components/motion/reduced-motion.smoke.mjs` — 7 tests pass (gate + early-return for all 3 primitives, plus no-layout-shift check on ScrollParallax).
- `npm run build` — exits 0; `out/CNAME` (ufa.foundation) + `out/.nojekyll` still present (no static-export regression).

## Deviations from Plan

None — plan executed as written. The plan itself pre-resolved the "no test runner configured" constraint by specifying the dependency-free `node:test` smoke approach, which was followed exactly.

## Notes for Downstream Plans

- Phase 2+ sections should wrap content in `SectionShell`, animate entrances with `Reveal`, and add depth with `ScrollParallax` — none of them need to reimplement reduced-motion handling.
- `SmoothScroll` is a behavior wrapper meant to mount once near the app root (alongside `MotionProvider`); it renders `<>{children}</>` with no DOM box.
- A real React test runner (Vitest + RTL) is still unconfigured; `motion.test.tsx` is the spec to activate then.

## Self-Check: PASSED
