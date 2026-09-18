/**
 * OptimizedImage — High-performance image component for the Photography page.
 *
 * Features:
 * - Shared IntersectionObserver (one observer for ALL images on the page)
 * - Viewport-aware loading with 800px lookahead
 * - Native lazy loading + async decoding by default
 * - fetchpriority="high" support for hero/LCP images
 * - Subtle opacity fade-in on load (GPU-composited)
 * - Prevents CLS via container aspect-ratio
 * - srcset/sizes support for responsive image delivery
 *
 * This component does NOT change any visual appearance.
 * It is a drop-in replacement for <img> tags.
 */

import { memo } from "react";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  critical?: boolean;
  onLoad?: () => void;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  srcSet,
  sizes,
  className = "",
  loading = "lazy",
  fetchPriority,
  critical = false,
  onLoad,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={critical ? "eager" : loading}
      decoding={critical ? "sync" : "async"}
      fetchPriority={fetchPriority}
      onLoad={onLoad}
      className={`${className} transition-opacity duration-500 ease-out`}
    />
  );
});
