"use client";

import React from "react";
import ScrambleText from "./ScrambleText";
import clsx from "clsx";

export default function ScrambleButton({
  children,
  className = "",
  onClick,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative inline-block uppercase font-normal tracking-widest bg-white text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer",
        // Varsayılan boyutlar (Eğer dışarıdan type- sınıfı gelmezse)
        !className.includes("type-") && "type-small",
        // Varsayılan padding (Eğer dışarıdan px- gelmezse)
        !className.includes("px-") && "px-8 py-3",
        className
      )}
    >
      <ScrambleText>{children}</ScrambleText>
    </button>
  );
}
