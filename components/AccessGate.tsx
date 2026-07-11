"use client";

import { useEffect, useState, useCallback, FormEvent, ReactNode } from "react";

// Shared email magic-link gate for the private one-pagers (/investors, /sponsor,
// /creators). Renders the email form until the visitor holds a valid access
// token, then renders the page content (children). Flow:
// 1. Visitor submits their email.
// 2. mitosislabs.ai/api/ufa/investor-request sends a magic link (audience-aware).
// 3. The link redirects back here with ?access=<token>.
// 4. The token is kept in sessionStorage and re-checked on each load; the
//    backend honors it for 24h after first use, then the gate returns.

const API_BASE = process.env.NEXT_PUBLIC_MITOSIS_API_URL || "https://mitosislabs.ai";

// Alex's scheduling page (the low-friction fallback for people who can't take a call now).
const ALEX_CHAT_URL = "https://mitosislabs.ai/chat/alex";

export type GateAudience = "investor" | "sponsor" | "creator";

// Audience-aware wording for the "get a call from Alex" screen.
const AUDIENCE_COPY: Record<GateAudience, { subject: string; contact: string }> = {
  sponsor: { subject: "the sponsor benefits", contact: "UFA sponsorships" },
  creator: { subject: "the creator program", contact: "UFA creators" },
  investor: { subject: "the opportunity", contact: "UFA" },
};

type Gate = "loading" | "gate" | "sent" | "content" | "expired";

function EmailGate({
  kicker,
  title,
  audience,
  expired,
  onSent,
}: {
  kicker: string;
  title: string;
  audience: GateAudience;
  expired: boolean;
  onSent: (email: string) => void;
}) {
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
        body: JSON.stringify({ email: trimmed, audience }),
      });
      // Always advance to "sent" regardless of server result (no enumeration)
      onSent(trimmed);
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <header className="band phero">
      <div className="wrap rise">
        <span className="kicker red"><span className="dot" />{kicker}</span>
        <h1 className="ptitle">{title}</h1>
        <p className="lead">
          This page is private. Enter your email to continue.
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

// After the email is captured we strike while they are hot: offer an immediate
// call from Alex. Submitting a number alerts Alex to call them back right away.
function CallRequestScreen({
  kicker,
  audience,
  email,
}: {
  kicker: string;
  audience: GateAudience;
  email: string;
}) {
  const copy = AUDIENCE_COPY[audience];
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = phone.trim();
    if (trimmed.replace(/\D/g, "").length < 7) {
      setError("Enter a valid phone number.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await fetch(`${API_BASE}/api/ufa/call-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: trimmed, audience }),
      });
      // Advance regardless of server result: the number is captured either way.
      setDone(true);
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <header className="band phero">
        <div className="wrap rise">
          <span className="kicker red"><span className="dot" />{kicker}</span>
          <h1 className="ptitle">Alex will call you shortly.</h1>
          <p className="lead">
            Keep your phone close. If now is not a good time, grab a slot below.
          </p>
          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.7 }}>
            <a href={ALEX_CHAT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
              Or set up a time to talk with Alex &rarr;
            </a>
          </p>
        </div>
      </header>
    );
  }

  return (
    <header className="band phero">
      <div className="wrap rise">
        <span className="kicker red"><span className="dot" />{kicker}</span>
        <h1 className="ptitle">Get a call from <span style={{ color: "var(--red, #d81f1f)" }}>Alex</span> right now to learn more about {copy.subject}.</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
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
          <button type="submit" disabled={submitting} className="btn btn-red" style={{ flexShrink: 0 }}>
            {submitting ? "Requesting..." : "Call me now"}
          </button>
        </form>
        {error && (
          <p style={{ color: "var(--red, #d81f1f)", marginTop: "0.75rem", fontSize: "0.875rem" }}>
            {error}
          </p>
        )}
        <p className="lead" style={{ marginTop: "1.25rem" }}>
          Alex is the Co-founder of Mitosis Labs and the main point of contact for {copy.contact}.
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.7 }}>
          <a href={ALEX_CHAT_URL} style={{ color: "inherit", textDecoration: "underline" }}>
            Or set up a time to talk with Alex &rarr;
          </a>
        </p>
      </div>
    </header>
  );
}

export function AccessGate({
  audience,
  kicker,
  title,
  children,
}: {
  audience: GateAudience;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const [gate, setGate] = useState<Gate>("loading");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const sessionKey = `ufa_${audience}_token`;
  // Remember that this visitor already submitted their email for this audience,
  // so a refresh keeps them on the call-request screen instead of the form.
  const emailKey = `ufa_${audience}_email`;

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

    // No valid access token: return a visitor who already gave their email to
    // the call-request screen ("sent"), otherwise show the email form ("gate").
    const storedEmail = (() => {
      try { return localStorage.getItem(emailKey); } catch { return null; }
    })();
    const fallbackGate = () => {
      if (storedEmail) {
        setSubmittedEmail(storedEmail);
        setGate("sent");
      } else {
        setGate("gate");
      }
    };

    const token = urlToken || sessionStorage.getItem(sessionKey);

    if (!token) {
      fallbackGate();
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
        sessionStorage.setItem(sessionKey, token);
        // Clean the URL (remove ?access=...)
        if (urlToken) {
          const clean = window.location.pathname;
          window.history.replaceState({}, "", clean);
        }
        setGate("content");
      } else {
        sessionStorage.removeItem(sessionKey);
        // A dead magic link goes to "expired"; a stale session token falls back.
        if (urlToken) setGate("expired");
        else fallbackGate();
      }
    } catch {
      fallbackGate();
    }
  }, [sessionKey, emailKey]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  if (gate === "loading") {
    return (
      <header className="band phero">
        <div className="wrap" style={{ opacity: 0 }}>Loading</div>
      </header>
    );
  }

  if (gate === "gate" || gate === "expired") {
    return (
      <EmailGate
        kicker={kicker}
        title={title}
        audience={audience}
        expired={gate === "expired"}
        onSent={email => {
          try { localStorage.setItem(emailKey, email); } catch {}
          setSubmittedEmail(email);
          setGate("sent");
        }}
      />
    );
  }

  if (gate === "sent") {
    return <CallRequestScreen kicker={kicker} audience={audience} email={submittedEmail} />;
  }

  return <>{children}</>;
}
