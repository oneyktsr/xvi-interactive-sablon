import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { labProjects } from "@/data/lab";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return labProjects.map((item) => ({ slug: item.slug }));
}

export default async function LabDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const item = labProjects.find((p) => p.slug === resolvedParams.slug);
  if (!item) notFound();

  return (
    <div className="w-full">
      <section className="h-[90vh] w-full relative flex items-end pb-10 px-[var(--spacing-margin)]">
        <div className="absolute inset-0 z-[-1]">
          <ParallaxImage
            src={item.src}
            alt={item.title}
            aspectRatio="h-full w-full"
            className="h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="w-full">
          <div className="flex justify-between items-end border-b border-white/50 pb-6">
            <TextReveal
              tagName="h1"
              className="type-h1 font-light uppercase text-white"
            >
              {item.title}
            </TextReveal>
            <div className="hidden md:block type-caption text-white">
              Experiment {item.year}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-start">
            <p className="max-w-md text-white/80 type-body">
              {item.description}
            </p>
            <TransitionLink
              href="/lab-16"
              className="type-caption hover:text-gray-300"
            >
              Close X
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
