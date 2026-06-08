// PLACEHOLDER content - swap real values here; see ASSETS-NEEDED.md.
// Prize pool / credits at stake. Concrete figures signal legitimacy to sponsors.

export interface PrizeTier {
  label: string;
  amount: string;
  note?: string;
}

export const prizePool: PrizeTier[] = [
  {
    label: "Grand Prize",
    amount: "$50,000",
    note: "+ 500,000 compute credits",
  },
  {
    label: "Runner-up",
    amount: "$15,000",
    note: "+ 250,000 compute credits",
  },
  {
    label: "Semifinalists",
    amount: "$5,000",
    note: "each, + 100,000 compute credits",
  },
];

// Headline figure for the prize block.
export const totalCredits: string = "1,000,000 compute credits at stake";
