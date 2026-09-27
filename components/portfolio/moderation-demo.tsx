"use client";

import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export function ModerationDemo() {
  const [ticketId, setTicketId] = useState(89241);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  const handleAction = (decision: "approved" | "rejected") => {
    setStatus(decision);
    setTimeout(() => {
      setTicketId((prev) => prev + 1);
      setStatus("pending");
    }, 1800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "j" || e.key === "J") {
        handleAction("rejected");
      } else if (e.key === "k" || e.key === "K") {
        handleAction("approved");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="p-6 space-y-4 bg-gradient-to-b from-zinc-950/90 to-zinc-900/90">
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-2">
            <span>Flagged Entity #{ticketId}</span>
            {status === "approved" && (
              <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> APPROVED
              </span>
            )}
            {status === "rejected" && (
              <span className="text-rose-400 text-xs font-mono flex items-center gap-1">
                <X className="w-3 h-3" /> REJECTED
              </span>
            )}
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            {status === "pending"
              ? "Reported: Spam Payload · User Trust Score: 41%"
              : status === "approved"
              ? "Decision committed to database. Shifting queue..."
              : "Entity restricted. Incident logged to audit trail."}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleAction("rejected")}
            disabled={status !== "pending"}
            className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold hover:bg-rose-500/30 active:scale-95 transition-all disabled:opacity-50"
          >
            REJECT [J]
          </button>
          <button
            type="button"
            onClick={() => handleAction("approved")}
            disabled={status !== "pending"}
            className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold hover:bg-emerald-500/30 active:scale-95 transition-all disabled:opacity-50"
          >
            APPROVE [K]
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <span className="text-zinc-500 text-xs block">PAYLOAD HEURISTICS</span>
          <span className="text-zinc-200">Text Entropy: 0.94 (Abnormal)</span>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <span className="text-zinc-500 text-xs block">ACTION HISTORY</span>
          <span className="text-zinc-200">2 Prior Infractions</span>
        </div>
      </div>
    </div>
  );
}
