# Ultimate Agent Fight (UFA)

## What This Is

A single, cinematic landing page for **Ultimate Agent Fight** — a live competition where AI agents interrogate and fight each other to win credits and money. The site lives at **ufa.foundation** and exists to make sponsors, companies, SF hackers, and investors feel that this is the coolest thing happening in AI right now, and to get them to reach out / sponsor. It replaces the current minimalist "Coming Soon" placeholder.

## Core Value

A first-time visitor on a phone is hit with a "holy shit, I need to be part of this" feeling within the first screen — and knows exactly how to get in touch / sponsor.

## Requirements

### Validated

<!-- Inferred from the existing codebase (the placeholder we shipped). These work today. -->

- ✓ Next.js static export deploys to GitHub Pages — existing
- ✓ Custom apex domain `ufa.foundation` with HTTPS + `www` → apex redirect — existing
- ✓ Push-to-`main` auto-builds and deploys via GitHub Actions — existing
- ✓ `CNAME` + `.nojekyll` baked into the build output — existing
- ✓ Cinematic sci-fi design-token system (Tailwind v4 `@theme` + `--ufa-*` CSS vars + typed TS mirror) — Phase 1
- ✓ Self-hosted variable fonts (Orbitron/Inter), zero external font requests — Phase 1
- ✓ Reduced-motion-first motion layer (MotionConfig + `useReducedMotionSafe`; Reveal/ScrollParallax/SmoothScroll primitives) — Phase 1
- ✓ Build/CI guard enforcing CNAME/.nojekyll survival + empty basePath; static OG image — Phase 1

### Active

<!-- The new site. Hypotheses until shipped. -->

- [x] Replace the placeholder with one epic, scrolling landing page — Phase 2 (cinematic hero showpiece pending Phases 3-4)
- [ ] Hero showpiece: a striking agent-vs-agent "versus" moment (the maximal motion beat) — Phases 3-4
- [x] Communicate the concept: AI agents interrogate + fight for credits/money — Phase 2
- [x] Showcase the spectacle (match showcase section; real footage swappable via data layer) — Phase 2
- [x] Show concrete prize pool / credits details — Phase 2
- [x] Primary CTA: get in touch / sponsor (Formspree form) — Phase 2
- [x] Lean into the UFC → UFB → UFA naming lineage as a brand asset — Phase 2
- [ ] Use provided brand assets (logo/colors/fonts) or design the identity if absent
- [ ] Mobile-friendly; motion stays smooth (~60fps) on phones with reduced-motion fallback
- [ ] Broadly impressive to all four audiences (investors, sponsors, companies, SF hackers)

### Out of Scope

<!-- Boundaries with reasons, to prevent scope creep. -->

- Multi-page site (leaderboard/matches/about as separate routes) — v1 is ONE landing page; revisit later
- Backend / database / live data feeds — static site; match + prize data is hand-curated content
- User accounts, agent submission, or competition entry flows — not the job of this marketing site
- Maximal WebGL/shader-everywhere treatment — perf/build risk on a static, mobile-first site; reserved for the single hero beat only
- E-commerce / ticketing / payments — not needed for the sponsor-contact goal

## Context

- **Audience:** Sponsors, companies, SF hackers, investors — sent the link directly, often opened on mobile.
- **Stage:** Framed as a live competition/event (real matches exist), but early — credibility and spectacle both matter.
- **Reference landscape:** UFC.com and UFB.gg (Ultimate Fighting Bots) are the genre cousins. Both are competent but photo-dependent and read "corporate / premium sports brand," not cutting-edge. UFA has no fighter photography to lean on — its combatants are AI agents — so spectacle must be *generated* (motion, type, light, depth), which is also the opportunity to look more modern than either.
- **Existing infra:** A working Next.js static-export → GitHub Pages pipeline at ufa.foundation (repo `Prakshal-Jain/ufa`). The new site builds on this exact pipeline.

## Constraints

- **Tech stack**: Next.js static export (`output: "export"`) — required to host free on GitHub Pages. No server runtime.
- **Hosting**: GitHub Pages, apex domain `ufa.foundation`. Build artifact must keep `CNAME` + `.nojekyll`.
- **Performance**: Mobile-first; motion must stay ~60fps on phones; honor `prefers-reduced-motion`.
- **Design**: Cinematic sci-fi aesthetic (deep gradients, iridescent/holographic accents, large cinematic type, depth/parallax). Executed "bold but performant" — rich scroll motion + light WebGL accent, NOT maximal-everywhere.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| One epic landing page for v1 (not multi-page) | Fastest path to a "wow" link you can send; richest impact per unit effort | — Pending |
| Cinematic sci-fi aesthetic | User selection; differentiates from photo-driven UFC/UFB | — Pending |
| "Bold but performant" motion, maximal only in hero | Cinematic wow without mobile jank or heavy static build; progressive enhancement | — Pending |
| Primary CTA = get in touch / sponsor | User's #1 desired action | — Pending |
| Lean into UFC → UFB → UFA naming lineage | Free brand equity; instantly legible positioning | — Pending |
| Build on existing Next.js → GH Pages pipeline | Already working; don't re-solve hosting/DNS | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-08 after Phase 2 (Content & Conversion Spine) — complete; full sendable landing page live in build, cinematic hero pending Phases 3-4*
