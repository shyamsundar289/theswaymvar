import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface FilmPlayerProps {
  src: string;
  poster: string;
  title: string;
  autoPlayMuted?: boolean;
}

export function FilmPlayer({ src, poster, title, autoPlayMuted = false }: FilmPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlayMuted);
  const [progress, setProgress] = useState(0);

  // If no src, show "Coming Soon" graceful fallback
  if (!src) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-2xl text-background md:text-4xl">Film coming soon</p>
          <p className="label-xs mt-4 text-bronze">Post-production</p>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden bg-charcoal">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        autoPlay={autoPlayMuted}
        muted={isMuted}
        loop={autoPlayMuted}
        onTimeUpdate={handleTimeUpdate}
        className="h-full w-full object-cover"
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="p-4 md:p-6">
          {/* Progress bar */}
          <div className="relative h-1 w-full overflow-hidden rounded bg-white/20">
            <div
              className="absolute left-0 top-0 h-full bg-bronze transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
            <button onClick={toggleFullscreen} aria-label="Fullscreen">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
