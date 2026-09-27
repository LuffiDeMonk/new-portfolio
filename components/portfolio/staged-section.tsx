"use client";

import React, { useEffect, useRef, useState } from "react";

export interface StagedSectionProps {
  id: string;
  number: string;
  label: string;
  title: string | string[];
  description: string;
  align?: "center" | "left" | "right";
  accentColor?: "cyan" | "sky" | "violet" | "emerald";
  className?: string;
  containerHeight?: string;
  children: React.ReactNode;
}

export function StagedSection({
  id,
  number,
  label,
  title,
  description,
  align = "left",
  accentColor = "cyan",
  className = "",
  containerHeight = "240vh",
  children,
}: StagedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contentOverflow, setContentOverflow] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateMeasurements = () => {
      if (contentRef.current) {
        const h = contentRef.current.offsetHeight;
        const availableH = window.innerHeight - 130;
        setContentOverflow(Math.max(0, h - availableH));
      }
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const el = sectionRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const totalScrollable = el.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const scrolled = -rect.top;
              const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
              setScrollProgress(p);
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const titleLines = Array.isArray(title) ? title : [title];

  // -------------------------------------------------------------
  // Phase 1: Header Gradually Appears (0.00 to 0.16)
  // As previous section ends, new section header enters and settles
  // -------------------------------------------------------------
  const headerEnterRatio = Math.min(1, Math.max(0, scrollProgress / 0.14));

  // -------------------------------------------------------------
  // Phase 2: Header Disappears on Further Scroll (0.24 to 0.40)
  // Header smoothly floats up and fades out
  // -------------------------------------------------------------
  const headerExitRatio = Math.min(1, Math.max(0, (scrollProgress - 0.24) / 0.16));

  const headerOpacity = headerEnterRatio * Math.max(0, 1 - headerExitRatio);
  const headerTranslateY = (1 - headerEnterRatio) * 36 - headerExitRatio * 48;
  const headerScale = 0.95 + headerEnterRatio * 0.05 - headerExitRatio * 0.04;
  const isHeaderVisible = scrollProgress < 0.42;

  // -------------------------------------------------------------
  // Phase 3: Cards Become Visible (0.36 to 0.88)
  // Cards glide into view as header vanishes and take center stage
  // -------------------------------------------------------------
  const cardsEnterRatio = Math.min(1, Math.max(0, (scrollProgress - 0.36) / 0.16));
  const isCardsVisible = scrollProgress > 0.32;

  // -------------------------------------------------------------
  // Phase 4: Section Exit Kinematics (0.88 to 1.00)
  // Whole section smoothly softens and recedes before next section
  // -------------------------------------------------------------
  const sectionExitRatio = Math.min(1, Math.max(0, (scrollProgress - 0.88) / 0.12));
  const sectionOpacity = 1 - sectionExitRatio * 0.85;
  const sectionScale = 1 - sectionExitRatio * 0.03;

  // Content vertical scroll offset if cards height exceeds viewport:
  const browseProgress = Math.min(1, Math.max(0, (scrollProgress - 0.52) / 0.34));
  const contentScrollY = -browseProgress * contentOverflow;

  const cardsOpacity = cardsEnterRatio;
  const cardsTranslateY = (1 - cardsEnterRatio) * 44 + contentScrollY;
  const cardsScale = 0.96 + cardsEnterRatio * 0.04;

  // Alignment classes
  const alignmentContainer =
    align === "center"
      ? "text-center items-center mx-auto"
      : align === "right"
      ? "text-right items-end ml-auto"
      : "text-left items-start";

  const descriptionAlignment =
    align === "center"
      ? "mx-auto"
      : align === "right"
      ? "ml-auto"
      : "";

  // Accent color tokens
  const accentBadge =
    accentColor === "sky"
      ? "text-sky-400 bg-sky-950/40 border-sky-400/20"
      : accentColor === "violet"
      ? "text-violet-400 bg-violet-950/40 border-violet-400/20"
      : accentColor === "emerald"
      ? "text-emerald-400 bg-emerald-950/40 border-emerald-400/20"
      : "text-cyan-400 bg-cyan-950/40 border-cyan-400/20";

  const accentPulse =
    accentColor === "sky"
      ? "bg-sky-400"
      : accentColor === "violet"
      ? "bg-violet-400"
      : accentColor === "emerald"
      ? "bg-emerald-400"
      : "bg-cyan-400";

  const dividerColor =
    accentColor === "sky"
      ? "bg-sky-400/40"
      : accentColor === "violet"
      ? "bg-violet-400/40"
      : accentColor === "emerald"
      ? "bg-emerald-400/40"
      : "bg-cyan-400/40";

  const glowRadialClass =
    accentColor === "sky"
      ? "from-sky-500/20"
      : accentColor === "violet"
      ? "from-violet-500/20"
      : accentColor === "emerald"
      ? "from-emerald-500/20"
      : "from-cyan-500/20";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative z-10 ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky 100vh Viewport Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 select-none will-change-transform"
        style={{
          opacity: sectionOpacity,
          transform: `scale(${sectionScale})`,
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center -z-10 bg-radial ${glowRadialClass} via-transparent to-transparent transition-opacity duration-700`}
          style={{
            opacity: isHeaderVisible ? headerOpacity * 0.3 : cardsOpacity * 0.15,
          }}
        />

        {/* ======================================================== */}
        {/* STAGE 1: SECTION HEADER (Gradually Appears, Then Fades)   */}
        {/* ======================================================== */}
        {isHeaderVisible && (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20 pointer-events-none will-change-transform"
            style={{
              opacity: headerOpacity,
              transform: `translate3d(0, ${headerTranslateY}px, 0) scale(${headerScale})`,
              display: headerOpacity <= 0 ? "none" : "flex",
            }}
          >
            <div className={`max-w-4xl mx-auto flex flex-col ${alignmentContainer}`}>
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium tracking-wider uppercase shadow-sm ${accentBadge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${accentPulse}`} />
                  <span>
                    {number} / {label}
                  </span>
                </div>
                <div className={`h-px w-10 hidden sm:block ${dividerColor}`} />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
                  SYSTEM DOMAIN
                </span>
              </div>

              {/* Massive Editorial Headline */}
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none mb-6">
                {titleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              {/* Editorial Subheading */}
              <p
                className={`text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-2xl ${descriptionAlignment}`}
              >
                {description}
              </p>

              {/* Spatial Indicator */}
              <div className="mt-10 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <span className={`w-1 h-1 rounded-full ${accentPulse}`} />
                <span>SCROLL TO ENTER ENVIRONMENT</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: CARDS PRESENTATION (Appears on Further Scroll)   */}
        {/* ======================================================== */}
        {isCardsVisible && (
          <div
            ref={contentRef}
            className="w-full max-w-7xl mx-auto z-10 will-change-transform"
            style={{
              opacity: cardsOpacity,
              transform: `translate3d(0, ${cardsTranslateY}px, 0) scale(${cardsScale})`,
              pointerEvents: cardsOpacity < 0.3 ? "none" : "auto",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
