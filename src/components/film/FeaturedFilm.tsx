import { Link } from "@tanstack/react-router";
import { Play, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { films } from "@/data/films";
import { LazyVideo } from "./LazyVideo";

export function FeaturedFilm() {
  const featured = films.find((f) => f.featured) || films[0];

  if (!featured) return null;

  return (
    <section className="shell section-y-lg">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Featured film" title="Watch the day unfold." size="lg" />

        {featured.duration && (
          <span className="label-xs hidden text-muted-foreground md:block">
            {featured.duration} / FILM
          </span>
        )}
      </div>

      <Reveal className="mt-14">
        <Link
          to="/films/$slug"
          params={{ slug: featured.slug }}
          className="group relative block overflow-hidden bg-charcoal"
          aria-label={`Watch ${featured.title}`}
        >
          <div className="aspect-[16/9] w-full overflow-hidden">
            <LazyVideo
              src={featured.video}
              poster={featured.poster}
              className="h-full w-full transition-transform duration-1000 group-hover:scale-[1.025]"
            />
          </div>

          <div className="absolute inset-0 bg-charcoal/20 transition-colors duration-500 group-hover:bg-charcoal/35" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-background/70 text-background transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-background md:bottom-10 md:left-10 md:right-10 pointer-events-none">
            <div>
              <p className="label-xs text-bronze">
                {featured.couple} — {featured.location}
              </p>

              <p className="font-display mt-2 text-3xl md:text-5xl">{featured.title}</p>
            </div>

            <ArrowUpRight className="hidden h-7 w-7 md:block" />
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
