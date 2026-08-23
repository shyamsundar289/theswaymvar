import { RevealImage, Reveal } from "./Reveal";

type ImageTile = {
  type: "image";
  src: string;
  alt: string;
  span?: string;
};

type TextTile = {
  type: "text";
  eyebrow: string;
  body: string;
  span?: string;
};

type Tile = ImageTile | TextTile;

export function MasonryGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {tiles.map((tile, i) => {
        if (tile.type === "image") {
          return (
            <RevealImage
              key={i}
              src={tile.src}
              alt={tile.alt}
              className="group aspect-square overflow-hidden"
              imgClassName="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />
          );
        }

        return (
          <Reveal
            key={i}
            className="flex aspect-square items-center justify-center bg-card px-6 py-8 text-center md:px-8"
          >
            <div className="max-w-xs">
              <p className="font-display text-xl leading-[1.15] md:text-2xl">{tile.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
