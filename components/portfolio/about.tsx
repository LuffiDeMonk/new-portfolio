import React from "react";
import Image from "next/image";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-20 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          number="01"
          label="ABOUT"
          title={["DIGITAL", "IDENTITY"]}
          description="An engineer focused on scalable frontend systems, product interfaces, and interaction."
          align="center"
          accentColor="cyan"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spatial Bio Statement & Staggered Competency Cards */}
        <div className="lg:col-span-7 space-y-8">
          <ProgressiveReveal delayMs={100} direction="up">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Engineering resilient user interfaces with mathematical clarity and product discipline.
            </h3>

            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
              Frontend engineer focused on building production-ready web applications, reusable component systems, data-heavy enterprise dashboards, and scalable frontend architecture. I treat codebases as living product systems where developer velocity and user fidelity are co-dependent.
            </p>
          </ProgressiveReveal>

          {/* Core Competency Matrices - Staggered progressive reveals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <ProgressiveReveal delayMs={200} direction="up">
              <div className="bg-zinc-900/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:border-cyan-400/30 hover:bg-zinc-900/80 transition-all duration-300 h-full">
                <div className="text-cyan-400 text-xs font-mono uppercase mb-2">01 / FOCUS</div>
                <h4 className="text-white font-semibold text-base mb-1">Frontend Architecture</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Modular component patterns, predictable state boundaries, and clean separation of concerns.
                </p>
              </div>
            </ProgressiveReveal>

            <ProgressiveReveal delayMs={320} direction="up">
              <div className="bg-zinc-900/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:border-sky-400/30 hover:bg-zinc-900/80 transition-all duration-300 h-full">
                <div className="text-sky-400 text-xs font-mono uppercase mb-2">02 / SYSTEMS</div>
                <h4 className="text-white font-semibold text-base mb-1">Design Systems</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Tokenized design systems, accessible WAI-ARIA primitives, and zero-drift UI consistency.
                </p>
              </div>
            </ProgressiveReveal>

            <ProgressiveReveal delayMs={440} direction="up">
              <div className="bg-zinc-900/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:border-violet-400/30 hover:bg-zinc-900/80 transition-all duration-300 h-full">
                <div className="text-violet-400 text-xs font-mono uppercase mb-2">03 / PERFORMANCE</div>
                <h4 className="text-white font-semibold text-base mb-1">Runtime Speed</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Hydration optimization, code-splitting strategies, sub-100ms render metrics, and bundle profiling.
                </p>
              </div>
            </ProgressiveReveal>
          </div>
        </div>

        {/* Right Column: Identity Card & Telemetry Radar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ProgressiveReveal delayMs={250} direction="scale">
            <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden group">
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/20 transition-all" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-400/40 bg-zinc-800 shadow-md">
                    <Image
                      src="/portfolio.png"
                      alt="Prabhat Thapa"
                      fill
                      sizes="48px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Prabhat Thapa</h3>
                    <span className="text-xs text-zinc-400 font-mono">Frontend Engineer</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ACTIVE FOR HIRES
                </span>
              </div>

              {/* Spatial Geometry Graphic */}
              <div className="py-6 flex justify-center items-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Concentric Rotating Engineering Rings */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/40 animate-pulse" />
                  <div className="absolute inset-8 rounded-full border border-violet-500/30" />

                  {/* Core Hub */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/20 shadow-2xl flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                    <span className="text-xs font-mono text-cyan-400">ENGINEER</span>
                    <span className="text-xs font-bold text-white tracking-wider">v1.0.4</span>
                  </div>
                </div>
              </div>

              {/* Quantitative Baseline Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-zinc-500 block text-xs">EXPERIENCE</span>
                  <span className="text-white font-bold text-sm">01+ Years</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-zinc-500 block text-xs">PRODUCTION SHIPS</span>
                  <span className="text-cyan-400 font-bold text-sm">15+ Modules</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-zinc-500 block text-xs">CORE REPO CODE</span>
                  <span className="text-white font-bold text-sm">100% TS</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-zinc-500 block text-xs">DESIGN FIDELITY</span>
                  <span className="text-emerald-400 font-bold text-sm">99.8% Match</span>
                </div>
              </div>
            </div>
          </ProgressiveReveal>
        </div>
      </div>
    </div>
  </section>
  );
}
