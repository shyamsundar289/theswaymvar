import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/data/images";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { DiagonalBreak } from "@/components/site/DiagonalBreak";
import { PressStrip } from "@/components/site/PressStrip";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — theswaymvar Wedding Studio" },
      {
        name: "description",
        content:
          "How theswaymvar works: a small documentary-minded wedding studio built on patience, live sound and photographs nobody had to pose for.",
      },
      { property: "og:title", content: "Our Story — theswaymvar Wedding Studio" },
      {
        property: "og:description",
        content: "A small documentary-minded wedding studio built on patience and restraint.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <>
      <section className="shell page-top pb-16 md:pb-24">
        <Reveal>
          <p className="label-xs text-bronze">The studio</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.98] md:text-8xl">
            We started by putting the camera down.
          </h1>
        </Reveal>
      </section>

      <RevealImage
        src={images.story.opener}
        alt="A couple during their ceremony, photographed from a distance"
        className="aspect-[16/10] w-full md:aspect-[16/7]"
      />

      <section className="shell section-y grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Founded in 2016, quietly.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            The studio began after a wedding where the couple spent forty minutes being arranged in
            a garden while their grandmother, inside, sang the song she had waited a decade to sing.
            Nobody photographed it. We decided we would never make that trade again.
          </p>
          <p>
            Since then we have worked across nine states and four countries, always with a small
            team, always with the same instinct — arrive early, stay late, and let the day set the
            pace.
          </p>
          <p>
            We shoot on full-frame digital with fast primes, record live sound at every ceremony,
            and colour-grade everything by hand in a single consistent voice. No presets, no
            outsourced editors, no gallery that looks like somebody else's wedding.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          <RevealImage src={images.story.one} alt="Ring detail before the ceremony" className="aspect-[4/5] hover-lift" />
          <RevealImage src={images.story.two} alt="Mehndi in progress" className="aspect-[4/5] hover-lift md:mt-16" />
          <RevealImage src={images.story.three} alt="Portrait of a couple at dusk" className="col-span-2 aspect-[16/10] hover-lift md:col-span-1 md:aspect-[4/5]" />
        </div>
      </section>

      <DiagonalBreak
        image={images.break.cinematic}
        eyebrow="How we work"
        quote="Two people, four lenses, and the discipline to wait."
      />

      <section className="shell section-y">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Before",
              b: "We meet twice — once to hear about you, once to walk the venue at the hour you'll be married in it.",
            },
            {
              n: "02",
              t: "During",
              b: "A lead and a second shooter per function. Live sound recorded. No shot lists read aloud to a crowd.",
            },
            {
              n: "03",
              t: "After",
              b: "A hand-graded gallery in six weeks, a film in ten, and an album we design rather than assemble.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="border-t border-border/70 pt-6">
              <p className="label-xs text-bronze">{s.n}</p>
              <h3 className="font-display mt-4 text-3xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-12 md:pb-20">
        <PressStrip />
      </section>

      <section className="shell section-y-lg text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            If any of this sounds like your wedding, write to us.
          </h2>
          <div className="mt-10">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
