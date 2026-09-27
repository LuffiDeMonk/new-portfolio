"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Radio, Sparkles, ArrowDown } from "lucide-react";
import { TelemetryVisualizer } from "./telemetry-visualizer";
import { ModerationDemo } from "./moderation-demo";
import { BentoCard } from "./bento-card";
import { ProjectModal, ProjectDetail } from "./project-modal";

const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: "launchpad",
    number: "01",
    category: "SaaS PLATFORM",
    title: "Launchpad",
    subtitle: "Campaign management and creator workflows.",
    description:
      "Comprehensive developer deployment command center featuring real-time cluster telemetry, automated preview environments, and instant rollback controls.",
    problem:
      "Synchronizing live build logs via WebSockets without triggering render thrashing in the React reconciliation tree.",
    solution:
      "Architected a buffered virtualized frame buffer with worker-thread parsing and TanStack Query optimistic cache sync.",
    features: [
      "Sub-50ms UI update cycle for heavy streaming pipelines with 5,000+ line logs",
      "Zero-downtime blue/green deployment orchestration and rollback triggers",
      "Real-time Kubernetes pod cluster health telemetry and latency visualization",
      "Automated ephemeral staging environments for active pull requests",
    ],
    technologies: ["React", "Next.js", "TypeScript", "TanStack Query", "Tailwind CSS", "WebSockets"],
    role: "Lead Frontend Engineer — Architecture, State Design, & Telemetry UI",
    accentColor: "cyan",
  },
  {
    id: "veel-moderator",
    number: "02",
    category: "INTERNAL TOOLING",
    title: "Veel Moderator",
    subtitle: "Creator moderation and content workflows.",
    description:
      "High-velocity content moderation engine handling hundreds of real-time multimedia flags, automated risk tagging, and dispute resolution workflows.",
    problem:
      "Building instantaneous keyboard shortcuts and optimistic mutation updates to process 60+ queues per moderator per hour without state desync.",
    solution:
      "Designed an optimistic event-driven UI pipeline with instant rollback capability, local queue caching, and dual-pane review.",
    features: [
      "38% decrease in resolution turnaround with zero desync anomalies",
      "Universal keyboard shortcuts ([J] reject, [K] approve, [Space] preview)",
      "Real-time video scrubber with automated timestamp flag markers",
      "Audit trail integration and multi-tier escalation routing",
    ],
    technologies: ["React", "Vite", "TanStack Query", "Radix UI", "Optimistic UI", "Tailwind CSS"],
    role: "Senior Frontend Engineer — Workflow Optimization & Component Primitives",
    accentColor: "sky",
  },
  {
    id: "vendor-dashboard",
    number: "03",
    category: "ANALYTICS ENGINE",
    title: "Vendor Dashboard",
    subtitle: "Data-driven vendor analytics.",
    description:
      "Enterprise merchant portal delivering live inventory forecasting, automated settlement reconciliations, and multi-currency payout processing.",
    problem:
      "Rendering virtualized tables with 20,000+ SKU line items while maintaining instant client-side filtering, aggregation, and export.",
    solution:
      "Integrated TanStack Table with virtualized windowing, memoized multi-dimensional column filters, and Web Worker CSV exporters.",
    features: [
      "60 FPS scrolling fidelity on low-spec hardware without memory leaks",
      "Instant multi-currency conversion and automated invoice reconciliation",
      "High-density financial summary ledger with dispute mitigation triggers",
      "Custom SVG charting abstractions for revenue forecasting",
    ],
    technologies: ["Next.js", "GraphQL", "TanStack Table", "Nivo", "Zustand", "Tailwind CSS"],
    role: "Frontend Engineer — Data Visualization & Virtualized Tables",
    accentColor: "violet",
  },
  {
    id: "unified-event-platform",
    number: "04",
    category: "EVENT ENGINE",
    title: "Unified Event Platform",
    subtitle: "A unified system for event, ticketing, and payment workflows.",
    description:
      "Interactive conference and experiential platform integrating low-latency live streaming, collaborative break-out sessions, and attendee networking.",
    problem:
      "Synchronizing live poll state across 10,000 concurrent browser nodes with sub-second feedback aggregation.",
    solution:
      "Engineered a hybrid WebRTC/WebSocket data broadcast mesh with distributed Redis pub/sub backplane and optimistic client updates.",
    features: [
      "Zero service drops across 4 global tech summits with 10k+ attendees",
      "Sub-second interactive polling and live Q&A moderation channels",
      "Tiered ticketing checkout flow with dynamic seat map selection",
      "Integrated Stripe webhook reconciliation for international currencies",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "WebRTC", "Tailwind CSS", "Redis"],
    role: "Fullstack / Frontend Engineer — Live Interaction & Checkout Flows",
    accentColor: "emerald",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entryProgress, setEntryProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || 800;
            const totalScrollable = el.offsetHeight - windowHeight;
            if (totalScrollable > 0) {
              // 1. Entry progress as Projects approaches the viewport top right after Experience ends
              const rawEntry = (windowHeight - rect.top) / windowHeight;
              const entry = Math.min(Math.max(rawEntry, 0), 1);
              setEntryProgress(entry);

              // 2. Pinned scroll progress once top reaches 0
              const scrolled = -rect.top;
              const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------------------------------------------------
  // PHASE 01: PARALLAX SLIDE-IN KINEMATICS (Header Entrance & Presentation)
  // Seamlessly catches scroll right as Experience ends and Projects arrives.
  // -------------------------------------------------------------
  // Approach ratio (from Experience exit into Projects pin)
  const approachRatio = Math.max(0, (entryProgress - 0.2) / 0.8) * 0.85;
  const pinnedRatio = Math.min(scrollProgress / 0.06, 1) * 0.15;
  const slideInRatio = Math.min(approachRatio + pinnedRatio, 1);
  const k = 1 - slideInRatio; // Remaining entrance displacement (1 -> 0)

  // Exit Kinematics (0.15 to 0.24): Header parts and slides out with parallax to reveal Bento
  const exitRatio = Math.min(Math.max((scrollProgress - 0.15) / 0.09, 0), 1);
  const isIntroVisible = scrollProgress < 0.25;

  // Active opacity of the entire intro layer
  const introActiveOpacity = Math.min(slideInRatio * 1.6, 1) * Math.max(0, 1 - exitRatio);

  // Parallax Kinematics:
  // 1. Deep Typographic Watermark (Speed factor: HIGH, Direction: Right -> Center -> Left)
  const watermarkX = k * (isMobile ? 120 : 280) - exitRatio * (isMobile ? 90 : 200);
  const watermarkOpacity = Math.min(slideInRatio * 0.05, 0.05) * Math.max(0, 1 - exitRatio);

  // 2. Eyebrow Badge (Drops in from Top-Left with Parallax)
  const badgeX = k * (isMobile ? -25 : -50) - exitRatio * 25;
  const badgeY = k * -50 - exitRatio * 35;
  const badgeOpacity = Math.min(slideInRatio * 2, 1) * Math.max(0, 1 - exitRatio);

  // 3. Headline "SELECTED" (Slides in from the LEFT with prominent parallax inertia)
  const selectedX = k * (isMobile ? -100 : -220) - exitRatio * (isMobile ? 70 : 160);
  const selectedY = k * 35 - exitRatio * 50;
  const selectedScale = 0.90 + slideInRatio * 0.10 - exitRatio * 0.06;
  const selectedLetterSpacing = k * 0.08;

  // 4. Headline "WORK" (Slides in from the RIGHT with counter-parallax velocity)
  const workX = k * (isMobile ? 100 : 220) + exitRatio * (isMobile ? 70 : 160);
  const workY = k * 50 - exitRatio * 50;
  const workScale = 0.90 + slideInRatio * 0.10 - exitRatio * 0.06;
  const workLetterSpacing = k * 0.08;

  // 5. Spatial Beam Divider (Expands horizontally as words converge)
  const beamScaleX = slideInRatio * Math.max(0, 1 - exitRatio);
  const beamY = k * 20 - exitRatio * 25;
  const beamOpacity = Math.min(slideInRatio * 1.5, 1) * Math.max(0, 1 - exitRatio);

  // 6. Editorial Subtitle (Rises with trailing parallax inertia)
  const subX = k * (isMobile ? -15 : -30) - exitRatio * 20;
  const subY = k * 55 - exitRatio * 45;
  const subOpacity = Math.max(0, (slideInRatio - 0.25) / 0.75) * Math.max(0, 1 - exitRatio);

  // 7. Scroll Action Prompt (Floats up from bottom)
  const promptY = k * 45 - exitRatio * 35;
  const promptOpacity = Math.max(0, (slideInRatio - 0.45) / 0.55) * Math.max(0, 1 - exitRatio);

  // -------------------------------------------------------------
  // Phase 02: Bento Assembly Calculations (0.24 to 0.46)
  // Inner section animation starts smoothly as header slides away
  // -------------------------------------------------------------
  const assemblyRatio = Math.min(Math.max((scrollProgress - 0.24) / 0.22, 0), 1);
  const bentoGridOpacity =
    scrollProgress < 0.23
      ? 0
      : scrollProgress > 0.85
      ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
      : Math.min(1, (scrollProgress - 0.23) / 0.08);

  // -------------------------------------------------------------
  // Phase 03: Up/Down Parallax Calculations (0.46 to 0.85)
  // -------------------------------------------------------------
  const parallaxProgress = Math.min(Math.max((scrollProgress - 0.46) / 0.39, 0), 1);
  const centeredP = parallaxProgress - 0.5; // -0.5 to +0.5

  // Parallax scale multiplier for mobile devices
  const parallaxScale = isMobile ? 0.35 : 1.0;

  // Individual card displacements:
  // Assembly component: starts offset from top/bottom and moves into place as assemblyRatio -> 1
  // Parallax component: independent vertical up/down float as centeredP moves
  const card1Y =
    (1 - assemblyRatio) * -90 * parallaxScale +
    assemblyRatio * centeredP * -50 * parallaxScale; // Project 01: Moves UP ~50px
  const card2Y =
    (1 - assemblyRatio) * 100 * parallaxScale +
    assemblyRatio * centeredP * 35 * parallaxScale; // Project 02: Moves DOWN ~35px
  const card3Y =
    (1 - assemblyRatio) * -80 * parallaxScale +
    assemblyRatio * centeredP * -70 * parallaxScale; // Project 03: Moves UP ~70px
  const card4Y =
    (1 - assemblyRatio) * 90 * parallaxScale +
    assemblyRatio * centeredP * 45 * parallaxScale; // Project 04: Moves DOWN ~45px

  // -------------------------------------------------------------
  // Phase 04: Transition to Process (0.85 to 1.00)
  // -------------------------------------------------------------
  const transitionProgress = Math.min(Math.max((scrollProgress - 0.85) / 0.15, 0), 1);

  // Current active phase label for telemetry HUD
  const activePhase =
    scrollProgress < 0.15
      ? "PHASE 01: INTRODUCTION"
      : scrollProgress < 0.24
      ? "PHASE 01: SETTLING"
      : scrollProgress < 0.46
      ? "PHASE 02: BENTO ASSEMBLY"
      : scrollProgress < 0.85
      ? "PHASE 03: UP/DOWN PARALLAX"
      : "PHASE 04: PIPELINE CONVERGENCE";

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 bg-zinc-950 border-t border-white/5"
      style={{ height: "260vh" }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 lg:px-12 select-none">
        {/* Ambient Subtle Grid & Radial Aura */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-violet-950/10 opacity-50" />

        {/* -------------------------------------------------------- */}
        {/* Fixed Telemetry HUD Layer (Fades in after intro vanishes) */}
        {/* -------------------------------------------------------- */}
        <div
          className={`absolute top-20 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between transition-opacity duration-500 ${
            scrollProgress >= 0.22 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              04 / PROJECTS
            </span>
            <div className="h-px w-8 bg-cyan-400/30 hidden sm:block" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
              BENTO PARALLAX SHOWCASE
            </span>
          </div>

          {/* Phase Telemetry Badge & Mini Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{activePhase}</span>
            </div>

            <div className="w-20 sm:w-28 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* STAGE 01: PROJECT SECTION INTRODUCTION (Phase 01)        */}
        {/* Parallax Slide-in Kinematics                            */}
        {/* -------------------------------------------------------- */}
        {isIntroVisible && (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 overflow-hidden pointer-events-none select-none will-change-transform"
            style={{
              opacity: introActiveOpacity,
            }}
          >
            {/* Deep Layer: Kinetic Typographic Parallax Watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10 will-change-transform"
              style={{
                transform: `translate3d(${watermarkX}px, 0, 0)`,
                opacity: watermarkOpacity,
                transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out",
              }}
            >
              <span className="text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] font-black font-mono tracking-tighter text-white uppercase whitespace-nowrap">
                PROJECTS
              </span>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
              {/* Category Eyebrow Badge (Drops in from Top-Left with Parallax) */}
              <div
                className="will-change-transform mb-6"
                style={{
                  transform: `translate3d(${badgeX}px, ${badgeY}px, 0)`,
                  opacity: badgeOpacity,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out",
                }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/50 backdrop-blur-md text-cyan-300 text-xs font-mono font-medium tracking-widest uppercase shadow-lg shadow-cyan-950/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                  <span>04 / SELECTED WORK</span>
                </div>
              </div>

              {/* Massive Split Parallax Headline */}
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none mb-6 flex flex-col items-center overflow-visible">
                {/* Word 1: "SELECTED" - Slides in from the LEFT with prominent parallax velocity */}
                <span
                  className="block text-white will-change-transform"
                  style={{
                    transform: `translate3d(${selectedX}px, ${selectedY}px, 0) scale(${selectedScale})`,
                    letterSpacing: `${selectedLetterSpacing}em`,
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  SELECTED
                </span>

                {/* Word 2: "WORK" - Slides in from the RIGHT with counter-parallax velocity */}
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 will-change-transform"
                  style={{
                    transform: `translate3d(${workX}px, ${workY}px, 0) scale(${workScale})`,
                    letterSpacing: `${workLetterSpacing}em`,
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  WORK
                </span>
              </h2>

              {/* Horizontal Spatial Beam Expanding Between Title and Description */}
              <div
                className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-2 will-change-transform origin-center"
                style={{
                  width: isMobile ? "180px" : "280px",
                  transform: `translate3d(0, ${beamY}px, 0) scaleX(${beamScaleX})`,
                  opacity: beamOpacity,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out",
                }}
              />

              {/* Editorial Subheading with Trailing Parallax Drift */}
              <p
                className="text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8 will-change-transform"
                style={{
                  transform: `translate3d(${subX}px, ${subY}px, 0)`,
                  opacity: subOpacity,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out",
                }}
              >
                Production interfaces, scalable UI systems, and product experiences built across modern web applications.
              </p>

              {/* Interactive Parallax Action Prompt */}
              <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest will-change-transform shadow-md"
                style={{
                  transform: `translate3d(0, ${promptY}px, 0)`,
                  opacity: promptOpacity,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-zinc-300">SCROLL TO ASSEMBLE BENTO GALLERY</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* STAGE 02: BENTO PROJECT REVEAL + PARALLAX SHOWCASE       */}
        {/* -------------------------------------------------------- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto transition-opacity duration-500 will-change-transform pt-12 sm:pt-14 max-h-full overflow-y-auto sm:overflow-visible py-4 sm:py-0"
          style={{
            opacity: bentoGridOpacity,
            pointerEvents: scrollProgress >= 0.23 && scrollProgress <= 0.95 ? "auto" : "none",
          }}
        >
          {/* Asymmetric Bento Grid Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* ==================================================== */}
            {/* PROJECT 01: LARGE FEATURE CARD (Launchpad)           */}
            {/* Desktop: 7 columns, Depth 1, Parallax: Moves UP     */}
            {/* ==================================================== */}
            <BentoCard
              number="01"
              category={PROJECTS_DATA[0].category}
              title={PROJECTS_DATA[0].title}
              subtitle={PROJECTS_DATA[0].subtitle}
              technologies={PROJECTS_DATA[0].technologies.slice(0, 4)}
              accentColor="cyan"
              parallaxY={card1Y}
              className="col-span-1 md:col-span-2 lg:col-span-7 min-h-80"
              onExpand={() => setSelectedProject(PROJECTS_DATA[0])}
            >
              <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-xl">
                {/* Browser Chrome Header */}
                <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/50 text-zinc-400 text-xs border border-white/5 truncate max-w-xs">
                    https://launchpad.engine/clusters/prod-eu
                  </div>
                  <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>LIVE REPL</span>
                  </div>
                </div>

                {/* Dashboard Cluster Telemetry */}
                <div className="p-4 space-y-3 bg-gradient-to-b from-zinc-950 to-zinc-900/90">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-500 block text-xs">Active Pods</span>
                      <span className="text-white font-bold block text-sm sm:text-base">48 / 48</span>
                      <span className="text-emerald-400 text-xs font-mono">100% HEALTH</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-500 block text-xs">Avg Latency</span>
                      <span className="text-cyan-400 font-bold block text-sm sm:text-base">14.2 ms</span>
                      <span className="text-cyan-300 text-xs font-mono">-3.4ms prev</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-zinc-500 block text-xs">Memory Pool</span>
                      <span className="text-violet-400 font-bold block text-sm sm:text-base">62.8%</span>
                      <span className="text-zinc-400 text-xs font-mono">4.2GB Buffer</span>
                    </div>
                  </div>

                  {/* Streaming Visualizer */}
                  <TelemetryVisualizer />
                </div>
              </div>
            </BentoCard>

            {/* ==================================================== */}
            {/* PROJECT 02: TALL CARD (Veel Moderator)               */}
            {/* Desktop: 5 columns, Depth 2, Parallax: Moves DOWN   */}
            {/* ==================================================== */}
            <BentoCard
              number="02"
              category={PROJECTS_DATA[1].category}
              title={PROJECTS_DATA[1].title}
              subtitle={PROJECTS_DATA[1].subtitle}
              technologies={PROJECTS_DATA[1].technologies.slice(0, 4)}
              accentColor="sky"
              parallaxY={card2Y}
              className="col-span-1 md:col-span-1 lg:col-span-5 min-h-80"
              onExpand={() => setSelectedProject(PROJECTS_DATA[1])}
            >
              <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-xl">
                {/* Moderation Chrome Header */}
                <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/50 text-zinc-400 text-xs border border-white/5">
                    veel://moderation/queue-89241
                  </div>
                  <div className="text-xs text-amber-400 font-semibold">PRIORITY: HIGH</div>
                </div>

                {/* Moderation Interactive Canvas */}
                <ModerationDemo />
              </div>
            </BentoCard>

            {/* ==================================================== */}
            {/* PROJECT 03: COMPACT CARD (Vendor Dashboard)          */}
            {/* Desktop: 4 columns, Depth 3, Parallax: Moves UP     */}
            {/* ==================================================== */}
            <BentoCard
              number="03"
              category={PROJECTS_DATA[2].category}
              title={PROJECTS_DATA[2].title}
              subtitle={PROJECTS_DATA[2].subtitle}
              technologies={PROJECTS_DATA[2].technologies.slice(0, 3)}
              accentColor="violet"
              parallaxY={card3Y}
              className="col-span-1 md:col-span-1 lg:col-span-4 min-h-72"
              onExpand={() => setSelectedProject(PROJECTS_DATA[2])}
            >
              <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/5 pb-2">
                  <span>SETTLED RECONCILIATION</span>
                  <span className="text-emerald-400 font-semibold">$214.8K</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-zinc-500 block text-xs">TOTAL VOLUME</span>
                    <span className="text-white font-bold block text-sm">$842,910</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-zinc-500 block text-xs">ACTIVE SKUs</span>
                    <span className="text-cyan-400 font-bold block text-sm">14,204</span>
                  </div>
                </div>

                {/* Financial Ledger Mini Rows */}
                <div className="space-y-1.5 pt-1 text-xs font-mono">
                  <div className="flex justify-between items-center px-2.5 py-1.5 rounded bg-white/5 border border-white/5">
                    <span className="text-zinc-300">#TXN-90184</span>
                    <span className="text-emerald-400 font-medium">+$12,450.00</span>
                  </div>
                  <div className="flex justify-between items-center px-2.5 py-1.5 rounded bg-white/5 border border-white/5">
                    <span className="text-zinc-300">#TXN-90185</span>
                    <span className="text-emerald-400 font-medium">+$4,210.50</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* ==================================================== */}
            {/* PROJECT 04: WIDE FEATURE CARD (Unified Event Platform)*/}
            {/* Desktop: 8 columns, Depth 1, Parallax: Moves DOWN   */}
            {/* ==================================================== */}
            <BentoCard
              number="04"
              category={PROJECTS_DATA[3].category}
              title={PROJECTS_DATA[3].title}
              subtitle={PROJECTS_DATA[3].subtitle}
              technologies={PROJECTS_DATA[3].technologies.slice(0, 4)}
              accentColor="emerald"
              parallaxY={card4Y}
              className="col-span-1 md:col-span-2 lg:col-span-8 min-h-72"
              onExpand={() => setSelectedProject(PROJECTS_DATA[3])}
            >
              <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-xl p-4 sm:p-5">
                <div className="aspect-video w-full rounded-xl bg-black border border-white/10 flex flex-col justify-between p-3 sm:p-4 relative overflow-hidden">
                  <div className="flex justify-between items-center z-10 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>● LIVE 4K</span>
                    </span>
                    <span className="text-zinc-400">BITRATE: 12.4 Mbps</span>
                  </div>

                  <div className="my-auto text-center z-10 py-2">
                    <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      KEYNOTE: THE FUTURE OF REACT RUNTIMES
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">Main Stage Broadcast · Amsterdam Hub</p>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400 z-10 border-t border-white/10 pt-2">
                    <span>AUDIO: STEREO 48kHz</span>
                    <span className="text-cyan-400">8,490 ATTENDEES CONNECTED</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* PHASE 04: TRANSITION TO PROCESS GATEWAY (0.85 to 1.00)   */}
        {/* -------------------------------------------------------- */}
        {scrollProgress > 0.82 && (
          <div
            className="absolute bottom-8 inset-x-0 z-30 flex justify-center items-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: transitionProgress }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/90 border border-cyan-400/40 text-xs font-mono text-zinc-200 shadow-xl backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 font-semibold tracking-wider">
                PIPELINE CONVERGENCE
              </span>
              <span className="text-zinc-400">→</span>
              <span className="text-zinc-300">05 / HOW I BUILD</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Case Study Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
