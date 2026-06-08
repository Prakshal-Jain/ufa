# Roadmap: Ultimate Agent Fight (UFA)

## Overview

UFA ships as one epic-scrolling cinematic landing page on the existing Next.js static-export → GitHub Pages pipeline at `ufa.foundation`. The journey is strictly dependency-ordered and risk-aware: first we harden the (already-working) delivery pipeline and stand up the reduced-motion-first motion + design-token system that every section consumes; then we build the full conversion narrative as static sections (concept, showcase, prizes, sponsor framing, working CTA) — a complete, sendable spine; then we ship a static-poster hero that makes the page genuinely impressive and **fully sendable with zero risky JS**; only then do we layer the maximal WebGL agent-vs-agent showpiece behind a lazy, capability-gated boundary that can be dropped without blocking launch; finally a cross-cutting performance + accessibility + real-device QA pass certifies the 60fps / WCAG-AA / Lighthouse budget the whole project is built around. Reduced-motion, mobile 60fps, and accessibility are woven across phases as the base case, not bolted on at the end.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation, Pipeline & Motion System** - Harden the static-export/GH Pages delivery and stand up the reduced-motion-first motion + design-token layer every section consumes
- [ ] **Phase 2: Content & Conversion Spine** - Build the complete static scroll narrative (concept, showcase, prizes, sponsor framing, working CTA) in conversion-optimized order
- [ ] **Phase 3: Hero — Static Poster Baseline (Sendable Gate)** - Ship a striking first-screen hero with sharp H1 + CTA that works with zero risky JS; the page is now fully sendable
- [ ] **Phase 4: Hero Showpiece — WebGL Enhancement** - Layer the maximal agent-vs-agent WebGL beat behind a lazy, capability-gated boundary that degrades to the poster and can be dropped without blocking launch
- [ ] **Phase 5: Performance, Accessibility & Launch QA** - Certify the cross-cutting 60fps / WCAG-AA / Lighthouse budget on real devices and verify the deployed link end-to-end

## Phase Details

### Phase 1: Foundation, Pipeline & Motion System
**Goal**: The deployed site at `ufa.foundation` is provably reachable with no broken asset paths or lost GH Pages files, share previews render, and a reduced-motion-first motion + design-token system exists for sections to consume — no visitor-facing content yet, but the scaffolding the #1 catastrophic risk (a dead link sent to an investor) lives in is locked down.
**Depends on**: Nothing (first phase; builds on the existing working pipeline)
**Requirements**: SITE-01, SITE-02, SITE-03, SITE-04, MOTION-02
**Success Criteria** (what must be TRUE):
  1. The deployed `ufa.foundation` page loads over HTTPS with every style/script/font/media asset resolving from the apex root — Network tab is 404-clean on a real phone (replacing the Coming Soon placeholder once content lands)
  2. Pushing to `main` auto-builds and deploys via the existing GitHub Actions pipeline, with `CNAME` + `.nojekyll` preserved in the build output (CI fails the build if either is missing)
  3. Sharing the link renders a correct title, description, and static Open Graph image preview
  4. With `prefers-reduced-motion` set, the motion system serves a fully static base path by default — reduced motion is the default, full motion is the enhancement (verifiable via the motion primitives in isolation)
**Plans**: 3 plans (Wave 1: 01-01; Wave 2: 01-02, 01-03 in parallel)

Plans:
- [x] 01-01-PLAN.md — Tooling, tokens & fonts foundation (Tailwind v4 @theme, cinematic sci-fi tokens, self-hosted variable fonts, MotionConfig reduced-motion base, deps install)
- [ ] 01-02-PLAN.md — CI/build guards & deploy hardening + static OG image (CNAME/.nojekyll + empty-basePath guard, hardened deploy.yml, opengraph-image)
- [ ] 01-03-PLAN.md — Reduced-motion-first motion primitives (Reveal, ScrollParallax, Lenis SmoothScroll) + UI primitives (SectionShell, CTAButton, GradientText)

### Phase 2: Content & Conversion Spine
**Goal**: A first-time visitor can read and understand the entire UFA story — what it is, how a fight works, proof it is alive, what is at stake, why to sponsor — and can submit interest through a working hosted form, all in a conversion-optimized scroll order with social proof adjacent to the CTA. This is a complete, end-to-end-shippable page validated on the deployed URL, before any risky hero work.
**Depends on**: Phase 1
**Requirements**: CONCEPT-01, CONCEPT-02, CONCEPT-03, SHOW-01, SHOW-02, PRIZE-01, PRIZE-02, SPON-01, SPON-02, SPON-03, SPON-04, SPON-05, MOTION-01, MOTION-03
**Success Criteria** (what must be TRUE):
  1. Visitor can read a clear explanation of what UFA is (AI agents interrogate + fight for credits/money), understand how a fight works via a "how it works" section, and see the UFC → UFB → UFA lineage framing
  2. Visitor can view a match/spectacle showcase built to accept swappable placeholder media that is compelling and performant on mobile (no autoplay sound, no jank)
  3. Visitor sees concrete prize pool / credits and a standings/leaderboard teaser of competing agents
  4. Visitor sees sponsor-value framing, a placeholder-capable partner logo wall, and a traction/metrics strip, and can submit interest through a working hosted form (Formspree/Tally) — with the CTA repeated near the end of the page alongside social proof
  5. Scroll-driven cinematic motion (reveals, parallax, depth) animates the sections using only `transform`/`opacity`/`filter`, holding ~60fps on a mid-tier phone with no layout-shift-induced CLS
**Plans**: TBD

Plans:
- [ ] 02-01: TBD during planning

### Phase 3: Hero — Static Poster Baseline (Sendable Gate)
**Goal**: The first screen hits the visitor with a cinematic showpiece that conveys "Ultimate Agent Fight" and high energy, states the one-line value as readable text, and surfaces the primary sponsor CTA — all rendered from a static poster image with zero risky JS, so it is the guaranteed first paint and the reduced-motion target. After this phase the page is genuinely impressive and **fully sendable**; the WebGL beat that follows is optional.
**Depends on**: Phase 2
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04
**Success Criteria** (what must be TRUE):
  1. Visitor sees a cinematic hero showpiece in the first screen that conveys "Ultimate Agent Fight" and high energy, rendered from a static poster (the LCP candidate) with no dependency on WebGL
  2. Hero states the one-line value (AI agents interrogate + fight to win credits/money) as readable text that stays legible with all motion stripped out
  3. A primary "get in touch / sponsor" CTA is visible within the first screen
  4. With WebGL absent, the device low-capability, or `prefers-reduced-motion` set, the hero shows the static poster baseline and the headline + CTA remain fully legible and reachable — the page is sendable as-is
**Plans**: TBD

Plans:
- [ ] 03-01: TBD during planning

### Phase 4: Hero Showpiece — WebGL Enhancement
**Goal**: The maximal iridescent agent-vs-agent WebGL beat — the single "holy shit" moment — is layered over the static poster behind a lazy, capability-gated boundary. It is the only place WebGL is allowed, never blocks first paint, and degrades cleanly to the Phase 3 poster, so it can slip or simplify as a fast-follow without blocking launch.
**Depends on**: Phase 3 (poster baseline must exist as the fallback target)
**Requirements**: (no exclusive requirement — enhances HERO-01 delivered in Phase 3; bounded by HERO-04 fallback contract)
**Success Criteria** (what must be TRUE):
  1. On a capable device, the hero progressively enhances from the static poster to a live WebGL agent-vs-agent scene with no flash or layout shift during the hand-off
  2. The WebGL scene is loaded behind a lazy boundary (`dynamic({ ssr:false })`) and stays out of the initial JS chunk — confirmed by bundle analysis; first paint never waits on the canvas
  3. On a low-capability device, with WebGL unavailable, or with `prefers-reduced-motion` set, the hero silently falls back to the static poster with no blank canvas and no broken first screen
  4. Removing/disabling the WebGL scene leaves a fully shippable, impressive page (the enhancement is droppable)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD during planning

### Phase 5: Performance, Accessibility & Launch QA
**Goal**: The cross-cutting budget the entire project is built around is certified end-to-end: responsive across all device classes, strong Lighthouse mobile scores with no animation-induced CLS, AA contrast on gradients, keyboard-reachable and submittable CTA, 60fps on a mid-tier phone, and a working end-to-end sponsor submission verified from a real phone on the deployed URL.
**Depends on**: Phase 4 (or Phase 3 if WebGL is deferred)
**Requirements**: QA-01, QA-02, QA-03
**Success Criteria** (what must be TRUE):
  1. The site is responsive and fully usable across mobile, tablet, and desktop, verified on real devices including a WebGL-disabled Android
  2. Text/UI meets WCAG AA contrast on the gradient backgrounds, keyboard focus is visible throughout, and the sponsor CTA is reachable and submittable by keyboard
  3. Lighthouse mobile performance is strong — LCP < 2.5s, CLS < 0.1, INP < 200ms, no animation-library-induced layout shift, fast first paint
  4. A visitor completes the full "get in touch / sponsor" submission from a phone on the deployed `ufa.foundation` URL and the lead is captured
**Plans**: TBD

Plans:
- [ ] 05-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation, Pipeline & Motion System | 0/3 | Planned | - |
| 2. Content & Conversion Spine | 0/TBD | Not started | - |
| 3. Hero — Static Poster Baseline (Sendable Gate) | 0/TBD | Not started | - |
| 4. Hero Showpiece — WebGL Enhancement | 0/TBD | Not started | - |
| 5. Performance, Accessibility & Launch QA | 0/TBD | Not started | - |
