"use client";

import React, { useEffect, useState } from "react";

export function HeroScrollContainer({ children }: { children: React.ReactNode }) {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;
      const ratio = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.75)));
      setScrollRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 - scrollRatio * 0.06;
  const opacity = 1 - scrollRatio * 0.65;
  const translateY = scrollRatio * 36;

  return (
    <div
      className="my-auto py-12 flex flex-col justify-center items-start max-w-7xl will-change-transform"
      style={{
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
}
