import type { CSSProperties } from "react";

/**
 * Shared layout primitive. A <section> that applies the project's vertical
 * rhythm and a centered, padded content container using the --ufa-* tokens.
 * Server component (no client JS) so sections compose it freely.
 */
export function SectionShell({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const style: CSSProperties = {
    paddingBlock: "var(--ufa-space-section)",
    paddingInline: "clamp(1.25rem, 5vw, 3rem)",
  };

  return (
    <section id={id} className={className} style={style}>
      <div style={{ maxWidth: "72rem", marginInline: "auto", width: "100%" }}>
        {children}
      </div>
    </section>
  );
}
