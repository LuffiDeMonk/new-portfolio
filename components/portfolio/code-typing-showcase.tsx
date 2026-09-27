"use client";

import React, { useEffect, useState, useRef } from "react";
import { FileCode, RotateCcw, Play, Pause, FastForward } from "lucide-react";

interface CodeLine {
  lineNum: number;
  tokens: { text: string; colorClass?: string }[];
}

const CODE_LINES: CodeLine[] = [
  {
    lineNum: 1,
    tokens: [
      { text: "// Modern Type-Safe Optimistic Hook Implementation", colorClass: "text-zinc-500" },
    ],
  },
  {
    lineNum: 2,
    tokens: [
      { text: "import ", colorClass: "text-violet-400" },
      { text: "{ useMutation, useQueryClient } " },
      { text: "from ", colorClass: "text-violet-400" },
      { text: "'@tanstack/react-query'", colorClass: "text-emerald-300" },
      { text: ";" },
    ],
  },
  {
    lineNum: 3,
    tokens: [{ text: "" }],
  },
  {
    lineNum: 4,
    tokens: [
      { text: "export interface ", colorClass: "text-violet-400" },
      { text: "MutationConfig", colorClass: "text-cyan-300" },
      { text: "<" },
      { text: "TData", colorClass: "text-amber-300" },
      { text: ", " },
      { text: "TVariables", colorClass: "text-amber-300" },
      { text: "> {" },
    ],
  },
  {
    lineNum: 5,
    tokens: [
      { text: "  mutationKey: " },
      { text: "string", colorClass: "text-cyan-300" },
      { text: "[];" },
    ],
  },
  {
    lineNum: 6,
    tokens: [
      { text: "  mutationFn: (" },
      { text: "vars", colorClass: "text-zinc-300" },
      { text: ": " },
      { text: "TVariables", colorClass: "text-amber-300" },
      { text: ") => " },
      { text: "Promise", colorClass: "text-cyan-300" },
      { text: "<" },
      { text: "TData", colorClass: "text-amber-300" },
      { text: ">;" },
    ],
  },
  {
    lineNum: 7,
    tokens: [
      { text: "  onRollback?: (" },
      { text: "err", colorClass: "text-zinc-300" },
      { text: ": " },
      { text: "unknown", colorClass: "text-cyan-300" },
      { text: ") => " },
      { text: "void", colorClass: "text-cyan-300" },
      { text: ";" },
    ],
  },
  {
    lineNum: 8,
    tokens: [{ text: "}" }],
  },
  {
    lineNum: 9,
    tokens: [{ text: "" }],
  },
  {
    lineNum: 10,
    tokens: [
      { text: "export function ", colorClass: "text-violet-400" },
      { text: "useOptimisticRecord", colorClass: "text-sky-400" },
      { text: "<" },
      { text: "T ", colorClass: "text-amber-300" },
      { text: "extends ", colorClass: "text-violet-400" },
      { text: "{ id: " },
      { text: "string", colorClass: "text-cyan-300" },
      { text: " }>(" },
    ],
  },
  {
    lineNum: 11,
    tokens: [
      { text: "  config: " },
      { text: "MutationConfig", colorClass: "text-cyan-300" },
      { text: "<" },
      { text: "T", colorClass: "text-amber-300" },
      { text: ", " },
      { text: "Partial", colorClass: "text-amber-300" },
      { text: "<" },
      { text: "T", colorClass: "text-amber-300" },
      { text: ">>" },
    ],
  },
  {
    lineNum: 12,
    tokens: [{ text: ") {" }],
  },
  {
    lineNum: 13,
    tokens: [
      { text: "  const ", colorClass: "text-violet-400" },
      { text: "queryClient = " },
      { text: "useQueryClient", colorClass: "text-sky-400" },
      { text: "();" },
    ],
  },
  {
    lineNum: 14,
    tokens: [{ text: "" }],
  },
  {
    lineNum: 15,
    tokens: [
      { text: "  return ", colorClass: "text-violet-400" },
      { text: "useMutation", colorClass: "text-sky-400" },
      { text: "({" },
    ],
  },
  {
    lineNum: 16,
    tokens: [{ text: "    mutationFn: config.mutationFn," }],
  },
  {
    lineNum: 17,
    tokens: [
      { text: "    onMutate: " },
      { text: "async ", colorClass: "text-violet-400" },
      { text: "(updatedFields) => {" },
    ],
  },
  {
    lineNum: 18,
    tokens: [
      { text: "      await ", colorClass: "text-violet-400" },
      { text: "queryClient." },
      { text: "cancelQueries", colorClass: "text-sky-400" },
      { text: "({ queryKey: config.mutationKey });" },
    ],
  },
  {
    lineNum: 19,
    tokens: [
      { text: "      const ", colorClass: "text-violet-400" },
      { text: "previous = queryClient." },
      { text: "getQueryData", colorClass: "text-sky-400" },
      { text: "<" },
      { text: "T", colorClass: "text-amber-300" },
      { text: ">(config.mutationKey);" },
    ],
  },
  {
    lineNum: 20,
    tokens: [
      { text: "      queryClient." },
      { text: "setQueryData", colorClass: "text-sky-400" },
      { text: "(config.mutationKey, (" },
      { text: "old: ", colorClass: "text-zinc-300" },
      { text: "T", colorClass: "text-amber-300" },
      { text: ") => ({" },
    ],
  },
  {
    lineNum: 21,
    tokens: [{ text: "        ...old," }],
  },
  {
    lineNum: 22,
    tokens: [{ text: "        ...updatedFields," }],
  },
  {
    lineNum: 23,
    tokens: [{ text: "      }));" }],
  },
  {
    lineNum: 24,
    tokens: [
      { text: "      return ", colorClass: "text-violet-400" },
      { text: "{ previous };" },
    ],
  },
  {
    lineNum: 25,
    tokens: [{ text: "    }," }],
  },
  {
    lineNum: 26,
    tokens: [{ text: "    onError: (_err, _vars, context) => {" }],
  },
  {
    lineNum: 27,
    tokens: [
      { text: "      if ", colorClass: "text-violet-400" },
      { text: "(context?.previous) {" },
    ],
  },
  {
    lineNum: 28,
    tokens: [
      { text: "        queryClient." },
      { text: "setQueryData", colorClass: "text-sky-400" },
      { text: "(config.mutationKey, context.previous);" },
    ],
  },
  {
    lineNum: 29,
    tokens: [{ text: "      }" }],
  },
  {
    lineNum: 30,
    tokens: [{ text: "    }" }],
  },
  {
    lineNum: 31,
    tokens: [{ text: "  });" }],
  },
  {
    lineNum: 32,
    tokens: [{ text: "}" }],
  },
];

export function CodeTypingShowcase() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isObserved, setIsObserved] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setIsObserved(true);
          clearTimeout(delayTimer);
          // 800ms deliberate delay after component comes into view before typing begins
          delayTimer = setTimeout(() => {
            setHasStarted(true);
          }, 800);
        } else if (!entries[0].isIntersecting && !hasStarted) {
          setIsObserved(false);
          clearTimeout(delayTimer);
        }
      },
      { threshold: 0.25 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      clearTimeout(delayTimer);
      if (el) observer.unobserve(el);
    };
  }, [hasStarted]);

  // Smooth character-by-character typewriter loop
  useEffect(() => {
    if (!hasStarted || isPaused || isFinished) return;

    if (currentLineIndex >= CODE_LINES.length) {
      setIsFinished(true);
      return;
    }

    const currentLine = CODE_LINES[currentLineIndex];
    const totalChars = currentLine.tokens.reduce((acc, t) => acc + t.text.length, 0);

    // Empty line (like spacing between function/interface): pause gently then advance
    if (totalChars === 0) {
      const blankTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(blankTimer);
    }

    // Line completed: carriage return pause before moving to next line
    if (currentCharIndex >= totalChars) {
      const lineEndTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 140);
      return () => clearTimeout(lineEndTimer);
    }

    // Active line character advance:
    // Advance indentation (2 or 4 spaces) in single tab-like steps, normal characters 1 by 1
    const fullLine = currentLine.tokens.map((t) => t.text).join("");
    const remaining = fullLine.slice(currentCharIndex);
    let step = 1;
    if (remaining.startsWith("    ")) {
      step = 4;
    } else if (remaining.startsWith("  ")) {
      step = 2;
    }

    const charTimer = setTimeout(() => {
      setCurrentCharIndex((prev) => Math.min(totalChars, prev + step));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 24);

    return () => clearTimeout(charTimer);
  }, [hasStarted, isPaused, isFinished, currentLineIndex, currentCharIndex]);

  const handleRestart = () => {
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsFinished(false);
    setIsPaused(false);
    setHasStarted(false);
    setIsObserved(true);
    setTimeout(() => {
      setHasStarted(true);
    }, 500);
  };

  const handleSkip = () => {
    setCurrentLineIndex(CODE_LINES.length);
    setCurrentCharIndex(0);
    setIsFinished(true);
    setIsPaused(false);
    setHasStarted(true);
  };

  const linesToRender = hasStarted
    ? CODE_LINES.slice(0, Math.min(CODE_LINES.length, currentLineIndex + 1))
    : [];

  const renderTokens = (line: CodeLine, isCurrent: boolean) => {
    if (!isCurrent) {
      return line.tokens.map((tok, tIdx) => (
        <span key={tIdx} className={tok.colorClass || "text-zinc-300"}>
          {tok.text}
        </span>
      ));
    }

    let remainingChars = currentCharIndex;
    return line.tokens.map((tok, tIdx) => {
      if (remainingChars <= 0) return null;
      const take = Math.min(tok.text.length, remainingChars);
      remainingChars -= take;
      return (
        <span key={tIdx} className={tok.colorClass || "text-zinc-300"}>
          {tok.text.slice(0, take)}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className="rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs"
    >
      {/* Editor Titlebar Tabs & Interactive Controls */}
      <div className="px-4 py-3 bg-zinc-800/80 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <div className="flex items-center gap-1.5 ml-3 px-3 py-1 rounded bg-black/40 border border-white/5 text-cyan-300">
            <FileCode className="w-3.5 h-3.5" />
            <span>useOptimisticMutation.ts</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 text-zinc-400">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            title={isPaused ? "Resume typing" : "Pause typing"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-cyan-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            title="Replay typing from start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            title="Skip to end"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>
          <div className="h-3 w-px bg-white/10 mx-1 hidden sm:block" />
          <span className="text-zinc-500 text-xs hidden sm:inline">TypeScript 5.4 · Strict</span>
        </div>
      </div>

      {/* Code Body with Progressive Line Generation */}
      <div
        ref={scrollRef}
        className="p-6 bg-zinc-950/95 text-zinc-300 overflow-x-auto leading-relaxed max-h-96 min-h-80"
      >
        <pre className="font-mono text-xs">
          {/* Awaiting initial scroll & delay start */}
          {!hasStarted && (
            <div className="table-row">
              <span className="table-cell pr-4 text-zinc-600 select-none text-right w-6">
                1
              </span>
              <span className="table-cell">
                <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </span>
            </div>
          )}
          {linesToRender.map((line, idx) => {
            const isCurrent = idx === currentLineIndex && !isFinished;
            return (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-zinc-600 select-none text-right w-6">
                  {line.lineNum}
                </span>
                <span className="table-cell">
                  {renderTokens(line, isCurrent)}
                  {/* Active Caret on the active typing line */}
                  {isCurrent && (
                    <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
                  )}
                </span>
              </div>
            );
          })}
          {/* Caret when finished */}
          {isFinished && (
            <div className="table-row">
              <span className="table-cell pr-4 text-zinc-600 select-none text-right w-6">
                33
              </span>
              <span className="table-cell">
                <span className="inline-block w-2 h-3.5 bg-cyan-400/70 ml-1 animate-pulse align-middle" />
              </span>
            </div>
          )}
        </pre>
      </div>

      {/* IDE Status Footer */}
      <div className="px-4 py-2 bg-zinc-900 border-t border-white/5 flex justify-between text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-3">
          <span className={isFinished ? "text-emerald-400" : "text-cyan-400"}>
            {!isObserved
              ? "● Awaiting Scroll · Ready"
              : !hasStarted
              ? "● Initializing Environment..."
              : isFinished
              ? "● TS Check: 0 Errors · Complete"
              : `● Typing: Line ${Math.min(currentLineIndex + 1, 32)} of 32`}
          </span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
        <span>Spaces: 2</span>
      </div>
    </div>
  );
}
