import { images } from "./images";

export const WHATSAPP_NUMBER = "919999999999"; // swap for the studio's real number

export const waLink = (message = "Hello theswaymvar — we'd love to know about your availability.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Story", to: "/story" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Testimonials", to: "/testimonials" },
] as const;

export const pressNames = [
  "PUBLICATION NAME",
  "EDITORIAL HOUSE",
  "THE JOURNAL",
  "ATELIER PRESS",
  "MERIDIAN",
  "VOLUME NO. 9",
];

export const recognition = [
  { category: "Award Category", year: "Year", body: "Award Body" },
  { category: "Award Category", year: "Year", body: "Award Body" },
  { category: "Award Category", year: "Year", body: "Award Body" },
  { category: "Award Category", year: "Year", body: "Award Body" },
];

export type Story = {
  slug: string;
  couple: string;
  location: string;
  date: string;
  intro: string;
  narrative: string[];
  cover: string;
  gallery: readonly string[];
};

export const stories: Story[] = [
  {
    slug: "meher-and-arjun",
    couple: "Meher & Arjun",
    location: "Udaipur, Rajasthan",
    date: "November 2025",
    intro: "Three days of lake light, family songs and a courtyard that never quite went quiet.",
    narrative: [
      "They asked for one thing only: that nobody be asked to pose. So we spent the first morning listening — to grandmothers arguing about marigolds, to cousins rehearsing a song nobody would finish, to the water knocking against the ghat steps below the haveli.",
      "By the time the pheras began, the light had gone the colour of weak tea. Meher laughed through the last round. Arjun did not stop looking at her, and we did not stop looking at them.",
    ],
    cover: images.work["meher-and-arjun"].cover,
    gallery: images.work["meher-and-arjun"].gallery,
  },
  {
    slug: "ira-and-vikram",
    couple: "Ira & Vikram",
    location: "Alibaug, Maharashtra",
    date: "February 2025",
    intro: "A barefoot wedding at the edge of the water, built entirely around low tide.",
    narrative: [
      "The ceremony time was decided by the sea. We shot the morning in near silence — a house full of half-packed suitcases, a father ironing his own kurta, the smell of salt through every open window.",
      "When they walked out at dusk the whole thing lasted eleven minutes. It is still the longest eleven minutes we have ever filmed.",
    ],
    cover: images.work["ira-and-vikram"].cover,
    gallery: images.work["ira-and-vikram"].gallery,
  },
  {
    slug: "naina-and-rohan",
    couple: "Naina & Rohan",
    location: "Jaipur, Rajasthan",
    date: "December 2024",
    intro: "Old city colour, a brass band that refused to stop, and one very composed bride.",
    narrative: [
      "Rohan's baraat took forty minutes to cover two hundred metres. Naina watched the whole thing from a first-floor jharokha with her sisters, eating something she was not supposed to be eating.",
      "We photographed the day in colour because the day insisted on it — every wall, every safa, every plate of it.",
    ],
    cover: images.work["naina-and-rohan"].cover,
    gallery: images.work["naina-and-rohan"].gallery,
  },
  {
    slug: "saira-and-dev",
    couple: "Saira & Dev",
    location: "Coonoor, Tamil Nadu",
    date: "September 2024",
    intro: "Twenty-two guests, one hill, and weather that changed its mind hourly.",
    narrative: [
      "Fog arrived an hour before the vows and stayed for the rest of the evening. Nobody minded. The photographs from that hour look like they were made on borrowed film stock.",
      "This was an intimate wedding in the truest sense — every person present had a reason to cry, and most of them did.",
    ],
    cover: images.work["saira-and-dev"].cover,
    gallery: images.work["saira-and-dev"].gallery,
  },
  {
    slug: "tara-and-kabir",
    couple: "Tara & Kabir",
    location: "Lake Como, Italy",
    date: "June 2024",
    intro: "A garden ceremony held together by cypress shade and an aunt with excellent taste.",
    narrative: [
      "They flew forty-one people across two continents for a wedding that lasted a single afternoon. We treated it like a short film with no second take.",
      "The last frame of the day was made at 9:40pm, on the terrace, with the lake gone completely black behind them.",
    ],
    cover: images.work["tara-and-kabir"].cover,
    gallery: images.work["tara-and-kabir"].gallery,
  },
  {
    slug: "anya-and-jai",
    couple: "Anya & Jai",
    location: "Goa",
    date: "January 2024",
    intro: "A monochrome wedding weekend that ran on rum, rain and old records.",
    narrative: [
      "It rained for eleven straight hours. The mandap moved indoors, the band moved onto the veranda, and the wedding got better for it.",
      "We photographed most of the night in black and white — partly for the mood, mostly because the string lights left us no choice.",
    ],
    cover: images.work["anya-and-jai"].cover,
    gallery: images.work["anya-and-jai"].gallery,
  },
];

export const testimonials = [
  {
    quote:
      "We were nervous about cameras being everywhere. Instead it felt like two friends were with us all weekend, and then a month later a film arrived that made my mother cry twice.",
    name: "Meher & Arjun",
    place: "Udaipur",
  },
  {
    quote:
      "They never once asked us to do something again. Everything in the album actually happened, exactly the way we remember it happening.",
    name: "Ira & Vikram",
    place: "Alibaug",
  },
  {
    quote:
      "The photographs of our parents are the ones we return to. Somebody was clearly paying attention to the people we were too busy to notice that day.",
    name: "Saira & Dev",
    place: "Coonoor",
  },
  {
    quote:
      "Quiet, fast, and unbelievably precise. Half our guests still don't know how the pictures were taken.",
    name: "Tara & Kabir",
    place: "Lake Como",
  },
];

export const services = [
  {
    id: "wedding-coverage",
    numeral: "01",
    name: "Full Wedding Coverage",
    line: "Every function, documented end to end by a small, quiet team.",
    body:
      "A lead photographer and a second shooter for each function, working the way documentary crews do — close, unobtrusive, and always ahead of the moment. You receive a curated edit of the whole celebration, colour-graded in a single consistent hand, plus a hand-sequenced album designed rather than assembled.",
    image: images.services.wedding,
  },
  {
    id: "wedding-films",
    numeral: "02",
    name: "Wedding Films",
    line: "Story-led films cut for feeling, not for the highlight reel.",
    body:
      "We record live sound, keep the voiceover honest, and cut to the rhythm the day actually had. Deliverables run from a four-minute short to a long-form documentary edit, mastered for both the living room screen and the phone it will really be watched on.",
    image: images.services.films,
  },
  {
    id: "destination",
    numeral: "03",
    name: "Destination Weddings",
    line: "Recced in advance, shot with local light in mind.",
    body:
      "We travel ahead of the celebration to walk the venue at the exact hour you'll be married in it. Permissions, drone clearances and light plans are handled before the first guest lands, which is why destination weekends with us feel unusually calm.",
    image: images.services.destination,
  },
  {
    id: "same-day-edit",
    numeral: "04",
    name: "Same-Day Edit",
    line: "A short film cut and screened before the night ends.",
    body:
      "A dedicated editor works on site from the first function. By the time the reception dinner clears, there is a three-minute film ready to play — the single most reliable way we know to make a room go completely silent.",
    image: images.services.sameday,
  },
];

export const premium = {
  name: "The Ivory Series",
  eyebrow: "By invitation",
  body: [
    "A small number of weddings each year are photographed personally by our founder, on a fine-art brief agreed months in advance.",
    "It is slower work: fewer frames, hand-printed proofs, a bound archive volume rather than a gallery link. We take four of these a year, and we plan them together from the first conversation.",
  ],
  image: images.premium.cover,
};
