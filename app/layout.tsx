import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const mulish = Poppins({ subsets: ['devanagari'], weight: ['400', '600', '800'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        {children}
        <Toaster richColors position='top-right' closeButton expand />
      </body>
    </html>
  );
}
