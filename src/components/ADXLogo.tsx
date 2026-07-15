import React from "react";

export function ADXLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 450 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ADX Logo"
    >
      {/* A - Left Chevron shape, colored in vibrant Primary Blue (#1072FB) */}
      <path
        d="M 103 48 L 33 118 H 66 L 119 65 L 149 95 H 200 L 119 14 H 103 Z"
        fill="#1072FB"
      />
      
      {/* D - Center shape, colored in pristine White (#FFFFFF) */}
      <path
        d="M 152 14 H 260 C 293 14 315 28 315 54 C 315 80 293 95 260 95 H 127 L 143 118 H 260 C 310 118 348 93 348 54 C 348 15 310 14 260 14"
        fill="#FFFFFF"
        transform="translate(-10, 0)"
      />
      <path
        d="M 165 48 H 255 C 265 48 274 53 274 62 C 274 71 265 76 255 76 H 193 L 165 48 Z"
        fill="#FFFFFF"
        transform="translate(-10, 0)"
      />

      {/* X - Right intersecting legs. Top leg is blue, bottom is white, creating premium convergence */}
      {/* Blue diagonal from center-top to right-bottom */}
      <path
        d="M 320 85 L 345 54 L 406 14 H 425 Z"
        fill="#1072FB"
        transform="translate(-25, 0)"
      />
      <path
        d="M 345 54 L 420 118 H 388 L 332 70 Z"
        fill="#FFFFFF"
        transform="translate(-25, 0)"
      />
      {/* Blue diagonal top-right to bottom-left */}
      <path
        d="M 406 14 L 320 118 H 352 L 425 25 V 14 H 406 Z"
        fill="#1072FB"
        transform="translate(-25, 0)"
      />
      {/* White diagonal bottom-left to top-right */}
      <path
        d="M 320 118 L 375 50 L 400 75 L 350 118 H 320 Z"
        fill="#FFFFFF"
        transform="translate(-25, 0)"
      />
    </svg>
  );
}
