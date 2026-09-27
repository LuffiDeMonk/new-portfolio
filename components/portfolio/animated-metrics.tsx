"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface MetricData {
  category: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
  hoverBorder: string;
}

const METRICS_DATA: MetricData[] = [
  {
    category: "EXPERIENCE",
    targetValue: 1,
    prefix: "0",
    suffix: "+",
    label: "Years Active",
    description: "Continuous frontend & software development across product teams.",
    color: "text-cyan-400",
    hoverBorder: "hover:border-cyan-400/40",
  },
  {
    category: "DELIVERIES",
    targetValue: 15,
    suffix: "+",
    label: "Projects Deployed",
    description: "Complete web applications engineered from spec to production hosting.",
    color: "text-sky-400",
    hoverBorder: "hover:border-sky-400/40",
  },
  {
    category: "SYSTEM PRIMITIVES",
    targetValue: 80,
    suffix: "+",
    label: "Components Built",
    description: "Accessible, modular UI library tokens & compound components.",
    color: "text-violet-400",
    hoverBorder: "hover:border-violet-400/40",
  },
  {
    category: "TECH BREADTH",
    targetValue: 16,
    suffix: "+",
    label: "Technologies Mastered",
    description: "Modern reactive libraries, database drivers, and cloud CI pipelines.",
    color: "text-emerald-400",
    hoverBorder: "hover:border-emerald-400/40",
  },
];

export function AnimatedMetrics() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS_DATA.map((item) => Math.round(item.targetValue * easeOut))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {METRICS_DATA.map((item, index) => {
        const rawValue = counts[index];
        const displayValue = `${item.prefix && rawValue < 10 ? item.prefix : ""}${rawValue}${item.suffix}`;

        return (
          <div
            key={index}
            className={`bg-zinc-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 ${item.hoverBorder} transition-colors duration-300 group`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-zinc-500 uppercase">
                {item.category}
              </span>
              <ArrowUpRight
                className={`w-4 h-4 ${item.color} transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
              />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
              {displayValue}
            </div>
            <div className="text-sm font-semibold text-zinc-200 mb-1">{item.label}</div>
            <p className="text-xs text-zinc-400">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
