"use client";

import Navbar from "./Navbar";
import Footer from "./Footer"; // Footer Eklendi
import GridDebugger from "./GridDebugger"; // Debugger Eklendi
import { UIProvider } from "@/context/UIContext";
import SmoothScroller from "@/components/ui/SmoothScroller";
import Preloader from "@/components/ui/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <SmoothScroller />
      <Preloader />
      <GridDebugger />

      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        {/* Footer en alta sabitlendi */}
        <Footer />
      </main>
    </UIProvider>
  );
}
