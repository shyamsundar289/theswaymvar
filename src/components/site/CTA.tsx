import { waLink } from "@/data/site";

export function WhatsAppButton({
  children,
  message,
  variant = "solid",
}: {
  children: React.ReactNode;
  message?: string;
  variant?: "solid" | "outline" | "light";
}) {
  const base =
    "label-xs inline-flex items-center justify-center px-7 py-3.5 transition-colors duration-500";
  const styles = {
    solid: "bg-bronze text-accent-foreground hover:bg-charcoal",
    outline: "border border-bronze text-bronze hover:bg-bronze hover:text-accent-foreground",
    light: "border border-background/60 text-background hover:bg-background hover:text-charcoal",
  }[variant];

  return (
    <a href={waLink(message)} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
