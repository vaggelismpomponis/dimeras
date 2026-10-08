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
        <p className="eyebrow">ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ ΚΑΙ ΤΕΧΝΙΚΗ ΕΤΑΙΡΕΙΑ</p>
        <h1>
          Χτίζουμε με
          <br />
          <em>ακρίβεια.</em>
        </h1>
        <p className="hero-copy">
          Αναλαμβάνουμε την κατασκευή νεόδμητων κτιρίων από το πρώτο στάδιο έως
          την παράδοση, καθώς και ολοκληρωμένες ανακαινίσεις κατοικιών και
          επαγγελματικών χώρων.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#contact">
            Ζητήστε προσφορά
          </a>
          <a className="btn ghost" href="#services">
            Δείτε τις υπηρεσίες <span className="arrow">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}
