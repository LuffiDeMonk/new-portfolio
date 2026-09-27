"use client";

import React, { useEffect, useState } from "react";

const INITIAL_HEIGHTS = [
  "h-2/5",
  "h-3/5",
  "h-1/2",
  "h-4/5",
  "h-3/5",
  "h-2/5",
  "h-full",
  "h-3/5",
  "h-1/2",
  "h-1/3",
];

const HEIGHT_CLASSES = [
  "h-1/4",
  "h-1/3",
  "h-2/5",
  "h-1/2",
  "h-3/5",
  "h-3/4",
  "h-4/5",
  "h-full",
];

export function TelemetryVisualizer() {
  const [heights, setHeights] = useState(INITIAL_HEIGHTS);
  const [packetRate, setPacketRate] = useState("1.2k");

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate heights smoothly using standard Tailwind height classes
      setHeights((prev) =>
        prev.map(() => {
          const randomIndex = Math.floor(Math.random() * HEIGHT_CLASSES.length);
          return HEIGHT_CLASSES[randomIndex];
        })
      );
      // Subtle packet rate variation
      const randomRate = (1.1 + Math.random() * 0.3).toFixed(1);
      setPacketRate(`${randomRate}k`);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-xs">
      <div className="flex justify-between items-center text-zinc-400 mb-3 text-xs">
        <span>EDGE ROUTE PACKETS</span>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>● {packetRate} req/sec</span>
        </span>
      </div>

      {/* Dynamic Animated Bars with Standard Classes */}
      <div className="flex items-end gap-1.5 h-20 pt-2 border-b border-white/10 pb-1">
        {heights.map((hClass, index) => {
          const isPeak = index === 6;
          return (
            <div
              key={index}
              className={`w-full rounded-t transition-all duration-700 ease-out ${hClass} ${
                isPeak
                  ? "bg-cyan-400 shadow-lg shadow-cyan-400/30"
                  : "bg-cyan-500/30 hover:bg-cyan-400"
              }`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-zinc-600 mt-2">
        <span>00:00:01</span>
        <span>00:00:30</span>
        <span>NOW</span>
      </div>
    </div>
  );
}
