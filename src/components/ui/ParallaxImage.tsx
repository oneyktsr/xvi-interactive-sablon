"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  aspectRatio = "aspect-[4/3]",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current || !maskRef.current)
        return;

      // 1. REVEAL (Açılış)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        maskRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.out",
        }
      ).fromTo(
        imageRef.current,
        { scale: 1.3, filter: "blur(10px)" },
        {
          scale: 1.1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power4.out",
          force3D: true, // GPU Zorlaması
        },
        "<"
      );

      // 2. PARALLAX (Scroll Hareketi)
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        force3D: true, // GPU Zorlaması
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // 0 koyarsak gecikmesiz (daha performanslı) olur
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden w-full",
        aspectRatio,
        className
      )}
    >
      <div
        ref={maskRef}
        className="w-full h-full relative overflow-hidden gpu-accelerated"
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          className="object-cover will-change-transform" // CSS tarafında da hint veriyoruz
          sizes="(max-width: 768px) 100vw, 50vw" // Mobil performansı için kritik
          priority={false} // Lazy load açık olsun
        />
      </div>
    </div>
  );
}
