"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Project data — easy to extend with real photos.
// Add an `image` field (e.g. "/images/projects/project-01.jpg")
// to each entry and the gallery will display it automatically.
// ─────────────────────────────────────────────
const categories = ["Όλα", "Νέες Κατασκευές", "Ανακαινίσεις", "Τεχνικά Έργα"];

interface Project {
  id: number;
  category: string;
  title: string;
  location: string;
  year: string;
  description: string;
  image?: string; // set when photos are available
}

const projects: Project[] = [
  {
    id: 1,
    category: "Νέες Κατασκευές",
    title: "Νεόδμητη Κατοικία",
    location: "Λάρισα",
    year: "2023",
    description: "Ολοκληρωμένη κατασκευή διώροφης κατοικίας από τη θεμελίωση έως την παράδοση.",
  },
  {
    id: 2,
    category: "Ανακαινίσεις",
    title: "Ολική Ανακαίνιση Διαμερίσματος",
    location: "Λάρισα",
    year: "2024",
    description: "Ολική ανακαίνιση 95τμ διαμερίσματος με νέα κουφώματα, δάπεδα και εγκαταστάσεις.",
  },
  {
    id: 3,
    category: "Τεχνικά Έργα",
    title: "Ανακαίνιση Σχολικής Μονάδας",
    location: "Λάρισα",
    year: "2022",
    description: "Συμμετοχή στο πρόγραμμα «Μαριέττα Γιαννάκου» — αποκατάσταση και αναβάθμιση.",
  },

  {
    id: 5,
    category: "Νέες Κατασκευές",
    title: "Πολυκατοικία 8 Διαμερισμάτων",
    location: "Λάρισα",
    year: "2021",
    description: "Κατασκευή νεόδμητης πολυκατοικίας με συντονισμό όλων των συνεργείων.",
  },
  {
    id: 6,
    category: "Ανακαινίσεις",
    title: "Ανακαίνιση Επαγγελματικού Χώρου",
    location: "Λάρισα",
    year: "2023",
    description: "Μετατροπή ισογείου σε σύγχρονο επαγγελματικό χώρο 120τμ.",
  },
  {
    id: 7,
    category: "Τεχνικά Έργα",
    title: "Αποκατάσταση Δημόσιου Κτιρίου",
    location: "Θεσσαλία",
    year: "2022",
    description: "Εκτεταμένες επισκευές και αποκατάσταση δημόσιου κτιρίου.",
  },


];

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState("Όλα");
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsRevealed(true);
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeCategory === "Όλα"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="projects-section" ref={ref}>
      {/* Filter tabs */}
      <div className={`projects-filters reveal${isRevealed ? " visible" : ""}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="projects-grid">
        {filtered.map((project, i) => (
          <article
            key={project.id}
            className={`project-card reveal reveal-delay-${Math.min(i % 4 + 1, 5)}${isRevealed ? " visible" : ""}`}
          >
            {/* Photo area */}
            <div className="project-card-image">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} loading="lazy" />
              ) : (
                <div className="project-card-placeholder" aria-hidden="true">
                  <svg viewBox="0 0 80 60" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="72" height="52" rx="3" strokeOpacity="0.3" />
                    <path d="M4 38l18-16 12 10 14-12 28 20" strokeOpacity="0.25" />
                    <circle cx="22" cy="20" r="6" strokeOpacity="0.25" />
                  </svg>
                  <span>Φωτογραφία προσεχώς</span>
                </div>
              )}
              <div className="project-card-category">{project.category}</div>
            </div>

            {/* Content */}
            <div className="project-card-body">
              <div className="project-card-meta">
                <span>{project.location}</span>
                <span className="project-card-year">{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
