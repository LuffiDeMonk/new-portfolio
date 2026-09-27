"use client";

import React, { useEffect, useRef, useState } from "react";

export interface SectionExitContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionExitContainer({
  children,
  className = "",
}: SectionExitContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [exitProgress, setExitProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const el = ref.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || 800;

            // When bottom of content is within windowHeight * 0.65 down to windowHeight * 0.12,
            // the content smoothly compresses and recedes into the background as the section ends
            const startExit = windowHeight * 0.65;
            const endExit = windowHeight * 0.12;
            const range = startExit - endExit;

            if (rect.bottom < startExit) {
              const p = Math.max(0, Math.min(1, (startExit - rect.bottom) / range));
              setExitProgress(p);
            } else {
              setExitProgress(0);
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 - exitProgress * 0.04;
  const opacity = 1 - exitProgress * 0.8;
  const translateY = -exitProgress * 28;

  return (
    <div
      ref={ref}
      className={`transition-all duration-150 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
}
