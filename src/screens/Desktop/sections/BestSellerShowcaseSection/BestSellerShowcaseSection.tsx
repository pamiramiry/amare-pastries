import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function useReveal(direction: "up" | "left" | "right" = "up") {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);
  return ref;
}

const bestSellers = [
  { image: "/amare-spoon.png", title: "Vanilla Dream Cup" },
  { image: "/amare-cups.webp", title: "Signature Cup Trio" },
  { image: "/amare-lotus.webp", title: "Lotus Biscoff Cup" },
  { image: "/amare-oreo.webp", title: "Oreo Dream Cup" },
];

export const BestSellerShowcaseSection = (): JSX.Element => {
  const navigate = useNavigate();
  const heroImgRef = useReveal("left");
  const textRef = useReveal("right");
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((card) => card.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const idx = cards.indexOf(card);
            setTimeout(() => card.classList.add("revealed"), idx * 110);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#fffafa]">
      {/* Hero / About section */}
      <div
        id="about-us"
        className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:grid-cols-[minmax(0,600px)_minmax(0,524px)] lg:gap-[51px] lg:py-[56px]"
      >
        <div
          ref={heroImgRef}
          className="overflow-hidden rounded-[38px] lg:rounded-[50px] shadow-lg group"
        >
          <img
            className="h-auto min-h-[320px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            alt="Amare Pastry strawberry gold cups"
            src="/amare-strawberies.png"
          />
        </div>

        <article ref={textRef} className="max-w-[524px] justify-self-start">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Crafted With Love
            </span>
          </div>
          <h2 className="font-serif text-[32px] font-bold leading-[1.1] tracking-tight text-[#cc4156] sm:text-[36px] lg:text-[42px]">
            Handcrafted Desserts Made to Delight
          </h2>
          <p className="mt-5 font-sans text-base font-normal leading-relaxed text-gray-600 lg:text-lg">
            At Amare Pastry Co., every dessert is made fresh with quality
            ingredients and a whole lot of love. From our signature dessert cups
            to custom celebration cakes, we bring Toronto something truly sweet.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("special-orders");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-auto rounded-[50px] bg-[#cc4156] px-8 py-4 font-sans text-lg font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
            >
              Order Ahead
            </button>
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="h-auto rounded-[50px] border-2 border-[#6B3A2A] bg-transparent px-8 py-4 font-sans text-lg font-bold text-[#6B3A2A] transition-all duration-200 hover:bg-[#6B3A2A] hover:text-white hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
            >
              View Menu
            </button>
          </div>
        </article>
      </div>

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-[0] bg-[#fffafa]">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-[60px] w-full sm:h-[80px]"
        >
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#ffccd380"
          />
        </svg>
      </div>

      {/* Best Sellers */}
      <section id="products" className="w-full bg-[#ffccd380] pb-14 pt-4">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-8">
          <h2 className="text-center font-serif text-[36px] font-bold leading-tight text-black sm:text-[40px] lg:text-[44px]">
            Check Out Our <span className="text-[#cc4156]">Best Sellers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-sans text-base text-gray-600">
            Fresh, handmade, and impossible to resist — these are the fan
            favourites.
          </p>

          <div
            ref={cardsRef}
            className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-[42px]"
          >
            {bestSellers.map((item, index) => (
              <article
                key={`best-seller-${index}`}
                className="group flex w-full max-w-[214px] cursor-pointer flex-col items-center gap-[18px]"
                onClick={() => navigate("/menu")}
              >
                <div className="w-full overflow-hidden rounded-[34px] shadow-md transition-all duration-250 group-hover:-translate-y-[5px] group-hover:shadow-xl">
                  <img
                    className="h-[240px] w-full rounded-[34px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                    alt={item.title}
                    src={item.image}
                  />
                </div>
                <h3 className="font-serif text-center text-[20px] font-bold leading-snug text-[#6B3A2A]">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="h-auto min-w-[200px] rounded-[50px] bg-[#9bcca3] px-[50px] py-[22px] font-sans text-[22px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#7aac84] hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
