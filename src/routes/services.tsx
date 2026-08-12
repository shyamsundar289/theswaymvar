import { createFileRoute } from "@tanstack/react-router";
import { premium, services } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Wedding Coverage & Films | theswaymvar" },
      {
        name: "description",
        content:
          "Full wedding coverage, story-led wedding films, destination weddings and same-day edits — photographed by a small documentary-minded studio.",
      },
      { property: "og:title", content: "Services — Wedding Coverage & Films | theswaymvar" },
      {
        property: "og:description",
        content: "Coverage, films, destination weddings and same-day edits.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="shell page-top pb-14 md:pb-20">
        <Reveal>
          <p className="label-xs text-bronze">Services</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.98] md:text-8xl">
            Four ways to be photographed.
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Every engagement is quoted individually — the number of functions, the cities and the
            hours decide the shape of it. What never changes is the team size and the attention.
          </p>
        </Reveal>
      </section>

      {services.map((s, i) => (
        <section key={s.id} className="shell section-y border-t border-border/60">
          <div
            className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-20 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <RevealImage src={s.image} alt={s.name} className="aspect-[4/5] hover-lift" />
            <Reveal delay={0.05}>
              <p className="label-xs text-bronze">{s.numeral}</p>
              <h2 className="font-display mt-5 text-4xl leading-[1.05] md:text-6xl">{s.name}</h2>
              <p className="mt-5 font-display text-xl text-foreground/80 md:text-2xl">{s.line}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.body}
              </p>
              <div className="mt-9">
                <WhatsAppButton
                  variant="outline"
                  message={`Hello theswaymvar — we'd like to enquire about ${s.name}.`}
                >
                  Enquire about this
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="relative isolate overflow-hidden bg-charcoal text-background">
        <img src={premium.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="grain absolute inset-0" />
        <div className="shell section-y-lg relative max-w-2xl">
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
      </section>
    </>
  );
}
