# Requirements: Ultimate Agent Fight (UFA)

**Defined:** 2026-06-08
**Core Value:** A first-time visitor on a phone feels "I need to be part of this" within the first screen — and knows exactly how to get in touch / sponsor.

## v1 Requirements

Single epic-scrolling cinematic landing page (Next.js static export → GitHub Pages). Each requirement maps to a roadmap phase.

### Foundation & Delivery

- [x] **SITE-01**: Visitor reaches the new landing page at `ufa.foundation` over HTTPS, replacing the Coming Soon placeholder
- [x] **SITE-02**: All styles, scripts, fonts, and media load correctly from the apex root on the *deployed* site (no broken paths); `CNAME` + `.nojekyll` preserved in the build output
- [x] **SITE-03**: Pushing to `main` auto-builds and deploys the updated site via the existing GitHub Actions pipeline
- [x] **SITE-04**: Shared links preview well — page has title, description, and a static Open Graph image

### Hero

- [ ] **HERO-01**: Visitor sees a cinematic showpiece hero in the first screen that conveys "Ultimate Agent Fight" and high energy
- [ ] **HERO-02**: Hero states the one-line value (AI agents interrogate + fight to win credits/money) as readable text, legible with motion stripped out
- [ ] **HERO-03**: A primary "get in touch / sponsor" CTA is visible within the first screen
- [ ] **HERO-04**: Hero degrades to a static poster image when WebGL is unavailable, the device is low-capability, or `prefers-reduced-motion` is set

### Concept & How It Works

- [x] **CONCEPT-01**: Visitor can read a clear explanation of what UFA is (agents interrogate + fight for credits/money)
- [x] **CONCEPT-02**: Visitor can understand how a fight works via a "how it works" section (format / flow)
- [x] **CONCEPT-03**: Positioning leans into the UFC → UFB → UFA lineage

### Spectacle Showcase

- [x] **SHOW-01**: Visitor can view a showcase of matches (footage / clips / highlights), built to accept placeholder media that is swappable later
- [x] **SHOW-02**: Showcase is compelling and performant on mobile (no autoplay sound, no jank)

### Prize & Standings

- [x] **PRIZE-01**: Visitor sees the prize pool / credits on offer
- [x] **PRIZE-02**: Visitor sees a standings / leaderboard teaser of competing agents

### Sponsor Conversion

- [ ] **SPON-01**: Visitor sees sponsor-value framing (why sponsor UFA, audience reach)
- [ ] **SPON-02**: Visitor sees a partner / sponsor logo wall (placeholder-capable)
- [ ] **SPON-03**: Visitor sees a traction / metrics strip
- [ ] **SPON-04**: Visitor can submit interest through a working hosted form (Formspree or Tally) for "get in touch / sponsor"
- [ ] **SPON-05**: The CTA is repeated near the end of the page with social proof placed adjacent to it

### Motion & Experience

- [ ] **MOTION-01**: Scroll-driven cinematic motion (reveals, parallax, depth) animates the sections
- [x] **MOTION-02**: All motion is disabled/reduced when `prefers-reduced-motion` is set; the page is fully readable and usable without motion (reduced path is the base case)
- [ ] **MOTION-03**: Page holds ~60fps on a mid-tier phone — animations are limited to `transform`/`opacity`/`filter` and avoid layout-shifting properties

### Quality

- [ ] **QA-01**: Site is responsive and fully usable across mobile, tablet, and desktop
- [ ] **QA-02**: Text/UI meets WCAG AA contrast on gradient backgrounds; keyboard focus is visible; the CTA is reachable and submittable by keyboard
- [ ] **QA-03**: Lighthouse mobile performance is strong (no animation-library-induced CLS; fast first paint)

## v2 Requirements

Deferred — acknowledged but not in the current roadmap.

### Expansion

- **EXP-01**: Dedicated multi-page routes (full Matches, full Leaderboard, About)
- **EXP-02**: Live / real-time standings fed from a backend
- **EXP-03**: Agent submission / competition entry flow
- **EXP-04**: Maximal WebGL treatment beyond the single hero beat

## Out of Scope

Explicitly excluded for v1, with reasoning.

| Feature | Reason |
|---------|--------|
| Backend / database / API | Static export on GitHub Pages; all content hand-curated. Lead capture via hosted form instead |
| User accounts / auth | Marketing site — no logged-in experience needed |
| Ticketing / payments / e-commerce | Goal is sponsor contact, not transactions |
| Live video stream embed | Showcase uses curated clips, not a live broadcast |
| Autoplay audio | Hostile on mobile; hurts the first impression |
| Multi-page site | v1 is one landing page; expansion deferred to v2 |

## Traceability

Mapped to phases in ROADMAP.md. Every v1 requirement maps to exactly one phase. Phase 4 (WebGL hero) owns no exclusive requirement — it enhances HERO-01 (delivered in Phase 3) and is bounded by the HERO-04 fallback contract, so it remains droppable without leaving any requirement unmet.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Phase 1 | Complete |
| SITE-02 | Phase 1 | Complete |
| SITE-03 | Phase 1 | Complete |
| SITE-04 | Phase 1 | Complete |
| MOTION-02 | Phase 1 | Complete |
| CONCEPT-01 | Phase 2 | Complete |
| CONCEPT-02 | Phase 2 | Complete |
| CONCEPT-03 | Phase 2 | Complete |
| SHOW-01 | Phase 2 | Complete |
| SHOW-02 | Phase 2 | Complete |
| PRIZE-01 | Phase 2 | Complete |
| PRIZE-02 | Phase 2 | Complete |
| SPON-01 | Phase 2 | Pending |
| SPON-02 | Phase 2 | Pending |
| SPON-03 | Phase 2 | Pending |
| SPON-04 | Phase 2 | Pending |
| SPON-05 | Phase 2 | Pending |
| MOTION-01 | Phase 2 | Pending |
| MOTION-03 | Phase 2 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| QA-01 | Phase 5 | Pending |
| QA-02 | Phase 5 | Pending |
| QA-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 26 total (enumerated; the prose header's "24" predates final enumeration)
- Mapped to phases: 26
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-08*
*Last updated: 2026-06-08 after roadmap creation (traceability populated)*
