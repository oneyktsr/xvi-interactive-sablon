"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Tarayıcının otomatik scroll'unu kapat, biz yöneteceğiz
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useGSAP(
    () => {
      // Sayfa değiştiğinde en tepeye al
      window.scrollTo(0, 0);

      // Sayfa Giriş Animasyonu (Fade In)
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.1, // Hafif gecikme render hatasını önler
          clearProps: "opacity", // Animasyon bitince stili temizle (z-index sorunlarını önler)
        }
      );
    },
    { scope: containerRef, dependencies: [pathname] }
  ); // Her sayfa değişiminde çalışır

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-black">
      {children}
    </div>
  );
}
