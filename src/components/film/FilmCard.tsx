import { Link } from "@tanstack/react-router";
import { type Film } from "@/types/film";
import { LazyVideo } from "./LazyVideo";

interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  return (
    <Link to="/films/$slug" params={{ slug: film.slug }} className="group block hover-lift">
      <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal">
        <LazyVideo src={film.video} poster={film.poster} className="h-full w-full" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="label-xs text-muted-foreground">
            {film.couple && `${film.couple} — `}
            {film.location}
          </p>
          <h3 className="font-display mt-2 text-2xl md:text-3xl group-hover:text-bronze transition-colors">
            {film.title}
          </h3>
        </div>

        {film.duration && (
          <span className="label-xs text-muted-foreground shrink-0 mt-1">{film.duration}</span>
        )}
      </div>
    </Link>
  );
}
