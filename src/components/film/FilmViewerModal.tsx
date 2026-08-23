import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { Film } from "@/types/film";
import { Link } from "@tanstack/react-router";

interface FilmViewerModalProps {
  films: Film[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export function FilmViewerModal({
  films,
  activeIndex,
  onClose,
  onChangeIndex,
}: FilmViewerModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((activeIndex + 1) % films.length);
      if (e.key === "ArrowLeft") onChangeIndex((activeIndex - 1 + films.length) % films.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, films.length, onClose, onChangeIndex]);

  if (!activeFilm) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col bg-charcoal text-background"
    >
      {/* Header Controls */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-10 pointer-events-none">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-background">
            {activeFilm.couple}
          </h2>
          <p className="mt-2 label-xs text-background/60">
            {activeFilm.category} &middot; {activeFilm.location}
          </p>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            to="/films/$slug"
            params={{ slug: activeFilm.slug }}
            className="label-xs text-background/80 hover:text-background transition-colors hidden md:block"
            onClick={onClose}
          >
            View Full Story
          </Link>
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-4 text-white transition-colors hover:bg-white/10"
            aria-label="Close viewer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-24 md:px-20 pointer-events-none">
        <motion.div
          key={activeFilm.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full max-w-[1400px] overflow-hidden bg-black shadow-2xl rounded-sm pointer-events-auto"
        >
          <video
            ref={videoRef}
            src={activeFilm.video}
            poster={activeFilm.poster}
            autoPlay
            controls
            muted={isMuted}
            playsInline
            className="h-full w-full bg-black object-contain"
          />
        </motion.div>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:p-10 pointer-events-auto">
        <button
          onClick={() => onChangeIndex((activeIndex - 1 + films.length) % films.length)}
          className="group flex items-center gap-4 label-xs text-background/70 transition-colors hover:text-background"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="hidden md:block">Previous Story</span>
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full bg-white/5 p-3 text-white transition-colors hover:bg-white/10"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        <button
          onClick={() => onChangeIndex((activeIndex + 1) % films.length)}
          className="group flex items-center gap-4 label-xs text-background/70 transition-colors hover:text-background"
        >
          <span className="hidden md:block">Next Story</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
