"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// ts-ignore: Local dosya type ignore
import { SplitText } from "@/lib/gsap/SplitText";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// TypeScript Interface Güncellemesi
interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
  tagName?: React.ElementType; // BU SATIR EKLENDİ (Hatayı çözen kısım)
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
  const [resizeKey, setResizeKey] = useState(0);
  const hasAnimatedRef = useRef(false);

  // Resize Listener
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setResizeKey((p) => p + 1), 300);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || !element.textContent?.trim()) return;

      let split: any; // Type casting yerine 'any' (GSAP plugin yapısı için gerekli)
      try {
        // ts-ignore
        split = new SplitText(element, {
          type: "lines",
          linesClass: "line will-change-transform",
        });
      } catch (err) {
        return;
      }

      if (!split || !split.lines.length) return;

      split.lines.forEach((line: HTMLElement) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        if (line.parentNode) {
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        }
      });

      const target = split.lines;

      if (hasAnimatedRef.current) {
        gsap.set(target, { yPercent: 0, opacity: 1 });
      } else {
        if (animateOnScroll) {
          gsap.fromTo(
            target,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
              delay: delay,
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: once
                  ? "play none none none"
                  : "play none none reverse",
                onEnter: () => {
                  hasAnimatedRef.current = true;
                },
              },
            }
          );
        } else {
          gsap.fromTo(
            target,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
              delay: delay,
              onComplete: () => {
                hasAnimatedRef.current = true;
              },
            }
          );
        }
      }

      return () => {
        if (split) split.revert();
      };
    },
    { scope: containerRef, dependencies: [resizeKey, children] }
  );

  return (
    <Tag ref={containerRef} className={clsx("opacity-100", className)}>
      {children}
    </Tag>
  );
}
