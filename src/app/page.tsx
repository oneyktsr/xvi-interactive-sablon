"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- LOGO DATA ---
const logoLetters = [
  {
    char: "X",
    w: 29.4,
    d: "M5.18 12.07L14.56 27.20L14.84 27.20L24.22 12.07L29.40 12.07L17.97 30.26L29.40 48.44L24.22 48.44L14.84 33.59L14.56 33.59L5.18 48.44L0 48.44L11.72 30.26L0 12.07L5.18 12.07Z",
  },
  {
    char: "V",
    w: 31.25,
    d: "M4.62 12.07L15.41 42.68L15.84 42.68L26.63 12.07L31.25 12.07L17.90 48.44L13.35 48.44L0 12.07L4.62 12.07Z",
  },
  {
    char: "I",
    w: 4.4,
    d: "M4.40 12.07L4.40 48.44L0 48.44L0 12.07L4.40 12.07Z",
  },
  {
    char: "R_SYM",
    w: 29.4,
    d: "M9.23 32.17L9.23 19.07L15.87 19.07Q16.67 19.07 17.61 19.52Q18.55 19.98 19.22 20.91Q19.89 21.84 19.89 23.26Q19.89 24.70 19.19 25.70Q18.50 26.70 17.52 27.22Q16.53 27.73 15.66 27.73L10.87 27.73L10.87 25.60L14.77 25.60Q15.36 25.60 16.04 25.02Q16.73 24.43 16.73 23.26Q16.73 22.05 16.04 21.63Q15.36 21.20 14.84 21.20L12.11 21.20L12.11 32.17L9.23 32.17M17.15 25.99L20.42 32.17L17.26 32.17L14.06 25.99L17.15 25.99M14.20 39.99Q11.26 39.99 8.68 38.88Q6.11 37.78 4.15 35.83Q2.20 33.88 1.10 31.30Q0 28.73 0 25.78Q0 22.83 1.10 20.26Q2.20 17.68 4.15 15.73Q6.11 13.78 8.68 12.68Q11.26 11.58 14.20 11.58Q17.15 11.58 19.73 12.68Q22.30 13.78 24.25 15.73Q26.21 17.68 27.31 20.26Q28.41 22.83 28.41 25.78Q28.41 28.73 27.31 31.30Q26.21 33.88 24.25 35.83Q22.30 37.78 19.73 38.88Q17.15 39.99 14.20 39.99M14.20 36.58Q17.19 36.58 19.64 35.12Q22.09 33.66 23.54 31.21Q25 28.76 25 25.78Q25 22.80 23.54 20.35Q22.09 17.90 19.64 16.44Q17.19 14.99 14.20 14.99Q11.22 14.99 8.77 16.44Q6.32 17.90 4.87 20.35Q3.41 22.80 3.41 25.78Q3.41 28.76 4.87 31.21Q6.32 33.66 8.77 35.12Q11.22 36.58 14.20 36.58Z",
  },
  {
    char: "T",
    w: 27.27,
    d: "M0 15.98L0 12.07L27.27 12.07L27.27 15.98L15.84 15.98L15.84 48.44L11.43 48.44L11.43 15.98L0 15.98Z",
  },
  {
    char: "I",
    w: 4.4,
    d: "M4.40 12.07L4.40 48.44L0 48.44L0 12.07L4.40 12.07Z",
  },
  {
    char: "V",
    w: 31.25,
    d: "M4.62 12.07L15.41 42.68L15.84 42.68L26.63 12.07L31.25 12.07L17.90 48.44L13.35 48.44L0 12.07L4.62 12.07Z",
  },
  {
    char: "E",
    w: 22.23,
    d: "M0 48.44L0 12.07L21.95 12.07L21.95 15.98L4.40 15.98L4.40 28.27L20.81 28.27L20.81 32.17L4.40 32.17L4.40 44.53L22.23 44.53L22.23 48.44L0 48.44Z",
  },
];

const useScrambleText = (
  targetRef: React.RefObject<HTMLElement | null>,
  text: string
) => {
  useGSAP(
    () => {
      if (!targetRef.current) return;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      let iterations = 0;
      ScrollTrigger.create({
        trigger: targetRef.current,
        start: "top 90%",
        onEnter: () => {
          const interval = setInterval(() => {
            if (!targetRef.current) return;
            targetRef.current.innerText = text
              .split("")
              .map((letter, index) => {
                if (index < iterations) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("");
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
          }, 30);
        },
        once: true,
      });
    },
    { scope: targetRef }
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const studioTextRef = useRef<HTMLDivElement>(null);

  useScrambleText(studioTextRef, "The Studio");

  // Hero Logo Animation
  useGSAP(
    () => {
      if (logoWrapperRef.current) {
        const chars = logoWrapperRef.current.querySelectorAll(".logo-char");
        gsap.fromTo(
          chars,
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
      }
      if (!heroTitleWrapperRef.current || !heroRef.current) return;
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
    },
    { scope: heroRef }
  );

  // Video Parallax
  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.fromTo(
        videoWrapperRef.current,
        { yPercent: -30, ease: "none" },
        { yPercent: 30, ease: "none" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full bg-black">
      {/* --- HERO SECTION --- */}
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
              <h1
                ref={logoWrapperRef}
                className="w-full flex items-end gap-[0.2%]"
                aria-label="XVI INTERACTIVE"
              >
                {logoLetters.map((letter, index) => (
                  <div
                    key={index}
                    style={{ flex: letter.w }}
                    className="flex justify-center"
                  >
                    <svg
                      viewBox={`0 12.07 ${letter.w} 36.37`}
                      className="w-full h-auto fill-white logo-char"
                    >
                      <path d={letter.d} />
                    </svg>
                  </div>
                ))}
              </h1>
            </div>
          </div>
        </div>
        <div className="main-grid !px-0 items-end w-full relative z-10 pointer-events-none">
          <div className="col-span-2 md:col-span-2 hidden md:block">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.4} once>
                Global Design
              </TextReveal>
              <TextReveal delay={0.5} once>
                & Development Studio
              </TextReveal>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2 hidden md:block">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.6} once>
                Moving Ideas
              </TextReveal>
              <TextReveal delay={0.7} once>
                Elevating Performance
              </TextReveal>
            </div>
          </div>
          <div className="col-span-4 md:hidden">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.4} once>
                Global Design
              </TextReveal>
              <TextReveal delay={0.5} once>
                & Development Studio
              </TextReveal>
            </div>
          </div>
          <div className="col-span-2 col-start-11 text-right flex justify-end">
            <div className="animate-bounce duration-[2000ms]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white opacity-80"
              >
                <path
                  d="M12 5V19M12 19L18 13M12 19L6 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      <section
        className="w-full h-screen overflow-hidden relative z-0 bg-black"
        ref={containerRef}
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

      {/* --- AGENCY DESCRIPTION SECTION --- */}
      <section className="bg-black text-white px-[var(--spacing-margin)] pt-[60px] pb-32 relative z-10">
        <div className="main-grid !px-0 gap-y-16">
          {/* THE STUDIO & ANA BAŞLIK */}
          <div className="col-span-4 md:col-span-8 lg:col-span-12 relative">
            {/* 1. "The Studio" LABEL */}
            {/* Masaüstü: 1. Kolon. Diğerleri: En üstte. */}
            <div className="absolute left-0 top-0 lg:pt-[0.4em] w-[25%] md:w-[12.5%] lg:w-[8.33%] z-10 pointer-events-none">
              <div
                ref={studioTextRef}
                className="text-[14px] md:text-[16px] font-light text-white leading-tight"
              ></div>
            </div>

            {/* 2. ANA METİN (KALIP SİSTEMİ) */}
            {/* - Desktop: 3.2vw (4 satır)
                - Tablet: 4.5vw (5 satır)
                - Mobil: 6.2vw (6 satır) -> BURASI GÜNCELLENDİ (Eskiden 7.5vw idi)
            */}

            {/* --- MASAÜSTÜ (LG+) - NET 4 SATIR (KALIP) --- */}
            <div className="hidden lg:block w-full">
              <h2 className="text-[3.2vw] leading-[1.1] font-light">
                {/* 1. Satır: %25 margin-left ile 4. kolondan başlar */}
                <div className="ml-[25.5%]">
                  <TextReveal once>
                    Transforming your ideas into impactful digital
                  </TextReveal>
                </div>
                {/* 2. Satır: Tam genişlik */}
                <div>
                  <TextReveal once>
                    experiences by delivering top-tier web development and
                  </TextReveal>
                </div>
                {/* 3. Satır: Tam genişlik */}
                <div>
                  <TextReveal once>
                    visual content, ensuring every project lives up to your
                    brand with
                  </TextReveal>
                </div>
                {/* 4. Satır: Tam genişlik */}
                <div>
                  <TextReveal once>creativity and precision.</TextReveal>
                </div>
              </h2>
            </div>

            {/* --- TABLET (MD) - NET 5 SATIR (KALIP) --- */}
            <div className="hidden md:block lg:hidden w-full">
              <h2 className="text-[4.5vw] leading-[1.1] font-light indent-[25%]">
                <TextReveal once>
                  <span style={{ textWrap: "balance" }}>
                    Transforming your ideas into impactful digital experiences
                    by delivering top-tier web development and visual content,
                    ensuring every project lives up to your brand with
                    creativity and precision.
                  </span>
                </TextReveal>
              </h2>
            </div>

            {/* --- MOBİL (SM) - NET 6 SATIR (KALIP) --- */}
            <div className="block md:hidden w-full">
              {/* 7.5vw YERİNE 6.2vw YAPILDI */}
              <h2 className="text-[6.2vw] leading-[1.1] font-light indent-[25%]">
                <TextReveal once>
                  <span style={{ textWrap: "balance" }}>
                    Transforming your ideas into impactful digital experiences
                    by delivering top-tier web development and visual content,
                    ensuring every project lives up to your brand with
                    creativity and precision.
                  </span>
                </TextReveal>
              </h2>
            </div>
          </div>

          {/* ALT AÇIKLAMA */}
          <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-[var(--gutter)]">
            <div
              className="flex flex-col gap-8
                             col-start-2 col-span-3          /* MOBILE: 2. kolondan başla, 3 kolon kapla */
                             md:col-start-5 md:col-span-3    /* TABLET: 5, 6, 7. kolon */
                             lg:col-start-7 lg:col-span-3    /* DESKTOP: 7, 8, 9. kolon */
             "
            >
              <TextReveal
                once
                className="text-[14px] md:text-[16px] leading-relaxed text-white"
              >
                We are a specialized web and software development studio focused
                on transforming digital identities and creating impactful online
                experiences.
              </TextReveal>
              <TextReveal
                once
                className="text-[14px] md:text-[16px] leading-relaxed text-white"
              >
                Serving clients across various industries, we leverage clean,
                functional, and innovative design principles to empower forward
                thinking companies.
              </TextReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
