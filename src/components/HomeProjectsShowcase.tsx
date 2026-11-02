"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projectsData";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ProjectGalleryModal from "./ProjectGalleryModal";

export default function HomeProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsRevealed(true);
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const showcaseProjects = projectsData.filter((p) => p.featured && p.hasBeforeAfter);

  return (
    <section className="hps-section" ref={ref} id="showcase-projects">
      <div className="hps-container">
        {/* Section Header */}
        <div className={`hps-header reveal${isRevealed ? " visible" : ""}`}>
          <div className="hps-header-left">
            <span className="hps-eyebrow">
              ΠΡΙΝ &amp; ΜΕΤΑ • ΕΠΙΛΕΓΜΕΝΑ ΕΡΓΑ
            </span>
            <h2 className="hps-title">
              Ριζικές ανακαινίσεις που <em>μιλούν μόνες τους.</em>
            </h2>
            <p className="hps-desc">
              Δείτε τη μεταμόρφωση πραγματικών έργων της DN GROUP στη Λάρισα. Σύρετε τη μπάρα σε κάθε έργο για να συγκρίνετε την αρχική κατάσταση με το τελικό αποτέλεσμα.
            </p>
          </div>

          <div className="hps-header-right">
            <Link href="/projects" className="hps-view-all-btn">
              <span>Όλα τα Έργα &amp; Φωτογραφίες</span>
              <span className="pca-arrow" aria-hidden="true">➔</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="hps-grid">
          {showcaseProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`hps-card reveal reveal-delay-${idx + 1}${isRevealed ? " visible" : ""}`}
            >
              <div className="hps-card-media">
                {project.beforeAfter && (
                  <BeforeAfterSlider
                    beforeSrc={project.beforeAfter.before}
                    afterSrc={project.beforeAfter.after}
                    beforeLabel={project.beforeAfter.beforeLabel || "ΠΡΙΝ"}
                    afterLabel={project.beforeAfter.afterLabel || "ΜΕΤΑ"}
                    alt={project.title}
                    onOpenGallery={() => setSelectedProject(project)}
                  />
                )}
              </div>

              <div className="hps-card-body">
                <div className="hps-card-meta">
                  <span className="hps-category-badge">{project.category}</span>
                  <div className="hps-card-meta-right">
                    <span className="hps-location">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M10 18s-6-5.69-6-9.5A6 6 0 0116 8.5C16 12.31 10 18 10 18z" />
                        <circle cx="10" cy="8.5" r="2" />
                      </svg>
                      {project.location}
                    </span>
                    <span className="hps-year">{project.year}</span>
                    <span className="hps-photo-count">
                      {project.gallery.length} Φωτογραφίες
                    </span>
                  </div>
                </div>

                <h3 className="hps-card-title">{project.title}</h3>
                <p className="hps-card-subtitle">{project.subtitle}</p>
                <p className="hps-card-text">{project.description}</p>

                <div className="hps-card-actions">
                  <button
                    type="button"
                    className="hps-gallery-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Προβολή Gallery ({project.gallery.length} φωτό)</span>
                  </button>

                  <Link href="/contact" className="hps-card-cta">
                    <span>Επικοινωνία</span>
                    <span className="pca-arrow" aria-hidden="true">➔</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

