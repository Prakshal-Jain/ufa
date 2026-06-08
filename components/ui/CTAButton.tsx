import type { CSSProperties } from "react";

/**
 * Primary CTA primitive. Renders a REAL interactive element so it is always
 * keyboard reachable: an <a> when `href` is given, otherwise a <button>. Carries
 * a visible :focus-visible ring (scoped style below, no global CSS dependency).
 * The accessible name comes from `children`.
 */
export function CTAButton({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--ufa-accent)",
    color: "var(--ufa-bg)",
    borderRadius: "var(--ufa-radius)",
    padding: "0.9rem 1.6rem",
    border: "none",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  };

  const cls = ["ufa-cta", className].filter(Boolean).join(" ");

  // Scoped focus-visible ring — keeps the CTA accessible without touching
  // global CSS (app/globals.css is owned elsewhere).
  const focusRule = `
.ufa-cta:focus-visible {
  outline: 3px solid var(--ufa-accent-3);
  outline-offset: 3px;
}`;

  return (
    <>
      <style>{focusRule}</style>
      {href ? (
        <a href={href} className={cls} style={style} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type="button" className={cls} style={style} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}
