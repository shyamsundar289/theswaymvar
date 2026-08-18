import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { waLink } from "@/data/site";

/**
 * Shared page hero — enforces identical structural sizing across
 * Film, Photography, and Services pages (Section 5 requirement).
 *
 * Does NOT affect the Home hero, which remains its own component.
 */
export function PageHero({
  eyebrow,
  headline,
  supportingCopy,
  ctaLabel,
  ctaMessage,
  backgroundImage,
  /** Film‑only variant – when set to "film" we use lighter overlays */
  overlayVariant,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  supportingCopy: string;
  ctaLabel: string;
  ctaMessage: string;
  backgroundImage: string;
  /** optional – defaults to undefined (standard overlay) */
  overlayVariant?: "film";
}) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate h-[100svh] min-h-[600px] overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        style={{ y }}
        className="absolute inset-0 h-[118%] w-full object-cover"
      />

      {/* Scrim overlays for text legibility */}
      <div className={`absolute inset-0 ${overlayVariant === "film" ? "bg-charcoal/15" : "bg-charcoal/40"}`} />
      <div className={`absolute inset-0 ${overlayVariant === "film" ? "bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-charcoal/10" : "bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/40"}`} />
      <div className="grain absolute inset-0" />

      {/* Content — left-aligned block at consistent vertical position */}
      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex h-full flex-col justify-end pb-16 text-background md:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="label-xs text-background/60">{eyebrow}</p>

          <h1 className="font-display mt-5 text-[clamp(3rem,8vw,6rem)] leading-[0.95]">
            {headline}
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70 md:text-base">
            {supportingCopy}
          </p>

          <div className="mt-8">
            <a
              href={waLink(ctaMessage)}
              target="_blank"
              rel="noreferrer"
              className="label-xs inline-flex items-center gap-3 border border-background/50 px-7 py-3.5 text-background transition-colors duration-500 hover:bg-background hover:text-charcoal"
            >
              {ctaLabel}
              <span aria-hidden="true" className="text-sm">→</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
