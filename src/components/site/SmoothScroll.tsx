import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";

export function SmoothScroll() {
  const location = useLocation();
  const lenisRef = useRef<{ scrollTo: (target: number, opts?: object) => void } | null>(null);

  useEffect(() => {
    // Force native scroll reset immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Force Lenis internal scroll reset if it is initialized
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    let raf = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("lenis").then(({ default: Lenis }) => {
      const initLenis = () => {
        if (lenisRef.current) return; // Prevent double init
        const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
        lenisRef.current = lenis;
        
        lenis.scrollTo(0, { immediate: true });
        const loop = (time: number) => {
          lenis.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      };

      if (document.readyState === "complete") {
        initLenis();
      } else {
        window.addEventListener("load", initLenis, { once: true });
        // Fallback so scroll isn't native forever if a slow asset hangs the load event
        setTimeout(initLenis, 1500);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      if (lenisRef.current) {
        // @ts-ignore
        lenisRef.current.destroy?.();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
}