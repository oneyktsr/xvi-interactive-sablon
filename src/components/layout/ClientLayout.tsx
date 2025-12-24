"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/ui/Preloader";
import SmoothScroller from "@/components/ui/SmoothScroller";
import GridDebugger from "@/components/layout/GridDebugger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Template from "@/app/template"; // EKLENDİ

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [layoutState, setLayoutState] = useState<
    "checking" | "loading" | "ready"
  >("checking");

  useEffect(() => {
    // Session storage kontrolü: Daha önce girdi mi?
    const hasSeenPreloader = sessionStorage.getItem("xvi-preloader-seen");

    const timer = setTimeout(() => {
      if (hasSeenPreloader) {
        setLayoutState("ready");
      } else {
        setLayoutState("loading");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("xvi-preloader-seen", "true");
    setLayoutState("ready");
    document.body.style.overflow = "auto";
  };

  // 1. KONTROL AŞAMASI (FOUC önlemek için siyah ekran)
  if (layoutState === "checking") {
    return <div className="fixed inset-0 bg-black z-[99999]" />;
  }

  return (
    <>
      <SmoothScroller />
      <GridDebugger />

      {/* 2. YÜKLEME AŞAMASI */}
      {layoutState === "loading" && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* 3. İÇERİK AŞAMASI */}
      {/* Navbar Fade-In Efekti */}
      <div
        className={`transition-opacity duration-1000 ease-out relative z-50 ${
          layoutState === "ready" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
      </div>

      {/* ANA İÇERİK (Sadece hazır olunca mount edilir) */}
      {layoutState === "ready" && (
        <Template>
          {/* DÜZELTME: Paddingler sayfalarda (page.tsx) tanımlı olduğu için buradan kaldırdık.
              Böylece "Hero" görselleri ekranın en tepesine kadar uzanabilir. */}
          <main className="min-h-screen w-full">{children}</main>

          <Footer />
        </Template>
      )}
    </>
  );
}
