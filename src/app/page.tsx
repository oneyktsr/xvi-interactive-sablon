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

export default function Home() {
  const selectedProjects = projects.slice(0, 2);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // --- PARALLAX ANIMATIONS ---
  useGSAP(
    () => {
      if (!heroTitleWrapperRef.current || !heroRef.current) return;
      gsap.to(heroTitleWrapperRef.current, {
        yPercent: 60, // Ağır baskı
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
        // Alt boşluk 20px olarak sabitlendi
        className="h-[80vh] w-full flex flex-col justify-end px-[var(--spacing-margin)] pb-[20px] relative z-0"
      >
        {/* SVG LOGO */}
        {/* Mobilde pt-[200px] ile üstten çakışma önlendi */}
        <div
          ref={heroTitleWrapperRef}
          className="absolute inset-0 flex items-start pt-[200px] md:pt-[96px] w-full px-[var(--spacing-margin)] pointer-events-none"
        >
          <div className="main-grid w-full !px-0">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 11.579999923706055 432.0299987792969 37.349998474121094"
                className="w-full h-auto fill-white"
              >
                <path d="M5.18 12.07L14.56 27.20L14.84 27.20L24.22 12.07L29.40 12.07L17.97 30.26L29.40 48.44L24.22 48.44L14.84 33.59L14.56 33.59L5.18 48.44L0 48.44L11.72 30.26L0 12.07L5.18 12.07ZM36.65 12.07L47.44 42.68L47.87 42.68L58.66 12.07L63.28 12.07L49.93 48.44L45.38 48.44L32.03 12.07L36.65 12.07ZM73.37 12.07L73.37 48.44L68.96 48.44L68.96 12.07L73.37 12.07ZM89.56 32.17L89.56 19.07L96.20 19.07Q97.00 19.07 97.94 19.52Q98.88 19.98 99.55 20.91Q100.21 21.84 100.21 23.26Q100.21 24.70 99.52 25.70Q98.83 26.70 97.84 27.22Q96.86 27.73 95.99 27.73L91.19 27.73L91.19 25.60L95.10 25.60Q95.69 25.60 96.37 25.02Q97.05 24.43 97.05 23.26Q97.05 22.05 96.37 21.63Q95.69 21.20 95.17 21.20L92.44 21.20L92.44 32.17L89.56 32.17M97.48 25.99L100.75 32.17L97.59 32.17L94.39 25.99L97.48 25.99M94.53 39.99Q91.58 39.99 89.01 38.88Q86.43 37.78 84.48 35.83Q82.53 33.88 81.43 31.30Q80.33 28.73 80.33 25.78Q80.33 22.83 81.43 20.26Q82.53 17.68 84.48 15.73Q86.43 13.78 89.01 12.68Q91.58 11.58 94.53 11.58Q97.48 11.58 100.05 12.68Q102.63 13.78 104.58 15.73Q106.53 17.68 107.63 20.26Q108.74 22.83 108.74 25.78Q108.74 28.73 107.63 31.30Q106.53 33.88 104.58 35.83Q102.63 37.78 100.05 38.88Q97.48 39.99 94.53 39.99M94.53 36.58Q97.51 36.58 99.96 35.12Q102.41 33.66 103.87 31.21Q105.33 28.76 105.33 25.78Q105.33 22.80 103.87 20.35Q102.41 17.90 99.96 16.44Q97.51 14.99 94.53 14.99Q91.55 14.99 89.10 16.44Q86.65 17.90 85.19 20.35Q83.74 22.80 83.74 25.78Q83.74 28.76 85.19 31.21Q86.65 33.66 89.10 35.12Q91.55 36.58 94.53 36.58ZM120.10 12.07L120.10 48.44L115.70 48.44L115.70 12.07L120.10 12.07ZM157.74 12.07L157.74 48.44L153.48 48.44L133.66 19.89L133.31 19.89L133.31 48.44L128.91 48.44L128.91 12.07L133.17 12.07L153.05 40.70L153.41 40.70L153.41 12.07L157.74 12.07ZM164.56 15.98L164.56 12.07L191.83 12.07L191.83 15.98L180.40 15.98L180.40 48.44L175.99 48.44L175.99 15.98L164.56 15.98ZM198.65 48.44L198.65 12.07L220.60 12.07L220.60 15.98L203.05 15.98L203.05 28.27L219.46 28.27L219.46 32.17L203.05 32.17L203.05 44.53L220.88 44.53L220.88 48.44L198.65 48.44ZM228.55 48.44L228.55 12.07L240.84 12.07Q245.10 12.07 247.83 13.52Q250.57 14.97 251.88 17.49Q253.20 20.01 253.20 23.22Q253.20 26.44 251.88 28.92Q250.57 31.41 247.85 32.82Q245.13 34.23 240.91 34.23L230.97 34.23L230.97 30.26L240.77 30.26Q243.68 30.26 245.46 29.40Q247.25 28.55 248.06 26.98Q248.86 25.41 248.86 23.22Q248.86 21.04 248.05 19.41Q247.23 17.77 245.44 16.88Q243.64 15.98 240.70 15.98L232.95 15.98L232.95 48.44L228.55 48.44M245.67 32.10L254.62 48.44L249.50 48.44L240.70 32.10L245.67 32.10ZM262.00 48.44L257.39 48.44L270.74 12.07L275.28 12.07L288.64 48.44L284.02 48.44L273.15 17.83L272.87 17.83L262.00 48.44M263.71 34.23L282.32 34.23L282.32 38.14L263.71 38.14L263.71 34.23ZM323.58 23.44L319.18 23.44Q318.79 21.54 317.82 20.10Q316.85 18.66 315.47 17.68Q314.10 16.69 312.43 16.19Q310.76 15.70 308.95 15.70Q305.65 15.70 302.97 17.37Q300.30 19.03 298.73 22.28Q297.16 25.53 297.16 30.26Q297.16 34.98 298.73 38.23Q300.30 41.48 302.97 43.15Q305.65 44.82 308.95 44.82Q310.76 44.82 312.43 44.32Q314.10 43.82 315.47 42.84Q316.85 41.85 317.82 40.40Q318.79 38.96 319.18 37.07L323.58 37.07Q323.08 39.86 321.77 42.06Q320.45 44.26 318.50 45.80Q316.55 47.34 314.12 48.14Q311.70 48.93 308.95 48.93Q304.30 48.93 300.67 46.66Q297.05 44.39 294.98 40.20Q292.90 36.01 292.90 30.26Q292.90 24.50 294.98 20.31Q297.05 16.12 300.67 13.85Q304.30 11.58 308.95 11.58Q311.70 11.58 314.12 12.38Q316.55 13.17 318.50 14.71Q320.45 16.25 321.77 18.44Q323.08 20.63 323.58 23.44ZM328.69 15.98L328.69 12.07L355.97 12.07L355.97 15.98L344.53 15.98L344.53 48.44L340.13 48.44L340.13 15.98L328.69 15.98ZM367.19 12.07L367.19 48.44L362.78 48.44L362.78 12.07L367.19 12.07ZM377.49 12.07L388.28 42.68L388.71 42.68L399.50 12.07L404.12 12.07L390.77 48.44L386.22 48.44L372.87 12.07L377.49 12.07ZM409.80 48.44L409.80 12.07L431.75 12.07L431.75 15.98L414.20 15.98L414.20 28.27L430.61 28.27L430.61 32.17L414.20 32.17L414.20 44.53L432.03 44.53L432.03 48.44L409.80 48.44Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ALT BİLGİ SATIRI (GRID) */}
        {/* pb-[var(--spacing-margin)] yerine yukarıda manuel 20px verdik */}
        <div className="main-grid !px-0 items-end w-full relative z-10 pointer-events-none">
          {/* SOL METİN */}
          <div className="col-span-2 md:col-span-2 hidden md:block">
            {/* GÜNCELLEME: text-[24px] */}
            <div className="type-caption text-white !normal-case text-[24px]">
              Global Design <br />& Development Studio
            </div>
          </div>

          {/* ORTA METİN */}
          <div className="col-span-2 md:col-span-2 hidden md:block">
            {/* GÜNCELLEME: text-[24px] */}
            <div className="type-caption text-white !normal-case text-[24px]">
              Moving Ideas <br />
              Elevating Performance
            </div>
          </div>

          {/* MOBİL METİN */}
          <div className="col-span-4 md:hidden">
            {/* GÜNCELLEME: text-[24px] */}
            <div className="type-caption text-white !normal-case text-[24px]">
              Global Design <br />& Development Studio
            </div>
          </div>

          {/* SAĞ ALT OK */}
          <div className="col-span-2 col-start-11 text-right flex justify-end">
            <div>
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

      {/* --- WHITE SECTION (Selected Works) --- */}
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
