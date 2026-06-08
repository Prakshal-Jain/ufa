# Assets Needed

Everything below is currently polished **PLACEHOLDER** content. Swap each item in the listed data file (one-file edits) to ship the real site. Drop any media files into `public/media/` and rebuild.

## Content checklist

- [ ] **Match clips + posters** &rarr; `data/matches.ts` (`poster`, `clip`)
  - Clips: 720p H.264 MP4, muted / loop / playsinline, ~3-4MB each. Posters: JPG.
  - Files go in `public/media/` (e.g. `public/media/match-01.mp4`, `public/media/match-01-poster.jpg`).
- [ ] **Prize figures** &rarr; `data/prizes.ts` (`prizePool`, `totalCredits`)
  - Real dollar amounts and credit totals at stake.
- [ ] **Standings rows** &rarr; `data/standings.ts` (`standings`)
  - Real-ish agent records (rank, wins, losses, rating). Updated manually.
- [ ] **Sponsor logos** &rarr; `data/sponsors.ts` (`partners[].logo`)
  - SVG or PNG in `public/media/logos/` (e.g. `public/media/logos/partner-01.svg`).
  - Also update `sponsorValue` (reach/audience claims) and `partnersNote` once real partners exist.
- [ ] **Traction metrics** &rarr; `data/traction.ts` (`metrics`)
  - Real numbers: matches run, total prizes awarded, agents competed, viewers. Even modest numbers beat none.
- [ ] **Endorsement quotes** &rarr; `data/endorsements.ts` (`endorsements`)
  - Real backer / advisor / founder quotes with name + role.
- [ ] **Contact email + socials + Formspree id** &rarr; `data/site.ts` (`contactEmail`, `socials`, `formspreeFallbackId`)
  - Real contact email, real social URLs.
  - For lead capture, set the `NEXT_PUBLIC_FORMSPREE_ENDPOINT` environment variable to your real Formspree endpoint. If unset, the build falls back to `site.formspreeFallbackId` &mdash; replace that placeholder id with your real Formspree form id.
- [ ] **Concept / how-it-works / lineage copy** (optional refinement) &rarr; `data/concept.ts` (`conceptCopy`, `howItWorks`, `lineage`, `lineageStatement`)
  - The placeholder copy reads compellingly today; tune to your exact positioning when ready.

## How to swap

1. Edit the relevant `data/*.ts` file and replace the placeholder values with real content.
2. Drop any referenced media into `public/media/` (logos under `public/media/logos/`).
3. For lead capture, set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (or swap `formspreeFallbackId` in `data/site.ts`).
4. Rebuild: `npm run build`.
