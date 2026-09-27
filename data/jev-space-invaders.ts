// The JEV Bake-Off Space Invaders arena: entry page content, form fields, and the
// submission contract shared by the human form, the MCP tool, and llms.txt.
// Entries land in the Mitosis backend (ufa_jev_entries), managed at
// mitosislabs.ai/admin/ufa/jev-space-invaders.
const API_BASE = process.env.NEXT_PUBLIC_MITOSIS_API_URL || "https://mitosislabs.ai";

export const ARENA = {
  pageUrl: "https://ufa.foundation/jev/space-invaders/",
  llmsUrl: "https://ufa.foundation/jev/space-invaders/llms.txt",
  submitEndpoint: `${API_BASE}/api/ufa/jev/entries`,
  // What builders paste into their agents: always the production addresses.
  mcpUrl: "https://mitosislabs.ai/api/ufa/mcp",
  mcpTool: "submit_jev_entry",
  httpEndpoint: "https://mitosislabs.ai/api/ufa/jev/entries",
  deadline: "Mon Sep 28, 11:59pm PT",
  finalists: "Tue Sep 29, 8pm PT",
  show: "Wed Sep 30, 7 to 9pm PT",
  venue: "590 Howard St, San Francisco",
};

// The message builders paste into their agent. Shown on the page and in the form's
// "My agent will" tab, so the two never drift.
export const AGENT_PROMPT = `Enter me in the UFA JEV Bake-Off Space Invaders arena and help me win it.

1. Read ${ARENA.llmsUrl} end to end. It has the rules, the rubric, and the exact entry format.
2. Ask me for anything you need and don't know: my name, email, X or LinkedIn profile, team name, teammates, track, a one-line pitch (you can draft it for me to approve), whether I use Mitosis Labs or Tenki and how, whether I need a JEV API key, and whether I can be in San Francisco on Wed Sep 30. Never make these up.
3. Connect the UFA MCP server (claude mcp add --transport http ufa ${ARENA.mcpUrl}) and submit my entry with submit_jev_entry. Most agents only load a new MCP server after a restart, so if the tool isn't available yet, call the same server over HTTP JSON-RPC or POST the same JSON to ${ARENA.httpEndpoint}. Only tell me I'm entered once the server returns "ok": true.
4. Help me build: an agent that plays Space Invaders with JEV making the moves, plus an LLM baseline (on my own OpenAI, Anthropic, or Gemini key) to compare against. Play at least 5 games each, with fixed seeds.
5. After every game, append the run to results.json at the root of my public GitHub repo, then commit and push it right away.
6. When the repo or my demo video link changes, resubmit my entry with the same email to update it.`;

export const TRACKS = [
  {
    id: "pilot",
    name: "Pilot",
    line: "JEV flies the ship.",
    body: "Build an agent that plays Space Invaders with JEV making every move. Highest harness score and the head-to-head result decide it.",
  },
  {
    id: "squad",
    name: "Squad",
    line: "JEV runs the fleet.",
    body: "JEV as the brain of a swarm: many agents, many games, one decision layer choosing who acts, what to try, and when to stop.",
  },
  {
    id: "eval",
    name: "Eval",
    line: "JEV on trial.",
    body: "A reproducible benchmark of JEV against LLMs on Space Invaders decisions. Speed, accuracy, calibration, and cost.",
  },
] as const;

export const TIMELINE = [
  { when: "Now", what: "Enter with the form or through your agent. You only need the basics today." },
  { when: "Sat to Mon", what: "Build. Update your entry as often as you like with the same email." },
  { when: ARENA.deadline, what: "Entries lock. Repo (with results.json) and demo video must be in." },
  { when: ARENA.finalists, what: "Top 10 announced. Nine picked by the judges, one by the crowd." },
  { when: ARENA.show, what: `Live show at ${ARENA.venue}. Five minutes each. Winner takes $1,000.` },
];

export const RUBRIC = [
  {
    name: "Performance",
    pts: 30,
    top: "Clearly beats the LLM baseline, with numbers anyone can reproduce from your repo.",
    mid: "Works end to end and competes with the baseline.",
    low: "Doesn't run from the README, or no numbers.",
  },
  {
    name: "Speed and cost",
    pts: 20,
    top: "Median decision latency and cost per decision, both measured, both a clear win over an LLM.",
    mid: "One of the two measured, or no comparison.",
    low: "Not measured.",
  },
  {
    name: "Showmanship",
    pts: 20,
    top: "Your demo makes the point in the first 15 seconds. A stranger gets it and shares it.",
    mid: "Clear demo, slow to reach the good part.",
    low: "No demo, or a screen recording with no story.",
  },
  {
    name: "Originality",
    pts: 15,
    top: "A use of a decision model nobody has seen. Leans on typed answers, confidence, and speed.",
    mid: "A known idea, done well.",
    low: "An existing demo with no changes.",
  },
  {
    name: "Sponsor stack",
    pts: 15,
    top: "Mitosis Labs or Tenki is creative and load-bearing: take it out and the project breaks.",
    mid: "One sponsor used for a real job, like hosting the game or running the agent.",
    low: "Not used, or only named in the README.",
  },
];

export const RESOURCES = [
  {
    group: "JEV",
    links: [
      { label: "Quickstart", href: "https://docs.typesafe.ai/introduction/quickstart", note: "SDKs for Python and Node" },
      { label: "API reference", href: "https://docs.typesafe.ai/api.md", note: "State in, typed decisions out" },
      { label: "Question types", href: "https://docs.typesafe.ai/primitives.md", note: "noul, choice, score" },
      { label: "Models and limits", href: "https://docs.typesafe.ai/models.md", note: "Text only, 64k context" },
      { label: "Game playground", href: "https://typesafe-ai-playground.vercel.app/doom", note: "Doom, Snake, Breakout" },
      { label: "System One adapter", href: "https://github.com/typesafe-ai/system-one-adapter-python", note: "Run an LLM through the same interface" },
    ],
  },
  {
    group: "Space Invaders",
    links: [
      { label: "ALE SpaceInvaders-v5", href: "https://ale.farama.org/environments/space_invaders/", note: "Single player, six actions" },
      { label: "PettingZoo space_invaders", href: "https://pettingzoo.farama.org/environments/atari/space_invaders/", note: "Two players, one screen" },
      { label: "space-assault", href: "https://github.com/christiancabp/space-assault", note: "Browser game with a JEV pilot" },
      { label: "dwmkerr/spaceinvaders", href: "https://github.com/dwmkerr/spaceinvaders", note: "Plain JS, easy to read state" },
    ],
  },
  {
    group: "Tenki",
    links: [
      { label: "Sign up", href: "https://app.tenki.cloud/auth/registration/", note: "Free monthly credits" },
      { label: "Sandbox quickstart", href: "https://tenki.cloud/docs/sandbox/quickstart.md", note: "Disposable VMs for agents" },
      { label: "Docs", href: "https://tenki.cloud/docs", note: "Sandboxes and CI runners" },
    ],
  },
  {
    group: "Mitosis Labs",
    links: [
      { label: "Developer quickstart", href: "https://mitosislabs.ai/developers/quickstart", note: "MCP, CLI, API" },
      { label: "Offices and agents", href: "https://mitosislabs.ai/developers/sdk/offices-and-agents", note: "Hire agents, run tasks" },
      { label: "Yappy", href: "https://yappy.biz/", note: "JEV built in, for Mac" },
    ],
  },
];
