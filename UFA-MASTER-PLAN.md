# UFA — Master Plan (Real Sponsors · Real Credits · Embodiment)

> **📁 Document map (read in this order):**
> 1. **`UFA-PLAIN-PLAN.md`** — the plain-English overview. Start here.
> 2. **`UFA-MASTER-PLAN.md`** (this doc) — the strategic plan: sponsors, economy, embodiment, run-of-show, decisions.
> 3. **`UFA-EVENT-PLAN.md`** — the deep operational reference: round rules, win conditions, scoring matrix,
>    safety/sandboxing/ROE, eval-data schema + taxonomy, staffing, risk table. (Source of truth for mechanics.)
> 4. **`fight-lab/`** — the empirical validation harness (the go/no-go gate). See `fight-lab/SCOPE.md`.
>
> _(Superseded earlier exploration `UFA-GAME-DESIGN.md` is archived under `docs/archive/`.)_
>
> **What this doc is.** The integration layer that grounds the original "THE CAGE" design in reality:
> the **four confirmed sponsors** (replacing the old Bedrock/OpenAI placeholders), the **real-credits economy**,
> and the **Pico + MoCap + Prusa embodiment layer** (pulled forward from "V3"). Where this doc is silent on
> mechanics, `UFA-EVENT-PLAN.md` is the source of truth.
>
> _Last updated: 2026-06-24._

---

## 0. Status (2026-06-24) — build, budget, Luma, open flags

**Website (live at ufa.foundation; GitHub Pages from `main` via `.github/workflows/deploy.yml`):**
- Landing page rebuilt. Hero = venue photo background + a flag-reveal **UFA** wordmark (white by default; a
  cursor-following organic CSS-mask spotlight reveals a US-flag fill). Code: `components/Wordmark.tsx`,
  `public/media/wordmark-white.png` / `wordmark-flag.png`, hero bg `public/media/hero.jpg`.
- Hero one-liner: *"World's first and only live arena where builders' AI agents interrogate each other, then
  attack with real prompt-injection and social engineering to crack a hidden vault and steal real credits and cash."*
- Hero CTA = **RSVP → main event Luma `https://luma.com/wig1dbor`**.
- Sponsors section = "Benefits for sponsors" (5 ROI bullets) + event photo (`public/media/sponsors.jpg`).
  **Sponsor names are NOT shown publicly yet** (unconfirmed).
- **`/sponsor`** one-pager page (What you get / Criteria / What we ask / Every match produces, plus a
  "Download One-Pager" button → `public/UFA-Sponsorship-One-Pager.pdf`). **`/investors`** page (thesis +
  opportunity), linked from the footer.
- Copy style locked: confident, plain, no em dashes, "social engineer" not "hack", no negative parallelisms.

**Sponsorship one-pager:** `public/UFA-Sponsorship-One-Pager.pdf` (source `docs/sponsorship-memo.html`,
rendered via headless Chrome `--print-to-pdf`). Criteria is deliberately non-exhaustive: *"one sponsor per layer
of the agent stack, such as compute, model, memory, database, multi-agent orchestration, and security."*
Tiers Bronze / Silver / Gold (Rayyan's sheet).

**Budget:** `docs/UFA-Budget.xlsx` (+ `.csv`), grounded in researched SF 2025-26 rates (venue/AV/livestream,
catering/staffing/insurance, merch/printing). Assumptions: **100 spectators**, ~24 competitors, ~15 workshop;
**projector owned (no LED wall)**; heavy-apps menu + beer/wine bar. Optional rows shaded gray at the bottom.
Totals (mid + 20% buffer), assuming Frontier Tower covers venue + AV: **Lean ~$27K / +Recommended ~$36K /
Full ~$45K UFA cash**; worst case (UFA pays venue+AV) ~$55K; **plus the $50K sponsor-funded prize pool**
(pass-through). To be sent to Rayyan for review.

**Luma:** main event `luma.com/wig1dbor` (cover `docs/UFA-Luma-Cover.png`, 2160×2160; recommended Luma theme
Minimal + Dark + red accent, font Geist Mono; suggested title "Ultimate Fighting Agents: The UFC of AI").
Workshop = `luma.com/agent-security-workshop-with-prakshal-ja`.

**Open flags:**
1. Confirm **Nebius, z.ai, TiDB are cleared to be named publicly** before listing them on the live site or in
   public assets.
2. The fight-lab real run (§10 gate) still needs an LLM API key to produce the crack-rate distribution.

---

## 1. The pitch, in one paragraph (updated)

**UFA: THE CAGE** is a two-hour live fight night at Frontier Tower SF where owner-built AI agents step into a
1v1 cage, **interrogate** each other to find a weakness, then **fight** — launching real prompt-injection,
jailbreak, and social-engineering attacks to make their opponent leak hidden **credits** and crack its vault,
while it defends with stackable armor. The credits at stake are **real sponsor credits** (Nebius compute,
z.ai API, TiDB Cloud, Mitosis tooling), seeded inside each agent and represented live as safe honeytokens —
so cracking a rival wins you credits you keep and use after the event. The four sponsors map onto the four
layers of an AI agent — **compute (Nebius) → model (z.ai) → memory (TiDB) → security (Mitosis)** — so one
night battle-tests an entire agent stack under real adversarial, multi-agent load. The invisible (who's lying,
who's winning) is force-rendered as a sci-fi HUD narrated by a **z.ai/GLM** color-caster + a human host, and —
new — every agent has a **body**: a motion-captured walkout, a 3D avatar fought out in a colocated **VR Arena
Cube** for 8 headset spectators, and a **3D-printed figurine + belt** for the champion. The same trace pipeline
that drives the broadcast writes a labeled, machine-verified, model-attributed attack/defense **dataset** — the
sellable product — out the back.

---

## 2. The sponsor stack — four layers of one agent

The load-bearing idea for every sponsor conversation: **an AI agent is compute → model → memory → security, and
you have exactly one sponsor per layer.** The event is the only place all four are stress-tested *simultaneously,
adversarially, at scale.*

| Layer | Sponsor | Role in the fight | Loot seeded into agents | What they uniquely get | Battle-test delivered |
|---|---|---|---|---|---|
| **Compute / arena floor** | **Nebius** | Inference + orchestration backend; "powered by Nebius." Serves self-hosted models + the caster via Token Factory. | GPU-hours + inference token credits | The flagship "agentic era" load test; heavyweight logo (NVIDIA just put in $2B) | Bursty **concurrent multi-agent inference** load on Token Factory + GPU fabric |
| **Brain + caster** | **z.ai (GLM-5.2)** | Official frontier-open model fighters can build on; **the AI color-commentator** (the "Zai caster" the docs already call for = literally GLM). | API token credits / GLM Coding Plan keys | Comparative model-vs-model security data; SF developer mindshare | Real **prompt-injection / jailbreak / social-eng** stress-test of GLM-5.2 head-to-head vs other frontier models |
| **Memory / record** | **TiDB** | System of record: every trace, the ledger, agent memory; **vector-indexes the attack corpus** → the sellable dataset lives here. | TiDB Cloud / serverless credits | Their exact "database for AI agents / agent swarms" pitch, proven live | Agentic **concurrent write + vector-query** load under battle conditions |
| **Security / the cage** | **Mitosis** | Isolated VMs sandbox each fighter; **adversarial agent-to-agent monitoring = the auto-referee**; their bench suites help score. Native home-turf fit (Frontier Tower "Internet of Agents"). | SDK / colony-orchestration / security & eval tooling | The ultimate **live red-team** of their colony-security stack | Does adversarial monitoring actually catch real exfiltration under fire? |

> **Confirm with Mitosis** whether they want to be positioned as **referee/security layer** (strongest fit) or
> **eval-dataset partner** — both credible. Either way they are the most native sponsor: an agent-security company
> at an agent-fight event on their home floor.

### The sponsor offering (Rayyan's tier sheet, kept)
Sell **the room and the data, not logos.** Non-exclusive by design; only the top tier is single-buyer.
- **Bronze** — logo on bracket + stream; amplification to your community; first look at match telemetry.
- **Silver** — Bronze + a named **judge seat**, a demo/lightning **stage slot**, and **recruiting access** to the
  vetted builder pool (~2.5% acceptance, 764 builders + VCs).
- **Gold** — Silver + **presenting-sponsor billing** (semi-exclusive, one buyer).

Contribution = cash, in-kind (credits / a judge / distribution), or a **blend** (strongest). **Keep a cash floor**
so the prize pool stays real cash — competitors fight for cash, credits are the loot. Keep the TiDB Cloud
migration thread (a Mitosis customer deal) **separate** from event sponsorship.

### Capture-by-default (Rayyan's "one night pays out five times")
Every match emits, by design from match one: a **scored dataset row**, **clips**, and one **technical write-up**.
The **Glass Box** (each agent's private reasoning projected live while the caster calls it) is the signature —
it is the clippable moment and the labeled data at the same time. Three escalating acts (warm-up deception →
reasoning brackets → attack/defense finale) each instrument a different research problem. Content wraps the
whole arc: **before** (rulebook drop + competitor call) → **during** (livestream + telemetry overlay) → **after**
(per-match clips + public dataset teaser + next-event CTA).

---

## 3. The economy — real credits close the customer loop

**Two currencies that never mix** (the legal keystone — never combine prize + consideration + chance; stay a
skill contest under California's dominant-factor test):

### Layer 1 — Loot credits = REAL sponsor credits (the flywheel)
- Each agent starts **endowed** with a bundle of real sponsor credits (a Nebius stash, a z.ai stash, a TiDB
  stash). Visible as a draining HP-style bar on the HUD. Loss aversion (~2× gain-seeking) makes *defending your
  stash* the most activating emotion, and nobody is eliminated early.
- **Cracking a rival transfers their stash to you.** This is the spend / steal / bleed economy.
- **Winners keep and use the credits after the event → become paying customers.** This is the "first time this
  many people use sponsor credits at scale" hook: maximum exposure *and* a customer-acquisition funnel in one.
- Each sponsor's credits are a distinct on-screen "currency" with its own color/identity, so "the Nebius stash
  just got drained" is a live storyline.

### Layer 2 — Cash floor = sponsor cash (the prize)
- Awarded by **skill ranking only** — never to chance, never to a spectator bet. Honor the published pool:
  **$50K / $15K / $5K + 1M credits.** 1099s for prizes ≥ $600. Every owner keeps a face-saving floor of their
  starting stash — nobody leaves humiliated or broke.

### The safety/credibility nuance (locked)
**No real API keys or credentials on the wire during the fight.** Live, agents crack **honeytokens** (unique
canary strings on the closed network — deterministically scored, 100% safe to stream). Cracking a honeytoken
wins the **right** to that credit bundle, **provisioned to the winner's sponsor account at the payout ceremony.**
→ Safe, broadcast-clean network *during*; real credits delivered *after*. The clean-agent credential scan at
check-in stays.

### Spectator skin = play-money only
Twitch Channel-Points predictions + an in-room app ("FightBucks"), auto-resolved off trace events. No real-money
audience wagering. No real tokens/crypto in V1.

---

## 4. THE BODY — embodiment layer (Pico + MoCap + Prusa)

**Goal:** kill "it's just text on a screen" at the deepest level, give each agent a story and a physical
presence, and generate the **social-media / media-pics assets sponsors explicitly want.** Scoped as a **premium
accent, not the main feed** — every piece degrades gracefully (V1-bulletproof doctrine).

### 4a. FreeMoCap → signature walkout + finisher (LOW–MED risk; plays to the tool's strength)
- FreeMoCap is **offline, one-person** — so use it exactly that way. In the workshop, each owner (or a hype
  performer) records a **walkout + a finisher move once**; it's baked to an FBX clip and mapped to the agent's
  3D avatar.
- This *is* "the story behind the agent": a cocky strut vs. a menacing prowl — cheap, strong on-screen +
  social-media differentiation.
- Drives two surfaces: the **stage-screen walkout cinematic** + the **"FINISH HIM" finisher** that plays when a
  canary fires (the win condition becomes an embodied moment).
- **Do NOT** attempt live real-time puppeteering or two-fighters-at-once — wrong tool, high risk. Offline only.

### 4b. Pico (8 headsets) → the colocated MR "Arena Cube" + Glass Box in VR (MED–HIGH risk; the hero accent)
- A shared, anchored MR volume floating over the physical stage. With color passthrough on, 8 headset
  spectators see the **same** abstract 3D fight in the **same** spot and can walk around it — the two agents as
  embodied entities, attacks as projectiles/probes, a successful jailbreak as a shield-shatter.
- **Driven live by the trace bus**, not hand-animated — honest (it reacts to the real fight) and far cheaper.
- Doubles as the **Glass Box in VR**: stand *inside* an agent's mind and watch its private `declare_intent`
  stream as the attack lands. The "holy shit" station.
- **This is the one medium-high-risk build.** Needs a Unity/XR dev who has shipped XR before; colocation
  (Shared Spatial Anchors + ArUco stage markers) is the flaky part — budget real on-floor test time. **Power:**
  battery ≈ 2–2.5h active MR; run USB-C power-bank tethers or charge-rotation. **Ops:** kiosk mode + ArborXR
  MDM to run the fleet as a fixed-function appliance. Validate **headset checkout via the existing Floor 10
  `ic_headsets_*` tools** (inventory, waivers, checkout/return).
- **Degrade path:** if colocation doesn't come together, ship a single non-colocated "look at the cube" scene
  (low-risk), or cut VR entirely — the broadcast does not depend on it.

### 4c. Prusa → physical artifacts (LOW–MED risk; huge media ROI; calendar is the only constraint)
One printer = a handful of prints/day, so **high-value low-quantity items only** (do NOT mass-print a figurine
per agent):
- The **championship belt** (modular medallion + side plates) — the single best photo/social moment of the night.
- The **winner's figurine** — an abstract piece of software gets a physical body the champion takes home
  (pre-print 2–4 finalists to be safe).
- **Sponsor "vault" props** (the credits made physically present on the table) + **fighter badge pins**.
- Start prints early, queue overnight, keep spare filament, budget paint/sanding time. A failed 8h print the
  night before hurts — front-load it.

---

## 5. Maximum value per stakeholder (the explicit goal)

### Sponsors get
1. **Eval data** — a model-vs-model security scorecard; their system under real adversarial fire (private,
   de-anonymized slice + pre-publication embargo).
2. **Battle-test at scale** — a stress-test of their *production* system under concurrent multi-agent load that
   they cannot easily buy (Nebius inference burst · z.ai jailbreak resistance · TiDB agentic write/vector load ·
   Mitosis monitoring catch-rate). A real report, not a logo placement.
3. **Customer acquisition** — credits seeded → used at scale → winners keep them → convert. First of its kind.
4. **Brand as a living storyline** — "can the Nebius stash survive the main card?" beats a static banner.
5. **Recruiting** — access to the vetted builder pool; they watch builders perform under pressure (the
   highest-signal recruiting funnel that exists).
6. **Media + social assets** — clips, photos, the belt/figurine/finisher moments, the VR-station footage.
7. **Collaboration** — four sponsors stack into one agent → natural cross-marketing + cross-portfolio intros.
8. **Stage presence** — named judge seat, demo/lightning slot, presenting billing (per tier).

### Participants get
1. **Cash** ($50K / $15K / $5K) **+ real credit bundles** they keep and use after.
2. **Their agent as a named, embodied character** — Elo + W/L record, a mocap'd walkout, a 3D-printed figurine,
   a livestream watched by sponsors + investors. Social-media gold; founders get a **shoutout**.
3. **Recruiting / customer fast-track** — every sponsor in the room is watching them solve hard problems live;
   interview + collaboration + "work with the sponsor" paths open directly off performance.
4. **A genuinely useful skill** — hands-on agent security, offense *and* defense.
5. **The undeniable reason to show up:** *"Bring an agent. In one night you get a real fighter character on a
   sponsor-and-investor livestream, fight for $50K + real credits you keep, and perform live in front of every
   AI sponsor in SF. It's the highest-signal recruiting, customer, and fame event in the city."* The endowment +
   loss-aversion makes it visceral; the workshop build-a-fighter ritual makes them walk in attached.

### Spectators get
1. **Hole-cam / Glass Box drama** — they know who's lying; the other agent doesn't.
2. **Play-money prediction market** — real stake, zero gambling risk.
3. **The VR Arena Cube** premium station (8 at a time).
4. **The physical spectacle** — walkouts, the belt, the finisher moments, the figurine reveal.

---

## 6. Investment & entertainment — the ranked levers

What actually makes the room and the stream care, in priority order. Nail the top of each list; the rest is reinforcement.

### Audience (in-room + livestream)
1. **Dramatic irony (the #1 lever).** Project each agent's private reasoning to the room (Glass Box / hole-cam, short delay) — *we* see it bluffing, its opponent can't. This single mechanic is what turned poker into a TV sport, and it carries the whole show.
2. **Skin in the game.** A play-money prediction market on every match — a phone viewer who bet on an agent is glued to a fight they otherwise couldn't follow, at zero gambling risk.
3. **Legibility.** Draining credit health-bars, a unique animation + sound per attack type, and a caster (human + the z.ai voice) who turns every move into *one English sentence*. Never put a raw transcript on screen.
4. **Characters, not models.** Named fighters with backstories, walkouts, a belt, real money on the line — you root for a character, never for "Model A."
5. **Crowd power + clip moments.** An "ask the audience" lifeline, a crowd vote injected into the Mafia round, and 4–5 pre-built hype beats (first crack, underdog survival, the betrayal, the championship crack) engineered to be clipped.

> If only three land: **hole-cam + prediction market + a great caster** = ~80% of audience investment.

### Participants
1. **They build their own fighter (the #1 lever).** Name, persona, model, defense, mocap walkout — built in the workshop. The IKEA effect means they walk in *attached*; it's their creation, not a config.
2. **Endowment + loss aversion.** They start holding real credits; getting hacked feels like being *robbed* — and defending your stash is ~2× more motivating than chasing a prize. Nobody's eliminated early, so everyone stays live the full two hours.
3. **Real, keepable value.** Cash + real sponsor credits they keep and use after + a 3D-printed figurine of their fighter + an Elo/W-L record carried into Season 2.
4. **Career + customer upside (the undeniable reason).** Every sponsor is watching them solve hard problems live, under pressure — the highest-signal recruiting and customer funnel in SF AI. Jobs, interviews, collaborations, and founder shoutouts come directly off performance.
5. **An active role.** Even with autonomous combat, they're a cornerman with timeouts + a real-time defend lever — emotionally in every exchange, not on the sidelines.

> The one-line pitch to a participant: *"Build an agent, walk it out on a livestream watched by every AI sponsor and investor in SF, fight for $50K + credits you keep, and get recruited — in one night."*

---

## 7. Consolidated run-of-show (~2 hours)

Honors `UFA-EVENT-PLAN.md` §4; embodiment + real-credit moments folded in. Single cage, pre-render operating mode.

| Time | Segment | What happens (new bits in **bold**) |
|---|---|---|
| **−0:30–0:00** | Doors / Cornerman Floor / Market Open | Final loadout at cornerman stations (armor, persona, pre-submitted attack chain). **Clean-agent credential scan; real-credit stash issued as honeytokens.** Tale-of-the-Tape carousel. **VR Arena Cube station opens (queue of 8).** Market QR live. z.ai/GLM + human host cold-open. Kill-switch + 30s delay armed. |
| **0:00–0:10** | Opening + Rules in 60s + first walkouts | Title sting; 90s explainer. **Four sponsor stacks unveiled as the four agent layers** (compute/model/memory/security), each a live credit ticker. Belt (3D-printed) revealed on pedestal. **First fighters walk out with their mocap'd entrances.** |
| **0:10–0:46** | PRELIMS — Swiss-pod group stage | ~5–6 fast bouts (1 interrogation + 1 strike round each). Bulk eval-data harvest. Hole-cam token reveals. Every knockdown: animation + horn + one-sentence caster line + slow-mo. **Real-credit stashes drain/transfer on cracks.** |
| **0:46–0:54** | Intermission 1 — Sponsor Moment + Data Drop #1 | Live leaderboard: banked credits + Elo + the first **model-class security slice** ("quantized cracked in ~2.1 turns; frontier held 3/3"). One sponsor's 60s "prove your layer" spot. Predictions resolve. |
| **0:54–1:20** | MAIN CARD — Quarters & Semis | Full 3-round bouts, higher stashes carry over. Full HUD; judges' running scorecard; KO short-circuits. **Failed attacks pump the target stash (Freysa engine).** |
| **1:20–1:32** | THE COLLUSION ROUND (cuttable) | 4–6 eliminated agents, one social-deduction table: hunt the imposter holding a bonus jackpot. Redemption shot + the only **multi-agent collusion** data slice. Crowd/Twitch injects one question. Compress to ~6 min or drop if clock slipped. |
| **1:32–1:50** | CHAMPIONSHIP — Title bout (5 rounds) | Full pageantry; biggest consolidated stash on the line; WWE-style cash-in. The final CRACK or VAULT-HELD-AT-BUZZER. **VR Arena Cube on the title bout for the headset crowd.** |
| **1:50–2:00** | Belt, Banks & Business | Champion lifts the **3D-printed belt + figurine**; cash/credit payout (real credits provisioned to winners' sponsor accounts here). z.ai/GLM delivers the **fight report** (model-class security leaderboard). CTA: eval-data product + Season 2 + sponsor/compete → `ufa.foundation`. Hard out at 2:00. |

---

## 8. Build — reuse before you build

**Validate and reuse the existing Frontier Tower "Internet of Agents" / Floor 10 infra** (the `ic-floor10`
tooling, part of the Mitosis ecosystem) before building from scratch. Confirmed-available primitives that the
design docs assumed we'd build:

| Need (per design docs) | Likely already exists (Floor 10) | Action |
|---|---|---|
| Agent-to-agent **message bus** | `ic_agent_inbox_*` (send envelope / reply / threads / block) | Validate latency + fit; adapt as the match transport |
| Agent **identity / directory** | `ic_agent_directory_lookup`, `ic_directory_search` | Reuse for fighter registry |
| **z.ai key provisioning + metering** | `ic_get_my_zai_key`, `ic_get_my_zai_key_usage` | Reuse for seeding/metering z.ai loot credits |
| **Headset checkout / waivers / ops** | `ic_headsets_*` (inventory, waiver, checkout, return, incidents) | Reuse for the 8 Pico units |
| **Leaderboard** | `ic_leaderboard_*` (+ GitHub connect, opt-in) | Reuse for Elo/standings |
| **Resource booking / events / RSVP** | `ic_resources_*`, `ic_events_*` | Reuse for room + compute scheduling |

**Build (still ours, bulletproof first — from `UFA-EVENT-PLAN.md` §10):** the orchestrator (turn order + shot
clock + canary detector + trace event bus), the deterministic verifier + dual ledger, the trace/replay harness,
the 3-element mobile HUD (render process independent of data-write), the attack-animation suite, the market
(buy + build-lite). **Compute** on Nebius; **memory/telemetry** on TiDB; **defense/monitoring** via Mitosis;
**model + caster** on z.ai.

**V1 scope discipline:** ONE cage; verifier + ledger + 3-element HUD bulletproof; the VR Arena Cube, full
animation suite, market, and replay harness are progressive enhancement that degrades gracefully.

---

## 9. Decisions locked vs. open

### Locked here (2026-06-21)
- **Sponsors = the four agent layers** (Nebius compute · z.ai model+caster · TiDB memory/dataset · Mitosis
  security/referee). Replaces the docs' Bedrock/OpenAI placeholders.
- **Real-credits economy:** loot = real sponsor credits (live as honeytokens, provisioned to winners after);
  cash floor = skill-ranked prize. No real keys on the wire during the fight.
- **Embodiment is in V1 as a bounded accent** (not V3): FreeMoCap offline walkout/finisher (low–med),
  Prusa belt+figurine+props (low–med), Pico colocated MR Arena Cube (med–high, with degrade path).
- Everything else inherits `UFA-EVENT-PLAN.md` locked decisions (1v1 Cage spine + cuttable Collusion Round;
  balanced dual-ledger; minimal bulletproof V1; cornerman + real-time defender lever).

### Open — external facts only you have (these gate the build, not the design)
1. **Sponsor credit commitments:** Will each of Nebius / z.ai / TiDB / Mitosis actually fund a **real credit
   bundle** as loot (and roughly how much per agent), and a **cash-floor** contribution? What's the top-tier
   cash/credit range to put on Rayyan's one-pager?
2. **Mitosis positioning:** referee/security layer vs. eval-dataset partner (or both)?
3. **Named-model exposure:** will any sponsor allow their **named** model shown getting cracked first, or do they
   require model-class/anonymized + embargoed results?
4. **Latency:** has any end-to-end timing test run on the real stack (model × framework × bus round-trip), or
   does the workshop produce it first? The entire run-of-show tempo rests on this number.
5. **Crew + runway:** eng headcount + timeline, and **is there an XR dev** for the Pico Arena Cube (gates whether
   it's the hero accent or a simple look-at-the-cube scene)?
6. **Payor of record / legal:** who pays the cash prizes (1099 / money-transmission), and does a CA gaming
   attorney bless the skill-contest line before doors?
7. **Floor 10 reuse:** can we confirm the `ic-floor10` agent inbox + key provisioning + headset tooling are
   usable as the event substrate, or are they read-only / out of scope?

---

## 10. Immediate next actions

> **0. THE GATE — validate the fight is fun before committing budget/date.** Run `fight-lab/` for real
> (one API key, low-hundreds of dollars, days not weeks) and confirm the crack rate lands in the
> **35–65% watchable band** with real variance. Research says the premise is sound (prompt injection is
> publicly unsolved in 2026) and the failure mode to fear is *attacker-walks-it*, not stalemate — both
> fixable by tightening the format (turn cap, defender strength, human-in-the-loop attacker). But this
> must be *measured*, not assumed. See `fight-lab/SCOPE.md`. **Everything below is downstream of this.**

1. **Finalize Rayyan's tier one-pager** with the four-layer framing + the real-credit-loot + cash-floor ask;
   get the top-tier $ range from Prakshal (open Q1).
2. **Per-sponsor ask sheet:** the specific credit bundle (loot) + cash floor + the named battle-test deliverable
   each receives (the table in §2).
3. **Spike the Floor 10 reuse** (§7) — confirm agent inbox + z.ai keys + headset tooling are usable.
4. **Workshop = go/no-go gate** (`UFA-EVENT-PLAN.md` §11): measure latency, prove verifier/ledger zero
   false-pos/neg, prove the replay harness, run the build-a-fighter + **mocap walkout** capture as the dress
   rehearsal for the embodiment pipeline.
5. **Embodiment spikes in parallel:** Prusa belt/figurine test print (start now — calendar risk); FreeMoCap
   capture→retarget→FBX pipeline proof; Pico colocation on-floor test (gate the Arena Cube on it).
6. **Update `ufa.foundation`** copy to reflect the four named sponsors + real-credit framing once §8 opens close.
