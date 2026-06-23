"use client";

import { useRef } from "react";

// Hero wordmark: white "UFA" by default. On hover, a soft spotlight that follows
// the cursor reveals the American-flag fill underneath, like a faded hole.
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    el.style.setProperty("--r", `${r.width * 0.16}px`);
  }
  function leave() {
    ref.current?.style.setProperty("--r", "0px");
  }

  return (
    <div className="wordmark-fx" ref={ref} onMouseMove={move} onMouseLeave={leave}>
      <img className="wm-flag" src="/media/wordmark-flag.png" alt="" aria-hidden="true" />
      <img className="wm-white" src="/media/wordmark-white.png" alt="UFA" />
    </div>
  );
}
