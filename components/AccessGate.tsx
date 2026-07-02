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

export type GateAudience = "investor" | "sponsor" | "creator";

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
  onSent: () => void;
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
      onSent();
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

function SentScreen({ kicker }: { kicker: string }) {
  return (
    <header className="band phero">
      <div className="wrap rise">
        <span className="kicker red"><span className="dot" />{kicker}</span>
        <h1 className="ptitle">Check your inbox.</h1>
        <p className="lead">
          A private access link is on its way. The link is personal to you. Do not forward it.
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
  const sessionKey = `ufa_${audience}_token`;

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

    const token = urlToken || sessionStorage.getItem(sessionKey);

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
        sessionStorage.setItem(sessionKey, token);
        // Clean the URL (remove ?access=...)
        if (urlToken) {
          const clean = window.location.pathname;
          window.history.replaceState({}, "", clean);
        }
        setGate("content");
      } else {
        sessionStorage.removeItem(sessionKey);
        setGate(urlToken ? "expired" : "gate");
      }
    } catch {
      setGate("gate");
    }
  }, [sessionKey]);

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
        onSent={() => setGate("sent")}
      />
    );
  }

  if (gate === "sent") {
    return <SentScreen kicker={kicker} />;
  }

  return <>{children}</>;
}
