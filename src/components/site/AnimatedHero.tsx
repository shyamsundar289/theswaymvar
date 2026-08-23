import { assets } from "../../assets/asset-manifest";
import React from "react";
import { motion } from "motion/react";

// =========================================================
// HERO STATIC IMAGE
// =========================================================
const heroSlide = {
  desktopImage: assets.home.hero.desktop,
  mobileImage: assets.home.hero.mobile,
  alt: "Quiet portrait of the bride and groom",
};

import { Header } from "./Header";

export function AnimatedHero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      <Header />
      {/* 1. BACKGROUND STATIC IMAGE LAYER */}
      <div className="absolute inset-0 h-full w-full">
        <picture className="block h-full w-full">
          <source media="(max-width: 767px)" srcSet={heroSlide.mobileImage} />
          <source media="(min-width: 768px)" srcSet={heroSlide.desktopImage} />
          <img
            src={heroSlide.desktopImage}
            alt={heroSlide.alt}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

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
