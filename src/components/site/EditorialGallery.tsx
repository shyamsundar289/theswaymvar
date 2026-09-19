/**
 * EditorialGallery
 *
 * Premium wedding editorial gallery layout:
 *  - LANDSCAPE → full-width centered row (natural aspect ratio preserved)
 *  - PORTRAIT pair → two equal columns side-by-side
 *  - Odd portrait → solo centered portrait, constrained to 60% width
 *
 * The entire gallery is centered with generous left/right whitespace.
 * No cards, no borders, no shadows — pure editorial.
 */

import { memo, useMemo } from "react";
import { motion } from "motion/react";
import {
  getPhotoSrc,
  getPhotoSrcSet,
  getPhotoSizes,
  isPhotographyImage,
} from "@/lib/photography-image-utils";
import type { CoupleMedia } from "@/components/site/CouplePhotoGrid";

// ─── Types ──────────────────────────────────────────────────────────────────

type GalleryRow =
  | { type: "horizontal"; item: CoupleMedia }
  | { type: "vertical-pair"; left: CoupleMedia; right: CoupleMedia };

// ─── Row builder (Strict Pattern: 2 Horizontal, 2 Vertical side-by-side) ──────

function buildRows(media: readonly CoupleMedia[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let i = 0;

  while (i < media.length) {
    // 1st Horizontal (Full width)
    if (i < media.length) rows.push({ type: "horizontal", item: media[i++] });
    
    // 2nd Horizontal (Full width)
    if (i < media.length) rows.push({ type: "horizontal", item: media[i++] });
    
    // 2 Vertical (Side-by-side)
    if (i < media.length - 1) {
      rows.push({ type: "vertical-pair", left: media[i++], right: media[i++] });
    } else if (i < media.length) {
      // Fallback if only 1 image left
      rows.push({ type: "horizontal", item: media[i++] });
    }
  }

  return rows;
}

// ─── Fade-in variant ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

// ─── Single image renderer ────────────────────────────────────────────────────

function GalleryImage({
  item,
  className = "",
  sizes,
}: {
  item: CoupleMedia;
  className?: string;
  sizes?: string;
}) {
  const hasOptimized = isPhotographyImage(item.src);
  const src = hasOptimized ? getPhotoSrc(item.src) : item.src;
  const srcSet = hasOptimized ? getPhotoSrcSet(item.src) : undefined;
  const imgSizes = sizes ?? (hasOptimized ? getPhotoSizes("gallery") : undefined);

  return (
    <img
      src={src}
      srcSet={srcSet ?? undefined}
      sizes={imgSizes}
      alt={item.alt || "Wedding photograph"}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.dataset.failed) {
          img.dataset.failed = "true";
          img.src = item.src;
          img.srcset = "";
        }
      }}
      className={`w-full block object-cover object-center ${className}`}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface EditorialGalleryProps {
  media: readonly CoupleMedia[];
}

export const EditorialGallery = memo(function EditorialGallery({
  media,
}: EditorialGalleryProps) {
  const rows = useMemo(() => buildRows(media), [media]);

  return (
    <div
      className="
        w-full
        mx-auto
        px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32
        max-w-[1200px]
        flex flex-col gap-0 py-0 bg-background overflow-hidden
      "
    >
      {rows.map((row, rowIdx) => {
        // Reduced delay since they are closely packed
        const delay = Math.min(rowIdx * 0.05, 0.3);

        if (row.type === "horizontal") {
          return (
            <motion.div
              key={row.item.id}
              custom={delay}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={fadeUp}
              className="w-full m-0 p-0"
            >
              <GalleryImage
                item={row.item}
                className="aspect-[3/2]"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>
          );
        }

        if (row.type === "vertical-pair") {
          return (
            <motion.div
              key={`${row.left.id}-${row.right.id}`}
              custom={delay}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={fadeUp}
              className="w-full grid grid-cols-2 gap-0 m-0 p-0"
            >
              <GalleryImage
                item={row.left}
                className="aspect-[3/4]"
                sizes="50vw"
              />
              <GalleryImage
                item={row.right}
                className="aspect-[3/4]"
                sizes="50vw"
              />
            </motion.div>
          );
        }

        return null;
      })}
    </div>
  );
});
