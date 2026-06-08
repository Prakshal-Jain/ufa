// Minimal top nav - brand + persistent sponsor CTA (keeps the ask above the fold).
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { CTAButton } from "@/components/ui/CTAButton";

/**
 * Sticky top nav. Server Component (no client JS). Carries the brand wordmark on
 * the left and a persistent sponsor CTA on the right so the primary ask stays
 * reachable no matter how far the visitor has scrolled. Real <a> anchors only.
 */
export function Nav() {
  const navStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBlock: "0.85rem",
    paddingInline: "clamp(1.25rem, 5vw, 3rem)",
    background: "color-mix(in srgb, var(--ufa-bg) 72%, transparent)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid var(--ufa-rule)",
  };

  const brandStyle: CSSProperties = {
    fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
    fontWeight: 800,
    fontSize: "1.35rem",
    letterSpacing: "0.08em",
    color: "var(--ufa-fg)",
    textDecoration: "none",
  };

  return (
    <nav style={navStyle} aria-label="Primary">
      <a href="#top" style={brandStyle}>
        {site.brand}
      </a>
      <CTAButton href={`#${site.anchors.sponsor}`}>Sponsor</CTAButton>
    </nav>
  );
}
