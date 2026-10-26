"use client";

import Image from "next/image";

export default function Hero() {

  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/images/hero-construction.png"
          alt="Σύγχρονο κτίριο υπό κατασκευή"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
          quality={85}
        />
      </div>
      <div className="hero-shade"></div>

      <div className="hero-content">
        <p className="eyebrow">DN GROUP – ΔΗΜΕΡΑΣ Ε.Ε.</p>
        <h1 className="hero-title-main">
          <span>Ριζικές Ανακαινίσεις</span>
          <span className="hero-title-secondary"> και <em>Ολοκληρωμένα Έργα</em></span>
        </h1>
        <div className="hero-pillars-bar" aria-label="Τομείς δραστηριότητας">
          <span className="hpb-item">Κατοικίες</span>
          <span className="hpb-dot" aria-hidden="true">•</span>
          <span className="hpb-item">Πολυκατοικίες</span>
          <span className="hpb-dot" aria-hidden="true">•</span>
          <span className="hpb-item">Επενδυτικά Κτίρια</span>
        </div>
        <p className="hero-copy">
          Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα, υπό τη διοίκηση του <strong>Νικολάου Δημερά</strong>. Αναλαμβάνουμε ολοκληρωμένα ιδιωτικά κατασκευαστικά έργα με εμπειρία στον κλάδο από το <strong>2006</strong> σε <strong>Λάρισα, Θεσσαλία και Αττική</strong>.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#contact">
            Ζητήστε προσφορά
          </a>
          <a className="btn ghost" href="#company">
            Η Εταιρεία μας <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
