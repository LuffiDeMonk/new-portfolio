"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ProgressiveRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
}

export function ProgressiveReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  threshold = 0.12,
}: ProgressiveRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransformClasses = () => {
    if (isInView) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0";
    }

    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-12 translate-y-0 scale-95 blur-sm";
      case "right":
        return "opacity-0 translate-x-12 translate-y-0 scale-95 blur-sm";
      case "scale":
        return "opacity-0 translate-x-0 translate-y-0 scale-90 blur-sm";
      case "up":
      default:
        return "opacity-0 translate-x-0 translate-y-10 scale-95 blur-sm";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${getTransformClasses()} ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
