import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  size = "md",
}: {
  eyebrow: React.ReactNode;
  title?: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" 
    ? "text-[clamp(3rem,8vw,6rem)] leading-[0.95]" 
    : "text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]";

  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="label-xs text-bronze">{eyebrow}</div>
      {title && <h2 className={`font-display mt-5 ${sizeClass}`}>{title}</h2>}
      {body && <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>}
    </Reveal>
  );
}
