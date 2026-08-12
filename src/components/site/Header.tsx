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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled || open
          ? "border-b border-border/70 bg-background/92 text-foreground backdrop-blur-sm"
          : "border-b border-transparent text-background"
      }`}
    >
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 md:grid-cols-[1fr_auto_1fr] md:py-6">
        <nav className="hidden items-center gap-9 md:flex">
          {nav.slice(0, 2).map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </nav>

        <div className="min-w-0 md:text-center">
          <Wordmark />
        </div>

        <div className="hidden items-center justify-end gap-9 md:flex">
          {nav.slice(2).map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
          <WhatsAppButton variant={scrolled || open ? "outline" : "light"}>Enquire</WhatsAppButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="label-xs justify-self-end md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="shell animate-fade-in border-t border-border/60 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <WhatsAppButton variant="solid">Enquire on WhatsApp</WhatsAppButton>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="label-xs opacity-70 transition-opacity duration-300 hover:opacity-100"
      activeProps={{ className: "label-xs opacity-100" }}
    >
      {label}
    </Link>
  );
}
