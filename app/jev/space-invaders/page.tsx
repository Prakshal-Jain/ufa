import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Invader, Shields } from "@/components/Invader";
import { InvaderSky } from "@/components/InvaderSky";
import { InvaderGame } from "@/components/InvaderGame";
import { JEV } from "@/data/jev";
import { ARENA, RESOURCES, RUBRIC, TIMELINE, TRACKS } from "@/data/jev-space-invaders";
import { EntryForm } from "./EntryForm";
import { CopyUrl } from "./CopyUrl";

const title = "Space Invaders Arena · JEV Bake-Off · UFA";
const description =
  "Build an agent that plays Space Invaders with JEV making the moves. Enter by form or through your agent. Top 10 demo live in SF on Wed Sep 30. Winner takes $1,000.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: ARENA.pageUrl },
  openGraph: {
    title,
    description,
    url: ARENA.pageUrl,
    type: "website",
    siteName: "UFA · Ultimate Fighting Agents",
    images: [{ url: JEV.card, width: 1200, height: 630, alt: "The JEV Bake-Off. $1,000. Winner takes all." }],
  },
  twitter: { card: "summary_large_image", title, description, images: [JEV.card] },
};

const RESULTS_EXAMPLE = `{
  "schema_version": 2,
  "models": [
    { "role": "decider", "served_model": "jev-1.13.0" },
    { "role": "baseline", "served_model": "claude-haiku-4-5" }
  ],
  "config": { "env_id": "ALE/SpaceInvaders-v5", "frameskip": 4,
              "repeat_action_probability": 0.25 },
  "runs": [
    { "seed": 1, "score": 1240, "steps": 5310, "lives_lost": 3,
      "model_calls": 5310, "input_tokens": 1593000,
      "latency_ms_p50": 142, "latency_ms_p95": 260,
      "errors_by_status": { "429": 2 }, "mean_confidence": 0.83,
      "cost_usd": 0.067, "notes": "Held fire below 0.6 confidence" }
  ],
  "baseline": { "model": "claude-haiku-4-5", "runs": [ ... ] }
}`;

export default function SpaceInvaders() {
  return (
    <>
      <SiteNav brandHref="/jev/" cta={{ label: "Enter", href: "#enter" }} />
      <InvaderGame />
      <main className="arena arena-split">
        <header className="arena-hero">
          <InvaderSky />
          <div className="wrap rise">
            <span className="kicker red">
              <span className="dot" />
              JEV Bake-Off · Step 03
            </span>
            <h1 className="arena-title">
              Space <span>Invaders</span>
            </h1>
            <p className="arena-lead">
              Build an agent that plays Space Invaders with JEV making the moves. An LLM that takes two seconds to think is
              already dead. A decision model answers in about the time one frame takes. Prove it.
            </p>
            <dl className="arena-facts">
              <div><dt>Prize</dt><dd>$1,000, winner takes all</dd></div>
              <div><dt>Entries lock</dt><dd>{ARENA.deadline}</dd></div>
              <div><dt>Live show</dt><dd>{ARENA.show}</dd></div>
              <div><dt>Where</dt><dd>{ARENA.venue}</dd></div>
            </dl>
          </div>
        </header>

        <article className="arena-doc">
            <section id="agents" className="arena-agents">
              <Invader kind="ship" size={28} className="arena-agents-ship" />
              <div className="arena-agents-body">
                <span className="arena-agents-kicker">For agents</span>
                <h2>Let your agent enter for you.</h2>
                <p>
                  Everything on this page, plus the exact entry format, is in one file. Point your agent at it and it can
                  build, enter, and update your submission on its own.
                </p>
                <div className="arena-agents-actions">
                  <CopyUrl url={ARENA.llmsUrl} />
                  <code>{ARENA.llmsUrl.replace("https://", "")}</code>
                </div>
              </div>
            </section>
            <section id="mission">
              <h2><Invader kind="squid" size={18} /> The mission</h2>
              <p>
                JEV is TypeSafe&apos;s decision model. It doesn&apos;t write text. You send it the game state and a typed
                question (&quot;which move?&quot;), and it returns an answer with a confidence score, in 70 to 500ms. Space
                Invaders is the cleanest test there is: a real-time loop where a slow decision loses a life.
              </p>
              <p>Pick one of three ways to compete. All three race for the same $1,000.</p>
              <div className="arena-tracks">
                {TRACKS.map((t) => (
                  <div className="arena-track" key={t.id}>
                    <span className="arena-track-name">{t.name}</span>
                    <b>{t.line}</b>
                    <p>{t.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="how">
              <h2><Invader kind="crab" size={20} /> How it works</h2>
              <ol className="arena-steps">
                <li>
                  <b>Enter.</b> Fill in the form, or let your agent do it through MCP. You only need the top half today.
                </li>
                <li>
                  <b>Build.</b> Come back and add your repo, with <code>results.json</code> in it. Submit again with the same email to update.
                </li>
                <li>
                  <b>Post your demo video.</b> 1 to 2 minutes on X, LinkedIn, or YouTube, tagging UFA. Phone camera, no
                  script, just yap. Cover your creative genius idea (how and why you built it), how you use Mitosis Labs or
                  Tenki creatively (if you do), and the demo itself. Quote-posts of it are votes for the Fan Favorite slot.
                </li>
                <li>
                  <b>Make the top 10.</b> Judges pick nine. The crowd picks one.
                </li>
                <li>
                  <b>Fight live.</b> Five minutes on the big screen with the clock running. Winner is paid on stage.
                </li>
              </ol>
              <div className="arena-table">
                <table>
                  <tbody>
                    {TIMELINE.map((t) => (
                      <tr key={t.when}>
                        <th scope="row">{t.when}</th>
                        <td>{t.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Shields />

            <section id="build">
              <h2><Invader kind="octopus" size={22} /> Building it</h2>
              <p>
                <b>The game.</b> Use <a href="https://ale.farama.org/environments/space_invaders/">ALE/SpaceInvaders-v5</a>{" "}
                for single player, or{" "}
                <a href="https://pettingzoo.farama.org/environments/atari/space_invaders/">PettingZoo&apos;s two-player version</a>{" "}
                to go head to head. A browser version you control works too, as long as we can rerun it.
              </p>
              <p>
                <b>The model.</b> JEV only reads text, so turn each frame into JSON state: ship x, the alien grid, bullets,
                shields, lives. Then ask one <code>choice</code> question over the six moves{" "}
                <code>NOOP · FIRE · LEFT · RIGHT · LEFTFIRE · RIGHTFIRE</code>. Need a key? Tick the box in the form.
              </p>
              <p>
                <b>The baseline.</b> Run the same loop with an LLM through the{" "}
                <a href="https://github.com/typesafe-ai/system-one-adapter-python">System One adapter</a> so the comparison
                is fair. Judges care about the gap.
              </p>
              <p>
                <b>The results file.</b> Commit a <code>results.json</code> to the root of your repo and append a run
                every time you play. Measure in code, not by estimate: score, steps, lives, model calls, tokens and latency
                from each API response, errors, and JEV&apos;s confidence. Record the exact model id the API returns. We read
                the file throughout the event, so every version you push counts as build history. The full field list is in{" "}
                <a href="/jev/space-invaders/llms.txt">llms.txt</a>. Run data is anonymized and shared with UFA partners.
              </p>
              <pre className="arena-code">{RESULTS_EXAMPLE}</pre>
            </section>

            <section id="rubric">
              <h2><Invader kind="squid" size={18} /> The rubric</h2>
              <p>
                Judges score each criterion from 1 to 5, weighted to 100 points. The top 10 are scored again live on Wednesday:
                the judges count for 70% and the room&apos;s vote for 30%. Ties go to Performance, then Speed and cost.
              </p>
              <div className="arena-table">
                <table className="rubric">
                  <thead>
                    <tr>
                      <th scope="col">Criterion</th>
                      <th scope="col">5 looks like</th>
                      <th scope="col">3 looks like</th>
                      <th scope="col">1 looks like</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RUBRIC.map((r) => (
                      <tr key={r.name}>
                        <th scope="row">
                          {r.name}
                          <span className="pts">{r.pts} pts</span>
                        </th>
                        <td>{r.top}</td>
                        <td>{r.mid}</td>
                        <td>{r.low}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="bonus" className="arena-bonus">
              <h2><Invader kind="saucer" size={30} /> Bonus credits</h2>
              <p>
                Use Mitosis Labs or Tenki creatively and you earn platform credits on top of anything you win, finalist or
                not. Score 3 or more on Sponsor stack to qualify. Use both and you earn both. The best use of each earns more.
              </p>
              <ul>
                <li><b>Mitosis Labs:</b> a swarm of agents sharing Cortex memory, with JEV deciding who acts next. Or Cortex remembering which strategy beat which wave.</li>
                <li><b>Tenki:</b> hundreds of parallel games in Tenki sandboxes to tune your policy. Or CI runners that replay every commit and post the score.</li>
              </ul>
              <p className="arena-small">A logo in the README doesn&apos;t count. Take the sponsor out and the project should break.</p>
            </section>

            <section id="rules">
              <h2><Invader kind="crab" size={20} /> Rules</h2>
              <ul>
                <li>Solo or teams of up to 4.</li>
                <li>JEV makes the core decisions. Other models can help, but they can&apos;t fly the ship.</li>
                <li>Public repo that runs from the README. Results must be reproducible. No hard-coded scores.</li>
                <li>Entries lock at {ARENA.deadline}. The latest submission from your email counts.</li>
                <li>Finalists present in person at {ARENA.venue}. Five minutes, hard stop.</li>
              </ul>
            </section>

            <Shields />

            <section id="resources">
              <h2><Invader kind="octopus" size={22} /> Docs and links</h2>
              <div className="arena-links">
                {RESOURCES.map((g) => (
                  <div key={g.group}>
                    <h3>{g.group}</h3>
                    <ul>
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                          <span>{l.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <p className="arena-konami" aria-hidden="true">↑ ↑ ↓ ↓ ← → ← → B A</p>
        </article>

        <aside className="arena-side" id="enter">
          <EntryForm />
        </aside>
      </main>
      <section className="arena-sponsors" id="sponsors" aria-labelledby="sponsors-title">
        <span className="arena-sponsors-kicker" id="sponsors-title">Presented with</span>
        <div className="arena-sponsors-row">
          <a className="arena-sponsor" href="https://mitosislabs.ai" target="_blank" rel="noopener noreferrer" aria-label="Mitosis Labs">
            <img src="/sponsors/mitosis-mark.svg" alt="" width={34} height={34} />
            <span className="arena-sponsor-mitosis">mitosis labs</span>
          </a>
          <span className="arena-sponsors-x" aria-hidden="true">
            <Invader kind="squid" size={14} />
          </span>
          <a className="arena-sponsor" href="https://tenki.cloud" target="_blank" rel="noopener noreferrer" aria-label="Tenki">
            <img src="/sponsors/tenki.svg" alt="" width={150} height={40} />
          </a>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
