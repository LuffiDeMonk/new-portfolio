"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  X,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { sendPortfolioEmail } from "@/app/action";
import { toast } from "sonner";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Portfolio Inquiry / Collaboration");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // Close on ESC key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset status on reopen
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendPortfolioEmail({
          name,
          email,
          subject,
          message,
        });

        if (result.success) {
          setStatus("success");
          toast.success("Message sent successfully to thapaprabhat4@gmail.com!");
        } else {
          setStatus("error");
          setErrorMessage(result.message);
          toast.error(result.message || "Failed to send email.");
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err?.message || "An unexpected network error occurred.");
        toast.error("Failed to send transmission.");
      }
    });
  };

  // Helper to open direct mailto client with prefilled details
  const handleOpenMailClient = () => {
    const mailtoUrl = `mailto:thapaprabhat4@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio Inquiry"
    )}&body=${encodeURIComponent(
      `Hi Prabhat,\n\n${message}\n\nFrom,\n${name}\n${email}`
    )}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-email-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-zinc-950/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left backdrop-blur-2xl transition-all duration-300 animate-in zoom-in-95 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono border text-cyan-300 bg-cyan-950/40 border-cyan-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>08 / TRANSMISSION CONDUIT</span>
            </span>
            <div className="h-px w-6 bg-white/10 hidden sm:block" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
              DIRECT INQUIRY
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Stages */}
        {status === "success" ? (
          /* ============================================================ */
          /* SUCCESS STATE                                                */
          /* ============================================================ */
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-950/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">
              Transmission Delivered
            </h3>

            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
              Your message was dispatched to{" "}
              <span className="text-cyan-300 font-mono">thapaprabhat4@gmail.com</span>. I
              review inquiries daily and will get back to you shortly.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase hover:bg-white/10 transition-colors"
              >
                Send Another
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-semibold uppercase hover:bg-cyan-300 transition-colors"
              >
                Done (ESC)
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* FORM STATE                                                   */
          /* ============================================================ */
          <div>
            <div className="mb-6">
              <h3
                id="modal-email-title"
                className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-2 flex items-center gap-2"
              >
                <span>INITIATE CONTACT</span>
                <Mail className="w-5 h-5 text-cyan-400" />
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Send a direct email transmission to{" "}
                <span className="text-cyan-300 font-mono">thapaprabhat4@gmail.com</span>.
              </p>
            </div>

            {/* Error Notification Alert */}
            {status === "error" && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
                <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between">
                  <span className="text-zinc-400 font-mono text-[11px]">
                    Fast Fallback Available:
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 transition-colors font-mono text-xs font-medium"
                  >
                    <span>Launch in Mail App</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-cyan-400/80 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-cyan-400/80 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Portfolio Inquiry / Technical Consultation"
                  className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-cyan-400/80 transition-colors"
                />
              </div>

              {/* Row 3: Message Textarea */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your product, interface engineering scope, timeline, or team..."
                  className="w-full bg-zinc-900/70 border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-cyan-400/80 resize-none transition-colors"
                />
              </div>

              {/* Submit & Fallback Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="text-xs font-mono text-zinc-500 hover:text-cyan-300 transition-colors flex items-center gap-1.5 order-2 sm:order-1"
                >
                  <span>Or use default email client</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND EMAIL</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
