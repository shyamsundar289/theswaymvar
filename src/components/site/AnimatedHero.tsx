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
    image: "/images/index-hero-01.png",
    alt: "Couple embracing in cinematic golden hour light",
  },
  {
    id: "slide-2",
    image: "/images/index-hero-02.png",
    alt: "Intimate wedding ceremony moments",
  },
  {
    id: "slide-3",
    image: "/images/index-hero-03.png",
    alt: "Quiet portrait of the bride and groom",
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
    const img = new Image();
    img.src = heroSlides[nextIndex].image;
  }, [currentIndex]);

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================
  const slideVariants = {
    initial: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 1.03,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: TRANSITION_DURATION,
        ease: [0.25, 0.1, 0.25, 1], // Smooth, cinematic easing
      },
    },
    exit: {
      opacity: 0,
      // We don't scale on exit to prevent the image behind from looking weird
      transition: {
        duration: TRANSITION_DURATION,
        ease: "easeInOut",
      },
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
        <motion.img
          key={heroSlides[currentIndex].id}
          src={heroSlides[currentIndex].image}
          alt={heroSlides[currentIndex].alt}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          loading={currentIndex === 0 ? "eager" : "lazy"}
          fetchPriority={currentIndex === 0 ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* 2. CINEMATIC OVERLAY */}
      <div 
        className="absolute inset-0 z-10 bg-black/20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 3. LUXURY EDITORIAL CONTENT (Left Aligned & Refined) */}
      <div className="absolute inset-0 z-20 flex w-full flex-col justify-end items-start pb-[15vh] md:pb-[18vh] px-6 md:px-12 lg:px-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full max-w-4xl text-left pointer-events-auto flex flex-col items-start"
        >
          <div className="flex flex-col items-start gap-4 mb-4">
            <p className="font-sans text-[12px] md:text-[13px] font-medium uppercase tracking-[0.4em] text-[#c1b599] drop-shadow-sm">
              YOUR STORY. OUR FRAME. FOREVER.
            </p>
            
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-wide text-white drop-shadow-md italic">
              Moments made timeless.
            </h1>
            
            <p className="font-sans text-[13px] md:text-[15px] font-light tracking-wide text-white/85 max-w-lg mt-2">
              Filming the moments you’ll relive forever.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4. LUXURY EDITORIAL SLIDE INDICATOR & CONTROLS */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center justify-center gap-4 px-6 md:bottom-12">
        <div className="flex items-center gap-6">
          {/* Luxury Progress Lines */}
          <div className="flex items-center gap-3" role="tablist">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={currentIndex === index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => handleManualNavigation(index)}
                className="group relative flex h-6 w-12 items-center justify-center transition-all md:w-20 cursor-pointer"
              >
                {/* Background track: Ultra-thin and faint */}
                <span className="absolute left-0 h-[1px] w-full bg-white/10 transition-colors duration-500 group-hover:bg-white/30" />
                
                {/* Active progress fill: Slowly grows to 100% over the 5 seconds */}
                {currentIndex === index && (
                  <motion.span
                    key={`progress-${currentIndex}`}
                    className="absolute left-0 h-[1.5px] w-full origin-left bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      duration: AUTOPLAY_INTERVAL / 1000, // 5 seconds
                      ease: "linear" 
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Total Slides Number */}
          <span className="w-4 text-left font-sans text-[0.65rem] font-medium tabular-nums tracking-widest text-white/40">
            {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
