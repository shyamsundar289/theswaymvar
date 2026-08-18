import { useState, useEffect } from "react";

export function useReducedMotion() {
  const [matches, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatch(mediaQuery.matches);

    const handleChange = () => {
      setMatch(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return matches;
}
