import { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { type FilmChapter as FilmChapterType } from "@/types/film";
import { FilmChapter } from "./FilmChapter";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

interface FilmStoriesProps {
  chapters: FilmChapterType[];
}

export function FilmStories({ chapters }: FilmStoriesProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !chapters.length) return;

    const gsap = registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, chapters]);

  if (!chapters.length) return null;

  return (
    <section ref={containerRef} className="shell section-y-lg relative">
      <SectionHeading eyebrow="The Chapters" title="Stories within the story." />

      <div className="relative mt-20 md:mt-32">
        {/* GSAP Scroll Line */}
        <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-border/40 hidden md:block" />
        <div
          ref={lineRef}
          className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-bronze origin-top hidden md:block"
        />

        <div className="flex flex-col gap-24 md:gap-40">
          {chapters.map((chapter, index) => (
            <FilmChapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
