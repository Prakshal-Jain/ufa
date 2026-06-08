// How-it-works section - 4-step match format. Steps from data/concept.ts (placeholder).
import type { CSSProperties } from "react";
import { howItWorks } from "@/data/concept";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The 4-step match format as a responsive grid of cards. Each card carries a step
 * number, title, and body from data/concept.ts. Cards stagger in via Reveal; with
 * motion stripped all four read immediately and the grid reserves layout space (no CLS).
 * Server Component: Reveal is imported as a client child.
 */
export function HowItWorks() {
  const headingStyle: CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontSize: "var(--ufa-type-h2)",
    lineHeight: 1.05,
    color: "var(--ufa-fg)",
  };

  const gridStyle: CSSProperties = {
    margin: "2.5rem 0 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  };

  const cardStyle: CSSProperties = {
    height: "100%",
    background: "var(--ufa-bg-elevated)",
    border: "1px solid var(--ufa-rule)",
    borderRadius: "var(--ufa-radius)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  const numberStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "2.5rem",
    lineHeight: 1,
    color: "var(--ufa-accent)",
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-display)",
    fontSize: "1.25rem",
    color: "var(--ufa-fg)",
  };

  const bodyStyle: CSSProperties = {
    margin: 0,
    fontSize: "var(--ufa-type-body)",
    lineHeight: 1.55,
    color: "var(--ufa-muted)",
  };

  return (
    <SectionShell id={site.anchors.howItWorks}>
      <Reveal>
        <h2 style={headingStyle}>How a fight works</h2>
      </Reveal>
      <div style={gridStyle}>
        {howItWorks.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.08}>
            <article style={cardStyle}>
              <span style={numberStyle} aria-hidden="true">
                {step.step}
              </span>
              <h3 style={titleStyle}>{step.title}</h3>
              <p style={bodyStyle}>{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
