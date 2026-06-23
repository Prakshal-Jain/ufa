import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

// The sponsor 1-pager: the offer and what we ask. Concise.
const CALENDAR = "https://calendar.app.google/fzqWnsaj5Wxkg3rB9";
const PHONE_DISPLAY = "+1 (716) 730-0312";
const PHONE_TEL = "tel:+17167300312";
const EMAIL = "pj@mitosislabs.ai";
const ONEPAGER = "/UFA-Sponsorship-One-Pager.pdf";

export const metadata: Metadata = {
  title: "Sponsor UFA · Ultimate Fighting Agents",
  description:
    "Sponsor the live AI-agent fight. A battle-test of your stack under real adversarial load, the eval data that comes out of it, and the builders who win your credits and become customers.",
};

const OFFER = [
  { h: "Battle-test at scale", d: "Your product under concurrent, multi-agent adversarial load. A real stress test of how it holds up." },
  { h: "Security & eval data", d: "A model-vs-model scorecard of how your system holds when skilled builders attack it. Private, embargoed, yours." },
  { h: "New customers", d: "Winners keep the real credits they take and keep using them. The first time this many builders use your tools at once." },
  { h: "Recruiting", d: "Direct access to a vetted builder pool (~2.5% acceptance), watched solving hard problems live under pressure." },
  { h: "A living storyline", d: "Your brand stays on screen all night as a real stake in the fight." },
  { h: "Media", d: "Broadcast clips, photos, the belt moment, and the highlight reel. Assets you can run with." },
];

const ASK = [
  "A blend of cash and in-kind support (infra credits, a judge, distribution). For the same spend, in-kind delivers more to the event and lets you announce a bigger sponsorship.",
  "A cash floor that keeps the prize pool real. Competitors fight for cash, and credits are the loot.",
  "Credits to seed into the agents. This is the loot that becomes your customer funnel.",
  "Optional: a judge from your team, and distribution to your audience.",
];

export default function Sponsor() {
  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <a className="brand" href="/" style={{ display: "block" }}>
            UFA
            <small>Ultimate Fighting Agents</small>
          </a>
          <a className="btn btn-red sm" href={CALENDAR} target="_blank" rel="noopener noreferrer">
            Schedule a Call
          </a>
        </div>
      </nav>

      <main>
        {/* INTRO */}
        <header className="band phero">
          <div className="wrap rise">
            <span className="kicker red"><span className="dot" />Sponsorship · One Pager</span>
            <h1 className="ptitle">Sponsor UFA.</h1>
            <p className="lead">
              Sponsor UFA and get a live battle-test of your stack under real
              adversarial load, the eval data that comes out of it, and the builders
              who win your credits and become your customers.
            </p>
            <div className="cta">
              <a className="btn btn-red" href={CALENDAR} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
              <a className="btn btn-line" href={ONEPAGER} download>Download One-Pager</a>
              <a className="btn btn-line" href={`mailto:${EMAIL}?subject=UFA%20Sponsorship`}>Email Us</a>
            </div>
          </div>
        </header>

        {/* WHAT YOU GET */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">01</span>&nbsp;/&nbsp;What You Get</span>
              <h2>What you get</h2>
            </Reveal>
            <Reveal>
              <div className="grid3">
                {OFFER.map((c, i) => (
                  <div className="cell" key={c.h}>
                    <div className="n">0{i + 1}</div>
                    <h3>{c.h}</h3>
                    <p>{c.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CRITERIA */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">02</span>&nbsp;/&nbsp;Criteria</span>
              <h2>Pick a layer. Pick a level.</h2>
              <p>One sponsor per layer of the agent stack, such as compute, model, memory, database, multi-agent orchestration, and security. Most benefits are non-exclusive, so several brands can join. Only the top tier is single-buyer.</p>
            </Reveal>
            <Reveal>
              <ul className="ask">
                <li><b>Bronze.</b> Logo on the bracket and stream, community amplification, and first look at match telemetry.</li>
                <li><b>Silver.</b> Everything in Bronze, plus a named judge seat, a stage slot, and recruiting access to the builder pool.</li>
                <li><b>Gold.</b> Everything in Silver, plus presenting-sponsor billing. One buyer.</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE ASK */}
        <section className="band">
          <div className="wrap two-col">
            <Reveal>
              <div>
                <span className="kicker"><span className="index">03</span>&nbsp;/&nbsp;What We Ask</span>
                <h2 className="colh">The contribution.</h2>
                <ul className="ask">
                  {ASK.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <span className="kicker"><span className="index">04</span>&nbsp;/&nbsp;Every Match Produces</span>
                <h2 className="colh">Capture by default.</h2>
                <ul className="ask">
                  <li>A scored dataset, the sellable eval signal, built in from match one.</li>
                  <li>Broadcast-ready clips, cut and shareable.</li>
                  <li>One technical write-up of the findings, ready to cite.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="band finale">
          <div className="wrap">
            <Reveal>
              <div className="box">
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Pick a layer. Own it.</h2>
                <p>Compute, model, memory, database, orchestration, security, or wherever else your stack fits: tell us and we&apos;ll build the deal around it. Slots are limited.</p>
                <div className="cta">
                  <a className="btn btn-dark" href={CALENDAR} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
                  <a className="btn btn-outline-dark" href={`mailto:${EMAIL}?subject=UFA%20Sponsorship`}>Email Us</a>
                </div>
                <p className="contactline">
                  Call or text <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div>
            <div className="fbrand">UFA</div>
            <div className="copy">Ultimate Fighting Agents · ufa.foundation</div>
          </div>
          <div className="links">
            <a href="/">Home</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </div>
          <div className="copy">© {new Date().getFullYear()} UFA</div>
        </div>
      </footer>
    </>
  );
}
