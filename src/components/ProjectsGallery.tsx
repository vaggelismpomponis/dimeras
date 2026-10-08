"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

const categoryIcons: Record<string, React.ReactNode> = {
  "Νέες Κατασκευές": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 42h36" />
      <path d="M10 42V18l14-10 14 10v24" />
      <path d="M20 42V30h8v12" />
      <path d="M18 22h2v2h-2zM28 22h2v2h-2z" />
    </svg>
  ),
  "Ανακαινίσεις": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 42V20l16-12 16 12v22H8z" />
      <path d="M20 42V32h8v10" />
      <path d="M32 8h6v8" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  ),
  "Τεχνικά Έργα": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l20-12 20 12" />
      <path d="M8 22v14c0 2 4 6 16 6s16-4 16-6V22" />
      <path d="M44 20v16" />
      <circle cx="44" cy="38" r="2" />
    </svg>
  ),
};

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
      <div className={`projects-filters-wrap reveal${isRevealed ? " visible" : ""}`}>
        <div className="projects-filters">
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
      </div>

      {/* Gallery Grid */}
      <div className="projects-grid">
        {filtered.map((project, i) => (
          <article
            key={project.id}
            className={`project-card reveal reveal-delay-${Math.min(i % 3 + 1, 4)}${isRevealed ? " visible" : ""}`}
          >
            {/* Top Accent Line */}
            <div className="project-card-topline" aria-hidden="true" />

            {/* Photo / Blueprint Canvas Area */}
            <div className="project-card-image">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} loading="lazy" />
              ) : (
                <div className="project-card-blueprint" aria-hidden="true">
                  <div className="pcb-grid-pattern" />
                  <span className="pcb-mark pcb-mark-tl">+</span>
                  <span className="pcb-mark pcb-mark-tr">+</span>
                  <span className="pcb-mark pcb-mark-bl">+</span>
                  <span className="pcb-mark pcb-mark-br">+</span>
                  <div className="pcb-center">
                    <div className="pcb-icon-wrap">
                      {categoryIcons[project.category] || categoryIcons["Νέες Κατασκευές"]}
                    </div>
                    <span className="pcb-coord">DN GROUP • ΑΡΧΕΙΟ ΕΡΓΟΥ</span>
                  </div>
                </div>
              )}
              <div className="project-card-category">{project.category}</div>
            </div>

            {/* Content */}
            <div className="project-card-body">
              <div className="project-card-meta">
                <span className="project-card-location">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 18s-6-5.69-6-9.5A6 6 0 0116 8.5C16 12.31 10 18 10 18z" />
                    <circle cx="10" cy="8.5" r="2" />
                  </svg>
                  {project.location}
                </span>
                <span className="project-card-year">{project.year}</span>
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-footer">
                <Link href="/contact" className="project-card-cta">
                  <span>Επικοινωνία για το έργο</span>
                  <span className="pca-arrow" aria-hidden="true">➔</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
