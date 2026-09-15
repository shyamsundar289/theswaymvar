import { assets } from "../assets/asset-manifest";
import { galleryImages } from "./photography-images";
import type { CoupleMedia } from "@/components/site/CouplePhotoGrid";

export const WHATSAPP_NUMBER = "918949422388";

export const waLink = (
  message = "Hello theswaymvar — we'd love to know about your availability.",
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
  coverScale?: number;
  gallery: readonly CoupleMedia[];
};

import {
  varshaShivamImages,
  poojaSuryaprakashImages,
  khushbooJayImages,
  bhawnaAbhishekImages,
} from "./photography-projects";

export const stories: Story[] = [
  {
    slug: "varsha-and-shivam",
    couple: "Varsha & Shivam",
    location: "Destination",
    date: "2024",
    intro: "A celebration filled with quiet elegance and timeless moments.",
    narrative: [
      "Every frame tells a story of love, capturing the subtle emotions and unspoken words between the couple and their loved ones.",
      "The photography reflects the beauty of their bond, frozen in elegant compositions that they will cherish forever.",
    ],
    cover: "/Varsha & Shivam/01/DSCF3453 copy.jpg",
    gallery: varshaShivamImages,
  },
  {
    slug: "pooja-and-suryaprakash",
    couple: "Pooja & Suryaprakash",
    location: "Destination",
    date: "2024",
    intro: "A vibrant gathering where tradition meets contemporary grace.",
    narrative: [
      "Surrounded by their closest friends and family, their wedding was a testament to joy, laughter, and deep connection.",
      "We documented their day as it naturally unfolded, preserving the genuine smiles and the vibrant atmosphere of the celebration.",
    ],
    cover: "/Pooja & Suryaprakash/02/DSC00075.jpg",
    gallery: poojaSuryaprakashImages,
  },
  {
    slug: "khushboo-and-jay",
    couple: "Khushboo & Jay",
    location: "Destination",
    date: "2024",
    intro: "An intimate and heartwarming union marked by beautiful details.",
    narrative: [
      "The delicate lighting and thoughtful details provided the perfect backdrop for their beautiful day.",
      "From the quiet morning preparations to the lively evening festivities, we captured the essence of their unique story.",
    ],
    cover: "/Khushboo & Jay/03/cover.image.png",
    coverScale: 1.2,
    gallery: khushbooJayImages,
  },
  {
    slug: "bhawna-and-abhishek",
    couple: "Bhawna & Abhishek",
    location: "Destination",
    date: "2024",
    intro: "A grand celebration showcasing love, color, and joyous moments.",
    narrative: [
      "Their wedding was an exquisite visual feast, filled with rich colors, grand gestures, and profound emotional moments.",
      "We crafted a visual narrative that immortalizes the scale and the intimate poetry of their special day.",
    ],
    cover: "/Bhawna & Abhishek/04/AK209382 copy.jpg",
    gallery: bhawnaAbhishekImages,
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

import m1 from "@/assets/misc_general_01.webp";

export const featuredFilms = [
  {
    id: "1",
    couple: "Chanchal & Harshit",
    location: "",
    category: "Wedding Film",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/11.mp4",
    posterImg: "/video-cover/videocover1.webp",
  },
  {
    id: "2",
    couple: "Rajshree & Nitin",
    location: "",
    category: "Cinematic Highlights",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/12.mp4",
    posterImg: "/video-cover/videocover2.webp",
  },
  {
    id: "3",
    couple: "Bhawana & Abhishek",
    location: "",
    category: "Destination Film",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/13.mp4",
    posterImg: "/video-cover/videocover3.webp",
  },
  {
    id: "4",
    couple: "Hemlata & Giriraj",
    location: "",
    category: "The Celebration",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/14.mp4",
    posterImg: "/video-cover/videocover4.webp",
  },
  {
    id: "5",
    couple: "Khushboo & Jay",
    location: "",
    category: "Wedding Film",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/15.mp4",
    posterImg: "/video-cover/videocover5.webp",
  },
  {
    id: "6",
    couple: "Khushboo & Jay",
    location: "",
    category: "Wedding Film",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/16.mp4",
    posterImg: "/video-cover/videocover6.webp",
  },
  {
    id: "7",
    couple: "Tamana & Sandeep",
    location: "",
    category: "Wedding Film",
    videoUrl: "https://github.com/shyamsundar289/theswaymvar/releases/download/media-v1/17.mp4",
    posterImg: "/video-cover/videocover7.webp",
  },
];
