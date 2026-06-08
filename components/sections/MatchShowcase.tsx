// Match showcase - swappable placeholder media (data/matches.ts). Mobile-safe: poster-first, muted/loop/playsinline, no autoplay sound.
import type { CSSProperties } from "react";
import { matches } from "@/data/matches";
import { site } from "@/data/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "var(--ufa-type-h2)",
  lineHeight: 1.05,
  margin: 0,
  marginBottom: "clamp(2rem, 5vw, 3.5rem)",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "1.25rem",
};

const mediaFrameStyle: CSSProperties = {
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: "var(--ufa-radius)",
  background: "var(--ufa-bg-elevated)",
  border: "1px solid var(--ufa-rule)",
};

const mediaFillStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const titleLabelStyle: CSSProperties = {
  fontSize: "0.8rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ufa-accent)",
  marginTop: "0.9rem",
  marginBottom: "0.35rem",
};

const versusStyle: CSSProperties = {
  fontFamily: "var(--font-display, Orbitron, sans-serif)",
  fontSize: "1.05rem",
  margin: 0,
  color: "var(--ufa-fg)",
};

const resultStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "var(--ufa-muted)",
  marginTop: "0.35rem",
  marginBottom: 0,
};

/**
 * Proof-of-spectacle grid. Renders matches[] as CLS-safe cards: each media frame
 * reserves a 16/9 box, then shows a lazy poster <img> (and, when a clip exists, a
 * muted/loop/playsInline <video preload="none"> with poster fallback - NEVER
 * autoplaying sound). Media files may be absent; posters 404 gracefully. Server
 * Component; entrance motion comes solely from the Reveal primitive.
 */
export function MatchShowcase() {
  return (
    <SectionShell id={site.anchors.matches}>
      <h2 style={headingStyle}>
        Real matches. <GradientText>Real stakes.</GradientText>
      </h2>

      <div style={gridStyle}>
        {matches.map((match, i) => {
          const versus = `${match.agents[0]} vs ${match.agents[1]}`;
          return (
            <Reveal key={match.id} delay={i * 0.08}>
              <article>
                <div style={mediaFrameStyle}>
                  {match.clip ? (
                    <video
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={match.poster}
                      aria-label={versus}
                      style={mediaFillStyle}
                    >
                      <source src={match.clip} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={match.poster}
                      alt={versus}
                      loading="lazy"
                      style={mediaFillStyle}
                    />
                  )}
                </div>

                <p style={titleLabelStyle}>{match.title}</p>
                <p style={versusStyle}>{versus}</p>
                <p style={resultStyle}>{match.result}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
