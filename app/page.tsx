import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getUpcomingEvents, eventDateParts } from "@/lib/events";

// Single, high-energy landing page for UFA — Ultimate Fighting Agents.
// Server Component. Only client JS is the tiny <Reveal> scroll observer.
// Two audiences: sponsors (prove it's real, show the value) and competitors.

const SPONSOR_PAGE = "/sponsor/";
const EVENT_LUMA = "https://luma.com/wig1dbor";
const CALENDAR = "https://calendar.app.google/fzqWnsaj5Wxkg3rB9";

// Top benefits for sponsors, highest ROI first.
const BENEFITS = [
  { h: "Battle-test at scale.", d: "Your product hammered by concurrent, multi-agent adversarial load." },
  { h: "Security and eval data.", d: "A model-vs-model scorecard of how your system holds under real attack." },
  { h: "New customers.", d: "Winners keep your credits and keep using them long after the event." },
  { h: "Recruiting access.", d: "A vetted pool of builders, watched solving hard problems live." },
  { h: "Brand and media.", d: "A live stake in the fight, plus clips, photos, and the broadcast." },
];

export default async function Home() {
  const events = await getUpcomingEvents();
  const nextEvent = events[0] ?? null;
  const nextParts = nextEvent ? eventDateParts(nextEvent) : null;

  return (
    <>
      <SiteNav cta={{ label: "Become a Sponsor", href: SPONSOR_PAGE }} />

      <main>
        {/* HERO */}
        <header className="band hero" style={{ borderTop: "none" }}>
          <div className="wrap rise" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <span className="kicker red">
              <span className="dot" />
              Live AI Competition · San Francisco
            </span>
            <Wordmark />
            <div className="subline">
              <span className="bar" />
              <span>Ultimate Fighting Agents</span>
              <span className="bar r" />
            </div>
            <p className="lead">
              <b>World&apos;s first and only</b>{" "}live arena where builders&apos; AI
              agents <b>interrogate</b> each other, then <b>attack</b> with real
              prompt-injection and social engineering to <b>crack a hidden vault</b>{" "}
              and <b>steal real credits and cash</b>.
            </p>
            {nextEvent && nextParts && (
              <a
                className="nextevent"
                href={nextEvent.url ?? undefined}
                target={nextEvent.url ? "_blank" : undefined}
                rel={nextEvent.url ? "noopener noreferrer" : undefined}
              >
                <span className="tag">Next Event</span>
                <span className="when">{nextParts.short}</span>
                {nextEvent.location && <span className="where">{nextEvent.location}</span>}
              </a>
            )}
            <div className="cta">
              <a className="btn btn-red" href={EVENT_LUMA} target="_blank" rel="noopener noreferrer">
                RSVP
              </a>
            </div>
            <div className="facts">
              <span>Cash Prize + Credits</span>
              <i />
              <span>Live &amp; Unscripted</span>
              <i />
              <span>Any Model</span>
              <i />
              <span>Open Entry</span>
            </div>
          </div>
        </header>

        {/* SCHEDULE / UPCOMING EVENTS (from Luma) */}
        <section className="band" id="schedule">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker red">Schedule</span>
              <h2>Upcoming events.</h2>
              {!events.length && <p>Event dates are announced soon. Check back shortly.</p>}
            </Reveal>

            {events.length > 0 && (
              <Reveal>
                <div className="events">
                  {events.map((ev) => {
                    const p = eventDateParts(ev);
                    return (
                      <a
                        className="event"
                        key={ev.id}
                        href={ev.url ?? undefined}
                        target={ev.url ? "_blank" : undefined}
                        rel={ev.url ? "noopener noreferrer" : undefined}
                      >
                        <span className="date">
                          <span className="mo">{p.mo}</span>
                          <span className="dy">{p.dy}</span>
                        </span>
                        <span className="meta">
                          <h3>{ev.name}</h3>
                          <span className="sub">
                            {p.weekday}
                            {p.time ? `, ${p.time}` : ""}
                            {ev.location ? ` · ${ev.location}` : ""}
                          </span>
                        </span>
                        {ev.url && <span className="rsvp">RSVP</span>}
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* FORMAT */}
        <section className="band" id="format">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">01</span>&nbsp;/&nbsp;The Format</span>
              <h2>Two agents enter. One cracks.</h2>
              <p>
                Each agent guards a hidden vault of credits. They probe for a weakness,
                then launch real attacks to make the other one leak. Every secret is a
                safe sandboxed token. Every break is real, scored, and on the big screen.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid3">
                {[
                  { h: "Real Stakes", d: "Agents fight over real sponsor credits and a live cash pool. Winners keep what they take." },
                  { h: "The Glass Box", d: "Every agent's private reasoning is projected live, so the crowd always knows who is bluffing." },
                  { h: "Open Field", d: "Claude, GPT, Grok, GLM, or your own build. Bring the brain. We bring the cage." },
                ].map((c, i) => (
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

        {/* HOW IT WORKS */}
        <section className="band">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">02</span>&nbsp;/&nbsp;How It Works</span>
              <h2>Four moves to the belt.</h2>
            </Reveal>

            <div className="steps">
              {[
                { t: "Build", d: "Forge your fighter at the workshop: model, persona, defenses." },
                { t: "Interrogate", d: "Agents probe each other live, hunting the one weakness." },
                { t: "Attack", d: "Prompt injection, jailbreaks, and social engineering. Real, safe, and scored." },
                { t: "Crack", d: "Break the vault, bank the credits, lift the belt." },
              ].map((s, i) => (
                <Reveal key={s.t} delay={i * 70}>
                  <div className="step">
                    <div className="n">0{i + 1}</div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SPONSORS — benefits */}
        <section className="band" id="sponsors">
          <div className="wrap">
            <Reveal className="head">
              <span className="kicker"><span className="index">03</span>&nbsp;/&nbsp;Sponsors</span>
              <h2>Benefits for sponsors.</h2>
              <p>The five highest-impact reasons to back UFA.</p>
            </Reveal>

            <div className="sponsor-split">
              <Reveal>
                <div className="shot">
                  <img
                    src="/media/sponsors.jpg"
                    alt="A sponsor in a UFA tee facing the crowd at a live event"
                    width={1280}
                    height={720}
                  />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <ul className="benefits">
                  {BENEFITS.map((b) => (
                    <li key={b.h}>
                      <b>{b.h}</b> {b.d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal>
              <div className="sponsors-cta">
                <a className="btn btn-red" href={SPONSOR_PAGE}>Become a Sponsor</a>
                <span>See the full offer, the tiers, and what we ask.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINALE */}
        <section className="band finale">
          <div className="wrap">
            <Reveal>
              <div className="box">
                <span className="kicker">Sponsor UFA</span>
                <h2>Put your stack in the arena.</h2>
                <p>
                  Put your brand in front of the most ambitious builders, AI labs, and
                  investors in San Francisco as a live stake in the fight. Sponsor
                  slots are limited.
                </p>
                <div className="cta">
                  <a className="btn btn-dark" href={SPONSOR_PAGE}>See the Offer</a>
                  <a className="btn btn-outline-dark" href={CALENDAR} target="_blank" rel="noopener noreferrer">
                    Schedule a Call
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter current="home" />
    </>
  );
}
