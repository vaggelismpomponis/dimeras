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

      {/* Dynamic Corner Badge / Segmented Switcher */}
      <div
        className="ba-badge-wrap ba-badge-wrap-topleft"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 7,
        }}
      >
        {activeTab === "before" ? (
          <button
            type="button"
            className="ba-badge ba-badge--before ba-badge--active"
            onClick={() => handleTabChange("slider")}
            title="Επαναφορά σύγκρισης (50/50)"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: "rgba(14, 20, 28, 0.92)",
              color: "#e2e8f0",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 6,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="ba-badge-dot ba-badge-dot--before"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#94a3b8",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(148, 163, 184, 0.6)",
              }}
              aria-hidden="true"
            />
            <span className="ba-badge-text">{beforeLabel || "ΠΡΙΝ"}</span>
            <span
              className="ba-badge-reset-hint"
              style={{ fontSize: "0.75rem", opacity: 0.6, marginLeft: 2 }}
              aria-hidden="true"
            >
              ↺
            </span>
          </button>
        ) : activeTab === "after" ? (
          <button
            type="button"
            className="ba-badge ba-badge--after ba-badge--active"
            onClick={() => handleTabChange("slider")}
            title="Επαναφορά σύγκρισης (50/50)"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 11px",
              background: "rgba(18, 22, 28, 0.92)",
              color: "#e2c97d",
              border: "1px solid rgba(201, 168, 78, 0.5)",
              borderRadius: 6,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="ba-badge-dot ba-badge-dot--after"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c9a84e",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(201, 168, 78, 0.7)",
              }}
              aria-hidden="true"
            />
            <span className="ba-badge-text">{afterLabel || "ΜΕΤΑ"}</span>
            <span
              className="ba-badge-reset-hint"
              style={{ fontSize: "0.75rem", opacity: 0.6, marginLeft: 2 }}
              aria-hidden="true"
            >
              ↺
            </span>
          </button>
        ) : (
          <div
            className="ba-badge-segmented"
            role="group"
            aria-label="Επιλογή προβολής Πριν ή Μετά"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0,
              padding: 2,
              background: "rgba(9, 13, 18, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 6,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <button
              type="button"
              className="ba-badge-seg ba-badge-seg--before"
              onClick={() => handleTabChange("before")}
              title="Προβολή Αρχικής Κατάστασης (Πριν)"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                background: "transparent",
                border: "none",
                color: "#cbd5e1",
                fontFamily: "inherit",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              <span
                className="ba-badge-dot ba-badge-dot--before"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#94a3b8",
                  display: "inline-block",
                  boxShadow: "0 0 6px rgba(148, 163, 184, 0.6)",
                }}
                aria-hidden="true"
              />
              <span>ΠΡΙΝ</span>
            </button>
            <span
              className="ba-badge-divider"
              style={{
                width: 1,
                height: 12,
                background: "rgba(255, 255, 255, 0.2)",
                margin: "0 2px",
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            <button
              type="button"
              className="ba-badge-seg ba-badge-seg--after"
              onClick={() => handleTabChange("after")}
              title="Προβολή Ολοκληρωμένου Έργου (Μετά)"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                background: "transparent",
                border: "none",
                color: "#e2c97d",
                fontFamily: "inherit",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              <span
                className="ba-badge-dot ba-badge-dot--after"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c9a84e",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(201, 168, 78, 0.7)",
                }}
                aria-hidden="true"
              />
              <span>ΜΕΤΑ</span>
            </button>
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
