"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Code,
  Cpu,
  Layers,
  Sparkles,
  Workflow,
  Radio,
  BarChart2,
  Terminal,
} from "lucide-react";

export type TransitionType =
  | "hero-about"
  | "about-skills"
  | "skills-experience"
  | "experience-projects"
  | "projects-process"
  | "process-code"
  | "code-metrics"
  | "metrics-contact";

export interface SectionTransitionBridgeProps {
  type: TransitionType;
  className?: string;
}

export function SectionTransitionBridge({
  type,
  className = "",
}: SectionTransitionBridgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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
            // Bridge activates as it travels from bottom (0.95) to mid-screen (0.35)
            const start = windowHeight * 0.95;
            const end = windowHeight * 0.35;
            const range = start - end;
            const p = Math.max(0, Math.min(1, (start - rect.top) / range));
            setProgress(p);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shared kinematic variables
  const opacity = Math.min(Math.max(progress * 1.5, 0), 1);
  const scale = 0.94 + progress * 0.06;
  const translateY = (1 - progress) * 30;

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 sm:py-16 overflow-hidden select-none z-10 flex flex-col items-center justify-center ${className}`}
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        willChange: "transform, opacity",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO → ABOUT: Typography compresses, vertical energy guides rise */}
      {/* ------------------------------------------------------------------ */}
      {type === "hero-about" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-6 w-full justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-xs font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SPATIAL CONDUIT · HERO TO IDENTITY</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>

          {/* Upward Ascending Energy Streams */}
          <div className="flex justify-center items-center gap-12 mt-6">
            <div className="flex flex-col items-center gap-1">
              <span className="w-1 h-8 bg-gradient-to-b from-transparent to-cyan-400/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-ping" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                DISCOVERING SYSTEM IDENTITY
              </div>
              <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-1 h-8 bg-gradient-to-b from-transparent to-cyan-400/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-ping" />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 2. ABOUT → SKILLS: Identity panels dissolve into technology network */}
      {/* ------------------------------------------------------------------ */}
      {type === "about-skills" && (
        <div className="max-w-5xl w-full mx-auto px-6 flex flex-col items-center">
          {/* Node Constellation Visualizer */}
          <div className="flex items-center justify-between w-full max-w-2xl py-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>NODE: ARCHITECTURE</span>
            </div>
            <div className="h-px flex-1 mx-3 bg-gradient-to-r from-cyan-400/40 via-sky-400/40 to-violet-400/40 border-t border-dashed border-cyan-400/30" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>NODE: SYSTEMS</span>
            </div>
            <div className="h-px flex-1 mx-3 bg-gradient-to-r from-sky-400/40 via-violet-400/40 to-cyan-400/40 border-t border-dashed border-violet-400/30" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>NODE: RUNTIME</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>IDENTITY MATRIX EXPANDING INTO TECHNOLOGY SYSTEM</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. SKILLS → EXPERIENCE: Technology nodes re-align into timeline rail*/}
      {/* ------------------------------------------------------------------ */}
      {type === "skills-experience" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          {/* Horizontal Timeline Track Preview */}
          <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-300 font-semibold uppercase">
                01: COMPONENT ARCHITECTURE
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-1 mx-6">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-400/50 via-sky-400/50 to-violet-400/50 relative overflow-hidden">
                <div
                  className="h-full bg-white origin-left transition-transform duration-200"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span>HORIZONTAL TIMELINE INITIALIZING</span>
              <span className="w-2 h-2 rounded-full bg-violet-400" />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. EXPERIENCE → PROJECTS: Timeline fragments into Bento UI pieces  */}
      {/* ------------------------------------------------------------------ */}
      {type === "experience-projects" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-cyan-400/20 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>UI FRAGMENT 01</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-sky-400/20 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>TELEMETRY MESH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-violet-400/20 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>WORKFLOW ENGINE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-emerald-400/20 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>BROADCAST HUB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>TRAVERSING TIMELINE → ASSEMBLING BENTO WORKSPACE</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. PROJECTS → PROCESS: Bento cards separate into architectural pipeline*/}
      {/* ------------------------------------------------------------------ */}
      {type === "projects-process" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-400/30 text-xs font-mono text-cyan-300">
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              <span>PIPELINE CONVERGENCE: SPECIFICATION → RUNTIME</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>

          <div className="mt-3 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            DISSECTING SYSTEM ARCHITECTURE &amp; METHODOLOGY
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. PROCESS → CODE: Pipeline converges into central code IDE window */}
      {/* ------------------------------------------------------------------ */}
      {type === "process-code" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-xl p-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span className="text-white font-semibold">KERNEL.TS</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <span>&lt;InterfaceSpecification /&gt;</span>
              <span className="text-cyan-400 font-bold">● LIVE</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>METHODOLOGY TRANSFORMING INTO STRICT TYPESCRIPT RUNTIME</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. CODE → METRICS: Code syntax streams morph into telemetry dials  */}
      {/* ------------------------------------------------------------------ */}
      {type === "code-metrics" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-violet-400/30 text-xs font-mono text-violet-300">
              <BarChart2 className="w-3.5 h-3.5 text-violet-400" />
              <span>QUANTIFYING METRICS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-white font-bold">100%</span>
              <span>TYPE COVERAGE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-cyan-400 font-bold">60 FPS</span>
              <span>RENDER BUDGET</span>
            </div>
          </div>

          <div className="mt-3 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            SYNTAX EVAPORATING INTO EMPIRICAL MEASUREMENTS
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. METRICS → CONTACT: Telemetry charts calm into deep space beacon */}
      {/* ------------------------------------------------------------------ */}
      {type === "metrics-contact" && (
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest text-center">
              TELEMETRY RESOLVED · SYSTEM READY FOR ENGAGEMENT
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-cyan-400/40 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
