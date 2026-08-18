import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";

/* =========================================================
   TRIFOLD FILM — one rectangle, one center point, three
   video regions formed by lines from top-left, top-right,
   and bottom-left corners meeting at the center.

   Geometry (percentages of the section box, center at 50% 50%):

     top-left(0,0) ─────────────── top-right(100,0)
           \                            /
            \                          /
             \          C(50,50)      /
              \          |           /
               \_________|          /
      bottom-left(0,100)  \        /
                            \      /
                             \    /
                        bottom-right(100,100)

   Region A — upper wedge:      TL → TR → C
   Region B — lower-left wedge: TL → C → BL
   Region C — right/lower wrap: TR → BR → BL → C

   The three polygons share every boundary point exactly
   (including the center), so they tile the rectangle with
   no gaps and no overlap. Divider lines are drawn once, on
   top, along the same three segments — not per-region borders,
   which would double up at the shared edges.
========================================================= */

const CENTER = { x: 50, y: 50 };

const CLIP_UPPER = `polygon(0% 0%, 100% 0%, ${CENTER.x}% ${CENTER.y}%)`;
const CLIP_LOWER_LEFT = `polygon(0% 0%, ${CENTER.x}% ${CENTER.y}%, 0% 100%)`;
const CLIP_RIGHT_WRAP = `polygon(100% 0%, 100% 100%, 0% 100%, ${CENTER.x}% ${CENTER.y}%)`;

type FilmPane = {
  videoSrc: string;
  poster?: string;
  label: string;
};

type TrifoldFilmProps = {
  eyebrow: string;
  title: string;
  body: string;
  panes: {
    upper: FilmPane;
    lowerLeft: FilmPane;
    rightWrap: FilmPane;
  };
  storyHref?: string;
  storyLabel?: string;
};

function FilmPaneVideo({
  pane,
  clipPath,
}: {
  pane: FilmPane;
  clipPath: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      // Autoplay can be blocked before user interaction on some
      // mobile browsers — the poster frame covers this case.
    });
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={pane.poster}
        aria-label={pane.label}
        className="h-full w-full object-cover"
      >
        <source src={pane.videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-charcoal/15" />
    </div>
  );
}

export function TrifoldFilm({
  eyebrow,
  title,
  body,
  panes,
  storyHref = "/photography",
  storyLabel = "See the work",
}: TrifoldFilmProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="label-xs text-bronze">{eyebrow}</p>

          <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-6xl">
            {title}
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {body}
          </p>
        </div>

        {/* The frame — fixed aspect ratio so the center-point
            geometry stays true at every width. On small screens
            the wedges compress but the same three-region
            composition holds; only below `sm` do we fall back
            to a stacked layout, since three slivers of a wedge
            become unreadably thin much narrower than that. */}
        <div className="relative mt-12 hidden aspect-[16/9] w-full overflow-hidden rounded-sm sm:block md:mt-16">
          <FilmPaneVideo pane={panes.upper} clipPath={CLIP_UPPER} />
          <FilmPaneVideo pane={panes.lowerLeft} clipPath={CLIP_LOWER_LEFT} />
          <FilmPaneVideo pane={panes.rightWrap} clipPath={CLIP_RIGHT_WRAP} />

          {/* Divider lines — drawn once along the three shared
              segments (TL→C, TR→C, BL→C), not per-region borders */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g stroke="rgba(244,238,228,0.55)" strokeWidth="0.18" vectorEffect="non-scaling-stroke">
              <line x1="0" y1="0" x2={CENTER.x} y2={CENTER.y} />
              <line x1="100" y1="0" x2={CENTER.x} y2={CENTER.y} />
              <line x1="0" y1="100" x2={CENTER.x} y2={CENTER.y} />
            </g>
          </svg>

          {/* Story link box, anchored in the lower-left wedge
              where there's a clean run of frame near the edge */}
          <Link
            to={storyHref}
            className="label-xs story-link absolute bottom-6 left-6 z-10 inline-flex items-center bg-charcoal/40 px-4 py-2 text-background backdrop-blur-sm md:bottom-8 md:left-8"
          >
            {storyLabel}
          </Link>
        </div>

        {/* Mobile fallback — same three films, stacked, since a
            three-way wedge split reads as noise under ~640px */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:hidden">
          {[panes.upper, panes.lowerLeft, panes.rightWrap].map((pane) => (
            <div
              key={pane.videoSrc}
              className="relative aspect-[4/5] w-full overflow-hidden"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={pane.poster}
                aria-label={pane.label}
                className="h-full w-full object-cover"
              >
                <source src={pane.videoSrc} type="video/mp4" />
              </video>
            </div>
          ))}

          <Link
            to={storyHref}
            className="label-xs story-link mt-2 inline-block text-foreground"
          >
            {storyLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
