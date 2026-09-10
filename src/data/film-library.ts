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

export const filmLibraryData: LibraryFilm[] = [
  {
    id: "film-1",
    couple: "Chanchal & Harshit",
    category: "WEDDING",
    posterImg: "/video&cover/videocover1.png",
    videoUrl: "/video&cover/11.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-2",
    couple: "Nitin & Rajshree",
    category: "WEDDING",
    posterImg: "/video&cover/videocover2.png",
    videoUrl: "/video&cover/12.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-3",
    couple: "Bhawana & Abhishek",
    category: "WEDDING",
    posterImg: "/video&cover/videocover3.png",
    videoUrl: "/video&cover/13.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-4",
    couple: "Hemlata & Giriraj",
    category: "WEDDING",
    posterImg: "/video&cover/videocover4.png",
    videoUrl: "/video&cover/14.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-5",
    couple: "Khusboo",
    category: "WEDDING",
    posterImg: "/video&cover/videocover5.png",
    videoUrl: "/video&cover/15.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-6",
    couple: "Khusboo",
    category: "WEDDING",
    posterImg: "/video&cover/videocover6.png",
    videoUrl: "/video&cover/16.mp4",
    location: "",
    year: "2024",
  },
  {
    id: "film-7",
    couple: "",
    category: "WEDDING",
    posterImg: "/video&cover/videocover7.png",
    videoUrl: "/video&cover/17.mp4",
    location: "",
    year: "2024",
  },
];
