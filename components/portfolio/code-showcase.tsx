import React from "react";
import { CodeTypingShowcase } from "./code-typing-showcase";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";

export function CodeShowcase() {
  return (
    <section
      id="code"
      className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-20 z-10 bg-zinc-900/60 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          number="06"
          label="CODE"
          title={["INSIDE THE", "INTERFACE"]}
          description="I write readable, strictly typed, self-documenting code. Frontend reliability isn't accidental; it stems from rigorous interfaces, runtime validation, and resilient error bounds."
          align="left"
          accentColor="sky"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Explanatory Column */}
          <div className="lg:col-span-5 space-y-6">
            <ProgressiveReveal direction="left" delayMs={80}>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight mb-4">
                Code as Product Infrastructure
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                Architecture, strict interfaces, predictable cache lifecycles, and resilient error fencing built directly into the client tree.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Generic React Component Typing</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Predictable TanStack Cache Mutations</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  <span>Zero-Leak Event Listeners &amp; Cleanups</span>
                </div>
              </div>
            </ProgressiveReveal>
          </div>

          {/* Right Holographic IDE Window with Live Typing Effect */}
          <div className="lg:col-span-7">
            <ProgressiveReveal direction="up" delayMs={160}>
              <CodeTypingShowcase />
            </ProgressiveReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
