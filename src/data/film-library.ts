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
  "/images/Recent01.webp",
  "/images/Recent02.webp",
  "/images/Recent03.webp",
  "/images/4.webp",
  "/images/5.webp",
  "/images/6.webp",
  "/images/DSCF0463 copy.webp",
];

const actualVideos = [
  "/videos/wedding.mp4",
  "/videos/celebration.mp4",
  "/videos/prewedding.mp4",
  "/videos/portraits.mp4",
  "/videos/rituals.mp4",
  "/videos/videoseen.mp4",
  "/videos/Herovideo.mp4",
  "/videos/The_Swayamvar (2).mp4",
  "/videos/ivory-series..mp4",
  "/film-section/video01.mp4",
  "/film-section/video03.mp4",
  "/film-section/video05.mp4",
  "/film-section/video06.mp4",
  "/film-section/video07.mp4",
  "/film-section/video08.mp4",
  "/film-section/video09.mp4",
];

const couples = [
  "Meher & Arjun", "Tara & Rohan", "Alia & Kabir", "Simran & Veer",
  "Ira & Vikram", "Bhawana & Abhishek", "Saira & Dev", "Ananya & Rohan",
  "Naina & Siddharth", "Riya & Karan", "Priya & Aditya", "Divya & Rahul"
];

const locations = [
  "Udaipur, Rajasthan", "Lake Como, Italy", "Goa, India", "Alibaug, Maharashtra",
  "Jaipur, Rajasthan", "Mumbai, Maharashtra", "Jodhpur, Rajasthan", "Kerala, India"
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
