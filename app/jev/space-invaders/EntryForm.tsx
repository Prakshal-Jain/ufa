"use client";

import { useState } from "react";
import { ARENA, TRACKS } from "@/data/jev-space-invaders";
import { Invader } from "@/components/Invader";

type Mode = "human" | "agent";
type SubmitOk = { ok: true; created: boolean; message: string; missing_for_judging: string[] };
type SubmitResponse = SubmitOk | { ok: false; code: string; errors: string[] };

const AGENT_PROMPT = `Read ${ARENA.llmsUrl} and enter me in the JEV Bake-Off Space Invaders arena. Ask me for anything you can't find, then submit the entry through the UFA MCP tool and show me what you sent.`;
const MCP_ADD = `claude mcp add --transport http ufa ${ARENA.mcpUrl}`;

function CopyRow({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {}
  };
  return (
    <div className="copyrow">
      <pre>{text}</pre>
      <button type="button" className="btn btn-line sm" onClick={copy} aria-label={`Copy ${label}`}>
        {done ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function EntryForm() {
  const [mode, setMode] = useState<Mode>("human");
  const [track, setTrack] = useState<string>("pilot");
  const [mitosis, setMitosis] = useState(false);
  const [tenki, setTenki] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<SubmitOk | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const members = get("members")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map((l) => {
        const [name, email] = l.split(",").map((s) => s.trim());
        return { name: name ?? "", email: email ?? "" };
      });

    if (!fd.get("rules")) return setError("Tick the box to accept the rules.");

    const payload = {
      contact: { name: get("name"), email: get("email"), profile_url: get("profile") },
      team: { name: get("team"), members },
      track,
      pitch: get("pitch"),
      sponsors: { mitosis, tenki, how: get("sponsor_how") },
      needs_jev_access: fd.get("jev_access") === "on",
      in_person: get("in_person") === "yes",
      build: {
        repo_url: get("repo") || null,
        demo_video_url: get("demo") || null,
      },
      submitted_via: "form",
    };

    setSubmitting(true);
    try {
      const res = await fetch(ARENA.submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as SubmitResponse | null;
      if (data?.ok) {
        setSent(data);
      } else if (data && !data.ok && data.errors?.length) {
        setError(data.errors.join(" "));
      } else {
        throw new Error(String(res.status));
      }
    } catch {
      setError("The entry didn't go through. Check your connection and submit again. Nothing is lost.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="entry-done" aria-live="polite">
        <Invader kind="boom" size={54} className="entry-boom" />
        <p className="entry-done-kicker">Invader down</p>
        <h3>{sent.created ? "You're in the arena." : "Entry updated."}</h3>
        <p>{sent.message}</p>
        <p>We sent a confirmation to your email. Submit again with the same email any time before {ARENA.deadline} to update your entry.</p>
        <button type="button" className="btn btn-line sm" onClick={() => setSent(null)}>
          Update entry
        </button>
      </div>
    );
  }

  return (
    <div className="entry">
      <div className="entry-head">
        <span className="kicker red">
          <Invader kind="crab" size={16} /> Enter the arena
        </span>
        <div className="sharekit-tabs" role="tablist" aria-label="Who is entering">
          <button type="button" role="tab" aria-selected={mode === "human"} className={mode === "human" ? "on" : ""} onClick={() => setMode("human")}>
            I&apos;ll fill it in
          </button>
          <button type="button" role="tab" aria-selected={mode === "agent"} className={mode === "agent" ? "on" : ""} onClick={() => setMode("agent")}>
            My agent will
          </button>
        </div>
      </div>

      {mode === "agent" ? (
        <div className="entry-agent">
          <p>
            Your agent can read the full rules and submit for you. Everything a human sees on this page is in{" "}
            <a href="/jev/space-invaders/llms.txt">llms.txt</a>, plus the exact entry format.
          </p>
          <h4>1. Connect the UFA MCP server</h4>
          <CopyRow text={MCP_ADD} label="MCP command" />
          <p className="entry-hint">
            Tool: <code>{ARENA.mcpTool}</code>. Works with any MCP client over streamable HTTP.
          </p>
          <h4>2. Give your agent this prompt</h4>
          <CopyRow text={AGENT_PROMPT} label="agent prompt" />
          <h4>3. No MCP? Plain HTTP works too</h4>
          <p className="entry-hint">
            <code>POST {ARENA.httpEndpoint}</code> with the JSON body described in llms.txt.
          </p>
          <p className="entry-hint">Your agent can resubmit with the same email until {ARENA.deadline}. The latest entry counts.</p>
        </div>
      ) : (
        <form className="entry-form" onSubmit={onSubmit} noValidate={false}>
          <fieldset>
            <legend>You</legend>
            <label htmlFor="f-name">Your name</label>
            <input id="f-name" name="name" required autoComplete="name" />
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" required autoComplete="email" />
            <label htmlFor="f-profile">X or LinkedIn profile</label>
            <input id="f-profile" name="profile" type="url" required placeholder="https://x.com/you" />
            <label htmlFor="f-team">Team name</label>
            <input id="f-team" name="team" required placeholder="Shields Down" />
            <label htmlFor="f-members">
              Teammates <span className="opt">optional, up to 3</span>
            </label>
            <textarea id="f-members" name="members" rows={3} placeholder={"Name, email\nName, email"} />
          </fieldset>

          <fieldset>
            <legend>Your entry</legend>
            <span className="label" id="track-label">Track</span>
            <div className="tracks-pick" role="radiogroup" aria-labelledby="track-label">
              {TRACKS.map((t) => (
                <label key={t.id} className={`pick ${track === t.id ? "on" : ""}`} htmlFor={`f-track-${t.id}`}>
                  <input id={`f-track-${t.id}`} type="radio" name="track" value={t.id} checked={track === t.id} onChange={() => setTrack(t.id)} />
                  <b>{t.name}</b>
                  <span>{t.line}</span>
                </label>
              ))}
            </div>
            <label htmlFor="f-pitch">One-line pitch</label>
            <input id="f-pitch" name="pitch" required maxLength={120} placeholder="JEV dodges every bomb because it decides in one frame." />

            <span className="label">Sponsor stack <span className="opt">for bonus credits</span></span>
            <div className="checks">
              <label htmlFor="f-mitosis">
                <input id="f-mitosis" type="checkbox" checked={mitosis} onChange={(e) => setMitosis(e.target.checked)} /> Mitosis Labs
              </label>
              <label htmlFor="f-tenki">
                <input id="f-tenki" type="checkbox" checked={tenki} onChange={(e) => setTenki(e.target.checked)} /> Tenki
              </label>
            </div>
            {(mitosis || tenki) && (
              <>
                <label htmlFor="f-sponsor-how">How are you using them?</label>
                <textarea id="f-sponsor-how" name="sponsor_how" rows={3} placeholder="200 parallel games in Tenki sandboxes, scored every commit." />
              </>
            )}
            <label className="inline" htmlFor="f-jev-access">
              <input id="f-jev-access" name="jev_access" type="checkbox" /> I need a JEV API key
            </label>
            <span className="label" id="inperson-label">Can you be in SF on Wed Sep 30 if you make the top 10?</span>
            <div className="checks" role="radiogroup" aria-labelledby="inperson-label">
              <label htmlFor="f-inperson-yes">
                <input id="f-inperson-yes" type="radio" name="in_person" value="yes" defaultChecked /> Yes
              </label>
              <label htmlFor="f-inperson-no">
                <input id="f-inperson-no" type="radio" name="in_person" value="no" /> No
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Your build <span className="opt">due {ARENA.deadline}</span>
            </legend>
            <p className="entry-hint">Leave these empty today and come back. Submitting again with the same email updates your entry.</p>
            <label htmlFor="f-repo">Public repo</label>
            <input id="f-repo" name="repo" type="url" placeholder="https://github.com/you/jev-invaders" />
            <p className="entry-hint">Put your results in <code>results.json</code> at the repo root. Format is under &quot;Building it&quot;.</p>
            <label htmlFor="f-demo">Demo Video (X, LinkedIn, or YouTube URL)</label>
            <input id="f-demo" name="demo" type="url" placeholder="https://x.com/you/status/…" />
            <div className="entry-hint">
              1 to 2 minutes, tagging UFA. Phone camera is fine. No script, no editing, just yap. Cover:
              <ol className="entry-hint-list">
                <li>Your creative genius idea: how and why you built it.</li>
                <li>How you use Mitosis Labs or Tenki creatively, if you do.</li>
                <li>The demo itself. Show it working.</li>
              </ol>
              Quote-posts of your video count as Fan Favorite votes.
            </div>
          </fieldset>

          <label className="inline rules" htmlFor="f-rules">
            <input id="f-rules" name="rules" type="checkbox" /> I&apos;ve read the rules and the rubric. My entry is my team&apos;s own work.
          </label>
          {error && (
            <p className="entry-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-red entry-submit" disabled={submitting}>
            <Invader kind="ship" size={14} /> {submitting ? "Sending…" : "Submit entry"}
          </button>
        </form>
      )}
    </div>
  );
}
