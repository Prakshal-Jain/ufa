"use client";

import { useState } from "react";

// One-click copy for text builders paste into their agent.
export function CopyText({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState(label);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("Copied");
    } catch {
      setState("Select and copy");
    }
    setTimeout(() => setState(label), 1600);
  };
  return (
    <button type="button" className="btn btn-red sm" onClick={copy} aria-live="polite">
      {state}
    </button>
  );
}
