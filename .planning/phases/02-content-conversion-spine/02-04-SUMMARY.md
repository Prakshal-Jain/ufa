---
phase: 02-content-conversion-spine
plan: 04
subsystem: conversion-payload
tags: [sponsor, conversion, formspree, lead-capture, footer]
requires:
  - "data/sponsors.ts, data/traction.ts, data/endorsements.ts, data/site.ts (Plan 01)"
  - "components/ui/SectionShell.tsx, GradientText.tsx, CTAButton.tsx (Phase 1)"
  - "components/motion/Reveal.tsx (Phase 1)"
provides:
  - "components/sections/SponsorValue.tsx — why-sponsor framing + audience chips + placeholder logo wall"
  - "components/sections/Traction.tsx — metrics strip"
  - "components/forms/SponsorForm.tsx — working Formspree lead-capture with no-JS fallback"
  - "components/sections/SponsorCTA.tsx — repeated CTA embedding the form with adjacent social proof"
  - "components/sections/Footer.tsx — contact + socials + copyright"
affects:
  - "Plan 05 page assembly (imports all five components)"
tech-stack:
  added: []
  patterns:
    - "Progressive-enhancement form: native action/method POST + fetch enhancement with inline success/error"
    - "Env-driven endpoint (NEXT_PUBLIC_FORMSPREE_ENDPOINT) inlined at build with site.formspreeFallbackId fallback"
    - "Placeholder logo wall with visible name fallback so an early-stage wall never reads dead"
    - "Social-proof adjacency to CTA (endorsements + metrics in the same section as the form)"
key-files:
  created:
    - components/sections/SponsorValue.tsx
    - components/sections/Traction.tsx
    - components/forms/SponsorForm.tsx
    - components/sections/SponsorCTA.tsx
    - components/sections/Footer.tsx
  modified: []
decisions:
  - "Submit control is a native <button type=submit> styled to match CTAButton (not CTAButton itself, which renders type=button) so the no-JS native submit path works."
  - "Honeypot _gotcha hidden field added for Formspree spam protection."
metrics:
  duration: ~2min
  completed: 2026-06-08
---

# Phase 2 Plan 04: Conversion Payload Summary

Built the page's conversion payload: a sponsor-value section with a placeholder-capable partner logo wall, a traction metrics strip, a working Formspree-backed lead-capture form with progressive-enhancement (native no-JS submit + fetch-enhanced inline success/error states), a repeated CTA section that embeds the form with endorsements and metrics social proof placed adjacent (documented 15-30% conversion lift), and a footer carrying contact email, socials, and copyright. All components reuse Phase-1 primitives, animate via the reduced-motion-safe Reveal (transform/opacity only), and the build typechecks clean.

## What Was Built

- **SponsorValue** — `sponsorValue` headline (phrase emphasized via GradientText) + pitch (10k+ reach claim) + `audience` rendered as accent-bordered pill chips + a `repeat(auto-fit, minmax(120px,1fr))` logo wall mapping `partners` into 3/2 elevated tiles that render `partner.name` as visible fallback text (logo files under /media/logos do not exist yet, expected) + `partnersNote` beneath.
- **Traction** — `repeat(auto-fit, minmax(140px,1fr))` strip mapping `metrics`; large accent display value + muted uppercase label per cell, staggered Reveal.
- **SponsorForm** (`"use client"`) — native `<form action={endpoint} method="POST">` (works without JS) with name/email/company/message fields + honeypot `_gotcha`; `onSubmit` does `fetch(endpoint, { method:"POST", body:FormData, headers:{Accept:"application/json"} })` and renders idle/submitting/success/error states inline; mailto fallback in both success and error; real `<button type="submit">` styled to tokens with scoped `:focus-visible` ring. Endpoint = `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? https://formspree.io/f/${site.formspreeFallbackId}`.
- **SponsorCTA** — `<SectionShell id={site.anchors.sponsor}>` two-column flex (single column on mobile): left column holds the ask (GradientText), pitch, a compact reuse of the `metrics` strip, and `endorsements` quote cards — all adjacent to the right-column `<SponsorForm/>`.
- **Footer** — `<footer>` with `site.fullName`, `mailto:${site.contactEmail}` link, `site.socials` as external links (`target="_blank" rel="noopener noreferrer"`), and a build-time copyright line.

## Deviations from Plan

None — plan executed exactly as written. The plan explicitly anticipated using a native `<button type="submit">` rather than CTAButton for the no-JS path; that path was taken as specified.

## Known Stubs

These are intentional, documented placeholders (per the LOCKED Phase-02 decision that all v1 content ships as clearly-marked placeholder; tracked in repo-root ASSETS-NEEDED.md):

- **Partner logos** (`components/sections/SponsorValue.tsx`) — `partners[].logo` point at `/media/logos/*.svg` files that do not exist yet. Mitigated by visible `partner.name` text fallback inside each tile so the wall never reads empty. Resolved when real logo assets are dropped in `/public/media/logos/`.
- **Formspree endpoint fallback** (`components/forms/SponsorForm.tsx`) — falls back to `site.formspreeFallbackId` (`xpwzgkqr`, marked PLACEHOLDER) until `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set in the deploy env. This is the intended env-driven design, not a blocking stub: the form is fully functional once the env var (or real fallback id) is supplied. User setup is documented in the plan frontmatter `user_setup`.

These do not prevent the plan's goal: every section renders non-empty and the form submits to a real (placeholder) Formspree endpoint.

## Verification

- `npm run typecheck` exits 0.
- SponsorForm: env-driven endpoint + fallback, native POST form, real `type="submit"`, name/email/company/message, success+error states — all greps pass.
- SponsorCTA embeds SponsorForm with endorsements + metrics adjacent; root `id={site.anchors.sponsor}`.
- No `motion/react` import in `components/sections/` (animation only via Phase-1 Reveal).

## Self-Check: PASSED

All five created files present on disk; all three task commits (6b1d635, a441546, cbc8f15) found in git history.
