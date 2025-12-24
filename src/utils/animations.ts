import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const transitionElement = document.getElementById(
    "page-transition-container"
  );

  // CSS sınıfını ekle (Artık zıplatmaz, sadece tıklamayı kapatır)
  document.body.classList.add("is-transitioning");

  if (transitionElement) {
    gsap.to(transitionElement, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // scroll: false -> Next.js'in otomatik yukarı atmasını engeller
        router.push(href, { scroll: false });
      },
    });
  } else {
    router.push(href, { scroll: false });
  }
};
