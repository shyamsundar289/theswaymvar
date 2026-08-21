import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { LibraryFilm } from "@/data/film-library";
import { Play } from "lucide-react";

interface FilmGridCardProps {
  film: LibraryFilm;
  onClick: (film: LibraryFilm) => void;
}

export function FilmGridCard({ film, onClick }: FilmGridCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true);
            // Once it's near, we can keep it prepared or stop observing to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "300px 0px", // Prepare when it is 300px away from viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col w-full cursor-pointer"
      onClick={() => onClick(film)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(film);
        }
      }}
      aria-label={`Play film: ${film.couple}`}
    >
      {/* Video / Poster Container */}
      <div className="relative w-full aspect-video overflow-hidden rounded-[12px] bg-[#ece9e4] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        {/* Poster Image */}
        <img
          src={film.posterImg}
          alt={film.couple}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Lazy Preloaded Video for Metadata - Visually Hidden but in DOM to warm up the cache */}
        {isNearViewport && film.videoUrl && (
          <video
            src={film.videoUrl}
            preload="metadata"
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
            muted
            playsInline
          />
        )}

        {/* Play Icon (Always visible, simple, cinematic) */}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/30 flex items-center justify-center pointer-events-none">
          <Play className="w-10 h-10 text-white fill-white opacity-80 transform transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 drop-shadow-md" />
        </div>
      </div>

      {/* Text Content Below */}
      <div className="mt-[16px] md:mt-5 text-center px-2 flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] tracking-[1.5px] md:tracking-[2.5px] uppercase text-[#8b867c] font-sans">
          <span className="font-light">→</span>
          <span>{film.category}</span>
          <span className="font-light">←</span>
        </div>
        <h3 className="font-display text-[15px] md:text-[26px] font-normal text-[#2d2c2a] mt-[8px] md:mt-3 leading-tight min-h-[36px] md:min-h-[44px] flex items-center justify-center">
          {film.couple}
        </h3>
        {film.location && (
          <div className="flex items-center justify-center mt-[8px] md:mt-3 text-[#d1cbbd]">
             {/* Tiny Ornament */}
             <svg width="40" height="10" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 md:mr-3 w-[30px] h-[8px] md:w-[40px] md:h-[10px]">
                <path d="M30 2 L33 7.5 L30 13 L27 7.5 Z" fill="currentColor" opacity="0.8"/>
                <path d="M25 7.5 Q15 2 5 7.5 Q15 13 25 7.5" fill="currentColor" opacity="0.5"/>
                <path d="M35 7.5 Q45 2 55 7.5 Q45 13 35 7.5" fill="currentColor" opacity="0.5"/>
             </svg>
             <span className="text-[9px] md:text-[11px] tracking-[1px] md:tracking-[2px] font-sans uppercase text-[#8b867c]">{film.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
