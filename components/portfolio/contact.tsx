"use client";

import React, { useState } from "react";
import { FileText, Linkedin, Mail } from "lucide-react";
import { SectionIntro } from "./section-intro";
import { ProgressiveReveal } from "./progressive-reveal";
import { EmailModal } from "./email-modal";

export function Contact() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 z-10 border-t border-white/10 bg-gradient-to-b from-zinc-950 to-black"
    >
      <div className="max-w-4xl mx-auto text-center w-full my-auto">
        <SectionIntro
          number="08"
          label="CONTACT"
          title={["LET'S BUILD", "SOMETHING MEANINGFUL."]}
          description="Have a product, interface, or engineering problem worth solving? I am available for forward-thinking engineering teams and select contract opportunities."
          align="center"
          accentColor="cyan"
          className="mb-12"
        />

        {/* Action Hub & Telemetry Reveal */}
        <ProgressiveReveal direction="up" delayMs={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Email Button with Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EMAIL ME</span>
              <Mail className="w-4 h-4" />
            </button>

            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/60 backdrop-blur-xl hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-200 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center gap-2 group"
            >
              <span>VIEW RESUME</span>
              <FileText className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/60 backdrop-blur-xl hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-200 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center gap-2"
            >
              <span>LINKEDIN</span>
              <Linkedin className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </ProgressiveReveal>

        {/* Replaceable Metadata Reference Box */}
        <ProgressiveReveal direction="up" delayMs={200}>
          <div className="inline-block p-4 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/5 text-xs font-mono text-zinc-400">
            <div>
              EMAIL: <span className="text-zinc-200">thapaprabhat4@gmail.com</span>
            </div>
            <div className="mt-1">
              LOCATION: <span className="text-zinc-200">Kathmandu, Nepal (Available Globally)</span>
            </div>
          </div>
        </ProgressiveReveal>
      </div>

      {/* Direct Transmission Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </section>
  );
}
