import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { films } from "@/data/films";
import { FilmPlayer } from "@/components/film/FilmPlayer";
import { FilmStories } from "@/components/film/FilmStories";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params: { slug } }) => {
    const film = films.find((f) => f.slug === slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.film.title} | theswaymvar films` },
      {
        name: "description",
        content: loaderData.film.description || "A wedding film by theswaymvar.",
      },
    ],
  }),
  component: FilmDetail,
});

import { Header } from "@/components/site/Header";
function FilmDetail() {
  const { film } = Route.useLoaderData();

  return (
    <div className="bg-background pt-[var(--header-height)] min-h-[calc(100svh-var(--header-height))]">
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

