"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

// Menu-icon dropdown linking to every page. The panel is rendered in a portal on
// document.body (NOT inside the nav pill) because backdrop-filter does not work
// when nested inside another backdrop-filtered element — portaling lets the
// frosted-glass blur sample the real page content. Positioned `fixed` under the
// button. Closes on outside-click, Escape, or selecting a link.
const LINKS = [
  { label: "Home", href: "/" },
  { label: "Become a Sponsor", href: "/sponsor/" },
  { label: "Creators", href: "/creators/" },
  { label: "Investors", href: "/investors/" },
  { label: "Press", href: "/press/" },
];

const norm = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const current = norm(pathname ?? "/");

  function place() {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + 10, right: window.innerWidth - r.right });
  }

  function toggle() {
    if (!open) place();
    setOpen((v) => !v);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  const panel =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            className="navmenu-panel"
            role="menu"
            ref={panelRef}
            style={{ top: pos.top, right: pos.right }}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                role="menuitem"
                className="navmenu-link"
                aria-current={norm(l.href) === current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <div className="navmenu">
      <button
        type="button"
        className="navmenu-btn"
        ref={btnRef}
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        <span className="navmenu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      {panel}
    </div>
  );
}
