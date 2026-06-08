# Feature Research

**Domain:** Cinematic, mobile-first marketing landing page for a live AI-agent competition (UFA) — single static page whose job is to make sponsors / investors / companies / SF hackers feel "I need to be part of this" and reach out to sponsor.
**Researched:** 2026-06-08
**Confidence:** HIGH (section taxonomy and conversion patterns are well-established and corroborated across genre cousins, esports sites, and top-tier SaaS launch pages; cinematic-execution specifics are MEDIUM — design-dependent and content-dependent)

---

## Framing

"Features" here = **page sections / content blocks / conversion elements**, not app functionality. v1 is ONE static scrolling page, no backend. So every "feature" is a section of the scroll or an element within it. The constant question for each: *does this move a sponsor/investor toward "get in touch"?*

The reference landscape splits into two design languages, and UFA must borrow from both:

- **Genre cousins (UFC.com, UFB.gg):** establish *what a fight/competition page looks like* — hero showpiece, event framing, roster/standings, watch/highlights, partners, social. Both are photo-dependent and read "premium sports brand," not cutting-edge. UFA has no fighter photography (combatants are AI agents) so the *spectacle must be generated* (motion, type, light, depth) — which is the opening to look more modern.
- **Top-tier launch pages (Linear, Vercel, SpaceX, Ducati Scrambler scrollytelling):** establish *how to convert a sophisticated B2B audience* — sharp outcome-naming H1, one focused CTA, social proof near CTA, dark GPU-rendered gradients, scroll-driven cinematic reveals.

UFA = UFC's spectacle skeleton + Linear/Vercel's conversion discipline + cinematic sci-fi scrollytelling skin.

---

## Feature Landscape

### Table Stakes (Visitors Expect These)

Missing these and the page reads incomplete, amateur, or non-credible. No "wow" credit for having them — penalty for absence.

| Feature / Section | Why Expected | Complexity | Content Dependency |
|---|---|---|---|
| **Hero showpiece** — full-bleed agent-vs-agent "versus" moment, the brand promise in one screen. H1 names the thing sharply ("AI agents fight for real money — live"), subhead, one primary CTA visible above the fold. | First 3-5 seconds decide everything; every reference (UFC, UFB, Linear, Vercel) leads with a dominant hero. The PROJECT core value lives here ("holy shit" within the first screen). | HIGH (this is the one maximal-motion beat; WebGL/shader accent allowed here only) | HIGH — needs the strongest single visual/footage frame or generated composition |
| **Concept / "What is this" block** — explains AI agents interrogate + fight for credits/money, in plain language. | A novel concept must be legible in one read; UFB's "Who We Are" and every SaaS page's benefit block do this. Sponsors can't fund what they can't explain to their boss. | LOW | MEDIUM — needs crisp positioning copy |
| **How-it-works** — 3-4 step breakdown of a match (the format, what "interrogate then fight" means, how winners are decided). | Removes confusion; converts curiosity into comprehension. Standard SaaS "Benefits/3-4 outcome blocks" pattern. | LOW-MEDIUM | MEDIUM — needs the actual format defined |
| **Match / spectacle showcase** — real footage from real matches, the proof the thing is alive. | UFC's "highlights" and UFB's "Previous Pilots / Moments from the league" are the credibility engine. "Real matches exist" is UFA's biggest asset — show it. | MEDIUM (video embed/poster, lazy-load, mobile playback, fallback) | HIGH — entirely depends on user-provided footage quality |
| **Prize pool / credits block** — concrete numbers: prize money, credits at stake. | Esports best practice: tournament pages display prize pool prominently; it's the stakes that make a competition matter and signals legitimacy to sponsors. | LOW | HIGH — needs real prize/credit figures |
| **Primary CTA: Get in touch / Sponsor** — the #1 desired action, repeated (hero + dedicated section + footer/nav). One focused CTA, minimal friction. | This is the entire point of the page. Linear/Vercel/sponsorship-page consensus: one clear benefit-oriented CTA; friction here is the most expensive mistake. | LOW-MEDIUM (mailto / form-to-email since no backend — see anti-features) | LOW |
| **Sponsors / partners section** — logo wall of any existing backers/partners (or "Founding sponsors" frame if early). | Logo walls communicate credibility at a glance; "Trusted by Industry Leaders" appears on UFB and nearly every B2B page. Social proof near CTA lifts conversion 15-30%. | LOW | HIGH — depends on whether real logos exist (see pitfall in Notes) |
| **Footer** — contact email, social links (X/IG/YouTube/Twitch/TikTok), copyright, logo. | Universal. UFB footer = socials + newsletter + copyright. Sponsors look here for the "real org" signal and a second contact path. | LOW | LOW |
| **Mobile-first responsive layout** with hamburger/overlay nav, large tap targets. | Audience opens the link on a phone (stated in PROJECT). Esports consensus: any major section reachable in two taps. | MEDIUM | LOW |
| **Reduced-motion fallback** (`prefers-reduced-motion`) + performant scroll (~60fps). | Accessibility + the perf constraint; jank on a "premium" page destroys credibility instantly. Load-speed: 1s pages convert ~3x better than 5s. | MEDIUM | LOW |

### Differentiators (The Wow — Competitive Advantage)

Where UFA out-classes UFC.com / UFB.gg (both "corporate premium," photo-dependent) and feels like a Linear/SpaceX-grade launch. These align directly with the cinematic sci-fi mandate.

| Feature / Section | Value Proposition (esp. for sponsors/investors) | Complexity | Content Dependency |
|---|---|---|---|
| **Cinematic scroll-storytelling spine** — the whole page is one linear, scroll-driven narrative (anticipation → reveal → stakes → proof → "join"), with staggered reveals and parallax depth. | This is the single biggest differentiator vs the genre cousins, who are grid/card portals. Makes the page *feel* like an event film, not a website. SpaceX/Ducati Scrambler prove scroll-narrative = perceived premium. Use the native Scroll-driven Animations API (compositor-thread) for performance. | HIGH | LOW (motion design, not content) |
| **Generated spectacle in hero** (light WebGL/shader/3D accent, iridescent/holographic, depth/parallax) instead of relying on fighter photos. | Turns UFA's apparent weakness (no athletes to photograph) into the modern edge. Investors read "this team has taste and technical chops." Reserve maximal treatment to the hero only (perf). | HIGH | LOW-MEDIUM |
| **UFC → UFB → UFA lineage moment** — a deliberate brand block positioning UFA as the next step in the fighting-competition lineage. | Free brand equity; makes the concept instantly legible and ambitious ("this is the UFC of AI"). Investors love a one-line category-defining narrative. | LOW | LOW |
| **Standings / leaderboard *teaser*** — a stylized, static snapshot of top agents/records (NOT a live, sortable table). | UFC rankings are a core draw; a teaser implies an ongoing league with stakes and history. Static snapshot keeps it within the no-backend constraint while signaling "this is a real, running competition." | LOW-MEDIUM | HIGH — needs real-ish standings/records |
| **Traction / "it's real and growing" metrics strip** — matches run, total prize awarded, agents competed, viewers/attendance, notable participants. | The #1 thing that converts investors: demonstrated traction (pilots, partnerships, press, milestones). A numbers strip near the CTA calms "wasted money" fear. UFC uses a countdown/event-live framing for the same effect. | LOW | HIGH — needs real numbers; even modest ones beat none |
| **Sponsor-specific value framing** — a short "Why sponsor UFA" block: audience (SF hackers/AI builders/investors), reach, brand-adjacency to cutting-edge AI, package tiers or "let's talk." | Sponsorship pages convert on *audience value stated up front* (who you reach, engagement, reach). Generic "sponsor us" loses; "reach 10k+ AI builders at the frontier" wins. Directly serves the conversion goal. | LOW-MEDIUM | MEDIUM — needs audience/reach framing |
| **Investor/credibility endorsements** — quotes from backers/advisors/notable founders, press mentions, or "backed by" line. | Third-party credibility compounds; video/quote testimonials outperform; endorsements close the trust gap for a stage-early but spectacular project. | LOW | HIGH — depends on having any real names/quotes |
| **Hero countdown / "next match live" beat** (static target date or "season live now"). | Creates urgency and the live-event feeling UFC leans on; signals momentum to sponsors who fear backing something dead. | LOW (client-side countdown, static target) | MEDIUM — needs a real date or honest "live now" framing |
| **Audio/sound design or ambient cue (optional, muted-by-default)** + ultra-considered typography as spectacle. | Cinematic immersion; large kinetic type *is* the spectacle when there are no fighter photos. Pushes the "film, not site" feeling. | MEDIUM | LOW |

### Anti-Features (Tempting, But Wrong for v1)

v1 is explicitly ONE static page, no backend. These are deliberately NOT built.

| Feature | Why It Gets Requested | Why Problematic Here | Better Approach |
|---|---|---|---|
| **Live leaderboard / real-time standings table** | "It's a competition, show live rankings" | No backend, no data feed; live data is a maintenance + infra commitment out of scope. | Static, designed **standings teaser** (a snapshot image/markup), refreshed manually when content changes. |
| **Embedded form with a real backend / database** | "Capture leads in a CRM" | No server runtime (static export to GH Pages). | `mailto:` CTA, or a no-backend form provider (Formspree/Tally/Google Form) — capture without a server. |
| **Multi-page site** (separate /matches, /leaderboard, /about, /sponsors routes) | "Real sites have nav and pages" | PROJECT scope: v1 is one epic scroll. Splitting dilutes the cinematic single-narrative wow and multiplies build cost. | Anchor-nav within the one page; the scroll *is* the site map. |
| **Maximal WebGL/shaders across every section** | "Make it all cinematic" | Mobile perf + static-build risk; jank kills credibility. PROJECT reserves heavy treatment to hero only. | "Bold but performant" — rich CSS/scroll motion everywhere, one heavy WebGL beat in hero. |
| **Ticketing / payments / e-commerce** | "Sell tickets or merch" | Not needed for the sponsor-contact goal; adds compliance + backend. | Out of scope; CTA is "get in touch," not "buy." |
| **User accounts / agent submission / competition entry flow** | "Let people enter their agent" | This is product, not marketing; needs auth + backend. | Out of scope; route interested builders to "get in touch." |
| **Live video stream embed (real-time Twitch/YouTube live)** | Esports sites stream live | UFA matches aren't continuously live; a dead "offline" embed reads as abandoned. | Curated **highlight reel / VOD** of real footage with a strong poster frame. |
| **Auto-playing sound on load** | "Cinematic immersion" | Hostile on mobile, breaks trust, often blocked. | Muted-by-default; optional sound toggle. |
| **Newsletter signup as the primary CTA** | UFB/most sites have one | Competes with and dilutes the real goal (sponsor contact). | Keep contact/sponsor as primary; newsletter is at most a quiet footer secondary. |
| **News / blog feed** | UFC has heavy editorial | Nothing to feed it at launch; an empty/stale feed signals death. | Fold any newsworthy item into the traction strip instead. |

---

## Feature Dependencies

```
Cinematic scroll-storytelling spine
    └──requires──> Reduced-motion fallback + 60fps perf budget
                       └──requires──> Mobile-first responsive layout

Hero showpiece (generated spectacle / WebGL beat)
    └──requires──> Brand assets (logo/colors/fonts) OR a designed identity
    └──enhances──> UFC→UFB→UFA lineage moment

Match/spectacle showcase ──requires──> user-provided real footage
Prize pool block        ──requires──> real prize/credit figures
Standings teaser        ──requires──> real-ish records/standings
Traction metrics strip  ──requires──> real numbers (matches/prize/agents)
Sponsors logo wall      ──requires──> real partner logos (else reframe)
Endorsements block      ──requires──> real backer/advisor quotes or names

Primary CTA (sponsor/contact)
    └──requires──> no-backend capture path (mailto / Formspree / Tally)
    └──enhances── from ──> Social proof placed adjacent (logos/metrics/endorsements)

Sponsor-value framing ──enhances──> Primary CTA conversion
```

### Dependency Notes

- **Everything content-rich depends on real assets.** Showcase, prize, standings, traction, sponsors, endorsements are all HIGH content-dependency. Requirements should flag: which of these have real content *today*, and which need a graceful "early-stage" framing so the page never shows an empty shell.
- **The scroll spine sits under everything** and is the riskiest/highest-complexity item — it must be built with the perf budget and reduced-motion fallback from day one, not retrofitted.
- **CTA conversion is amplified by adjacency:** placing social proof (logos, traction numbers, endorsement) immediately before/around the sponsor CTA is a documented 15-30% lift. Order matters in the scroll.

---

## MVP Definition

### Launch With (v1) — the single-page scroll, in narrative order

- [ ] **Hero showpiece** with sharp H1, subhead, primary "Get in touch / Sponsor" CTA — *the wow + the ask, screen one*
- [ ] **Concept block** — what UFA is in plain language — *legibility*
- [ ] **How-it-works** (3-4 steps) — *comprehension*
- [ ] **Match/spectacle showcase** (real footage) — *proof it's alive*
- [ ] **Prize pool / credits** — *stakes + legitimacy*
- [ ] **Traction metrics strip** — *the investor-converting "it's real and growing" signal*
- [ ] **Standings teaser** (static) — *implies a living league*
- [ ] **Sponsor-value + sponsors/partners** block — *audience value stated, logos as proof, adjacent to CTA*
- [ ] **Repeated primary CTA** (sponsor/contact) via no-backend capture — *the goal*
- [ ] **Footer** (email, socials, copyright)
- [ ] **Cinematic scroll spine + mobile-first + reduced-motion/60fps** as cross-cutting requirements

### Add After Validation (v1.x)

- [ ] **UFC→UFB→UFA lineage moment** — trigger: have a tight one-liner + visual treatment ready (cheap, high-narrative payoff; could even be v1)
- [ ] **Endorsements / press block** — trigger: real backer/advisor quotes or press exist
- [ ] **Countdown / "next match live" beat** — trigger: a real next-event date is set
- [ ] **Sound design / sound toggle** — trigger: hero motion is locked and worth scoring

### Future Consideration (v2+)

- [ ] **Live leaderboard / real standings** — trigger: a data source / backend exists (currently anti-feature)
- [ ] **Multi-page expansion** (dedicated matches/about/sponsors routes) — trigger: content volume outgrows one scroll
- [ ] **Live stream integration** — trigger: matches become reliably live and schedulable

---

## Feature Prioritization Matrix

| Feature | Sponsor/Investor Value | Implementation Cost | Priority |
|---|---|---|---|
| Hero showpiece (generated spectacle) | HIGH | HIGH | P1 |
| Primary CTA: sponsor/contact (no-backend) | HIGH | LOW | P1 |
| Concept block | HIGH | LOW | P1 |
| How-it-works | MEDIUM | LOW | P1 |
| Match/spectacle showcase (real footage) | HIGH | MEDIUM | P1 |
| Prize pool / credits | HIGH | LOW | P1 |
| Cinematic scroll spine | HIGH | HIGH | P1 |
| Mobile-first + reduced-motion/60fps | HIGH | MEDIUM | P1 |
| Traction metrics strip | HIGH | LOW | P1 |
| Sponsor-value framing | HIGH | LOW-MED | P1 |
| Sponsors / partners logo wall | MEDIUM | LOW | P1 (if logos exist) / P2 |
| Footer | MEDIUM | LOW | P1 |
| Standings teaser (static) | MEDIUM | LOW-MED | P2 |
| UFC→UFB→UFA lineage moment | MEDIUM-HIGH | LOW | P2 |
| Countdown / live beat | MEDIUM | LOW | P2 |
| Endorsements / press | HIGH | LOW | P2 (content-gated) |
| Sound design / toggle | LOW-MED | MEDIUM | P3 |

**Priority key:** P1 = must have for launch · P2 = should have, add when content/time allows · P3 = nice to have.

---

## Competitor Feature Analysis

| Section / Feature | UFC.com | UFB.gg | Linear / Vercel | **UFA's Approach** |
|---|---|---|---|---|
| Hero | Event-card hero + countdown, photo-driven | Headline + premise, photo/render | Sharp outcome H1 + product visual + 1 CTA, dark GPU gradients | **Generated agent-vs-agent spectacle (WebGL beat) + sharp H1 + sponsor CTA above fold** |
| Concept/how-it-works | Assumed (known sport) | "Who We Are" + Pilots/Ghosts roles | Benefits / 3-4 outcome blocks | **Explicit concept + 3-4 step how-it-works (novel concept needs it)** |
| Spectacle/highlights | Heavy video highlights | "Moments from the league" gallery | Product demo / interactive globe | **Real-footage highlight reel as credibility proof** |
| Standings | Full live rankings (core feature) | Ranking progression mentioned | n/a | **Static standings teaser (no backend)** |
| Prize/stakes | Implicit (sport) | Implicit | n/a (pricing instead) | **Explicit prize pool + credits — esports best practice** |
| Social proof | Massive brand, sponsor logos | "Trusted by Industry Leaders" logos | Logo wall + testimonials near CTA | **Sponsors logo wall + traction metrics + endorsements, placed near CTA** |
| Primary CTA | Watch / buy tickets | Join / Discord / newsletter | One focused signup CTA | **One focused "Get in touch / Sponsor" (no-backend capture)** |
| Aesthetic | Premium sports, photo-dependent | Premium sports, render-dependent | Dark, cinematic, GPU-rendered, kinetic | **Cinematic sci-fi scrollytelling — more modern than both cousins** |
| Structure | Multi-page portal | Multi-page-ish | Often single long scroll | **One epic scroll (single narrative)** |

---

## Notes / Flags for Requirements

- **Content audit is the critical unblocker.** The page's credibility rests on real footage, prize numbers, standings, traction, sponsor logos, and endorsements. Requirements must establish *which exist today*. For any that don't, define an honest early-stage framing ("Season 1 — founding sponsors wanted") so no section renders empty. An empty logo wall or stale news feed reads as "dead project" and actively repels sponsors.
- **No-backend lead capture is a real decision, not a detail.** mailto is zero-cost but lossy; Formspree/Tally/Google Form give a captured list with no server and fit the static-export constraint. Flag for the stack/requirements pass.
- **Scroll spine is the long pole.** Highest complexity, must be designed with the 60fps + `prefers-reduced-motion` budget from the start. This is the most likely section to need its own deeper research/spike.
- **Differentiation strategy is subtractive on photography, additive on motion/type/light.** Because there are no athletes to shoot, lean into generated spectacle and kinetic typography — this is what lets UFA out-modern UFC.com and UFB.gg rather than imitate them.

---

## Sources

Genre cousins:
- [UFB.gg homepage](https://ufb.gg) — section structure (hero, Who We Are, Watch/Previous Pilots, Join, Create, Photo Stream, "Trusted by Industry Leaders", footer)
- [UFC.com homepage](https://www.ufc.com/) — hero/event countdown, upcoming events, highlights, tickets CTA, social embeds, footer
- [UFC Rankings](https://www.ufc.com/rankings) — standings as a core draw

Esports / tournament landing pages:
- [Colorlib — Esports website templates 2026](https://colorlib.com/wp/esports-website-template-designs/)
- [Muffin Group — Esports website design examples](https://muffingroup.com/blog/esports-website-design/)
- [Ticket Fairy — Esports event planning guide 2026](https://www.ticketfairy.com/blog/a-complete-guide-to-esports-event-planning-in-2025) (prize pool / registered-player visibility)

Top-tier launch / conversion patterns:
- [Primer — Winning hero section formula](https://www.goprimer.com/blog/the-winning-hero-section-formula) (Stripe/Linear/Vercel hero, sharp H1)
- [Landdding — Anatomy of a high-converting landing page](https://landdding.com/blog/from-click-to-signup-anatomy-of-a-high-converting-landing-page)
- [Indie Hackers — SaaS landing page design patterns](https://www.indiehackers.com/post/common-design-patterns-used-by-successful-saas-landing-pages-3ac5ce41c6) (Linear/Vercel aesthetic)

Sponsor / investor conversion:
- [That Round — How to demonstrate traction to investors](https://www.thatround.com/post/how-to-demonstrate-traction-to-investors-a-founders-guide)
- [MailerLite — Social proof examples for landing pages](https://www.mailerlite.com/blog/social-proof-examples-for-landing-pages) (logos, video testimonials, near-CTA placement lift)
- [Trade Press Services — Media kit that gets results](https://www.tradepressservices.com/a-practical-guide-to-creating-a-media-kit-that-gets-results/) (audience value up front)
- [Airmeet — Best event sponsorship web pages](https://www.airmeet.com/hub/blog/best-event-sponsorship-web-pages-with-powerful-examples/)
- [Kit — Call-to-action examples](https://kit.com/resources/blog/call-to-action-examples) (one focused, low-friction CTA)

Cinematic scrollytelling execution:
- [Webflow — Parallax scrolling examples](https://webflow.com/blog/parallax-scrolling) (SpaceX, Firewatch, layered parallax)
- [Lovable — Scrolling design patterns 2026](https://lovable.dev/guides/scrolling-designs-patterns-when-to-use) (Scroll-driven Animations API, compositor-thread performance)
- [Really Good Designs — Scrollytelling examples](https://reallygooddesigns.com/scrollytelling-website-examples/)

---
*Feature research for: cinematic single-page sponsor-conversion landing page (live AI-agent competition)*
*Researched: 2026-06-08*
