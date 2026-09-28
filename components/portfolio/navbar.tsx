"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Send,
  Compass,
} from "lucide-react";

export interface NavSection {
  number: string;
  label: string;
  shortLabel: string;
  href: string;
  id: string;
  inDesktopNav: boolean;
}

export const ALL_SECTIONS: NavSection[] = [
  { number: "01", label: "HOME", shortLabel: "HOME", href: "#hero", id: "hero", inDesktopNav: true },
  { number: "02", label: "ABOUT", shortLabel: "ABOUT", href: "#about", id: "about", inDesktopNav: true },
  { number: "03", label: "SKILLS", shortLabel: "SKILLS", href: "#skills", id: "skills", inDesktopNav: true },
  { number: "04", label: "EXPERIENCE", shortLabel: "EXP", href: "#experience", id: "experience", inDesktopNav: true },
  { number: "05", label: "PROJECTS", shortLabel: "PROJ", href: "#projects", id: "projects", inDesktopNav: true },
  { number: "06", label: "PROCESS", shortLabel: "PROC", href: "#process", id: "process", inDesktopNav: true },
  { number: "07", label: "CODE", shortLabel: "CODE", href: "#code", id: "code", inDesktopNav: false },
  { number: "08", label: "METRICS", shortLabel: "METR", href: "#metrics", id: "metrics", inDesktopNav: false },
  { number: "09", label: "CONTACT", shortLabel: "CONT", href: "#contact", id: "contact", inDesktopNav: true },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [activeSection, setActiveSection] = useState("hero");
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const tabletMenuRef = useRef<HTMLDivElement>(null);
  const tabletButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize and handle window scrolling
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
      setIsScrolled(winScroll > 30);

      // Intelligent scroll direction detection
      if (Math.abs(winScroll - lastScrollY.current) > 8) {
        setScrollDirection(winScroll > lastScrollY.current ? "down" : "up");
        lastScrollY.current = winScroll;
      }

      // Precise active section calculation using getBoundingClientRect
      const windowHeight = window.innerHeight || 800;
      let current = ALL_SECTIONS[0].id;

      if (winScroll < 120) {
        current = "hero";
      } else {
        for (const section of ALL_SECTIONS) {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.45 && rect.bottom >= 80) {
              current = section.id;
            }
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: ESC closes all menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTabletMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Click outside listener for tablet floating panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isTabletMenuOpen &&
        tabletMenuRef.current &&
        !tabletMenuRef.current.contains(e.target as Node) &&
        tabletButtonRef.current &&
        !tabletButtonRef.current.contains(e.target as Node)
      ) {
        setIsTabletMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTabletMenuOpen]);

  // Smooth scroll helper that closes open menus and triggers native view
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsTabletMenuOpen(false);
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentSectionObj =
    ALL_SECTIONS.find((s) => s.id === activeSection) || ALL_SECTIONS[0];

  return (
    <>
      {/* ============================================================ */}
      {/* 0. Top Hardware-Accelerated Scroll Progress Indicator        */}
      {/* ============================================================ */}
      <div className="fixed top-0 inset-x-0 z-50 h-0.5 pointer-events-none overflow-hidden">
        <div
          className="h-full w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500 origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* ============================================================ */}
      {/* NAVIGATION BAR CONTAINER (Fixed at top with adaptivity)       */}
      {/* ============================================================ */}
      <header
        className={`fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* ========================================================== */}
        {/* STATE 1: DESKTOP NAVBAR (Large Screens: lg:flex)           */}
        {/* ========================================================== */}
        <div
          className={`hidden lg:flex pointer-events-auto rounded-full px-4 py-1.5 items-center gap-2 shadow-2xl transition-all duration-300 ease-out border ${
            isScrolled
              ? scrollDirection === "down"
                ? "bg-zinc-950/85 backdrop-blur-2xl border-cyan-500/20 shadow-cyan-950/20 opacity-90 scale-[0.98]"
                : "bg-zinc-950/95 backdrop-blur-2xl border-cyan-500/30 shadow-cyan-950/30 opacity-100 scale-100"
              : "bg-zinc-900/80 backdrop-blur-xl border-white/10 opacity-100 scale-100"
          }`}
        >
          {/* Personal Mark / Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors duration-200 group mr-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="font-bold tracking-tight text-xs text-white group-hover:text-cyan-300 transition-colors duration-200 uppercase font-mono">
              P. THAPA
            </span>
          </Link>

          <div className="h-3.5 w-px bg-white/10" />

          {/* Desktop Nav Items */}
          <nav
            aria-label="Desktop Primary Navigation"
            className="flex items-center gap-1 text-xs font-medium tracking-wide"
          >
            {ALL_SECTIONS.filter((item) => item.inDesktopNav).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-cyan-300 bg-white/10 shadow-sm border border-cyan-400/30 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="h-3.5 w-px bg-white/10" />

          {/* Active Telemetry Mini Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400">
            <span className="text-cyan-400 font-bold">
              {currentSectionObj.number}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300 uppercase">
              {currentSectionObj.shortLabel}
            </span>
          </div>

          {/* Contact Direct CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-black text-xs font-semibold tracking-wide hover:opacity-90 transition-opacity duration-200 shadow-md ml-1"
          >
            CONTACT
          </a>
        </div>

        {/* ========================================================== */}
        {/* STATE 2: TABLET NAVBAR (Tablet Screens: md:flex lg:hidden) */}
        {/* ========================================================== */}
        <div className="hidden md:flex lg:hidden w-full max-w-xl flex-col items-center">
          <div
            className={`w-full pointer-events-auto rounded-full px-4 py-2 flex items-center justify-between shadow-2xl transition-all duration-300 ease-out border ${
              isScrolled
                ? scrollDirection === "down"
                  ? "bg-zinc-950/90 backdrop-blur-2xl border-cyan-500/20 shadow-cyan-950/20 opacity-95"
                  : "bg-zinc-950/95 backdrop-blur-2xl border-cyan-500/30 shadow-cyan-950/30 opacity-100"
                : "bg-zinc-900/85 backdrop-blur-xl border-white/10"
            }`}
          >
            {/* Tablet Logo / Identifier */}
            <Link
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-bold tracking-tight text-xs text-white group-hover:text-cyan-300 transition-colors uppercase font-mono">
                PRABHAT THAPA
              </span>
            </Link>

            {/* Active Section Telemetry Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold">
                {currentSectionObj.number}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-200 tracking-wider">
                {currentSectionObj.label}
              </span>
            </div>

            {/* Tablet Action Cluster: Mini Progress + Menu Button */}
            <div className="flex items-center gap-3">
              {/* Mini Scroll Progress Track */}
              <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress)}%` }}
                />
              </div>

              {/* Tablet Menu Trigger Button */}
              <button
                ref={tabletButtonRef}
                type="button"
                onClick={() => setIsTabletMenuOpen((prev) => !prev)}
                aria-expanded={isTabletMenuOpen}
                aria-label="Toggle navigation menu panel"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 border ${
                  isTabletMenuOpen
                    ? "bg-cyan-400 text-black border-cyan-400 font-bold shadow-md"
                    : "bg-white/10 hover:bg-white/15 text-zinc-200 border-white/15"
                }`}
              >
                <span>{isTabletMenuOpen ? "CLOSE" : "MENU"}</span>
                {isTabletMenuOpen ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  <Menu className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* TABLET MENU FLOATING PANEL (Expands directly below navbar) */}
          {isTabletMenuOpen && (
            <div
              ref={tabletMenuRef}
              className="w-full mt-2.5 pointer-events-auto bg-zinc-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-cyan-950/40 rounded-3xl p-4 transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              {/* Panel Telemetry Subhead */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 px-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SYSTEM MATRIX · 09 STATIONS</span>
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  {Math.round(scrollProgress)}% SCROLLED
                </span>
              </div>

              {/* 2-Column Sequential Items Grid */}
              <div className="grid grid-cols-2 gap-2">
                {ALL_SECTIONS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl transition-all duration-200 min-h-[44px] ${
                        isActive
                          ? "bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 shadow-sm"
                          : "bg-white/5 hover:bg-white/10 border border-transparent text-zinc-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono text-cyan-400 font-semibold">
                          {item.number}
                        </span>
                        <span className="text-xs font-medium tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Quick Contact Footer Bar inside Tablet Panel */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-2">
                <span className="text-xs font-mono text-zinc-500">
                  LOOKING TO CONNECT?
                </span>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-black text-xs font-semibold uppercase hover:opacity-90 transition-opacity"
                >
                  <span>INITIATE TRANSMISSION</span>
                  <Send className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================== */}
        {/* STATE 3: MOBILE NAVBAR (Compact Phones: < md:flex)        */}
        {/* ========================================================== */}
        <div className="flex md:hidden w-full max-w-sm">
          <div
            className={`w-full pointer-events-auto rounded-full px-3.5 py-1.5 flex items-center justify-between shadow-2xl transition-all duration-300 ease-out border ${
              isScrolled
                ? "bg-zinc-950/95 backdrop-blur-2xl border-cyan-500/20 shadow-cyan-950/20"
                : "bg-zinc-900/85 backdrop-blur-xl border-white/10"
            }`}
          >
            {/* Monogram Personal Mark */}
            <Link
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-1.5 group py-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-bold tracking-tight text-xs text-white uppercase font-mono">
                P. THAPA
              </span>
            </Link>

            {/* Mobile Active Node Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold">
                {currentSectionObj.number}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300 text-[11px] tracking-wider uppercase">
                {currentSectionObj.shortLabel}
              </span>
            </div>

            {/* Mobile Menu Action Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-200 border border-white/10 active:scale-95 transition-transform"
            >
              <span>MENU</span>
              <Menu className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE FULL-SCREEN NAVIGATION OVERLAY                        */}
      {/* ============================================================ */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Overlay"
          className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-3xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top Bar with Brand & Close Button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-sm font-bold tracking-wider text-white uppercase">
                PRABHAT THAPA
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation overlay"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-zinc-200 border border-white/15 active:scale-95 transition-transform"
            >
              <span>CLOSE</span>
              <X className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Sequential Staggered Navigation Items List */}
          <div className="my-auto py-6 space-y-1">
            {ALL_SECTIONS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`w-full flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all duration-200 min-h-[52px] border-b border-white/5 active:scale-[0.98] ${
                    isActive
                      ? "bg-white/10 border border-cyan-400/40 text-cyan-300 shadow-md"
                      : "hover:bg-white/5 text-zinc-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono ${
                        isActive ? "text-cyan-400 font-bold" : "text-zinc-500"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span
                      className={`text-2xl font-black uppercase tracking-tight ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-sky-400"
                          : "text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {isActive ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-400 text-black font-bold">
                      ACTIVE
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Bottom Telemetry & Quick Action Bar */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYS.ONLINE · V2.4
              </span>
              <span>KATHMANDU, NEPAL</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 active:scale-[0.98] transition-transform"
            >
              <span>DIRECT INQUIRY (CONTACT)</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
