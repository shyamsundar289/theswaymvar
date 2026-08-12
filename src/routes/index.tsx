import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { images } from "@/data/images";
import { premium, recognition, services, stories } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { PressStrip } from "@/components/site/PressStrip";
import { MasonryGrid } from "@/components/site/Masonry";
import { DiagonalBreak } from "@/components/site/DiagonalBreak";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { Laurel } from "@/components/site/Laurel";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "theswaymvar — Cinematic Wedding Photography & Films" },
      {
        name: "description",
        content:
          "A wedding photography and film studio making quiet, cinematic records of celebrations across India and worldwide. By enquiry only.",
      },
      { property: "og:title", content: "theswaymvar — Cinematic Wedding Photography & Films" },
      {
        property: "og:description",
        content: "Quiet, cinematic wedding photography and films. India and worldwide.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[600px] overflow-hidden">
      <motion.img
        src={images.hero.primary}
        alt="A couple photographed quietly at the end of their wedding day"
        style={{ y }}
        className="absolute inset-0 h-[118%] w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/55" />
      <div className="grain absolute inset-0" />

      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex h-full flex-col justify-end pb-16 text-background md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="label-xs text-background/70"
        >
          Wedding photography & films — India and worldwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="ligature mt-6 text-[15vw] leading-[0.82] md:text-[11vw]"
        >
          The day, <span className="italic lowercase tracking-tight">remembered</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="mt-10 flex flex-col gap-6 border-t border-background/25 pt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-sm leading-relaxed text-background/75">
            We photograph weddings the way documentary crews work — close, unhurried and almost
            invisible. Nothing staged, nothing repeated.
          </p>
          <WhatsAppButton variant="light">Check your date</WhatsAppButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <section className="shell py-12 md:py-16">
        <PressStrip />
      </section>

      {/* Brand split */}
      <section className="shell section-y grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
        <Reveal>
          <p className="label-xs text-bronze">The studio</p>
          <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-6xl">
            A small studio, an unusually long attention span.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            theswaymvar was built around a simple preference: that a wedding should be recorded, not
            directed. We arrive early, learn the names, and then spend the day out of the way —
            waiting for the things that only happen once.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            The result is a body of work that looks like your family rather than a catalogue.
          </p>
          <Link to="/story" className="label-xs story-link mt-9 inline-block text-foreground">
            Read our story
          </Link>
        </Reveal>
        <div className="relative">
          <RevealImage
            src={images.approach.large}
            alt="Golden hour over a hillside wedding venue"
            className="aspect-[4/5] hover-lift"
          />
          <RevealImage
            src={images.approach.inset}
            alt="Detail of a bride's hands during the ceremony"
            className="absolute -bottom-8 -left-6 hidden aspect-square w-40 border-8 border-background md:block lg:w-52"
          />
        </div>
      </section>

      {/* Masonry with text tiles */}
      <section className="shell section-y">
        <SectionHeading
          eyebrow="Selected frames"
          title="Moments, in the order they happened."
          body="Fragments from recent weddings — mornings that ran late, ceremonies that ran long, and everything the two of you were too busy to see."
        />
        <div className="mt-14">
          <MasonryGrid
            tiles={[
              { type: "image", src: images.moments[0], alt: "Bride and groom embracing", span: "row-span-2 aspect-[3/4] md:col-span-2 md:aspect-[4/5]" },
              { type: "image", src: images.moments[1], alt: "Mehndi detail on a bride's hand", span: "aspect-square" },
              { type: "text", eyebrow: "No. 01", body: "We never ask anyone to do it again for the camera.", span: "" },
              { type: "image", src: images.moments[2], alt: "Bouquet held during the vows", span: "aspect-square" },
              { type: "image", src: images.moments[3], alt: "Couple walking away hand in hand", span: "aspect-[4/5] md:col-span-1" },
              { type: "image", src: images.moments[4], alt: "Sparkler over the cake at night", span: "aspect-[3/4] md:col-span-2 md:aspect-[16/10]" },
              { type: "image", src: images.moments[5], alt: "Overhead frame of a bridal gown", span: "aspect-square" },
              { type: "text", eyebrow: "No. 02", body: "Live sound, honest light, and no second takes.", span: "" },
              { type: "image", src: images.moments[6], alt: "Groom's safa in evening light", span: "aspect-square" },
              { type: "image", src: images.moments[7], alt: "Hands resting together", span: "aspect-square" },
              { type: "image", src: images.moments[8], alt: "Bride holding her bouquet", span: "aspect-[4/5] md:col-span-2 md:aspect-[16/10]" },
              { type: "image", src: images.moments[9], alt: "Bridal shoes and roses", span: "aspect-square" },
            ]}
          />
        </div>
      </section>

      <DiagonalBreak
        image={images.break.cinematic}
        eyebrow="Our only rule"
        quote="Photograph what is happening, never what should be happening."
        attribution="theswaymvar — studio note, 2019"
      />

      {/* Films */}
      <section className="shell section-y">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-20">
          <SectionHeading
            eyebrow="Films"
            title="Cut for feeling, not for the reel."
            body="Every wedding is filmed with live sound and edited to the rhythm the day actually had. Short film, long documentary cut, and a same-day edit if you'd like the room to go quiet before dessert."
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <RevealImage src={images.films.reelA} alt="Still from a wedding film at dusk" className="aspect-[3/4] hover-lift" />
            <RevealImage src={images.films.reelB} alt="Still from a coastal wedding film" className="mt-10 aspect-[3/4] hover-lift" />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-y border-border/60 bg-card">
        <div className="shell section-y">
          <SectionHeading eyebrow="What we do" title="Four ways to be photographed." />
          <ul className="mt-14 divide-y divide-border/70 border-t border-border/70">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to="/services"
                  className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5 py-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-10"
                >
                  <span className="label-xs text-bronze">{s.numeral}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl md:text-4xl">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.line}</p>
                  </div>
                  <span className="label-xs hidden text-muted-foreground transition-colors group-hover:text-foreground md:block">
                    View
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured work */}
      <section className="shell section-y">
        <SectionHeading eyebrow="Recent work" title="Weddings, told whole." />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {stories.slice(0, 3).map((story, i) => (
            <Reveal key={story.slug} delay={i * 0.08}>
              <Link to="/work/$slug" params={{ slug: story.slug }} className="hover-lift block">
                <div className="overflow-hidden">
                  <img
                    src={story.cover}
                    alt={`${story.couple} in ${story.location}`}
                    loading="lazy"
                    className={`w-full object-cover ${i === 1 ? "aspect-[3/4] md:mt-14" : "aspect-[4/5]"}`}
                  />
                </div>
                <p className="label-xs mt-5 text-muted-foreground">{story.location}</p>
                <h3 className="font-display mt-2 text-3xl">{story.couple}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <Link to="/work" className="label-xs story-link">
            All stories
          </Link>
        </Reveal>
      </section>

      {/* Premium series */}
      <section className="relative isolate overflow-hidden bg-charcoal text-background">
        <img src={premium.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="grain absolute inset-0" />
        <div className="shell section-y-lg relative">
          <div className="max-w-2xl">
            <p className="label-xs text-bronze">{premium.eyebrow}</p>
            <h2 className="font-display mt-6 text-5xl leading-[1] md:text-7xl">{premium.name}</h2>
            {premium.body.map((p) => (
              <p key={p} className="mt-6 text-sm leading-relaxed text-background/70 md:text-base">
                {p}
              </p>
            ))}
            <div className="mt-10">
              <WhatsAppButton variant="light" message="Hello theswaymvar — we'd like to know more about The Ivory Series.">
                Request the series
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="shell section-y">
        <TestimonialCarousel />
      </section>

      {/* Recognition */}
      <section className="border-t border-border/60">
        <div className="shell section-y">
          <p className="label-xs text-center text-muted-foreground">Recognition</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-8">
            {recognition.map((r, i) => (
              <Laurel key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="shell section-y-lg text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            Tell us the dates. We'll tell you what's possible.
          </h2>
          <div className="mt-10">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
