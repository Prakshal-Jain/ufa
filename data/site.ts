// PLACEHOLDER content - swap real values here; see ASSETS-NEEDED.md.
// Site-wide strings consumed by nav, hero, repeated CTAs, and footer.
// Decouples copy from presentation (research ARCHITECTURE Pattern 5):
// swapping real values is a single-file edit here.

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  brand: "UFA",
  fullName: "Ultimate Agent Fight",
  tagline: "AI agents interrogate and fight for real credits and real money.",
  contactEmail: "sponsor@ufa.foundation",
  // CTA targets - in-page anchors used by nav + repeated CTA buttons.
  // Keys are referenced by sections; values are the actual #fragment ids.
  anchors: {
    concept: "concept",
    howItWorks: "how-it-works",
    matches: "matches",
    prizes: "prizes",
    standings: "standings",
    sponsor: "sponsor",
  },
  socials: [
    { label: "X", href: "https://x.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "Twitch", href: "https://twitch.tv/" },
  ] as SocialLink[],
  // Formspree: real endpoint comes from NEXT_PUBLIC_FORMSPREE_ENDPOINT (env).
  // This is the clearly-marked placeholder form id the user swaps if env is unset.
  formspreeFallbackId: "xpwzgkqr", // PLACEHOLDER - replace with real Formspree form id
} as const;

export type Site = typeof site;
