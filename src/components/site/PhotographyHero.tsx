import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { heroImages } from "@/data/photography-projects";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import { getPhotoSrcSet, getPhotoSrc, getPhotoSizes } from "@/lib/photography-image-utils";

const allImages = heroImages;
const safeGetImage = (index: number) => allImages[index % allImages.length];

const mediaGrid = Array.from({ length: 5 }).map((_, colIndex) =>
  Array.from({ length: 6 }).map((_, rowIndex) => {
    const flatIndex = colIndex * 6 + rowIndex;
    return { id: flatIndex, src: safeGetImage(flatIndex) };
  }),
);

import { Header } from "./Header";

export function PhotographyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -450]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -350]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -250]);

  const columnTransforms = [y1, y2, y3, y4, y5];

  return (
    <section ref={containerRef} className="relative h-full w-full bg-transparent overflow-hidden">
      <Header />
      {/* Tilted Image Grid */}
      <motion.div
        className="absolute flex gap-4 md:gap-6 w-[160vw] md:w-[110vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotate: "-12deg",
          scale: 1.1,
        }}
      >
        {mediaGrid.map((column, colIndex) => (
          <motion.div
            key={colIndex}
            className="flex flex-col gap-4 md:gap-6 flex-1 items-center"
            style={{ y: columnTransforms[colIndex], willChange: "transform" }}
          >
            {column.map((item, rowIndex) => {
              // First image in each column is most likely visible — mark critical
              const isCritical = rowIndex === 0;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl bg-[#E8E4D9] shadow-[0_10px_30px_rgba(0,0,0,0.08)] shrink-0 group cursor-pointer"
                >
                  <OptimizedImage
                    src={getPhotoSrc(item.src!)}
                    srcSet={getPhotoSrcSet(item.src!)}
                    sizes={getPhotoSizes("hero-tile")}
                    alt="Photography story"
                    critical={isCritical}
                    fetchPriority={isCritical ? "high" : undefined}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  />
                  {/* Subtle darkening on hover to emphasize the lift */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle black gradient at the bottom so moving images fade into darkness */}
      <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
