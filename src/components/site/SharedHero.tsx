import { ReactNode } from "react";
import { Play } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface SharedHeroProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: ReactNode;
  ctaText?: string;
  ctaLink?: string;
  imageSrc?: string;
  videoSrc?: string;
  fontOverride?: "script" | "serif";
  fullWidthMedia?: boolean;
}

import { Header } from "./Header";

export function SharedHero({
  icon,
  eyebrow,
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  videoSrc,
  fontOverride = "serif",
  fullWidthMedia = false,
}: SharedHeroProps) {
  const isScript = fontOverride === "script";
  const titleStyle = isScript ? { lineHeight: 1 } : { lineHeight: 1.1 };

  const textCol = fullWidthMedia ? "text-white" : "text-foreground";
  const mutedCol = fullWidthMedia ? "text-white/80" : "text-muted-foreground";
  const borderCol = fullWidthMedia ? "bg-white/30" : "bg-border";

  const titleClass = isScript
    ? `font-script text-6xl md:text-7xl ${textCol} mt-5 mb-[14px] md:mb-[20px]`
    : `font-display italic text-5xl md:text-6xl ${textCol} font-light tracking-tight mt-[20px] md:mt-[28px] mb-[14px] md:mb-[20px] drop-shadow-none`;

  return (
    <section className="w-full relative shell">
      <Header />
      <div className="pt-[120px] md:pt-[140px] pb-[50px] md:pb-[65px] w-full">
        <div
          className={`relative flex items-center justify-between overflow-hidden w-full mx-auto rounded-[4px] ${fullWidthMedia ? "aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.5/1] xl:aspect-[3/1]" : "min-h-[400px]"}`}
        >
        {fullWidthMedia && (
          <div className="absolute inset-0 z-0">
            {videoSrc ? (
              <video
                src={videoSrc}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : imageSrc ? (
              <img src={imageSrc} className="w-full h-full object-cover" alt={`${title} Hero`} />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />
          </div>
        )}
        {/* Left Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 h-full w-full -translate-y-2 md:-translate-y-4">
          <div className={`${mutedCol} opacity-80`}>{icon}</div>

          <p
            className={`font-sans text-[11px] tracking-[0.25em] uppercase ${mutedCol} mt-4 opacity-90`}
          >
            {eyebrow}
          </p>

          <h1 className={titleClass} style={titleStyle}>
            {title}
          </h1>

          <div
            className={`font-sans text-[13px] md:text-[15px] ${mutedCol} max-w-md mx-auto leading-[1.6] opacity-90`}
          >
            {description}
          </div>

          {ctaText && ctaLink && (
            <Link
              to={ctaLink as any}
              className={`mt-6 flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase ${textCol} hover:opacity-70 transition-opacity`}
            >
              {ctaText}
              <div
                className={`w-5 h-5 rounded-full border ${borderCol} flex items-center justify-center`}
              >
                <Play className="w-2.5 h-2.5 ml-0.5" />
              </div>
            </Link>
          )}
        </div>

        {/* Right Media */}
        {!fullWidthMedia && (
          <div className="hidden md:block w-[50%] h-full relative z-10">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ borderTopLeftRadius: "160px", borderBottomLeftRadius: "160px" }}
            >
              {videoSrc ? (
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  className="w-full h-full object-cover object-center"
                  alt={`${title} Hero`}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
