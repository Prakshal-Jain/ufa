# Architecture Research

**Domain:** Cinematic, motion-rich, mobile-first marketing landing page (single epic scrolling page) — Next.js static export → GitHub Pages
**Researched:** 2026-06-08
**Confidence:** HIGH

## Standard Architecture

A performant cinematic landing page is best structured as **four cleanly separated layers**: a thin **page/composition layer** that orders sections, a set of self-contained **section components** (the visible content beats), a shared **design-system/theme layer** (tokens, typography, color/gradient), and a **motion layer** that section components consume but do not own. Hand-curated content (matches, prizes) lives in a **local data/config layer** read at build time. The single WebGL "showpiece" hero is isolated behind a lazy boundary so it never blocks first paint and degrades to a static poster.

The dominant constraint that shapes everything: **`output: "export"` means no server runtime.** No image optimization endpoint, no API routes, no server components doing data fetching at request time, no middleware. All "data" is local TypeScript/JSON resolved at build. All interactivity (scroll, motion, lazy hero) is client-side and progressively enhanced on top of static HTML.

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    COMPOSITION LAYER (app/)                        │
│   app/layout.tsx  ──  metadata, fonts, <html>, global CSS          │
│   app/page.tsx    ──  orders sections top→bottom (the "edit")      │
│        │ imports + sequences                                       │
├────────┴───────────────────────────────────────────────────────────┤
│                    SECTION LAYER (components/sections/)            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │
│  │ Hero   │ │Concept │ │Matches │ │ Prizes │ │ Lineage│ │  CTA  │ │
│  │(show-  │ │ /How   │ │/Footage│ │/Credits│ │UFC→UFB │ │Sponsor│ │
│  │ piece) │ │it works│ │        │ │        │ │ →UFA   │ │       │ │
│  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬───┘ │
│      │ each section consumes motion + tokens, reads local data     │
├──────┴────────────────────┬──────────────────────┬─────────────────┤
│   MOTION LAYER             │   DESIGN-SYSTEM LAYER │  DATA LAYER     │
│  components/motion/        │   styles/ + tokens    │  data/          │
│  ┌──────────────────────┐  │  ┌─────────────────┐  │ ┌────────────┐  │
│  │ Reveal (whileInView) │  │  │ tokens.css       │  │ │matches.ts  │  │
│  │ ScrollParallax       │  │  │ (CSS custom      │  │ │prizes.ts   │  │
│  │ ScrollProgress       │  │  │  props)          │  │ │site.ts     │  │
│  │ useReducedMotionSafe │  │  │ typography scale │  │ │(typed,     │  │
│  │ MotionConfig wrapper │  │  │ color/gradient   │  │ │ build-time)│  │
│  │ LazyHeroScene (R3F)  │  │  │ tokens.ts (TS    │  │ └────────────┘  │
│  └──────────────────────┘  │  │  mirror for JS)  │  │                 │
│   (all "use client")       │  └─────────────────┘  │                 │
└────────────────────────────┴──────────────────────┴─────────────────┘
                              │
                   ┌──────────┴──────────┐
                   │   ASSET PIPELINE     │
                   │  public/ (static)    │
                   │  pre-optimized webp/ │
                   │  avif, mp4 + poster, │
                   │  draco-compressed    │
                   │  glb (if 3D)         │
                   └──────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `app/layout.tsx` | Root HTML, `<head>` metadata/OG, font loading (`next/font`), import global token CSS, set `<MotionConfig reducedMotion="user">` if global | Server Component (no `"use client"`) |
| `app/page.tsx` | Compose sections in scroll order — the "edit." No styling logic, no data logic | Server Component; imports section components |
| `components/sections/*` | One visible page beat each. Owns its own layout + copy, pulls visuals from `public/`, content from `data/`, motion from the motion layer | Mostly Server Components; mark `"use client"` only when they directly use a hook (scroll/inView) |
| `components/motion/*` | Reusable animation primitives (Reveal, Parallax, ScrollProgress) + reduced-motion gating + the `MotionConfig` provider | All `"use client"` |
| `components/motion/LazyHeroScene` | The single WebGL/heavy showpiece, isolated behind `next/dynamic({ ssr:false })` with a static poster fallback | `"use client"`, dynamically imported |
| `styles/tokens.css` + `tokens.ts` | Single source of truth for color, gradient, spacing, type scale. CSS custom props for styling; a typed TS mirror for values motion code needs in JS | CSS `:root {}` vars + exported TS constants |
| `data/*.ts` | Hand-curated matches, prize pool, lineage copy as typed local data | Plain typed exports, imported at build |
| `components/ui/*` | Primitive presentational pieces (Button/CTA, GradientText, SectionShell, Tag) shared across sections | Stateless; Server unless interactive |

## Recommended Project Structure

```
ufa/
├── app/
│   ├── layout.tsx              # root HTML, metadata/OG, fonts, global CSS import
│   ├── page.tsx                # composition: orders <Hero/><Concept/>…<CTA/>
│   └── globals.css             # @import tokens.css; resets; base element styles
├── components/
│   ├── sections/               # one file per scroll beat
│   │   ├── Hero.tsx            # the showpiece host (mounts LazyHeroScene)
│   │   ├── Concept.tsx        # "agents interrogate + fight" explainer
│   │   ├── Matches.tsx        # real footage / versus moments
│   │   ├── Prizes.tsx         # prize pool / credits
│   │   ├── Lineage.tsx        # UFC → UFB → UFA brand beat
│   │   └── CTA.tsx            # sponsor / get-in-touch
│   ├── motion/                 # the motion layer (all "use client")
│   │   ├── MotionProvider.tsx # <MotionConfig reducedMotion="user">
│   │   ├── Reveal.tsx         # whileInView fade/slide wrapper
│   │   ├── ScrollParallax.tsx # useScroll → transform y/scale
│   │   ├── ScrollProgress.tsx # scroll progress bar/indicator
│   │   ├── LazyHeroScene.tsx  # next/dynamic boundary for R3F/WebGL
│   │   └── useReducedMotionSafe.ts
│   └── ui/                     # shared presentational primitives
│       ├── SectionShell.tsx   # consistent section padding/max-width/snap
│       ├── CTAButton.tsx
│       └── GradientText.tsx
├── styles/
│   ├── tokens.css              # :root CSS custom properties (SOURCE OF TRUTH)
│   └── tokens.ts               # typed TS mirror for values JS/motion needs
├── data/                       # hand-curated build-time content
│   ├── matches.ts
│   ├── prizes.ts
│   └── site.ts                 # nav copy, CTA targets, meta strings
├── public/
│   ├── CNAME                   # KEEP — GitHub Pages domain
│   ├── .nojekyll               # KEEP — disables Jekyll
│   ├── media/                  # pre-optimized webp/avif, mp4 + poster.jpg
│   └── models/                 # draco-compressed .glb (only if WebGL hero)
└── next.config.mjs             # output:"export", images.unoptimized:true
```

### Structure Rationale

- **`app/` stays thin.** `page.tsx` is the "edit" — its only job is ordering sections. This makes reordering/cutting a section a one-line change and keeps the wow-factor iteration loop fast.
- **`components/sections/` = one file per scroll beat.** Each section is independently understandable and buildable. Maps 1:1 to roadmap phases (build Hero, then Concept, then Matches…), so phases have crisp boundaries.
- **`components/motion/` is separate from sections** so animation behavior is reusable and reduced-motion handling is centralized in one place rather than copy-pasted. Sections *consume* motion; they don't reimplement it.
- **`styles/tokens.css` is the single source of truth, with `tokens.ts` as a typed mirror.** CSS styling reads custom properties; motion code (which sets transform/opacity values in JS) reads the TS constants. Two representations, one conceptual source — keep them in sync deliberately.
- **`data/` separates content from presentation.** Matches/prizes change often and are user-provided; isolating them means content edits never touch component or motion code.
- **`public/media` pre-optimized** because static export disables Next's image optimizer (see Asset Pipeline). Optimization is a pre-commit asset step, not a build-time one.

## Architectural Patterns

### Pattern 1: Thin Composition Root ("the edit")

**What:** `page.tsx` imports section components and renders them in order, nothing else. All styling/data/motion lives below it.
**When to use:** Always for a single long-scroll page. It is the whole point of the section-per-file split.
**Trade-offs:** Trivial to reorder, cut, or A/B sections. Cost: a section that needs to coordinate with another (e.g. a global scroll progress bar) must lift that shared concern into a wrapper or the layout, not into `page.tsx`.

**Example:**
```tsx
// app/page.tsx — Server Component, no "use client"
import { Hero } from "@/components/sections/Hero";
import { Concept } from "@/components/sections/Concept";
import { Matches } from "@/components/sections/Matches";
import { Prizes } from "@/components/sections/Prizes";
import { Lineage } from "@/components/sections/Lineage";
import { CTA } from "@/components/sections/CTA";

export default function Page() {
  return (
    <main>
      <Hero />
      <Concept />
      <Matches />
      <Prizes />
      <Lineage />
      <CTA />
    </main>
  );
}
```

### Pattern 2: Motion as a Consumed Layer (not inline per section)

**What:** Animation primitives are reusable client components. Sections wrap content in `<Reveal>` / `<ScrollParallax>` rather than each importing `motion` and wiring `useInView` themselves.
**When to use:** Any time more than one section needs the same reveal/parallax behavior — which is always on this kind of page.
**Trade-offs:** Centralizes reduced-motion gating and keeps section files declarative. Cost: the bespoke hero choreography won't fit the generic primitives — that's expected; the hero gets custom motion code, everything else uses the shared primitives.

**Example:**
```tsx
// components/motion/Reveal.tsx
"use client";
import { motion } from "motion/react"; // 2026 unified package
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export function Reveal({ children, y = 24, delay = 0 }: {
  children: React.ReactNode; y?: number; delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <>{children}</>;          // progressive enhancement
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```
Note (HIGH confidence, verified): in 2026 the package is unified under `motion`, imported via `motion/react`; `framer-motion` legacy imports still work but `motion/react` is the optimized path. Scroll-triggered animations use a pooled IntersectionObserver and scroll-*linked* animations default to the browser's native `ScrollTimeline` (off main thread) with a JS fallback — this is why animating only `transform`/`opacity` stays 60fps.

### Pattern 3: Isolated, Lazy, Degradable Hero Showpiece

**What:** The single heavy hero (WebGL/R3F or heavy canvas) is loaded with `next/dynamic({ ssr: false })`, behind a Suspense/poster fallback, mounted only after first paint and only when motion is allowed and the device can handle it.
**When to use:** Exactly once — the hero. This is the project's "maximal only in hero" decision made concrete.
**Trade-offs:** Keeps the heavy bundle out of the initial JS so mobile gets fast first paint and a crisp static poster immediately; the rich scene streams in after. Cost: a real loading/hand-off state to design (poster → scene swap must not flash).

**Example:**
```tsx
// components/motion/LazyHeroScene.tsx
"use client";
import dynamic from "next/dynamic";
// ssr:false is REQUIRED — WebGL/R3F has no server render under static export
const HeroScene = dynamic(() => import("./HeroSceneImpl"), {
  ssr: false,
  loading: () => null, // poster is shown by the parent until this mounts
});

export function LazyHeroScene({ enabled }: { enabled: boolean }) {
  if (!enabled) return null; // gated by reduced-motion + capability check
  return <HeroScene />;
}
```
```tsx
// components/sections/Hero.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LazyHeroScene } from "@/components/motion/LazyHeroScene";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

export function Hero() {
  const reduced = useReducedMotionSafe();
  const [enhance, setEnhance] = useState(false);
  useEffect(() => {
    // enhance after mount, never on reduced-motion or tiny/low-power hints
    const ok = !reduced && (navigator.hardwareConcurrency ?? 4) >= 4;
    if (ok) setEnhance(true);
  }, [reduced]);

  return (
    <section className="hero">
      {/* Static poster is ALWAYS the base layer = guaranteed first paint */}
      <Image src="/media/hero-poster.avif" alt="" fill priority sizes="100vw" />
      {enhance && <LazyHeroScene enabled />}
    </section>
  );
}
```

### Pattern 4: Dual-Representation Design Tokens

**What:** Tokens live in `styles/tokens.css` as CSS custom properties (consumed by all styling) and are mirrored in `styles/tokens.ts` as typed constants (consumed by motion/JS that needs numeric values).
**When to use:** Whenever JS animation needs a token value (e.g. an accent color for a canvas, a spacing unit for a transform distance) — CSS vars aren't directly readable as typed values in JS without `getComputedStyle`.
**Trade-offs:** One conceptual source, two files to keep in sync. Acceptable for a small token set; if it grows, generate `tokens.ts` from `tokens.css` (or vice versa) in a tiny build script.

**Example:**
```css
/* styles/tokens.css */
:root {
  --bg: #05060a;
  --fg: #f4f6ff;
  --accent-iridescent: linear-gradient(120deg,#7af,#a7f,#fae);
  --space-section: clamp(4rem, 12vw, 10rem);
  --type-display: clamp(3rem, 11vw, 9rem); /* fluid cinematic type */
}
```
```ts
// styles/tokens.ts — values JS/motion needs
export const tokens = {
  bg: "#05060a",
  fg: "#f4f6ff",
  parallaxRange: 80, // px, used by ScrollParallax transforms
} as const;
```

### Pattern 5: Build-Time Local Data

**What:** Matches and prizes are typed TS modules in `data/`, imported directly into sections. No fetch, no API, no CMS.
**When to use:** Static export with hand-curated, infrequently-changing content — exactly this project.
**Trade-offs:** Type-safe, zero runtime cost, edits are git diffs. Cost: a non-developer can't edit content without touching the repo (acceptable for v1; a markdown/JSON + light CMS is a later concern, explicitly out of scope now).

**Example:**
```ts
// data/prizes.ts
export interface PrizeTier { label: string; amount: string; note?: string; }
export const prizePool: PrizeTier[] = [
  { label: "Grand Prize", amount: "$50,000", note: "+ compute credits" },
  { label: "Runner-up", amount: "$15,000" },
];
```

## Data Flow

### Render / Enhancement Flow

```
[next build]  (output:"export")
   ↓ resolves data/*.ts at build time
[Static HTML in out/]  ← page.tsx + sections, fully styled via tokens.css
   ↓ ships to GitHub Pages
[Browser: instant first paint]  ← HTML + CSS + hero POSTER (no JS needed to see content)
   ↓ hydrate client components
[Motion layer activates]  ← IntersectionObserver reveals, ScrollTimeline parallax
   ↓ if !reduced-motion && capable device
[LazyHeroScene streams in]  ← next/dynamic loads WebGL bundle, swaps over poster
```

### Reduced-Motion / Capability Gate (cross-cutting)

```
prefers-reduced-motion?  ──yes──▶ static poster, no parallax, instant reveals (no transitions)
        │ no
        ▼
device capable (cores/heuristic)?  ──no──▶ poster + lightweight CSS motion only
        │ yes
        ▼
full experience: WebGL hero + scroll-linked parallax + reveals
```

### Key Data Flows

1. **Content flow:** `data/*.ts` → imported by section component → rendered into static HTML at build. One direction, build-time only.
2. **Token flow:** `tokens.css` → consumed by every component's styles; `tokens.ts` → consumed by motion code needing JS values.
3. **Motion flow:** scroll/viewport events → motion layer primitives (`useScroll`/`whileInView`) → transform/opacity on sections. Never touches data or tokens' source.
4. **Hero hand-off flow:** poster (build-time, always present) → capability check (client mount) → dynamic import → scene mounts above poster.

## Scaling Considerations

For a marketing landing page "scale" means **bundle/asset weight and motion smoothness**, not user count — GitHub Pages serves static files to effectively unlimited traffic for free.

| Scale axis | Adjustments |
|------------|-------------|
| Content grows (more matches/prizes) | Already handled — `data/*.ts` arrays; sections map over them. No structural change. |
| More sections / longer page | Lazy-load below-the-fold heavy media with `loading="lazy"` and IntersectionObserver-mounted motion. Hero stays the only eager heavy asset. |
| Heavier hero visuals | Tighten the capability gate, add Draco compression for `.glb`, LOD, cap devicePixelRatio for the canvas, pause render loop when hero scrolls out of view. |
| Page becomes multi-route (future) | The section/motion/token/data split already supports it — promote shared layers to a route group; out of scope for v1. |

### Scaling Priorities

1. **First bottleneck: initial JS + hero asset weight on mobile.** Fix: hero behind `next/dynamic`, poster-first paint, `transform`/`opacity`-only animation, pre-optimized media. This is the single most important architectural decision.
2. **Second bottleneck: scroll jank from too many simultaneous scroll-linked animations.** Fix: prefer `whileInView` (pooled IntersectionObserver, fire-once) over per-element `useScroll`; reserve scroll-linked parallax for a few hero/feature elements; only animate GPU-friendly properties.

## Anti-Patterns

### Anti-Pattern 1: Using `next/image` optimization under static export

**What people do:** Use `<Image>` expecting WebP/AVIF resizing, then hit `Image Optimization not compatible with next export` at build.
**Why it's wrong:** `output:"export"` has no server to run the optimizer. Build fails or, with `unoptimized:true`, a 2MB JPEG ships as a 2MB JPEG.
**Do this instead:** Set `images: { unoptimized: true }` in `next.config.mjs` and **pre-optimize assets before committing** (export AVIF/WebP + responsive sizes manually or via `next-image-export-optimizer`). You still get lazy-loading and CLS-safe layout from `<Image>`; you own the byte-size. (HIGH confidence — confirmed in Next.js docs.)

### Anti-Pattern 2: Animating layout-affecting properties

**What people do:** Animate `top`/`left`/`width`/`height`/`margin` for parallax and reveals.
**Why it's wrong:** These trigger layout + paint every frame → drops below 60fps, especially on mobile. Defeats the entire "smooth on phones" requirement.
**Do this instead:** Animate only `transform` (x/y/scale/rotate), `opacity`, `clipPath`, `filter` — GPU-composited, what Motion's ScrollTimeline path is built for.

### Anti-Pattern 3: One giant client component

**What people do:** Mark the whole page `"use client"` and put all sections + motion in one file.
**Why it's wrong:** Ships everything as client JS, kills the static-HTML/first-paint advantage, makes the hero's heavy code part of the initial bundle.
**Do this instead:** Keep `layout.tsx`/`page.tsx`/most sections as Server Components; push `"use client"` down to the smallest leaves that actually use hooks (motion primitives, the hero host). Heavy hero code goes behind `next/dynamic`.

### Anti-Pattern 4: Reduced-motion as an afterthought

**What people do:** Build all the motion, then try to bolt on `prefers-reduced-motion` at the end.
**Why it's wrong:** Retro-fitting means every animation needs an individual guard; easy to miss the WebGL hero (the most motion-heavy element).
**Do this instead:** Centralize via `<MotionConfig reducedMotion="user">` + a `useReducedMotionSafe` hook, and make the reduced path the *base* (poster + no transitions); enhancement is additive. PROJECT.md requires this — make it structural from phase one.

### Anti-Pattern 5: Forgetting GitHub Pages static-host files

**What people do:** Restructure `public/` or change build and lose `CNAME` / `.nojekyll`.
**Why it's wrong:** Domain breaks (`ufa.foundation` stops resolving) or Pages tries Jekyll processing and mangles `_next/`.
**Do this instead:** Keep `public/CNAME` and `public/.nojekyll` (they copy into `out/`); never remove them. They are load-bearing infra, already validated.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Static `out/` deploy via existing GH Actions | No change to pipeline; just keep CNAME/.nojekyll |
| Lead capture (CTA) | Static-friendly: `mailto:`, external form (Tally/Typeform/Formspree) link, or Calendly | No backend — must be a client-side/external integration. Decide in CTA phase. |
| Video footage | Self-hosted `public/media/*.mp4` + poster, or external embed (Vimeo/YT) | Self-host small clips for control; embed long footage to avoid repo/bundle bloat |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| page ↔ sections | Direct import + render | One-directional composition |
| sections ↔ motion | Wrap children in primitives | Sections never import `motion` directly; use the layer |
| sections ↔ data | Direct typed import | Build-time, read-only |
| sections/motion ↔ tokens | CSS vars (style) + `tokens.ts` (JS) | Dual representation, kept in sync |
| Hero ↔ heavy scene | `next/dynamic({ssr:false})` boundary | Hard split so the bundle stays out of initial load |

## Build Order Implications (dependency-ordered)

The layers have a strict dependency order — build foundations before things that consume them. This maps directly to roadmap phases:

1. **Foundations: tokens + config.** `next.config.mjs` (`output:"export"`, `images.unoptimized`), `styles/tokens.css` + `tokens.ts`, `next/font` in `layout.tsx`, keep CNAME/.nojekyll. Everything depends on this.
2. **Motion layer + UI primitives.** `MotionProvider`, `Reveal`, `ScrollParallax`, `ScrollProgress`, `useReducedMotionSafe`, `SectionShell`, `CTAButton`. Sections can't be built well without these. Establish reduced-motion baseline here.
3. **Data layer.** `data/matches.ts`, `prizes.ts`, `site.ts` (can be stubbed/placeholder, refined as real content arrives). Sections that show curated content depend on this.
4. **Static sections (the simpler beats first).** Concept, Prizes, Lineage, CTA — these use tokens + motion primitives + data, no WebGL. Validates the whole pipeline end-to-end (build → Pages → mobile) before the risky hero.
5. **Hero poster + structure.** Build the hero as a *static, poster-based* section first — it must look great with zero JS. This is the de-risked baseline and the reduced-motion target.
6. **Hero showpiece (highest risk, last).** Add `LazyHeroScene` (WebGL/R3F) behind `next/dynamic`, capability-gated, swapping over the poster. Isolated last so the page is fully shippable before this exists.
7. **Asset optimization + perf pass.** Pre-optimize media (AVIF/WebP, Draco for any GLB), Lighthouse/mobile FPS pass, verify reduced-motion path and 60fps.

**Why this order:** each phase only depends on earlier ones; the page is deployable and impressive after step 5; the single highest-risk element (the WebGL hero) is fully isolated and comes last, so it can slip or simplify without blocking launch — exactly matching the "bold but performant, maximal only in hero" decision.

## Sources

- [Motion (motion/react) scroll animations — official docs](https://www.framer.com/motion/scroll-animations/) — HIGH
- [useScroll — Motion React official docs](https://www.framer.com/motion/use-scroll/) — HIGH
- [Framer Motion complete React & Next.js guide 2026 (2026 `motion/react` unification, ScrollTimeline, IntersectionObserver pooling)](https://inhaq.com/blog/framer-motion-complete-guide-react-nextjs-developers) — MEDIUM (verified against official docs)
- [Next.js — Export with Image Optimization API (static export image constraint)](https://nextjs.org/docs/messages/export-image-api) — HIGH
- [Next.js — Static Exports guide](https://nextjs.org/docs/pages/guides/static-exports) — HIGH
- [Next.js — Lazy Loading client components (`next/dynamic`, ssr:false)](https://nextjs.org/docs/app/guides/lazy-loading) — HIGH
- [next-image-export-optimizer (asset optimization for static export)](https://github.com/Niels-IO/next-image-export-optimizer) — MEDIUM
- [Boosting React Three Fiber mobile performance 2026 (Draco, LOD, lazy load)](https://www.krapton.com/blog/boosting-react-three-fiber-mobile-performance-in-2026-a-deep-dive-d6105c) — MEDIUM
- Existing codebase: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`, `.planning/PROJECT.md` — HIGH

---
*Architecture research for: cinematic mobile-first Next.js static-export landing page*
*Researched: 2026-06-08*
