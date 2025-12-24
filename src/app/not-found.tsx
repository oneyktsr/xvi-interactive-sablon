import TransitionLink from "@/components/ui/TransitionLink";
import TextReveal from "@/components/ui/TextReveal";
import ScrambleButton from "@/components/ui/ScrambleButton";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-[var(--spacing-margin)] text-center">
      <div className="mb-8">
        <TextReveal
          tagName="h1"
          className="type-hero font-light"
          animateOnScroll={false}
        >
          404
        </TextReveal>
      </div>

      <div className="mb-12 max-w-md">
        <TextReveal
          tagName="p"
          className="type-subhead text-gray-400"
          animateOnScroll={false}
          delay={0.2}
        >
          The page you are looking for has been moved, deleted, or possibly
          never existed.
        </TextReveal>
      </div>

      <TransitionLink href="/">
        <ScrambleButton className="type-caption px-8 py-3">
          Back to Home
        </ScrambleButton>
      </TransitionLink>
    </div>
  );
}
