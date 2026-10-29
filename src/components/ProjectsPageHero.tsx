"use client";

import Link from "next/link";

export default function ProjectsPageHero() {
  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects-gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="ph-section" aria-label="Τα Έργα μας DN GROUP">
      {/* Breadcrumbs */}
      <nav className="ph-breadcrumbs" aria-label="Πλοήγηση">
        <Link href="/">Αρχική</Link>
        <span className="ph-crumb-sep">/</span>
        <span className="ph-crumb-current">Έργα</span>
      </nav>

      {/* Heading — the heading is the design */}
      <div className="ph-heading-block">
        <h1 className="ph-title">
          Δουλειά που
          <em>μιλάει μόνη της.</em>
        </h1>
      </div>

      <hr className="ph-rule" aria-hidden="true" />

      {/* Context strip */}
      <div className="ph-context">
        <p className="ph-desc">
          Επιλεγμένα έργα από το χαρτοφυλάκιό μας με διαδραστική σύγκριση{" "}
          <strong>Πριν &amp; Μετά</strong> — ριζικές ανακαινίσεις κτιρίων,
          σύγχρονες οικιστικές παρεμβάσεις και τεχνικά έργα σε Λάρισα και
          Θεσσαλία από την <strong>DN GROUP</strong>.
        </p>
        <div className="ph-actions">
          <a
            href="#projects-gallery"
            onClick={scrollToGallery}
            className="ph-btn-primary"
          >
            Προβολή Έργων
          </a>
          <Link href="/contact" className="ph-btn-ghost">
            Ζητήστε Προσφορά
          </Link>
        </div>
      </div>
    </section>
  );
}
