"use client";

import Link from "next/link";

export default function ServicesPageHero() {
  return (
    <section className="ph-section" aria-label="Υπηρεσίες DN GROUP">
      {/* Breadcrumbs */}
      <nav className="ph-breadcrumbs" aria-label="Πλοήγηση">
        <Link href="/">Αρχική</Link>
        <span className="ph-crumb-sep">/</span>
        <span className="ph-crumb-current">Υπηρεσίες</span>
      </nav>

      {/* Heading — the heading is the design */}
      <div className="ph-heading-block">
        <h1 className="ph-title">
          Ολοκληρωμένα ιδιωτικά
          <em>κατασκευαστικά έργα.</em>
        </h1>
      </div>

      <hr className="ph-rule" aria-hidden="true" />

      {/* Context strip */}
      <div className="ph-context">
        <p className="ph-desc">
          Ριζικές ανακαινίσεις κατοικιών, ανακατασκευές κτιρίων, επενδυτικά
          ακίνητα και ανέγερση νέων κτιρίων υπό τη διοίκηση του{" "}
          <strong>Νικολάου Δημερά</strong>, με επαγγελματική επίβλεψη, σαφές
          χρονοδιάγραμμα και εγγυημένο προϋπολογισμό.
        </p>
        <div className="ph-actions">
          <Link href="/contact" className="ph-btn-primary">
            Ζητήστε Προσφορά
          </Link>
          <Link href="/projects" className="ph-btn-ghost">
            Δείτε τα Έργα μας
          </Link>
        </div>
      </div>
    </section>
  );
}
