import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { nav } from "@/data/site";
import { Wordmark } from "./Wordmark";

const swaymwarLogo = "/images/swamyvar_logo.svg";

export function Header() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";
  
  // Apply transparent hero overlay logic ONLY to pages with a dark full-bleed image at the top
  const isHeroRoute = pathname === "/" || pathname === "/film";
  
  const [open, setOpen] = useState(false);
  
  // Apply transparent hero overlay logic ONLY to pages with a dark full-bleed image at the top
  const isDarkText = pathname === "/about" || pathname === "/little-snap" || open;
  
  // Changed from "fixed" to "absolute" based on user request:
  // "header should go away with the hero section and not reappear on scroll up/down"
  const positionClass = "absolute";
  const bgClass = `bg-transparent border-transparent shadow-none ${
    isDarkText ? "text-foreground" : "text-background"
  }`;

  useEffect(() => {
    if (!open) return;
    
    const handleInteraction = (e: Event) => {
      // For clicks, check if outside header
      if (e.type === 'click' && (e.target as HTMLElement).closest('header')) {
        return;
      }
      setOpen(false);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    document.addEventListener('click', handleInteraction);
    
    return () => {
      window.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, [open]);

  const handleLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (isHeroRoute) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`${positionClass} top-0 left-0 z-50 w-full transition-all duration-[150ms] ease-out ${bgClass}`}
    >
      <div className="shell flex h-[95px] items-center justify-between gap-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="theswaymvar home"
          className="relative flex shrink-0 items-center justify-start h-full"
        >
          <img 
            src={swaymwarLogo}
            alt="The Swaymvar Logo"
            className="h-[60px] md:h-[70px] lg:h-[80px] w-auto transition-all duration-500 drop-shadow-sm object-contain origin-left"
          />
        </Link>

        <div className="ml-auto hidden items-center md:flex">
          <nav className="flex items-center gap-8 lg:gap-10">
            {nav.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
          </nav>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="font-body text-[11px] font-medium uppercase tracking-[0.24em] md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="shell animate-fade-in border-t border-border/20 bg-background pb-8 pt-6 md:hidden w-full max-w-[100vw] overflow-hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                preload="intent"
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-normal leading-none transition-opacity duration-300 hover:opacity-60 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      preload="intent"
      className="font-body text-[11px] font-medium uppercase tracking-[0.24em] opacity-70 transition-opacity duration-300 hover:opacity-100 lg:text-[12px]"
      activeProps={{
        className:
          "font-body text-[11px] font-medium uppercase tracking-[0.24em] opacity-100 lg:text-[12px]",
      }}
    >
      {label}
    </Link>
  );
}