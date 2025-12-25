"use client";

import { useState, useEffect } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import ScrambleText from "@/components/ui/ScrambleText";
import clsx from "clsx";
import { useUI } from "@/context/UIContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded } = useUI(); // Global state'ten dinle

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY >= triggerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preloader bitince Navbar görünür olsun (Fade In)
  useGSAP(() => {
    if (isLoaded) {
      gsap.to("nav", {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }
  }, [isLoaded]);

  // MOBİL VE MASAÜSTÜ LİNKLERİNİ EŞİTLEDİK
  const navLinks = [
    { href: "/works", label: "Works" },
    { href: "/studio", label: "Studio" },
    { href: "/insights", label: "Insights" },
    { href: "/lab-16", label: "Lab 16" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full px-[var(--spacing-margin)] py-6 font-normal transition-all duration-300 pointer-events-none opacity-0 invisible" // Başlangıçta gizli
        style={{
          mixBlendMode: "difference",
          color: "#ffffff",
          zIndex: 9999,
          isolation: "isolate", // BLEND FIX
          background: "transparent",
        }}
      >
        <div className="hidden md:grid grid-cols-12 gap-5 items-start w-full">
          {/* LOGO */}
          <div className="col-span-3 pointer-events-auto overflow-hidden h-[1.5em]">
            <TransitionLink href="/" onClick={() => setIsOpen(false)}>
              <div
                className={clsx(
                  "flex flex-col transition-transform duration-700",
                  isScrolled ? "-translate-y-1/2" : "translate-y-0"
                )}
              >
                <div className="h-[1.5em] flex items-center leading-none">
                  <ScrambleText>World-Class Innovation Hub</ScrambleText>
                </div>
                <div className="h-[1.5em] flex items-center pt-1 leading-none">
                  <ScrambleText className="font-bold">
                    XVI® INTERACTIVE
                  </ScrambleText>
                </div>
              </div>
            </TransitionLink>
          </div>

          {/* MENÜ */}
          <div className="col-span-4 col-start-7 flex items-center gap-[10px] pointer-events-auto">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="type-caption font-normal group block"
              >
                <ScrambleText className="hover:opacity-50 transition-opacity">
                  {link.label}
                </ScrambleText>
              </TransitionLink>
            ))}
          </div>

          {/* CTA */}
          <div className="col-span-2 col-start-11 text-right pointer-events-auto">
            <TransitionLink
              href="/contact"
              className="type-caption uppercase tracking-widest hover:opacity-50 transition-opacity inline-block"
            >
              <ScrambleText>Start a Project</ScrambleText>
            </TransitionLink>
          </div>
        </div>

        {/* MOBİL HEADER */}
        <div className="flex md:hidden justify-between items-center w-full pointer-events-auto">
          <div className="overflow-hidden h-[1.5em] w-3/4">
            <TransitionLink href="/" onClick={() => setIsOpen(false)}>
              <div
                className={clsx(
                  "flex flex-col transition-transform duration-700",
                  isScrolled ? "-translate-y-1/2" : "translate-y-0"
                )}
              >
                <div className="h-[1.5em] flex items-center leading-none">
                  <span className="whitespace-nowrap">Innovation Hub</span>
                </div>
                <div className="h-[1.5em] flex items-center pt-1 leading-none">
                  <span className="whitespace-nowrap font-bold">XVI®</span>
                </div>
              </div>
            </TransitionLink>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="uppercase tracking-widest type-caption font-normal z-50 relative"
          >
            <ScrambleText>{isOpen ? "Close" : "Menu"}</ScrambleText>
          </button>
        </div>
      </nav>

      {/* MOBİL MENÜ OVERLAY (Linkler Güncellendi) */}
      <div
        className={clsx(
          "fixed inset-0 bg-black text-white z-[990] flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out md:hidden",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {navLinks.map((link) => (
          <TransitionLink
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="type-h2 font-normal uppercase tracking-widest group"
          >
            <ScrambleText shuffleDuration={0.5}>{link.label}</ScrambleText>
          </TransitionLink>
        ))}
        <TransitionLink
          href="/contact"
          onClick={() => setIsOpen(false)}
          className="type-caption mt-8 border border-white/20 px-6 py-3"
        >
          <ScrambleText>Start a Project</ScrambleText>
        </TransitionLink>
      </div>
    </>
  );
}
