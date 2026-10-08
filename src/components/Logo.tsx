import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  variant = "full",
  size = "md",
}: LogoProps) {
  const iconSizes = {
    sm: 36,
    md: 46,
    lg: 58,
  };

  const dim = iconSizes[size] || 46;

  // Proposal 1: Solid Architectural Monogram with Building Skyline Columns
  const LogoIcon = (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="brand-icon-svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        {/* Luxury Gold Gradients */}
        <linearGradient id="goldStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbf6e2" />
          <stop offset="25%" stopColor="#e5cd86" />
          <stop offset="65%" stopColor="#c9a84e" />
          <stop offset="100%" stopColor="#967428" />
        </linearGradient>

        <linearGradient id="goldCurveGrad" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#e8d292" />
          <stop offset="45%" stopColor="#c9a84e" />
          <stop offset="100%" stopColor="#82621c" />
        </linearGradient>

        <linearGradient id="goldTowerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff3d1" />
          <stop offset="30%" stopColor="#dfc57b" />
          <stop offset="100%" stopColor="#a37f2e" />
        </linearGradient>

        <linearGradient id="goldDiagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcf8e8" />
          <stop offset="40%" stopColor="#d8bc6a" />
          <stop offset="100%" stopColor="#7a5a14" />
        </linearGradient>

        <filter id="goldEmboss" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#000" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#c9a84e" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#goldEmboss)">
        {/* === Skyline Towers (Architectural Columns inside the D) === */}
        {/* Left Column */}
        <path
          d="M 54 36 L 59 31 L 59 72 L 54 72 Z"
          fill="url(#goldTowerGrad)"
          opacity="0.85"
        />
        {/* Center Tallest Column (Apex Tower) */}
        <path
          d="M 61 24 L 66 19 L 66 72 L 61 72 Z"
          fill="url(#goldTowerGrad)"
        />
        {/* Right Stepped Column */}
        <path
          d="M 68 32 L 73 27 L 73 72 L 68 72 Z"
          fill="url(#goldTowerGrad)"
          opacity="0.9"
        />
        {/* Far Right Accent Column */}
        <path
          d="M 75 42 L 79 38 L 79 72 L 75 72 Z"
          fill="url(#goldTowerGrad)"
          opacity="0.75"
        />

        {/* === Capital Letter 'D' === */}
        {/* D Left Vertical Spine */}
        <rect
          x="20"
          y="18"
          width="11"
          height="84"
          rx="1"
          fill="url(#goldStemGrad)"
        />

        {/* D Outer Curve & Horizontal Bars */}
        <path
          d="M 31 18 H 68 C 88 18 102 33 102 60 C 102 87 88 102 68 102 H 31 V 91 H 68 C 82 91 91 80 91 60 C 91 40 82 29 68 29 H 31 Z"
          fill="url(#goldCurveGrad)"
        />

        {/* === Letter 'N' (Integrated Monogram) === */}
        {/* N Left Vertical Pillar */}
        <rect
          x="39"
          y="38"
          width="9"
          height="53"
          rx="0.5"
          fill="url(#goldStemGrad)"
        />

        {/* N Diagonal Crossbar */}
        <path
          d="M 39 39 L 81 83 L 81 91 L 70 91 L 39 53 Z"
          fill="url(#goldDiagGrad)"
        />

        {/* N Right Vertical Pillar */}
        <rect
          x="73"
          y="44"
          width="9"
          height="47"
          rx="0.5"
          fill="url(#goldStemGrad)"
        />

        {/* Architectural Base Horizon Line */}
        <rect
          x="18"
          y="102"
          width="86"
          height="2.5"
          rx="1"
          fill="url(#goldStemGrad)"
          opacity="0.6"
        />
      </g>
    </svg>
  );

  if (variant === "mark") {
    return <span className={`brand-mark-wrap ${className}`}>{LogoIcon}</span>;
  }

  if (variant === "stacked") {
    return (
      <div
        className={`brand-stacked ${className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "12px",
        }}
      >
        {LogoIcon}
        <div>
          <strong
            style={{
              display: "block",
              fontSize: "1.2rem",
              letterSpacing: "0.22em",
              fontWeight: 800,
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            DN <span style={{ color: "var(--gold)" }}>GROUP</span>
          </strong>
          <small
            style={{
              display: "block",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              color: "var(--gold-light)",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ
          </small>
        </div>
      </div>
    );
  }

  // Default: Horizontal Lockup (for Header & Footer)
  return (
    <div
      className={`brand-lockup ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      {LogoIcon}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <strong
          style={{
            display: "block",
            fontSize: "1.05rem",
            letterSpacing: "0.2em",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          DN <span style={{ color: "var(--gold)" }}>GROUP</span>
        </strong>
        <small
          style={{
            display: "block",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: "3px",
            lineHeight: 1.1,
          }}
        >
          ΔΗΜΕΡΑΣ <span style={{ color: "var(--gold)", opacity: 0.75 }}>|</span> ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ
        </small>
      </div>
    </div>
  );
}
