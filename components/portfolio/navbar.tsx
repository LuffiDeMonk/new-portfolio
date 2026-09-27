"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "SKILLS", href: "#skills", id: "skills" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "PROJECTS", href: "#projects", id: "projects" },
  { label: "PROCESS", href: "#process", id: "process", hideOnMobile: true },
  { label: "CODE", href: "#code", id: "code", hideOnTablet: true },
  { label: "METRICS", href: "#metrics", id: "metrics", hideOnMobile: true },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
      setIsScrolled(winScroll > 30);

      // Track active section
      const sectionElements = navItems.map((item) => document.getElementById(item.id));
      let current = "";
      for (const section of sectionElements) {
        if (section) {
          const top = section.offsetTop - 180;
          if (winScroll >= top) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress indicator with hardware-accelerated smooth scaleX */}
      <div className="fixed top-0 inset-x-0 z-50 h-0.5 pointer-events-none overflow-hidden">
        <div
          className="h-full w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500 origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      <header
        className={`fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* Floating glass pill navigation with smooth scroll adaptation */}
        <div
          className={`pointer-events-auto rounded-full px-3 py-1.5 flex items-center gap-1 sm:gap-2 shadow-2xl transition-all duration-500 ease-out max-w-full overflow-x-auto border ${
            isScrolled
              ? "bg-zinc-950/90 backdrop-blur-2xl border-cyan-500/20 shadow-cyan-950/20"
              : "bg-zinc-900/80 backdrop-blur-xl border-white/10"
          }`}
        >
          {/* Logo / Identifier */}
          <Link
            href="#hero"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors duration-200 group mr-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="font-bold tracking-tight text-xs text-white group-hover:text-cyan-300 transition-colors duration-200 uppercase">
              P. THAPA
            </span>
          </Link>

          <div className="h-3 w-px bg-white/10 hidden sm:block" />

          {/* Links */}
          <nav className="flex items-center text-xs font-medium tracking-wide">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    item.hideOnMobile ? "hidden md:block" : ""
                  } ${item.hideOnTablet ? "hidden lg:block" : ""} ${
                    isActive
                      ? "text-cyan-300 bg-white/10 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="h-3 w-px bg-white/10" />

          {/* Contact CTA */}
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-black text-xs font-semibold tracking-wide hover:opacity-90 transition-opacity duration-200 shadow-md"
          >
            CONTACT
          </a>
        </div>
      </header>
    </>
  );
}
