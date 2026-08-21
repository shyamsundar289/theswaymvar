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
  
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const [isCrewHidden, setIsCrewHidden] = useState(false);
  
  const lastScrollY = useRef(0);

  const isHidden = isScrollHidden || isCrewHidden;

  useEffect(() => {
    setScrolled(false);
    setOpen(false);
    setIsScrollHidden(false);
    setIsCrewHidden(false);
    lastScrollY.current = window.scrollY;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 40) {
        setIsScrollHidden(false);
        setScrolled(false);
        lastScrollY.current = currentScrollY;
      } else {
        const delta = currentScrollY - lastScrollY.current;
        // 12px threshold to prevent trackpad micro-movement flicker
        if (Math.abs(delta) > 12) {
          setIsScrollHidden(delta > 0); // Hide on scroll down, show on scroll up
          setScrolled(true);
          lastScrollY.current = currentScrollY;
        }
      }
    };

    // Use passive listener for performance, works perfectly alongside Lenis
    window.addEventListener("scroll", onScroll, { passive: true });

    const onCrewImmersive = (e: any) => setIsCrewHidden(e.detail);
    window.addEventListener("crew-immersive-active", onCrewImmersive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("crew-immersive-active", onCrewImmersive);
    };
  }, []);

  // Determine if text should be dark or light.
  // The user requested: First 5 pages = white text, About page = black text.
  // Also force dark text when mobile menu is open so 'Close' is visible on white background.
  const isDarkText = pathname === "/about" || open;
  
  const positionClass = "fixed";
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
      className={`${positionClass} top-0 z-50 w-full transition-all ${
        isHidden 
          ? "-translate-y-full duration-300 ease-in" 
          : "translate-y-0 duration-[150ms] ease-out"
      } ${bgClass}`}
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