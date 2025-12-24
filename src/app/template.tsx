"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Güvenlik temizlikleri
    document.body.classList.remove("is-transitioning");
    document.documentElement.classList.remove("is-transitioning");
    const safetyTimer = setTimeout(() => {
      document.body.classList.remove("is-transitioning");
      document.documentElement.classList.remove("is-transitioning");
    }, 2000);
    return () => clearTimeout(safetyTimer);
  }, [pathname]);

  useGSAP(
    () => {
      window.scrollTo(0, 0);
      document.body.classList.add("is-transitioning");

      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.1,
          onComplete: () => {
            document.body.classList.remove("is-transitioning");
            ScrollTrigger.refresh();
          },
          onInterrupt: () => {
            document.body.classList.remove("is-transitioning");
          },
        }
      );

      return () => {
        document.body.classList.remove("is-transitioning");
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="page-transition-container"
      key={pathname}
      // DİKKAT: Buraya px-[var(--spacing-margin)] EKLEME.
      // Çünkü içerideki sayfalar (Home, Works) zaten kendi padding'ine sahip.
      // Buraya eklersen "Double Padding" (80px boşluk) oluşur.
      className="min-h-screen w-full"
    >
      {children}
    </div>
  );
}
