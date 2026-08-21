import { galleryImages } from "./photography-images";
import type { CoupleMedia } from "@/components/site/CouplePhotoGrid";

export const WHATSAPP_NUMBER = "919999999999"; // swap for the studio's real number

export const waLink = (message = "Hello theswaymvar — we'd love to know about your availability.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Film", to: "/film" },
  { label: "Photography", to: "/photography" },
  { label: "Little Snap", to: "/little-snap" },
  { label: "Your Memories", to: "/services" },
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

import m1 from "@/assets/m1.jpg";

export const featuredFilms = [
  { id: '1', couple: 'Meher & Arjun', location: 'Jaipur, India', category: 'Wedding Film', videoUrl: '/videos/wedding.mp4', posterImg: "/images/Recent01.webp" },
  { id: '2', couple: 'Tara & Rohan', location: 'Udaipur, Rajasthan', category: 'Cinematic Highlights', videoUrl: '/videos/celebration.mp4', posterImg: "/images/Recent02.webp" },
  { id: '3', couple: 'Alia & Kabir', location: 'Lake Como, Italy', category: 'Destination Film', videoUrl: '/videos/prewedding.mp4', posterImg: "/images/Recent03.webp" },
  { id: '4', couple: 'Simran & Veer', location: 'Goa, India', category: 'The Celebration', videoUrl: '/videos/portraits.mp4', posterImg: m1 }
];
