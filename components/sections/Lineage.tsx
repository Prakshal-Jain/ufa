// Lineage section - UFC -> UFB -> UFA positioning. Data from data/concept.ts (placeholder).
import type { CSSProperties } from "react";
import { lineage, lineageStatement } from "@/data/concept";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollParallax } from "@/components/motion/ScrollParallax";

/**
 * The UFC -> UFB -> UFA brand beat. Renders the 3 lineage nodes as a wrapping chain
 * with arrow glyphs, emphasizing the final UFA node via GradientText, then the
 * "UFC of AI" statement. ScrollParallax adds transform-only drift; with motion off
 * the chain reads as a plain sentence. Server Component: motion primitives are client children.
 */
export function Lineage() {
  const chainStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "1.5rem 1rem",
  };

  const nodeBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: "22ch",
  };

  const nodeNameStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--ufa-type-display)",
    lineHeight: 1,
    color: "var(--ufa-fg)",
  };

  const blurbStyle: CSSProperties = {
    margin: 0,
    fontSize: "var(--ufa-type-body)",
    lineHeight: 1.5,
    color: "var(--ufa-muted)",
  };

  const arrowStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--ufa-type-display)",
    lineHeight: 1,
    color: "var(--ufa-muted)",
    alignSelf: "flex-start",
  };

  const statementStyle: CSSProperties = {
    margin: "3rem 0 0",
    fontFamily: "var(--font-display)",
    fontSize: "var(--ufa-type-h2)",
    lineHeight: 1.1,
    color: "var(--ufa-fg)",
  };

  const lastIndex = lineage.length - 1;

  return (
    <SectionShell>
      <ScrollParallax range={40}>
        <div style={chainStyle}>
          {lineage.map((entry, i) => (
            <div
              key={entry.node}
              style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
            >
              <div style={nodeBlockStyle}>
                <span style={nodeNameStyle}>
                  {i === lastIndex ? (
                    <GradientText>{entry.node}</GradientText>
                  ) : (
                    entry.node
                  )}
                </span>
                <p style={blurbStyle}>{entry.blurb}</p>
              </div>
              {i < lastIndex && (
                <span style={arrowStyle} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollParallax>
      <Reveal>
        <p style={statementStyle}>{lineageStatement}</p>
      </Reveal>
    </SectionShell>
  );
}
