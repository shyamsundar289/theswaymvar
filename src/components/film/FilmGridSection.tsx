import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { filmLibraryData, FilmCategory, LibraryFilm } from "@/data/film-library";
import { FilmGridCard } from "./FilmGridCard";
import { FilmLightbox } from "./FilmLightbox";
import { Reveal } from "@/components/site/Reveal";

type FilterType = "ALL" | FilmCategory;

export function FilmGridSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [activeFilm, setActiveFilm] = useState<LibraryFilm | null>(null);

  const filteredFilms = useMemo(() => {
    if (activeFilter === "ALL") return filmLibraryData;
    return filmLibraryData.filter((film) => film.category === activeFilter);
  }, [activeFilter]);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All Films", value: "ALL" },
    { label: "Weddings", value: "WEDDING" },
    { label: "Pre-Weddings", value: "PRE-WEDDING" },
  ];

  return (
    <section className="bg-background pt-10 md:pt-16 pb-24 relative z-10">
      {/* Editorial Header Section */}
      <div className="shell flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center w-full">
          {/* Main Heading */}
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-[#2d2c2a] max-w-3xl mb-6">
            Stories in motion,{" "}
            <span className="italic font-light text-[#8b867c]">captured beautifully.</span>
          </h2>

          {/* Supporting text */}
          <p className="text-[#5D5A55] text-[16px] md:text-[18px] font-normal tracking-[0.2px] max-w-2xl mx-auto mb-10 md:mb-14">
            A curated collection of our most cherished wedding films. Every frame tells a story of
            love, family, and the quiet moments in between.
          </p>
        </Reveal>
      </div>

      {/* Filter Navigation with Editorial Lines */}
      <div className="w-full max-w-[1440px] mx-auto px-[5vw] lg:px-[7vw]">
        <Reveal delay={0.1}>
          {/* Top Divider */}
          <div className="w-full h-[1px] bg-[#e4e0d7] mb-4 md:mb-6"></div>

          {/* Filter Group */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 px-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative py-3 text-[11px] md:text-[13px] tracking-[0.2em] uppercase font-sans transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "text-[#2d2c2a] font-medium"
                    : "text-[#8b867c] hover:text-[#2d2c2a]"
                }`}
                aria-label={`Show ${filter.label}`}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
                {/* Active Indicator Line */}
                {activeFilter === filter.value && (
                  <motion.div
                    layoutId="active-film-filter"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#2d2c2a]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Bottom Divider */}
          <div className="w-full h-[1px] bg-[#e4e0d7] mt-4 md:mt-6 mb-12 md:mb-16"></div>
        </Reveal>

        {/* Video Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredFilms.map((film) => (
              <FilmGridCard key={film.id} film={film} onClick={setActiveFilm} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Video Player */}
      {activeFilm && <FilmLightbox film={activeFilm} onClose={() => setActiveFilm(null)} />}
    </section>
  );
}
