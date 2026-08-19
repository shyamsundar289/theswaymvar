import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// =========================================================
// HERO SLIDES DATA
// Edit this array to add, remove, or reorder hero images.
// =========================================================
const heroSlides = [
  {
    id: "slide-1",
    desktopImage: "/images/Home/home-hero-desktop-03.png",
    mobileImage: "/images/Home/home-hero-mobile-03.png",
    alt: "Quiet portrait of the bride and groom",
  },
  {
    id: "slide-2",
    desktopImage: "/images/Home/home-hero-desktop-02.png",
    mobileImage: "/images/Home/home-hero-mobile-02.png",
    alt: "Intimate wedding ceremony moments",
  },
  {
    id: "slide-3",
    desktopImage: "/images/Home/home-hero-desktop-01.png",
    mobileImage: "/images/Home/home-hero-mobile-01.png",
    alt: "Couple embracing in cinematic golden hour light",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide
const TRANSITION_DURATION = 1.5; // 1.5 seconds for the cinematic fade/scale

export function AnimatedHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // =========================================================
  // AUTOPLAY LOGIC
  // =========================================================
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, AUTOPLAY_INTERVAL);
  }, []);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    // Start timer on mount. We removed the hover-pause to ensure
    // the visual progress lines always remain perfectly in sync.
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % heroSlides.length;
    // Preload next desktop image
    const desktopImg = new Image();
    desktopImg.src = heroSlides[nextIndex].desktopImage;
    // Preload next mobile image
    const mobileImg = new Image();
    mobileImg.src = heroSlides[nextIndex].mobileImage;
  }, [currentIndex]);

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================
  const slideVariants = {
    initial: {
      opacity: 0,
      scale: 1.05,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: TRANSITION_DURATION, ease: "easeOut" },
        scale: { duration: TRANSITION_DURATION + 4, ease: "easeOut" },
      },
    },
    exit: {
      opacity: 0,
      scale: 1,
      transition: { duration: TRANSITION_DURATION, ease: "easeIn" },
    },
  };

  const handleManualNavigation = (index: number) => {
    setCurrentIndex(index);
    resetTimer(); // Crucial: restart the 5s clock so it doesn't instantly double-skip
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {/* 1. BACKGROUND SLIDER LAYER */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={heroSlides[currentIndex].id}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          <picture className="block h-full w-full">
            <source media="(max-width: 767px)" srcSet={heroSlides[currentIndex].mobileImage} />
            <source media="(min-width: 768px)" srcSet={heroSlides[currentIndex].desktopImage} />
            <img
              src={heroSlides[currentIndex].desktopImage}
              alt={heroSlides[currentIndex].alt}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              className="h-full w-full object-cover"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* 2. CINEMATIC OVERLAY */}
      <div 
        className="absolute inset-0 z-10 bg-black/20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 3. LUXURY EDITORIAL CONTENT (Left Aligned & Refined) */}
      <div className="absolute inset-0 z-20 flex w-full flex-col justify-end items-center pb-[15vh] md:pb-[18vh] px-6 md:px-12 lg:px-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full max-w-4xl text-center pointer-events-auto flex flex-col items-center"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-4 text-center">
            <h1 className="font-sans text-[10px] sm:text-[11px] md:text-[13px] font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#c1b599] drop-shadow-sm max-w-full text-center">
              YOUR STORY. OUR FRAME. FOREVER.
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
