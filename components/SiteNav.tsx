import { NavMenu } from "@/components/NavMenu";

// Shared top nav. The brand renders as a link to "/" when `brandHref` is set,
// otherwise as plain text (used on the home page where it would link to itself).
// The CTA is page-specific; pass `external` for off-site targets (calendar, etc.).
type NavCta = { label: string; href: string; external?: boolean };

export function SiteNav({ cta, brandHref }: { cta: NavCta; brandHref?: string }) {
  const brandInner = (
    <>
      UFA
      <small>Ultimate Fighting Agents</small>
    </>
  );

  return (
    <nav className="nav">
      <div className="wrap">
        {brandHref ? (
          <a className="brand" href={brandHref} style={{ display: "block" }}>
            {brandInner}
          </a>
        ) : (
          <div className="brand">{brandInner}</div>
        )}
        <div className="nav-actions">
          <a
            className="btn btn-red sm"
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {cta.label}
          </a>
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
