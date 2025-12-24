"use client";

import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation"; // usePathname eklendi
import { animatePageOut } from "@/utils/animations";
import gsap from "gsap";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname(); // Şu anki adresi al

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Eğer harici bir onClick varsa çalıştır (Mobil menü kapatma vb.)
    if (onClick) {
      onClick();
    }

    // Hedef URL string mi? (Next.js URL objesi de olabilir, string'e çeviriyoruz)
    const targetHref = href.toString();

    // 1. AYNI SAYFAYA MI TIKLANDI? (Reload Simülasyonu)
    if (pathname === targetHref) {
      const transitionElement = document.getElementById(
        "page-transition-container"
      );

      if (transitionElement) {
        // Tıklamayı kilitle
        document.body.classList.add("is-transitioning");

        // Manuel Animasyon Döngüsü: Kapan -> Yukarı Çık -> Açıl
        const tl = gsap.timeline();

        tl.to(transitionElement, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            // Ekran kararınca en tepeye ışınla
            window.scrollTo(0, 0);
          },
        }).to(transitionElement, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            // Animasyon bitince kilidi aç
            document.body.classList.remove("is-transitioning");
          },
        });
      }
      return; // Router işlemini iptal et, fonksiyonu bitir.
    }

    // 2. FARKLI SAYFA (Normal Geçiş)
    animatePageOut(targetHref, router);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
