import { Reveal } from "./Reveal";

export function CinematicChapters() {
  const chapters = [
    {
      title: "The Quiet Before",
      description: "The anticipation, details, preparation...",
    },
    {
      title: "The Ceremony",
      description: "The moments that make everything official...",
    },
    {
      title: "The Celebration",
      description: "The energy, emotion and memories that follow...",
    },
  ];

  return (
    <section className="shell py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="label-xs text-bronze uppercase tracking-widest">The Chapters</h2>
          <p className="mt-8 font-display text-3xl md:text-5xl leading-tight text-charcoal font-light max-w-2xl">
            Every celebration has its own rhythm.
            <br />
            We structure our approach to match the natural flow of your days, ensuring nothing is
            missed but everything is felt.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-12 md:gap-16">
          {chapters.map((chapter, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-12 items-baseline border-t border-border/40 pt-8">
                <span className="font-display italic text-2xl text-bronze/70">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wide text-charcoal uppercase">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm md:text-base italic font-display">
                    {chapter.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
