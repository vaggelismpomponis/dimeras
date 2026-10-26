import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

// Official DN Monogram paths from the updated vector artwork
const PATH_D_SPINE_AND_CURVE =
  "M369.41 184.47C392.2 184.69 414.98 184.74 437.78 184.64C453.07 184.61 469.05 184.27 484.17 185.5C517.08 188.17 551.33 201.44 574.47 225.61C598.82 251.02 617.32 286.08 616.6 322.01C615.86 358.45 604.07 390.84 577.85 416.38C553.9 439.76 522.68 454.29 489.37 457.54C472.76 459.27 455.53 458.81 438.8 458.7L369.9 458.61L369.71 253.18C392.75 253.03 415.78 253.04 438.81 253.22L439.11 398.46L468.23 398.46C491.03 398.43 515.24 398.05 532.51 380.18C559.56 352.18 557.53 290.59 530.62 263.44C509.62 242.25 467.75 245.45 439.77 246.08C439.31 246.09 438.84 246.1 438.37 246.12C416.84 246.95 390.64 246.28 368.86 246.29C368.8 237.4 368.01 189.46 369.41 184.47Z";
const PATH_D_TOP_LEFT_FACET =
  "M368.86 246.29C368.8 237.4 368.01 189.46 369.41 184.47C374.33 189.87 382.87 196.9 388.57 201.96L422.34 232.13C427.22 236.47 433.82 241.74 438.37 246.12C416.84 246.95 390.64 246.28 368.86 246.29Z";
const PATH_N_RIGHT_PILLAR =
  "M746.14 185.07C753.81 185.03 814.66 184.57 816.57 185.45L816.47 186.59L816.3 309.92C816.21 337.14 815.67 365.83 816.23 392.93C816.59 413.8 815.68 436.15 815.83 457.51C801.93 457.27 788.03 457.2 774.14 457.32C765.18 457.32 755.18 457.7 746.43 456.29C747.1 446.93 746.84 433.83 746.85 424.3L746.87 369.32L746.83 299.74C746.81 285.6 747.03 269.92 746.43 255.89C745.86 232.59 746.13 208.44 746.14 185.07Z";
const PATH_N_TOP_RIGHT_FACET =
  "M746.14 185.07C753.81 185.03 814.66 184.57 816.57 185.45L816.47 186.59C812.59 189.73 806.61 196.1 802.91 199.82L779.44 223.36C773.11 229.68 766.71 235.93 760.24 242.11C756.1 246.06 749.97 251.62 746.43 255.89C745.86 232.59 746.13 208.44 746.14 185.07Z";
const PATH_N_BOTTOM_RIGHT_FACET =
  "M746.43 456.29C769.5 434.87 793.01 414.16 816.23 392.93C816.59 413.8 815.68 436.15 815.83 457.51C801.93 457.27 788.03 457.2 774.14 457.32C765.18 457.32 755.18 457.7 746.43 456.29Z";
const PATH_N_DIAG_AND_LEFT_PILLAR =
  "M526.9 186.42C532.66 185.84 546.76 186.17 553.09 186.15L606.39 186.22C621.84 204.61 638.55 222.67 654.59 240.58L741.78 337.64L741.72 412.9C741.77 425.63 742.4 439.09 741.99 451.65C740.97 451.35 719.96 423.74 717.78 420.92C695.36 392.29 673.25 363.39 651.49 334.24C642.36 322.18 632.3 310.25 623.68 297.86C620.48 293.23 619.26 284.19 616.89 278.4C597.8 231.9 571.97 206.21 526.9 186.42Z";
const PATH_DN_OVERLAP_FACET =
  "M623.92 309.12C626.04 311.61 627.77 314.75 629.45 317.59C630.29 363.64 628.71 410.41 629.96 456.7C611.93 456.14 593.27 456.36 575.19 456.4L567.18 456.27C567.15 448.88 567.21 441.49 567.36 434.1C572.16 430.12 577.15 425.87 581.6 421.52C604.44 399.53 618.97 370.31 622.71 338.82C623.88 329.05 623.84 318.98 623.92 309.12Z";

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
        <path
          fill={`url(#${idPrefix}-goldFacet)`}
          d={PATH_D_TOP_LEFT_FACET}
        />
        <path
          fill={`url(#${idPrefix}-goldFacet)`}
          d={PATH_N_TOP_RIGHT_FACET}
        />
        <path
          fill={`url(#${idPrefix}-goldFacet)`}
          d={PATH_N_BOTTOM_RIGHT_FACET}
        />
        <path
          fill={`url(#${idPrefix}-goldFacet)`}
          d={PATH_DN_OVERLAP_FACET}
        />
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
              fontSize:
                size === "sm" ? "1.02rem" : size === "lg" ? "1.42rem" : "1.2rem",
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
              fontSize:
                size === "sm" ? "0.58rem" : size === "lg" ? "0.74rem" : "0.64rem",
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
            fontSize:
              size === "sm"
                ? "0.98rem"
                : size === "lg"
                  ? "1.32rem"
                  : "1.12rem",
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
            fontSize:
              size === "sm"
                ? "0.56rem"
                : size === "lg"
                  ? "0.72rem"
                  : "0.62rem",
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
