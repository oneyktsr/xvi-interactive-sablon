"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// ts-ignore
import { SplitText } from "@/lib/gsap/SplitText";
import { useUI } from "@/context/UIContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function Preloader() {
  const { setIsLoaded } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);
  const isStartedRef = useRef(false);

  // Scroll Kilidi
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Sayaç Mantığı
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (isStartedRef.current) return;
      isStartedRef.current = true;

      let split: any; // any kullanımı GSAP plugin için gerekli
      if (titleRef.current) {
        try {
          // ts-ignore
          split = new SplitText(titleRef.current, { type: "chars" });
          // Harfleri JS ile de gizle (Garanti olsun)
          if (split?.chars) gsap.set(split.chars, { opacity: 0 });
        } catch (e) {
          console.warn(e);
        }
      }
      gsap.set(counterRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          gsap.set(containerRef.current, { display: "none" });
        },
      });

      // 1. Logo Giriş
      if (split?.chars) {
        tl.to(split.chars, {
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        });
      }
      // 2. Sayaç Giriş
      tl.to(counterRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");
      // 3. Bekle
      tl.to({}, { duration: 0.8 });
      // 4. İçerik Çıkış
      tl.to([counterRef.current, titleRef.current], {
        opacity: 0,
        duration: 0.5,
      });
      // 5. Perde Çıkış
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.8 });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-full h-screen bg-black flex flex-col justify-center pointer-events-none"
    >
      <div className="h-screen w-full flex flex-col justify-center px-[var(--spacing-margin)] relative z-10">
        <div className="main-grid !px-0 items-end w-full relative pb-0">
          <div className="col-span-6 w-full overflow-hidden">
            {/* opacity-0: Harfler JS yüklenene kadar görünmez olsun (FOUC önleme) */}
            <h1
              ref={titleRef}
              className="text-white font-light leading-none tracking-tight flex items-start opacity-0"
              style={{ fontSize: "clamp(24px, 5vw, 48px)" }}
            >
              <span>XVI</span>
              <span className="text-[0.4em] relative -top-[0.1em] mx-[0.1em]">
                ®
              </span>
              <span>INTERACTIVE</span>
            </h1>
          </div>
          <div className="col-start-7 col-span-6 flex justify-end items-end">
            <div
              ref={counterRef}
              className="text-white font-mono text-[14px] pb-[0.2em] opacity-80"
            >
              {counter}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
