import { Film } from "@/types/film";
import { images } from "./images";

export const films: Film[] = [
  {
    id: "f1",
    slug: "a-day-worth-hearing",
    title: "A day worth hearing again.",
    couple: "Meher & Arjun",
    location: "Udaipur",
    category: "Short film",
    duration: "04:32",
    description: "Kept in real sound. The vows, the laughter, the pauses, the people you forgot were standing nearby.",
    poster: images.films.highlightA,
    video: "/videos/wedding.mp4",
    featured: true,
    destination: true,
  },
  {
    id: "f2",
    slug: "the-middle-moments",
    title: "The Middle Moments",
    couple: "Ira & Vikram",
    location: "Alibaug",
    category: "Documentary",
    duration: "24:10",
    description: "The longer memory. Speeches, songs, ceremonies and the quiet spaces between them.",
    poster: images.films.highlightB,
    video: "/videos/celebration.mp4",
    chapters: [
      {
        id: "c1",
        title: "The Morning",
        timestamp: "00:00",
        description: "Getting ready chaos.",
        poster: images.films.reelA,
        video: "/videos/rituals.mp4",
      },
      {
        id: "c2",
        title: "The Vows",
        timestamp: "12:05",
        description: "Live sound from the mandap.",
        poster: images.films.reelB,
        video: "/videos/prewedding.mp4",
      }
    ]
  },
  {
    id: "f3",
    slug: "destination-como",
    title: "Lake Como Escape",
    couple: "Naina & Rohan",
    location: "Lake Como, Italy",
    category: "Short film",
    duration: "05:15",
    description: "A breathtaking destination wedding captured entirely on film.",
    poster: images.film.hero,
    video: "/videos/portraits.mp4",
    destination: true,
  },
  {
    id: "f4",
    slug: "goa-sameday",
    title: "Sunset in Goa",
    couple: "Saira & Dev",
    location: "Goa",
    category: "Same-day edit",
    duration: "03:45",
    poster: images.story.two,
    video: "/videos/videoseen.mp4",
    destination: true,
  },
  {
    id: "f5",
    slug: "mumbai-prewedding",
    title: "City Lights",
    couple: "Ananya & Rohan",
    location: "Mumbai, Maharashtra",
    category: "Pre-Wedding Film",
    duration: "03:45",
    description: "A candid pre-wedding session capturing the energy of the city.",
    poster: images.films.reelA, // using available image
    video: "/videos/prewedding.mp4",
  }
];
