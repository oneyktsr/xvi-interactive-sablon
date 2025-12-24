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

export default function TextReveal({
  children,
  className,
  animateOnScroll = true,
  delay = 0,
  tagName = "div",
}: {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
  tagName?: React.ElementType;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Tag = tagName;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: "lines",
        linesClass: "line gpu-accelerated", // GPU sınıfını ekledik!
      });

      // Satırları sarmalama işlemi
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "line-wrapper";
        wrapper.style.paddingBottom = "0.1em";
        if (line.parentNode) {
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        }
      });

      // Başlangıç durumu
      gsap.set(split.lines, { yPercent: 100, opacity: 0 });

      const animationProps = {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out", // Daha akışkan bir ease
        delay: delay,
        force3D: true, // GSAP'ı 3D kullanmaya zorla
      };

      if (animateOnScroll) {
        gsap.to(split.lines, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%", // Biraz daha erken başlasın ki takılma hissi olmasın
            toggleActions: "play none none reverse",
            // markers: true, // Geliştirme aşamasında açılabilir
          },
        });
      } else {
        gsap.to(split.lines, animationProps);
      }
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  return (
    <Tag ref={containerRef} className={clsx("text-reveal", className)}>
      {children}
    </Tag>
  );
}
