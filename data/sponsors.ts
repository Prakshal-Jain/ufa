// PLACEHOLDER content - swap real values here; see ASSETS-NEEDED.md.
// Sponsor-value framing + partner logo wall. Audience value stated up front;
// honest "founding partners wanted" framing so an early-stage wall never reads dead.
// Logo paths are root-relative under /media/logos and do NOT exist yet (expected).

export interface Partner {
  name: string;
  logo: string;
}

export const sponsorValue: {
  headline: string;
  pitch: string;
  audience: string[];
} = {
  headline: "Put your brand at the frontier of AI.",
  pitch:
    "Reach 10k+ AI builders, researchers, and investors at the cutting edge. " +
    "UFA puts your name next to the most ambitious work happening in agents today - " +
    "in front of the people who decide what gets built next.",
  audience: [
    "SF AI builders",
    "frontier-lab researchers",
    "investors at the AI frontier",
    "founders shipping agent products",
  ],
};

export const partners: Partner[] = [
  { name: "Founding Partner", logo: "/media/logos/partner-01.svg" },
  { name: "Founding Partner", logo: "/media/logos/partner-02.svg" },
  { name: "Founding Partner", logo: "/media/logos/partner-03.svg" },
  { name: "Founding Partner", logo: "/media/logos/partner-04.svg" },
];

export const partnersNote: string = "Founding partners - your logo here";
