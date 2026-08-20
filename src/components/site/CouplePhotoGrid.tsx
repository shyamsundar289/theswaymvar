import { motion } from "framer-motion";

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

interface EditorialMediaGridProps {
  media: readonly CoupleMedia[];
}

export function CouplePhotoGrid({ media }: EditorialMediaGridProps) {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[220px] md:auto-rows-[260px] gap-x-4 gap-y-6 md:gap-x-5 md:gap-y-8 lg:gap-x-6">
      {media.map((item, i) => (
        <motion.div
          key={item.id || item.src + i}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
            delay: Math.min(i * 0.04, 0.4),
          }}
          className={`overflow-hidden relative ${SPAN_CLASSES[item.orientation]}`}
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
              className="h-full w-full object-cover rounded-[2px]"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt || "Editorial wedding photograph"}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover rounded-[2px] transition-transform duration-700 hover:scale-105"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
