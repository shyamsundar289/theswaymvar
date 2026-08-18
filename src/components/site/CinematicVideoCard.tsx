import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';

type Film = {
  id: string;
  couple: string;
  location: string;
  category: string;
  videoUrl: string;
  posterImg: string;
};

interface CinematicVideoCardProps {
  film: Film;
  isActive: boolean;
  onActivate: () => void;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function CinematicVideoCard({ film, isActive, onActivate }: CinematicVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Sync isPlaying state with the actual video state and isActive prop
  useEffect(() => {
    if (!isActive && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  const togglePlay = (e?: ReactMouseEvent) => {
    e?.stopPropagation();
    if (!isActive) {
      onActivate();
    }
    
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setHasStarted(true);
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        setShowControls(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(false);
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

  const changeSpeed = (speed: number, e: ReactMouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackRate(speed);
      setShowSpeedMenu(false);
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
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={`Play video for ${film.couple}`}
    >
      <video
        ref={videoRef}
        src={film.videoUrl}
        poster={film.posterImg}
        className="w-full h-full object-cover"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        playsInline
      />

      {/* Overlay Content (Hidden when actively playing to preserve unobstructed view) */}
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 pointer-events-none ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'}`}>
        {/* Top Text */}
        <div className="absolute top-6 left-6 right-6 text-white drop-shadow-md">
          <p className="text-[10px] md:text-[11px] tracking-[3px] uppercase font-sans mb-1 opacity-80">{film.category}</p>
          <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight">{film.couple}</h3>
          <p className="text-xs font-sans tracking-wide mt-1 opacity-90">{film.location}</p>
        </div>
      </div>



      {/* Bottom Control Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${(isActive && hasStarted && showControls) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicking controls from toggling play on the container
      >
        {/* Timeline */}
        <div className="w-full mb-3 group/timeline cursor-pointer flex items-center" onClick={(e) => e.stopPropagation()}>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            aria-label="Seek timeline"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:opacity-70 transition-opacity" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button onClick={toggleMute} className="hover:opacity-70 transition-opacity" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              ) : (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              )}
            </button>
            <span className="text-[11px] font-mono tracking-wider opacity-80 pt-0.5">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
              className="text-[12px] font-sans font-medium hover:opacity-70 transition-opacity"
              aria-label="Playback Speed"
            >
              {playbackRate}×
            </button>
            
            {showSpeedMenu && (
              <div className="absolute bottom-full right-8 mb-2 bg-black/90 backdrop-blur-md rounded-md py-2 px-1 flex flex-col gap-1 border border-white/10 shadow-xl">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={(e) => changeSpeed(speed, e)}
                    className={`text-[11px] px-4 py-1 text-left rounded hover:bg-white/20 transition-colors ${playbackRate === speed ? 'text-[#29b6f6]' : 'text-white'}`}
                  >
                    {speed}×
                  </button>
                ))}
              </div>
            )}

            <button onClick={toggleFullscreen} className="hover:opacity-70 transition-opacity" aria-label="Fullscreen">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
