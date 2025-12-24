"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroller() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // SAYFA DEĞİŞİM MANTIĞI
  useEffect(() => {
    if (lenisRef.current) {
      // 1. Yeni sayfa geldi, scroll'u hemen en başa al (Zıplamasız)
      lenisRef.current.scrollTo(0, { immediate: true });

      // 2. Scroll'u kilitle (Animasyon bitene kadar)
      lenisRef.current.stop();

      // 3. 1.1 saniye sonra (Fade-in bitince) kilidi aç
      const timer = setTimeout(() => {
        lenisRef.current?.start();
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
