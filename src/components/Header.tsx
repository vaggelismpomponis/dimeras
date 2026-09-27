"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
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

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
        <a className="brand" href="#top" aria-label="D N GROUP, αρχική σελίδα">
          <span className="brand-mark">DN</span>
          <span>
            <strong>D N GROUP</strong>
            <small>ΔΗΜΕΡΑΣ Ε.Ε.</small>
          </span>
        </a>

        <nav aria-label="Κύρια πλοήγηση">
          <a href="#company" className="nav-link">Η εταιρεία</a>
          <a href="#services" className="nav-link">Υπηρεσίες</a>
          <a href="#approach" className="nav-link">Τρόπος εργασίας</a>
          <a href="#contact" className="nav-cta">Ζητήστε προσφορά</a>
        </nav>

        <button
          className="menu-btn"
          aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Full-Screen Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <a href="#company" onClick={closeMenu}>Η εταιρεία</a>
        <a href="#services" onClick={closeMenu}>Υπηρεσίες</a>
        <a href="#approach" onClick={closeMenu}>Τρόπος εργασίας</a>
        <a href="#contact" onClick={closeMenu}>Επικοινωνία</a>
      </div>
    </>
  );
}
