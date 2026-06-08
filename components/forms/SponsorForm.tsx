"use client";
// Working Formspree lead-capture form. Endpoint from NEXT_PUBLIC_FORMSPREE_ENDPOINT,
// falls back to data/site.ts placeholder id. Native form works without JS; enhanced
// with inline success/error.
import { useState, type CSSProperties, type FormEvent } from "react";
import { site } from "@/data/site";

// NEXT_PUBLIC_ vars are inlined at build time under static export — intended.
const endpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  `https://formspree.io/f/${site.formspreeFallbackId}`;

type Status = "idle" | "submitting" | "success" | "error";

const fieldWrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  marginBottom: "1rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.8rem",
  letterSpacing: "0.04em",
  color: "var(--ufa-muted)",
};

const inputStyle: CSSProperties = {
  background: "var(--ufa-bg-elevated)",
  border: "1px solid var(--ufa-rule)",
  borderRadius: "var(--ufa-radius)",
  color: "var(--ufa-fg)",
  padding: "0.75rem 0.9rem",
  font: "inherit",
  width: "100%",
};

const submitStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--ufa-accent)",
  color: "var(--ufa-bg)",
  borderRadius: "var(--ufa-radius)",
  padding: "0.9rem 1.6rem",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const messageStyle: CSSProperties = {
  fontSize: "var(--ufa-type-body)",
  lineHeight: 1.5,
};

const errorStyle: CSSProperties = {
  color: "var(--ufa-accent-3)",
  fontSize: "0.9rem",
  marginTop: "0.75rem",
};

// Scoped focus-visible ring + disabled style — no dependency on global CSS.
const scopedStyle = `
.ufa-form input:focus-visible,
.ufa-form textarea:focus-visible,
.ufa-form button:focus-visible {
  outline: 3px solid var(--ufa-accent-3);
  outline-offset: 2px;
}
.ufa-form button[disabled] { opacity: 0.6; cursor: progress; }
.ufa-form a { color: var(--ufa-accent); }
`;

export function SponsorForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Progressive enhancement: the native action/method below means the form
    // still submits if JS fails. This handler intercepts only when JS is live.
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="ufa-form" style={messageStyle}>
        <style>{scopedStyle}</style>
        <p>
          Thanks — we&apos;ll be in touch. You can also reach us at{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      className="ufa-form"
      action={endpoint}
      method="POST"
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
    >
      <style>{scopedStyle}</style>

      <div style={fieldWrapStyle}>
        <label htmlFor="sf-name" style={labelStyle}>
          Name
        </label>
        <input id="sf-name" name="name" type="text" required style={inputStyle} />
      </div>

      <div style={fieldWrapStyle}>
        <label htmlFor="sf-email" style={labelStyle}>
          Email
        </label>
        <input
          id="sf-email"
          name="email"
          type="email"
          required
          style={inputStyle}
        />
      </div>

      <div style={fieldWrapStyle}>
        <label htmlFor="sf-company" style={labelStyle}>
          Company
        </label>
        <input id="sf-company" name="company" type="text" style={inputStyle} />
      </div>

      <div style={fieldWrapStyle}>
        <label htmlFor="sf-message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="sf-message"
          name="message"
          required
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* Formspree honeypot spam trap — kept off-screen, not for humans. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
      />

      <button type="submit" style={submitStyle} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get in touch"}
      </button>

      {status === "error" && (
        <p role="alert" style={errorStyle}>
          Something went wrong. Please try again, or email us at{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      )}
    </form>
  );
}
