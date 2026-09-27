import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prabhat Thapa — Frontend Engineer & UI Systems Architect",
  description:
    "Building scalable interfaces, production design systems, and resilient frontend architectures with React, Next.js, and TypeScript.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative min-h-screen">{children}</main>;
}
