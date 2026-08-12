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
      <div className="shell flex items-center justify-between gap-8 py-5 md:py-6">
        <div className="min-w-0">
          <Wordmark />
        </div>

        <nav className="hidden flex-1 items-center gap-9 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton variant={scrolled || open ? "outline" : "light"}>Enquire</WhatsAppButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="label-xs md:hidden"
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
