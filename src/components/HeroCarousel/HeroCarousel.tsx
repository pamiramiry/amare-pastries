import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "../../config/heroSlides";

const INTERVAL_MS = 5500;

type HeroCarouselProps = {
  slides: HeroSlide[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
};

export const HeroCarousel = ({
  slides,
  activeIndex,
  onIndexChange,
  className = "",
}: HeroCarouselProps): JSX.Element => {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next =
        ((index % slides.length) + slides.length) % slides.length;
      onIndexChange(next);
    },
    [slides.length, onIndexChange],
  );

  const prev = () => goTo(activeIndex - 1);
  const nextSlide = () => goTo(activeIndex + 1);

  useEffect(() => {
    if (reduceMotion || paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      onIndexChange((activeIndex + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, slides.length, activeIndex, onIndexChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (slides.length === 0) return <></>;

  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured desserts"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover ${
            reduceMotion ? "" : "transition-all duration-[1200ms] ease-out"
          } ${
            index === activeIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          aria-hidden={index !== activeIndex}
        />
      ))}

      <div
        className="pointer-events-none absolute inset-0 bg-black/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/25"
        aria-hidden
      />

      {slides.length > 1 && (
        <div
          className="absolute bottom-16 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 sm:bottom-24 sm:gap-2 md:bottom-36 md:z-20 md:left-auto md:right-4 md:translate-x-0 md:gap-3 lg:right-8"
          aria-live="polite"
        >
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-black/55 hover:scale-105 active:scale-95 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1 rounded-full border border-white/25 bg-black/45 px-2 py-1 shadow-lg backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.label ?? slide.alt}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === activeIndex
                    ? "h-2 w-6 bg-brand-pink sm:h-2.5 sm:w-7"
                    : "h-2 w-2 bg-white/40 hover:bg-white/70 sm:h-2.5 sm:w-2.5"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-black/55 hover:scale-105 active:scale-95 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
