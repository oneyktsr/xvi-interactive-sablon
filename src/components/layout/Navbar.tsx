"use client";

import { useState, useEffect } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import ScrambleText from "@/components/ui/ScrambleText";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY >= triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/works", label: "Works" },
    { href: "/studio", label: "Studio" },
    { href: "/insights", label: "Insights" },
    { href: "/lab-16", label: "Lab 16" },
  ];

  return (
    <>
      {/* NAVBAR WRAPPER
        - z-[9999]: Kesinlikle en üstte.
        - mix-blend-difference: Tüm içeriği arkadakine göre ters çevirir.
        - text-white: Difference için baz renk.
        - pointer-events-none: Navbar boşlukları sayfayı bloklamasın.
      */}
      <nav className="fixed top-0 left-0 w-full z-[9999] px-[var(--spacing-margin)] py-6 font-normal transition-all duration-300 pointer-events-none mix-blend-difference text-white">
        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-12 gap-5 items-start w-full">
          {/* SOL BLOK: LOGO */}
          {/* pointer-events-auto: Tıklamayı burada açıyoruz */}
          <div className="col-span-3 pointer-events-auto overflow-hidden h-[1.5em]">
            <TransitionLink
              href="/"
              className="type-caption uppercase tracking-widest font-normal block w-fit"
              onClick={() => setIsOpen(false)}
            >
              <div
                className={clsx(
                  "flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                  isScrolled ? "-translate-y-1/2" : "translate-y-0"
                )}
              >
                {/* Üst Kat */}
                <div className="h-[1.5em] flex items-center">
                  <ScrambleText
                    shuffleDuration={0.6}
                    className="whitespace-nowrap"
                  >
                    World-Class Innovation Hub
                  </ScrambleText>
                </div>
                {/* Alt Kat (Logo) */}
                <div className="h-[1.5em] flex items-center pt-1">
                  <ScrambleText
                    shuffleDuration={0.6}
                    className="whitespace-nowrap font-bold"
                  >
                    XVI® INTERACTIVE
                  </ScrambleText>
                </div>
              </div>
            </TransitionLink>
          </div>

          {/* ORTA BLOK: MENÜ */}
          {/* pointer-events-auto: Linklerin çalışması için şart */}
          <div className="col-span-4 col-start-7 flex items-center gap-[10px] pointer-events-auto">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="type-caption font-normal group block" // block eklendi
              >
                <ScrambleText
                  shuffleDuration={0.4}
                  className="hover:opacity-50 transition-opacity"
                >
                  {link.label}
                </ScrambleText>
              </TransitionLink>
            ))}
          </div>

          {/* SAĞ BLOK: CTA */}
          <div className="col-span-2 col-start-11 text-right pointer-events-auto">
            <TransitionLink
              href="/contact"
              className="type-caption uppercase tracking-widest hover:opacity-50 transition-opacity inline-block"
            >
              <ScrambleText>Start a Project</ScrambleText>
            </TransitionLink>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="flex md:hidden justify-between items-center w-full">
          <div className="overflow-hidden h-[1.5em] w-3/4 pointer-events-auto">
            <TransitionLink
              href="/"
              className="type-caption uppercase tracking-widest font-normal block"
              onClick={() => setIsOpen(false)}
            >
              <div
                className={clsx(
                  "flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                  isScrolled ? "-translate-y-1/2" : "translate-y-0"
                )}
              >
                <div className="h-[1.5em] flex items-center">
                  <span className="whitespace-nowrap">
                    World-Class Innovation Hub
                  </span>
                </div>
                <div className="h-[1.5em] flex items-center pt-1">
                  <span className="whitespace-nowrap font-bold">
                    XVI® INTERACTIVE
                  </span>
                </div>
              </div>
            </TransitionLink>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="uppercase tracking-widest type-caption font-normal z-50 relative pointer-events-auto"
          >
            <ScrambleText>{isOpen ? "Close" : "Menu"}</ScrambleText>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {/* Burası blend moduna dahil DEĞİL. Siyah zemin üzerine beyaz yazı. */}
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
          className="type-caption font-normal uppercase tracking-widest mt-8 border border-white/20 px-6 py-3"
        >
          <ScrambleText>Start a Project</ScrambleText>
        </TransitionLink>
      </div>
    </>
  );
}
