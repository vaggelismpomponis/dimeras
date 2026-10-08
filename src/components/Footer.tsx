"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link className="brand" href="/" aria-label="DN GROUP, αρχική σελίδα">
            <Logo size="md" />
          </Link>
          <p className="footer-tagline">
            Κατασκευαστική &amp; Τεχνική Εταιρεία στη Λάρισα. Εμπειρία και
            αξιοπιστία από το 2006.
          </p>
        </div>

        {/* Nav Column */}
        <div>
          <div className="footer-nav-title">Πλοήγηση</div>
          <div className="footer-nav-links">
            <Link href="/">Αρχική</Link>
            <Link href="/services">Υπηρεσίες</Link>
            <Link href="/projects">Έργα</Link>
            <Link href="/contact">Επικοινωνία</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <div className="footer-nav-title">Επικοινωνία</div>
          <div className="contact-panel-items">
            <div className="contact-panel-item">
              <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="6" r="3.5" /><path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" />
              </svg>
              <div>
                <small>ΥΠΕΥΘΥΝΟΣ</small>
                <span>Δημέρας Νικόλαος του Παύλου</span>
              </div>
            </div>
            <div className="contact-panel-item">
              <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5C3 3.67 3.67 3 4.5 3h2.09a1 1 0 01.97.76l.7 3.18a1 1 0 01-.5 1.1l-1.3.66a10 10 0 004.84 4.84l.65-1.3a1 1 0 011.1-.5l3.19.7a1 1 0 01.76.97v2.09c0 .83-.67 1.5-1.5 1.5C8.82 17 3 11.18 3 4.5z" />
              </svg>
              <div>
                <small>ΤΗΛΕΦΩΝΟ</small>
                <a href="tel:+306981772698">698 177 2698</a>
              </div>
            </div>
            <div className="contact-panel-item">
              <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="16" height="12" rx="2" /><path d="M2 6l8 5 8-5" />
              </svg>
              <div>
                <small>EMAIL</small>
                <a href="mailto:dimerasnikos@hotmail.com">dimerasnikos@hotmail.com</a>
              </div>
            </div>
            <div className="contact-panel-item">
              <svg className="contact-detail-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 18s-6-5.69-6-9.5A6 6 0 0116 8.5C16 12.31 10 18 10 18z" /><circle cx="10" cy="8.5" r="2" />
              </svg>
              <div>
                <small>ΕΔΡΑ</small>
                <a href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα" target="_blank" rel="noopener noreferrer">
                  Στρατηγού Φράγκου 26–30, Λάρισα
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">© {year} ΔΗΜΕΡΑΣ Ε.Ε. Με επιφύλαξη παντός δικαιώματος.</p>
      </div>

      <button
        className={`floating-top-btn ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Επιστροφή στην κορυφή"
        aria-hidden={!isVisible}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
