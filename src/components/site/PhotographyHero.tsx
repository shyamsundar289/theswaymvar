// src/components/site/PhotographyHero.tsx
//
// Minimal, image-free hero for /photography.
// Sits directly under the global header. Set the header's height to
// exactly 100px wherever it's defined (see note below), then this
// hero fills the remaining viewport height and centers the word
// PHOTOGRAPHY in bold, at the same scale as the site's other page
// titles (e.g. "Weddings, told whole.") — not an oversized hero statement.
//
// NOTE — apply once, globally, wherever the header component/class lives:
//   header { height: 100px; }
// or, if it's a Tailwind className on the header wrapper:
//   className="h-[100px] ..."

import { Reveal } from "@/components/site/Reveal";

export function PhotographyHero() {
  return (
    <section
      className="flex items-center justify-center bg-background"
      style={{ minHeight: "calc(60vh - 100px)" }}
    >
      <Reveal>
        <h1 className="font-display text-center text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.95] tracking-tighter text-foreground">
          PHOTOGRAPHY
        </h1>
      </Reveal>
    </section>
  );
}
