import React from "react";
import {
  PATH_D_SPINE_AND_CURVE,
  PATH_D_TOP_LEFT_FACET,
  PATH_N_RIGHT_PILLAR,
  PATH_N_TOP_RIGHT_FACET,
  PATH_N_BOTTOM_RIGHT_FACET,
  PATH_N_DIAG_AND_LEFT_PILLAR,
  PATH_DN_OVERLAP_FACET,
} from "./logo/logoPaths";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export default function Logo({
  className = "",
  variant = "full",
  size = "md",
  light = false,
}: LogoProps) {
  const iconDimensions = {
    sm: { h: 32, w: 52 },
    md: { h: 40, w: 65 },
    lg: { h: 50, w: 81 },
  };

  const { h, w } = iconDimensions[size] || iconDimensions.md;
  const primaryFill = light ? "#0C1120" : "#FFFFFF";
  const idPrefix = light ? "logo-lt" : "logo-dk";

  // Official DN Monogram Icon (completely transparent background)
  const LogoIcon = (
    <svg
      width={w}
      height={h}
      viewBox="365 180 455 282"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="brand-icon-svg"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block" }}
    >
      <defs>
        <linearGradient
          id={`${idPrefix}-goldFacet`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#fdf5da" />
          <stop offset="30%" stopColor="#e5cb80" />
          <stop offset="70%" stopColor="#c9a84e" />
          <stop offset="100%" stopColor="#9a7725" />
        </linearGradient>

        <filter
          id={`${idPrefix}-markGlow`}
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity={light ? "0.15" : "0.4"}
          />
          {!light && (
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="#c9a84e"
              floodOpacity="0.25"
            />
          )}
        </filter>
      </defs>

      <g filter={`url(#${idPrefix}-markGlow)`}>
        {/* Main Monogram Letter Forms (D & N) */}
        <path fill={primaryFill} d={PATH_D_SPINE_AND_CURVE} />
        <path fill={primaryFill} d={PATH_N_RIGHT_PILLAR} />
        <path fill={primaryFill} d={PATH_N_DIAG_AND_LEFT_PILLAR} />

        {/* Official Gold Geometric Facets */}
        <path fill={`url(#${idPrefix}-goldFacet)`} d={PATH_D_TOP_LEFT_FACET} />
        <path fill={`url(#${idPrefix}-goldFacet)`} d={PATH_N_TOP_RIGHT_FACET} />
        <path fill={`url(#${idPrefix}-goldFacet)`} d={PATH_N_BOTTOM_RIGHT_FACET} />
        <path fill={`url(#${idPrefix}-goldFacet)`} d={PATH_DN_OVERLAP_FACET} />
      </g>
    </svg>
  );

  if (variant === "mark") {
    return (
      <span
        className={`brand-mark-wrap ${className}`}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {LogoIcon}
      </span>
    );
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
          gap: "8px",
        }}
      >
        {LogoIcon}
        <div>
          <strong
            style={{
              display: "block",
              fontSize: size === "sm" ? "1.02rem" : size === "lg" ? "1.42rem" : "1.2rem",
              letterSpacing: "0.22em",
              fontWeight: 800,
              color: primaryFill,
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "var(--gold)" }}>GROUP</span>
          </strong>
          <small
            style={{
              display: "block",
              fontSize: size === "sm" ? "0.58rem" : size === "lg" ? "0.74rem" : "0.64rem",
              letterSpacing: "0.2em",
              color: light ? "var(--gold)" : "var(--gold-light)",
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

  // Default: Horizontal Lockup (Monogram on left, Brand Name next to it on right)
  return (
    <div
      className={`brand-lockup ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "12px" : "14px",
      }}
    >
      {LogoIcon}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <strong
          style={{
            display: "block",
            fontSize: size === "sm" ? "0.98rem" : size === "lg" ? "1.32rem" : "1.12rem",
            letterSpacing: "0.2em",
            fontWeight: 800,
            color: primaryFill,
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--gold)" }}>GROUP</span>
        </strong>
        <small
          style={{
            display: "block",
            fontSize: size === "sm" ? "0.56rem" : size === "lg" ? "0.72rem" : "0.62rem",
            letterSpacing: "0.2em",
            color: light ? "var(--text-dark-secondary)" : "var(--text-secondary)",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: "3px",
            lineHeight: 1.1,
          }}
        >
          ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ
        </small>
      </div>
    </div>
  );
}
