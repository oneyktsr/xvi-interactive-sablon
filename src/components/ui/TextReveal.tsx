"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

// Tip tanımları
interface GSAPSplitText {
  lines: HTMLElement[];
  revert: () => void;
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
  tagName?: React.ElementType;
  once?: boolean;
}

export default function TextReveal({
  children,
  className,
  animateOnScroll = true,
  delay = 0,
  tagName = "div",
  once = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = tagName;

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || !element.textContent || element.textContent.trim() === "")
        return;

      let split: GSAPSplitText | null = null;

      // 1. SplitText Başlat
      try {
        split = new SplitText(element, {
          type: "lines",
          linesClass: "line gpu-accelerated",
        }) as unknown as GSAPSplitText;
      } catch (err) {
        return; // Hata varsa çık
      }

      // 2. Güvenlik
      if (!split || !split.lines || split.lines.length === 0) return;

      // 3. Wrapper Ekleme (Maskeleme efekti için şart)
      split.lines.forEach((line: HTMLElement) => {
        const wrapper = document.createElement("div");
        wrapper.className = "line-wrapper";
        wrapper.style.paddingBottom = "0.1em"; // Harf kuyrukları kesilmesin diye
        wrapper.style.overflow = "hidden"; // Maskeleme
        if (line.parentNode) {
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        }
      });

      // 4. Animasyon Hedeflerini Belirle
      const linesToAnimate = split.lines;

      // 5. ANİMASYON (fromTo kullanarak durumu garantiye alıyoruz)
      if (animateOnScroll) {
        gsap.fromTo(
          linesToAnimate,
          {
            yPercent: 100, // Başlangıç: Aşağıda
            opacity: 0, // Başlangıç: Görünmez
          },
          {
            yPercent: 0, // Bitiş: Yerinde
            opacity: 1, // Bitiş: Görünür
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: delay,
            force3D: true,
            scrollTrigger: {
              trigger: element, // Tetikleyici container
              start: "top 85%", // Ekranın %85'ine gelince başla (95 bazen geç kalıyor)
              end: "bottom center",
              once: once, // Tek seferlik mi?
              toggleActions: once
                ? "play none none none"
                : "play none none reverse",
            },
          }
        );
      } else {
        // Scroll yoksa direkt oynat
        gsap.fromTo(
          linesToAnimate,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: delay,
          }
        );
      }

      // NOT: revert() işlemini kaldırdık.
      // useGSAP otomatik temizliyor, manuel revert bazen animasyon bitmeden DOM'u bozuyor.
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, once, children],
    }
  );

  return (
    <Tag ref={containerRef} className={clsx("text-reveal", className)}>
      {children}
    </Tag>
  );
}
