import { createFileRoute } from "@tanstack/react-router";
import { recognition, testimonials } from "@/data/site";
import { images } from "@/data/images";
import { Reveal } from "@/components/site/Reveal";
import { Laurel } from "@/components/site/Laurel";
import { DiagonalBreak } from "@/components/site/DiagonalBreak";
import { PressStrip } from "@/components/site/PressStrip";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — What Couples Say | theswaymvar" },
      {
        name: "description",
        content:
          "Words from couples photographed by theswaymvar across Udaipur, Alibaug, Coonoor and Lake Como.",
      },
      { property: "og:title", content: "Testimonials — What Couples Say | theswaymvar" },
      { property: "og:description", content: "Words from the couples we've photographed." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <section className="shell page-top pb-14 md:pb-20">
        <Reveal>
          <p className="label-xs text-bronze">Testimonials</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.98] md:text-8xl">
            In their words.
          </h1>
        </Reveal>
      </section>

      <section className="shell pb-16 md:pb-24">
        <div className="grid gap-px border border-border/70 bg-border/70 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08} className="bg-background p-8 md:p-14">
              <blockquote className="text-2xl leading-[1.3] md:text-3xl">“{t.quote}”</blockquote>
              <figcaption className="label-xs mt-8 text-muted-foreground">
                {t.name} — {t.place}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <DiagonalBreak
        image={images.break.cinematic}
        eyebrow="Referred, mostly"
        quote="Nine in ten of our weddings come from a guest at the last one."
      />

      <section className="shell section-y">
        <p className="label-xs text-center text-muted-foreground">Recognition</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-8">
          {recognition.map((r, i) => (
            <Laurel key={i} {...r} />
          ))}
        </div>
        <div className="mt-16">
          <PressStrip />
        </div>
      </section>

      <section className="shell section-y-lg border-t border-border/60 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            We'd love to hear about your wedding.
          </h2>
          <div className="mt-10">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
