import { memo } from "react";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import {
  getPhotoSrcSet,
  getPhotoSrc,
  getPhotoSizes,
  isPhotographyImage,
} from "@/lib/photography-image-utils";

export type PhotoOrientation = "landscape" | "portrait" | "square";

export interface CoupleMedia {
  id: string;
  src: string;
  alt?: string;
  type?: "image" | "video";
  poster?: string;
  orientation: PhotoOrientation;
}

const SPAN_CLASSES: Record<PhotoOrientation, string> = {
  portrait: "row-span-2",
  landscape: "row-span-1",
  square: "row-span-1",
};

// Aspect ratios to prevent CLS (Cumulative Layout Shift)
const ASPECT_RATIOS: Record<PhotoOrientation, string> = {
  portrait: "3 / 4",
  landscape: "4 / 3",
  square: "1 / 1",
};

interface EditorialMediaGridProps {
  media: readonly CoupleMedia[];
}

export const CouplePhotoGrid = memo(function CouplePhotoGrid({ media }: EditorialMediaGridProps) {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 lg:gap-8">
      {media.map((item, i) => {
        const hasOptimized = isPhotographyImage(item.src);
        return (
          <motion.div
            key={item.id || item.src + i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: Math.min(i * 0.04, 0.4),
            }}
            className="relative mb-4 md:mb-6 lg:mb-8 break-inside-avoid overflow-hidden"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-[4px]"
              />
            ) : (
              <OptimizedImage
                src={hasOptimized ? getPhotoSrc(item.src) : item.src}
                srcSet={hasOptimized ? getPhotoSrcSet(item.src) : undefined}
                sizes={hasOptimized ? getPhotoSizes("gallery") : undefined}
                alt={item.alt || "Editorial wedding photograph"}
                loading="lazy"
                className="w-full h-auto rounded-[4px] transition-transform duration-700 hover:scale-105"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
});
