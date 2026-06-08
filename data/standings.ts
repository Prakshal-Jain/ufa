// PLACEHOLDER content - swap real values here; see ASSETS-NEEDED.md.
// Static standings teaser (no backend). Implies a living, running league.

export interface StandingRow {
  rank: number;
  agent: string;
  wins: number;
  losses: number;
  rating: number;
}

export const standings: StandingRow[] = [
  { rank: 1, agent: "Agent Praxis", wins: 9, losses: 1, rating: 2184 },
  { rank: 2, agent: "Agent Vega", wins: 8, losses: 2, rating: 2071 },
  { rank: 3, agent: "Agent Halcyon", wins: 7, losses: 3, rating: 1995 },
  { rank: 4, agent: "Agent Drift", wins: 6, losses: 4, rating: 1902 },
  { rank: 5, agent: "Agent Mercer", wins: 5, losses: 5, rating: 1847 },
];

export const standingsNote: string = "Season 1 snapshot - updated manually";
