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
    posterImg: "/media/images/film-covers/1.png",
    videoUrl: "/media/videos/films/1.mp4",
  },
  {
    id: "film-2",
    couple: "Khushboo & Chhatrapal",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/2.png",
    videoUrl: "/media/videos/films/2.mp4",
  },
  {
    id: "film-3",
    couple: "Bhawana & Abhishek",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/3.png",
    videoUrl: "/media/videos/films/3.mp4",
  },
  {
    id: "film-4",
    couple: "Rajishree & Nitin",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/4.png",
    videoUrl: "/media/videos/films/4.mp4",
  },
  {
    id: "film-5",
    couple: "Khushbu & Jay",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/5.png",
    videoUrl: "/media/videos/films/5.mp4",
  },
  {
    id: "film-6",
    couple: "Koushalya & Vikash",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/6.png",
    videoUrl: "/media/videos/films/6.mp4",
  },
  {
    id: "film-7",
    couple: "Tamana & Sandeep",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/7.png",
    videoUrl: "/media/videos/films/7.mp4",
  },
  {
    id: "film-8",
    couple: "Khushboo & Chhatrapal",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/8.png",
    videoUrl: "/media/videos/films/8.mp4",
  },
  {
    id: "film-9",
    couple: "Hemlata & Giriraj",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/9.png",
    videoUrl: "/media/videos/films/9.mp4",
  },
  {
    id: "film-10",
    couple: "Khushbu & Jay",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/10.png",
    videoUrl: "/media/videos/films/10.mp4",
  },
  {
    id: "film-11",
    couple: "Koushalya & Vikash",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/11.png",
    videoUrl: "/media/videos/films/11.mp4",
  },
  {
    id: "film-12",
    couple: "Khushbu & Jay",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/12.png",
    videoUrl: "/media/videos/films/12.mp4",
  }
];
