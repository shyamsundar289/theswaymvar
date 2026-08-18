import { FILM_CATEGORIES, type FilmCategory } from "@/types/film";

interface FilmFilterProps {
  active: FilmCategory;
  onChange: (category: FilmCategory) => void;
}

export function FilmFilter({ active, onChange }: FilmFilterProps) {
  return (
    <div className="bg-[#F0ECE0]/80 sticky top-[60px] md:top-[80px] z-40 border-y border-border/60 backdrop-blur-md">
      <div className="shell flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-8 text-sm md:gap-x-4 md:py-10 md:text-base">
        {FILM_CATEGORIES.map((cat, i) => (
          <span key={cat} className="flex items-center gap-x-3 md:gap-x-4">
            {i > 0 && (
              <span className="text-muted-foreground/50" aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => onChange(cat)}
              aria-current={active === cat}
              className={`font-display pb-1 transition-colors duration-200 ${
                active === cat
                  ? "border-b border-foreground font-bold text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
