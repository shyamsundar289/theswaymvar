import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { stories } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/CTA";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story not found — theswaymvar" }, { name: "robots", content: "noindex" }],
      };
    }
    const { story } = loaderData;
    const title = `${story.couple}, ${story.location} — theswaymvar`;
    return {
      meta: [
        { title },
        { name: "description", content: story.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: story.intro },
      ],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryDetail,
});

function StoryNotFound() {
  return (
    <div className="shell page-top pb-32 text-center">
      <h1 className="font-display text-5xl md:text-7xl">We can't find that story.</h1>
      <Link to="/work" className="label-xs story-link mt-8 inline-block">
        Back to all work
      </Link>
    </div>
  );
}

function StoryDetail() {
  const { story } = Route.useLoaderData();
  const index = stories.findIndex((s) => s.slug === story.slug);
  const next = stories[(index + 1) % stories.length]!;

  return (
    <>
      <section className="shell page-top pb-12 md:pb-16">
        <Reveal>
          <Link to="/work" className="label-xs story-link text-muted-foreground">
            Work
          </Link>
          <h1 className="font-display mt-6 text-5xl leading-[0.98] md:text-8xl">{story.couple}</h1>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 border-t border-border/70 pt-6">
            <p className="label-xs text-muted-foreground">{story.location}</p>
            <p className="label-xs text-muted-foreground">{story.date}</p>
          </div>
        </Reveal>
      </section>

      <RevealImage src={story.cover} alt={`${story.couple} in ${story.location}`} className="aspect-[16/10] w-full md:aspect-[16/7]" />

      <section className="shell section-y grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <Reveal>
          <p className="font-display text-3xl leading-tight md:text-4xl">{story.intro}</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {story.narrative.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {story.gallery.map((src, i) => (
            <RevealImage
              key={src + i}
              src={src}
              alt={`${story.couple} wedding frame ${i + 1}`}
              className={`hover-lift ${
                i === 0
                  ? "col-span-2 aspect-[4/5] md:col-span-2 md:aspect-[16/11]"
                  : i === 2
                    ? "col-span-2 aspect-[16/10] md:col-span-2"
                    : "aspect-[4/5]"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="shell section-y grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="label-xs text-bronze">Next story</p>
            <Link to="/work/$slug" params={{ slug: next.slug }} className="font-display mt-4 block text-4xl md:text-6xl">
              {next.couple}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{next.location}</p>
          </div>
          <div className="md:justify-self-end">
            <WhatsAppButton variant="outline">Enquire on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
