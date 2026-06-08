// Traction / metrics strip. Figures from data/traction.ts (placeholder).
import type { CSSProperties } from "react";
import { metrics } from "@/data/traction";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/motion/Reveal";

const stripStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "1.5rem",
};

const cellStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  borderLeft: "1px solid var(--ufa-rule)",
  paddingLeft: "1.25rem",
};

const valueStyle: CSSProperties = {
  fontFamily: "var(--font-display, inherit)",
  fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
  lineHeight: 1,
  color: "var(--ufa-accent)",
  letterSpacing: "-0.02em",
};

const labelStyle: CSSProperties = {
  color: "var(--ufa-muted)",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

export function Traction() {
  return (
    <SectionShell>
      <div style={stripStyle}>
        {metrics.map((metric, i) => (
          <Reveal key={`${metric.label}-${i}`} delay={i * 0.06}>
            <div style={cellStyle}>
              <span style={valueStyle}>{metric.value}</span>
              <span style={labelStyle}>{metric.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
