// Repeated primary CTA — the conversion section. Social proof (endorsements + metrics)
// placed ADJACENT to the form (15-30% lift).
import type { CSSProperties } from "react";
import { SponsorForm } from "@/components/forms/SponsorForm";
import { endorsements } from "@/data/endorsements";
import { metrics } from "@/data/traction";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";

const layoutStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "clamp(2rem, 5vw, 4rem)",
  alignItems: "flex-start",
};

const colStyle: CSSProperties = {
  flex: "1 1 340px",
  minWidth: "min(100%, 340px)",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display, inherit)",
  fontSize: "var(--ufa-type-h2)",
  lineHeight: 1.05,
  margin: 0,
  letterSpacing: "-0.02em",
};

const pitchStyle: CSSProperties = {
  fontSize: "var(--ufa-type-body)",
  color: "var(--ufa-muted)",
  marginTop: "1rem",
  lineHeight: 1.55,
};

const metricsRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
  gap: "1rem",
  marginTop: "2rem",
};

const metricValueStyle: CSSProperties = {
  fontFamily: "var(--font-display, inherit)",
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  lineHeight: 1,
  color: "var(--ufa-accent)",
  display: "block",
};

const metricLabelStyle: CSSProperties = {
  color: "var(--ufa-muted)",
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const quoteCardStyle: CSSProperties = {
  background: "var(--ufa-bg-elevated)",
  border: "1px solid var(--ufa-rule)",
  borderRadius: "var(--ufa-radius)",
  padding: "1.1rem 1.25rem",
  marginTop: "1rem",
};

const quoteTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "var(--ufa-fg)",
};

const quoteByStyle: CSSProperties = {
  marginTop: "0.6rem",
  fontSize: "0.8rem",
  color: "var(--ufa-muted)",
};

export function SponsorCTA() {
  return (
    <SectionShell id={site.anchors.sponsor}>
      <div style={layoutStyle}>
        {/* Left: the ask + social proof ADJACENT to the form (conversion lift). */}
        <div style={colStyle}>
          <Reveal>
            <h2 style={headingStyle}>
              <GradientText>Sponsor</GradientText> the Ultimate Agent Fight
            </h2>
            <p style={pitchStyle}>
              Founding sponsors get the category to themselves. Tell us a little
              about you and we&apos;ll get back fast.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={metricsRowStyle}>
              {metrics.map((metric, i) => (
                <div key={`${metric.label}-${i}`}>
                  <span style={metricValueStyle}>{metric.value}</span>
                  <span style={metricLabelStyle}>{metric.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              {endorsements.map((endorsement, i) => (
                <figure key={`${endorsement.name}-${i}`} style={quoteCardStyle}>
                  <blockquote style={quoteTextStyle}>
                    “{endorsement.quote}”
                  </blockquote>
                  <figcaption style={quoteByStyle}>
                    {endorsement.name} — {endorsement.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: the working lead-capture form (client component). */}
        <div style={colStyle}>
          <Reveal delay={0.12}>
            <SponsorForm />
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
