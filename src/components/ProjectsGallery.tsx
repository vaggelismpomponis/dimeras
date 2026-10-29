"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { projectsData, Project, ProjectCategory } from "@/data/projectsData";
import ProjectGalleryModal from "./ProjectGalleryModal";
import ProjectFilterBar from "./projects/ProjectFilterBar";
import ProjectCard from "./projects/ProjectCard";

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Όλα");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalMode, setModalMode] = useState<"slider" | "gallery">("slider");
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

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      if (activeCategory === "Όλα") return true;
      if (activeCategory === "Πριν & Μετά") return p.hasBeforeAfter;
      return p.category === activeCategory;
    });
  }, [activeCategory]);

  const openModal = (project: Project, mode: "slider" | "gallery" = "gallery") => {
    setSelectedProject(project);
    setModalMode(mode);
  };

  return (
    <section className="projects-section" ref={ref} id="projects-gallery">
      {/* Filter Tabs Bar */}
      <ProjectFilterBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isRevealed={isRevealed}
      />

      {/* Gallery Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isRevealed={isRevealed}
            onOpenGallery={openModal}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="projects-empty-state">
          <p>Δεν βρέθηκαν έργα με τα επιλεγμένα κριτήρια.</p>
          <button
            type="button"
            className="filter-btn active"
            onClick={() => setActiveCategory("Όλα")}
          >
            Επαναφορά Φίλτρων
          </button>
        </div>
      )}

      {/* Project Gallery Modal Lightbox */}
      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        initialMode={modalMode}
      />
    </section>
  );
}
