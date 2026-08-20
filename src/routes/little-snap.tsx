import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/data/images";
import { Link } from "@tanstack/react-router";
import { Infinity } from "lucide-react";
import { SharedHero } from "@/components/site/SharedHero";

export const Route = createFileRoute("/little-snap")({
  head: () => ({
    meta: [
      { title: "Little Snap — theswaymvar" },
      {
        name: "description",
        content: "Ten moments, ten stories.",
      },
    ],
  }),
  component: LittleSnapPage,
});

const snapStories = [
  { id: 1, title: "Mehendi in the courtyard", image: images.moments[0] },
  { id: 2, title: "The rings, before anyone saw", image: images.moments[1] },
  { id: 3, title: "Grandmother's blessing", image: images.moments[2] },
  { id: 4, title: "Petals on Nai Sarak", image: images.moments[3] },
  { id: 5, title: "Lamps at the mandap", image: images.moments[4] },
  { id: 6, title: "Fairy-light corridor", image: images.moments[5] },
  { id: 7, title: "First dance, 1am", image: images.moments[6] },
  { id: 8, title: "Bangles and bouquet", image: images.moments[7] },
  { id: 9, title: "Under the dupatta", image: images.moments[8] },
  { id: 10, title: "Golden hour, Amber", image: images.moments[9] },
];

function LittleSnapPage() {
  return (
    <div className="bg-background min-h-[100svh] text-foreground">
      {/* Hero Section */}
      <SharedHero 
        icon={<Infinity className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />}
        eyebrow="LITTLE SNAP"
        title="Ten moments"
        description={<>Ten moments, ten stories.<br/>Tap any title to open the full story.</>}
        imageSrc={images.moments[0]}
        fontOverride="serif"
        fullWidthMedia={true}
      />

      {/* 5-Column Grid */}
      <section className="shell pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {snapStories.map((story) => (
            <div key={story.id} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg md:text-xl text-[#15130F] mb-2 font-display italic">
                {story.title}
              </h3>
              <div className="flex items-center gap-2 font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-neutral-600 transition-colors">
                VIEW STORY <span>↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
