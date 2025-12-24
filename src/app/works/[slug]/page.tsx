import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ScrambleButton from "@/components/ui/ScrambleButton";
import { projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const projectIndex = projects.findIndex(
    (p) => p.slug === resolvedParams.slug
  );
  const project = projects[projectIndex];
  if (!project) notFound();
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="w-full">
      <section className="px-[var(--spacing-margin)] pt-40 pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 type-caption text-gray-500 border-b border-white/10 pb-4 w-fit">
            <span>{project.category}</span>
            <span>—</span>
            <span>{project.year}</span>
          </div>
          <TextReveal
            tagName="h1"
            className="type-hero font-light uppercase leading-none"
          >
            {project.title}
          </TextReveal>
        </div>
      </section>

      <section className="px-[var(--spacing-margin)] mb-20 lg:mb-32">
        <ParallaxImage
          src={project.src}
          alt={project.title}
          aspectRatio="aspect-video"
          className="w-full"
        />
      </section>

      <section className="px-[var(--spacing-margin)] mb-32">
        <div className="main-grid !px-0 gap-y-10">
          {/* Mob: 4, Tab: 8, Desk: 4 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-4 type-caption text-gray-500">
            Project Overview
          </div>
          {/* Mob: 4, Tab: 8, Desk: 8 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <TextReveal
              tagName="p"
              className="type-subhead font-light text-white mb-10"
            >
              {project.description}
            </TextReveal>
            <div className="type-body text-gray-400 mb-12">
              We approached this project with a mindset of stripping away the
              unnecessary.
            </div>
            <div className="flex gap-4">
              <ScrambleButton className="type-caption px-6 py-3">
                Live Site
              </ScrambleButton>
              <ScrambleButton className="type-caption px-6 py-3 bg-transparent border border-white/20 text-white hover:bg-white hover:text-black">
                Credits
              </ScrambleButton>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--spacing-margin)] border-t border-white/20 pt-20 pb-32">
        <div className="type-caption text-gray-500 mb-4">Next Project</div>
        <TransitionLink
          href={`/works/${nextProject.slug}`}
          className="group block"
        >
          <div className="relative overflow-hidden">
            <TextReveal
              tagName="h2"
              className="type-hero font-light uppercase group-hover:opacity-50 transition-opacity"
            >
              {nextProject.title}
            </TextReveal>
          </div>
        </TransitionLink>
      </section>
    </div>
  );
}
