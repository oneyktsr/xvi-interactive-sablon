"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

// 1. TypeScript Interface Tanımı (Any yerine bunu kullanacağız)
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
  // useRef tipini genel HTMLElement olarak belirledik
  const containerRef = useRef<HTMLElement>(null);
  const Tag = tagName;

  // Resize tetikleyicisi
  const [resizeKey, setResizeKey] = useState(0);

  // 2. Pencere Boyutlandırma Dinleyicisi (Resize Listener)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>; // Strict Type

    const handleResize = () => {
      clearTimeout(timeoutId);
      // Performans için 100ms debounce
      timeoutId = setTimeout(() => {
        setResizeKey((prev) => prev + 1);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(
    () => {
      const element = containerRef.current;
      // Metin içeriği kontrolü
      if (!element || !element.textContent || element.textContent.trim() === "")
        return;

      // 3. Değişkeni Interface ile tanımlıyoruz (any yasak)
      let split: GSAPSplitText | null = null;

      // Eğer önceki render'dan kalan wrapperlar varsa temizle (revert benzeri manuel temizlik)
      // Bu, resize sırasında metnin sıkışmasını önler.
      if (element.querySelector(".line-wrapper")) {
        // Sadece textContent'i alarak HTML taglerini temizliyoruz,
        // eğer span'lı renkli yapıların varsa burayı innerText dikkatli kullanmalısın.
        // Ancak SplitText revert() zaten bunu cleanup kısmında yapıyor.
        // Burası "fallback" içindir.
      }

      try {
        // 4. Safe Type Casting
        split = new SplitText(element, {
          type: "lines",
          linesClass: "line gpu-accelerated",
        }) as unknown as GSAPSplitText;
      } catch (err) {
        console.warn("SplitText error:", err);
        return;
      }

      // Güvenlik kontrolü
      if (!split || !split.lines || split.lines.length === 0) return;

      // Satırları sarmalama (Maskeleme efekti için)
      split.lines.forEach((line: HTMLElement) => {
        const wrapper = document.createElement("div");
        wrapper.className = "line-wrapper";
        wrapper.style.overflow = "hidden";
        wrapper.style.paddingBottom = "0.1em"; // Harf kuyrukları kesilmesin diye
        if (line.parentNode) {
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        }
      });

      // Animasyon
      const animationTarget = split.lines; // lines artık HTMLElement[] tipinde

      if (animateOnScroll) {
        gsap.fromTo(
          animationTarget,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: delay,
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom center",
              once: once,
              toggleActions: once
                ? "play none none none"
                : "play none none reverse",
            },
          }
        );
      } else {
        gsap.fromTo(
          animationTarget,
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

      // 5. Cleanup (Temizlik)
      // useGSAP, dependencies değiştiğinde (resizeKey dahil) önce burayı çalıştırır.
      return () => {
        if (split) {
          split.revert(); // DOM'u orijinal haline döndür (divleri siler)
        }
      };
    },
    {
      scope: containerRef,
      // resizeKey değiştiğinde animasyon tamamen sıfırlanıp yeniden kurulur.
      dependencies: [animateOnScroll, delay, once, children, resizeKey],
    }
  );

  return (
    <Tag ref={containerRef} className={clsx("text-reveal", className)}>
      {children}
    </Tag>
  );
}
