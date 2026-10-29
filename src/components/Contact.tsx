"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./contact/ContactForm";
import ContactDetailsPanel from "./contact/ContactDetailsPanel";
import ContactMap from "./contact/ContactMap";

interface ContactProps {
  standalone?: boolean;
}

export default function Contact({ standalone = false }: ContactProps) {
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
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── STANDALONE layout (/contact page) ────────────────── */
  if (standalone) {
    return (
      <section className="contact-standalone-page" id="contact" ref={sectionRef}>
        {/* ROW 1: Title Left & Form Right */}
        <div className="contact-top-row">
          <div className={`contact-title-col reveal${isRevealed ? " visible" : ""}`}>
            <p className="eyebrow">ΕΠΙΚΟΙΝΩΝΙΑ</p>
            <h1>
              Έχετε ένα έργο
              <br />
              <em>στο μυαλό σας;</em>
            </h1>
            <p className="contact-title-sub">
              Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας σύντομα για αυτοψία και αναλυτική προσφορά.
            </p>

            <div className="contact-highlights">
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Άμεση ανταπόκριση</strong>
                  <small>Επικοινωνία εντός 24 ωρών</small>
                </div>
              </div>
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Δωρεάν αυτοψία</strong>
                  <small>Επιτόπια εκτίμηση στο χώρο σας</small>
                </div>
              </div>
              <div className="contact-highlight-item">
                <span className="ch-icon">✓</span>
                <div>
                  <strong>Γραπτή προσφορά</strong>
                  <small>Αναλυτικός προϋπολογισμός και χρονοδιάγραμμα</small>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card (Top Right) */}
          <div className={`reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
            <ContactForm idPrefix="sa" />
          </div>
        </div>

        {/* ROW 2: Contact Details Left & Google Map Right */}
        <div className="contact-bottom-row">
          <div className={`reveal${isRevealed ? " visible" : ""}`}>
            <ContactDetailsPanel />
          </div>
          <div className={`reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
            <ContactMap />
          </div>
        </div>
      </section>
    );
  }

  /* ── EMBEDDED layout (homepage section) ───────────────────── */
  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className={`contact-info reveal${isRevealed ? " visible" : ""}`}>
        <h2>Έχετε ένα έργο στο μυαλό σας;</h2>
        <p>
          Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας για αυτοψία και αναλυτική προσφορά.
        </p>
      </div>

      <div className={`reveal reveal-delay-1${isRevealed ? " visible" : ""}`}>
        <ContactForm idPrefix="home" />
      </div>
    </section>
  );
}
