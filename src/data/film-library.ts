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
    videoUrl: "/videos/1.mp4",
  },
  {
    id: "film-2",
    couple: "Khushboo & Chhatrapal",
    category: "PRE-WEDDING",
    posterImg: "/media/images/film-covers/2.png",
    videoUrl: "/videos/2.mp4",
  },
  {
    id: "film-3",
    couple: "Bhawana & Abhishek",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/3.png",
    videoUrl: "/videos/3.mp4",
  },
  {
    id: "film-4",
    couple: "Rajishree & Nitin",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/4.png",
    videoUrl: "/videos/4.mp4",
  },
  {
    id: "film-5",
    couple: "Khushbu & Jay",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/5.png",
    videoUrl: "/videos/5.mp4",
  },
  {
    id: "film-6",
    couple: "Koushalya & Vikash",
    category: "PRE-WEDDING",
    posterImg: "/media/images/film-covers/6.png",
    videoUrl: "/videos/6.mp4",
  },
  {
    id: "film-7",
    couple: "Tamana & Sandeep",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/7.png",
    videoUrl: "/videos/7.mp4",
  },
  {
    id: "film-8",
    couple: "Khushboo & Chhatrapal",
    category: "PRE-WEDDING",
    posterImg: "/media/images/film-covers/8.png",
    videoUrl: "/videos/8.mp4",
  },
  {
    id: "film-9",
    couple: "Hemlata & Giriraj",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/9.png",
    videoUrl: "/videos/9.mp4",
  },
  {
    id: "film-10",
    couple: "Khushbu & Jay",
    category: "WEDDING",
    posterImg: "/media/images/film-covers/10.png",
    videoUrl: "/videos/10.mp4",
  },
  {
    id: "film-11",
    couple: "Koushalya & Vikash",
    category: "PRE-WEDDING",
    posterImg: "/media/images/film-covers/11.png",
    videoUrl: "/videos/11.mp4",
  },
  {
    id: "film-12",
    couple: "Khushbu & Jay",
    category: "PRE-WEDDING",
    posterImg: "/media/images/film-covers/12.png",
    videoUrl: "/videos/12.mp4",
  }
];

