import React from "react";
import { Monitor, Palette, Database, Server } from "lucide-react";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-20 z-10 bg-zinc-900/60 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          number="02"
          label="SKILLS"
          title={["TECHNOLOGY", "SYSTEM"]}
          description="A connected stack spanning interface architecture, data, backend systems, and deployment."
          align="left"
          accentColor="sky"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {/* CLUSTER 1: FRONTEND & FRAMEWORKS */}
          <ProgressiveReveal delayMs={100} direction="left">
            <div className="bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-300 h-full">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                <Monitor className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                CLUSTER A
              </h3>
              <h4 className="text-lg font-bold text-white mb-4">Frontend Core</h4>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors">
                  <span className="text-zinc-200">React 18 / 19</span>
                  <span className="text-cyan-400 font-semibold">Specialist</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors">
                  <span className="text-zinc-200">Next.js (App Router)</span>
                  <span className="text-cyan-400 font-semibold">SSR/SSG</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors">
                  <span className="text-zinc-200">TypeScript</span>
                  <span className="text-cyan-400 font-semibold">Strict Typing</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors">
                  <span className="text-zinc-200">JavaScript (ESNext)</span>
                  <span className="text-zinc-500">Native API</span>
                </li>
              </ul>
            </div>
          </ProgressiveReveal>

          {/* CLUSTER 2: UI SYSTEMS & STYLING */}
          <ProgressiveReveal delayMs={220} direction="up">
            <div className="bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-sky-400/30 transition-all duration-300 h-full">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-1">
                CLUSTER B
              </h3>
              <h4 className="text-lg font-bold text-white mb-4">UI Systems &amp; Design</h4>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-sky-400/30 transition-colors">
                  <span className="text-zinc-200">Tailwind CSS</span>
                  <span className="text-sky-400 font-semibold">Utility-first</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-sky-400/30 transition-colors">
                  <span className="text-zinc-200">Radix UI / Shadcn</span>
                  <span className="text-sky-400 font-semibold">Headless</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-sky-400/30 transition-colors">
                  <span className="text-zinc-200">Framer Motion</span>
                  <span className="text-sky-400 font-semibold">Physics</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-sky-400/30 transition-colors">
                  <span className="text-zinc-200">Storybook</span>
                  <span className="text-zinc-500">Component QA</span>
                </li>
              </ul>
            </div>
          </ProgressiveReveal>

          {/* CLUSTER 3: STATE & DATA LAYER */}
          <ProgressiveReveal delayMs={340} direction="up">
            <div className="bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-violet-400/30 transition-all duration-300 h-full">
              <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center text-violet-400 mb-6">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-1">
                CLUSTER C
              </h3>
              <h4 className="text-lg font-bold text-white mb-4">Data &amp; Querying</h4>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-violet-400/30 transition-colors">
                  <span className="text-zinc-200">TanStack Query</span>
                  <span className="text-violet-400 font-semibold">Cache Sync</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-violet-400/30 transition-colors">
                  <span className="text-zinc-200">GraphQL / Apollo</span>
                  <span className="text-violet-400 font-semibold">Schema Query</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-violet-400/30 transition-colors">
                  <span className="text-zinc-200">REST &amp; Axios</span>
                  <span className="text-zinc-500">HTTP/2</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-violet-400/30 transition-colors">
                  <span className="text-zinc-200">Zustand</span>
                  <span className="text-zinc-500">Atomic State</span>
                </li>
              </ul>
            </div>
          </ProgressiveReveal>

          {/* CLUSTER 4: PLATFORM, DEVOPS & TESTING */}
          <ProgressiveReveal delayMs={460} direction="right">
            <div className="bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-emerald-400/30 transition-all duration-300 h-full">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                CLUSTER D
              </h3>
              <h4 className="text-lg font-bold text-white mb-4">Backend &amp; DevOps</h4>

              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-400/30 transition-colors">
                  <span className="text-zinc-200">Node.js / Express</span>
                  <span className="text-emerald-400 font-semibold">Services</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-400/30 transition-colors">
                  <span className="text-zinc-200">PostgreSQL</span>
                  <span className="text-zinc-500">SQL Model</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-400/30 transition-colors">
                  <span className="text-zinc-200">Docker &amp; Git</span>
                  <span className="text-emerald-400 font-semibold">CI / Pipelines</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-400/30 transition-colors">
                  <span className="text-zinc-200">Jest / Vitest</span>
                  <span className="text-zinc-500">Unit Tests</span>
                </li>
              </ul>
            </div>
          </ProgressiveReveal>
        </div>

        {/* Technology Network to Experience Transition Connector */}
        <ProgressiveReveal delayMs={550} direction="up">
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>TECHNOLOGY NETWORK MERGES INTO CAREER TRAJECTORY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            {/* Horizontal Track Line with Transformation Nodes */}
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent relative flex items-center justify-between">
              <span className="w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-violet-400 translate-x-1/2 shadow-sm" />
            </div>
          </div>
        </ProgressiveReveal>
      </div>
    </section>
  );
}
