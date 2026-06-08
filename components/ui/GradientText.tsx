import type { CSSProperties } from "react";

/**
 * Iridescent gradient text. The gradient is a decorative clipped fill over solid
 * text. Accessibility: `color` defaults to --ufa-fg so that if background-clip:text
 * is unsupported the text stays legible (AA) instead of disappearing.
 */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const style: CSSProperties = {
    color: "var(--ufa-fg)",
    background: "var(--ufa-accent-iridescent)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}
