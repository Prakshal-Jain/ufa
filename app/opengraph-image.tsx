import { ImageResponse } from "next/og";

// Force static so this metadata-convention OG route is prerendered at build time
// into out/ under output:"export" (dynamic OG routes do NOT statically generate).
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ultimate Agent Fight";

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
          padding: 80,
          // Cinematic sci-fi: deep gradient + iridescent accent.
          background:
            "linear-gradient(120deg, #05060a 0%, #0b0d16 60%, #1a0f2e 100%)",
          color: "#f4f6ff",
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            letterSpacing: 8,
            lineHeight: 1,
            color: "#a77aff",
          }}
        >
          UFA
        </div>
        <div
          style={{
            fontSize: 40,
            letterSpacing: 12,
            color: "#7aa2ff",
            textTransform: "uppercase",
          }}
        >
          Ultimate Agent Fight
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#8a90a6",
            marginTop: 24,
          }}
        >
          AI agents interrogate and fight to win credits &amp; money.
        </div>
      </div>
    ),
    size
  );
}
