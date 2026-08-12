import { createFileRoute, Link } from "@tanstack/react-router";
import { stories } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/photography/")({
  head: () => ({
    meta: [
      { title: "Photography — Wedding Stories | theswaymvar" },
      {
        name: "description",
        content:
          "Selected wedding stories photographed and filmed by theswaymvar — Udaipur, Alibaug, Jaipur, Coonoor, Lake Como and Goa.",
      },
      { property: "og:title", content: "Photography — Wedding Stories | theswaymvar" },
      { property: "og:description", content: "Selected wedding stories, told whole." },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <>
      <section className="shell page-top pb-14 md:pb-20">
        <Reveal>
          <p className="label-xs text-bronze">Photography</p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.98] md:text-8xl">
            Weddings, told whole.
          </h1>
        </Reveal>
      </section>

      <section className="shell pb-20 md:pb-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-24">
          {stories.map((story, i) => (
            <Reveal key={story.slug} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <Link to="/photography/$slug" params={{ slug: story.slug }} className="hover-lift group block">
                <div className="overflow-hidden">
                  <img
                    src={story.cover}
                    alt={`${story.couple} — ${story.location}`}
                    loading="lazy"
                    className={`w-full object-cover ${i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
                  />
                </div>
                <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                  <h2 className="font-display truncate text-3xl md:text-4xl">{story.couple}</h2>
                  <p className="label-xs shrink-0 text-muted-foreground">{story.date}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{story.location}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell section-y-lg border-t border-border/60 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] md:text-7xl">
            Your wedding could be the next one here.
          </h2>
          <div className="mt-10">
            <WhatsAppButton>Enquire on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
