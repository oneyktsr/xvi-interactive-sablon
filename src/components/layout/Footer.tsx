"use client";

import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-[var(--spacing-margin)] pt-20 pb-10 border-t border-white/10 bg-black text-white">
      {/* 1. BIG CTA SECTION */}
      <div className="flex flex-col gap-8 mb-20 lg:mb-32">
        <TextReveal tagName="div" className="type-caption text-gray-500">
          Have an idea?
        </TextReveal>

        <TransitionLink href="/contact" className="block w-fit group">
          <TextReveal
            tagName="h2"
            className="type-hero font-light uppercase leading-[0.9] group-hover:text-gray-400 transition-colors"
          >
            Let&apos;s Build <br /> The Future.
          </TextReveal>
        </TransitionLink>
      </div>

      {/* 2. GRID LINKS */}
      <div className="main-grid !px-0 pb-20 border-b border-white/10 gap-y-12">
        {/* SITEMAP */}
        <div className="col-span-2 md:col-span-2 lg:col-span-3">
          <div className="type-caption text-gray-500 mb-6">Sitemap</div>
          <div className="flex flex-col gap-2">
            {["Home", "Works", "Studio", "Insights", "Lab 16", "Contact"].map(
              (item) => (
                <TransitionLink
                  key={item}
                  href={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="type-body uppercase w-fit hover:opacity-50 transition-opacity"
                >
                  {item}
                </TransitionLink>
              )
            )}
          </div>
        </div>

        {/* SOCIALS */}
        <div className="col-span-2 md:col-span-2 lg:col-span-3">
          <div className="type-caption text-gray-500 mb-6">Socials</div>
          <div className="flex flex-col gap-2">
            {["Instagram", "Twitter", "LinkedIn", "Awwwards"].map((item) => (
              <a
                key={item}
                href="#"
                target="_blank"
                className="type-body uppercase w-fit hover:opacity-50 transition-opacity group"
              >
                <ScrambleText shuffleDuration={0.4}>{item}</ScrambleText>
              </a>
            ))}
          </div>
        </div>

        {/* OFFICE */}
        <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9">
          <div className="type-caption text-gray-500 mb-6">Office</div>
          <address className="type-body not-italic text-gray-400">
            Levent 199, Büyükdere Cd. No:199 <br />
            34394 Şişli/İstanbul, Türkiye <br />
            <br />
            <a
              href="mailto:hello@xvi.com"
              className="hover:text-white transition-colors"
            >
              hello@xvi.com
            </a>
          </address>
        </div>
      </div>

      {/* 3. BOTTOM BAR */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="type-caption text-gray-600">
          © {currentYear} XVI Interactive. All Rights Reserved.
        </div>
        <div className="type-caption text-gray-600">
          Designed & Developed by XVI.
        </div>
      </div>
    </footer>
  );
}
