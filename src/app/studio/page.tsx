import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function StudioPage() {
  const services = [
    "Strategy",
    "Art Direction",
    "Web Design",
    "Development",
    "Motion",
    "Branding",
  ];

  return (
    <div className="w-full">
      <section className="w-full px-[var(--spacing-margin)] pt-40 pb-20 border-b border-white/10">
        <TextReveal
          tagName="h1"
          className="type-hero font-light uppercase"
          animateOnScroll={false}
          delay={0.2}
        >
          We Are <br /> The Architects.
        </TextReveal>
      </section>

      {/* MANIFESTO */}
      <section className="w-full px-[var(--spacing-margin)] py-20 lg:py-32">
        <div className="main-grid !px-0 items-center gap-y-16">
          {/* GÖRSEL */}
          {/* Mobil: 4 (Tam) */}
          {/* Tablet: 4 (Yarısı) */}
          {/* Desktop: 6 (Tam yarısı, 1-6 arası) */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6 order-2 md:order-1">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301"
              alt="Studio"
              aspectRatio="aspect-square"
            />
          </div>

          {/* METİN */}
          {/* Mobil: 4 (Tam) */}
          {/* Tablet: 4 (Yarısı, 5-8 arası) */}
          {/* Desktop: 5 (8'den başlasın, 8-12 arası) -> col-start-8 */}
          <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 order-1 md:order-2">
            <TextReveal
              tagName="p"
              className="type-subhead font-light text-white mb-8"
            >
              XVI INTERACTIVE is a digital design studio crafting immersive web
              experiences. We believe in the power of silence, space, and
              motion.
            </TextReveal>
            <div className="type-body text-gray-400">
              Our approach is rooted in a deep understanding of user behavior
              and a relentless pursuit of aesthetic perfection.
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="w-full px-[var(--spacing-margin)] py-20 border-t border-white/10">
        <div className="main-grid !px-0 gap-y-10">
          {/* Başlık: Sol blok */}
          <div className="col-span-4 md:col-span-2 lg:col-span-4 type-caption text-gray-500">
            Our Services
          </div>
          {/* Liste: Sağ blok, 8. sütundan başlasın (hizalı olsun) */}
          <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-y-6 gap-x-10">
            {services.map((s, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <TextReveal
                  tagName="div"
                  className="type-h4 font-light uppercase"
                >
                  {s}
                </TextReveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
