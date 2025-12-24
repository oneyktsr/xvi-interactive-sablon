"use client";

import { useState } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import ScrambleText from "@/components/ui/ScrambleText"; // Eklendi
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/works", label: "Works" },
    { href: "/studio", label: "Studio" },
    { href: "/insights", label: "Insights" },
    { href: "/lab-16", label: "Lab 16" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-[var(--spacing-margin)] py-6 flex justify-between items-baseline font-normal transition-all duration-300">
        {/* LOGO */}
        <TransitionLink
          href="/"
          className="text-lg md:text-xl uppercase tracking-widest font-normal z-50 relative group"
          onClick={() => setIsOpen(false)}
        >
          {/* Logo da Scramble olsun */}
          <ScrambleText shuffleDuration={0.6}>XVI Interactive</ScrambleText>
        </TransitionLink>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="type-caption font-normal group" // group class'ı önemli
            >
              {/* Hover efekti burada */}
              <ScrambleText
                shuffleDuration={0.4}
                className="hover:opacity-50 transition-opacity"
              >
                {link.label}
              </ScrambleText>
            </TransitionLink>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden uppercase tracking-widest type-caption font-normal z-50 relative group"
        >
          <ScrambleText>{isOpen ? "Close" : "Menu"}</ScrambleText>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={clsx(
          "fixed inset-0 bg-black text-white z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out md:hidden",
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
      </div>
    </>
  );
}
