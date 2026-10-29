"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ContactForm from "./contact/ContactForm";
import { PhoneIcon, EmailIcon, LocationIcon, ClockIcon } from "./contact/ContactIcons";

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.04 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const r = (delay?: string) =>
    `cp-reveal${vis ? " cp-visible" : ""}${delay ? ` cp-d${delay}` : ""}`;

  return (
    <main className="cp-page" ref={ref}>
      {/* ── Blueprint grid overlay ──────────────────────────── */}
      <div className="cp-grid-overlay" aria-hidden="true" />

      {/* ── TOP STRIP — breadcrumb + eyebrow ────────────────── */}
      <div className="cp-topstrip">
        <nav className="cp-breadcrumbs" aria-label="Πλοήγηση">
          <Link href="/">Αρχική</Link>
          <span className="cp-sep" aria-hidden="true">/</span>
          <span className="cp-crumb-active">Επικοινωνία</span>
        </nav>
      </div>

      {/* ── HERO HEADING BLOCK ───────────────────────────────── */}
      <div className={`cp-hero-block ${r()}`}>
        <h1 className="cp-title">
          Έχετε ένα έργο
          <em>στο μυαλό σας;</em>
        </h1>
      </div>

      <hr className="cp-divider" aria-hidden="true" />

      {/* ── MAIN GRID — Form + Info ──────────────────────────── */}
      <div className="cp-body">

        {/* LEFT: Form column */}
        <div className={`cp-form-col ${r("1")}`}>
          <ContactForm idPrefix="pg" />
        </div>

        {/* RIGHT: Info sidebar */}
        <aside className={`cp-sidebar ${r("2")}`}>

          {/* Intro paragraph */}
          <p className="cp-sidebar-intro">
            Περιγράψτε μας το έργο σας και θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για αυτοψία και αναλυτική γραπτή προσφορά.
          </p>

          {/* Contact details */}
          <div className="cp-details">
            <div className="cp-detail-item">
              <span className="cp-detail-icon"><PhoneIcon /></span>
              <div>
                <small>ΤΗΛΕΦΩΝΟ</small>
                <a href="tel:+306981772698">698 177 2698</a>
              </div>
            </div>

            <div className="cp-detail-item">
              <span className="cp-detail-icon"><EmailIcon /></span>
              <div>
                <small>EMAIL</small>
                <a href="mailto:info@dimeras.gr">info@dimeras.gr</a>
              </div>
            </div>

            <div className="cp-detail-item">
              <span className="cp-detail-icon"><LocationIcon /></span>
              <div>
                <small>ΕΔΡΑ</small>
                <a
                  href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Στρατηγού Φράγκου 26–30<br />Λάρισα 41222
                </a>
              </div>
            </div>

            <div className="cp-detail-item">
              <span className="cp-detail-icon"><ClockIcon /></span>
              <div>
                <small>ΩΡΑΡΙΟ</small>
                <span>Δευτ – Παρ&thinsp;•&thinsp;08:00 – 18:00</span>
              </div>
            </div>
          </div>


        </aside>
      </div>

      {/* ── MAP ROW ──────────────────────────────────────────── */}
      <div className={`cp-map-row ${r("3")}`}>
        <div className="cp-map-label">
          <LocationIcon />
          <span>Τοποθεσία και έδρα — Λάρισα</span>
          <a
            className="cp-map-link"
            href="https://maps.google.com/?q=Στρατηγού+Φράγκου+26-30,+Λάρισα"
            target="_blank"
            rel="noopener noreferrer"
          >
            Οδηγίες
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
            </svg>
          </a>
        </div>
        <div className="cp-map-frame">
          <iframe
            src="https://maps.google.com/maps?q=Στρατηγού+Φράγκου+26-30,+Λάρισα&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Τοποθεσία DN GROUP στους Χάρτες Google"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}

