"use client";

import { ProjectPhoto } from "@/data/projectsData";

interface GalleryPhotoViewerProps {
  photos: ProjectPhoto[];
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryPhotoViewer({
  photos,
  currentIndex,
  onSelectIndex,
  onNext,
  onPrev,
}: GalleryPhotoViewerProps) {
  if (photos.length === 0) {
    return (
      <div className="pgm-empty">
        <p>Δεν υπάρχουν φωτογραφίες σε αυτή την κατηγορία.</p>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="pgm-photo-view">
      {/* Main Photo Display */}
      <div className="pgm-main-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentPhoto.src}
          alt={currentPhoto.title}
          className="pgm-main-image"
        />

        {/* Badge: Πριν / Μετά */}
        <span className={`pgm-photo-badge pgm-photo-badge--${currentPhoto.type}`}>
          {currentPhoto.type === "after" ? "ΜΕΤΑ • ΟΛΟΚΛΗΡΩΣΗ" : "ΠΡΙΝ • ΑΡΧΙΚΗ ΚΑΤΑΣΤΑΣΗ"}
        </span>

        {/* Counter */}
        <span className="pgm-counter">
          {currentIndex + 1} / {photos.length}
        </span>

        {/* Nav Arrows */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="pgm-nav-arrow pgm-nav-arrow--prev"
              onClick={onPrev}
              aria-label="Προηγούμενη φωτογραφία"
            >
              ‹
            </button>
            <button
              type="button"
              className="pgm-nav-arrow pgm-nav-arrow--next"
              onClick={onNext}
              aria-label="Επόμενη φωτογραφία"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="pgm-caption">
        <strong>{currentPhoto.title}</strong>
      </div>

      {/* Thumbnail Strip */}
      {photos.length > 1 && (
        <div className="pgm-thumbnails">
          {photos.map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              className={`pgm-thumb ${i === currentIndex ? "active" : ""}`}
              onClick={() => onSelectIndex(i)}
              aria-label={`Προβολή φωτογραφίας ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt="" loading="lazy" />
              <span className={`pgm-thumb-badge pgm-thumb-badge--${photo.type}`}>
                {photo.type === "after" ? "Μετά" : "Πριν"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
