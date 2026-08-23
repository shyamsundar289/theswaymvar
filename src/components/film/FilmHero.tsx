import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { films } from "@/data/films";
import { HeroVideoTile } from "./HeroVideoTile";

// Safely cycle through real film videos/posters — no invented asset URLs
function getFilm(index: number) {
  if (!films.length) return null;
  return films[index % films.length];
}

const columnHeights = [
  ["h-[35vh]", "h-[45vh]", "h-[30vh]", "h-[40vh]"],
  ["h-[45vh]", "h-[35vh]", "h-[50vh]", "h-[35vh]"],
  ["h-[30vh]", "h-[50vh]", "h-[35vh]", "h-[45vh]"],
  ["h-[45vh]", "h-[30vh]", "h-[40vh]", "h-[35vh]"],
  ["h-[35vh]", "h-[45vh]", "h-[30vh]", "h-[40vh]"],
];

const mediaGrid = columnHeights.map((heights, colIndex) =>
  heights.map((height, rowIndex) => {
    const flatIndex = colIndex * 4 + rowIndex;
    return { id: flatIndex, film: getFilm(flatIndex), height };
  }),
);

import { Header } from "../site/Header";

export function FilmHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -450]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -350]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -250]);

  const columnTransforms = [y1, y2, y3, y4, y5];

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-[#F6F4EE]">
      <Header />
      {/* Tilted Video Grid */}
      <motion.div
        className="absolute flex gap-4 md:gap-6 w-[200vw] md:w-[130vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotate: "-12deg",
          scale: 1.2,
        }}
      >
        {mediaGrid.map((column, colIndex) => (
          <motion.div
            key={colIndex}
            className="flex flex-col gap-4 md:gap-6 flex-1"
            style={{ y: columnTransforms[colIndex] }}
          >
            {column.map((item) => (
              <div
                key={item.id}
                className={`relative w-full ${item.height} overflow-hidden rounded-xl md:rounded-3xl bg-[#E8E4D9] shadow-sm`}
              >
                {item.film && <HeroVideoTile video={item.film.video} poster={item.film.poster} />}
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Cinematic edge vignette — darkens the corners slightly instead of washing the whole frame white */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#15130F_150%)] opacity-20 pointer-events-none z-10" />

      {/* Soft, contained scrim behind the headline only — protects readability without flattening the videos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="h-[50%] w-[92%] md:w-[65%] rounded-[100%] bg-[#F6F4EE]/50 blur-3xl" />
      </div>

      {/* Foreground Typography */}
      <div className="relative z-20 shell flex flex-col items-center justify-center h-full text-center mt-[-5vh]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-[#15130F]"
        >
          Love, Set in Motion.
          <span className="text-[#15130F]/80 text-xl md:text-2xl lg:text-3xl block mt-5 md:mt-7 font-display italic font-normal tracking-normal max-w-2xl mx-auto">
            Timeless wedding stories, beautifully captured in motion.
          </span>
        </motion.h1>
      </div>

      {/* Short, gentle fade into the next section — no longer a full opaque wash */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#F6F4EE] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
