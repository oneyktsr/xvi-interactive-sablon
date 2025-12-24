"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      const chars = titleSplit.chars;

      gsap.set(chars, { opacity: 0 });
      gsap.set(rightSectionRef.current, { opacity: 0 });

      tl.to(chars, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "random",
        },
      });

      tl.to(rightSectionRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      const counter = { val: 0 };

      tl.to(counter, {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.floor(counter.val) + "%";
          }
        },
      }).to(
        barRef.current,
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
          transformOrigin: "left",
        },
        "<"
      );

      tl.to([wrapperRef.current], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.2,
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        display: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      // DÜZELTME 1: Global padding değişkeni kullanıldı (px-[var(--spacing-margin)])
      className="fixed inset-0 z-[9999] bg-black text-white w-full h-screen flex flex-col justify-center px-[var(--spacing-margin)]"
    >
      <div
        ref={wrapperRef}
        // DÜZELTME 2: Flex yerine 'main-grid' kullanıldı ve iç padding sıfırlandı (!px-0)
        // items-end: Yazı tabanı ile barın hizalanması için
        className="w-full main-grid !px-0 items-end"
      >
        {/* SOL TARAF (Logo) */}
        {/* Mobilde 2, Tablette 4, Masaüstünde 6 sütun */}
        <div className="col-span-2 md:col-span-4 lg:col-span-6 overflow-hidden">
          <h1
            ref={titleRef}
            // Başlık font boyutu global type sınıfları ile uyumlu hale getirilebilir ama
            // senin tasarımını bozmamak için text-3xl vs. korundu.
            className="preloader-title text-3xl md:text-5xl lg:text-7xl font-normal uppercase tracking-[-0.02em] leading-none"
          >
            XVI INTERACTIVE
          </h1>
        </div>

        {/* SAĞ TARAF (Sayaç ve Bar) */}
        {/* Mobilde 2, Tablette 4, Masaüstünde 6 sütun (Sağa yaslı) */}
        <div
          ref={rightSectionRef}
          className="col-span-2 md:col-span-4 lg:col-span-6 flex flex-col items-end justify-end gap-2 w-full"
        >
          <span
            ref={percentRef}
            className="text-sm md:text-lg font-mono font-normal block tracking-[-0.01em]"
          >
            0%
          </span>
          {/* Bar Genişliği: Kendi grid alanının tamamını kaplasın diye w-full */}
          <div className="w-full h-[1px] md:h-[2px] overflow-hidden bg-white/20">
            <div
              ref={barRef}
              className="w-full h-full bg-white scale-x-0 origin-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
