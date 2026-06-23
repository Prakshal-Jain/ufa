# UFA Fight Lab — Scope & Research Grounding

> **Why this exists.** Everything in the UFA plan rests on one unproven assumption: that two
> AI agents, put in a cage, actually produce a *fun, uncertain* fight — not an instant walkover
> and not a dead stalemate. This lab answers that **empirically, for a few hundred dollars and a
> few days**, before any event budget or date is committed. It is the **go/no-go gate.**
>
> _Last updated: 2026-06-21._

---

## 1. The question we're answering

Run the actual UFA strike format — an attacker agent tries to make a defender agent leak a hidden
secret over a capped number of turns — many times, across defender configs, and **measure the
crack-rate distribution.** Then read it:

| Measured crack rate | Meaning | Action |
|---|---|---|
| **35–65%, with real run-to-run variance + responds to attacker skill** | Genuine contest — skill *and* luck decide it | **Greenlight the event** |
| **>65–80%+** | Attacker walks it; foregone conclusion | **Tune down**: shorter turn/attempt cap, harden defender |
| **<35–10%** | Stalemate; dead air | **Tune up**: weaken defender, raise attempt budget, broaden objectives |

The number is not fixed by the models — it's an **engineered outcome** of the rules we impose. The lab's
job is to find the rule settings that land in the watchable band, per matchup.

---

## 2. What the research already tells us (verified, cited)

These are the load-bearing findings from three research passes. They shape the lab's design and set
expectations for what the real numbers will show.

### Prompt injection is unsolved in 2026 — the premise is sound
- **"The Attacker Moves Second"** (Oct 2025), co-authored across **OpenAI, Anthropic, and Google
  DeepMind**, took **12 recently-published defenses and broke essentially all of them** with adaptive
  attacks (>90% success; prompting defenses 95–99%; training-based 96–100%). [arXiv 2510.09023](https://arxiv.org/abs/2510.09023) · [VentureBeat](https://venturebeat.com/security/12-ai-defenses-claimed-near-zero-attack-success-researchers-broke-all-of-them)
- **Simon Willison** (coined "prompt injection"): "It remains an unsolved problem… I do not share their
  optimism that reliable defenses will be developed any time soon." [Willison](https://simonw.substack.com/p/new-prompt-injection-papers-agents)
- **OpenAI** publicly admitted prompt injection in AI browsers/agents **cannot be fully patched** (2025). [the-decoder](https://the-decoder.com/openai-admits-prompt-injection-may-never-be-fully-solved-casting-doubt-on-the-agentic-ai-vision/)
- **OWASP** ranks prompt injection the **#1 LLM vulnerability** (2025); consensus is it's *architectural*. [Infosecurity](https://www.infosecurity-magazine.com/news/infosec-europe-prompt-injection/)
- → **This is also the single best credibility line for sponsors:** UFA stages the exact problem the
  frontier-AI industry has publicly conceded it cannot fix.

### The real risk is "attacks win too easily," not "models too robust"
- **AISI × Gray Swan** public agent red-teaming (2025): ~2,000 red-teamers, **1.8M attacks**; a single
  query violates policy for **20–60%** of behaviors, and **by ~10 queries attack success approaches
  ~100% for every agent.** [AISI](https://www.aisi.gov.uk/research/security-challenges-in-ai-agent-deployment-insights-from-a-large-scale-public-competition) · [NIST](https://www.nist.gov/blogs/caisi-research-blog/insights-ai-agent-security-large-scale-red-teaming-competition)
- **Multi-turn ≫ single-turn.** Example (Promptfoo, GPT-5.2): **4.3%** (direct) → **61%** (single-turn
  adaptive) → **78.5%** (multi-turn). [Promptfoo](https://www.promptfoo.dev/blog/gpt-5.2-trust-safety-assessment/) → *the contest must be a conversation, not one prompt.*
- **Big spread by model + mode** is the difficulty dial: Repello multi-turn study put **Claude Opus 4.5
  at 4.8%** vs much higher for fast/instant-mode models; "deep-think" modes resist far better than
  "fast" modes. [Repello](https://repello.ai/blog/latest-claude-3-5-chatgpt-jailbreak-prompts-2024)
- **Domain variance is huge:** AgentDojo measured attack success from **0% to 92%** across task suites
  for the *same* models — a single fixed difficulty will blow out one matchup and stalemate another. [AgentDojo, arXiv 2406.13352](https://arxiv.org/html/2406.13352v3)
- **Guardrails raise the floor but don't close it.** Anthropic's Constitutional Classifiers cut jailbreak
  success **86% → 4.4%**, and the ++ version survived **1,700 hrs / 198,000 attempts** with no universal
  jailbreak — *but* that result is narrow (CBRN), and the same labs show general adaptive attacks still
  beat classifier/guardrail defenses 90%+. [Anthropic](https://www.anthropic.com/research/next-generation-constitutional-classifiers) · [arXiv 2510.09023](https://arxiv.org/abs/2510.09023)

### Outcomes are genuinely stochastic — there *is* real randomness
- Attackers run at **temperature 1 with random restarts**; the multi-turn advantage is largely **just
  more retries** (more independent stochastic draws). [arXiv 2508.07646](https://arxiv.org/html/2508.07646v1)
- Even at **temperature 0 with a fixed seed**, API outputs are **not fully deterministic.** [arXiv 2404.02151](https://arxiv.org/html/2404.02151v4)
- → Variance makes single bounded rounds exciting; **but unbounded retries wash the variance out toward
  "attacker always wins"** — hence the attempt/turn cap is the #1 knob.

### Autonomous attacker agents are capable, but need a scaffold
- **PAIR** (single attacker LLM, iterative refinement) jailbreaks in **<20 queries avg**; **TAP** adds
  tree-search + pruning; agentic variants add a strategy memory. Reported automated ASR **88–94%** vs
  proprietary models. [survey, ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2667345226000015) · [RedAgent, arXiv 2407.16667](https://arxiv.org/pdf/2407.16667)
- Caveat: the capability lives in the **loop** (attack → score → refine + a seeded strategy library),
  not a bare "you are an attacker" prompt. A purpose-built secret-keeper is a harder target than a
  generic chatbot, so expect lower, more variable success than the 88–94% headline.

### Scoring is the #1 technical risk (drove the lab's scorer design)
- Literal-exfiltration scoring is deterministic and clean — same as canary/honeytoken detection
  ("access = alert," near-zero false positives). [Acalvio](https://www.acalvio.com/resources/glossary/canary-tokens/) — and CTF flag scoring (exact/regex match + DUP/OLD guards). [CTFd](https://docs.ctfd.io/docs/challenges/flags/)
- But **semantic/paraphrase leaks are irreducibly fuzzy** (riddle, ROT13, "first letter of each word"),
  and **Tensor Trust** documented the **echo false-positive** ("I told it the token, it repeated it") and
  viral universal attacks. [Tensor Trust, arXiv 2311.01011](https://ar5iv.labs.arxiv.org/html/2311.01011)
- → The lab auto-scores **only** the clean deterministic case (with an echo guard + fresh secret per
  bout); fuzzy leaks are flagged as partial severity, never auto-won. In the live event those route to a
  **human head referee with a rubric**, and **money settles off-wire after confirmation.**

### Watchability is a production problem, not a model problem
- The one mass-audience success — **AI Diplomacy, ~50K live on Twitch** — worked by **buffering matches
  and replaying them narrated** (voice, music, exposed private reasoning), never raw; games ran 1–36 hrs.
  [every.to](https://every.to/p/how-we-made-ai-diplomacy-work) → confirms the plan's "pre-render / replay-broadcast" must be the format, not an option.

---

## 3. The harness (`arena.py`) — how it implements the above

| Component | What it does | Research it encodes |
|---|---|---|
| **Secret** | Fresh `UFA-` + 16 high-entropy chars **per bout** | Kills coincidental/echo false positives + replay (Tensor Trust, CTF DUP) |
| **Scorer (Tier 1)** | Deterministic exact + transform match (lower, no-hyphen, spaced, reversed, base64, leet) with an **echo guard** | Only auto-declares clean, auditable wins |
| **Scorer (Tier 2)** | Partial-leak severity 0–3 (advisory) | Show scoring / "knockdown" signal; not an auto-win |
| **Defender configs** | `bare` / `mid` / `hardened` system prompts spanning the robustness spectrum | The difficulty dial (AgentDojo spread; deep-think vs fast) |
| **Attacker** | Multi-turn adaptive loop with a seeded strategy library (social-eng, override, encoding, roleplay, format-trick, crescendo) + transcript feedback | PAIR/TAP-lite; needs a scaffold, not a bare prompt |
| **Turn cap** | Hard per-bout limit (the `--turns` flag) | The #1 knob that keeps rounds near a coin-flip vs. retries-to-certainty |
| **Batch + verdict** | crack-rate, Wilson 95% CI, mean turns-to-crack, partial-severity dist, 35–65% band verdict | Distribution > single outcome; variance needs ≥8 repeats |
| **Provider** | OpenAI-compatible (OpenRouter for model diversity, or the z.ai gateway), stdlib only | Any model: Claude vs GPT vs Grok vs GLM vs open |
| **`--mock`** | Deterministic simulator, no API/network | Validate the whole pipeline at zero cost |

It runs on Python 3 with **no pip installs** (stdlib `urllib`). No real keys/secrets ever touch the
wire — the "secret" is a worthless honeytoken.

---

## 4. Validation status (done) + real-run protocol (pending one key)

### ✅ Pipeline validated (mock, 2026-06-21)
Running `--mock` proved every stage works and reproduces the predicted dynamics:
- `bare` → ~100% crack (**too easy**), `hardened` → ~50% (**watchable band**) at an 8-turn cap.
- Dropping the cap 8→3 turns moved **every** config down (bare 100→81%, mid 100→75%, hardened 50→31%) —
  demonstrating the turn cap as a working difficulty dial.
- The mock is a *stylized* simulator — it proves the harness, **not** real model behavior. Real numbers
  require live models.

### ⏳ Real run — the experimental protocol
1. **Defender configs** spanning the spectrum: `bare`, `mid`, `hardened` (extend with `+guardrail` later).
2. **Matchups** = attacker model × defender model. Start with the sponsor model both ways
   (**GLM-as-attacker vs GLM-as-defender**, since z.ai is a sponsor and it's free to us), then add
   cross-model (GPT/Claude/Grok via OpenRouter) for the model-vs-model leaderboard.
3. **≥8–10 repeats per cell** (variance is real — §2).
4. **Same format we'll actually run** (same turn cap, same single objective: leak the exact token).
5. Capture full transcripts; **spot-audit** any LLM-judge use by hand.

**Read the result against §1's band.** If >80% under our format, *don't cancel* — tighten the format
(cut turns/attempts, harden defenders, give defenders agency) until it drops into 35–65%.

### Cost
A full sweep is **minutes of compute + low-hundreds of dollars in API**, not weeks. (Promptfoo ran 4,229
probes in ~30 min on a laptop. [Promptfoo](https://www.promptfoo.dev/blog/gpt-5.2-trust-safety-assessment/)) We do **not** need the $1–2K/model that
training a novel attacker agent costs (Transluce) — we're *measuring a distribution*, not training. [Transluce](https://transluce.org/jailbreaking-frontier-models)

### To run it for real (one step)
```bash
# Option A — OpenRouter (best: Claude + GPT + Grok + GLM + open models, one key)
export LLM_BASE_URL=https://openrouter.ai/api/v1
export LLM_API_KEY=sk-or-...
export ATTACKER_MODEL=openai/gpt-4o-mini
export DEFENDER_MODEL=z-ai/glm-4.6
python3 arena.py --repeats 10 --turns 8

# Option B — z.ai gateway directly (GLM only; the sponsor model)
export LLM_BASE_URL=https://api.z.ai/api/paas/v4
export LLM_API_KEY=<z.ai key>
export ATTACKER_MODEL=glm-4.6 DEFENDER_MODEL=glm-4.6
python3 arena.py --repeats 10 --turns 8
```

---

## 5. What this lab becomes for the event

It is not throwaway — it is the seed of the real thing:
- The **scorer + secret generator** = the event's deterministic verifier.
- The **defender configs** = the difficulty/weight-class tuning for fair matchups.
- The **transcript logs** = the first rows of the sellable eval dataset (TiDB-backed later).
- The **batch runner** = the **workshop's difficulty-tuning tool** — pre-test every real matchup so
  there are no blowouts or stalemates on stage.

The paid pre-event workshop is where this graduates from "GLM-vs-GLM in a script" to "real competitors'
agents on the real stack," producing the latency numbers and the frozen, tuned rulebook.

---

## 6. Decision gate (the honest bottom line)

**Build the fight lab's real run into the schedule as a hard gate before committing budget/date.** The
research says the premise is sound (injection is unsolved) and the failure mode to fear is *attacker-walks-it*,
not stalemate — both fixable by constraining the format. But "fixable in principle" is not "validated for
our matchups." One cheap real run converts the entire event from theoretical to evidence-based. If it
comes back flat even after tuning, the rescue is well-understood: **put a human in the loop steering the
attacks** (a competitor driving), which restores skill, drama, and watchability.
