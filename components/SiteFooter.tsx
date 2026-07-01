// Shared footer. One source of truth for the nav links, the contact CTA, and the
// trademark line, so every page stays in sync. Pass `current` to drop the link
// to the page you're already on.
const MEETING = "https://calendar.app.google/9xQDqvRJcg9ruhcDA";
const MITOSIS = "https://mitosislabs.ai";
const X_URL = "https://x.com/ultimate_agents";

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type PageKey = "home" | "sponsor" | "creators" | "investors" | "press";

const NAV_LINKS: { key: PageKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "sponsor", label: "Become a Sponsor", href: "/sponsor/" },
  { key: "creators", label: "Creators", href: "/creators/" },
  { key: "investors", label: "Investors", href: "/investors/" },
  { key: "press", label: "Press", href: "/press/" },
];

export function SiteFooter({ current }: { current?: PageKey }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="fbrand">UFA</div>
            <div className="copy">Ultimate Fighting Agents · ufa.foundation</div>
          </div>
          <div className="links">
            {NAV_LINKS.filter((l) => l.key !== current).map((l) => (
              <a key={l.key} href={l.href}>{l.label}</a>
            ))}
            <a href={MEETING} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
            <a className="foot-x" href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="UFA on X">
              <XIcon />
            </a>
          </div>
        </div>
        <div className="copy foot-legal">
          © {new Date().getFullYear()}{" "}
          <a href={MITOSIS} target="_blank" rel="noopener noreferrer">Mitosis Labs</a>
          . Ultimate Fighting Agents™ is a trademark of Mitosis Labs.
        </div>
      </div>
    </footer>
  );
}
