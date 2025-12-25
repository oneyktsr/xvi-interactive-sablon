"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import Logo from "@/components/ui/Logo"; // Yeni Logo Bileşeni
import { useUI } from "@/context/UIContext";
import clsx from "clsx";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { isLoaded } = useUI(); // Context'ten durumu al

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Animasyonlar
  useGSAP(
    () => {
      if (!isLoaded) return;

      // Logo Blur Girişi (Logo.tsx içindeki classları hedefler)
      gsap.fromTo(
        ".logo-char",
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "power2.out",
          stagger: { amount: 1, from: "random" },
          delay: 0.2,
        }
      );

      // Parallax Efektleri
      if (heroTitleWrapperRef.current && heroRef.current) {
        gsap.to(heroTitleWrapperRef.current, {
          yPercent: 60,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (containerRef.current && videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { yPercent: -30, ease: "none" },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div className="w-full bg-black min-h-screen">
      {/* İçerik, Preloader bitince görünür (Fade In) */}
      <div
        className={clsx(
          "transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        {/* HERO */}
        <section
          ref={heroRef}
          className="h-[80vh] w-full flex flex-col justify-end px-[var(--spacing-margin)] pb-[20px] relative z-20"
        >
          <div
            ref={heroTitleWrapperRef}
            className="absolute inset-0 flex items-start pt-[65px] md:pt-[65px] w-full px-[var(--spacing-margin)] pointer-events-none"
          >
            <div className="main-grid w-full !px-0">
              <div className="col-span-4 md:col-span-8 lg:col-span-12 w-full">
                {/* YENİ LOGO COMPONENT */}
                <Logo />
              </div>
            </div>
          </div>
          {/* Footer bilgilerini buraya ekleyebilirsin... (Kod kısalsın diye atladım, senin eski kodunu koru) */}
        </section>

        {/* VIDEO */}
        <section
          ref={containerRef}
          className="w-full h-screen overflow-hidden relative z-0 bg-black"
        >
          <div
            ref={videoWrapperRef}
            className="absolute w-full h-[160%] -top-[30%] left-0 will-change-transform"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/showreel.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </section>

        {/* DESC */}
        <section className="bg-black text-white px-[var(--spacing-margin)] pt-[60px] pb-32 relative z-10">
          <div className="main-grid !px-0">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 relative block">
              {/* "Transforming..." metni */}
              <h2
                className="text-[clamp(24px,4.5vw,60px)] leading-[1.1] font-light w-full block"
                style={{ textWrap: "pretty" }}
              >
                <TextReveal once>
                  <span
                    className="float-left w-[25%] h-[0.2em]"
                    aria-hidden="true"
                  ></span>
                  Transforming your ideas into impactful digital experiences by
                  delivering top-tier web development and visual content.
                </TextReveal>
              </h2>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12 py-[40px]">
              <div
                ref={dividerRef}
                className="w-full h-[1px] bg-white/30 origin-left scale-x-0 will-change-transform"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
