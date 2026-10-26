"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Company() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="statement" id="company" ref={sectionRef}>
      <div className="company-container">
        {/* Top Header Row */}
        <div className={`company-header reveal${isRevealed ? " visible" : ""}`}>
          <div className="company-header-top">
            <span className="company-geo-badge">
              <span className="cgb-dot" aria-hidden="true" />
              ΛΑΡΙΣΑ • ΘΕΣΣΑΛΙΑ • ΑΤΤΙΚΗ
            </span>
          </div>

          <h2 className="company-heading">
            Ανεξάρτητη Τεχνική και Κατασκευαστική Εταιρεία
          </h2>
          <p className="company-subheading">
            Υπό τη διοίκηση του <strong>Νικολάου Δημερά</strong> • Προσωπική επαγγελματική εμπειρία στον κατασκευαστικό κλάδο από το <strong>2006</strong>
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="company-grid">
          {/* Left Column: Narrative Copy */}
          <div className="company-narrative-col">
            <div className={`company-lead-card reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
              <p>
                Η <strong>DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.</strong> είναι ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα, που δραστηριοποιείται στην ανάληψη και υλοποίηση ολοκληρωμένων ιδιωτικών έργων.
              </p>
            </div>

            <div className={`company-body-text reveal reveal-delay-2${isRevealed ? " visible" : ""}`}>
              <p>
                Υπό τη διοίκηση του <strong>Νικολάου Δημερά</strong>, με επαγγελματική εμπειρία στον κατασκευαστικό κλάδο από το <strong>2006</strong>, αναλαμβάνουμε έργα που απαιτούν ολοκληρωμένο τεχνικό σχεδιασμό, οργανωμένη διαχείριση συνεργείων και υπεύθυνη επίβλεψη.
              </p>
              <p>
                Από τη ριζική ανακαίνιση μιας κατοικίας μέχρι την ανακατασκευή ενός επενδυτικού κτιρίου, στόχος μας είναι η παράδοση ποιοτικών κατασκευών με σαφή προϋπολογισμό και προγραμματισμό.
              </p>
            </div>

            <div className={`company-actions reveal reveal-delay-3${isRevealed ? " visible" : ""}`}>
              <Link href="/contact" className="company-cta-btn">
                <span>Ζητήστε τεχνική αξιολόγηση και οικονομική προσφορά</span>
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Factsheet Dossier */}
          <div className={`company-dossier-col reveal reveal-delay-2${isRevealed ? " visible" : ""}`}>
            <div className="company-dossier-card">
              {/* Card Top */}
              <div className="cdc-header">
                <div className="cdc-brand">
                  <strong className="cdc-title">DN GROUP</strong>
                  <span className="cdc-legal">ΔΗΜΕΡΑΣ Ε.Ε.</span>
                </div>
                <span className="cdc-tag">ΑΠΟ ΤΟ 2006</span>
              </div>

              {/* Leadership */}
              <div className="cdc-section">
                <span className="cdc-label">ΔΙΟΙΚΗΣΗ &amp; ΤΕΧΝΙΚΗ ΕΠΙΒΛΕΨΗ</span>
                <h3 className="cdc-name">Νικόλαος Δημεράς</h3>
                <p className="cdc-desc">
                  Προσωπική επαγγελματική εμπειρία στον κατασκευαστικό κλάδο, διασφαλίζοντας τεχνική συνέπεια, οργανωμένη διαχείριση και υπεύθυνο συντονισμό σε κάθε έργο.
                </p>
              </div>

              <div className="cdc-divider" aria-hidden="true" />

              {/* Pillars */}
              <div className="cdc-section">
                <span className="cdc-label">ΒΑΣΙΚΟΙ ΤΟΜΕΙΣ ΕΡΓΩΝ</span>
                <div className="cdc-pillars">
                  <span className="cdc-pill">Κατοικίες &amp; Μονοκατοικίες</span>
                  <span className="cdc-pill">Πολυκατοικίες &amp; Κτίρια</span>
                  <span className="cdc-pill">Επενδυτικά Ακίνητα</span>
                </div>
              </div>

              <div className="cdc-divider" aria-hidden="true" />

              {/* Geo Base */}
              <div className="cdc-section">
                <span className="cdc-label">ΕΔΡΑ &amp; ΓΕΩΓΡΑΦΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ</span>
                <div className="cdc-location">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 18s-6-5.69-6-9.5A6 6 0 0116 8.5C16 12.31 10 18 10 18z" />
                    <circle cx="10" cy="8.5" r="2" />
                  </svg>
                  <span>Στρατηγού Φράγκου 26–30, Λάρισα</span>
                </div>
                <div className="cdc-scope">
                  <span>Λάρισα</span> • <span>Θεσσαλία</span> • <span>Αττική</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
