"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SliderHandle from "./slider/SliderHandle";
import SliderQuickPills from "./slider/SliderQuickPills";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  initialPosition?: number;
  forcedMode?: "slider" | "before" | "after";
  className?: string;
  onOpenGallery?: () => void;
  showQuickPills?: boolean;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "ΠΡΙΝ",
  afterLabel = "ΜΕΤΑ",
  alt = "Πριν και Μετά",
  initialPosition = 50,
  forcedMode = "slider",
  className = "",
  onOpenGallery,
  showQuickPills = true,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"slider" | "before" | "after">(forcedMode);
  const [prevForcedMode, setPrevForcedMode] = useState(forcedMode);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync forcedMode changes from parent filter during render
  if (prevForcedMode !== forcedMode) {
    setPrevForcedMode(forcedMode);
    setActiveTab(forcedMode);
    if (forcedMode === "before") setSliderPos(100);
    else if (forcedMode === "after") setSliderPos(0);
    else setSliderPos(initialPosition);
  }

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
    setActiveTab("slider");
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) updatePosition(e.touches[0].clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((p) => Math.max(0, p - 5));
      setActiveTab("slider");
    } else if (e.key === "ArrowRight") {
      setSliderPos((p) => Math.min(100, p + 5));
      setActiveTab("slider");
    }
  };

  const handleTabChange = (tab: "slider" | "before" | "after") => {
    setActiveTab(tab);
    if (tab === "before") setSliderPos(100);
    else if (tab === "after") setSliderPos(0);
    else setSliderPos(50);
  };

  const currentPercent =
    activeTab === "before" ? 100 : activeTab === "after" ? 0 : sliderPos;

  return (
    <div
      ref={containerRef}
      className={`ba-slider-container ${isDragging ? "ba-dragging" : ""} ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Συγκριτικό slider Πριν και Μετά"
    >
      {/* Background: AFTER Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={`${alt} — Μετά`}
        className="ba-image ba-image-after"
        loading="lazy"
        draggable={false}
      />

      {/* Foreground: BEFORE Image */}
      <div
        className="ba-before-overlay"
        style={{ clipPath: `inset(0 ${100 - currentPercent}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={`${alt} — Πριν`}
          className="ba-image ba-image-before"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Dynamic Corner Badge */}
      <div className="ba-badge-wrap ba-badge-wrap-topleft">
        {activeTab === "before" && (
          <span className="ba-badge ba-badge-before">{beforeLabel}</span>
        )}
        {activeTab === "after" && (
          <span className="ba-badge ba-badge-after-badge">{afterLabel}</span>
        )}
        {activeTab === "slider" && (
          <div className="ba-badge-split-wrap">
            <span className="ba-badge ba-badge-before">ΠΡΙΝ</span>
            <span className="ba-badge-split-sep">|</span>
            <span className="ba-badge ba-badge-after-badge">ΜΕΤΑ</span>
          </div>
        )}
      </div>

      {/* Draggable Divider Handle */}
      {activeTab === "slider" && (
        <SliderHandle
          currentPercent={currentPercent}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      )}

      {/* Quick Switcher Pills */}
      {showQuickPills && (
        <SliderQuickPills
          activeTab={activeTab}
          onSelectTab={handleTabChange}
        />
      )}

      {/* Expand Button */}
      {onOpenGallery && (
        <button
          type="button"
          className="ba-expand-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenGallery();
          }}
          aria-label="Προβολή όλων των φωτογραφιών σε πλήρη οθόνη"
          title="Προβολή όλων των φωτογραφιών"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      )}
    </div>
  );
}
