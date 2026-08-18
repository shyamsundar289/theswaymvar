import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CinematicShowreelProps {
  video: string;
  poster: string;
}

export function CinematicShowreel({ video, poster }: CinematicShowreelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reducedMotion || !video) return;

    if (isInView) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isInView, reducedMotion, video]);

  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="shell text-center mb-12 md:mb-20">
        <p className="label-xs text-bronze">Showreel</p>
        <h2 className="font-display mt-5 text-4xl text-background md:text-6xl">
          Cinematic moments.
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="w-full aspect-[21/9] md:aspect-[2.35/1] overflow-hidden bg-black relative"
      >
        <img
          src={poster}
          alt="Cinematic Showreel"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
