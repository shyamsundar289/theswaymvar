import { assets } from "../assets/asset-manifest";
// src/data/photography-images.ts
//
// Single source of truth for the Photography gallery.
// Every image lives in /public/images/crew/pic1.jpg … pic18.jpg
// and is tagged with the category it belongs to.
//
// >>> EDIT THE `category` FIELD BELOW to match your real photos. <<<
// I don't have the actual images, so these assignments are placeholders
// spread evenly across the six categories — swap them for the correct
// tags before shipping. Nothing else in the gallery needs to change
// when you edit this file.
//
// `orientation` drives the masonry sizing (see PhotographyGallery.tsx):
//   "landscape" -> wide tile (spans 2 grid columns on desktop)
//   "portrait"  -> tall tile (naturally tall via CSS columns)
//   "square"    -> standard tile

export type PhotoCategory = "pre-wedding" | "wedding" | "portrait" | "child" | "detail";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  orientation: "landscape" | "portrait" | "square";
  /** Optional: mark true to render larger within its category grid */
  featured?: boolean;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "pic1",
    src: assets.crew.getMemberPhoto(1),
    alt: "Pre-wedding couple portrait",
    category: "pre-wedding",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "pic2",
    src: assets.crew.getMemberPhoto(2),
    alt: "Pre-wedding location shot",
    category: "pre-wedding",
    orientation: "landscape",
  },
  {
    id: "pic3",
    src: assets.crew.getMemberPhoto(3),
    alt: "Pre-wedding walking shot",
    category: "pre-wedding",
    orientation: "portrait",
  },
  {
    id: "pic4",
    src: assets.crew.getMemberPhoto(4),
    alt: "Pre-wedding cinematic wide",
    category: "pre-wedding",
    orientation: "landscape",
  },

  {
    id: "pic5",
    src: assets.crew.getMemberPhoto(5),
    alt: "Wedding ceremony",
    category: "wedding",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "pic6",
    src: assets.crew.getMemberPhoto(6),
    alt: "Wedding couple moment",
    category: "wedding",
    orientation: "portrait",
  },
  {
    id: "pic7",
    src: assets.crew.getMemberPhoto(7),
    alt: "Wedding family gathering",
    category: "wedding",
    orientation: "square",
  },
  {
    id: "pic8",
    src: assets.crew.getMemberPhoto(8),
    alt: "Wedding dance floor",
    category: "wedding",
    orientation: "landscape",
  },

  {
    id: "pic9",
    src: assets.crew.getMemberPhoto(9),
    alt: "Bride portrait",
    category: "portrait",
    orientation: "portrait",
    featured: true,
  },
  {
    id: "pic10",
    src: assets.crew.getMemberPhoto(10),
    alt: "Groom portrait",
    category: "portrait",
    orientation: "portrait",
  },
  {
    id: "pic11",
    src: assets.crew.getMemberPhoto(11),
    alt: "Couple editorial portrait",
    category: "portrait",
    orientation: "portrait",
  },
  {
    id: "pic12",
    src: assets.crew.getMemberPhoto(12),
    alt: "Editorial close-up portrait",
    category: "portrait",
    orientation: "square",
  },

  {
    id: "pic13",
    src: assets.crew.getMemberPhoto(13),
    alt: "Wedding ring detail",
    category: "detail",
    orientation: "square",
    featured: true,
  },
  {
    id: "pic14",
    src: assets.crew.getMemberPhoto(14),
    alt: "Bridal jewellery detail",
    category: "detail",
    orientation: "portrait",
  },
  {
    id: "pic15",
    src: assets.crew.getMemberPhoto(15),
    alt: "Floral and décor detail",
    category: "detail",
    orientation: "landscape",
  },

  {
    id: "pic16",
    src: assets.crew.getMemberPhoto(16),
    alt: "Child candid moment",
    category: "child",
    orientation: "square",
    featured: true,
  },
  {
    id: "pic17",
    src: assets.crew.getMemberPhoto(17),
    alt: "Kids playing",
    category: "child",
    orientation: "portrait",
  },
  {
    id: "pic18",
    src: assets.crew.getMemberPhoto(18),
    alt: "Family with children",
    category: "child",
    orientation: "landscape",
  },
];

export const CATEGORY_LABELS: Record<"all" | PhotoCategory, string> = {
  all: "All",
  "pre-wedding": "Pre-Wedding",
  wedding: "Wedding",
  portrait: "Portrait",
  child: "Child",
  detail: "Detail",
};

export const CATEGORY_ORDER: Array<"all" | PhotoCategory> = [
  "all",
  "pre-wedding",
  "wedding",
  "portrait",
  "child",
  "detail",
];
