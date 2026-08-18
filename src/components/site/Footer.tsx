import { Link } from "@tanstack/react-router";
import { nav, waLink } from "@/data/site";
import { WhatsAppButton } from "./CTA";

export function Footer() {
  return (
    <footer className="grain border-t border-border/60 bg-charcoal text-background">
      <div className="shell py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label-xs text-background/50">Enquiries</p>
            <h2 className="font-display mt-3 max-w-md text-2xl leading-[1.15] md:text-3xl">
              We take a limited number of weddings each year.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/60">
              Tell us the dates, the cities and the people.
            </p>
            <div className="mt-5">
              <WhatsAppButton variant="light">Start on WhatsApp</WhatsAppButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div>
              <p className="label-xs text-background/40">Pages</p>
              <ul className="mt-3 space-y-2">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-display text-base text-background/80 transition-colors hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-xs text-background/40">Elsewhere</p>
              <ul className="mt-3 space-y-2 text-background/80">
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-base">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-base">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-base">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-background/15 pt-3 md:flex-row md:items-center md:justify-between">
          <p className="wordmark" style={{ color: "#D0A17C" }}>THE SWAYMVAR</p>
          <p className="label-xs text-[0.6rem] text-background/40">
            Weddings & films — India and worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}