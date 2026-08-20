import { images } from "./images";
import { galleryImages } from "./photography-images";
import type { CoupleMedia } from "@/components/site/CouplePhotoGrid";

export const WHATSAPP_NUMBER = "919999999999"; // swap for the studio's real number

export const waLink = (message = "Hello theswaymvar — we'd love to know about your availability.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Film", to: "/film" },
  { label: "Photography", to: "/photography" },
  { label: "Your Memories", to: "/services" },
  { label: "Little Snap", to: "/little-snap" },
  { label: "Crew", to: "/crew" },
  { label: "About", to: "/about" },
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
  gallery: readonly CoupleMedia[];
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
    cover: "/images/Recent01.webp",
    gallery: [
      { ...galleryImages[0], type: "image" },
      { ...galleryImages[1], type: "image" },
      {
        id: "video-1",
        src: "/videos/wedding.mp4",
        type: "video",
        orientation: "landscape",
        poster: "/images/Recent01.webp"
      },
      { ...galleryImages[3], type: "image" },
      { ...galleryImages[4], type: "image" },
    ] as CoupleMedia[],
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
    cover: "/special-image-05.png",
    gallery: galleryImages.slice(6, 12),
  },
  {
    slug: "bhawana-and-abhishek",
    couple: "Bhawana & Abhishek",
    location: "Jaipur, Rajasthan",
    date: "December 2024",
    intro: "Old city colour, a brass band that refused to stop, and one very composed bride.",
    narrative: [
      "Bhawana's baraat took forty minutes to cover two hundred metres. She watched the whole thing from a first-floor jharokha with her sisters, eating something she was not supposed to be eating.",
      "We photographed the day in colour because the day insisted on it — every wall, every safa, every plate of it.",
    ],
    cover: "/images/Recent03.webp",
    gallery: galleryImages.slice(12, 18),
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

export const featuredFilms = [
  { id: '1', couple: 'Meher & Arjun', location: 'Jaipur, India', category: 'Wedding Film', videoUrl: '/videos/wedding.mp4', posterImg: images.work["meher-and-arjun"].cover },
  { id: '2', couple: 'Tara & Rohan', location: 'Udaipur, Rajasthan', category: 'Cinematic Highlights', videoUrl: '/videos/celebration.mp4', posterImg: images.work["ira-and-vikram"].cover },
  { id: '3', couple: 'Alia & Kabir', location: 'Lake Como, Italy', category: 'Destination Film', videoUrl: '/videos/prewedding.mp4', posterImg: images.work["naina-and-rohan"].cover },
  { id: '4', couple: 'Simran & Veer', location: 'Goa, India', category: 'The Celebration', videoUrl: '/videos/portraits.mp4', posterImg: images.moments[0] }
];
