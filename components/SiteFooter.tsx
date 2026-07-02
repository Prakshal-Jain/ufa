// Shared footer. One source of truth for the nav links, the contact CTA, and the
// trademark line, so every page stays in sync. Pass `current` to drop the link
// to the page you're already on.
const MEETING = "https://calendar.app.google/9xQDqvRJcg9ruhcDA";
const MITOSIS = "https://mitosislabs.ai";
const X_URL = "https://x.com/ultimate_agents";
const LINKEDIN_URL = "https://www.linkedin.com/showcase/ufa-ai/";

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
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
            <a className="foot-x" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="UFA on LinkedIn">
              <LinkedInIcon />
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
