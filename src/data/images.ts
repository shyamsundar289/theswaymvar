import hero from "@/assets/hero.jpg";
import DSC09937copy from "@/assets/DSC09937copy.jpg";
import approachLarge from "@/assets/approach-large.jpg";
import approachInset from "@/assets/approach-inset.jpg";
import breakCinematic from "@/assets/break-cinematic.jpg";
import filmA from "@/assets/film-a.jpg";
import filmB from "@/assets/film-b.jpg";
import filmHighlight from "@/assets/film-highlight.jpg";
import premiumCover from "@/assets/premium.jpg";
import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import m6 from "@/assets/m6.jpg";
import m7 from "@/assets/m7.jpg";
import m8 from "@/assets/m8.jpg";
import filmHero from "@/assets/film-hero.jpg";
/**
 * Central image map — every image in the site resolves through here so client
 * photography can be swapped one-to-one later without touching layout code.
 */
export const images = {
  hero: { primary: DSC09937copy },
  approach: {
    large: "/images/DSCF0463 copy.webp",
    inset: "/images/4.webp",
  },
  moments: [m1, m2, m3, m4, m5, m6, m7, m8, filmA, m3, m5, m8],
  break: { cinematic: breakCinematic },
  films: {
    reelA: filmA,
    reelB: filmB,
    highlightA: filmHighlight,
    highlightB: breakCinematic,
  },
  premium: { cover: premiumCover },
  story: {
    opener: hero,
    one: approachInset,
    two: m1,
    three: m5,
  },
  services: {
    wedding: m5,
    films: filmA,
    destination: m8,
    sameday: filmHighlight,
    finearts: premiumCover,
  },
  work: {
    "meher-and-arjun": {
      cover: "/images/Recent01.webp",
      gallery: [],
    },
    "ira-and-vikram": {
      cover: "/images/Recent02.webp",
      gallery: [],
    },
    "naina-and-rohan": {
      cover: "/images/Recent03.webp",
      gallery: [],
    },
    "saira-and-dev": {
      cover: "/images/4.webp",
      gallery: [],
    },
    "tara-and-kabir": {
      cover: "/images/5.webp",
      gallery: [],
    },
    "anya-and-jai": {
      cover: "/images/6.webp",
      gallery: [],
    },
  },

  /* =========================================================
     PAGE-SPECIFIC IMAGE MAPS
     Intentional allocation to avoid repetition across pages
  ========================================================= */

  /** Film page images */
  /** Film page images */
  film: {
    hero: filmHero,  // ← yeh change kiya
    approach: approachLarge,
    featured: filmHighlight,
    featuredPoster: filmHighlight,
    moments: [hero, m2, m6] as readonly string[],
    storyPortrait: approachInset,
    storyLandscape: filmA,
    moreMoments: [m7, filmB, m4] as readonly string[],
    ctaBg: m8,
  },

  /** Photography page images */
  photo: {
    hero: m5,
    approach: m1,
    featuredHero: approachLarge,
    featuredLeft: m3,
    featuredRight: m7,
    gallery: [hero, filmB, m8] as readonly string[],
    experience: m2,
  },

  /** Services page images */
  svc: {
    hero: premiumCover,
    photography: m6,
    filmService: filmA,
    combined: [m5, breakCinematic] as readonly string[],
    howItWorks: approachInset,
  },
} as const;
