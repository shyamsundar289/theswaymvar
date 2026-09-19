/**
 * photography-image-utils.ts
 *
 * Maps original photography image paths to their optimized WebP variants.
 * Generates srcset and sizes attributes for responsive image delivery.
 *
 * The optimized images live at:
 *   /photography-optimized/<couple-dir>/<subdir>/<filename>-<width>w.webp
 *
 * Original images remain at their current paths and are used as the
 * fallback `src` — but in practice the browser will prefer the srcset
 * WebP variants.
 */

const WIDTHS = [400, 800, 1200, 1600] as const;

/**
 * Given an original image path like "/Varsha & Shivam/01/DSCF2797 copy.jpg",
 * returns the optimized WebP variant paths.
 */
function getOptimizedPath(originalSrc: string, width: number): string {
  // Remove leading slash for path manipulation
  const cleaned = originalSrc.startsWith("/") ? originalSrc.slice(1) : originalSrc;
  const lastDot = cleaned.lastIndexOf(".");
  if (lastDot === -1) return originalSrc;

  const withoutExt = cleaned.slice(0, lastDot);
  // Build the path by encoding each segment individually with encodeURIComponent.
  // This ensures special characters like spaces AND '&' in folder names
  // (e.g. "Bhawna & Abhishek") are properly percent-encoded (%20, %26).
  // Using encodeURI was NOT sufficient — it skips '&', which deployment servers
  // interpret as a query-string separator, causing 404s for these images.
  const rawPath = `/photography-optimized/${withoutExt}-${width}w.webp`;
  const encodedPath = rawPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return encodedPath;
}

export function getPhotoSrcSet(originalSrc: string): string | undefined {
  // Bypassing srcset temporarily as complex URLs with spaces and ampersands
  // in srcset can break parsing in some environments.
  // The default src (1200w WebP) will be used as a reliable fallback.
  return undefined;
}

/**
 * Returns the best default src (1200w WebP for desktop, reasonable fallback).
 */
export function getPhotoSrc(originalSrc: string): string {
  return getOptimizedPath(originalSrc, 1200);
}

/**
 * Returns responsive sizes attribute based on the image's role.
 *
 * - "hero-tile": small tiles in the hero grid (~20vw each)
 * - "grid-card": story cover cards (2-col on mobile, 4-col on desktop)
 * - "gallery": full-width masonry gallery images
 */
export function getPhotoSizes(role: "hero-tile" | "grid-card" | "gallery"): string {
  switch (role) {
    case "hero-tile":
      // Hero tiles are ~20% of 160vw (mobile) or 110vw (desktop), so effectively ~32vw mobile, ~22vw desktop
      return "(max-width: 768px) 35vw, 22vw";
    case "grid-card":
      // 2 columns on mobile (50vw each), 4 columns on desktop (~25vw each)
      return "(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw";
    case "gallery":
      // Masonry: 1 col mobile (100vw), 2 col sm (50vw), 3 col lg (33vw), 4 col xl (25vw)
      return "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 23vw";
    default:
      return "100vw";
  }
}

/**
 * Checks if a given image path is a photography project image
 * (i.e., from one of the couple directories).
 */
export function isPhotographyImage(src: string): boolean {
  const photographyDirs = [
    "Varsha & Shivam",
    "Pooja & Suryaprakash",
    "Khushboo & Jay",
    "Bhawna & Abhishek",
  ];
  return photographyDirs.some((dir) => src.includes(dir));
}
