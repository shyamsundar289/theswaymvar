import { assets } from "../assets/asset-manifest";
export type FilmCategory = "WEDDING" | "PRE-WEDDING";

export type LibraryFilm = {
  id: string;
  couple: string;
  category: FilmCategory;
  posterImg: string;
  videoUrl: string | null;
  location?: string;
  year?: string;
};

const posters = [
  assets.recentWork.recent01,
  assets.recentWork.recent02,
  assets.recentWork.recent03,
  assets.misc.image4,
  assets.misc.image5,
  assets.misc.image6,
  assets.misc.dscf0463,
];

const actualVideos = [
  assets.videos.background.wedding,
  assets.videos.background.celebration,
  assets.videos.background.prewedding,
  assets.videos.background.portraits,
  assets.videos.background.rituals,
  assets.videos.background.videoseen,
  assets.videos.hero,
  assets.videos.showcase,
  assets.videos.background.ivorySeries,
  assets.videos.films.film01,
  assets.videos.films.film03,
  assets.videos.films.film05,
  assets.videos.films.film06,
  assets.videos.films.film07,
  assets.videos.films.film08,
  assets.videos.films.film09,
];

const couples = [
  "Meher & Arjun",
  "Tara & Rohan",
  "Alia & Kabir",
  "Simran & Veer",
  "Ira & Vikram",
  "Bhawana & Abhishek",
  "Saira & Dev",
  "Ananya & Rohan",
  "Naina & Siddharth",
  "Riya & Karan",
  "Priya & Aditya",
  "Divya & Rahul",
];

const locations = [
  "Udaipur, Rajasthan",
  "Lake Como, Italy",
  "Goa, India",
  "Alibaug, Maharashtra",
  "Jaipur, Rajasthan",
  "Mumbai, Maharashtra",
  "Jodhpur, Rajasthan",
  "Kerala, India",
];

export const filmLibraryData: LibraryFilm[] = Array.from({ length: 45 }).map((_, i) => {
  const isPreWedding = i % 3 === 0;
  return {
    id: `film-${i + 1}`,
    couple: couples[i % couples.length],
    category: isPreWedding ? "PRE-WEDDING" : "WEDDING",
    posterImg: posters[i % posters.length],
    videoUrl: i < actualVideos.length ? actualVideos[i] : null,
    location: locations[i % locations.length],
    year: "2024",
  };
});
