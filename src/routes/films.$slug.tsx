// @ts-nocheck
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { films } from "@/data/films";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { FilmStories } from "@/components/film/FilmStories";
import { Reveal } from "@/components/site/Reveal";
import { getSeoMetadata, BUSINESS_INFO, SITE_URL } from "@/config/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params: { slug } }) => {
    const film = films.find((f) => f.slug === slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => ({
    meta: getSeoMetadata(
      `${loaderData.film.title} | Cinematic Wedding Films | The Swaymvar`,
      loaderData.film.description || `Cinematic wedding film of ${loaderData.film.couple} by The Swaymvar in ${loaderData.film.location}.`,
      `/films/${loaderData.film.slug}`
    ),
  }),
  component: FilmDetail,
});

import { Header } from "@/components/site/Header";
function FilmDetail() {
  const { film } = Route.useLoaderData();

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `${film.title} - ${film.couple}`,
    "description": film.description || `Cinematic wedding film of ${film.couple} at ${film.location}`,
    "thumbnailUrl": `${SITE_URL}${film.poster}`,
    "contentUrl": `${SITE_URL}${film.video}`,
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`
      }
    }
  };

  return (
    <div className="bg-background pt-[var(--header-height)] min-h-[calc(100svh-var(--header-height))]">
      <JsonLd data={videoSchema} />
      <div className="relative w-full">
        <Header />
        <div className="shell py-8 md:py-12">
          <Reveal>
          <Link
            to="/film"
            className="inline-flex items-center gap-2 label-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Films
          </Link>

          <div className="mt-12 md:mt-16">
            <p className="label-xs text-bronze">
              {film.couple} — {film.location}
            </p>
            <h1 className="font-display mt-4 text-4xl md:text-7xl">{film.title}</h1>
            {film.description && (
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
                {film.description}
              </p>
            )}
          </div>
        </Reveal>
      </div>

      <div className="shell pb-16 md:pb-24">
        <Reveal delay={0.2}>
          <FilmPlayer src={film.video} poster={film.poster} title={film.title} />
        </Reveal>
      </div>

      {film.chapters && film.chapters.length > 0 && <FilmStories chapters={film.chapters} />}
      </div>
    </div>
  );
}

