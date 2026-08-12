import { pressNames } from "@/data/site";

export function PressStrip({ count = 6, size = "sm" }: { count?: number; size?: "sm" | "xs" }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
      <ul className="flex min-w-max items-center gap-8 opacity-45 md:min-w-0 md:justify-between md:gap-4">
        {pressNames.slice(0, count).map((name) => (
          <li
            key={name}
            className={`font-display whitespace-nowrap text-foreground/80 ${
              size === "sm" ? "text-sm md:text-base" : "text-xs md:text-sm"
            }`}
            style={{ letterSpacing: "0.18em" }}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
