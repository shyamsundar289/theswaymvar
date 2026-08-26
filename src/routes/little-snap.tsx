// @ts-nocheck
import { Header } from "@/components/site/Header";
import { assets } from "../assets/asset-manifest";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { motion } from "motion/react";
import { LittleSnapInstagramSection } from "../components/site/LittleSnapInstagramSection";

import { getSeoMetadata, SITE_URL } from "@/config/seo";
export const Route = createFileRoute("/little-snap")({
  head: () => ({
    meta: getSeoMetadata(
      "Little Snap | Candid Wedding Photography in Bikaner | The Swaymvar",
      "Little Snap by The Swaymvar offers candid wedding photography and short-form visual stories. Based in Bikaner, Rajasthan.",
      "/little-snap"
    ),
    links: [{ rel: "canonical", href: `${SITE_URL}/little-snap` }],
  }),
  component: LittleSnapPage,
});

const BalloonSVG = ({ className }: { className?: string }) => (
  <div className={`relative aspect-[2/3] ${className || ""}`}>
    <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
      <defs>
        <clipPath id="balloon-clip">
          <path
            d="M 100 10 
                   C 170 10, 195 70, 195 120 
                   C 195 170, 145 220, 120 240 
                   L 80 240 
                   C 55 220, 5 170, 5 120 
                   C 5 70, 30 10, 100 10 Z"
          />
        </clipPath>

        <linearGradient id="shading" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0.4" />
          <stop offset="25%" stopColor="black" stopOpacity="0" />
          <stop offset="75%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.4" />
        </linearGradient>

        <pattern id="basket-weave" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#a06c45" />
          <path d="M 0 4 L 8 4 M 4 0 L 4 8" stroke="#754b2c" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Ropes */}
      <line x1="85" y1="240" x2="78" y2="270" stroke="#756157" strokeWidth="1.5" />
      <line x1="115" y1="240" x2="122" y2="270" stroke="#756157" strokeWidth="1.5" />
      <line x1="95" y1="240" x2="92" y2="270" stroke="#756157" strokeWidth="1" />
      <line x1="105" y1="240" x2="108" y2="270" stroke="#756157" strokeWidth="1" />

      {/* Envelope */}
      <g clipPath="url(#balloon-clip)">
        {/* Base Red */}
        <rect x="0" y="0" width="200" height="250" fill="#c44331" />
        {/* Orange Stripe */}
        <rect x="0" y="45" width="200" height="35" fill="#d67b36" />
        {/* Cream Stripe */}
        <rect x="0" y="80" width="200" height="40" fill="#ebd7bb" />
        {/* Yellow Stripe */}
        <rect x="0" y="120" width="200" height="35" fill="#d69b36" />
        {/* Orange Stripe 2 */}
        <rect x="0" y="155" width="200" height="35" fill="#c4642b" />



        {/* Vertical Gores (3D curves) */}
        <line x1="100" y1="10" x2="100" y2="240" stroke="rgba(0,0,0,0.15)" strokeWidth="0.75" />

        {/* Inner arcs */}
        <path
          d="M 100 10 A 25 115 0 0 1 100 240"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 100 10 A 25 115 0 0 0 100 240"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          fill="none"
        />

        {/* Mid arcs */}
        <path
          d="M 100 10 A 55 115 0 0 1 100 240"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 100 10 A 55 115 0 0 0 100 240"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          fill="none"
        />

        {/* Outer arcs */}
        <path
          d="M 100 10 A 80 115 0 0 1 100 240"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 100 10 A 80 115 0 0 0 100 240"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* 3D Shading Overlay */}
        <rect x="0" y="0" width="200" height="250" fill="url(#shading)" />

        {/* Subtle Highlight */}
        <path d="M 40 50 A 60 80 0 0 1 80 20 A 40 70 0 0 0 30 70 Z" fill="white" opacity="0.1" />
      </g>

      {/* Envelope Bottom Rim */}
      <ellipse cx="100" cy="240" rx="20" ry="3.5" fill="#802619" />
      <path d="M 80 240 A 20 3.5 0 0 0 120 240" stroke="#52150c" strokeWidth="1.5" fill="none" />

      {/* Basket */}
      <rect x="75" y="270" width="50" height="25" rx="1.5" fill="url(#basket-weave)" />
      <rect x="73" y="270" width="54" height="4" rx="1" fill="#4B2E15" />
    </svg>
  </div>
);

const FLEX_COLUMNS = [
  [
    // Col 1
    {
      src: assets.home.editorial[0].mobile,
      desktopSrc: assets.home.editorial[0].desktop,
      aspect: "aspect-[4/5]",
    },
    {
      src: assets.home.editorial[1].mobile,
      desktopSrc: assets.home.editorial[1].desktop,
      aspect: "aspect-[1/1]",
    },
    {
      src: assets.home.editorial[2].mobile,
      desktopSrc: assets.home.editorial[2].desktop,
      aspect: "aspect-[5/4]",
    },
  ],
  [
    // Col 2
    {
      src: assets.home.editorial[3].mobile,
      desktopSrc: assets.home.editorial[3].desktop,
      aspect: "aspect-[4/5]",
    },
    {
      src: assets.home.editorial[4].mobile,
      desktopSrc: assets.home.editorial[4].desktop,
      aspect: "aspect-[5/4]",
    },
    {
      src: assets.home.editorial[5].mobile,
      desktopSrc: assets.home.editorial[5].desktop,
      aspect: "aspect-[4/5]",
    },
  ],
  [
    // Col 3
    {
      src: assets.home.editorial[6].mobile,
      desktopSrc: assets.home.editorial[6].desktop,
      aspect: "aspect-[1/1]",
    },
    {
      src: assets.home.editorial[7].mobile,
      desktopSrc: assets.home.editorial[7].desktop,
      aspect: "aspect-[1/1]",
    },
    {
      src: assets.home.editorial[8].mobile,
      desktopSrc: assets.home.editorial[8].desktop,
      aspect: "aspect-[5/4]",
    },
  ],
  [
    // Col 4
    {
      src: assets.home.editorial[9].mobile,
      desktopSrc: assets.home.editorial[9].desktop,
      aspect: "aspect-[4/5]",
    },
    {
      src: assets.home.editorial[10].mobile,
      desktopSrc: assets.home.editorial[10].desktop,
      aspect: "aspect-[4/5]",
    },
    {
      src: assets.home.editorial[11].mobile,
      desktopSrc: assets.home.editorial[11].desktop,
      aspect: "aspect-[1/1]",
    },
  ],
  [
    // Col 5
    {
      src: assets.home.editorial[12].mobile,
      desktopSrc: assets.home.editorial[12].desktop,
      aspect: "aspect-[4/5]",
    },
    {
      src: assets.home.editorial[13].mobile,
      desktopSrc: assets.home.editorial[13].desktop,
      aspect: "aspect-[5/4]",
    },
  ],
];

function LittleSnapPage() {
  return (
    <div className="w-full bg-white selection:bg-[#4a1c14] selection:text-[#F7F3EB] relative">
      {/* ================= STICKY HERO SECTION ================= */}
      <div className="sticky top-0 w-full h-[60vh] md:h-[500px] lg:h-[580px] bg-white z-0">
        <Header />
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center font-sans pt-[60px] md:pt-[100px] z-0">
          {/* Large Left Balloon (Lower) - Increased Animation */}
          <motion.div
            className="absolute left-[4%] md:left-[15%] top-[78%] md:top-[65%] -translate-y-1/2 w-[18vw] md:w-[13vw] max-w-[180px] min-w-[70px] z-10"
            animate={{
              y: [0, -25, 0],
              x: [0, 8, -5, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <BalloonSVG />
          </motion.div>

          {/* Small Right Balloon (Higher) - Increased Animation */}
          <motion.div
            className="absolute right-[4%] md:right-[18%] top-[35%] -translate-y-1/2 w-[14vw] md:w-[9vw] max-w-[120px] min-w-[50px] z-10"
            animate={{
              y: [0, -20, 0],
              x: [0, -6, 4, 0],
              rotate: [0, 2, -1, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <BalloonSVG />
          </motion.div>

          {/* CENTER TYPOGRAPHY / LOGO */}
          <div className="relative z-20 flex flex-col items-center justify-center -mt-8 md:-mt-4 pointer-events-none">
            <img
              src="/images/little-snap-logo.svg"
              alt="Little Snap Photography"
              draggable="false"
              className="w-[75vw] max-w-[320px] md:max-w-[500px] lg:max-w-[600px] object-contain z-10 select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT THAT SCROLLS OVER HERO ================= */}
      <div className="relative z-10 w-full bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        {/* STYLIZED INTRO SECTION */}
        <section className="w-full px-6 py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-[#2d2c2a] max-w-5xl mx-auto italic tracking-wide">
            Quiet corners. Stolen glances. <br className="hidden md:block" />
            <span className="font-sans text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-[#7a6f65] font-semibold block mt-4 md:mt-8 not-italic">
              The beautiful in-between moments.
            </span>
          </h2>
        </section>

        {/* HIGH-PERFORMANCE SEAMLESS COLLAGE GRID (20 Images) */}
        <section className="w-full bg-white px-0">
          <div className="flex w-full">
            {FLEX_COLUMNS.map((column, colIdx) => (
              <div
                key={`col-${colIdx}`}
                className={`flex flex-col flex-1 ${colIdx >= 3 ? "hidden md:flex" : "flex"}`}
              >
                {column.map((img, imgIdx) => (
                  <div
                    key={`img-${colIdx}-${imgIdx}`}
                    className={`w-full relative overflow-hidden group ${img.aspect}`}
                  >
                    <picture>
                      {img.desktopSrc && (
                        <source media="(min-width: 768px)" srcSet={img.desktopSrc} />
                      )}
                      <img
                        src={img.src}
                        alt={`Little Snap ${colIdx}-${imgIdx}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 block will-change-transform"
                      />
                    </picture>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* INSTAGRAM SECTION */}
        <LittleSnapInstagramSection />
      </div>
    </div>
  );
}

