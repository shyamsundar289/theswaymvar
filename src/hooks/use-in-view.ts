import { useState, useEffect, MutableRefObject } from "react";

export function useInView(
  ref: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}
