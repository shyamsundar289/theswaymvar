import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/data/site";

const swaymwarLogo = "/media/images/misc/general/misc_general_logo.svg";

/**
 * Desktop navigation typography token (source of truth):
 *   font-family: font-sans (Instrument Sans)
 *   font-size:   11px (lg: 12px)
 *   font-weight: 500 (medium)
 *   letter-spacing: 0.24em
 *   text-transform: uppercase
 *
 * Mobile menu links reuse the SAME font-family, weight, letter-spacing and
 * text-transform, adapted to a comfortable mobile reading size.
 */

/* Shared desktop nav typography class string */
const NAV_FONT = "font-sans font-medium uppercase tracking-[0.24em]";

export function Header() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";
  
  // Apply transparent hero overlay logic ONLY to pages with a dark full-bleed image at the top
  const isHeroRoute = pathname === "/" || pathname === "/film";
  
  const [open, setOpen] = useState(false);
  
  // Apply transparent hero overlay logic ONLY to pages with a dark full-bleed image at the top
  const isDarkText = pathname === "/about" || pathname === "/little-snap" || open;
  
  // The user explicitly requested Hero-bound sticky positioning.
  const positionClass = "sticky";
  const bgClass = `bg-transparent border-transparent shadow-none ${
    isDarkText ? "text-foreground" : "text-background"
  }`;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      className={`${positionClass} top-0 left-0 z-50 w-full transition-all duration-[150ms] ease-out pointer-events-none h-0 overflow-visible ${bgClass}`}
    >
      <div className="shell flex h-[95px] items-center justify-between gap-8 pointer-events-auto">
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
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <path d="M4 12h16M4 6h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ── Mobile Menu Overlay (Rendered in Portal to escape transform wrappers) ── */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] md:hidden flex flex-col bg-black/70 backdrop-blur-sm overflow-y-auto overflow-x-hidden pointer-events-auto"
          style={{ top: 0 }}
        >
          {/* Top bar: logo + Close — mirrors desktop header height */}
          <div className="shell flex h-[95px] items-center justify-between gap-8 shrink-0">
            <Link
              to="/"
              onClick={(e) => { e.stopPropagation(); setOpen(false); handleLogoClick(e); }}
              aria-label="theswaymvar home"
              className="relative flex shrink-0 items-center justify-start h-full"
            >
              <img 
                src={swaymwarLogo}
                alt="The Swaymvar Logo"
                className="h-[60px] w-auto transition-all duration-500 drop-shadow-sm object-contain origin-left brightness-0 invert"
              />
            </Link>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="p-2 -mr-2 text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <nav className="shell flex flex-col items-end text-right gap-[clamp(1.25rem,4svh,2rem)] pt-2 pb-8">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                preload="intent"
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                className={`${NAV_FONT} text-[clamp(14px,4.5vw,17px)] leading-normal transition-opacity duration-300 hover:opacity-60 text-white`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}

function NavLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      preload="intent"
      className={`${NAV_FONT} text-[11px] opacity-70 transition-opacity duration-300 hover:opacity-100 lg:text-[12px]`}
      activeProps={{
        className:
          `${NAV_FONT} text-[11px] opacity-100 lg:text-[12px]`,
      }}
    >
      {label}
    </Link>
  );
}