"use client";

import React, { useEffect, useRef, useState } from "react";

export interface SectionIntroProps {
  number: string;
  label: string;
  title: string | string[];
  description: string;
  align?: "center" | "left" | "right" | "editorial";
  accentColor?: "cyan" | "sky" | "violet" | "emerald";
  className?: string;
}

export function SectionIntro({
  number,
  label,
  title,
  description,
  align = "left",
  accentColor = "cyan",
  className = "",
}: SectionIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger enter animation once the previous section has scrolled away and ended.
    // -22% bottom rootMargin ensures the header is 22% above the bottom viewport edge
    // before triggering, so the prior section is completely off center-stage.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsEntered(true);
        } else if (entry.boundingClientRect.top > (window.innerHeight || 800) * 0.85) {
          // Reset when scrolling back up above the section
          setIsEntered(false);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleLines = Array.isArray(title) ? title : [title];

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
    <div
      ref={containerRef}
      className={`flex flex-col justify-center py-6 sm:py-10 select-none relative ${className}`}
    >
      {/* Subtle Radial Spatial Glow behind Header */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center -z-10 bg-radial ${glowRadialClass} via-transparent to-transparent transition-all duration-1000 ease-out`}
        style={{
          opacity: isEntered ? 0.35 : 0,
          transform: isEntered ? "scale(1)" : "scale(0.85)",
        }}
      />

      <div className={`max-w-5xl flex flex-col ${alignmentContainer}`}>
        {/* Stage 01: Section Number & Category Badge */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out will-change-transform ${
            isEntered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-medium uppercase shadow-sm transition-all duration-700 ${accentBadge} ${
              isEntered ? "tracking-wider" : "tracking-widest"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${accentPulse}`} />
            <span>
              {number} / {label}
            </span>
          </div>
          <div
            className={`h-px hidden sm:block transition-all duration-700 delay-150 ${dividerColor} ${
              isEntered ? "w-10 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <span
            className={`text-xs font-mono text-zinc-500 uppercase hidden sm:inline transition-all duration-700 delay-150 ${
              isEntered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            SYSTEM DOMAIN
          </span>
        </div>

        {/* Stage 02: Monumental Traveling Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none mb-6 will-change-transform">
          {titleLines.map((line, idx) => (
            <span
              key={idx}
              className="block transition-all duration-700 will-change-transform"
              style={{
                transitionDelay: isEntered ? `${120 + idx * 90}ms` : "0ms",
                transform: isEntered
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 36px, 0) scale(0.96)",
                opacity: isEntered ? 1 : 0,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* Stage 03: Editorial Subheading Gateway */}
        <p
          className={`text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-2xl transition-all duration-700 ease-out will-change-transform ${descriptionAlignment}`}
          style={{
            transitionDelay: isEntered ? "280ms" : "0ms",
            transform: isEntered
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 24px, 0)",
            opacity: isEntered ? 1 : 0,
          }}
        >
          {description}
        </p>

        {/* Stage 04: Subtle Spatial Indicator */}
        <div
          className={`mt-10 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest transition-all duration-700 ease-out will-change-transform`}
          style={{
            transitionDelay: isEntered ? "420ms" : "0ms",
            transform: isEntered
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 16px, 0)",
            opacity: isEntered ? 1 : 0,
          }}
        >
          <span className={`w-1 h-1 rounded-full ${accentPulse}`} />
          <span>SCROLL TO ENTER ENVIRONMENT</span>
        </div>
      </div>
    </div>
  );
}
