"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export interface BentoCardProps {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  technologies: string[];
  accentColor?: "cyan" | "sky" | "violet" | "emerald";
  parallaxY: number;
  className?: string;
  onExpand: () => void;
  children: React.ReactNode;
}

export function BentoCard({
  number,
  category,
  title,
  subtitle,
  technologies,
  accentColor = "cyan",
  parallaxY,
  className = "",
  onExpand,
  children,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
  };

  // Subtle pointer perspective calculations
  const tiltX = (mousePos.y - 50) * -0.04;
  const tiltY = (mousePos.x - 50) * 0.04;
  const floatX = (mousePos.x - 50) * 0.08;
  const floatY = (mousePos.y - 50) * 0.08;

  // Accent styling tokens
  const accentBadge =
    accentColor === "sky"
      ? "text-sky-400 bg-sky-950/40 border-sky-400/30"
      : accentColor === "violet"
      ? "text-violet-400 bg-violet-950/40 border-violet-400/30"
      : accentColor === "emerald"
      ? "text-emerald-400 bg-emerald-950/40 border-emerald-400/30"
      : "text-cyan-400 bg-cyan-950/40 border-cyan-400/30";

  const accentBorderHover =
    accentColor === "sky"
      ? "hover:border-sky-400/50"
      : accentColor === "violet"
      ? "hover:border-violet-400/50"
      : accentColor === "emerald"
      ? "hover:border-emerald-400/50"
      : "hover:border-cyan-400/50";

  const spotlightColor =
    accentColor === "sky"
      ? "rgba(56, 189, 248, 0.12)"
      : accentColor === "violet"
      ? "rgba(168, 85, 247, 0.12)"
      : accentColor === "emerald"
      ? "rgba(52, 211, 153, 0.12)"
      : "rgba(34, 211, 238, 0.12)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      tabIndex={0}
      role="button"
      aria-label={`View ${title} case study`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      className={`group relative rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 ${accentBorderHover} p-5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${className}`}
      style={{
        transform: `translate3d(0, ${parallaxY}px, 0) perspective(1000px) rotateX(${
          isHovered ? tiltX : 0
        }deg) rotateY(${isHovered ? tiltY : 0}deg)`,
        transition: isHovered
          ? "border-color 300ms ease, box-shadow 300ms ease"
          : "transform 400ms ease-out, border-color 300ms ease, box-shadow 300ms ease",
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Subtle Grid Ambient Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 opacity-40 rounded-3xl" />

      {/* Top Metadata Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase border shadow-sm ${accentBadge}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>
              {number} / {category}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors duration-200">
          <span className="hidden sm:inline tracking-wider">VIEW CASE</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>

      {/* Center UI Mockup Visual Layer with Floating Depth */}
      <div
        className="relative z-10 my-auto py-2 transition-transform duration-200 ease-out w-full"
        style={{
          transform: isHovered
            ? `translate3d(${floatX}px, ${floatY}px, 0)`
            : "translate3d(0, 0, 0)",
        }}
      >
        {children}
      </div>

      {/* Bottom Information Stack */}
      <div className="relative z-10 pt-4 mt-2 border-t border-white/5">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors uppercase">
            {title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-3 line-clamp-2">
          {subtitle}
        </p>

        {/* Technologies Badge List */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono tracking-wider">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5 group-hover:border-white/10 group-hover:text-zinc-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
