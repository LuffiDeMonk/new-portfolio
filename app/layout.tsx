import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Prabhat Thapa — Frontend Engineer & UI Systems Architect",
  description:
    "Building scalable interfaces, production design systems, and resilient frontend architectures with React, Next.js, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${poppins.className} bg-zinc-950 text-zinc-100 antialiased selection:bg-cyan-400 selection:text-black min-h-screen overflow-x-clip`}
      >
        {children}
        <Toaster richColors position="top-right" closeButton expand />
      </body>
    </html>
  );
}
