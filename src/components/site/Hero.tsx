import { assets } from "../../assets/asset-manifest";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { images } from "@/data/images";

// 1. Semantic asset mapping (existing project photography)
const heroImages = {
  logoBg: assets.misc.dscf0463,
  topLeft: assets.recentWork.recent01,
  center: assets.misc.image4,
  topRight: assets.recentWork.recent02,
  farRight: assets.misc.image5,
  middleLeft: assets.recentWork.recent03,
  middleRight: assets.misc.image6,
  bottomLeft: images.hero.primary,
  bottomCenter: images.approach.inset,
  farLeft: images.approach.large,
};

// Fallback images for peripheral slots off-screen so we don't noticeably repeat hero cards
const fallbackImages = [
  images.break.cinematic,
  assets.recentWork.recent01,
  assets.recentWork.recent02,
];

// Exact mapping to the 20-slot grid
const semanticMap: Record<number, string> = {
  1: heroImages.farLeft,
  4: heroImages.topLeft,
  5: heroImages.middleLeft,
  6: heroImages.bottomLeft,
  9: heroImages.logoBg, // [2][1] Center image behind logo
  10: heroImages.center, // [2][2] Below logo
  11: heroImages.bottomCenter, // [2][3] Bottom center
  12: heroImages.topRight,
  13: heroImages.middleRight,
  17: heroImages.farRight,
};

function getImage(flatIndex: number) {
  if (semanticMap[flatIndex]) return semanticMap[flatIndex];
  return fallbackImages[flatIndex % fallbackImages.length];
}

// Original column heights translated directly from vh to px based on 900px design height
// e.g. 35vh -> 315px, 45vh -> 405px
const columnHeightsPx = [
  [315, 405, 270, 360],
  [405, 315, 450, 315],
  [270, 450, 315, 405], // Col 2
  [405, 270, 360, 315],
  [315, 405, 270, 360],
];

const mediaGrid = columnHeightsPx.map((heights, colIndex) =>
  heights.map((heightPx, rowIndex) => {
    const flatIndex = colIndex * 4 + rowIndex;
    const isLogoBg = colIndex === 2 && rowIndex === 1;
    return { id: flatIndex, src: getImage(flatIndex), heightPx, isLogoBg };
  }),
);

export function Hero() {
  const [scale, setScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollY } = useScroll();

  // Preserved original scroll parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -450]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -350]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -250]);
  const columnTransforms = [y1, y2, y3, y4, y5];

  useEffect(() => {
    setIsMounted(true);
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const DESIGN_WIDTH = 1440;
      const DESIGN_HEIGHT = 900;

      // Calculate scale to cover the window height/width (intentional edge clipping)
      const scaleX = width / DESIGN_WIDTH;
      const scaleY = height / DESIGN_HEIGHT;
      let newScale = Math.max(scaleX, scaleY);

      // CRITICAL TYPOGRAPHY SCALING:
      // We want large, elegant text that wraps naturally with breathing room.
      // On mobile (width < 768), our text block wraps at ~650px inside the canvas.
      // By setting SAFE_TEXT_WIDTH to 750, we guarantee a 100px buffer (50px each side)
      // in canvas units, resulting in ~26px of visual padding on a 390px phone screen.
      // This keeps the font huge (~50px) while maintaining comfortable editorial margins.
      const SAFE_TEXT_WIDTH = width < 768 ? 750 : 1100;
      if (SAFE_TEXT_WIDTH * newScale > width) {
        newScale = width / SAFE_TEXT_WIDTH;
      }

      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F6F4EE]"
      style={{ height: isMounted ? 900 * scale : "100vh" }}
    >
      {/* Black gradient mask at the top of the hero to create a hiding effect under the sticky header */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-30 pointer-events-none" />
      {/* FIXED DESIGN CANVAS - Uniform scaling only */}
      <div
        className="absolute left-1/2 top-1/2 w-[1440px] h-[900px] origin-center pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate(-50%, -50%) scale(${isMounted ? scale : 1})`,
          opacity: isMounted ? 1 : 0,
        }}
      >
        {/* ORIGINAL Tilted Image Grid Frozen in Pixels */}
        <motion.div
          className="absolute flex w-[1872px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            gap: "24px",
            rotate: "-12deg",
            scale: 1.2,
          }}
        >
          {mediaGrid.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex flex-col flex-1"
              style={{
                gap: "24px",
                y: columnTransforms[colIndex],
              }}
            >
              {column.map((item) => (
                <div
                  key={item.id}
                  className="relative w-full overflow-hidden rounded-[24px] bg-[#E8E4D9] shadow-sm pointer-events-auto"
                  style={{ height: `${item.heightPx}px` }}
                >
                  <img
                    src={item.src}
                    alt="Editorial wedding photography"
                    className="w-full h-full object-cover block"
                    style={
                      item.isLogoBg
                        ? { filter: "grayscale(100%) contrast(0.9) brightness(0.85)" }
                        : {}
                    }
                  />
                  {item.isLogoBg && (
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Soft scrim behind headline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="h-[450px] w-[936px] rounded-[100%] bg-[#F6F4EE]/50 blur-3xl" />
        </div>

        {/* Foreground Typography - Scales perfectly with canvas */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center mt-[-45px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            <h1
              className="font-display font-normal leading-[0.95] tracking-tight text-[#15130F] w-full max-w-[650px] md:max-w-[1100px] px-[24px] md:px-[60px]"
              style={{ fontSize: "96px" }}
            >
              Love, Set in Motion.
            </h1>
            <p className="text-[#15130F]/80 mt-[28px] font-display italic font-normal tracking-normal w-full max-w-[480px] md:max-w-[760px] px-[32px] md:px-[80px] text-2xl md:text-3xl">
              Timeless wedding stories, beautifully captured.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F6F4EE] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
