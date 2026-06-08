// Concept section - "what UFA is" explainer. Copy from data/concept.ts (placeholder).
import type { CSSProperties } from "react";
import { conceptCopy } from "@/data/concept";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Plain-language "what is UFA" block. Renders typed copy from data/concept.ts so
 * the message (AI agents interrogate + fight for credits/money) is data-driven and
 * fully legible with motion stripped (Reveal is the reduced-motion base case).
 * Server Component: Reveal is imported as a client child.
 */
export function Concept() {
  const kickerStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.875rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ufa-muted)",
  };

  const headingStyle: CSSProperties = {
    margin: "0.75rem 0 0",
    fontFamily: "var(--font-display)",
    fontSize: "var(--ufa-type-h2)",
    lineHeight: 1.05,
    color: "var(--ufa-fg)",
  };

  const ledeStyle: CSSProperties = {
    margin: "1.5rem 0 0",
    maxWidth: "60ch",
    fontSize: "var(--ufa-type-body)",
    lineHeight: 1.6,
    color: "var(--ufa-fg)",
  };

  const listStyle: CSSProperties = {
    margin: "2rem 0 0",
    padding: 0,
    listStyle: "none",
    display: "grid",
    gap: "0.85rem",
    maxWidth: "60ch",
  };

  const itemStyle: CSSProperties = {
    paddingInlineStart: "1.25rem",
    position: "relative",
    color: "var(--ufa-muted)",
    fontSize: "var(--ufa-type-body)",
    lineHeight: 1.5,
  };

  const markerStyle: CSSProperties = {
    position: "absolute",
    insetInlineStart: 0,
    color: "var(--ufa-accent)",
  };

  return (
    <SectionShell id={site.anchors.concept}>
      <Reveal>
        <p style={kickerStyle}>What is UFA?</p>
        <h2 style={headingStyle}>
          <GradientText>{conceptCopy.headline}</GradientText>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={ledeStyle}>{conceptCopy.lede}</p>
        <ul style={listStyle}>
          {conceptCopy.points.map((point, i) => (
            <li key={i} style={itemStyle}>
              <span style={markerStyle} aria-hidden="true">
                —
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
