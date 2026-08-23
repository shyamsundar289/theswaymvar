import { assets } from "../assets/asset-manifest";
import DSC09937copy from "@/assets/misc_general_09937.webp";
import m1 from "@/assets/misc_general_01.webp";
import m3 from "@/assets/misc_general_03.webp";

/**
 * Central image map — every image in the site resolves through here so client
 * photography can be swapped one-to-one later without touching layout code.
 */
export const images = {
  hero: { primary: DSC09937copy },
  approach: {
    large: assets.misc.dscf0463,
    inset: assets.misc.image4,
  },
  moments: [m1, m3, m1, m3, m1, m3, m1, m3, assets.recentWork.recent01, m3, m1, m3],
  break: { cinematic: assets.misc.parallaxBg },
  films: {
    reelA: assets.recentWork.recent01,
    reelB: assets.recentWork.recent02,
    highlightA: assets.recentWork.recent03,
    highlightB: assets.misc.parallaxBg,
  },
  premium: { cover: assets.recentWork.recent03 },
  story: {
    opener: DSC09937copy,
    one: assets.misc.image4,
    two: m1,
    three: m3,
  },
  services: {
    wedding: m3,
    films: assets.recentWork.recent01,
    destination: m1,
    sameday: assets.recentWork.recent03,
    finearts: assets.recentWork.recent03,
  },
  work: {
    "meher-and-arjun": {
      cover: assets.recentWork.recent01,
      gallery: [],
    },
    "ira-and-vikram": {
      cover: assets.recentWork.recent02,
      gallery: [],
    },
    "naina-and-rohan": {
      cover: assets.recentWork.recent03,
      gallery: [],
    },
    "saira-and-dev": {
      cover: assets.misc.image4,
      gallery: [],
    },
    "tara-and-kabir": {
      cover: assets.misc.image5,
      gallery: [],
    },
    "anya-and-jai": {
      cover: assets.misc.image6,
      gallery: [],
    },
  },

  /* =========================================================
     PAGE-SPECIFIC IMAGE MAPS
     Intentional allocation to avoid repetition across pages
  ========================================================= */

  /** Film page images */
  film: {
    hero: DSC09937copy,
    approach: assets.misc.dscf0463,
    featured: assets.recentWork.recent03,
    featuredPoster: assets.recentWork.recent03,
    moments: [DSC09937copy, m1, m3] as readonly string[],
    storyPortrait: assets.misc.image4,
    storyLandscape: assets.recentWork.recent01,
    moreMoments: [m1, assets.recentWork.recent02, m3] as readonly string[],
    ctaBg: m3,
  },

  /** Photography page images */
  photo: {
    hero: m3,
    approach: m1,
    featuredHero: assets.misc.dscf0463,
    featuredLeft: m3,
    featuredRight: m1,
    gallery: [DSC09937copy, assets.recentWork.recent02, m3] as readonly string[],
    experience: m1,
  },

  /** Services page images */
  svc: {
    hero: assets.recentWork.recent03,
    photography: m3,
    filmService: assets.recentWork.recent01,
    combined: [m3, assets.misc.parallaxBg] as readonly string[],
    howItWorks: assets.misc.image4,
  },
} as const;
