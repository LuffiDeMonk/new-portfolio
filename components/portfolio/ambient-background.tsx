import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Upper Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-sky-500/10 rounded-full blur-3xl" />
      {/* Mid Right Violet Glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      {/* Lower Left Cyan Glow */}
      <div className="absolute bottom-10 -left-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      
      {/* Subtle Coordinate Grid Texture using native SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="portfolio-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portfolio-grid)" />
      </svg>
    </div>
  );
}
