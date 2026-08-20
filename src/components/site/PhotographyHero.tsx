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

import { Camera } from "lucide-react";
import { images } from "@/data/images";
import { SharedHero } from "./SharedHero";

export function PhotographyHero() {
  return (
    <SharedHero 
      icon={<Camera className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />}
      eyebrow="STORIES IN EVERY FRAME."
      title="Photography"
      description={<>Raw emotions. Timeless moments.<br/>Captured beautifully, just as they unfold.</>}
      imageSrc={images.photo.featuredHero}
      fontOverride="serif"
      fullWidthMedia={true}
    />
  );
}
