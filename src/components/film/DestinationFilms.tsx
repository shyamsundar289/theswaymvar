import { films } from "@/data/films";
import { DestinationFilm } from "./DestinationFilm";
import { Reveal } from "@/components/site/Reveal";

export function DestinationFilms() {
  const destFilms = films.filter((f) => f.destination);

  if (!destFilms.length) return null;

  return (
    <section className="bg-[#E8E4D9] py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <div className="max-w-2xl">
            <p className="label-xs text-bronze">Beyond borders</p>
            <h2 className="font-display mt-5 text-4xl leading-[1.05] md:text-6xl">
              Destination films.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              From the lakes of Italy to the palaces of Rajasthan, we travel anywhere a good story
              is happening.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-32 md:mt-32 md:gap-48">
          {destFilms.map((film, i) => (
            <DestinationFilm key={film.id} film={film} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
