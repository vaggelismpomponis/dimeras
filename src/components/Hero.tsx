"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background image */}
      <div className="hero-bg">
        <Image
          src="/images/hero-construction.png"
          alt="Σύγχρονο κτίριο υπό κατασκευή — DN GROUP"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
          quality={85}
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        {/* Company name — not ALL CAPS, not tracked-out eyebrow */}
        <p className="hero-kicker">DN GROUP · Δημερά&nbsp;Ε.Ε.</p>

        <h1 className="hero-title">
          Ριζικές Ανακαινίσεις
          <em>και Ολοκληρωμένα Έργα.</em>
        </h1>

        <p className="hero-copy">
          Ανεξάρτητη τεχνική και κατασκευαστική εταιρεία με έδρα τη Λάρισα,
          υπό τη διοίκηση του <strong>Νικολάου Δημερά</strong>. Αναλαμβάνουμε
          ολοκληρωμένα ιδιωτικά κατασκευαστικά έργα με εμπειρία στον κλάδο από
          το <strong>2006</strong> σε{" "}
          <strong>Λάρισα, Θεσσαλία και Αττική</strong>.
        </p>

        <div className="hero-actions">
          <Link className="hero-btn-primary" href="/contact">
            Ζητήστε Προσφορά
          </Link>
          <Link className="hero-btn-ghost" href="/services">
            Η Εταιρεία μας
          </Link>
        </div>
      </div>

      {/* Scroll cue — single line, no animation noise */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
