"use client";

import { projectCategories, ProjectCategory } from "@/data/projectsData";

interface ProjectFilterBarProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  isRevealed: boolean;
}

export default function ProjectFilterBar({
  activeCategory,
  onSelectCategory,
  isRevealed,
}: ProjectFilterBarProps) {
  return (
    <div className={`projects-filters-wrap reveal${isRevealed ? " visible" : ""}`}>
      <div className="projects-filters" role="tablist" aria-label="Φίλτρο έργων">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => onSelectCategory(cat)}
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
