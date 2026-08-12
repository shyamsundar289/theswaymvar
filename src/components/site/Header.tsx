import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { Wordmark } from "./Wordmark";
import { WhatsAppButton } from "./CTA";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isSolid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        isSolid
          ? "border-b border-border/70 bg-background/92 text-foreground backdrop-blur-sm"
          : "border-b border-transparent text-background"
      }`}
    >
      {/* Desktop / Main Header */}
      <div className="shell flex min-h-[88px] items-center justify-between gap-8 md:min-h-[96px]">
        {/* Logo — LEFT */}
        <Link
          to="/"
          aria-label="theswaymvar home"
          className="flex shrink-0 items-center"
        >
          <div className="font-display text-[2rem] font-normal leading-none tracking-[0.12em] md:text-[2.35rem]">
            <Wordmark />
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="ml-auto hidden items-center md:flex">
          {/* Navigation */}
          <nav className="flex items-center gap-7 lg:gap-8">
            {nav.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
          </nav>

          {/* Enquire CTA */}
          <div className="ml-8 lg:ml-10">
            <WhatsAppButton variant={isSolid ? "outline" : "light"}>
              Enquire
            </WhatsAppButton>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((value) => !value)}
          className="font-body text-[10px] font-medium uppercase tracking-[0.24em] md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="shell animate-fade-in border-t border-border/60 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-normal leading-none transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <WhatsAppButton variant="solid">
              Enquire on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  label,
  to,
}: {
  label: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="font-body text-[10px] font-medium uppercase tracking-[0.24em] opacity-70 transition-opacity duration-300 hover:opacity-100 lg:text-[11px]"
      activeProps={{
        className:
          "font-body text-[10px] font-medium uppercase tracking-[0.24em] opacity-100 lg:text-[11px]",
      }}
    >
      {label}
    </Link>
  );
}