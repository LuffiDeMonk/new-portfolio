import React from "react";
import { AnimatedMetrics } from "./animated-metrics";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";

export function Metrics() {
  return (
    <section id="metrics" className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-20 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          number="07"
          label="METRICS"
          title={["ENGINEERING BY", "THE NUMBERS"]}
          description="Selected metrics and empirical measurements illustrating delivery focus, component reusability, and production consistency."
          align="center"
          accentColor="violet"
          className="mb-12"
        />

        <div className="w-full">
          <ProgressiveReveal direction="up" delayMs={100}>
            <AnimatedMetrics />
          </ProgressiveReveal>
        </div>
      </div>
    </section>
  );
}
