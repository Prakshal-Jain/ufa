# Project Research Summary

**Project:** Ultimate Agent Fight (UFA)
**Domain:** Cinematic, motion-rich, mobile-first single-page marketing/sponsor-conversion site (Next.js static export -> GitHub Pages, apex `ufa.foundation`)
**Researched:** 2026-06-08
**Confidence:** HIGH

## Executive Summary

UFA is a single, epic-scrolling cinematic landing page whose job is to make sponsors, investors, companies, and SF hackers feel "I need to be part of this" within the first screen -- and to make the path to "get in touch / sponsor" unmissable. It is not a web app: every "feature" is a section of one linear scroll narrative, all data is hand-curated and resolved at build time, and there is no server runtime (the hard `output: "export"` + GitHub Pages constraint shapes every decision). The expert pattern for this genre is borrowed from two places at once: UFC.com/UFB.gg supply the *spectacle skeleton* (hero showpiece, concept, match proof, prize stakes, social proof), while Linear/Vercel/SpaceX supply the *conversion discipline and cinematic scrollytelling* (sharp outcome H1, one focused CTA, dark GPU-rendered gradients, scroll-driven reveals). Because UFA has no fighter photography, the spectacle must be *generated* -- motion, kinetic type, light, and depth -- which is also its opportunity to look more modern than its photo-dependent cousins.

The recommended build is a cleanly layered Next.js static export: a thin composition root (`page.tsx` orders sections), self-contained section components, a shared design-token + motion layer that sections *consume* (never reimplement), and build-time local data. The motion stack is **GSAP 3 + ScrollTrigger + Lenis** for the scroll spine, **Motion (`motion/react`)** for component micro-interactions, **Tailwind v4** for token-driven styling, and **`next/font/local`** self-hosted variable fonts. The single "maximal" beat -- the iridescent agent-vs-agent hero -- is the only place WebGL is allowed, isolated behind `next/dynamic({ ssr:false })`, capability-gated, and always degrading to a static poster. GSAP being 100% free as of April 2025 removes the last historical reason to avoid it.

The dominant risks are all forms of *spectacle defeating the purpose*: (1) the WebGL/video hero tanking on mid-tier phones -- the very screen the audience opens; (2) broken asset paths or lost `CNAME`/`.nojekyll` silently shipping a dead link to an investor; (3) animation libraries causing hydration mismatch / CLS / poor INP; (4) `prefers-reduced-motion` ignored (motion sickness + WCAG failure); and (5) style-over-substance -- gorgeous but unclear concept and a buried CTA that converts no one. Mitigation is structural, not bolt-on: reduced-motion is the *base* path with full motion as progressive enhancement; the page must be fully shippable and impressive *before* the WebGL hero exists; and the live URL must be smoke-tested on a real phone before it is ever sent.

## Key Findings

### Recommended Stack

The stack is opinionated and version-verified (all confirmed against live npm on 2026-06-08). Use two animation systems for two distinct jobs: GSAP/ScrollTrigger owns the cinematic scroll spine (pinning, scrubbing, staggered reveals -- far more capable than framework-native scroll), while Motion owns declarative React entrance/gesture/layout work. Tailwind v4's CSS-first `@theme` maps perfectly onto a cinematic design-token system and ships tiny output. WebGL is a lazy-loaded *accent*, not the page backbone. See `STACK.md`.

**Core technologies:**
- **Next.js 16.2.7 + React 19.1.0** (installed): static export to `out/`, already wired to the working GH Pages pipeline -- do not re-solve hosting.
- **Tailwind CSS v4** (`@tailwindcss/postcss`): token-driven cinematic styling, ~70% smaller output, static-export safe.
- **GSAP 3.15 + ScrollTrigger + `@gsap/react` (`useGSAP`) + Lenis**: the scroll narrative spine; `useGSAP` prevents the #1 GSAP-in-React cleanup bug; Lenis drives smooth-scroll off the GSAP ticker (disabled under reduced-motion).
- **Motion 12.40 (`motion/react`)**: component micro-interactions, built-in `useReducedMotion()`.
- **react-three-fiber 9 + three + drei 10 (+ optional postprocessing Bloom)** -- HERO BEAT ONLY, behind `dynamic({ ssr:false })`, per-helper drei imports, single full-screen shader plane.
- **`next/font/local`** self-hosted WOFF2 variable fonts: zero runtime requests, CLS-safe.

### Expected Features

"Features" = page sections in one scroll. The page = UFC's spectacle skeleton + Linear/Vercel's conversion discipline + cinematic sci-fi skin. Conversion is amplified by *adjacency* -- placing social proof (logos, traction numbers, endorsements) right around the sponsor CTA is a documented 15-30% lift, so scroll order matters. The critical unblocker is a **content audit**: most credibility sections are HIGH content-dependency and must either have real assets or an honest "early-stage" framing so nothing renders as an empty shell. See `FEATURES.md`.

**Must have (table stakes):**
- Hero showpiece (generated agent-vs-agent spectacle, sharp H1, sponsor CTA above fold)
- Concept block + How-it-works (novel concept must be legible in one read)
- Match/spectacle showcase (real footage -- proof it is alive)
- Prize pool / credits (concrete stakes + legitimacy)
- Repeated primary "Get in touch / Sponsor" CTA (no-backend capture) + footer
- Mobile-first responsive + reduced-motion/60fps (cross-cutting)

**Should have (competitive differentiators):**
- Cinematic scroll-storytelling spine (the single biggest edge vs grid/card cousins)
- Traction metrics strip (the #1 investor-converting signal) near the CTA
- Sponsor-value framing ("reach 10k+ AI builders at the frontier", not generic "sponsor us")
- UFC->UFB->UFA lineage moment (free, instantly-legible category framing)
- Static standings teaser; endorsements/press block (content-gated)

**Defer (v2+):**
- Live leaderboard / real-time standings (needs backend -- currently an anti-feature)
- Multi-page expansion; live stream embed; user accounts / agent submission; ticketing/payments; autoplaying sound; newsletter as primary CTA

### Architecture Approach

Four cleanly separated layers driven by the no-server-runtime constraint: a thin composition root, self-contained section components (one file per scroll beat, mapping 1:1 to roadmap phases), a shared design-token + motion layer that sections consume, and build-time local data. Keep `layout.tsx`/`page.tsx`/most sections as Server Components; push `'use client'` down to the smallest motion leaves; isolate the WebGL hero behind `next/dynamic`. Reduced-motion is centralized (`<MotionConfig reducedMotion="user">` + a `useReducedMotionSafe` hook) and is the *base* path. See `ARCHITECTURE.md`.

**Major components:**
1. **Composition root (`app/page.tsx`)** -- orders sections top->bottom ("the edit"); reordering/cutting is a one-line change.
2. **Section layer (`components/sections/*`)** -- one visible beat each (Hero, Concept, Matches, Prizes, Lineage, CTA); consumes motion + tokens + data.
3. **Motion + design-token layer** -- reusable `Reveal`/`ScrollParallax`/`ScrollProgress` primitives with centralized reduced-motion gating; dual-representation tokens (`tokens.css` for styling, `tokens.ts` for JS/motion values).
4. **Lazy hero showpiece (`LazyHeroScene`)** -- the single WebGL beat behind `dynamic({ssr:false})`, capability-gated, swapping over an always-present static poster.
5. **Build-time data (`data/*.ts`) + pre-optimized asset pipeline (`public/media`)** -- typed local content; AVIF/WebP/720p H.264 (Next image optimizer is disabled under static export).

### Critical Pitfalls

1. **Broken asset paths / lost GH Pages files** -- works on localhost, ships dead to an investor. Keep `basePath`/`assetPrefix` empty for the apex root, protect `.nojekyll`+`CNAME` in CI, reference assets via `next/image`/`next/link`, and smoke-test the *deployed* URL on a real phone (Network tab 404-clean).
2. **WebGL/3D hero tanks on mid-tier phones** -- the "holy shit" screen is the one that breaks. Budget for mobile first, capability-gate to a reduced scene / static fallback, never block first paint on the canvas, keep the headline+CTA legible even if WebGL never loads.
3. **Hero video will not autoplay / blows data budget** -- must be `muted` + `loop` + `playsinline` + `autoplay`, with a `poster` (the LCP candidate), 720p H.264 ~3-4MB, lazy-load below-fold clips.
4. **Animation-library hydration mismatch -> CLS/INP** -- keep animations as `'use client'` leaf islands, init entrance motion in `useEffect`, reserve layout space, animate only `transform`/`opacity`; verify CLS<0.1, INP<200ms, LCP<2.5s on throttled mobile.
5. **`prefers-reduced-motion` ignored** (WCAG 2.3.3 + motion sickness) and **style-over-substance** (no clear concept/CTA) -- build the reduced path as the base and the message so it converts with motion stripped; first screen must answer what/why/how-to-act, and ship a sendable baseline before maximal 3D (anti over-engineering).

## Implications for Roadmap

Architecture's dependency-ordered layers and Pitfalls' phase mapping converge on the same sequence. Crucially, the page should be **deployable and impressive after the static-poster hero (Phase 5), with the WebGL showpiece isolated last** so it can slip or simplify without blocking launch -- directly enforcing the "bold but performant, maximal only in hero" decision and the anti-over-engineering pitfall.

### Phase 1: Foundation & Pipeline Hardening
**Rationale:** Everything depends on tokens/config; and the #1 catastrophic risk (a dead link sent to an investor) lives here. Verify before any cinematic work lands.
**Delivers:** `next.config` (`output:"export"`, `images.unoptimized`), `tokens.css`+`tokens.ts`, `next/font` in `layout.tsx`, static `opengraph-image`, protected `CNAME`/`.nojekyll`, CI guard (`tsc --noEmit` + build + asset-presence check), live-URL phone smoke test.
**Addresses:** Mobile-first + perf scaffolding; metadata/OG.
**Avoids:** Broken asset paths under static export; lost GH Pages files; broken OG share card; PostCSS XSS (upgrade Next past vulnerable PostCSS).

### Phase 2: Motion System & Reduced-Motion Contract
**Rationale:** Sections cannot be built well without the motion primitives, and reduced-motion must be structural from day one (retrofitting touches every animation).
**Delivers:** `MotionProvider` (`<MotionConfig reducedMotion="user">`), `Reveal`/`ScrollParallax`/`ScrollProgress`, `useReducedMotionSafe`, GSAP+Lenis+ticker wiring, `SectionShell`/`CTAButton`/`GradientText` UI primitives.
**Uses:** GSAP/ScrollTrigger, Motion, Lenis, `@gsap/react` (`useGSAP`).
**Implements:** Motion + design-token layer.
**Avoids:** Hydration mismatch/CLS/INP; `prefers-reduced-motion` failure; scroll-jank from too many scroll-linked animations.

### Phase 3: Content & Static Sections (the shippable spine)
**Rationale:** The simpler beats (no WebGL) validate the whole pipeline end-to-end (build -> Pages -> mobile) and lock the conversion message before any risky hero work. Content audit happens here.
**Delivers:** `data/*.ts` (matches/prizes/site, stubbed then refined), Concept, How-it-works, Matches showcase, Prizes, Traction strip, Standings teaser, Lineage, Sponsor-value + logo wall, repeated CTA (no-backend capture decision), Footer -- assembled in conversion-optimized scroll order.
**Addresses:** Concept, How-it-works, Match showcase, Prize pool, Traction, Sponsor framing, CTA, Footer (most P1 features).
**Avoids:** Style-over-substance (clear concept + visible/persistent CTA); empty-shell sections (honest early-stage framing); video autoplay/data-budget issues.

### Phase 4: Hero -- Static Poster Baseline
**Rationale:** The hero must look great with *zero JS* first -- this is the de-risked, reduced-motion target and the guaranteed first paint. After this the page is fully sendable.
**Delivers:** Hero section with poster (LCP candidate), sharp H1, subhead, primary CTA above fold; CSS/gradient + Motion treatment; compressed background loop if used.
**Addresses:** Hero showpiece (table-stakes form).
**Avoids:** LCP inside canvas/video; hero video autoplay pitfalls; over-engineering blocking ship.

### Phase 5: Hero Showpiece -- WebGL Enhancement (highest risk, last)
**Rationale:** Isolated last and behind a lazy boundary so the page is already shippable; this can slip to a fast-follow without blocking launch.
**Delivers:** `LazyHeroScene` (R3F single-shader plane + optional Bloom) via `dynamic({ssr:false})`, capability-gated, swapping over the poster; bundle-analyzer check confirming WebGL stays out of the initial chunk.
**Uses:** react-three-fiber, three, drei, postprocessing.
**Avoids:** WebGL tanking on mid-tier phones; bundle bloat; blank-canvas with no fallback.

### Phase 6: Asset Optimization & Perf/Accessibility Pass
**Rationale:** Final cross-cutting verification of the perf + accessibility budget the whole project is built around.
**Delivers:** Pre-optimized AVIF/WebP/720p media (Draco for any GLB), Lighthouse mobile (LCP<2.5s, CLS<0.1, INP<200ms), real-device 60fps + WebGL-disabled-Android test, reduced-motion toggle test, AA contrast on gradients, keyboard/focus reachability, end-to-end CTA test from a phone.
**Avoids:** All Performance Traps and UX Pitfalls; the "Looks Done But Isn't" checklist failures.

### Phase Ordering Rationale

- **Dependency order is strict:** tokens/config -> motion layer -> data -> static sections -> poster hero -> WebGL hero -> perf pass. Each phase only consumes earlier ones (from ARCHITECTURE.md's build-order).
- **Risk is front-loaded and back-loaded deliberately:** the *silent-killer* infra risk (broken link) is verified in Phase 1; the *highest-complexity* risk (WebGL hero) is isolated in Phase 5 so launch never depends on it.
- **A sendable, impressive baseline exists after Phase 4** -- directly enforcing the anti-over-engineering pitfall and the "maximal only in hero" decision.
- **Reduced-motion and the conversion message are the base layer, not enhancements**, satisfying WCAG and the style-over-substance pitfall by construction.

### Research Flags

Phases likely needing deeper research (`/gsd:research-phase`) during planning:
- **Phase 2 (Motion System):** the GSAP+ScrollTrigger+Lenis-driven cinematic scroll spine is the long pole -- pinning/scrub choreography + the GSAP-ticker/Lenis/reduced-motion integration warrant a focused spike (FEATURES + STACK both flag it as highest-complexity).
- **Phase 5 (WebGL Hero):** the iridescent shader + mobile capability gating + lazy-boundary hand-off (poster->scene without flash) is the riskiest, most device-dependent work.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** static-export/GH Pages gotchas are now well-documented and the existing pipeline already works.
- **Phase 3 (Content & Static Sections):** conventional section components consuming established primitives.
- **Phase 4 (Poster Hero) & Phase 6 (Perf pass):** well-trodden poster/`next/image`/Lighthouse patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against live npm; static-export/SSR gotchas verified against official Next/R3F docs. |
| Features | HIGH | Section taxonomy & conversion patterns corroborated across genre cousins, esports, and top-tier SaaS; cinematic-execution specifics MEDIUM (design/content-dependent). |
| Architecture | HIGH | Layering & static-export constraints verified against official docs + existing codebase. |
| Pitfalls | HIGH | Static-export, mobile video, and reduced-motion gotchas verified against official docs + tracked GitHub issues; conversion/style findings MEDIUM. |

**Overall confidence:** HIGH

### Gaps to Address

- **Content audit is the critical unblocker.** Which of footage, prize numbers, standings, traction metrics, sponsor logos, and endorsements exist *today*? Each missing one needs an honest "Season 1 -- founding sponsors wanted" framing so no section renders empty. Resolve at the start of Phase 3 (and ideally during requirements).
- **No-backend lead-capture choice is a real decision, not a detail.** `mailto:` (zero-cost, lossy) vs Formspree/Tally/Google Form (captured list, static-safe) vs Calendly. Decide before the CTA lands in Phase 3; verify it works from a phone.
- **Brand identity:** PROJECT.md allows using provided assets *or* designing the identity. Confirm logo/colors/fonts availability before Phase 1 tokens + font selection (also requires WOFF2 web-embedding license check for any commercial display face).
- **Hero scope decision:** the "v1 floor" (CSS/gradient + Motion hero, no three.js) vs the "full brief" (WebGL shader). Phase 4 ships the floor; Phase 5 is explicitly droppable -- confirm timeline tolerance at the Phase 4->5 boundary.
- **Lenis vs native scroll-driven CSS:** optional dependency; can be dropped for `animation-timeline: scroll()` if the eased-momentum feel is not worth the lib. Decide in Phase 2.

## Sources

### Primary (HIGH confidence)
- Live `npm view` (2026-06-08) -- exact current versions for all motion/3D/styling packages.
- Next.js official docs -- static exports, `next/dynamic` (ssr:false), `next/font/local`, image-export constraint, OG/`opengraph-image` conventions.
- Motion (`motion.dev`) docs + react-upgrade guide -- `framer-motion`->`motion/react` rename, ScrollTimeline/IntersectionObserver, performance.
- GSAP/Webflow -- GSAP 100% free incl. all former Club plugins (April 2025).
- R3F docs + GitHub releases -- R3F 9 <-> React 19 compatibility.
- Tailwind v4 blog/docs -- Oxide engine, `@theme` config.
- MDN `prefers-reduced-motion`; W3C WCAG 2.2 SC 2.3.3 / Technique C39.
- Tracked Next.js GitHub issues -- static-export basePath (#73427), OG static-generation (#51147), hydration (#35773).
- Internal: `.planning/PROJECT.md`, `.planning/codebase/` (ARCHITECTURE, STRUCTURE, CONCERNS).

### Secondary (MEDIUM confidence)
- Lenis + GSAP ticker integration guides (verified against GH repo).
- Conversion/landing-page pattern sources (Primer, Landdding, Indie Hackers, MailerLite, Airmeet, That Round, Kit).
- Genre cousins (UFC.com, UFB.gg) and scrollytelling references (Webflow parallax, Lovable, SpaceX/Ducati).
- R3F mobile-perf and `next-image-export-optimizer` guides.

### Tertiary (LOW confidence)
- "One Page Startup Landing Pages 2026" (single source) -- directional, not authoritative.

---
*Research completed: 2026-06-08*
*Ready for roadmap: yes*
