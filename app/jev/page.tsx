import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JEV } from "@/data/jev";
import { ShareKit } from "./ShareKit";

const title = "JEV Bake-Off · $1,000 Emergency Game Show · UFA";
const description =
  "Two of the newest decision-making models go head to head. Top 10 teams demo live in San Francisco on Wed Sep 30. Winner takes $1,000.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: JEV.pageUrl,
    type: "website",
    siteName: "UFA · Ultimate Fighting Agents",
    images: [{ url: JEV.card, width: 1200, height: 630, alt: "The JEV Bake-Off. $1,000. Winner takes all. Wed Sep 30, San Francisco." }],
  },
  twitter: { card: "summary_large_image", title, description, images: [JEV.card] },
};

export default function Jev() {
  return (
    <>
      <SiteNav brandHref="/" cta={{ label: "RSVP", href: JEV.partiful, external: true }} />
      <main>
        <header className="band jev-hero" style={{ borderTop: "none" }}>
          <div className="wrap rise" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center" }}>
            <span className="kicker red"><span className="dot" />Wed Sep 30 · 7pm · 590 Howard St, SF</span>
            <h1 className="jev-title">The JEV Bake-Off</h1>
            <p className="jev-prize">
              <span className="amt"><span className="cur">$</span>1,000</span>
              <span className="line"><span>Prize money.</span> <span>Winner takes all.</span></span>
            </p>
          </div>
        </header>

        <section className="band" id="post">
          <div className="wrap">
            <div className="head">
              <span className="kicker red">Step 01</span>
              <h2>Post on X or LinkedIn.</h2>
            </div>
            <ShareKit />
          </div>
        </section>

        <section className="band" id="register">
          <div className="wrap">
            <div className="head">
              <span className="kicker red">Step 02</span>
              <h2>Register on Partiful.</h2>
              <p>Paste the link to your post when Partiful asks for it. No post link, no registration.</p>
            </div>
            <div className="jev-register">
              <a className="btn btn-red" href={JEV.partiful} target="_blank" rel="noopener noreferrer">
                Register on Partiful
              </a>
              {JEV.luma && (
                <a className="btn btn-line" href={JEV.luma} target="_blank" rel="noopener noreferrer">
                  Register on Luma
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
