// Prize pool / credits at stake. Figures from data/prizes.ts (placeholder).
import type { CSSProperties } from "react";
import { prizePool, totalCredits } from "@/data/prizes";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";

const eyebrowStyle: CSSProperties = {
  fontSize: "0.8rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--ufa-muted)",
  margin: 0,
  marginBottom: "0.75rem",
};

const heroWrapStyle: CSSProperties = {
  display: "inline-block",
  padding: "0.5rem 0",
  boxShadow: "var(--ufa-glow)",
  borderRadius: "var(--ufa-radius)",
  marginBottom: "clamp(2.5rem, 6vw, 4rem)",
};

const heroNumberStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "var(--ufa-type-display)",
  lineHeight: 1,
  fontWeight: 700,
  display: "block",
};

const tierGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "1.25rem",
};

const tierCardStyle: CSSProperties = {
  background: "var(--ufa-bg-elevated)",
  border: "1px solid var(--ufa-rule)",
  borderRadius: "var(--ufa-radius)",
  padding: "1.5rem",
};

const tierAmountStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  lineHeight: 1.05,
  color: "var(--ufa-accent)",
  margin: 0,
};

const tierLabelStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "1rem",
  color: "var(--ufa-fg)",
  marginTop: "0.5rem",
  marginBottom: 0,
};

const tierNoteStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "var(--ufa-muted)",
  marginTop: "0.35rem",
  marginBottom: 0,
};

/**
 * The stakes punch. Leads with the headline totalCredits figure (large, gradient,
 * subtle glow), then a responsive grid of concrete prizePool tiers. Concrete
 * numbers are always visible; legible with motion off (Reveal degrades to plain
 * children under reduced motion). Server Component.
 */
export function PrizePool() {
  return (
    <SectionShell id={site.anchors.prizes}>
      <p style={eyebrowStyle}>Prize pool</p>

      <Reveal>
        <span style={heroWrapStyle}>
          <GradientText>
            <span style={heroNumberStyle}>{totalCredits}</span>
          </GradientText>
        </span>
      </Reveal>

      <div style={tierGridStyle}>
        {prizePool.map((tier, i) => (
          <Reveal key={tier.label} delay={i * 0.08}>
            <div style={tierCardStyle}>
              <p style={tierAmountStyle}>{tier.amount}</p>
              <p style={tierLabelStyle}>{tier.label}</p>
              {tier.note ? <p style={tierNoteStyle}>{tier.note}</p> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
