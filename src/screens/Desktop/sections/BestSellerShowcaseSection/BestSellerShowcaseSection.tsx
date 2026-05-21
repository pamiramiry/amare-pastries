import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Clock, MapPin, Star } from "lucide-react";
import { HeroCarousel } from "../../../../components/HeroCarousel";
import { heroSlides } from "../../../../config/heroSlides";

function useReveal(direction: "up" | "left" | "right" = "up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
    el.classList.add(cls);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("revealed"); observer.unobserve(el); }
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);
  return ref;
}

const bestSellers = [
  { image: "/amare-cups.webp", title: "Signature Cup Trio", price: "From $12.99" },
  { image: "/amare-lotus.webp", title: "Lotus Biscoff Cup", price: "$14.99" },
  { image: "/amare-oreo.webp", title: "Oreo Dream Cup", price: "$14.99" },
  { image: "/amare-strawberies.png", title: "Berry Delight Cups", price: "$14.99" },
];

const HERO_WAVE = (
  <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[56px] w-full sm:h-[72px] md:h-[80px]">
    <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill="#ffccd3" />
  </svg>
);

export const BestSellerShowcaseSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const contentRef = useReveal("up");
  const cardsRef = useRef<HTMLDivElement>(null);
  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((card) => card.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const idx = cards.indexOf(card);
          setTimeout(() => card.classList.add("revealed"), idx * 110);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full">
      <div id="about-us" className="relative min-h-screen w-full overflow-hidden bg-[#1a1210]">
        <HeroCarousel slides={heroSlides} activeIndex={activeSlide} onIndexChange={setActiveSlide} />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-end px-4 pb-36 pt-24 sm:px-8 sm:pb-40 md:px-10 lg:px-12">
          <div ref={contentRef} className="max-w-[720px]">
            {currentSlide?.label && (
              <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                {currentSlide.label}
              </span>
            )}
            <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Crafted With Love · Toronto
            </p>
            <h1 className="font-serif text-[42px] font-bold leading-[1.02] tracking-tight text-white sm:text-[56px] md:text-[64px] lg:text-[72px]">
              Handcrafted
              <br />
              <span className="text-[#ffb3c1]">Desserts</span>
            </h1>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              Signature tres leches, dessert cups, and celebration cakes — made fresh in Toronto.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => navigate("/special-orders")} className="rounded-[50px] bg-[#cc4156] px-8 py-4 font-sans text-lg font-bold text-white shadow-xl transition-all duration-200 hover:scale-[1.04] hover:shadow-2xl active:scale-[0.98]">
                Order Ahead
              </button>
              <button type="button" onClick={() => navigate("/menu")} className="rounded-[50px] border-2 border-white/80 bg-white/10 px-8 py-4 font-sans text-lg font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#6B3A2A] hover:scale-[1.04] active:scale-[0.98]">
                View Menu
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-white/75">
              <button type="button" onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 cursor-pointer hover:text-white">
                <Star className="h-4 w-4 fill-[#ffb3c1] text-[#ffb3c1]" />
                <span className="font-medium">Loved on Google</span>
              </button>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#ffb3c1]" />140 Rogers Rd</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#ffb3c1]" />Fresh daily</span>
            </div>
          </div>
        </div>

        <button type="button" aria-label="Scroll to explore" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/60 transition-colors hover:text-white sm:bottom-32">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-widest">Explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 w-full leading-[0]">{HERO_WAVE}</div>
      </div>

      <section id="products" className="w-full bg-[#ffccd3] pb-14 pt-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-8">
          <h2 className="text-center font-serif text-[36px] font-bold leading-tight text-black sm:text-[40px] lg:text-[44px]">
            Check Out Our <span className="text-[#cc4156]">Best Sellers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-sans text-base text-gray-600">Fresh, handmade, and impossible to resist — these are the fan favourites.</p>
          <div ref={cardsRef} className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {bestSellers.map((item, index) => (
              <article key={`best-seller-${index}`} className="group flex w-full max-w-[220px] cursor-pointer flex-col items-center gap-3" onClick={() => navigate("/menu")}>
                <div className="w-full overflow-hidden rounded-[28px] shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <img className="h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:h-[240px]" alt={item.title} src={item.image} />
                </div>
                <h3 className="font-serif text-center text-[18px] font-bold leading-snug text-[#6B3A2A] sm:text-[20px]">{item.title}</h3>
                <p className="font-sans text-sm font-semibold text-[#cc4156]">{item.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => navigate("/menu")} className="min-w-[200px] rounded-[50px] border-2 border-[#6B3A2A] bg-transparent px-10 py-4 font-sans text-lg font-bold text-[#6B3A2A] transition-all duration-200 hover:bg-[#6B3A2A] hover:text-white hover:scale-[1.04] active:scale-[0.98]">
              View Full Menu
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
