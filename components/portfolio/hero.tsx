import React from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { HeroTypingName } from "./hero-typing-name";
import { HeroScrollContainer } from "./hero-scroll-container";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 lg:px-20 z-10"
    >
      {/* Top System Telemetry Status Bar */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 text-xs text-zinc-400 font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SYS.STATUS: OPERATIONAL
          </span>
          <span className="text-zinc-600">/</span>
          <span>LAT: 27.7172° N · LON: 85.3240° E</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-cyan-300">
            REACT 19 / NEXT.JS 15
          </span>
          <span className="hidden md:inline text-zinc-500">KATHMANDU, NEPAL</span>
        </div>
      </div>

      {/* Monumental Typography Hero Core with Scroll Compression */}
      <HeroScrollContainer>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-950/40 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
          <span>Digital Product Experience &amp; Frontend Systems</span>
        </div>

        {/* Dynamic Typing Name Effect */}
        <HeroTypingName />

        <p className="mt-8 max-w-2xl text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed">
          Building scalable interfaces, production design systems, and resilient frontend architecture with{" "}
          <span className="text-white font-medium">React</span>,{" "}
          <span className="text-white font-medium">Next.js</span>, and{" "}
          <span className="text-white font-medium">TypeScript</span>.
        </p>

        {/* CTA Buttons & Tech Chips */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-200 flex items-center gap-2"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-zinc-900/60 backdrop-blur-xl hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-200 border border-white/10 hover:border-cyan-400/30 flex items-center gap-2"
          >
            <span>Initialize Contact</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </a>
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/10 text-xs text-zinc-500 font-mono hidden xl:flex">
            <span>STACK: TS · NEXT · TAILWIND · TANSTACK</span>
          </div>
        </div>
      </HeroScrollContainer>

      {/* Scroll Indicator & Bottom Boundary */}
      <div className="flex justify-between items-end pt-8 border-t border-white/5">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
            SCROLL TO TRAVERSE SYSTEM
          </span>
        </div>
        <a
          href="#about"
          className="animate-bounce p-2 text-zinc-500 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
