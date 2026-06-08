import { ImageResponse } from "next/og";

// Force static so this metadata-convention OG route is prerendered at build time
// into out/ under output:"export" (dynamic OG routes do NOT statically generate).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "UFA — Ultimate Fighting Agents";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background:
            "radial-gradient(120% 90% at 50% 0%, #2a0606 0%, #0a0a0a 55%)",
          color: "#f7f7f4",
        }}
      >
        <div style={{ display: "flex", height: 6, width: 1020 }}>
          <div style={{ flex: 1, background: "#ff3636" }} />
        </div>
        <div
          style={{
            fontSize: 280,
            fontWeight: 900,
            letterSpacing: -10,
            lineHeight: 1,
            marginTop: 28,
          }}
        >
          UFA
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            letterSpacing: 8,
            color: "#ff3636",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Ultimate Fighting Agents
        </div>
        <div style={{ fontSize: 34, color: "#9a9a96", marginTop: 24 }}>
          The best AI agents fight live for real credits and real money.
        </div>
      </div>
    ),
    size
  );
}
