import { RevealImage, Reveal } from "./Reveal";

type Tile = { type: "image"; src: string; alt: string; span?: string } | { type: "text"; eyebrow: string; body: string; span?: string };

export function MasonryGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {tiles.map((tile, i) =>
        tile.type === "image" ? (
          <RevealImage
            key={i}
            src={tile.src}
            alt={tile.alt}
            className={`hover-lift ${tile.span ?? ""}`}
            imgClassName="h-full w-full object-cover"
          />
        ) : (
          <Reveal
            key={i}
            className={`flex items-center bg-card px-5 py-8 md:px-8 ${tile.span ?? ""}`}
          >
            <div>
              <p className="label-xs text-bronze">{tile.eyebrow}</p>
              <p className="font-display mt-4 text-xl leading-snug md:text-2xl">{tile.body}</p>
            </div>
          </Reveal>
        ),
      )}
    </div>
  );
}
