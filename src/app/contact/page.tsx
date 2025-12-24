import TextReveal from "@/components/ui/TextReveal";
import ScrambleText from "@/components/ui/ScrambleText";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <section className="px-[var(--spacing-margin)] pt-40">
        <TextReveal
          tagName="h1"
          className="type-hero font-light uppercase"
          animateOnScroll={false}
          delay={0.2}
        >
          Lets Start <br />A Conversation.
        </TextReveal>
      </section>

      <section className="px-[var(--spacing-margin)] py-20">
        <div className="flex flex-col gap-10">
          <div className="type-caption text-gray-500">Email Us</div>
          <a href="mailto:hello@xvi.com" className="block w-fit group">
            <div className="type-h1 font-light uppercase leading-none hover:text-gray-400 transition-colors">
              <ScrambleText shuffleDuration={1}>hello@xvi.com</ScrambleText>
            </div>
          </a>
        </div>

        {/* Grid Hizalama */}
        <div className="main-grid !px-0 border-t border-white/10 pt-10 mt-20">
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <div className="type-caption text-gray-500 mb-4">Socials</div>
            <ul className="flex flex-col gap-2 type-body font-light uppercase">
              <li>
                <a href="#" className="hover:opacity-60 transition-opacity">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-60 transition-opacity">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-60 transition-opacity">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <div className="type-caption text-gray-500 mb-4">Office</div>
            <p className="type-body font-light uppercase text-gray-400">
              Istanbul, TR <br /> Levent 199
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
