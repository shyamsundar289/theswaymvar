// src/components/site/PhotographyGallery.tsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  galleryImages,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type PhotoCategory,
} from "@/data/photography-images";

type FilterValue = "all" | PhotoCategory;

import { CouplePhotoGrid } from "./CouplePhotoGrid";

export function PhotographyGallery() {
  const [active, setActive] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (active === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === active);
  }, [active]);

  return (
    <section className="border-t border-border/60">
      {/* =====================================================
          FILTER BAR — inline, pipe-separated, single row
      ===================================================== */}
      <div className="bg-transparent border-b border-border/20">
        <div className="shell flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 md:py-6 text-sm md:text-base">
          {CATEGORY_ORDER.map((cat, i) => (
            <span key={cat} className="flex items-center gap-x-3 md:gap-x-4">
              {i > 0 && (
                <span className="text-muted-foreground/40 font-light" aria-hidden="true">
                  |
                </span>
              )}
              <button
                type="button"
                onClick={() => setActive(cat)}
                aria-current={active === cat}
                className={`font-display pb-0.5 transition-colors duration-200 tracking-wide ${
                  active === cat
                    ? "border-b border-foreground/60 text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================
          GALLERY — fixed 4-column grid, tall images span rows
      ===================================================== */}
      <div className="shell py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CouplePhotoGrid media={filtered} />
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No photographs in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
