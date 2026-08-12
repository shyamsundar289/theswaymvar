import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="label-xs text-bronze">{eyebrow}</p>
      <h2 className="font-display mt-5 text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      {body && <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>}
    </Reveal>
  );
}
