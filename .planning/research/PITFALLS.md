# Pitfalls Research

**Domain:** Cinematic, motion-rich, mobile-first marketing landing page (Next.js static export → GitHub Pages)
**Researched:** 2026-06-08
**Confidence:** HIGH (Next.js static-export gotchas, mobile video, reduced-motion verified against official docs + tracked GitHub issues; conversion/style findings MEDIUM — multiple credible sources, not authoritative)

> Scope note: This site is a single static landing page sent directly to sponsors/investors/SF-hackers, mostly opened on phones. Pitfalls are ordered by how likely they are to either (a) silently break the link you send, or (b) defeat the entire purpose (wow + a clear way to get in touch). Generic web advice is omitted.

---

## Critical Pitfalls

### Pitfall 1: Broken asset paths under static export (the link looks fine locally, ships broken)

**What goes wrong:**
CSS, JS chunks, fonts, images, and video 404 on the deployed site even though `npm run dev` and the local `out/` look perfect. Page renders unstyled or half-dead. For a "send this link to an investor" site, this is catastrophic and invisible until someone else opens it.

**Why it happens:**
The current deploy is at the **apex domain `ufa.foundation` (root)**, so `basePath`/`assetPrefix` should be empty — but the moment anyone tests via a project-pages URL (`username.github.io/ufa/`), or adds a route, or hardcodes a `/something.png` reference instead of using `<Image>`/`<Link>`, paths diverge. Static export resolves asset URLs at build time; there's no server to rewrite them. Known 2026 issue: with `basePath` set and `trailingSlash` disabled, the root path `/` becomes `''`, producing `{basePath}.txt` instead of `{basePath}/index.txt` and 404s. GitHub Pages also strips files/paths without a `.nojekyll` marker.

**How to avoid:**
- Confirm deploy target is the apex root → keep `basePath`/`assetPrefix` **empty** (don't cargo-cult the project-pages config).
- Reference ALL assets through `next/image` (with `unoptimized: true`) and `next/link`; never hardcode absolute `/asset.png` in raw `<img>`/`<video>` unless prefixed correctly.
- Keep `.nojekyll` + `CNAME` in build output (already validated — protect it in CI).
- Smoke-test the **deployed** URL on a real phone before sending, not just `out/`. Open DevTools Network tab, filter to 404s.
- Add a CI step that fails the build if `out/.nojekyll` or `out/CNAME` is missing.

**Warning signs:**
Unstyled flash on first load; fonts falling back to system; `404` chatter in Network tab; works on `localhost` but not on the live domain.

**Phase to address:** Foundation/pipeline phase (first phase — verify before any cinematic work lands).

---

### Pitfall 2: WebGL/3D hero tanks on mid-tier phones (jank, heat, blank canvas)

**What goes wrong:**
The "versus" hero shader/3D scene runs at 60fps on the dev MacBook and stutters to 15–25fps, drains battery, heats the phone, or renders a black canvas on a 2-year-old Android. The single most-important screen — the "holy shit" moment — is the one that breaks on the audience's actual device.

**Why it happens:**
Teams treat the 3D layer as a self-contained showpiece and develop/test only on a powerful desktop GPU. Mobile GPUs have weak fill rate, limited thermal headroom, and smaller texture budgets. Heavy post-processing, many lights, large textures, and high draw counts that are free on desktop are crippling on mobile. WebGL context can also fail entirely (lost context, no GPU) with no fallback.

**How to avoid:**
- Treat mobile as the **first-class target**, not an afterthought. Budget the hero for a mid-tier phone, then enhance for desktop — not the reverse.
- Progressive enhancement gate: detect device capability (or just `prefers-reduced-motion` + a coarse mobile check) and serve a **reduced scene or static/video fallback** on mobile. PROJECT.md already scopes "WebGL accent only in hero" — enforce it.
- Critical content (headline, CTA) must be legible and interactive **before** and **even if** the WebGL scene never loads. Load the canvas async; never block first paint on it.
- Use fewer lights, smaller textures, minimal post-processing on mobile.
- Set a hard fps floor; if the device can't hold it, fall back automatically.

**Warning signs:**
Fan spinning / phone warm during dev; frame drops on scroll; canvas blank on a borrowed Android; LCP element is inside the canvas.

**Phase to address:** Hero/showpiece phase — with the fallback strategy designed in from the start, not retrofitted.

---

### Pitfall 3: Heavy hero video that won't autoplay / blows the data budget

**What goes wrong:**
Real match footage is the spectacle — but a large MP4 either (a) doesn't autoplay on iOS, (b) downloads 20MB+ over cellular before the visitor sees anything, or (c) iOS throttles/blocks the download entirely. The investor on LTE closes the tab before the hero loads.

**Why it happens:**
Mobile autoplay has strict rules that are easy to miss; and "it's just one video" hides a huge byte cost. iOS Safari refuses to inline-autoplay without the right attributes and throttles large video on cellular.

**How to avoid:**
- Background/hero video MUST be `muted`, `loop`, `playsinline`, `autoplay` — all four. Without `playsinline`, iOS hijacks to fullscreen and breaks the background effect.
- Provide a `poster` image so the hero is meaningful instantly (also the LCP candidate).
- Encode 720p H.264 MP4 for compatibility (~3–4MB for a short loop) + optional WebM/AV1 for smaller modern delivery. Avoid 4K background loops.
- Keep loops SHORT and tightly compressed; consider a static poster + lighter loop on mobile.
- If audio matters for a featured match clip, provide an explicit unmute button — never force unmuted autoplay.
- Lazy-load below-the-fold footage; don't ship every clip in the initial payload.

**Warning signs:**
Hero video black on iPhone; multi-MB video in the critical request chain; video request still pending when CTA is already needed; fullscreen takeover on tap.

**Phase to address:** Hero/showpiece phase + asset-pipeline phase (encoding standards).

---

### Pitfall 4: Animation libraries cause hydration mismatch → CLS, flicker, wrecked Core Web Vitals

**What goes wrong:**
Framer Motion / GSAP wired into server-rendered components produce a hydration mismatch: React discards the server HTML and re-renders, causing a visible flash, content jumping (CLS), and a slow first interaction (INP). On a static export the HTML is prerendered, so any animation that runs before/against the reconciling DOM shifts layout.

**Why it happens:**
The animation library initializes (often in `useLayoutEffect`) before hydration completes, against a DOM React is still reconciling. Server tree ≠ client tree (e.g. Framer's `data-projection-id` differing) → React throws away server HTML. INP/CLS budgets blown by a single effect that ran too early.

**How to avoid:**
- Mark animation components `'use client'`; keep them as leaf islands, not wrapping the whole page.
- Initialize entrance animations in `useEffect` (post-hydration), or gate on a `mounted` flag; reserve final layout space so nothing jumps.
- Set explicit dimensions / `aspect-ratio` on animated/media containers so CLS stays < 0.1.
- Prefer CSS transforms (`transform`, `opacity`) for scroll/parallax — compositor-friendly, no JS hydration cost. Reach for GSAP/Framer only where CSS can't express it.
- Measure LCP < 2.5s, INP < 200ms, CLS < 0.1 on a throttled mobile profile (these are confirmed 2026 ranking signals and a proxy for "feels premium").

**Warning signs:**
"Hydration failed" console warnings; content flash/jump on load; Lighthouse CLS > 0.1 or poor INP; animations that "pop" into place after a beat.

**Phase to address:** Motion-system phase (establish the animation architecture/pattern before scattering animations everywhere).

---

### Pitfall 5: prefers-reduced-motion ignored → motion sickness + WCAG failure

**What goes wrong:**
Aggressive parallax, auto-playing flythroughs, and scroll-jacking trigger dizziness/nausea for users with vestibular disorders (70M+ people), and the page fails WCAG 2.1 (SC 2.3.3). For an investor demo, an unbearable flythrough reads as amateurish, not cinematic.

**Why it happens:**
Reduced-motion is a system-level OS setting that's invisible during dev unless explicitly toggled. Decorative motion (the whole point here) is exactly what hurts these users. Easy to ship without ever testing the toggle.

**How to avoid:**
- Honor `@media (prefers-reduced-motion: reduce)` everywhere: kill/replace decorative animation, disable parallax and CSS smooth-scroll, freeze background video to its poster, and for JS-driven motion read the media query in code and short-circuit.
- Wrap motion in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get the safe path by default.
- Where motion conveys meaning, provide a static alternative (don't just hide info).
- Avoid scroll-jacking entirely; let users scroll at their own pace.
- PROJECT.md already requires a reduced-motion fallback — make it a tested acceptance criterion, not a footnote.

**Warning signs:**
No `prefers-reduced-motion` query in the CSS/JS; motion identical with the OS toggle on; parallax/scroll-jack present; testers report queasiness.

**Phase to address:** Motion-system phase (the reduced path is part of the motion contract, built alongside the full path).

---

### Pitfall 6: Style over substance — wow without a clear concept + obvious CTA fails to convert

**What goes wrong:**
The page is gorgeous but a sponsor/investor can't tell within seconds *what UFA is*, *why it's the coolest thing in AI*, or *how to get in touch*. Animation theater replaces clarity. The link impresses for five seconds and converts no one — defeating the entire reason the site exists.

**Why it happens:**
Cinematic ambition pulls effort toward effects; founders assume more animation/sections = higher conversion when usually it needs *less confusion*. Most investor judgment happens on the first screen — if the hero line doesn't tell a specific person what you do and the outcome, you're behind. UFA has no fighter photography, so the concept (agents interrogate + fight for credits/money) must be communicated explicitly, not just *felt*.

**How to avoid:**
- First screen must answer in plain words: what it is (AI agents fight/interrogate for credits & money), why it matters, and a visible primary CTA (get in touch / sponsor).
- Make the sponsor/contact CTA persistent and unmissable (sticky or repeated) — the #1 desired action per PROJECT.md.
- Show signals of traction/credibility: real match footage, concrete prize pool / credits numbers (already in scope), the UFC→UFB→UFA lineage for instant legibility.
- Treat motion as *amplifier of a clear message*, never a substitute. The text should still convert with motion stripped out (which is also your reduced-motion path).
- Pressure-test: show the first screen to someone unfamiliar for 5 seconds, then ask "what is this and what would you do next?"

**Warning signs:**
Can't state the value prop in one sentence; CTA below the fold or buried; the page is all vibe, no numbers/specifics; reduced-motion version is incomprehensible (proof the meaning lived only in motion).

**Phase to address:** Content/messaging + hero phase (define copy + CTA before polishing effects).

---

### Pitfall 7: Over-engineering 3D delays shipping (the link never gets sent)

**What goes wrong:**
Weeks disappear into shaders, custom WebGL, and bespoke scroll choreography. The deadline (a link you can actually send) slips, or the build becomes too heavy/fragile to maintain on a static pipeline.

**Why it happens:**
Maximal-everywhere is tempting and fun; "one more effect" creep. PROJECT.md explicitly reserves maximal WebGL for the single hero beat for exactly this reason — but scope creep ignores documents.

**How to avoid:**
- Hard-scope WebGL to the **single hero beat**; everything else is CSS/DOM motion. This is already a Key Decision — enforce it as a phase boundary.
- Ship a "good enough wow" first (poster + CSS motion + light accent), then enhance the hero if time allows. The sendable link beats the perfect shader.
- Timebox the hero showpiece; if it busts the box, fall back to the video/poster version (which you need anyway for mobile + reduced-motion).
- Reuse a proven library (drei/react-three-fiber or a small shader) over hand-rolling.

**Warning signs:**
Days on shader tuning with no sendable URL; "we'll add the content after the 3D is perfect"; build size ballooning; the fallback path doesn't exist yet.

**Phase to address:** Roadmap sequencing — content + sendable baseline before maximal hero polish.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| `images: { unoptimized: true }` (required for static export) | Builds on GH Pages at all | No responsive/format/lazy from Next; you must hand-optimize every asset | Always (it's mandatory) — pair with manual WebP/AVIF + correct `sizes` |
| Hardcoding `ufa.foundation` in metadata | Quick, works in prod | Preview/staging builds emit wrong OG/canonical URLs | MVP only — extract to env var when previews exist (see CONCERNS.md) |
| Skip `prefers-reduced-motion` "for now" | Ship motion faster | WCAG failure + motion-sickness; retrofitting touches every animation | **Never** — build the reduced path alongside the full path |
| No CI lint/typecheck before deploy | Faster setup | Broken/ugly builds ship silently to a public investor link | Never for a public-facing investor site — add `tsc --noEmit` + build check |
| Animations wrapping whole page instead of leaf islands | Less plumbing | Hydration mismatch, CLS, hard-to-isolate jank | Never — keep animation as `'use client'` leaves |
| Single huge hero video, no poster/fallback | One file to manage | iOS won't autoplay; cellular users see nothing; no reduced-motion freeze | Never — always poster + compressed loop |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages (apex) | Losing `.nojekyll`/`CNAME` on rebuild → underscore paths 404, domain unbinds | Bake both into `out/`; verify in CI; keep `basePath` empty for apex root |
| Next.js OG image | Expecting dynamic `opengraph-image` route to generate under `output: export` | Use a **static** `app/opengraph-image.(png|jpg)` (+ `twitter-image`); pre-render OG at build, don't rely on runtime generation |
| Web fonts | `@font-face` / external fonts cause FOUT/FOIT + CLS | Use `next/font` for self-hosting + `font-display: swap`; preload the hero display face; set fallback metrics to avoid layout shift |
| Lead-capture CTA (static, no backend) | Assuming a form needs a server (out of scope per PROJECT.md) | Use `mailto:` / Calendly / a hosted form (Formspree/Tally) — keep it static-compatible; verify it works from a phone |
| Analytics (if added) | Heavy script blocking first paint on a perf-critical hero | Defer/async; or skip until traffic insight is needed (CONCERNS.md) |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Parallax/scroll-jack on phones | Stutter on scroll, poor INP, queasiness | Use compositor transforms + IntersectionObserver; cap effects; reduced-motion off-switch | Mid-tier phones, immediately |
| LCP element inside WebGL/video | LCP > 2.5s, slow "first wow" | Make the LCP a static poster/headline; load canvas/video async | Any throttled mobile connection |
| Shipping desktop-weight 3D to mobile | Frame drops, thermal throttle, blank canvas | Capability-gated reduced scene / static fallback | 2-year-old Android, immediately |
| Uncompressed/oversized media | Multi-MB transfers, slow load on LTE | 720p H.264 + WebM/AV1; compress images to AVIF/WebP; lazy-load below fold | Cellular / low-end devices |
| GH Pages default cache headers | Repeat visits re-download assets | Hashed filenames (Next does this) get long TTL; accept GH Pages limits for low traffic | Only matters at higher traffic; fine for a sent link |
| GH Pages bandwidth | Throttling under heavy traffic | Fine for a directly-sent investor link; migrate to Cloudflare/Vercel Pages if it goes viral | ~100k+ monthly visits |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Ignoring PostCSS XSS in the Next dependency chain (CONCERNS.md) | Moderate XSS via CSS stringify | Upgrade Next past the vulnerable PostCSS (>=8.5.10); don't process untrusted CSS |
| Embedding third-party scripts (form/analytics/video) without review | Supply-chain / data leak on an investor-facing page | Pin versions, prefer first-party/self-hosted, add a minimal CSP via `<meta>` since there's no server for headers |
| Leaking unfinished match content / claims | Credibility/legal risk with investors | Only publish curated, accurate prize/credit numbers and footage you're cleared to show |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Concept unclear on first screen | Investor bounces without understanding UFA | Plain-language hero: what it is + why it's wild + visible CTA |
| Low contrast text over iridescent/gradient backgrounds | Headlines/CTA unreadable, fails WCAG AA | Enforce AA contrast (4.5:1 body); add scrims/overlays behind text on busy gradients; test with the gradient at its lightest |
| Keyboard/focus lost in a canvas-heavy layout | Keyboard & screen-reader users can't reach the CTA | Logical focus order, visible focus rings, `aria-hidden` on decorative canvas, real `<a>`/`<button>` for the CTA |
| Scroll-jacking to force the "cinematic" pace | Disorientation, lost control, motion sickness | Let users scroll naturally; trigger scenes on scroll position, don't hijack scroll |
| CTA only at the bottom | Sponsors ready early can't act | Persistent/sticky or repeated contact CTA |
| Cinematic on desktop, cramped on phone | Primary audience (mobile) gets the worst version | Design mobile-first; test the hero on a real phone every iteration |

## "Looks Done But Isn't" Checklist

- [ ] **Deployed (not local) site:** Often missing — verify on the live `ufa.foundation` URL on a real phone, Network tab clean of 404s.
- [ ] **OG/Twitter share card:** Often missing static `opengraph-image` — paste the URL into a link-preview debugger (Slack/iMessage/Twitter) and confirm the card renders.
- [ ] **prefers-reduced-motion path:** Often missing — toggle the OS setting and confirm motion stops AND the page still makes sense.
- [ ] **iOS hero video:** Often missing `playsinline`/`muted` — confirm it inline-autoplays on a real iPhone over cellular.
- [ ] **WebGL fallback:** Often missing — disable WebGL / test on a weak Android and confirm a graceful static fallback, not a blank box.
- [ ] **Contrast on gradients:** Often missing — run axe/Lighthouse; check the worst-case gradient region behind text.
- [ ] **Keyboard reachability:** Often missing — tab through the page; confirm CTA reachable with a visible focus ring.
- [ ] **CLS/LCP/INP on throttled mobile:** Often missing — Lighthouse mobile profile, all three in the green.
- [ ] **`.nojekyll` + `CNAME` in `out/`:** Often missing after a config change — confirm present in the deployed artifact.
- [ ] **CTA actually works:** Often missing end-to-end — click the contact/sponsor CTA from a phone and confirm it sends/opens.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Broken asset paths in prod | LOW | Fix `basePath`/asset refs, restore `.nojekyll`/`CNAME`, redeploy; add CI guard |
| WebGL janks on mobile | MEDIUM | Ship the poster/video fallback you should already have; gate the heavy scene to capable devices |
| Hydration mismatch / CLS | MEDIUM | Move animation init to `useEffect`, reserve layout space, isolate as `'use client'` leaves |
| reduced-motion missing | MEDIUM | Add the media query + JS guard across animations; reuse the static content path |
| Style-over-substance (no conversion) | MEDIUM | Rewrite first-screen copy for clarity, surface CTA + prize numbers; usually content, not rebuild |
| Over-engineered 3D blocking ship | HIGH | Cut to the fallback hero (poster + CSS), ship the link, treat maximal 3D as a fast-follow |
| OG card broken on share | LOW | Add static `opengraph-image` + correct `metadataBase`, re-share to bust preview cache |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Broken asset paths / GH Pages config | Foundation/pipeline (Phase 1) | Live URL on a phone, Network tab 404-clean, `.nojekyll`+`CNAME` present |
| Clear concept + visible CTA (anti style-over-substance) | Content/messaging + hero (early) | 5-second test with an unfamiliar person; CTA above fold + persistent |
| Hydration mismatch / CLS / INP | Motion-system phase | Lighthouse mobile: CLS<0.1, INP<200ms, no hydration warnings |
| prefers-reduced-motion + motion sickness | Motion-system phase | OS toggle test; WCAG 2.3.3 check; no scroll-jack |
| WebGL/3D mobile perf + fallback | Hero/showpiece phase | Real low-end Android + WebGL-disabled test; fps floor holds or falls back |
| Hero video autoplay/data budget | Hero + asset-pipeline phase | iPhone cellular inline autoplay; <~4MB 720p loop; poster set |
| Contrast on gradients / keyboard focus | Polish/accessibility pass | axe + Lighthouse AA; full keyboard tab-through |
| Static OG/social card | Metadata/SEO phase | Link-preview debugger renders the card |
| Over-engineered 3D delays ship | Roadmap sequencing (cross-cutting) | A sendable baseline link exists before maximal hero work begins |

## Sources

- [Next.js Static Exports guide](https://nextjs.org/docs/pages/guides/static-exports) — HIGH (official)
- [Next.js basePath/assetPrefix for GitHub Pages — James Wallis](https://wallis.dev/blog/next-js-basepath-and-assetprefix) — MEDIUM
- [Static export basePath request issue #73427](https://github.com/vercel/next.js/issues/73427) — HIGH (tracked issue)
- [OpenGraph images not statically generated for dynamic routes #51147](https://github.com/vercel/next.js/issues/51147) — HIGH (tracked issue)
- [Next.js opengraph-image / twitter-image conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) — HIGH (official)
- [WebGL Development: Immersive 3D Web Experiences in 2026 — MDX](https://mdx.so/blog/webgl-development-how-to-build-immersive-3d-web-experiences-in-2026) — MEDIUM
- [Motion (Framer) performance guide](https://motion.dev/docs/performance) — HIGH (official lib docs)
- [The Web Animation Performance Tier List — Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list) — MEDIUM
- [GSAP & Framer Motion in Next.js — Build With Umar](https://buildwithumar.com/blogs/nextjs-animations-optimization) — MEDIUM
- [Next.js hydration mismatch discussion #35773](https://github.com/vercel/next.js/discussions/35773) — MEDIUM
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — HIGH (official)
- [W3C WCAG 2.2 Understanding SC 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — HIGH (standard)
- [W3C WCAG Technique C39: prefers-reduced-motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) — HIGH (standard)
- [Designing accessible animation — Pope Tech](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) — MEDIUM
- [Mux: Add background video to your website (HLS, performance)](https://www.mux.com/articles/add-background-video-website-hls-performance) — MEDIUM
- [Fixing HTML5 video autoplay in Safari/iOS — HulkApps](https://www.hulkapps.com/blogs/ecommerce-hub/how-to-fix-html5-video-autoplay-issues-in-safari-and-ios-devices) — MEDIUM
- [How to make your startup website investor-friendly — Waveup](https://waveup.com/blog/how-to-make-your-startup-website-design-investor-friendly/) — MEDIUM
- [One Page Startup Landing Pages 2026: what actually converts — Marion Bekoe](https://marionbekoe.medium.com/one-page-startup-landing-pages-in-2026-what-actually-converts-what-founders-need-first-and-why-b6c78fb3f889) — LOW (single source)
- Project context: `.planning/PROJECT.md`, `.planning/codebase/CONCERNS.md` (PostCSS XSS, hardcoded domain, no CI validation, `images.unoptimized`) — HIGH (internal)

---
*Pitfalls research for: cinematic motion-rich static-export mobile-first landing page (UFA)*
*Researched: 2026-06-08*
