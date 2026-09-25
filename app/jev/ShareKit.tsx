"use client";

import { useState } from "react";
import { JEV } from "@/data/jev";

type Platform = "x" | "linkedin";

const xIntent = () =>
  `https://x.com/intent/post?text=${encodeURIComponent(JEV.xText)}&url=${encodeURIComponent(JEV.pageUrl)}`;
const linkedinIntent = () =>
  `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(JEV.linkedinText)}`;

export function ShareKit() {
  const [tab, setTab] = useState<Platform>("x");
  const [flash, setFlash] = useState<string | null>(null);
  const text = tab === "x" ? `${JEV.xText}\n\n${JEV.pageUrl}` : JEV.linkedinText;

  const note = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1800);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      note("Text copied");
    } catch {
      note("Select the text and copy it");
    }
  };

  const copyImage = async () => {
    try {
      const blob = await (await fetch(JEV.card)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      note("Image copied. Paste it into your post");
    } catch {
      note("Use Download instead");
    }
  };

  return (
    <div className="sharekit">
      <div className="sharekit-card">
        <img src={JEV.card} alt="I'm in for the JEV Bake-Off. $1,000. Wed Sep 30, San Francisco." />
        <div className="sharekit-row">
          <button className="btn btn-line sm" onClick={copyImage}>Copy image</button>
          <a className="btn btn-line sm" href={JEV.card} download="ufa-jev-bake-off.png">Download</a>
        </div>
      </div>

      <div className="sharekit-post">
        <div className="sharekit-tabs" role="tablist">
          <button role="tab" aria-selected={tab === "x"} className={tab === "x" ? "on" : ""} onClick={() => setTab("x")}>X</button>
          <button role="tab" aria-selected={tab === "linkedin"} className={tab === "linkedin" ? "on" : ""} onClick={() => setTab("linkedin")}>LinkedIn</button>
        </div>
        <textarea readOnly value={text} rows={tab === "x" ? 9 : 16} onFocus={(e) => e.currentTarget.select()} />
        <div className="sharekit-row">
          <a
            className="btn btn-red"
            href={tab === "x" ? xIntent() : linkedinIntent()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Post on {tab === "x" ? "X" : "LinkedIn"}
          </a>
          <button className="btn btn-line" onClick={copyText}>Copy text</button>
        </div>
        <p className="sharekit-hint">
          {tab === "x"
            ? "The link shows this card as its preview on X."
            : "LinkedIn opens with the text filled in. Type @UFA and pick \"UFA - Ultimate Fighting Agents\" to tag us, then attach the image."}
        </p>
        <p className="sharekit-flash" aria-live="polite">{flash}</p>
      </div>
    </div>
  );
}
