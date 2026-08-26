// @ts-nocheck
import React from "react";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";

import { assets } from "@/assets/asset-manifest";

const instagramPosts = [
  {
    id: "little-snap-instagram-01",
    image: assets.home.editorial[2].mobile,
    alt: "Bride portrait",
    caption: "Quiet moments before forever.",
    location: "Jaipur, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
  {
    id: "little-snap-instagram-02",
    image: assets.home.editorial[3].mobile,
    alt: "Groom portrait",
    caption: "The anticipation builds.",
    location: "Udaipur, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
  {
    id: "little-snap-instagram-03",
    image: assets.home.editorial[4].mobile,
    alt: "Couple candid moment",
    caption: "A stolen glance.",
    location: "Jodhpur, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
  {
    id: "little-snap-instagram-04",
    image: assets.home.editorial[5].mobile,
    alt: "Wedding details / jewellery",
    caption: "Heirlooms of the heart.",
    location: "Bikaner, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
  {
    id: "little-snap-instagram-05",
    image: assets.home.editorial[6].mobile,
    alt: "Decor and aesthetics",
    caption: "Setting the scene.",
    location: "Pushkar, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
  {
    id: "little-snap-instagram-06",
    image: assets.home.editorial[7].mobile,
    alt: "Joyous laughter",
    caption: "Laughter lines.",
    location: "Jaisalmer, India",
    instagramUrl: "https://instagram.com/little_snap__/?hl=en",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function LittleSnapInstagramSection() {
  return (
    <section className="w-full bg-[#fcfcfc] py-[clamp(4rem,10vw,8rem)] px-[clamp(1rem,4vw,3rem)] border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto">
        {/* HEADING */}
        <div className="flex flex-col items-center justify-center text-center mb-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-3 mb-4">
            <Instagram className="w-5 h-5 text-[#42221b] opacity-80" strokeWidth={1.5} />
            <h2 className="font-sans text-[clamp(12px,1.5vw,14px)] uppercase tracking-[0.3em] text-[#42221b]">
              INSTAGRAM
            </h2>
          </div>
          <p className="font-script text-[clamp(2rem,4vw,3.5rem)] text-[#2d2c2a] leading-none -rotate-1">
            Little moments, captured as they happen.
          </p>
        </div>

        {/* INSTAGRAM GRID */}
        <div className="w-full max-w-[1175px] mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-[3px] w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {instagramPosts.slice(0, 6).map((item) => (
              <motion.a
                key={item.id}
                href="https://www.instagram.com/little_snap__/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="relative aspect-square w-full bg-[#f0ede6] overflow-hidden group block"
                variants={itemVariants}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* DESKTOP HOVER OVERLAY */}
                <div className="absolute inset-0 bg-[#2d2c2a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex flex-col justify-between p-6 z-10 pointer-events-none">
                  <div className="w-full flex justify-end">
                    <Instagram className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/90">
                      {item.location}
                    </span>
                    <p className="font-display italic text-lg text-white leading-tight">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* SECTION FOOTER */}
        <div className="flex flex-col items-center justify-center mt-[clamp(3rem,6vw,5rem)]">
          <span className="font-sans text-[clamp(10px,1vw,12px)] uppercase tracking-[0.2em] text-[#8b867c] mb-4">
            FOLLOW OUR LITTLE MOMENTS
          </span>
          <a
            href="https://www.instagram.com/little_snap__/?hl=en"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-between border border-[#333] bg-transparent px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.875rem,2vw,1rem)] transition-all duration-500 hover:border-[#42221b] hover:bg-[#42221b] w-max"
          >
            <span className="font-sans text-[clamp(10px,1vw,12px)] uppercase tracking-[0.15em] text-[#2d2c2a] group-hover:text-[#fcfcfc] transition-colors duration-500">
              @little_snap__
            </span>
            <span className="text-[#c4a97d] transition-transform duration-500 group-hover:translate-x-2 ml-6 text-[clamp(14px,1.5vw,16px)]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
