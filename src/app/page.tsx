import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ScrambleButton from "@/components/ui/ScrambleButton";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { projects } from "@/data/projects";

export default function Home() {
  const selectedProjects = projects.slice(0, 2);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-center px-[var(--spacing-margin)] pt-32 pb-20">
        <div className="mb-10 lg:mb-16">
          <TextReveal
            tagName="h1"
            className="type-hero font-light uppercase leading-[0.95]"
            animateOnScroll={false}
            delay={0.3}
          >
            Digital Experiences <br /> For The Bold.
          </TextReveal>
        </div>

        <div className="main-grid !px-0">
          <div className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
            <TextReveal
              tagName="p"
              className="type-subhead text-gray-400 font-light"
              animateOnScroll={false}
              delay={0.5}
            >
              We craft immersive web interactions and strategic branding for
              visionary companies.
            </TextReveal>

            <div className="flex items-center gap-4">
              <TransitionLink href="/works">
                <ScrambleButton className="type-caption px-8 py-3">
                  Our Works
                </ScrambleButton>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="px-[var(--spacing-margin)] pb-32">
        <div className="flex items-end justify-between mb-20 border-b border-white/20 pb-4">
          <TextReveal tagName="h2" className="type-h2 font-normal uppercase">
            Selected Works
          </TextReveal>
          <div className="hidden md:block">
            <TransitionLink href="/works">
              <ScrambleButton className="type-caption px-6 py-3">
                View All
              </ScrambleButton>
            </TransitionLink>
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {selectedProjects.map((project, index) => (
            <TransitionLink
              key={project.id}
              href={`/works/${project.slug}`}
              className="group block"
            >
              <div className="main-grid !px-0 items-center gap-y-8">
                {/* GÖRSEL */}
                <div
                  className={`col-span-4 md:col-span-8 lg:col-span-7 w-full ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <ParallaxImage
                    src={project.src}
                    alt={project.title}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>

                {/* METİN */}
                <div
                  className={`col-span-4 md:col-span-8 lg:col-span-4 flex flex-col gap-6 ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2 lg:col-start-9"
                  }`}
                >
                  <div className="border-b border-white/20 pb-4">
                    <div className="flex justify-between items-baseline mb-2">
                      {/* Text Reveal Eklendi */}
                      <TextReveal
                        tagName="span"
                        className="type-caption text-gray-500"
                        delay={0.1}
                      >
                        0{index + 1}
                      </TextReveal>
                      {/* Text Reveal Eklendi */}
                      <TextReveal
                        tagName="div"
                        className="type-caption text-gray-400"
                        delay={0.1}
                      >
                        {project.year}
                      </TextReveal>
                    </div>
                    <TextReveal
                      tagName="h3"
                      className="type-h2 font-light uppercase leading-none group-hover:italic transition-all duration-500"
                    >
                      {project.title}
                    </TextReveal>
                  </div>
                  {/* Text Reveal Eklendi */}
                  <TextReveal tagName="div" className="type-body text-gray-500">
                    {project.description}
                  </TextReveal>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}
