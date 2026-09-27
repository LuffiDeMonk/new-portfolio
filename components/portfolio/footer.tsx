import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black py-8 px-6 sm:px-12 lg:px-20 text-xs text-zinc-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© 2026 PRABHAT THAPA · FRONTEND ARCHITECTURE</div>
        <div className="flex items-center gap-6">
          <span>ENGINEERED WITH REACT 18 &amp; NEXT.JS CONCEPTS</span>
          <a href="#hero" className="text-cyan-400 hover:underline">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
