// styles/tokens.ts — typed TS mirror of tokens.css for values JS/motion code needs.
// Keep in sync with styles/tokens.css (one conceptual source, two representations).
export const tokens = {
  bg: "#05060a",
  fg: "#f4f6ff",
  accent: "#7aa2ff",
  accent2: "#a77aff",
  accent3: "#ff7ad9",
  easeOut: [0.16, 1, 0.3, 1] as const,
  revealDuration: 0.6,
  parallaxRange: 80, // px, used by ScrollParallax in Plan 03
} as const;

export type Tokens = typeof tokens;
