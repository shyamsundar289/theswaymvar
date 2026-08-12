import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/data/images";
import { RevealImage } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/film")({
  head: () => ({
    meta: [
      { title: "Film — Wedding Films Cut for Feeling | theswaymvar" },
      {
        name: "description",
        content:
          "Story-led Indian wedding films with live sound, edited to the rhythm the day actually had — short films, long documentary cuts and same-day edits.",
      },
      { property: "og:title", content: "Film — Wedding Films Cut for Feeling | theswaymvar" },
      {
        property: "og:description",
        content: "Wedding films with live sound, cut for feeling and never for the reel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: images.films.reelA },
      { name: "twitter:image", content: images.films.reelA },
    ],
  }),
  component: FilmPage,
});

function FilmPage() {
  return (
    <>
      <section className="shell page-top pb-8 md:pb-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-20">
          <SectionHeading
            eyebrow="Films"
            title="Cut for feeling, not for the reel."
            body="Every wedding is filmed with live sound and edited to the rhythm the day actually had. Short film, long documentary cut, and a same-day edit if you'd like the room to go quiet before dessert."
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <RevealImage src={images.films.reelA} alt="Still from an Indian wedding film at dusk" className="aspect-[3/4] hover-lift" />
            <RevealImage src={images.films.reelB} alt="Still from a coastal wedding film" className="mt-10 aspect-[3/4] hover-lift" />
          </div>
        </div>
      </section>

      <section className="shell section-y">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "The short film", b: "Four to six minutes, live sound, no music-video montage. Meant to be watched by everyone who could not be there." },
            { n: "02", t: "The documentary cut", b: "Twenty to forty minutes across the functions — speeches, songs and the long middle of the day left intact." },
            { n: "03", t: "Same-day edit", b: "An editor works on site from the first function so a three-minute film can play before the reception clears." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="border-t border-border/70 pt-6">
              <p className="label-xs text-bronze">{s.n}</p>
              <h2 className="font-display mt-4 text-3xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <RevealImage
        src={images.films.highlightA}
        alt="Frame from a wedding film during the ceremony"
        className="aspect-[16/10] w-full md:aspect-[16/7]"
      />

      <section className="shell section-y-lg text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            Tell us the dates and we'll talk about the film.
          </h2>
          <div className="mt-10">
            <WhatsAppButton message="Hello theswaymvar — we'd like to enquire about wedding films.">
              Enquire on WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
