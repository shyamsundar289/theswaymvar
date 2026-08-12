const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Central image map — every image in the site resolves through here so client
 * photography can be swapped one-to-one later without touching layout code.
 */
export const images = {
  hero: { primary: px(3014856, 1800) },
  approach: {
    large: px(3014851, 1200),
    inset: px(1456613, 900),
  },
  moments: [
    px(2253870, 1000),
    px(1444442, 1000),
    px(2959192, 1000),
    px(1043902, 1000),
    px(1729797, 1000),
    px(265722, 1000),
    px(1444443, 1000),
    px(3585811, 1000),
    px(2959190, 1000),
    px(313707, 1000),
    px(1128782, 1000),
    px(2306277, 1000),
  ],
  break: { cinematic: px(2253842, 1800) },
  films: {
    reelA: px(1024993, 1400),
    reelB: px(1024968, 1400),
    highlightA: px(1024960, 1200),
    highlightB: px(169198, 1200),
  },
  premium: { cover: px(1024990, 1600) },
  story: {
    opener: px(2253870, 1800),
    one: px(1456613, 1200),
    two: px(1444442, 1200),
    three: px(3014856, 1200),
  },
  services: {
    wedding: px(169198, 1400),
    films: px(3014851, 1400),
    destination: px(1024968, 1400),
    sameday: px(1729797, 1400),
    finearts: px(1024990, 1400),
  },
  work: {
    "meher-and-arjun": {
      cover: px(2253870, 1400),
      gallery: [px(2959192, 1200), px(1456613, 1000), px(1043902, 1400), px(313707, 1000), px(2306277, 1200)],
    },
    "ira-and-vikram": {
      cover: px(1024993, 1400),
      gallery: [px(1024960, 1200), px(1024968, 1400), px(4245826, 1200), px(1974521, 1000), px(1128782, 1200)],
    },
    "naina-and-rohan": {
      cover: px(1444443, 1400),
      gallery: [px(1444442, 1000), px(1729797, 1200), px(587741, 1400), px(2306281, 1200), px(265856, 1000)],
    },
    "saira-and-dev": {
      cover: px(3014851, 1400),
      gallery: [px(3585811, 1200), px(2253842, 1400), px(2959190, 1000), px(1035665, 1200), px(226735, 1000)],
    },
    "tara-and-kabir": {
      cover: px(265722, 1400),
      gallery: [px(1128783, 1200), px(2253870, 1400), px(1456613, 1000), px(169198, 1200), px(313707, 1000)],
    },
    "anya-and-jai": {
      cover: px(3014856, 1400),
      gallery: [px(1024993, 1200), px(2959192, 1000), px(1043902, 1400), px(1444442, 1000), px(2306277, 1200)],
    },
  },
} as const;
