import { type FilmChapter as FilmChapterType } from "@/types/film";
import { LazyVideo } from "./LazyVideo";
import { Reveal } from "@/components/site/Reveal";

interface FilmChapterProps {
  chapter: FilmChapterType;
  index: number;
}

export function FilmChapter({ chapter, index }: FilmChapterProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid gap-8 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
      <div className={`order-2 md:order-none ${isEven ? "md:order-1" : "md:order-2"}`}>
        <Reveal delay={0.1}>
          <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal">
            <LazyVideo
              src={chapter.video || ""}
              poster={chapter.poster || ""}
              className="h-full w-full"
            />
          </div>
        </Reveal>
      </div>

      <div className={`order-1 md:order-none ${isEven ? "md:order-2" : "md:order-1"}`}>
        <Reveal>
          <div className="flex items-end gap-6">
            <h3 className="font-display text-3xl md:text-5xl">
              {chapter.title}
            </h3>
            <span className="label-xs mb-2 text-bronze">
              {chapter.timestamp}
            </span>
          </div>
          
          {chapter.description && (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {chapter.description}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
