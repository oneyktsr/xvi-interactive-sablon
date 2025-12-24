import { notFound } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { insights } from "@/data/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export default async function InsightDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const item = insights.find((p) => p.slug === resolvedParams.slug);

  if (!item) notFound();

  return (
    <div className="w-full pb-20">
      <section className="px-[var(--spacing-margin)] pt-40 pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 type-caption text-gray-400">
            <span>{item.category}</span>
            <span>—</span>
            <span>{item.date}</span>
          </div>
          <TextReveal
            tagName="h1"
            className="type-h1 font-light uppercase leading-tight max-w-5xl"
          >
            {item.title}
          </TextReveal>
        </div>
      </section>

      <section className="px-[var(--spacing-margin)] w-full mb-20">
        <ParallaxImage
          src={item.cover}
          alt={item.title}
          aspectRatio="aspect-[21/9]"
        />
      </section>

      <section className="px-[var(--spacing-margin)]">
        <div className="main-grid !px-0">
          {/* Mob: 4, Tab: 8, Desk: 8 (Sağa dayalı gibi ortala) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <TextReveal
              tagName="p"
              className="type-subhead font-light text-gray-300 leading-relaxed"
            >
              {item.content}
              <span className="block mt-6 opacity-60">
                (This is a placeholder content to simulate the article body.)
              </span>
            </TextReveal>

            <div className="mt-20 border-t border-white/20 pt-10">
              <TransitionLink
                href="/insights"
                className="type-caption hover:text-gray-400 transition-colors"
              >
                ← Back to Insights
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
