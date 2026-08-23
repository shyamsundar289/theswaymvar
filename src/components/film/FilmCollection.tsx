import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Play } from "lucide-react";
import { films } from "@/data/films";
import { type FilmCategory } from "@/types/film";
import { FilmFilter } from "./FilmFilter";
import { Reveal } from "@/components/site/Reveal";
import { FilmViewerModal } from "./FilmViewerModal";

// Local component for the hover preview to keep logic clean
const HoverVideoPreview = ({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster: string;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <>
      <img
        src={poster}
        alt="Film Poster"
        fetchPriority={isActive ? "high" : "auto"}
        loading="eager"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      />
      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "none"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
};

export function FilmCollection() {
  const [activeCategory, setActiveCategory] = useState<FilmCategory>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerActiveIndex, setViewerActiveIndex] = useState<number | null>(null);

  const filteredFilms = useMemo(() => {
    const base = films.filter((f) => !f.featured && !f.destination);
    if (activeCategory === "All") return base;
    return base.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (filteredFilms.length === 0) return;
    const index = Math.min(Math.floor(latest * filteredFilms.length), filteredFilms.length - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  // Reset progress when category changes
  useEffect(() => setActiveIndex(0), [activeCategory]);

  const openFilm = (index: number) => {
    setViewerActiveIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setViewerActiveIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="bg-[#F0ECE0] text-[#15130F] border-t border-border/40">
      <Reveal>
        <div className="shell pt-24 pb-12 md:pt-32 md:pb-16 text-center">
          <p className="label-xs text-bronze">The Archive</p>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05]">
            More stories.
          </h2>
        </div>
      </Reveal>

      <FilmFilter active={activeCategory} onChange={setActiveCategory} />

      {filteredFilms.length === 0 ? (
        <div className="shell py-32 text-center label-xs text-[#15130F]/40">
          No films found in this category.
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{ height: `${filteredFilms.length * 100}vh` }}
          className="relative w-full"
        >
          {/* Sticky Viewport */}
          <div className="sticky top-[80px] flex h-[calc(100vh-80px)] w-full flex-col justify-between overflow-hidden shell py-8 md:py-12">
            {/* TOP METADATA */}
            <div className="w-full flex justify-between items-start z-40 pointer-events-none">
              <div className="text-right ml-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredFilms[activeIndex]?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-end gap-1"
                  >
                    <span className="label-xs text-[#15130F]/80">
                      {filteredFilms[activeIndex]?.location}
                    </span>
                    <span className="label-xs text-[#15130F]/50">
                      {filteredFilms[activeIndex]?.category}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* MAIN VIDEO COMPOSITION LAYER */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence>
                {filteredFilms.map((film, idx) => {
                  const isActive = idx === activeIndex;
                  const isPrev = idx === activeIndex - 1;
                  const isNext = idx === activeIndex + 1;
                  const isNextNext = idx === activeIndex + 2;

                  if (!isActive && !isPrev && !isNext && !isNextNext) return null;

                  let initial = { opacity: 0, scale: 0.85, y: "15vh", x: "15vw", rotateZ: 5 };
                  let animate = {
                    opacity: 1,
                    scale: 1,
                    y: "0vh",
                    x: "0vw",
                    rotateZ: 0,
                    zIndex: 10,
                  };
                  let exit = {
                    opacity: 0,
                    scale: 0.95,
                    y: "-15vh",
                    x: "-15vw",
                    rotateZ: -5,
                    zIndex: 5,
                  };

                  if (isPrev) {
                    animate = {
                      opacity: 0,
                      scale: 1.05,
                      y: "-20vh",
                      x: "-20vw",
                      rotateZ: -5,
                      zIndex: 0,
                    };
                  }
                  if (isNext) {
                    animate = {
                      opacity: 0,
                      scale: 0.85,
                      y: "20vh",
                      x: "20vw",
                      rotateZ: 5,
                      zIndex: 0,
                    };
                  }
                  if (isNextNext) {
                    // Preload state: Keep it offscreen and transparent
                    animate = {
                      opacity: 0,
                      scale: 0.85,
                      y: "20vh",
                      x: "20vw",
                      rotateZ: 5,
                      zIndex: 0,
                    };
                  }

                  return (
                    <motion.div
                      key={film.id}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="group absolute w-[calc(100%-2rem)] md:w-[60%] max-w-[1100px] aspect-[4/3] md:aspect-[16/10] flex cursor-pointer items-center justify-center pointer-events-auto"
                      onClick={() => isActive && openFilm(idx)}
                    >
                      <div className="relative h-full w-full overflow-hidden bg-[#15130F] shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                        <HoverVideoPreview
                          src={film.video || ""}
                          poster={film.poster}
                          isActive={isActive}
                        />

                        <div className="absolute inset-0 bg-[#0F0D0A]/20 transition-colors duration-500 group-hover:bg-[#0F0D0A]/0" />

                        {isActive && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F6F4EE]/30 bg-[#F6F4EE]/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                              <Play className="ml-1 h-5 w-5 text-[#F6F4EE]" fill="currentColor" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#15130F]/40 to-transparent pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* BOTTOM METADATA: Couple Name & Timeline Progress */}
            <div className="w-full flex justify-between items-end z-40 pointer-events-none">
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={filteredFilms[activeIndex]?.couple}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[#15130F]"
                  >
                    {filteredFilms[activeIndex]?.couple}
                  </motion.h3>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-end gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prog-${filteredFilms[activeIndex]?.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-display text-2xl md:text-4xl text-[#15130F]/90"
                  >
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredFilms.length).padStart(2, "0")}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {viewerActiveIndex !== null && (
          <FilmViewerModal
            films={filteredFilms}
            activeIndex={viewerActiveIndex}
            onClose={closeViewer}
            onChangeIndex={setViewerActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
