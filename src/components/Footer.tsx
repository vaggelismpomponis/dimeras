"use client";

import { useEffect, useState } from "react";

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
          <a className="brand" href="#top" aria-label="D N GROUP, αρχική σελίδα">
            <span className="brand-mark">DN</span>
            <span>
              <strong>D N GROUP</strong>
              <small>ΔΗΜΕΡΑΣ Ε.Ε.</small>
            </span>
          </a>
          <p className="footer-tagline">
            Κατασκευαστική &amp; Τεχνική Εταιρεία στη Λάρισα. Εμπειρία και
            αξιοπιστία από το 2006.
          </p>
        </div>

        {/* Nav Column */}
        <div>
          <div className="footer-nav-title">Πλοήγηση</div>
          <div className="footer-nav-links">
            <a href="#company">Η εταιρεία</a>
            <a href="#services">Υπηρεσίες</a>
            <a href="#approach">Τρόπος εργασίας</a>
            <a href="#contact">Επικοινωνία</a>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <div className="footer-nav-title">Επικοινωνία</div>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <small>ΥΠΕΥΘΥΝΟΣ</small>
              <span>Δημέρας Νικόλαος του Παύλου</span>
            </div>
            <div className="footer-contact-item">
              <small>ΤΗΛΕΦΩΝΟ</small>
              <a href="tel:+306981772698">
                698 177 2698
              </a>
            </div>
            <div className="footer-contact-item">
              <small>EMAIL</small>
              <a href="mailto:dimerasnikos@hotmail.com">
                dimerasnikos@hotmail.com
              </a>
            </div>
            <div className="footer-contact-item">
              <small>ΕΔΡΑ</small>
              <a
                href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα"
                target="_blank"
                rel="noopener noreferrer"
              >
                Στρατηγού Φράγκου 26–30, Λάρισα
              </a>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div className="footer-map-col">
          <div className="footer-nav-title">Τοποθεσία</div>
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=Στρατηγού+Φράγκου+26-30,+Λάρισα&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Τοποθεσία D N GROUP στους Χάρτες Google"
              allowFullScreen
            ></iframe>
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
