import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
}

export function LazyVideo({ src, poster, className = "" }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(containerRef, { rootMargin: "200px" });
  const reducedMotion = useReducedMotion();

  // Load video only when in view
  useEffect(() => {
    if (isInView && videoRef.current && !videoRef.current.src && src) {
      videoRef.current.src = src;
      videoRef.current.load();
    }
  }, [isInView, src]);

  // Handle hover play
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || reducedMotion) return;

    if (isHovered) {
      video.play().catch(() => {
        // Silently catch autoplay restrictions
      });
    } else {
      video.pause();
    }
  }, [isHovered, src, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-charcoal ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={poster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isHovered && src && !reducedMotion ? "opacity-0" : "opacity-100"
        }`}
      />
      {src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isHovered && !reducedMotion ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
