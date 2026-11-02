"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileNavDrawer from "./header/MobileNavDrawer";

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // On the homepage with no scroll, header is transparent
  // On inner pages, force scrolled style so it is readable over the dark bg
  const isHome = pathname === "/";
  const forceScrolled = !isHome && !scrolled;

  return (
    <>
      <header
        className={`site-header${scrolled || forceScrolled ? " scrolled" : ""}`}
        id="top"
      >
        <div className="header-inner">
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
            <Logo size="md" />
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNavDrawer
        isOpen={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
        navLinks={navLinks}
      />
    </>
  );
}
