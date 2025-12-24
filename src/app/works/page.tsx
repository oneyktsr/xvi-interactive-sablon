import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { projects } from "@/data/projects";

export default function WorksPage() {
  return (
    <div className="w-full">
      <section className="px-[var(--spacing-margin)] pt-40 pb-20 border-b border-white/10">
        <TextReveal
          tagName="h1"
          className="type-hero font-light uppercase"
          animateOnScroll={false}
          delay={0.2}
        >
          Curated <br /> Portfolio.
        </TextReveal>
      </section>

      <section className="px-[var(--spacing-margin)] pt-20 pb-32">
        <div className="main-grid !px-0 gap-y-20 md:gap-y-32">
          {projects.map((project, index) => (
            <TransitionLink
              key={project.id}
              href={`/works/${project.slug}`}
              className={`group block col-span-4 md:col-span-4 lg:col-span-6 ${
                index % 2 === 1 ? "md:mt-32" : ""
              }`}
            >
              <div className="w-full mb-6">
                <ParallaxImage
                  src={project.src}
                  alt={project.title}
                  aspectRatio="aspect-[4/5]"
                  className="group-hover:opacity-80 transition-opacity"
                />
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                <div className="flex justify-between items-baseline">
                  {/* Responsive Başlık: type-h3 */}
                  <TextReveal
                    tagName="h2"
                    className="type-h3 font-light uppercase group-hover:italic transition-all"
                  >
                    {project.title}
                  </TextReveal>
                  {/* Yıl: type-caption */}
                  <span className="type-caption text-gray-500">
                    {project.year}
                  </span>
                </div>
                {/* Kategori: type-caption */}
                <div className="type-caption text-gray-400">
                  {project.category}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}
