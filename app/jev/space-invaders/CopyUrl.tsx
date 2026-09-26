"use client";

import { useState } from "react";

// Copies the agent docs URL so builders can paste it straight into their agent.
export function CopyUrl({ url }: { url: string }) {
  const [label, setLabel] = useState("Copy URL");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setLabel("Copied");
    } catch {
      setLabel("Select and copy");
    }
    setTimeout(() => setLabel("Copy URL"), 1600);
  };
  return (
    <button type="button" className="btn btn-red sm" onClick={copy} aria-live="polite">
      {label}
    </button>
  );
}
