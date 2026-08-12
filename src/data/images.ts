import hero from "@/assets/hero.jpg";
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

/**
 * Central image map — every image in the site resolves through here so client
 * photography can be swapped one-to-one later without touching layout code.
 */
export const images = {
  hero: { primary: hero },
  approach: {
    large: approachLarge,
    inset: approachInset,
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
      cover: hero,
      gallery: [m1, m2, m5, m7, approachLarge],
    },
    "ira-and-vikram": {
      cover: filmB,
      gallery: [filmA, m4, m6, m3, filmHighlight],
    },
    "naina-and-rohan": {
      cover: m8,
      gallery: [breakCinematic, m5, m3, m2, m7],
    },
    "saira-and-dev": {
      cover: approachLarge,
      gallery: [m7, m1, m4, m6, filmB],
    },
    "tara-and-kabir": {
      cover: premiumCover,
      gallery: [m6, m2, approachInset, filmB, m8],
    },
    "anya-and-jai": {
      cover: filmHighlight,
      gallery: [m3, m5, breakCinematic, m4, m1],
    },
  },
} as const;
