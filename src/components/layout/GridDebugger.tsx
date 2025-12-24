"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export default function GridDebugger() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "g") {
        setIsVisible((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none">
      <div className="w-full h-full main-grid !px-[var(--spacing-margin)]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-full border-x",

              // --- GÖRÜNÜRLÜK AYARLARI ---
              // Mobilde (Varsayılan): Sadece ilk 4'ü göster, gerisini gizle (hidden)
              i >= 4 ? "hidden" : "block",

              // Tablette (md): İlk 8'i göster (block), 8 ve sonrasını gizle (hidden)
              // md:block diyerek 4-7 arasını açıyoruz.
              i >= 4 && i < 8 && "md:block",
              // md:hidden diyerek 8 ve sonrasını tablette gizli tutuyoruz (önemli düzeltme)
              i >= 8 && "md:hidden",

              // Desktopta (lg): Hepsini göster (block)
              i >= 8 && "lg:block",

              // --- RENK AYARLARI ---
              // Mobil: Kırmızı
              "bg-red-500/10 border-red-500/20",
              // Tablet: Mavi
              "md:bg-blue-500/10 md:border-blue-500/20",
              // Desktop: Yeşil
              "lg:bg-emerald-500/10 lg:border-emerald-500/20"
            )}
          >
            {/* İç dolgu rengi de değişsin */}
            <div
              className={clsx(
                "w-full h-full opacity-50",
                "bg-red-500/5",
                "md:bg-blue-500/5",
                "lg:bg-emerald-500/5"
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
