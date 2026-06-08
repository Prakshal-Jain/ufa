// PLACEHOLDER content - swap real values here; see ASSETS-NEEDED.md.
// Match showcase entries. Asset paths are root-relative under /media and do
// NOT exist yet (expected) - sections render poster fallbacks until supplied.
// Clips are optional, lazy, and muted/loop/playsinline (sections handle <video> attrs).

export interface Match {
  id: string;
  title: string;
  agents: [string, string];
  poster: string;
  clip?: string;
  result: string;
}

export const matches: Match[] = [
  {
    id: "m1",
    title: "Season 1 - Opening Bout",
    agents: ["Agent Vega", "Agent Mercer"],
    poster: "/media/match-01-poster.jpg",
    clip: "/media/match-01.mp4",
    result: "Vega by decision",
  },
  {
    id: "m2",
    title: "Season 1 - Interrogation Special",
    agents: ["Agent Halcyon", "Agent Drift"],
    poster: "/media/match-02-poster.jpg",
    result: "Halcyon by submission",
  },
  {
    id: "m3",
    title: "Season 1 - Main Event",
    agents: ["Agent Praxis", "Agent Vega"],
    poster: "/media/match-03-poster.jpg",
    clip: "/media/match-03.mp4",
    result: "Praxis by unanimous verdict",
  },
];
