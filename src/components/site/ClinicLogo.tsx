import React from "react";

interface ClinicLogoProps {
  variant?: "horizontal" | "stacked" | "symbol-only";
  className?: string;
  theme?: "light" | "dark" | "inherit";
}

export function ClinicLogo({
  variant = "horizontal",
  className = "",
  theme = "inherit",
}: ClinicLogoProps) {
  // Tooth emblem with inner 'H' monogram matching the real physical clinic signage
  const Symbol = () => (
    <svg
      viewBox="0 0 48 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-emblem"
      aria-hidden="true"
    >
      {/* Outer Tooth Silhouette */}
      <path
        d="M24 6.5C18.5 3.5 10 3 6.5 8C3 13 4 20 5.5 28C7 36 10 49 14.5 50.5C17.5 51.5 19 46 20 40C21 34 22 32 24 32C26 32 27 34 28 40C29 46 30.5 51.5 33.5 50.5C38 49 41 36 42.5 28C44 20 45 13 41.5 8C38 3 29.5 3.5 24 6.5Z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner 'H' Architectural Monogram */}
      <path
        d="M16 16.5V31.5M32 16.5V31.5M16 24H32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Subtle top crown accent */}
      <path
        d="M21 7.5C22.5 8.2 25.5 8.2 27 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === "symbol-only") {
    return (
      <span className={`clinic-logo-symbol-wrapper ${className}`} data-theme={theme}>
        <Symbol />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`clinic-logo-stacked ${className}`} data-theme={theme}>
        <Symbol />
        <div className="logo-text-block">
          <span className="logo-title-dr">DR. AMEEN&apos;S</span>
          <span className="logo-title-studio">SMILE STUDIO</span>
          <span className="logo-subtitle">SOUTH KODUVALLY · KERALA</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`clinic-logo-horizontal ${className}`} data-theme={theme}>
      <Symbol />
      <div className="logo-text-block">
        <span className="logo-title-dr">DR. AMEEN&apos;S</span>
        <span className="logo-title-studio">SMILE STUDIO</span>
        <span className="logo-subtitle">MULTI SPECIALITY DENTAL CLINIC</span>
      </div>
    </div>
  );
}
