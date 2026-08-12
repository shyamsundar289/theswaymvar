import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function DiagonalBreak({
  image,
  eyebrow,
  quote,
  attribution,
}: {
  image: string;
  eyebrow: string;
  quote: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="diagonal-frame relative isolate my-10 overflow-hidden md:my-24">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        style={{ y }}
        className="absolute inset-0 h-[125%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/62" />
      <div className="grain absolute inset-0" />
      <div className="shell break-y relative">
        <div className="mx-auto max-w-3xl text-center text-background">
          <p className="label-xs text-background/60">{eyebrow}</p>
          <blockquote className="mt-8 text-3xl leading-[1.15] md:text-6xl">{quote}</blockquote>
          {attribution && (
            <p className="label-xs mt-8 text-background/55">{attribution}</p>
          )}
        </div>
      </div>
    </section>
  );
}
