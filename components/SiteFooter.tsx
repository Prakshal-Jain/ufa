// Shared footer. One source of truth for the nav links, the contact CTA, and the
// trademark line, so every page stays in sync. Pass `current` to drop the link
// to the page you're already on.
const MEETING = "https://calendar.app.google/9xQDqvRJcg9ruhcDA";
const MITOSIS = "https://mitosislabs.ai";

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
