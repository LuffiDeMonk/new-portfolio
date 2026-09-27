"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers } from "lucide-react";

export interface ProjectDetail {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  role: string;
  accentColor: "cyan" | "sky" | "violet" | "emerald";
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const accentBadge =
    project.accentColor === "sky"
      ? "text-sky-400 bg-sky-950/40 border-sky-400/30"
      : project.accentColor === "violet"
      ? "text-violet-400 bg-violet-950/40 border-violet-400/30"
      : project.accentColor === "emerald"
      ? "text-emerald-400 bg-emerald-950/40 border-emerald-400/30"
      : "text-cyan-400 bg-cyan-950/40 border-cyan-400/30";

  const accentButton =
    project.accentColor === "sky"
      ? "hover:bg-sky-400"
      : project.accentColor === "violet"
      ? "hover:bg-violet-400"
      : project.accentColor === "emerald"
      ? "hover:bg-emerald-400"
      : "hover:bg-cyan-400";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl text-left transition-all duration-300 animate-in zoom-in-95"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${accentBadge}`}>
              {project.number} / {project.category}
            </span>
            <div className="h-px w-8 bg-white/10 hidden sm:block" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
              ARCHITECTURAL RECORD
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Core Subtitle */}
        <div className="mb-8">
          <h2
            id="modal-project-title"
            className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3 uppercase"
          >
            {project.title}
          </h2>
          <p className="text-lg text-zinc-300 font-medium">{project.subtitle}</p>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{project.description}</p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Architectural Problem</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features & Impact */}
        <div className="mb-8">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
            Key Architectural Deliverables
          </h3>
          <ul className="space-y-2.5">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Role & Technologies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6 mb-8">
          <div>
            <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Engineering Role
            </span>
            <p className="text-xs sm:text-sm text-white font-medium">{project.role}</p>
          </div>

          <div>
            <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Technologies Mastered
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 ${accentButton}`}
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#projects"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>Source Repository</span>
              <Github className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline uppercase tracking-wider"
          >
            Close Overview (ESC)
          </button>
        </div>
      </div>
    </div>
  );
}
