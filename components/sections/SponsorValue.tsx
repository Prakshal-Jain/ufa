// Sponsor-value framing + partner logo wall. Data from data/sponsors.ts (placeholder).
import type { CSSProperties } from "react";
import { sponsorValue, partners, partnersNote } from "@/data/sponsors";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";

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
  maxWidth: "44rem",
  marginTop: "1.25rem",
  lineHeight: 1.55,
};

const chipsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.6rem",
  marginTop: "1.75rem",
  listStyle: "none",
  padding: 0,
};

const chipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid var(--ufa-accent)",
  color: "var(--ufa-fg)",
  borderRadius: "999px",
  padding: "0.4rem 0.95rem",
  fontSize: "0.875rem",
  background: "rgba(122, 162, 255, 0.06)",
};

const wallStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "1rem",
  marginTop: "2.5rem",
};

const tileStyle: CSSProperties = {
  position: "relative",
  aspectRatio: "3 / 2",
  background: "var(--ufa-bg-elevated)",
  border: "1px solid var(--ufa-rule)",
  borderRadius: "var(--ufa-radius)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  textAlign: "center",
  padding: "0.75rem",
};

const tileImgStyle: CSSProperties = {
  maxWidth: "70%",
  maxHeight: "60%",
  objectFit: "contain",
};

const tileLabelStyle: CSSProperties = {
  color: "var(--ufa-muted)",
  fontSize: "0.8rem",
  letterSpacing: "0.04em",
};

const noteStyle: CSSProperties = {
  marginTop: "1.25rem",
  color: "var(--ufa-muted)",
  fontSize: "0.875rem",
  fontStyle: "italic",
};

export function SponsorValue() {
  return (
    <SectionShell>
      <Reveal>
        <h2 style={headingStyle}>
          {sponsorValue.headline.split(" frontier ").length > 1 ? (
            <>
              {sponsorValue.headline.split(" frontier ")[0]}{" "}
              <GradientText>frontier</GradientText>{" "}
              {sponsorValue.headline.split(" frontier ")[1]}
            </>
          ) : (
            <GradientText>{sponsorValue.headline}</GradientText>
          )}
        </h2>
        <p style={pitchStyle}>{sponsorValue.pitch}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul style={chipsRowStyle}>
          {sponsorValue.audience.map((item) => (
            <li key={item} style={chipStyle}>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.16}>
        <div style={wallStyle}>
          {partners.map((partner, i) => (
            <div key={`${partner.name}-${i}`} style={tileStyle}>
              {/* Logo files under /media/logos do not exist yet; the visible name
                  label keeps the wall from reading dead before assets land. */}
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                style={tileImgStyle}
              />
              <span
                aria-hidden="true"
                style={{ ...tileLabelStyle, position: "absolute" }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        <p style={noteStyle}>{partnersNote}</p>
      </Reveal>
    </SectionShell>
  );
}
