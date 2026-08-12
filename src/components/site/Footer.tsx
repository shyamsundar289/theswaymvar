import { Link } from "@tanstack/react-router";
import { nav, waLink } from "@/data/site";
import { WhatsAppButton } from "./CTA";

export function Footer() {
  return (
    <footer className="grain border-t border-border/60 bg-charcoal text-background">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label-xs text-background/50">Enquiries</p>
            <h2 className="font-display mt-5 max-w-xl text-4xl leading-[1.05] md:text-6xl">
              We take a limited number of weddings each year.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/60">
              Tell us the dates, the cities and the people. We'll reply with availability and a
              conversation, not a brochure.
            </p>
            <div className="mt-9">
              <WhatsAppButton variant="light">Start on WhatsApp</WhatsAppButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:justify-items-end">
            <div>
              <p className="label-xs text-background/40">Pages</p>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-display text-lg text-background/80 transition-colors hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-xs text-background/40">Elsewhere</p>
              <ul className="mt-5 space-y-3 text-background/80">
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-lg">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-lg">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-lg">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-background/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="wordmark text-background/70">theswaymvar</p>
          <p className="label-xs text-[0.6rem] text-background/40">
            Weddings & films — India and worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
