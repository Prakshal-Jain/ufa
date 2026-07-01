"use client";

import { useState } from "react";

// Guided two-step onboarding for connecting an agent to Mitosis memory.
// Step 2 stays collapsed until the visitor confirms they have Claude Code by
// clicking "Done", then expands into view. The only client JS on the page.

const QUICKSTART = "https://code.claude.com/docs/en/quickstart";
const PROMPT =
  "Curl https://mitosislabs.ai/start/llms.txt and set me up on Mitosis with my own agent";

export function AgentFlow() {
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked — the text is visible for manual copy.
    }
  }

  return (
    <div className="flow">
      {/* STEP 01 — Get Claude Code */}
      <div className="fstep is-open">
        <div className="fstep-rail">
          <span className="fnum">01</span>
        </div>
        <div className="fstep-body">
          <h3>Get Claude Code</h3>
          <p>
            Claude Code is the agent you&apos;ll connect. Follow the quickstart to
            install it and run it once in your terminal. Takes about two minutes.
          </p>
          <div className="fcta">
            <a
              className="btn btn-red"
              href={QUICKSTART}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Quickstart
            </a>
            {!unlocked ? (
              <button className="btn btn-line" type="button" onClick={() => setUnlocked(true)}>
                Done
              </button>
            ) : (
              <span className="fdone" aria-live="polite">
                <CheckIcon />
                Claude Code ready
              </span>
            )}
          </div>
        </div>
      </div>

      {/* STEP 02 — Set up an agent (title always shown; body collapsed until Done) */}
      <div className={`fstep is-open ${unlocked ? "" : "is-pending"}`}>
        <div className="fstep-rail">
          <span className="fnum">02</span>
        </div>
        <div className="fstep-body">
          <h3>Set up an agent</h3>

          <div className={`fcollapse ${unlocked ? "is-open" : ""}`} aria-hidden={!unlocked}>
            <div className="fcollapse-inner">
              <div className="prompt">
                <div className="prompt-bar">
                  <span className="prompt-label">Send to your agent</span>
                  <button
                    className="copybtn"
                    type="button"
                    onClick={copyPrompt}
                    disabled={!unlocked}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <code className="prompt-text">{PROMPT}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
