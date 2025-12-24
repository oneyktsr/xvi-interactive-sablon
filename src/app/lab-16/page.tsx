import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { labProjects } from "@/data/lab";

export default function LabPage() {
  return (
    <div className="w-full pb-20">
      <section className="w-full px-[var(--spacing-margin)] pt-40 pb-20 border-b border-white/10">
        <TextReveal
          tagName="h1"
          className="type-hero font-light uppercase"
          animateOnScroll={false}
          delay={0.2}
        >
          Lab 16 <br /> Experiments.
        </TextReveal>
        <div className="mt-8 max-w-xl">
          <TextReveal
            tagName="p"
            className="type-subhead text-gray-400 font-light"
            animateOnScroll={false}
            delay={0.4}
          >
            A playground for code, motion, and visual research.
          </TextReveal>
        </div>
      </section>

      <section className="w-full px-[var(--spacing-margin)] pt-20">
        <div className="main-grid !px-0 gap-y-16 gap-x-[var(--gutter)]">
          {labProjects.map((project) => (
            <TransitionLink
              key={project.id}
              href={`/lab-16/${project.slug}`}
              className="group block col-span-4 md:col-span-4 lg:col-span-4"
            >
              <div className="w-full mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ParallaxImage
                  src={project.src}
                  alt={project.title}
                  aspectRatio="aspect-square"
                />
              </div>

              <div className="flex justify-between items-start gap-4">
                <div>
                  {/* Responsive Başlık: type-h4 */}
                  <TextReveal
                    tagName="h2"
                    className="type-h4 font-light uppercase leading-tight"
                  >
                    {project.title}
                  </TextReveal>
                  <div className="type-caption text-gray-500 mt-2">
                    {project.year}
                  </div>
                </div>
                <div className="type-caption opacity-50 whitespace-nowrap">
                  EXP.0{project.id}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}
