import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { LibraryFilm } from "@/data/film-library";

interface FilmLightboxProps {
  film: LibraryFilm;
  onClose: () => void;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function FilmLightbox({ film, onClose }: FilmLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Autoplay on mount
  useEffect(() => {
    if (videoRef.current && film.videoUrl) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
    return () => {
      // Cleanup: pause video when unmounting
      if (videoRef.current) {
        videoRef.current.pause();
        // clear src to release resources
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [film.videoUrl]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const togglePlay = (e?: ReactMouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch(console.error);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (isPlaying) {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose} // Clicking outside the video container closes it
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-[90vw] md:max-w-[80vw] aspect-video bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }} // Clicking inside toggles play
        >
          {film.videoUrl ? (
            <video
              ref={videoRef}
              src={film.videoUrl}
              poster={film.posterImg}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />
          ) : (
             <div className="flex flex-col items-center justify-center text-white/50 space-y-4">
                <img src={film.posterImg} alt={film.couple} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <p className="z-10 font-sans tracking-[0.2em] uppercase text-sm">Coming Soon</p>
                <h3 className="z-10 font-display text-3xl md:text-5xl text-white">{film.couple}</h3>
             </div>
          )}

          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className={`absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-all duration-300 z-10 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Close video player"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Bottom Control Bar */}
          {film.videoUrl && (
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-500 ${(showControls || !isPlaying) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Timeline */}
              <div className="w-full mb-4 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white transition-all"
                  aria-label="Seek timeline"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay} className="hover:text-[#d1cbbd] transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                  </button>
                  <button onClick={toggleMute} className="hover:text-[#d1cbbd] transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <span className="text-xs md:text-sm font-sans tracking-wider opacity-80 pt-0.5">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end mr-4">
                     <p className="font-display text-lg leading-tight">{film.couple}</p>
                     <p className="text-[10px] tracking-[0.2em] uppercase opacity-70">{film.category}</p>
                  </div>
                  <button onClick={toggleFullscreen} className="hover:text-[#d1cbbd] transition-colors" aria-label="Fullscreen">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
