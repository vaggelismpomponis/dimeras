"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Project, ProjectPhoto } from "@/data/projectsData";
import BeforeAfterSlider from "./BeforeAfterSlider";
import GalleryPhotoViewer from "./gallery/GalleryPhotoViewer";

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
  initialMode?: "slider" | "gallery";
}

export default function ProjectGalleryModal({
  project,
  onClose,
  initialMode = "slider",
}: ProjectGalleryModalProps) {
  const [activeTab, setActiveTab] = useState<"slider" | "all" | "after" | "before">(
    project?.hasBeforeAfter && initialMode === "slider" ? "slider" : "all"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const [prevProject, setPrevProject] = useState(project);

  // Sync tab and index when project prop changes during render
  if (prevProject !== project) {
    setPrevProject(project);
    setActiveTab(project?.hasBeforeAfter && initialMode === "slider" ? "slider" : "all");
    setCurrentIndex(0);
  }

  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const filteredPhotos: ProjectPhoto[] = !project
    ? []
    : activeTab === "before"
    ? project.gallery.filter((p) => p.type === "before")
    : activeTab === "after"
    ? project.gallery.filter((p) => p.type === "after")
    : project.gallery;

  const handleNext = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (activeTab !== "slider") {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, activeTab, onClose, handleNext, handlePrev]);

  if (!project) return null;

  const beforeCount = project.gallery.filter((p) => p.type === "before").length;
  const afterCount = project.gallery.filter((p) => p.type === "after").length;

  return (
    <div
      className="pgm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Φωτογραφίες έργου: ${project.title}`}
    >
      <div className="pgm-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <header className="pgm-header">
          <div className="pgm-title-wrap">
            <span className="pgm-category">{project.category} • {project.location}</span>
            <h2 className="pgm-title">{project.title}</h2>
            <p className="pgm-subtitle">{project.subtitle}</p>
          </div>

          <button
            type="button"
            className="pgm-close-btn"
            onClick={onClose}
            aria-label="Κλείσιμο παραθύρου"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Modal Tabs */}
        <div className="pgm-tabs-bar">
          <div className="pgm-tabs">
            {project.hasBeforeAfter && project.beforeAfter && (
              <button
                type="button"
                className={`pgm-tab ${activeTab === "slider" ? "active" : ""}`}
                onClick={() => setActiveTab("slider")}
              >
                <span>Σύγκριση Πριν / Μετά</span>
              </button>
            )}
            <button
              type="button"
              className={`pgm-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("all");
                setCurrentIndex(0);
              }}
            >
              <span>Όλες ({project.gallery.length})</span>
            </button>
            {afterCount > 0 && (
              <button
                type="button"
                className={`pgm-tab ${activeTab === "after" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("after");
                  setCurrentIndex(0);
                }}
              >
                <span>Μετά ({afterCount})</span>
              </button>
            )}
            {beforeCount > 0 && (
              <button
                type="button"
                className={`pgm-tab ${activeTab === "before" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("before");
                  setCurrentIndex(0);
                }}
              >
                <span>Πριν ({beforeCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="pgm-body">
          {activeTab === "slider" && project.beforeAfter ? (
            <div className="pgm-slider-view">
              <BeforeAfterSlider
                beforeSrc={project.beforeAfter.before}
                afterSrc={project.beforeAfter.after}
                beforeLabel={project.beforeAfter.beforeLabel || "ΠΡΙΝ"}
                afterLabel={project.beforeAfter.afterLabel || "ΜΕΤΑ"}
                alt={project.title}
                className="pgm-full-slider"
                showQuickPills={true}
              />
              <p className="pgm-slider-hint">
                <em>Σύρετε τη μπάρα αριστερά και δεξιά ή πατήστε τα κουμπιά για να δείτε τη μεταμόρφωση του χώρου.</em>
              </p>
            </div>
          ) : (
            <GalleryPhotoViewer
              photos={filteredPhotos}
              currentIndex={currentIndex}
              onSelectIndex={setCurrentIndex}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </div>

        {/* Modal Footer CTA */}
        <footer className="pgm-footer">
          <div className="pgm-scope-note">
            <strong>Αντικείμενο:</strong> {project.scope}
          </div>
          <Link href="/contact" className="pgm-cta-btn" onClick={onClose}>
            <span>Συζητήστε το έργο σας μαζί μας</span>
            <span aria-hidden="true">➔</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
