"use client";

import React, { useEffect, useState } from "react";

const FIRST_NAME = "PRABHAT";
const LAST_NAME = "THAPA";

export function HeroTypingName() {
  const [hasMounted, setHasMounted] = useState(false);
  const [displayedFirst, setDisplayedFirst] = useState("");
  const [displayedLast, setDisplayedLast] = useState("");
  const [isTypingFirst, setIsTypingFirst] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Deliberate initial delay on mount before typing starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    let timeout: NodeJS.Timeout;

    if (isTypingFirst) {
      if (displayedFirst.length < FIRST_NAME.length) {
        timeout = setTimeout(() => {
          setDisplayedFirst(FIRST_NAME.slice(0, displayedFirst.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsTypingFirst(false);
        }, 350);
      }
    } else {
      if (displayedLast.length < LAST_NAME.length) {
        timeout = setTimeout(() => {
          setDisplayedLast(LAST_NAME.slice(0, displayedLast.length + 1));
        }, 170);
      } else {
        setIsComplete(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [hasMounted, displayedFirst, displayedLast, isTypingFirst]);

  return (
    <h1
      className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none uppercase select-none"
      aria-label="Prabhat Thapa"
    >
      <span className="inline-flex items-baseline">
        <span>{displayedFirst || "\u00A0"}</span>
        {isTypingFirst && (
          <span className="inline-block w-2 sm:w-3 md:w-4 h-10 sm:h-14 md:h-20 lg:h-24 bg-cyan-400 ml-2 animate-pulse align-middle" />
        )}
      </span>
      <br />
      <span className="inline-flex items-baseline">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-600">
          {displayedLast}
        </span>
        {!isTypingFirst && (
          <span
            className={`inline-block w-2 sm:w-3 md:w-4 h-10 sm:h-14 md:h-20 lg:h-24 ml-2 align-middle ${
              isComplete
                ? "bg-cyan-400/80 animate-pulse duration-1000"
                : "bg-cyan-400 animate-pulse"
            }`}
          />
        )}
      </span>
    </h1>
  );
}
