import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/data/site";

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="min-h-64 md:min-h-56">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="text-2xl leading-[1.3] md:text-4xl">“{t.quote}”</blockquote>
            <figcaption className="label-xs mt-8 text-muted-foreground">
              {t.name} — {t.place}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Testimonial ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-px w-10 transition-colors duration-500 ${
              idx === i ? "bg-bronze" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
