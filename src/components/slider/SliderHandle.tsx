"use client";

interface SliderHandleProps {
  currentPercent: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export default function SliderHandle({
  currentPercent,
  onMouseDown,
  onTouchStart,
}: SliderHandleProps) {
  return (
    <div
      className="ba-divider"
      style={{ left: `${currentPercent}%` }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      aria-hidden="true"
    >
      <div className="ba-divider-line" />
      <div className="ba-handle">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ba-handle-arrows"
        >
          <polyline points="15 18 9 12 15 6" />
          <polyline points="9 18 3 12 9 6" />
        </svg>
        <span className="ba-handle-bar" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ba-handle-arrows"
        >
          <polyline points="9 18 15 12 9 6" />
          <polyline points="15 18 21 12 15 6" />
        </svg>
      </div>
    </div>
  );
}

