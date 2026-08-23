import iconUrl from "@/assets/swaymvar-icon-gold.svg";

export function Wordmark({ className, color = "#D0A17C" }: { className?: string; color?: string }) {
  return (
    <span className={`flex flex-col items-center leading-none ${className ?? ""}`}>
      <div
        className="h-[52px] md:h-[64px] aspect-square opacity-90 transition-colors duration-500"
        style={{
          backgroundColor: color,
          maskImage: `url(${iconUrl})`,
          WebkitMaskImage: `url(${iconUrl})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
        aria-hidden="true"
      />
      <span
        className="wordmark mt-0.5 text-[0.95rem] md:text-[1.05rem] transition-colors duration-500"
        style={{ color }}
      >
        THE SWAYMVAR
      </span>
    </span>
  );
}
