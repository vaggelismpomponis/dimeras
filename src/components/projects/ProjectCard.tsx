"use client";

import Link from "next/link";
import { Project } from "@/data/projectsData";
import BeforeAfterSlider from "../BeforeAfterSlider";

interface ProjectCardProps {
  project: Project;
  index: number;
  isRevealed: boolean;
  onOpenGallery: (project: Project, mode: "slider" | "gallery") => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Νέες Κατασκευές": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 42h36" />
      <path d="M10 42V18l14-10 14 10v24" />
      <path d="M20 42V30h8v12" />
      <path d="M18 22h2v2h-2zM28 22h2v2h-2z" />
    </svg>
  ),
  "Ανακαινίσεις Κατοικιών": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 42V20l16-12 16 12v22H8z" />
      <path d="M20 42V32h8v10" />
      <path d="M32 8h6v8" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  ),
  "Ανακαινίσεις Επενδυτικών Ακινήτων": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 42h36" />
      <path d="M10 42V14h16v28" />
      <path d="M26 22h12v20" />
      <path d="M16 20h4v4h-4zM16 28h4v4h-4zM30 28h4v4h-4z" />
    </svg>
  ),
  "Ανακαινίσεις": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 42V20l16-12 16 12v22H8z" />
      <path d="M20 42V32h8v10" />
      <path d="M32 8h6v8" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  ),
  "Τεχνικά Έργα": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l20-12 20 12" />
      <path d="M8 22v14c0 2 4 6 16 6s16-4 16-6V22" />
      <path d="M44 20v16" />
      <circle cx="44" cy="38" r="2" />
    </svg>
  ),
};

export default function ProjectCard({
  project,
  index,
  isRevealed,
  onOpenGallery,
}: ProjectCardProps) {
  const hasBA = project.hasBeforeAfter && project.beforeAfter;

  return (
    <article
      className={`project-card reveal reveal-delay-${Math.min((index % 3) + 1, 4)}${
        isRevealed ? " visible" : ""
      } ${hasBA ? "project-card--has-ba" : ""}`}
    >
      {/* Top Accent Line */}
      <div className="project-card-topline" aria-hidden="true" />

      {/* Card Media Area */}
      <div className="project-card-image">
        {hasBA && project.beforeAfter ? (
          <BeforeAfterSlider
            beforeSrc={project.beforeAfter.before}
            afterSrc={project.beforeAfter.after}
            beforeLabel={project.beforeAfter.beforeLabel || "ΠΡΙΝ"}
            afterLabel={project.beforeAfter.afterLabel || "ΜΕΤΑ"}
            alt={project.title}
            showQuickPills={true}
            onOpenGallery={() => onOpenGallery(project, "gallery")}
          />
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onClick={() => project.gallery.length > 0 && onOpenGallery(project, "gallery")}
            style={{ cursor: project.gallery.length > 0 ? "pointer" : "default" }}
          />
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

        {!hasBA && <div className="project-card-category">{project.category}</div>}

        {hasBA && (
          <button
            type="button"
            className="project-card-ba-pill"
            onClick={() => onOpenGallery(project, "gallery")}
            title="Προβολή όλων των φωτογραφιών"
          >
            {project.gallery.length} Φωτογραφίες (Πριν &amp; Μετά)
          </button>
        )}
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
        <p className="project-card-subtitle">{project.subtitle}</p>
        <p className="project-card-desc">{project.description}</p>

        {/* Scope highlight badge */}
        <div className="project-card-scope">
          <strong>Αντικείμενο:</strong> {project.scope}
        </div>

        <div className="project-card-footer">
          {project.gallery.length > 0 ? (
            <button
              type="button"
              className="project-card-gallery-btn"
              onClick={() => onOpenGallery(project, "gallery")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Όλες οι φωτογραφίες ({project.gallery.length})</span>
            </button>
          ) : null}

          <Link href="/contact" className="project-card-cta">
            Επικοινωνία για το έργο
          </Link>
        </div>
      </div>
    </article>
  );
}

