import React from "react";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";

const steps = [
  {
    number: "01",
    badge: "FOUNDATION",
    badgeColor: "bg-cyan-400/10 text-cyan-400",
    hoverColor: "group-hover:text-cyan-400",
    title: "Architecture & Spec",
    description:
      "Component hierarchy mapping, schema modeling, edge-case audit, and client/server component boundary definitions.",
    artifact: "ARTIFACT: System Diagram & API Contracts",
  },
  {
    number: "02",
    badge: "SYSTEMS",
    badgeColor: "bg-sky-400/10 text-sky-400",
    hoverColor: "group-hover:text-sky-400",
    title: "Design Tokens & UI",
    description:
      "Extracting atomic tokens, standardizing spacing and typography curves, and constructing accessible WAI-ARIA primitives.",
    artifact: "ARTIFACT: Isolated Storybook Library",
  },
  {
    number: "03",
    badge: "ENGINEERING",
    badgeColor: "bg-violet-400/10 text-violet-400",
    hoverColor: "group-hover:text-violet-400",
    title: "Type-Safe Build",
    description:
      "Strict TypeScript implementation, optimistic cache mutations, error-boundary fencing, and responsive fluid layout.",
    artifact: "ARTIFACT: Production Next.js Routes",
  },
  {
    number: "04",
    badge: "VERIFY",
    badgeColor: "bg-emerald-400/10 text-emerald-400",
    hoverColor: "group-hover:text-emerald-400",
    title: "Perf & Deploy",
    description:
      "Lighthouse 100 audit, Web Vitals tuning, bundle size tree-shaking, and automated CI/CD containerization.",
    artifact: "ARTIFACT: Zero-Downtime Release",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-20 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          number="05"
          label="PROCESS"
          title={["HOW I", "BUILD"]}
          description="Transforming ambiguous business challenges into resilient, maintainable, and verifiable frontend code."
          align="left"
          accentColor="cyan"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, index) => (
            <ProgressiveReveal key={index} direction="up" delayMs={index * 120} className="h-full">
              <div className="bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative group hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className={`text-3xl font-black text-zinc-600 font-mono ${step.hoverColor} transition-colors`}
                    >
                      {step.number}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
                <div className="text-xs font-mono text-zinc-500 border-t border-white/5 pt-3 mt-6">
                  {step.artifact}
                </div>
              </div>
            </ProgressiveReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
