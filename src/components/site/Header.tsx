import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const location = useLocation();
  const isIndex = location.pathname === "/";
  
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setScrolled(false);
    setOpen(false);
    setIsHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onCrewImmersive = (e: any) => setIsHidden(e.detail);
    window.addEventListener("crew-immersive-active", onCrewImmersive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("crew-immersive-active", onCrewImmersive);
    };
  }, []);

  const isHeroTransparent = false;

  const isTransparent = isIndex && !scrolled;
  const positionClass = isIndex ? "fixed" : "sticky";
  const bgClass = isTransparent ? "bg-transparent text-background" : "bg-background text-foreground";
  const logoColor = "#D0A17C";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isIndex) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`${positionClass} top-0 z-50 w-full transition-all duration-700 ${bgClass} ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="shell flex h-[120px] md:h-[160px] items-center justify-between gap-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="theswaymvar home"
          className="flex shrink-0 items-center justify-start h-full"
        >
          <img 
            src="/images/logo.png"
            alt="The Swaymvar Logo"
            className="h-[110px] md:h-[140px] w-auto transition-all duration-500 mix-blend-multiply drop-shadow-sm object-contain scale-125 md:scale-150 origin-left"
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