import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { stories, type Story } from "@/data/site";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CouplePhotoGrid } from "@/components/site/CouplePhotoGrid";
import { WhatsAppButton } from "@/components/site/CTA";
import { getSeoMetadata, SITE_URL } from "@/config/seo";

export const Route = createFileRoute("/photography/$slug")({
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
    const title = `${story.couple} | Wedding Photography in ${story.location} | The Swaymvar`;
    return {
      meta: getSeoMetadata(title, story.intro || `Wedding photography of ${story.couple} in ${story.location} by The Swaymvar.`, `/photography/${story.slug}`),
      links: [{ rel: "canonical", href: `${SITE_URL}/photography/${story.slug}` }],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryDetail,
});

function StoryNotFound() {
  return (
    <div className="shell page-top pb-32 text-center">
      <h1 className="font-display text-5xl md:text-7xl">We can't find that story.</h1>
      <Link to="/photography" className="label-xs story-link mt-8 inline-block">
        Back to all work
      </Link>
    </div>
  );
}

import { Header } from "@/components/site/Header";

function StoryDetail() {
  const { story } = Route.useLoaderData() as { story: Story };
  const index = stories.findIndex((s) => s.slug === story.slug);
  const next = stories[(index + 1) % stories.length]!;

  return (
    <>
      <section className="shell relative">
        <Header />
        <div className="pt-[120px] pb-6 md:pt-[140px] md:pb-8 w-full">
          <Reveal>
            <h1 className="font-display text-3xl leading-[0.98] md:text-6xl text-right italic">
              {story.couple}
            </h1>
          </Reveal>
        </div>
      </section>

      <RevealImage
        src={story.cover}
        alt={`${story.couple} in ${story.location}`}
        className="aspect-[16/10] w-full md:aspect-[16/7] border-[8px] border-t-0 border-white"
      />

      <section className="shell section-y grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <Reveal>
          <p className="font-display text-3xl leading-tight md:text-4xl">{story.intro}</p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {story.narrative.map((p: string) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      {story.gallery && story.gallery.length > 0 && (
        <section className="shell pb-20 md:pb-28">
          <CouplePhotoGrid media={story.gallery} />
        </section>
      )}

      <section className="border-t border-border/60">
        <div className="shell section-y grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="label-xs text-bronze">Next story</p>
            <Link
              to="/photography/$slug"
              params={{ slug: next.slug }}
              className="font-display mt-4 block text-4xl md:text-6xl"
            >
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
