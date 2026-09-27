"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { ArrowRight, Briefcase, Calendar, ChevronRight, Code, Layers, Sparkles } from "lucide-react";

interface ExperienceItem {
  indexStr: string;
  company: string;
  role: string;
  period: string;
  status: string;
  summary: string;
  tech: string[];
  contributions: string[];
  domain: string;
  accentColor: "cyan" | "sky" | "violet";
  themeBorder: string;
  themeText: string;
  themeBadge: string;
  bgWatermark: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    indexStr: "01",
    company: "VEEL INC.",
    role: "Frontend Engineer",
    period: "2024 — Present",
    status: "ACTIVE TENURE",
    summary:
      "Build scalable frontend experiences and reusable UI systems for production applications with strict design token parity.",
    tech: ["React", "Next.js", "TypeScript", "React Query", "Storybook", "Jest"],
    contributions: [
      "Engineered reusable component architecture preventing cross-team UI drift across enterprise dashboards",
      "Standardized data-driven interfaces with optimistic mutations, query caching, and real-time synchronization",
      "Built resilient API integration layers with automatic cache invalidation and clean error boundaries",
      "Implemented comprehensive automated Storybook and Jest regression test suites for design primitives",
      "Maintained production UI design tokens and micro-interaction libraries for core workflows",
    ],
    domain: "PRODUCTION · COMPONENT ARCHITECTURE",
    accentColor: "cyan",
    themeBorder: "border-cyan-400/30",
    themeText: "text-cyan-300",
    themeBadge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    bgWatermark: "VEEL",
  },
  {
    indexStr: "02",
    company: "SUNAI",
    role: "Frontend Engineer",
    period: "2023 — 2024",
    status: "PREVIOUS IMPACT",
    summary:
      "Architected analytics and telemetry views utilizing Next.js, TanStack Table, and Nivo charts for high-density dataset inspection.",
    tech: ["Next.js", "GraphQL", "TanStack Table", "Nivo", "Tailwind CSS"],
    contributions: [
      "Architected multi-tier vendor onboarding flows and KYC identity verification workflows",
      "Designed and delivered interactive telemetry dashboards for dense tabular and time-series data",
      "Eliminated rendering bottlenecks across dynamic multi-filter data grids with windowed virtualization",
      "Implemented enterprise authentication flows, token refresh providers, and route-level guards",
      "Integrated complex GraphQL schemas with client-side query normalization and state management",
    ],
    domain: "DATA VISUALIZATION · TELEMETRY",
    accentColor: "sky",
    themeBorder: "border-sky-400/30",
    themeText: "text-sky-300",
    themeBadge: "bg-sky-400/10 text-sky-300 border-sky-400/20",
    bgWatermark: "SUNAI",
  },
  {
    indexStr: "03",
    company: "HUNCHHA DIGITAL",
    role: "Frontend Developer Intern",
    period: "2022 — 2023",
    status: "APPRENTICESHIP",
    summary:
      "Developed responsive web interfaces, translated high-fidelity Figma specifications into clean semantic HTML/CSS and React components.",
    tech: ["React", "Frontend Development", "Responsive UI", "E-commerce Interfaces"],
    contributions: [
      "Developed responsive e-commerce catalog interfaces and product filtering workflows",
      "Translated high-fidelity design specifications into semantic, accessible, and cross-browser UI",
      "Improved performance across mobile checkout funnels and responsive layout viewports",
      "Implemented reusable UI primitives following clean separation of concerns and modern web standards",
      "Participated actively in agile team deliveries, sprint planning, and engineering code reviews",
    ],
    domain: "COMMERCE SYSTEMS · INTERFACE DEV",
    accentColor: "violet",
    themeBorder: "border-violet-400/30",
    themeText: "text-violet-300",
    themeBadge: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    bgWatermark: "HUNCHHA",
  },
];

interface ExperienceCardProps {
  exp: ExperienceItem;
  isActive: boolean;
  diff: number;
}

function ExperienceCard({ exp, isActive, diff }: ExperienceCardProps) {
  return (
    <div
      className={`w-full h-full rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden border backdrop-blur-2xl transition-colors duration-500 shadow-2xl ${
        isActive
          ? "bg-zinc-900/85 border-white/20 shadow-cyan-950/20"
          : "bg-zinc-950/70 border-white/5"
      }`}
    >
      {/* Subtle Background Watermark Layer with internal parallax */}
      <div
        className="absolute -right-6 -bottom-10 text-8xl sm:text-9xl font-black text-white/5 select-none pointer-events-none font-mono"
        style={{
          transform: `translateX(${diff * -35}px)`,
        }}
      >
        {exp.bgWatermark}
      </div>

      {/* Top Bar: Index, Status Badge, Period */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">
            {exp.indexStr}
          </span>
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-mono font-medium border ${exp.themeBadge}`}
          >
            {exp.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* Core Content Layer with Internal Parallax Shifts */}
      <div className="my-auto py-4 z-10 flex flex-col justify-center">
        {/* Company Name & Role */}
        <div
          className="transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${diff * 22}px)` }}
        >
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
            {exp.company}
          </h3>
          <div className="text-base sm:text-xl font-medium text-cyan-300 mt-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>{exp.role}</span>
          </div>
        </div>

        {/* Summary Statement */}
        <p
          className="mt-4 text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${diff * 12}px)` }}
        >
          {exp.summary}
        </p>

        {/* Responsive Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pt-6 border-t border-white/5">
          {/* Left: Technology Ecosystem */}
          <div
            className="lg:col-span-4 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${diff * 30}px)` }}
          >
            <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>TECHNOLOGY ECOSYSTEM</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:border-cyan-400/40 hover:text-white transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Key Engineering Contributions */}
          <div
            className="lg:col-span-8 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${diff * 16}px)` }}
          >
            <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>KEY CONTRIBUTIONS</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {exp.contributions.slice(0, 4).map((c, cIdx) => (
                <div key={cIdx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">▸</span>
                  <span className="leading-snug">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Bottom Footer Bar */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-zinc-500 z-10">
        <span className="uppercase">{exp.domain}</span>
        <span className="text-zinc-400">
          {exp.indexStr} / 0{EXPERIENCES.length}
        </span>
      </div>
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [, startTransition] = useTransition();

  // Screen size detection for responsive horizontal vs vertical parallax
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous vertical scroll progress listener for the pinned container
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            if (totalScroll > 0) {
              const currentScroll = -rect.top;
              const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScroll));
              setProgress(rawProgress);
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
    };
  }, []);

  // Split total scroll progress into:
  // Phase 1 (0.00 to 0.20): Introduction Header (with smooth enter animation starting after Skills ends)
  // Phase 2 (0.20 to 0.24): Visual Settling Buffer (Header is 100% vanished, cards not started)
  // Phase 3 (0.24 to 0.30): Reveal of Fixed UI & Card 01 centered at rest (no horizontal motion)
  // Phase 4 (0.30 to 0.92): Horizontal Parallax Carousel (Card 01 slides left, Card 02 enters, etc.)
  // Phase 5 (0.92 to 1.00): Section Exit Kinematics before Projects begins
  const introEnterRatio = Math.min(Math.max(progress / 0.08, 0), 1);
  const introExitRatio = Math.min(Math.max((progress - 0.16) / 0.08, 0), 1);
  const introOpacity = introEnterRatio * Math.max(0, 1 - introExitRatio);
  const introTranslateY = (1 - introEnterRatio) * 36 - introExitRatio * 60;
  const introScale = 0.94 + introEnterRatio * 0.06 - introExitRatio * 0.08;
  const isIntroVisible = progress < 0.25;

  // Reveal Card 01 and fixed UI between 0.24 and 0.30 (centered at rest, normalizedProgress = 0)
  const cardEntryRatio = Math.min(Math.max((progress - 0.24) / 0.06, 0), 1);
  const cardsContainerOpacity = cardEntryRatio;

  // Section Exit Kinematics (0.92 to 1.00): Experience unpins and fades out before Projects
  const sectionExitRatio = Math.min(Math.max((progress - 0.92) / 0.08, 0), 1);
  const sectionExitOpacity = Math.max(0, 1 - sectionExitRatio);
  const sectionExitScale = 1 - sectionExitRatio * 0.04;
  const sectionExitTranslateX = -sectionExitRatio * 60;

  // Carousel horizontal movement starts strictly at progress >= 0.30
  // (Card 01 stays stationary in center until 0.30, then begins moving left)
  const carouselProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.62));
  const normalizedProgress = carouselProgress * (EXPERIENCES.length - 1);
  const activeIndex = Math.min(
    EXPERIENCES.length - 1,
    Math.max(0, Math.round(normalizedProgress))
  );

  // Smooth scroll handler to jump directly to any experience card
  const handleJumpToExperience = (targetIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerAbsoluteTop = window.scrollY + rect.top;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = 0.3 + (targetIdx / (EXPERIENCES.length - 1)) * 0.62;
    const targetScrollY = containerAbsoluteTop + targetProgress * totalScroll;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-20"
      style={{ height: "420vh" }}
    >
      {/* Sticky 100vh Viewport Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none will-change-transform"
        style={{
          opacity: sectionExitOpacity,
          transform: `translate3d(${sectionExitTranslateX}px, 0, 0) scale(${sectionExitScale})`,
        }}
      >
        {/* Stage 01: Section Introduction Gateway Overlay */}
        {isIntroVisible && (
          <div
            className="absolute inset-0 z-40 flex items-center justify-center p-6 sm:p-12 pointer-events-none transition-transform duration-300 will-change-transform"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${introTranslateY}px, 0) scale(${introScale})`,
              display: introOpacity <= 0 ? "none" : "flex",
            }}
          >
          <div className="max-w-4xl text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-medium tracking-widest uppercase mb-6 bg-cyan-950/40 text-cyan-400 border-cyan-400/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>03 / EXPERIENCE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none mb-6">
              <span className="block">CAREER</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
                IN MOTION
              </span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-xl font-normal max-w-xl mx-auto leading-relaxed">
              Production work, engineering systems, and the problems behind the interfaces.
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SCROLL VERTICALLY TO ACTIVATE HORIZONTAL TIMELINE</span>
            </div>
          </div>
        </div>
        )}

        {/* Layer 1: Ambient Parallax Background Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Grid System */}
          <div className="absolute inset-0 bg-zinc-950 opacity-90" />
          <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-transparent" />

          {/* Abstract Themes Container tied strictly to cardsContainerOpacity */}
          <div className="absolute inset-0" style={{ opacity: cardsContainerOpacity }}>
            {/* Veel Abstract Theme: Component Architecture Wireframes */}
            <div
              className="absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-around p-16"
              style={{
                opacity: Math.max(0, 1 - Math.abs(0 - normalizedProgress) * 1.5) * 0.15,
              }}
            >
              <div className="w-80 h-96 rounded-2xl border border-cyan-400/30 flex flex-col p-6 gap-4">
                <div className="h-6 w-32 rounded bg-cyan-400/20" />
                <div className="h-4 w-full rounded bg-cyan-400/10" />
                <div className="h-4 w-48 rounded bg-cyan-400/10" />
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="h-16 rounded border border-cyan-400/20" />
                  <div className="h-16 rounded border border-cyan-400/20" />
                </div>
              </div>
              <div className="w-64 h-80 rounded-2xl border border-cyan-400/20 hidden lg:block p-6">
                <div className="h-4 w-24 rounded bg-cyan-400/20 mb-4" />
                <div className="h-32 rounded border border-dashed border-cyan-400/20" />
              </div>
            </div>

            {/* Sunai Abstract Theme: Telemetry Waveforms & Graph Vectors */}
            <div
              className="absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-center p-12"
              style={{
                opacity: Math.max(0, 1 - Math.abs(1 - normalizedProgress) * 1.5) * 0.15,
              }}
            >
              <div className="w-full max-w-4xl h-72 border-b border-l border-sky-400/30 flex items-end justify-between px-8 pb-4">
                <div className="w-8 h-24 rounded-t bg-sky-400/20 border border-sky-400/30" />
                <div className="w-8 h-44 rounded-t bg-sky-400/30 border border-sky-400/40" />
                <div className="w-8 h-32 rounded-t bg-sky-400/20 border border-sky-400/30" />
                <div className="w-8 h-56 rounded-t bg-sky-400/40 border border-sky-400/50" />
                <div className="w-8 h-40 rounded-t bg-sky-400/20 border border-sky-400/30" />
                <div className="w-8 h-64 rounded-t bg-sky-400/30 border border-sky-400/40" />
              </div>
            </div>

            {/* Hunchha Abstract Theme: Commerce Surface Contours */}
            <div
              className="absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-around p-12"
              style={{
                opacity: Math.max(0, 1 - Math.abs(2 - normalizedProgress) * 1.5) * 0.15,
              }}
            >
              <div className="w-72 h-80 rounded-3xl border border-violet-400/30 flex flex-col p-6">
                <div className="w-full h-36 rounded-xl bg-violet-400/10 border border-violet-400/20 mb-4" />
                <div className="h-4 w-36 rounded bg-violet-400/20 mb-2" />
                <div className="h-4 w-20 rounded bg-violet-400/10" />
              </div>
              <div className="w-72 h-80 rounded-3xl border border-violet-400/20 hidden lg:block p-6">
                <div className="w-full h-36 rounded-xl bg-violet-400/10 border border-violet-400/20 mb-4" />
                <div className="h-4 w-32 rounded bg-violet-400/20 mb-2" />
                <div className="h-4 w-24 rounded bg-violet-400/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Fixed Header UI Layer */}
        <header
          className="relative z-30 pt-20 px-6 sm:px-12 lg:px-20 flex flex-col gap-4"
          style={{ opacity: cardsContainerOpacity }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            {/* Left: Section Identity */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                03 / CAREER TRAJECTORY
              </span>
              <div className="h-px w-8 bg-cyan-400/40" />
              <span className="text-xs font-mono text-zinc-400 uppercase">
                HORIZONTAL PARALLAX TIMELINE
              </span>
            </div>

            {/* Center: Dynamic Trajectory Progress Indicator */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase hidden md:inline">
                EXPERIENCE
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="w-28 sm:w-48 h-1 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 origin-left transition-transform duration-100 ease-out"
                    style={{ transform: `scaleX(${Math.max(0.05, carouselProgress)})` }}
                  />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
              <span className="text-xs font-mono text-cyan-300 font-semibold">
                0{activeIndex + 1} / 0{EXPERIENCES.length}
              </span>
            </div>

            {/* Right: Active Role Metadata */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{EXPERIENCES[activeIndex].domain}</span>
            </div>
          </div>
        </header>

        {/* Layer 3: Pinned Horizontal/Vertical Parallax Carousel Canvas */}
        <div
          className="relative z-20 flex-1 flex items-center justify-center overflow-visible"
          style={{ opacity: cardsContainerOpacity }}
        >
          {EXPERIENCES.map((exp, i) => {
            const diff = i - normalizedProgress;
            const absDiff = Math.abs(diff);
            const isActive = absDiff < 0.45;
            const scale = Math.max(0.86, 1 - absDiff * 0.14);
            const opacity = Math.max(0.18, 1 - absDiff * 0.72);
            const blurAmount = Math.min(8, absDiff * 6);
            const zIndex = Math.round(30 - absDiff * 10);

            // Responsive 3D transform: horizontal on desktop, vertical parallax on mobile
            const transform = isMobile
              ? `translate3d(0, ${diff * 82}vh, 0) scale(${scale})`
              : `translate3d(${diff * 85}vw, 0, 0) scale(${scale})`;

            return (
              <div
                key={exp.indexStr}
                className="absolute flex items-center justify-center pointer-events-auto"
                style={{
                  transform,
                  opacity,
                  filter: `blur(${blurAmount}px)`,
                  zIndex,
                  width: isMobile ? "min(92vw, 440px)" : "min(86vw, 1120px)",
                  height: isMobile ? "min(72vh, 580px)" : "min(68vh, 640px)",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Large Immersive Experience Panel */}
                <ExperienceCard exp={exp} isActive={isActive} diff={diff} />
              </div>
            );
          })}
        </div>

        {/* Layer 4: Interactive Experience Selector & Navigation Dock */}
        <footer
          className="relative z-30 pb-10 px-6 sm:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ opacity: cardsContainerOpacity }}
        >
          {/* Scroll Instructions */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="hidden sm:inline">
              SCROLL VERTICALLY TO TRAVERSE HORIZONTAL TIMELINE
            </span>
            <span className="sm:hidden">SCROLL TO TRAVERSE TIMELINE</span>
          </div>

          {/* Experience Quick Selector Dock */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            {EXPERIENCES.map((exp, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={exp.indexStr}
                  type="button"
                  onClick={() => handleJumpToExperience(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-white/15 text-cyan-300 shadow-sm border border-cyan-400/40"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                  title={`Jump to ${exp.company}`}
                >
                  <span
                    className={isCurrent ? "text-cyan-400 font-bold" : "text-zinc-500"}
                  >
                    {exp.indexStr}
                  </span>
                  <span>{exp.company.replace(" INC.", "")}</span>
                </button>
              );
            })}
          </div>

          {/* Next Chapter Cue */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>NEXT: PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </div>
        </footer>
      </div>
    </section>
  );
}
