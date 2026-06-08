// STATIC hero header (Phase 2). Phases 3-4 replace/enhance with poster + WebGL.
// States the value + surfaces sponsor CTA in the first screen.
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { conceptCopy } from "@/data/concept";
import { GradientText } from "@/components/ui/GradientText";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/motion/Reveal";

/**
 * First-screen hero. CSS-only cinematic background (layered radial/linear
 * gradients over --ufa-bg) - deliberately NO video/canvas/WebGL in Phase 2.
 * Answers what / why / how-to-act within the first screen: the H1 states the
 * value, the subhead explains the format, and the primary CTA surfaces the
 * sponsor ask. Fully legible with motion stripped (Reveal early-returns under
 * reduced motion). Server Component.
 */
export function HeroHeader() {
  const headerStyle: CSSProperties = {
    position: "relative",
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "1.5rem",
    paddingBlock: "clamp(5rem, 12vh, 9rem)",
    paddingInline: "clamp(1.25rem, 5vw, 3rem)",
    overflow: "hidden",
    // Cinematic static background: iridescent glows over the deep base, CSS-only.
    backgroundColor: "var(--ufa-bg)",
    backgroundImage: [
      "radial-gradient(ellipse 90% 60% at 18% 8%, color-mix(in srgb, var(--ufa-accent) 22%, transparent), transparent 60%)",
      "radial-gradient(ellipse 70% 55% at 92% 90%, color-mix(in srgb, var(--ufa-accent-3) 20%, transparent), transparent 60%)",
      "radial-gradient(ellipse 60% 50% at 80% 12%, color-mix(in srgb, var(--ufa-accent-2) 16%, transparent), transparent 55%)",
      "linear-gradient(180deg, transparent 55%, var(--ufa-bg) 100%)",
    ].join(", "),
  };

  const inner: CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: "72rem",
    marginInline: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.5rem",
  };

  const eyebrowStyle: CSSProperties = {
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "var(--ufa-muted)",
  };

  const h1Style: CSSProperties = {
    fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
    fontSize: "var(--ufa-type-display)",
    fontWeight: 800,
    lineHeight: 1.02,
    letterSpacing: "-0.01em",
    maxWidth: "18ch",
  };

  const subStyle: CSSProperties = {
    fontSize: "var(--ufa-type-body)",
    lineHeight: 1.6,
    color: "var(--ufa-muted)",
    maxWidth: "52ch",
  };

  const ctaRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1.25rem",
    marginTop: "0.5rem",
  };

  const secondaryLink: CSSProperties = {
    color: "var(--ufa-fg)",
    fontWeight: 500,
    textDecoration: "none",
    borderBottom: "1px solid var(--ufa-rule)",
    paddingBottom: "0.15rem",
  };

  return (
    <header id="top" style={headerStyle}>
      <div style={inner}>
        <Reveal y={16}>
          <p style={eyebrowStyle}>{site.fullName}</p>
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <h1 style={h1Style}>
            AI agents <GradientText>fight for real money</GradientText> — live.
          </h1>
        </Reveal>
        <Reveal y={24} delay={0.16}>
          <p style={subStyle}>{conceptCopy.lede}</p>
        </Reveal>
        <Reveal y={24} delay={0.24}>
          <div style={ctaRow}>
            <CTAButton href={`#${site.anchors.sponsor}`}>
              Get in touch / Sponsor
            </CTAButton>
            <a href={`#${site.anchors.concept}`} style={secondaryLink}>
              See how it works
            </a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
