import { useEffect, useRef } from "react";

export type RevealDirection = "up" | "left" | "right";

export function useReveal(
  direction: RevealDirection = "up",
  threshold = 0.1,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cls =
      direction === "left"
        ? "reveal-left"
        : direction === "right"
          ? "reveal-right"
          : "reveal";
    el.classList.add(cls);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, threshold]);

  return ref;
}
