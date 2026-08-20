import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { images } from "@/data/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — theswaymvar" },
      {
        name: "description",
        content: "Cinematic Wedding Films & Photography. Quiet records of celebrations.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-[100svh] selection:bg-bronze/30">
      {/* 
        NOTE: Added pt-32 to clear the fixed global transparent header.
        No Hero section is used, as per the strict constraints. 
      */}

      {/* SECTION 1 — Company Detail */}
      <section className="shell pt-32 pb-16 md:pt-48 md:pb-24">
        <Reveal className="grid gap-12 border-t border-border/60 pt-12 md:grid-cols-2 md:gap-24">
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
              theswaymvar
            </h1>
            <p className="label-xs mt-4 text-bronze">
              Cinematic Wedding Films & Photography
            </p>
          </div>
          <div className="flex items-end">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-md">
              We are a wedding photography and film studio making quiet, cinematic records of celebrations across India and worldwide. We focus on narrative, light, and the moments you were too busy to notice. By enquiry only.
            </p>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 — Our Story */}
      <section className="shell section-y">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2.5fr] items-stretch">
          <RevealImage
            src={images.approach.inset}
            alt="Professional Portrait"
            className="aspect-[4/5] md:aspect-auto md:h-full w-full object-cover grayscale"
          />
          <Reveal className="flex flex-col justify-center h-full max-w-2xl py-4 md:py-10">
            <p className="label-xs text-muted-foreground mb-6">Our Story</p>
            <div className="space-y-6 text-base leading-relaxed text-foreground/90 md:text-lg md:leading-loose">
              <p>
                I started with a borrowed camera and a preference for sitting in the back row. What I learned quickly was that the most important moments of a wedding never happen on stage. They happen in the hallways, in the thirty seconds before walking down the aisle, and in the quiet glances exchanged when nobody else is looking.
              </p>
              <p>
                Over the years, theswaymvar evolved from a solo endeavor into a small, tight-knit studio. We shifted our focus entirely toward documentary-style filmmaking because we realized that directing a couple to pose for a memory completely strips the truth out of it.
              </p>
              <p>
                For us, the greatest privilege is not just being invited to your celebration, but being trusted enough to blend in, stay out of the way, and preserve the day exactly as it felt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — Philosophy / Approach */}
      <section className="shell section-y border-t border-border/60">
        <Reveal>
          <p className="label-xs text-muted-foreground mb-12">Philosophy</p>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-3 md:gap-16">
          <Reveal delay={0.1}>
            <h3 className="font-display text-2xl mb-4">Story over staging</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We never ask you to pause, repeat, or fake an emotion. The truth of the day is always more compelling than anything we could direct.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-display text-2xl mb-4">Light first</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We shoot for atmosphere. Whether it’s the harsh midday sun or the dim warmth of a courtyard at midnight, we use available light to shape the mood.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h3 className="font-display text-2xl mb-4">Edited with intention</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Our films are cut to the actual rhythm of your celebration. We prioritize live audio, ambient sound, and honest pacing over generic highlight reels.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4 — Experience & Highlights */}
      <section className="shell section-y border-t border-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Reveal delay={0.1}>
            <p className="font-display text-[clamp(2.25rem,4vw,3rem)] mb-2 text-bronze">150+</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Weddings shot</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-display text-[clamp(2.25rem,4vw,3rem)] mb-2 text-bronze">42</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Brand films delivered</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-display text-[clamp(2.25rem,4vw,3rem)] mb-2 text-bronze">8</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Years behind camera</p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-display text-[clamp(2.25rem,4vw,3rem)] mb-2 text-bronze">12</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Countries traveled</p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — Contact Information */}
      <section className="shell py-20 md:py-32 border-t border-border/60 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2rem,4vw,3rem)] mb-12 text-foreground">
            Let's create something worth remembering.
          </h2>
          
          <div className="flex flex-col items-center gap-6 text-sm md:text-base text-muted-foreground">
            <p>
              <span className="label-xs block text-bronze mb-2">Phone</span>
              +91 98765 43210
            </p>
            <p>
              <span className="label-xs block text-bronze mb-2">Email</span>
              hello@theswaymvar.com
            </p>
            <p>
              <span className="label-xs block text-bronze mb-2">Studio</span>
              New Delhi, India
            </p>
          </div>
        </Reveal>
      </section>

      {/* SECTION 6 — Contact Us */}
      <section className="shell section-y border-t border-border/60">
        <Reveal>
          <p className="label-xs text-muted-foreground mb-12 text-center">Contact Us</p>
          <div className="max-w-2xl mx-auto">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-muted-foreground">Name</label>
                  <input type="text" id="name" className="bg-transparent border-b border-border/60 px-0 py-2 focus:outline-none focus:border-bronze transition-colors text-foreground" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
                  <input type="email" id="email" className="bg-transparent border-b border-border/60 px-0 py-2 focus:outline-none focus:border-bronze transition-colors text-foreground" placeholder="Your email address" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-muted-foreground">Message</label>
                <textarea id="message" rows={4} className="bg-transparent border-b border-border/60 px-0 py-2 focus:outline-none focus:border-bronze transition-colors resize-none text-foreground" placeholder="Tell us about your celebration..."></textarea>
              </div>
              <div className="pt-4 text-center md:text-left">
                <button type="submit" className="inline-flex items-center justify-center border border-border/60 px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors duration-300">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
