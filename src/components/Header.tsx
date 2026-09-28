"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Αρχική" },
  { href: "/services", label: "Υπηρεσίες" },
  { href: "/projects", label: "Έργα" },
  { href: "/contact", label: "Επικοινωνία" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // On the homepage with no scroll, header should be transparent (white text)
  // On inner pages, force scrolled style so it's readable over the dark bg
  const isHome = pathname === "/";
  const forceScrolled = !isHome && !scrolled;

  return (
    <>
      <header
        className={`site-header${scrolled || forceScrolled ? " scrolled" : ""}`}
        id="top"
      >
        <Link 
          className="brand" 
          href="/" 
          aria-label="DN GROUP, αρχική σελίδα"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span>
            <strong>DN GROUP</strong>
            <small>ΔΗΜΕΡΑΣ Ε.Ε.</small>
          </span>
        </Link>

        <nav aria-label="Κύρια πλοήγηση">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.href === "/contact") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-cta"
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className={`menu-btn${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="menu-btn-grid" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
            <circle cx="3"  cy="3"  r="2" className="dot d1" />
            <circle cx="11" cy="3"  r="2" className="dot d2" />
            <circle cx="19" cy="3"  r="2" className="dot d3" />
            <circle cx="3"  cy="11" r="2" className="dot d4" />
            <circle cx="11" cy="11" r="2" className="dot d5" />
            <circle cx="19" cy="11" r="2" className="dot d6" />
            <circle cx="3"  cy="19" r="2" className="dot d7" />
            <circle cx="11" cy="19" r="2" className="dot d8" />
            <circle cx="19" cy="19" r="2" className="dot d9" />
          </svg>
        </button>
      </header>

      {/* Full-Screen Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className={pathname === link.href ? "active" : ""}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
