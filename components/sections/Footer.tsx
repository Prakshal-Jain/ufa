// Footer — contact, socials, copyright. Data from data/site.ts.
import type { CSSProperties } from "react";
import { site } from "@/data/site";

const footerStyle: CSSProperties = {
  borderTop: "1px solid var(--ufa-rule)",
  paddingBlock: "clamp(2.5rem, 6vw, 4rem)",
  paddingInline: "clamp(1.25rem, 5vw, 3rem)",
  color: "var(--ufa-muted)",
};

const innerStyle: CSSProperties = {
  maxWidth: "72rem",
  marginInline: "auto",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  justifyContent: "space-between",
  alignItems: "center",
};

const brandStyle: CSSProperties = {
  color: "var(--ufa-fg)",
  fontWeight: 600,
};

const linksRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.25rem",
  alignItems: "center",
};

const linkStyle: CSSProperties = {
  color: "var(--ufa-muted)",
  textDecoration: "none",
};

const copyrightStyle: CSSProperties = {
  marginTop: "1.5rem",
  fontSize: "0.8rem",
  color: "var(--ufa-muted)",
  maxWidth: "72rem",
  marginInline: "auto",
};

// Scoped link hover/focus — no dependency on global CSS.
const scopedStyle = `
.ufa-footer a:hover { color: var(--ufa-fg); }
.ufa-footer a:focus-visible {
  outline: 2px solid var(--ufa-accent-3);
  outline-offset: 3px;
}
`;

export function Footer() {
  return (
    <footer className="ufa-footer" style={footerStyle}>
      <style>{scopedStyle}</style>
      <div style={innerStyle}>
        <div style={brandStyle}>{site.fullName}</div>
        <nav style={linksRowStyle} aria-label="Footer">
          <a href={`mailto:${site.contactEmail}`} style={linkStyle}>
            {site.contactEmail}
          </a>
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
      <div style={copyrightStyle}>
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </div>
    </footer>
  );
}
