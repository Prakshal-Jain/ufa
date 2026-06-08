# Stack Research

**Domain:** Cinematic, motion-rich, mobile-first marketing landing page (single page) built as a Next.js static export on GitHub Pages
**Researched:** 2026-06-08
**Confidence:** HIGH (all versions verified against live npm; static-export gotchas verified against official docs + R3F/Next discussions)

## Headline Recommendation

Build the cinematic motion with **GSAP 3 + ScrollTrigger + Lenis** for the scroll narrative, **Motion (`motion/react`) for component/UI micro-interactions**, **Tailwind CSS v4** for styling, and **`next/font/local` with self-hosted WOFF2 variable fonts** for type. Reserve **react-three-fiber + a single shader** for the ONE hero "versus" beat only, behind a `dynamic(..., { ssr: false })` boundary and a lazy/in-view loader — and treat it as progressive enhancement that degrades to a CSS/canvas-2D fallback. Every motion system gates on `prefers-reduced-motion`.

This matches the project's "bold but performant, maximal only in hero" constraint and the hard `output: "export"` + no-server-runtime requirement.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.2.7 (installed) | Framework + static export to `out/` | Already wired to the working GH Pages pipeline. No reason to change. Static export is fully supported; just keep client-only code behind `ssr:false` boundaries. |
| React | 19.1.0 (installed) | UI | Installed. R3F 9, Motion 12, and drei 10 all explicitly support React 19. |
| TypeScript | 5.x (installed) | Type safety | Installed. |
| Tailwind CSS | 4.3.0 | Styling / design tokens | v4's Rust "Oxide" engine: ~5x faster full builds, production CSS ~70% smaller (typical 6–12 KB gzipped vs 20–30 KB on v3). CSS-first `@theme` config maps perfectly onto a cinematic design-token system (gradient stops, holographic accents). Static-export safe — it's just CSS emitted at build time. |
| GSAP | 3.15.0 | Scroll-driven cinematic timeline (the spine of the page) | **As of April 2025, GSAP is 100% free including ALL former Club plugins (ScrollTrigger, SplitText, MorphSVG, DrawSVG) — Webflow now funds it.** This removes the only historical reason to avoid GSAP. ScrollTrigger is the industry standard for scroll-scrubbed cinematic sequences (pinning, scrubbing, staggered reveals) and is far more capable than scroll libraries built into component frameworks. Pure JS, zero server dependency — static-export safe. |
| Motion (formerly Framer Motion) | 12.40.0 | Component-level motion: entrance/exit, layout, gestures, hover/tap | Import from `motion/react` (the package is now `motion`, not `framer-motion`). Best-in-class declarative React API, hybrid WAWAPI engine for 60–120fps on GPU-composited properties, built-in `useReducedMotion()` hook. ~34 KB gzip tree-shaken. Use it for the React-idiomatic 80%; use GSAP for the scroll spine. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @gsap/react | 2.1.2 | `useGSAP()` hook — React-safe GSAP context + automatic cleanup | Always, when using GSAP in React. Prevents the #1 GSAP-in-React bug (animations leaking across re-renders / StrictMode double-invoke). |
| lenis | 1.3.23 | Smooth-scroll momentum synced to GSAP ticker | For the cinematic "buttery" scroll feel. ~3 KB. Drive Lenis's RAF from GSAP's ticker and call `ScrollTrigger.update` on Lenis scroll. **Must be disabled under reduced-motion and tuned/disabled on low-end mobile** (see Pitfalls in PITFALLS.md). Optional but high-impact for this aesthetic. |
| @react-three/fiber | 9.6.1 | React renderer for three.js — HERO BEAT ONLY | The single agent-vs-agent shader/3D moment. Pairs with React 19. MUST be loaded via `next/dynamic(..., { ssr:false })` because three.js touches `window`/`document` and will crash a static build otherwise. |
| three | 0.184.0 | WebGL engine under R3F | Transitive but pin it. Heavy (~150 KB+ gzip core); justifies lazy-loading the hero only. |
| @react-three/drei | 10.7.7 | Helpers (shaderMaterial, Float, useTexture, etc.) | Only the specific helpers needed for the hero. **Import per-helper** (`@react-three/drei/core/...` style / named imports) — never `import * as drei`, which balloons the bundle. |
| @react-three/postprocessing | 3.0.4 | Bloom / chromatic-aberration / film grain for the "iridescent holographic" look | Optional, hero only. A single Bloom pass sells the sci-fi glow cheaply; chain more effects only after profiling on a real phone. ESM-only, R3F9/React19. |

> **3D verdict for ONE hero beat:** Worth it — but only as a *lazy-loaded, fallback-gated accent*, not the page backbone. A custom fragment shader on a single full-screen plane (via drei `shaderMaterial`) gives the iridescent/holographic "generated spectacle" the brief asks for at a fraction of the cost of a full 3D scene with models. If timeline is tight, a pure-CSS/conic-gradient + Motion hero is a legitimate v1 that ships the "holy shit" feeling without any of the three.js weight — add WebGL as enhancement.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `@next/bundle-analyzer` | Verify three.js/drei stay isolated in their own lazy chunk | Confirm the hero WebGL code is NOT in the initial/main chunk. This is the single most important perf check for this stack. |
| Lighthouse / Lighthouse CI (mobile preset) | Mobile perf budget gate | Run against the built `out/` on a throttled mobile profile. Target LCP < 2.5s, CLS ~0, smooth INP. |
| Chrome DevTools Performance + real iPhone/mid-Android | Confirm ~60fps during scroll & hero | Emulators lie about GPU. The brief's 60fps-on-phones bar requires testing on a real mid-tier device. |
| `prefers-reduced-motion` toggle (OS-level) | Verify reduced-motion fallback path | ~25% of macOS/iOS users have this set; it must visibly disable scroll-scrub, Lenis, and the hero shader loop. |

## Installation

```bash
# Core styling (Tailwind v4 uses the dedicated PostCSS plugin)
npm install -D tailwindcss @tailwindcss/postcss

# Scroll cinematic spine
npm install gsap @gsap/react lenis

# Component motion / UI micro-interactions
npm install motion

# Hero WebGL beat ONLY (lazy-loaded, ssr:false) — install only if doing the shader hero
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three

# Perf tooling
npm install -D @next/bundle-analyzer
```

Fonts need no package — use the built-in `next/font/local` with WOFF2 files committed to the repo.

## Fonts Strategy (static-export specific)

- **Use `next/font/local`** pointing at **self-hosted WOFF2 variable fonts** committed in the repo. With static export, `next/font` downloads/embeds at build time and self-hosts from your own origin — zero runtime requests to Google, no FOUT, no external dependency. (`next/font/google` also self-hosts at build time and works with export, but a *local* variable file gives full control over a custom cinematic display face and avoids any build-time network fetch.)
- **Prefer a single variable font file per family** (one file spans weights 100–900) to cut requests and bytes — ideal for a large-type cinematic display face plus one clean UI/body face.
- **Expose as CSS variables** (`variable: '--font-display'`) and wire into Tailwind v4 `@theme` tokens so type stays consistent and themable.
- Set `display: 'swap'` and provide an `adjustFontFallback`/size-adjusted fallback to keep CLS at ~0 on the hero headline.
- **License check:** confirm WOFF2 web-embedding rights for any commercial display face before committing it.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| GSAP + ScrollTrigger (scroll spine) | Motion's `useScroll`/`scroll()` only | If you want to avoid a second animation lib entirely and the scroll choreography is simple (a few parallax/opacity ties). Motion alone is fine for light scroll; GSAP wins decisively for pinned, scrubbed, multi-step cinematic timelines. |
| Motion (component motion) | GSAP for everything | If you'd rather standardize on one library. GSAP can do component motion too, but Motion's declarative React API + variants are far more ergonomic for entrance/gesture/layout work. The two coexist cleanly (different jobs). |
| Tailwind v4 | CSS Modules / vanilla-extract | CSS Modules if the team strongly prefers scoped hand-written CSS and minimal tooling; vanilla-extract if you want type-safe zero-runtime CSS-in-TS. Both are static-export safe. Tailwind v4 wins here for speed of iterating a token-driven cinematic system and tiny output. |
| react-three-fiber (hero) | Raw three.js, or OGL, or pure CSS/Canvas2D | Raw three.js if you want zero React overhead in the hero (more boilerplate). **OGL** (~tiny) if you only need one shader plane and want a far smaller WebGL footprint than three.js. **Pure CSS/Canvas2D** if perf budget or timeline can't justify any WebGL — a conic/animated-gradient + grain hero still reads cinematic. |
| Lenis | Native CSS scroll + scroll-driven animations (`animation-timeline: scroll()`) | Native scroll-driven CSS animations are now broadly supported and are the most performant option for simple scroll-linked effects with zero JS. Use them for lightweight parallax; use Lenis when you specifically want momentum/eased smooth-scroll feel. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` package name | Renamed to `motion`; importing the old package pulls an outdated path. | `npm install motion` and `import { motion } from 'motion/react'`. |
| Importing R3F/three at module top level (no `ssr:false`) | three.js touches `window`/`document`; this throws "window is not defined" and **breaks the static export build**. | `const Hero = dynamic(() => import('./Hero'), { ssr: false })` and lazy/in-view mount. |
| `import * as Drei from '@react-three/drei'` | Pulls the entire helper library into the bundle — tens of KB of unused code. | Named/per-helper imports of only what the hero uses. |
| Next.js `<Image>` optimization / `next/image` loader | `output: "export"` requires `images.unoptimized: true` (already set); the optimizer needs a server runtime that GH Pages doesn't have. | Pre-optimize assets at build (sharp/squoosh), serve WOFF2/AVIF/WebP statically, lazy-load below-fold media. |
| Any SSR/ISR/Route Handlers/Server Actions | No server runtime on GH Pages; these silently don't apply or break export. | Everything client-side or build-time only. |
| Heavy GLTF models / multiple post-processing passes in hero | Blows the mobile 60fps + LCP budget; large binary assets bloat the static build. | Single full-screen shader plane + at most one Bloom pass; profile before adding. |
| `lottie-web` for large hero animations | Big JSON payloads + main-thread cost on mobile for complex comps. | GSAP/Motion-driven SVG/DOM, or the shader hero. (Lottie is fine for tiny icon flourishes.) |
| Tailwind v3 | Slower builds, larger output, JS config; v4 is stable and the current default. | Tailwind v4 with `@tailwindcss/postcss` and CSS `@theme`. |

## Stack Patterns by Variant

**If timeline is tight / team wants lowest risk (recommended v1 floor):**
- Ship: Tailwind v4 + Motion (`motion/react`) + GSAP/ScrollTrigger + Lenis + self-hosted variable fonts.
- Hero = CSS/conic-gradient + Motion + optional Canvas2D grain. No three.js.
- Because: delivers the cinematic scroll narrative and "wow" hero with zero WebGL build/perf risk; WebGL becomes a fast-follow enhancement.

**If the "generated spectacle" hero is the centerpiece (full brief):**
- Add: three.js + @react-three/fiber + @react-three/drei (+ optional @react-three/postprocessing Bloom) for ONE in-view, `ssr:false`, lazy-loaded shader beat.
- Because: the iridescent/holographic agent-vs-agent moment is exactly what a custom shader does best, and isolating it keeps the rest of the page light.

**If you want to drop a dependency:**
- Skip Lenis; use native CSS `animation-timeline: scroll()` for parallax.
- Because: removes ~a lib and is the most performant scroll-linked path, at the cost of the eased momentum feel.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| @react-three/fiber@9.6.1 | react@19.x, three@0.184.0 | R3F 9 is the React-19 line; verified compatible with React 19.0–19.2. Dropped React 18. |
| @react-three/drei@10.7.7 | @react-three/fiber@9, react@19 | drei 10 is the R3F9/React19 line. |
| @react-three/postprocessing@3.0.4 | @react-three/fiber@9, react@19 | ESM-only. |
| motion@12.40.0 | react@19 | Import path `motion/react`. |
| gsap@3.15.0 + @gsap/react@2.1.2 | react@19 | Use `useGSAP()` for cleanup/StrictMode safety. All plugins free. |
| lenis@1.3.23 | gsap@3.15.0 | Use `lenis/react` (`ReactLenis`) and drive RAF off GSAP ticker. |
| tailwindcss@4.3.0 + @tailwindcss/postcss@4.3.0 | next@16, Turbopack | CSS-first `@theme`; no JS config file. |
| next@16.2.7 | `output:"export"` | All client-only WebGL behind `dynamic(ssr:false)`; `images.unoptimized:true` required (already set). |

## Sources

- live `npm view <pkg> version` (2026-06-08) — exact current versions: motion 12.40.0, gsap 3.15.0, @gsap/react 2.1.2, lenis 1.3.23, three 0.184.0, @react-three/fiber 9.6.1, @react-three/drei 10.7.7, @react-three/postprocessing 3.0.4, tailwindcss 4.3.0 — HIGH
- https://motion.dev/docs/react-upgrade-guide & https://www.npmjs.com/package/framer-motion — Framer Motion → `motion`/`motion/react` rename, v12.40.0 — HIGH
- https://webflow.com/blog/gsap-becomes-free & https://gsap.com/pricing/ — GSAP 100% free incl. all former Club plugins (April 2025) — HIGH
- https://r3f.docs.pmnd.rs/getting-started/installation & https://github.com/pmndrs/react-three-fiber/releases — R3F 9 ⇆ React 19 compatibility — HIGH
- https://github.com/vercel/next.js/discussions/19115 & https://noqta.tn/en/tutorials/react-three-fiber-nextjs-3d-interactive-web-2026 — `dynamic(ssr:false)` requirement for R3F in Next (window/document SSR crash) — HIGH
- https://tailwindcss.com/blog/tailwindcss-v4 & https://tailwindcss.com/docs/guides/nextjs — v4 Oxide engine, build/size gains, `@theme` config — HIGH
- https://nextjs.org/docs/app/getting-started/fonts — `next/font/local`, build-time self-hosting, variable fonts, works with static export — HIGH
- https://github.com/darkroomengineering/lenis & https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap — Lenis + GSAP ticker pattern, reduced-motion/mobile tuning — MEDIUM (community guides, verified against GH repo)

---
*Stack research for: cinematic motion-rich Next.js static-export landing page*
*Researched: 2026-06-08*
