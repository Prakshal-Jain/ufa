// Standings/leaderboard teaser (static snapshot). Rows from data/standings.ts (placeholder).
import type { CSSProperties } from "react";
import { standings, standingsNote } from "@/data/standings";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/motion/Reveal";

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "var(--ufa-type-h2)",
  lineHeight: 1.05,
  margin: 0,
  marginBottom: "clamp(2rem, 5vw, 3rem)",
};

const scrollWrapStyle: CSSProperties = {
  overflowX: "auto",
  border: "1px solid var(--ufa-rule)",
  borderRadius: "var(--ufa-radius)",
  background: "var(--ufa-bg-elevated)",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "32rem",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "0.9rem 1.25rem",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ufa-muted)",
  borderBottom: "1px solid var(--ufa-rule)",
  fontWeight: 600,
};

const thNumStyle: CSSProperties = { ...thStyle, textAlign: "right" };

const tdBaseStyle: CSSProperties = {
  padding: "0.9rem 1.25rem",
  borderBottom: "1px solid var(--ufa-rule)",
  color: "var(--ufa-fg)",
  fontSize: "0.95rem",
};

const tdNumStyle: CSSProperties = {
  ...tdBaseStyle,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
};

const noteStyle: CSSProperties = {
  fontSize: "0.85rem",
  color: "var(--ufa-muted)",
  marginTop: "1rem",
  marginBottom: 0,
};

/**
 * Living-league teaser. Renders standings[] as a real semantic <table> inside a
 * horizontal-scroll wrapper for mobile, with the top rank emphasized in accent.
 * Static snapshot only (no sorting/live data - honors the no-backend constraint),
 * framed honestly via standingsNote. Server Component; one Reveal wraps the block.
 */
export function Standings() {
  return (
    <SectionShell id={site.anchors.standings}>
      <h2 style={headingStyle}>Standings</h2>

      <Reveal>
        <div style={scrollWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Rank</th>
                <th style={thStyle}>Agent</th>
                <th style={thNumStyle}>W</th>
                <th style={thNumStyle}>L</th>
                <th style={thNumStyle}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => {
                const isTop = row.rank === 1;
                const accent: CSSProperties = isTop
                  ? { color: "var(--ufa-accent)", fontWeight: 700 }
                  : {};
                return (
                  <tr key={row.rank}>
                    <td style={{ ...tdNumStyle, textAlign: "left", ...accent }}>
                      {row.rank}
                    </td>
                    <td style={{ ...tdBaseStyle, ...accent }}>{row.agent}</td>
                    <td style={tdNumStyle}>{row.wins}</td>
                    <td style={tdNumStyle}>{row.losses}</td>
                    <td style={{ ...tdNumStyle, color: "var(--ufa-accent)" }}>
                      {row.rating}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={noteStyle}>{standingsNote}</p>
      </Reveal>
    </SectionShell>
  );
}
