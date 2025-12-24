"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ScrambleButton from "@/components/ui/ScrambleButton";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- LOGO HARF VERİLERİ (Orijinal Boyutlar) ---
const logoLetters = [
  // --- XVI ---
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

  // --- INTERACTIVE (Boşluksuz devam ediyor) ---
  {
    char: "I",
    w: 4.4,
    d: "M4.40 12.07L4.40 48.44L0 48.44L0 12.07L4.40 12.07Z",
  },
  {
    char: "N",
    w: 28.84,
    d: "M28.84 12.07L28.84 48.44L24.57 48.44L4.76 19.89L4.40 19.89L4.40 48.44L0 48.44L0 12.07L4.26 12.07L24.15 40.70L24.50 40.70L24.50 12.07L28.84 12.07Z",
  },
  {
    char: "T",
    w: 27.27,
    d: "M0 15.98L0 12.07L27.27 12.07L27.27 15.98L15.84 15.98L15.84 48.44L11.43 48.44L11.43 15.98L0 15.98Z",
  },
  {
    char: "E",
    w: 22.23,
    d: "M0 48.44L0 12.07L21.95 12.07L21.95 15.98L4.40 15.98L4.40 28.27L20.81 28.27L20.81 32.17L4.40 32.17L4.40 44.53L22.23 44.53L22.23 48.44L0 48.44Z",
  },
  {
    char: "R",
    w: 26.07,
    d: "M0 48.44L0 12.07L12.29 12.07Q16.55 12.07 19.28 13.52Q22.02 14.97 23.33 17.49Q24.64 20.01 24.64 23.22Q24.64 26.44 23.33 28.92Q22.02 31.41 19.30 32.82Q16.58 34.23 12.36 34.23L2.41 34.23L2.41 30.26L12.22 30.26Q15.13 30.26 16.91 29.40Q18.70 28.55 19.50 26.98Q20.31 25.41 20.31 23.22Q20.31 21.04 19.50 19.41Q18.68 17.77 16.89 16.88Q15.09 15.98 12.14 15.98L4.40 15.98L4.40 48.44L0 48.44M17.12 32.10L26.07 48.44L20.95 48.44L12.14 32.10L17.12 32.10Z",
  },
  {
    char: "A",
    w: 31.25,
    d: "M4.62 48.44L0 48.44L13.35 12.07L17.90 12.07L31.25 48.44L26.63 48.44L15.77 17.83L15.48 17.83L4.62 48.44M6.32 34.23L24.93 34.23L24.93 38.14L6.32 38.14L6.32 34.23Z",
  },
  {
    char: "C",
    w: 30.68,
    d: "M30.68 23.44L26.28 23.44Q25.89 21.54 24.92 20.10Q23.95 18.66 22.58 17.68Q21.20 16.69 19.53 16.19Q17.86 15.70 16.05 15.70Q12.75 15.70 10.08 17.37Q7.40 19.03 5.83 22.28Q4.26 25.53 4.26 30.26Q4.26 34.98 5.83 38.23Q7.40 41.48 10.08 43.15Q12.75 44.82 16.05 44.82Q17.86 44.82 19.53 44.32Q21.20 43.82 22.58 42.84Q23.95 41.85 24.92 40.40Q25.89 38.96 26.28 37.07L30.68 37.07Q30.18 39.86 28.87 42.06Q27.56 44.26 25.60 45.80Q23.65 47.34 21.23 48.14Q18.80 48.93 16.05 48.93Q11.40 48.93 7.78 46.66Q4.15 44.39 2.08 40.20Q0 36.01 0 30.26Q0 24.50 2.08 20.31Q4.15 16.12 7.78 13.85Q11.40 11.58 16.05 11.58Q18.80 11.58 21.23 12.38Q23.65 13.17 25.60 14.71Q27.56 16.25 28.87 18.44Q30.18 20.63 30.68 23.44Z",
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

export default function Home() {
  const selectedProjects = projects.slice(0, 2);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // --- HERO ANIMATIONS ---
  useGSAP(
    () => {
      // 1. LOGO SİNEMATİK GİRİŞ (SOFT + BLUR)
      if (logoWrapperRef.current) {
        const chars = logoWrapperRef.current.querySelectorAll(".logo-char");

        gsap.fromTo(
          chars,
          {
            opacity: 0,
            filter: "blur(10px)", // Sinematik Blur Başlangıcı
          },
          {
            opacity: 1,
            filter: "blur(0px)", // Netleşme
            duration: 2.5, // Yavaş ve asil
            ease: "power2.out",
            stagger: {
              amount: 1, // Tüm harfler 1 saniye içinde sırayla gelir
              from: "random",
            },
            delay: 0.2,
          }
        );
      }

      // 2. Parallax Scroll
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

  // --- VIDEO PARALLAX ---
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
        className="h-[80vh] w-full flex flex-col justify-end px-[var(--spacing-margin)] pb-[20px] relative z-0"
      >
        {/* SVG LOGO WRAPPER */}
        {/* BOŞLUK REVİZESİ:
            pt-[65px]: Navbar'ın hemen altına, yaklaşık 10px boşluk bırakacak şekilde yukarı çekildi.
            Bu değer hem mobilde hem masaüstünde sabit tutuldu (Navbar yüksekliği sabit olduğu için).
        */}
        <div
          ref={heroTitleWrapperRef}
          className="absolute inset-0 flex items-start pt-[65px] md:pt-[65px] w-full px-[var(--spacing-margin)] pointer-events-none"
        >
          <div className="main-grid w-full !px-0">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 w-full">
              {/* H1 LOGO:
                        - gap-[0.2%]: Harflerin birbirine yapışmasını önleyen "azıcık" boşluk.
                     */}
              <h1
                ref={logoWrapperRef}
                className="w-full flex items-end gap-[0.2%]"
                aria-label="XVI INTERACTIVE"
              >
                {logoLetters.map((letter, index) => (
                  <div
                    key={index}
                    // flex: letter.w -> Harf genişliğine göre oransal dağılım
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

        {/* ALT METİNLER */}
        <div className="main-grid !px-0 items-end w-full relative z-10 pointer-events-none">
          <div className="col-span-2 md:col-span-2 hidden md:block">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.4}>Global Design</TextReveal>
              <TextReveal delay={0.5}>& Development Studio</TextReveal>
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 hidden md:block">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.6}>Moving Ideas</TextReveal>
              <TextReveal delay={0.7}>Elevating Performance</TextReveal>
            </div>
          </div>

          <div className="col-span-4 md:hidden">
            <div className="text-white text-[16px] leading-tight font-light !normal-case flex flex-col gap-0.5">
              <TextReveal delay={0.4}>Global Design</TextReveal>
              <TextReveal delay={0.5}>& Development Studio</TextReveal>
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

      {/* --- WHITE SECTION --- */}
      <div className="bg-white text-black relative z-10">
        <section className="px-[var(--spacing-margin)] pt-32 pb-32">
          <div className="flex items-end justify-between mb-20 border-b border-black/10 pb-4">
            <TextReveal tagName="h2" className="type-h2 font-normal uppercase">
              Selected Works
            </TextReveal>
            <div className="hidden md:block">
              <TransitionLink href="/works">
                <ScrambleButton className="type-caption px-6 py-3 border border-black/20 hover:bg-black hover:text-white transition-colors">
                  View All
                </ScrambleButton>
              </TransitionLink>
            </div>
          </div>
          <div className="flex flex-col gap-32">
            {selectedProjects.map((project, index) => (
              <TransitionLink
                key={project.id}
                href={`/works/${project.slug}`}
                className="group block"
              >
                <div className="main-grid !px-0 items-center gap-y-8">
                  <div
                    className={`col-span-4 md:col-span-8 lg:col-span-7 w-full ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <ParallaxImage
                      src={project.src}
                      alt={project.title}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                  <div
                    className={`col-span-4 md:col-span-8 lg:col-span-4 flex flex-col gap-6 ${
                      index % 2 === 1
                        ? "lg:order-1"
                        : "lg:order-2 lg:col-start-9"
                    }`}
                  >
                    <div className="border-b border-black/10 pb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <TextReveal
                          tagName="span"
                          className="type-caption text-gray-500"
                          delay={0.1}
                        >
                          0{index + 1}
                        </TextReveal>
                        <TextReveal
                          tagName="div"
                          className="type-caption text-gray-500"
                          delay={0.1}
                        >
                          {project.year}
                        </TextReveal>
                      </div>
                      <TextReveal
                        tagName="h3"
                        className="type-h2 font-light uppercase leading-none group-hover:italic transition-all duration-500"
                      >
                        {project.title}
                      </TextReveal>
                    </div>
                    <TextReveal
                      tagName="div"
                      className="type-body text-gray-600"
                    >
                      {project.description}
                    </TextReveal>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
