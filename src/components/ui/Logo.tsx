"use client";
import { logoLetters } from "@/data/logoData"; // src/data/logoData.ts oluşturduğunu varsayıyorum (önceki cevabımdaki gibi)

export default function Logo() {
  // Tüm harflerin toplam width değerini hesapla (~350)
  const totalWidth = logoLetters.reduce((acc, curr) => acc + curr.w, 0);

  return (
    <h1
      className="w-full flex items-end justify-between"
      aria-label="XVI INTERACTIVE"
    >
      {logoLetters.map((letter, index) => {
        // Harfin toplam genişlikteki yüzdesi
        const percent = (letter.w / totalWidth) * 100;

        return (
          <div
            key={index}
            // flex-grow kullanmıyoruz, width kullanıyoruz ki boşluklar orantılı olsun
            style={{ width: `${percent}%` }}
            className="flex justify-center"
          >
            <svg
              viewBox={`0 0 ${letter.w} 48.44`}
              className="w-full h-auto fill-white logo-char block"
            >
              <path d={letter.d} />
            </svg>
          </div>
        );
      })}
    </h1>
  );
}
