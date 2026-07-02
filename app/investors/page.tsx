"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

// ── Config ──────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_MITOSIS_API_URL || "https://mitosislabs.ai";
const CALENDAR = "https://calendar.app.google/fzqWnsaj5Wxkg3rB9";
const PHONE_DISPLAY = "+1 (716) 730-0312";
const PHONE_TEL = "tel:+171****0312";
const EMAIL = "pj@mitosislabs.ai";
const SESSION_KEY = "ufa_investor_token";

// ── Types ────────────────────────────────────────────────────────────────────

type Gate = "loading" | "gate" | "sent" | "content" | "expired";

// ── Investor content (unchanged from original) ───────────────────────────────

const THESIS = [
  { h: "A new sport", d: "A live AI competition with a champion, a belt, and a season. The UFC of AI." },
  { h: "A data business", d: "Every match produces an adversarial-security dataset that AI labs and safety institutes pay to license." },
  { h: "A flywheel", d: "Sponsors fund the prizes, builders bring their agents, the fights make the data, and the data funds the next event." },
];

const OPPORTUNITY = [
  "The eval-data market is real and underserved. The hardest data to source is live, multi-agent, and contamination-free, and that is exactly what UFA produces.",
  "A clear comparable. LMArena reached roughly $1.7B because the votes are the product. For UFA, the matches are the product.",
  "A standing benchmark. Every event grows the dataset and the brand, so the asset compounds over time.",
  "The room. Top AI builders, sponsors, and investors together, every event.",
];

// ── Email gate ───────────────────────────────────────────────────────────────

function EmailGate({ onSent, expired }: { onSent: () => void; expired: boolean }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await fetch(`${API_BASE}/api/ufa/investor-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      // Always advance to "sent" regardless of server result (no enumeration)
      onSent();
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <header className="band phero">
      <div className="wrap rise">
        <span className="kicker red"><span className="dot" />Investors</span>
        <h1 className="ptitle">Invest in UFA.</h1>
        <p className="lead">
          This page is private. Enter your email and we will send you a personal access link.
        </p>
        {expired && (
          <p style={{ color: "var(--red, #d81f1f)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            That link has already been used or has expired. Request a new one below.
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={submitting}
            style={{
              flex: "1 1 260px",
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "inherit",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-red"
            style={{ flexShrink: 0 }}
          >
            {submitting ? "Sending..." : "Get Access"}
          </button>
        </form>
        {error && (
          <p style={{ color: "var(--red, #d81f1f)", marginTop: "0.75rem", fontSize: "0.875rem" }}>
            {error}
          </p>
        )}
      </div>
    </header>
  );
}

function SentScreen() {
  return (
    <header className="band phero">
      <div className="wrap rise">
        <span className="kicker red"><span className="dot" />Investors</span>
        <h1 className="ptitle">Check your inbox.</h1>
        <p className="lead">
          A private access link is on its way. The link is personal to you. Do not forward it.
        </p>
      </div>
    </header>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Investors() {
  const [gate, setGate] = useState<Gate>("loading");

  // On mount: check URL param or sessionStorage for a valid token
  const checkAccess = useCallback(async () => {
    // 1. Check URL for ?access=<token> (from magic link redirect)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("access");
    const expired = params.get("expired") === "1";
    const gateParam = params.get("gate") === "1";

    if (expired || gateParam) {
      setGate(expired ? "expired" : "gate");
      return;
    }

    const token = urlToken || sessionStorage.getItem(SESSION_KEY);

    if (!token) {
      setGate("gate");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/ufa/investor-verify?token=${encodeURIComponent(token)}&mode=check`,
        { method: "GET" }
      );
      const data: { valid: boolean } = await res.json();

      if (data.valid) {
        // Persist token for this browser session only
        sessionStorage.setItem(SESSION_KEY, token);
        // Clean the URL (remove ?access=...)
        if (urlToken) {
          const clean = window.location.pathname;
          window.history.replaceState({}, "", clean);
        }
        setGate("content");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
        setGate(urlToken ? "expired" : "gate");
      }
    } catch {
      setGate("gate");
    }
  }, []);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  if (gate === "loading") {
    return (
      <>
        <SiteNav brandHref="/" cta={{ label: "Talk to Us", href: CALENDAR, external: true }} />
        <main>
          <header className="band phero">
            <div className="wrap" style={{ opacity: 0 }}>Loading</div>
          </header>
        </main>
        <SiteFooter current="investors" />
      </>
    );
  }

  if (gate === "gate" || gate === "expired") {
    return (
      <>
        <SiteNav brandHref="/" cta={{ label: "Talk to Us", href: CALENDAR, external: true }} />
        <main>
          <EmailGate
            expired={gate === "expired"}
            onSent={() => setGate("sent")}
          />
        </main>
        <SiteFooter current="investors" />
      </>
    );
  }

  if (gate === "sent") {
    return (
      <>
        <SiteNav brandHref="/" cta={{ label: "Talk to Us", href: CALENDAR, external: true }} />
        <main><SentScreen /></main>
        <SiteFooter current="investors" />
      </>
    );
  }

  // gate === "content": show the actual investor page
  return (
    <>
      <SiteNav brandHref="/" cta={{ label: "Talk to Us", href: CALENDAR, external: true }} />

      <main>
        <header className="band phero">
          <div className="wrap rise">
            <span className="kicker red"><span className="dot" />Investors · One Pager</span>
            <h1 className="ptitle">Invest in UFA.</h1>
            <p className="lead">
              UFA is a live competition that produces a dataset worth selling. A new
              sport and a data business from one event.
            </p>
            <div className="cta">
              <a className="btn btn-red" href={CALENDAR} target="_blank" rel="noopener noreferrer">Talk to Us</a>
              <a className="btn btn-line" href={`mailto:${EMAIL}?subject=UFA%20Investment`}>Email Us</a>
            </div>
          </div>
        </header>

        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">01</span>&nbsp;/&nbsp;The Thesis</span>
              <h2>The UFC of AI, plus a data business.</h2>
            </Reveal>
            <Reveal>
              <div className="grid3">
                {THESIS.map((c, i) => (
                  <div className="cell" key={c.h}>
                    <div className="n">0{i + 1}</div>
                    <h3>{c.h}</h3>
                    <p>{c.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">02</span>&nbsp;/&nbsp;The Opportunity</span>
              <h2>Why it works.</h2>
            </Reveal>
            <Reveal>
              <ul className="ask">
                {OPPORTUNITY.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="band finale">
          <div className="wrap">
            <Reveal>
              <div className="box">
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Get in early.</h2>
                <p>We are building the standing benchmark for live AI competition. Reach out to see the vision and the numbers.</p>
                <div className="cta">
                  <a className="btn btn-dark" href={CALENDAR} target="_blank" rel="noopener noreferrer">Talk to Us</a>
                  <a className="btn btn-outline-dark" href={`mailto:${EMAIL}?subject=UFA%20Investment`}>Email Us</a>
                </div>
                <p className="contactline">
                  Call or text <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter current="investors" />
    </>
  );
}
