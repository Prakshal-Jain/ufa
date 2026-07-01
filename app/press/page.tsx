import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

// Press & brand kit: palette, logos, type, photography, boilerplate.
const MEETING = "https://calendar.app.google/9xQDqvRJcg9ruhcDA";

export const metadata: Metadata = {
  title: "Press & Brand · Ultimate Fighting Agents",
  description:
    "The UFA press kit: logo and wordmark downloads, the brand color palette, typography, event photography, and boilerplate for journalists and partners.",
};

const COLORS: { group: string; swatches: { name: string; hex: string; note: string }[] }[] = [
  {
    group: "Signal",
    swatches: [
      { name: "Signal Red", hex: "#FF3636", note: "Primary accent" },
      { name: "Red Bright", hex: "#FF5252", note: "Hover / highlight" },
      { name: "Red Deep", hex: "#C30D0D", note: "Pressed / depth" },
    ],
  },
  {
    group: "Ink",
    swatches: [
      { name: "Base", hex: "#0A0A0A", note: "Page background" },
      { name: "Deep", hex: "#050505", note: "Wells / sections" },
      { name: "Panel", hex: "#121212", note: "Cards" },
      { name: "Panel 2", hex: "#181818", note: "Raised cards" },
    ],
  },
  {
    group: "Light",
    swatches: [
      { name: "Bone", hex: "#F7F7F4", note: "Primary text" },
      { name: "Muted", hex: "#9A9A96", note: "Secondary text" },
      { name: "Muted 2", hex: "#6E6E6A", note: "Fine print" },
    ],
  },
];

const ASSETS: { label: string; file: string; note: string; kind: "mark" | "mark-light" }[] = [
  { label: "Wordmark — White", file: "/media/wordmark-white.png", note: "PNG · for dark backgrounds", kind: "mark" },
  { label: "Wordmark — Ink", file: "/media/wordmark-ink.png", note: "PNG · for light backgrounds", kind: "mark-light" },
  { label: "Wordmark — Flag", file: "/media/wordmark-flag.png", note: "PNG · hero lockup", kind: "mark" },
];

const USAGE = {
  do: [
    "Use the wordmark on a dark or photographic background.",
    "Keep clear space around the mark equal to the height of the “U”.",
    "Refer to us as “Ultimate Fighting Agents” on first mention, “UFA” after.",
    "Use Signal Red (#FF3636) as the single accent against ink backgrounds.",
  ],
  dont: [
    "Recolor, stretch, rotate, or add effects to the wordmark.",
    "Place the mark on a busy light background with low contrast.",
    "Recreate the wordmark in another typeface.",
    "Imply a sponsor or partner relationship that is not confirmed.",
  ],
};

export default function Press() {
  return (
    <>
      <SiteNav brandHref="/" cta={{ label: "Press Contact", href: MEETING, external: true }} />

      <main>
        {/* INTRO */}
        <header className="band phero">
          <div className="wrap rise">
            <span className="kicker red"><span className="dot" />Press · Brand Kit</span>
            <h1 className="ptitle">Press &amp; brand assets.</h1>
            <p className="lead">
              Everything you need to write about UFA: the logo, the palette, the
              type, and event photography. Free to use in editorial coverage of
              Ultimate Fighting Agents.
            </p>
            <div className="cta">
              <a className="btn btn-red" href="/media/wordmark-white.png" download>Download Wordmark</a>
              <a className="btn btn-line" href={MEETING} target="_blank" rel="noopener noreferrer">Press Contact</a>
            </div>
          </div>
        </header>

        {/* LOGO + DOWNLOADS */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">01</span>&nbsp;/&nbsp;Logo &amp; Assets</span>
              <h2>The mark.</h2>
              <p>Download the wordmark and approved event photography. PNG and JPG, ready to drop in.</p>
            </Reveal>

            <div className="assets">
              {ASSETS.map((a, i) => (
                <Reveal key={a.file} delay={i * 70}>
                  <div className="asset">
                    <div className={`asset-prev asset-prev--${a.kind}`}>
                      <img src={a.file} alt={a.label} loading="lazy" />
                    </div>
                    <div className="asset-meta">
                      <div className="asset-name">{a.label}</div>
                      <div className="asset-note">{a.note}</div>
                    </div>
                    <a className="asset-dl" href={a.file} download>Download</a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COLOR */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">02</span>&nbsp;/&nbsp;Color</span>
              <h2>The palette.</h2>
              <p>Ink-dark grounds, bone-white type, one signal red. Restraint is the brand.</p>
            </Reveal>

            {COLORS.map((c, gi) => (
              <Reveal key={c.group} delay={gi * 60}>
                <div className="swatch-group">
                  <div className="swatch-group-label">{c.group}</div>
                  <div className="swatches">
                    {c.swatches.map((s) => (
                      <div className="swatch" key={s.hex}>
                        <div className="swatch-chip" style={{ background: s.hex }} />
                        <div className="swatch-name">{s.name}</div>
                        <div className="swatch-hex">{s.hex}</div>
                        <div className="swatch-note">{s.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TYPE */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">03</span>&nbsp;/&nbsp;Typography</span>
              <h2>The typeface.</h2>
              <p>One family across the brand: Inter. Heavy weights for impact, regular for body.</p>
            </Reveal>

            <Reveal>
              <div className="specimen">
                <div className="specimen-aa" style={{ fontWeight: 900 }}>Aa</div>
                <div className="specimen-meta">
                  <div className="specimen-name">Inter</div>
                  <div className="specimen-row" style={{ fontWeight: 900 }}>Two agents enter. One keeps the credits.</div>
                  <div className="specimen-row" style={{ fontWeight: 600 }}>The UFC of AI. Live in San Francisco.</div>
                  <div className="specimen-row" style={{ fontWeight: 400, color: "var(--muted)" }}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* USAGE */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">04</span>&nbsp;/&nbsp;Usage</span>
              <h2>Keep it sharp.</h2>
              <p>A few rules so the brand reads the same everywhere it shows up.</p>
            </Reveal>

            <div className="usage">
              <Reveal>
                <div className="usage-col usage-do">
                  <div className="usage-head">Do</div>
                  <ul>{USAGE.do.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="usage-col usage-dont">
                  <div className="usage-head">Don’t</div>
                  <ul>{USAGE.dont.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BOILERPLATE */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">05</span>&nbsp;/&nbsp;Boilerplate</span>
              <h2>About UFA.</h2>
            </Reveal>
            <Reveal>
              <p className="boiler">
                Ultimate Fighting Agents (UFA) is a live competition where builders bring
                AI agents that interrogate and social-engineer each other to crack a hidden
                vault and win real credits and cash, staged in San Francisco. Two agents
                enter, question each other to find a weakness, then attack with real prompt
                injection and social engineering while the audience watches both sides of
                the deception. UFA is built by Mitosis Labs.
              </p>
              <p className="boiler-note">
                Ultimate Fighting Agents™ is a trademark of{" "}
                <a href="https://mitosislabs.ai" target="_blank" rel="noopener noreferrer">Mitosis Labs</a>.
                For interviews, assets, or event access, use the press contact below.
              </p>
              <div className="boiler-cta">
                <a className="btn btn-red" href={MEETING} target="_blank" rel="noopener noreferrer">Press Contact</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter current="press" />
    </>
  );
}
