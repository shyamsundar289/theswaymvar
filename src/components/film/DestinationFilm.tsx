import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { type Film } from "@/types/film";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

interface DestinationFilmProps {
  film: Film;
  index: number;
}

export function DestinationFilm({ film, index }: DestinationFilmProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !imageRef.current || !containerRef.current) return;

    const gsap = registerGSAP();
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const isEven = index % 2 === 0;

  return (
    <Link
      to="/films/$slug"
      params={{ slug: film.slug }}
      ref={containerRef}
      className={`group grid gap-10 md:grid-cols-12 md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      <div className={`overflow-hidden md:col-span-7 bg-charcoal ${isEven ? "md:col-start-1" : "md:col-start-6"}`}>
        <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden w-full relative">
          <img
            ref={imageRef}
            src={film.poster}
            alt={film.title}
            className="absolute -top-[15%] left-0 w-full h-[130%] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>

      <div className={`md:col-span-4 ${isEven ? "md:col-start-9" : "md:col-start-1 md:row-start-1"}`}>
        <Reveal>
          <p className="label-xs text-bronze">{film.location}</p>
          <h3 className="font-display mt-4 text-4xl md:text-6xl transition-colors group-hover:text-bronze">
            {film.title}
          </h3>
          
          {film.couple && (
            <p className="mt-6 text-sm text-muted-foreground md:text-base">
              {film.couple}
            </p>
          )}

          <div className="mt-10 flex items-center gap-3 label-xs story-link text-foreground transition-colors group-hover:text-bronze">
            Watch Film
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Reveal>
      </div>
    </Link>
  );
}
