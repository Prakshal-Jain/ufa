"use client";

import { Invader } from "@/components/Invader";

// Background for the arena hero: a faint formation marching side to side, and a
// saucer that crosses now and then. Shoot the saucer (click it) to open the arcade.
const FORMATION = ["squid", "crab", "octopus"] as const;

export function InvaderSky() {
  return (
    <div className="sky" aria-hidden="false">
      <div className="sky-formation" aria-hidden="true">
        {FORMATION.map((kind) => (
          <div className="sky-row" key={kind}>
            {Array.from({ length: 9 }, (_, i) => (
              <Invader key={i} kind={kind} size={kind === "octopus" ? 24 : kind === "crab" ? 22 : 16} />
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="sky-saucer"
        onClick={() => window.dispatchEvent(new Event("ufa:invade"))}
        aria-label="Mystery ship. Shoot it down"
        title="???"
      >
        <Invader kind="saucer" size={40} />
      </button>
    </div>
  );
}
