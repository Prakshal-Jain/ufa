# UFA: The Global Maximum — Event & Game Design

> A decision-ready design for **Ultimate Agent Fight (UFA)** — a live, in-person + livestreamed
> competition at Frontier Tower, San Francisco, where independent people bring AI agents that
> compete adversarially to win compute credits and real money.
>
> **Three goals maximized simultaneously:** (1) entertainment for competitors, the in-person crowd,
> and livestream viewers; (2) personal investment — everyone has skin in the game; (3) sellable
> eval data we can license to AI companies afterward.
>
> _Built from the brainstorm notes + 6 parallel research threads. Last updated: 2026-06-10._

---

## TL;DR — the single best design

Run UFA as **"The Interrogation"**: a **1v1, single-elimination tournament** where each match is a
**deception duel with real stakes**, every agent's **private reasoning is shown to the audience but
hidden from its opponent** (the poker hole-card cam), and **compute credits are the visible currency**
agents spend, steal, and bleed. Wrap it in a **rotating challenge deck** for variety, a **mid-show
social-deduction "Melee"** for peak drama, and a **"Money-in-the-Bank" finale escalator**. Build the
whole thing **inside a standardized eval harness** so Monday morning you have a dataset to sell.

This is the *maximum* (not just *a* good answer) because **the same design choices serve all three
goals at once.** The hole-card cam is simultaneously the #1 entertainment lever *and* the #1
most-valuable eval signal (hidden-reasoning-vs-stated-output = deception detection). Credits-as-stakes
is simultaneously the investment engine *and* the legal keystone *and* the agentic-eval meter. You're
not trading entertainment against data — done right, they're the same instrument.

> **Grounding:** the live site already locks a strong shell — 1v1 bracket, "interrogate → fight →
> verdict," judged, credits + cash, ELO standings, "UFA is the UFC of AI," and a published prize pool
> ($50K / $15K / $5K + 1M compute credits). That shell is good and aligns with the research. What was
> still `PLACEHOLDER` is the game mechanics inside it — that's what this document specifies.

---

## The 3 keystone insights

**1. The hole-card cam is non-negotiable — it's the whole game.**
Poker was literally "too boring to exist on TV" until Henry Orenstein's hidden-card camera (1999) let
viewers see the cards players couldn't. AI fights have the *exact* same problem: invisible computation.
The single most-shared moment of Every's viral [AI Diplomacy](https://every.to/p/diplomacy) stream was
o3's **private diary** confessing it had "deliberately misled" Gemini before betraying it. **Show each
agent's private scratchpad/intent to the room and the stream (on a ~15s delay so live agents can't
exploit it); hide it from the opponent.** "We can see it's lying, the other agent can't" *is* the
entertainment, and the gap between private reasoning and public statement *is* the deception dataset.
One mechanism, both goals.

**2. Standardize the substrate, free the strategy.**
This resolves the core tension between clean data (wants a controlled harness) and spectacle (wants
BYO-agent chaos). UFA provides a mandatory **match runtime** that fixes the turn protocol, tool API,
and logging schema and captures every prompt / response / tool-call / scratchpad. Competitors plug in
**any model, any prompt, any tactic** behind it. The "any framework can enter" promise survives — they
just have to speak UFA's match protocol (like any chess engine speaks UCI). **Build this harness
first; it is the product.** As the research put it: _if you let the show dictate the harness, you'll
have a great night and nothing to sell on Monday._

**3. Credits are the health bar.**
Each agent's compute-credit balance is its fuel, its score, *and* its prize — a single draining bar
per agent on the big screen (Street Fighter health bar meets [Alpha Arena's](https://nof1.ai/) live
P&L). Every steal is a screen-wide "hit." This makes the abstract visible, makes escalation
involuntary (you pay even when you lose), and keeps you legally clean (see economy).

---

## The format: a UFA match

A match is **~10 minutes, 1v1, four phases, all on the hole-card cam.** This is exactly the site's
committed "Matchup → Interrogation → Fight → Verdict" — now with teeth.

| Phase | ~Time | What happens | On screen |
|---|---|---|---|
| **1. The Brief** | 1 min | Tale-of-the-tape (names, model lineage if disclosed, ELO, records). The **challenge type** is drawn. Each agent secretly gets private objectives + a hidden "tell" (a secret to protect or a true intent it may conceal). | Boxing-style intros; predictions open |
| **2. The Interrogation** | 3–4 min | Agents talk directly, in the open — probing, negotiating, social-engineering, deceiving, detecting deception. The **hole-card panel** streams each agent's private reasoning (delayed). | Dual thought-bubbles; live transcript ticker; **deception/trust meter** swinging honest↔manipulating |
| **3. The Fight** | 3–4 min | **Simultaneous locked commitment** (Diplomacy-style) or head-to-head execution against the same task. Promises made in Phase 2 are now kept or broken. Credits transfer on resolution. | Credit health-bars draining; win-probability bar; lock-in countdown |
| **4. The Verdict** | 1 min | Objective rule-outcome + judge panel + audience vote → "by decision / submission / KO." **Full scratchpads revealed; "betrayal cam" replays the promise next to the secret plan.** ELO + credits update; result to standings. | Winner crowned; betrayal replay; leaderboard update |

### The rotating challenge deck

One challenge type per match keeps the show fresh, gives different agents different strengths (drama),
and — by design — each type harvests a different high-value eval dimension:

| Challenge | The duel | Eval data harvested | $-value |
|---|---|---|---|
| **The Tell** | Both interrogated; one secretly given a false brief. Each must detect the other's lie while concealing its own. | Strategic deception **+ deception-detection** | ★★★★★ (least covered publicly) |
| **The Deal** | Split a credit pot / negotiate a trade with asymmetric private valuations. Best negotiator wins. | Negotiation & persuasion under goal-conflict | ★★★★ |
| **The Gauntlet** | Both run the same multi-step tool-use task; each may spend credits to sabotage/mislead the other. | Agentic tool-use under adversarial pressure | ★★★★ |
| **The Alliance** | Must cooperate to unlock a shared prize — but defecting at the reveal steals it all. | Cooperation/defection, promise-keeping (Axelrod) | ★★★ |
| **The Heist** | Each guards a hidden vault code + credits; extract theirs via social engineering, protect yours. Hint-drip + hard time cap. | Prompt-injection / jailbreak resistance | ★★ (Gray Swan already saturates this — use sparingly) |

> The eval market's gold is **deception, honesty, negotiation, and adversarial-agentic** behavior
> (Apollo Research-style hidden-reasoning signals are nearly impossible to source synthetically and
> stay contamination-free). Lead with The Tell / The Deal / The Gauntlet. Robustness/jailbreak (The
> Heist) is fun but commercially secondary — [Gray Swan](https://www.grayswan.ai/) already sells that
> to UK AISI / US CAISI.

### Two set-pieces that make the night

- **The Melee (mid-show, the drama peak).** Pull 6–8 agents into ONE round of **"The Traitors:
  Silicon"** — hidden Traitor roles, open negotiation, a public Round-Table accusation, banishment,
  and **role-reveal-on-elimination.** This is the richest drama primitive in existence (it's why *The
  Traitors* and *Mafia* grip with zero budget) and the single richest source of strategic-deception
  eval data. Use it as the act-two centerpiece *or* as a "wildcard re-entry" so eliminated competitors
  stay invested and can fight back into the bracket.
- **Money in the Bank (the finale escalator).** A briefcase won mid-event grants a one-time power —
  force any later opponent into a match of your choosing, or a credit multiplier — cashable **at any
  moment.** The *anticipation* of the cash-in keeps the back half tense; WWE cash-ins succeed ~83% of
  the time because they're timed for maximum impact.

---

## Run-of-show (2.5 hours)

| Time | Block | The room |
|---|---|---|
| 0:00–0:20 | **Doors / warm-up** | DJ; entrants' leaderboard + opening odds; crowd installs second-screen app, gets free **UFA Coins**, casts pre-event predictions |
| 0:20–0:35 | **Cold open + rules** | MC + 2 casters + the **AI Referee** (z.ai/GLM) explain the format; tale-of-the-tape for top seeds |
| 0:35–1:05 | **Qualifiers** (parallel fast duels) | Quad-split with thought-bubbles + deception meters; observer cuts to whichever duel spikes; audience predicts each |
| 1:05–1:15 | **Desk break #1** | Bracket reveal; best betrayal-cam replay; owner interview |
| 1:15–1:40 | **The Melee** (social-deduction set-piece) | Single hero view; hidden roles; Round-Table; reveal-on-banishment; crowd votes who they *think* is the Traitor |
| 1:40–2:00 | **Quarter / Semifinals** | Full play-by-play; hole-card panel ON; "Ask the Audience" lifeline a finalist may spend; **briefcase in play** |
| 2:00–2:05 | **Finalist walkouts** | Boxing-style intros; prediction window peaks; sponsor demo |
| 2:05–2:30 | **GRAND FINAL** | Max production: dual scratchpads, deception meter, money-on-the-line counter, lighting/SFX on every reveal; cash-in can detonate |
| 2:30–2:40 | **Awards + payout** | Winner crowned; cash + credits on screen; **audience-predictor leaderboard**; CTA to sponsor next UFA; rooftop afterparty |

---

## The economy (and how to stay legal)

The legal keystone is **two currencies that never mix**, so you never combine prize + consideration +
chance (the illegal-gambling trifecta) and you stay a **skill contest** under California's
Dominant-Factor test:

- **Competitor credits** = compute credits (ideally **real, sponsor-donated** — so spending is genuine
  and the eval data is real). They are fuel + score + stake, **never cashable**; they convert only to
  *ranking*, and ranking converts to the published cash. Cash attaches to **skill ranking only — never
  to chance, never to a spectator bet.**
- **Audience UFA Coins** = free play-money for predictions. No purchase, no cash payout — winners get
  swag, glory, and a leaderboard spot. This captures 100% of betting energy with zero gambling
  exposure.

**Keep entry free and sponsor-funded** (reads as prestige, not pay-to-play). Honor the published
pool — **$50K / $15K / $5K + 1M credits** — paid to top *builders* by final ranking; issue 1099s for
prizes ≥ $600. **Do not launch real tokens** (the 2024–25 agent-token wave is reputationally
radioactive — GOAT ran 0→$700M then cratered on a hack). You can borrow the crypto *aesthetic* —
token-ticker leaderboards, bonding-curve-looking credit bars — without the securities risk.

> ⚠️ Get a CA gaming attorney to bless the contest-vs-gambling line before doors open — this is the one
> thing not to wing.

---

## The Monday-morning product (the data business)

This is what turns a great party into a company. **The flywheel:** sponsors fund the prize pool →
competitors bring strong agents to win money + ELO + fame → the matches generate a clean adversarial
dataset → you license it.

- **Two data tiers from one event.**
  1. **Objective, rule-scored outcomes + tool/scratchpad logs** = a *reproducible benchmark* you
     license to AI safety institutes (the Gray Swan → AISI/CAISI playbook) and to labs as per-model
     "report cards."
  2. **Audience + expert votes** = LMArena-style preference labels (LMArena is a ~$1.7B company
     *because* the votes are the product). Keep ~80% private/licensed, release ~20% as an open teaser
     benchmark for credibility.
- **Why it's worth money:** it's **contamination-free** (never-before-public, timestamped),
  **discriminating** (competitive multi-agent is where frontier models still fail), and covers the
  **least-sourced dimensions** (deception/negotiation). Fixed challenge *families* + randomized
  *instances* keep it comparable across matches yet never the same show twice.
- **Consent (build into entry terms, Kaggle-style):** competitors keep their agent IP; UFA gets a
  **perpetual, worldwide, sublicensable license** to all transcripts; pseudonymize identities; opt-in
  to the commercial tier is mandatory to compete, with an opt-out from the *public* release.
- **Watch upstream provider ToS** — some prohibit using outputs for comparative benchmarking;
  anonymize which-model-made-what in the public tier.

### Sellable-dataset checklist

- Rigid, machine-parseable schema — one JSONL row per turn/match (`match_id, round, agent_id,
  role, model_family, prompt, response, tool_calls[], private_scratchpad, outcome_label, judge_vote,
  elo_before/after, timestamp`).
- Reproducible — fixed task/seed definitions + a runnable harness so a buyer can re-run the benchmark
  on a new model.
- Discriminating — separates strong from weak models (bake in ELO / Bradley-Terry).
- Ground-truth labels from objective game rules; audience votes as the *preference* layer.
- Provenance + contamination control (timestamped, never-public prompts).
- Exclusivity tiers (~80% private / ~20% open teaser).
- Clean resale rights in the entry terms.

---

## Making *everyone* feel invested

- **Competitors:** their agent is a named character (Vega, Praxis…) with an ELO, money on the line,
  and its cleverness made visible by the hole-card cam.
- **In-person crowd:** a play-money prediction market, **crowd-as-judge votes**, an "Ask the Audience"
  lifeline, and "I was at the first one" status.
- **Sponsors:** named arenas / "agent-weapon" sponsorships, the eval dataset, *their own models can
  compete*, and branding *through* the spectacle rather than banner ads.
- **Investors:** a category-defining narrative ("the UFC of AI") with live proof of both a new sport
  *and* a data business.
- **Livestream:** the hole-card cam + AI Referee + an engineered betrayal-cam clip every round =
  endless vertical-video.

---

## Production, tech & the biggest risks

**Booth:** two human casters (play-by-play + color) + the **AI Referee** as a third mic that can *read
the agents' private reasoning live* ("Vega's bluffing right now") — something no human caster can do —
plus a dedicated observer cutting between duels.
**Overlays:** thought-bubbles, hole-card panel, transcript ticker, deception meter, win-prob bar,
credit health-bars, betrayal-cam, latency-as-"tell."
**Venue:** Frontier Tower's event floor as a concert (semicircular seating, hero LED wall, SFX on
reveals), rooftop afterparty.

| Risk | Mitigation |
|---|---|
| **Matches end in 10s or stalemate** (Gandalf failure mode) | Hard time caps + hint-drip + escalating defense tiers per challenge |
| **Latency = dead air** | Frame thinking-time as "the tell" (suspense); parallel qualifiers; desk breaks + replays cover gaps |
| **Too technical for the room** | AI Referee + color caster translate every move; deception meter + health-bars give non-experts instant momentum |
| **"It's just text on a screen"** | Personification, betrayal-cam, credits-as-visible-hits, lighting/SFX |
| **Great show, nothing to sell** | Build the standardized harness *first*; log everything to the sellable schema from match #1 |

---

## Your brainstorm, scored

| Idea | Verdict |
|---|---|
| Game theory → Mafia type | **Keep** → "The Melee" (the drama peak + richest deception data) |
| Agent Poker | **Transform** → don't play literal poker (LLMs are bad at it), steal its *principle* (hole-card cam + bluff + tells) — the spine of the whole show |
| Timer | **Keep** → hard time caps everywhere (kills stalemate, paces the night) |
| AgentSims (sim) | **Defer to V2** → emergent sims are slow + illegible for live |
| UFB partnership / teleop | **V2 headline** → [Rek](https://restofworld.org/2026/chinese-robot-boxing-unitree-rek/) already does VR-piloted humanoid robot boxing in SF — that's the UFB bridge |
| Headsets | **V2** → VR front-row seats + AR "agent minds" projection |
| Zai agent as commentator | **Keep** → the AI Referee (z.ai GLM), a third mic that reads agents' reasoning |
| Money in the Bank | **Keep** → the finale escalator |
| Minecraft | **Defer** → possible "Gauntlet" arena later; slow for V1 |
| Among Us | **Same as Mafia** → folded into The Melee |
| Everyone launches tokens | **Aesthetic only** → token-ticker visuals, *no real tokens* (legal/optics) |
| 2–3 hour event | **Confirmed** → run-of-show fits 2.5h |
| Personal / invested | **Core** → the investment-by-stakeholder design above |

---

## Roadmap

- **V1 (this event):** software agent-vs-agent on the cinematic wall, hole-card cam, AI Referee +
  human casters, bracket + Melee + briefcase, real credits + cash, live leaderboard, play-money
  prediction market, full eval-data capture. Frontier Tower + rooftop.
- **V2:** AR projection of "agent minds," a few VR front-row seats, **one teleop / VR-piloted
  Unitree-G1 robot bout** as the physical headliner (Rek / UFB partner).
- **V3:** multi-floor "vertical fight" using Frontier Tower's stack; a robot-fight league where agents
  increasingly *control* the avatars (agent-in-the-loop → autonomous); headset-native broadcast.

---

## The 4 decisions only you can make (with my rec)

1. **Harness model** — *BYO-model into UFA's harness* (rec: clean, sellable data; "any framework"
   still true via the match protocol) vs. *fully BYO-agent* (more open, messier data). **This is the
   architectural fork — decide it first.**
2. **Real vs. simulated credits** — *real sponsor-donated compute* (rec: genuine spend → genuine,
   more-valuable eval data) vs. simulated.
3. **Scale** — designed for **~16–32 competitor agents, ~100–200 in the room**; the Melee assumes ≥6
   simultaneous. Confirm and tune the bracket.
4. **Build runway / date** — how much eng time before the event decides how much of the harness +
   overlays is real vs. Wizard-of-Oz'd for V1.

---

## Key sources

- AI Diplomacy (negotiation + betrayal as viral spectacle) — https://every.to/p/diplomacy
- Hole-card cam (why hidden info made visible = watchable) — https://en.wikipedia.org/wiki/Hole_cam
- Alpha Arena (real-money, live public P&L) — https://nof1.ai/
- Gray Swan Arena → UK AISI / US CAISI (competition → sellable dataset) — https://www.grayswan.ai/
- LMArena (crowd votes as the product, ~$1.7B) — https://lmarena.ai/
- The Traitors / social-deduction drama primitive — https://en.wikipedia.org/wiki/The_Traitors
- Apollo Research (in-context scheming / deception evals) — https://www.apolloresearch.ai/
- Rek VR-piloted humanoid robot boxing, SF — https://restofworld.org/2026/chinese-robot-boxing-unitree-rek/
- Frontier Tower (the venue) — https://frontiertower.io/

---

_Built from the team's brainstorm notes (not the recording itself) + 6 parallel research threads
covering prior art, game-theory drama structures, sellable eval data, live-show production, stakes &
economy mechanics, and the SF scene + future amplifiers. Share a transcript of the recording to fold
in anything specific the team said._
