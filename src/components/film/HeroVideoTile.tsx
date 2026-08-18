import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HeroVideoTileProps {
  video?: string;
  poster?: string;
}

export function HeroVideoTile({ video, poster }: HeroVideoTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(containerRef, { rootMargin: "300px" });
  const reducedMotion = useReducedMotion();

  // Attach source once the tile is (near) in view
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isInView || !video || vid.src) return;
    vid.src = video;
    vid.load();
  }, [isInView, video]);

  // Ambient autoplay — this is a decorative hero grid, not a hover card
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reducedMotion || !isInView) return;
    vid.play().catch(() => {
      // Autoplay can be blocked before user interaction — poster stays visible, no error shown
    });
  }, [isInView, reducedMotion, isLoaded]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {poster && (
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded && !reducedMotion ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {video && !reducedMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          onCanPlay={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
