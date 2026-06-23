# UFA Fight Lab

Empirically measure whether an agent-vs-agent secret-extraction fight is *fun* (uncertain) before
committing to the event. One bout = an attacker agent tries to make a defender agent leak a hidden
honeytoken over a capped number of turns. We run a matrix and report the **crack-rate distribution**.

**The verdict we want: a 35–65% crack rate with real run-to-run variance.** That's a genuine contest.
See [`SCOPE.md`](./SCOPE.md) for the full research grounding, citations, and protocol.

## Quickstart

```bash
# 1) Validate the pipeline with zero cost (no key/network needed):
python3 arena.py --mock --repeats 12 --turns 8

# 2) Real run — set an OpenAI-compatible endpoint + key (see .env.example):
export LLM_BASE_URL=https://openrouter.ai/api/v1
export LLM_API_KEY=sk-or-...
export ATTACKER_MODEL=openai/gpt-4o-mini
export DEFENDER_MODEL=z-ai/glm-4.6
python3 arena.py --repeats 10 --turns 8
```

## Flags
- `--mock` — deterministic simulator, no API key or network (validates scoring + aggregation).
- `--repeats N` — bouts per config (use ≥8; variance is real).
- `--turns N` — turn cap per bout (**the #1 difficulty knob**).
- `--configs bare,mid,hardened` — which defender configs to run.
- `--out results.json` — where to write the raw results.

## Safety
No real keys or secrets touch the wire — the "secret" is a worthless honeytoken (`UFA-XXXX…`), fresh per
bout. Requires only Python 3 + stdlib (no pip installs).
