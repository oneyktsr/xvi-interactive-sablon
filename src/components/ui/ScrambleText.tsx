"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";

// HATA ÇÖZÜMÜ BURADA: shuffleDuration eklendi
interface ScrambleTextProps {
  children: string;
  className?: string;
  shuffleDuration?: number;
}

export default function ScrambleText({
  children,
  className = "",
  shuffleDuration = 0.5,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const isHoveringRef = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Harfleri böl
      splitRef.current = new SplitText(containerRef.current, {
        type: "chars",
        charsClass: "inline-block opacity-100",
      });
      const chars = splitRef.current.chars;

      const handleMouseEnter = () => {
        if (isHoveringRef.current) return;
        isHoveringRef.current = true;

        gsap.killTweensOf(chars);

        // Keyframe Animasyonu
        gsap.to(chars, {
          keyframes: [
            { opacity: 0, duration: 0.3, ease: "power1.in" },
            { opacity: 1, duration: 0.3, ease: "power1.out" },
          ],
          stagger: {
            amount: shuffleDuration, // Dinamik süre buradan geliyor
            from: "random",
          },
          onComplete: () => {
            isHoveringRef.current = false;
          },
          onInterrupt: () => {
            gsap.set(chars, { opacity: 1 });
            isHoveringRef.current = false;
          },
        });
      };

      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.addEventListener("mouseenter", handleMouseEnter);
      }

      return () => {
        if (parent) parent.removeEventListener("mouseenter", handleMouseEnter);
        splitRef.current?.revert();
      };
    },
    { scope: containerRef, dependencies: [shuffleDuration] }
  ); // Dependency eklendi

  return (
    <div
      ref={containerRef}
      className={`inline-block pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}
