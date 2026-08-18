export const FILM_CATEGORIES = [
  "All",
  "Short film",
  "Documentary",
  "Same-day edit",
] as const;

export type FilmCategory = (typeof FILM_CATEGORIES)[number];

export interface FilmChapter {
  id: string;
  title: string;
  timestamp: string; // e.g. "01:23"
  description?: string;
  poster?: string;
  video?: string;
}

export interface Film {
  id: string;
  slug: string;
  title: string;
  couple?: string;
  location?: string;
  date?: string;
  category: FilmCategory;
  duration?: string; // e.g. "04:32"
  description?: string;
  
  // Media
  poster: string;
  video: string; // Empty string if coming soon
  
  // Flags
  featured?: boolean;
  destination?: boolean;
  
  // Advanced playback
  chapters?: FilmChapter[];
}
