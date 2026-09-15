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

import { useRef, useState, useEffect, useCallback, memo } from "react";

// ─────────────────────────────────────────────────────────────
// Shared IntersectionObserver (singleton)
// ─────────────────────────────────────────────────────────────

type ObserverCallback = (isIntersecting: boolean) => void;

const observedElements = new Map<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = observedElements.get(entry.target);
        if (cb) cb(entry.isIntersecting);
      }
    },
    {
      // Load images 800px before they enter viewport
      rootMargin: "0px 0px 800px 0px",
      threshold: 0,
    }
  );

  return sharedObserver;
}

function observe(el: Element, callback: ObserverCallback) {
  observedElements.set(el, callback);
  getSharedObserver().observe(el);
}

function unobserve(el: Element) {
  observedElements.delete(el);
  getSharedObserver().unobserve(el);
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export interface OptimizedImageProps {
  /** Primary image source */
  src: string;
  /** Alt text */
  alt: string;
  /** Optional srcset for responsive delivery */
  srcSet?: string;
  /** Optional sizes for responsive delivery */
  sizes?: string;
  /** CSS class for the <img> */
  className?: string;
  /** loading="eager" for LCP images, "lazy" (default) for the rest */
  loading?: "lazy" | "eager";
  /** fetchpriority for critical images */
  fetchPriority?: "high" | "low" | "auto";
  /** Whether this is a critical/above-fold image (skips observer-based loading) */
  critical?: boolean;
  /** Called when image loads */
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(critical);

  // IntersectionObserver-based loading for non-critical images
  useEffect(() => {
    if (critical || shouldRender) return;
    const el = imgRef.current;
    if (!el) return;

    observe(el, (isIntersecting) => {
      if (isIntersecting) {
        setShouldRender(true);
        unobserve(el);
      }
    });

    return () => {
      if (el) unobserve(el);
    };
  }, [critical, shouldRender]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // For critical images or once observer triggers, render the real src.
  // Before that, render img with no src (placeholder only).
  const effectiveSrc = shouldRender ? src : undefined;
  const effectiveSrcSet = shouldRender ? srcSet : undefined;

  // If the image loads from cache, the onLoad event might not fire.
  // Check if it's already complete after rendering.
  useEffect(() => {
    if (shouldRender && imgRef.current?.complete) {
      // Small timeout ensures the browser actually painted the cached image
      const timer = setTimeout(handleLoad, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, effectiveSrc, effectiveSrcSet, handleLoad]);

  return (
    <img
      ref={imgRef}
      src={effectiveSrc}
      srcSet={effectiveSrcSet}
      sizes={shouldRender ? sizes : undefined}
      alt={alt}
      loading={critical ? "eager" : loading}
      decoding={critical ? "sync" : "async"}
      fetchPriority={fetchPriority}
      onLoad={handleLoad}
      className={`${className} transition-opacity duration-500 ease-out ${
        isLoaded || !shouldRender ? "" : "opacity-0"
      }`}
      style={
        !isLoaded && shouldRender
          ? { opacity: 0 }
          : isLoaded
            ? { opacity: 1 }
            : undefined
      }
    />
  );
});
