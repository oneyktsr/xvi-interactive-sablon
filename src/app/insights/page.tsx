import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import { insights } from "@/data/insights";

export default function InsightsPage() {
  return (
    <div className="w-full pb-20">
      <section className="w-full px-[var(--spacing-margin)] pt-40 pb-20 border-b border-white/10">
        <TextReveal
          tagName="h1"
          className="type-hero font-light uppercase"
          animateOnScroll={false}
          delay={0.2}
        >
          Insights & <br /> Opinions.
        </TextReveal>
      </section>

      <section className="w-full pt-10 px-[var(--spacing-margin)]">
        {insights.map((item) => (
          <TransitionLink
            key={item.id}
            href={`/insights/${item.slug}`}
            className="group block"
          >
            {/* 1. main-grid: Global grid yapısını çağırır (12/8/4 sütun)
                  2. !px-0: Section padding'i zaten var, iç padding'i sıfırlıyoruz.
                  3. gap-y: Mobilde dikey boşluk.
               */}
            <div className="main-grid !px-0 py-10 border-b border-white/10 items-baseline gap-y-4 hover:bg-white/5 transition-colors duration-300">
              {/* BAŞLIK ALANI */}
              {/* Mobil: 4 (Tam) */}
              {/* Tablet: 5 (8'in 5'i) */}
              {/* Desktop: 8 (12'nin 8'i) */}
              <div className="col-span-4 md:col-span-5 lg:col-span-8">
                <TextReveal
                  tagName="h2"
                  className="type-h2 font-light uppercase leading-tight group-hover:italic transition-all duration-500"
                >
                  {item.title}
                </TextReveal>

                <div className="hidden md:block mt-4 text-gray-500 type-caption opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Read Article →
                </div>
              </div>

              {/* META ALANI (Tarih/Kategori) */}
              {/* Mobil: 4 (Tam) */}
              {/* Tablet: 2 (Sağa yaslı, arada 1 boşluk kaldı) -> col-start-7 */}
              {/* Desktop: 3 (Sağa yaslı, arada 1 boşluk kaldı) -> col-start-10 */}
              <div className="col-span-4 md:col-span-2 md:col-start-7 lg:col-span-3 lg:col-start-10 flex justify-between md:justify-end gap-8 type-caption text-gray-400">
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </TransitionLink>
        ))}
      </section>
    </div>
  );
}
