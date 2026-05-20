import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const feedbackItems = [
  {
    quote:
      '"Every bite of the Lotus Biscoff cup was absolutely perfect. The layers were so creamy and the flavour was incredible. Amare never disappoints!"',
    author: "Sofia R.",
    role: "Regular Customer",
  },
  {
    quote:
      '"I ordered a custom dessert box for my sister\'s birthday and everyone was blown away. The presentation was stunning and the taste was even better."',
    author: "Marcus T.",
    role: "Event Client",
  },
  {
    quote:
      '"The Oreo cookies and cream cup is my go-to. I drive 30 minutes just to get one. Worth it every single time. Truly crafted with love."',
    author: "Priya K.",
    role: "Loyal Fan",
  },
];

export const SpecialOrdersAndFeedbackSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const textRef = useReveal("left");
  const imgRef = useReveal("right");
  const feedbackRef = useReveal("up");

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 250);
  };

  const prev = () =>
    goTo((activeIndex - 1 + feedbackItems.length) % feedbackItems.length);
  const next = () => goTo((activeIndex + 1) % feedbackItems.length);

  return (
    <section
      id="special-orders"
      className="relative w-full overflow-hidden bg-[#ffccd380]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-16 pt-8 sm:px-10 lg:px-14">
        {/* Special Orders */}
        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,535px)_minmax(0,598px)] lg:gap-[72px]">
          <div
            ref={textRef}
            className="order-2 flex flex-col items-start lg:order-1"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
              <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#6B3A2A]">
                Made Just For You
              </span>
            </div>
            <h2 className="font-serif text-[36px] font-bold leading-[1.1] text-[#cc4156] lg:text-[42px]">
              Special Orders
            </h2>
            <p className="mt-6 max-w-[535px] font-sans text-base font-normal leading-relaxed text-gray-700 lg:text-lg">
              Planning a birthday, bridal shower, or corporate event? We create
              custom dessert boxes, cakes, and cup collections tailored to your
              occasion. Every order is made fresh with your vision in mind.
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {[
                "Custom dessert cups & boxes",
                "Celebration cakes",
                "Event packages",
                "DM or call to order",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-sans text-base text-gray-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B3A2A]" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-10 h-auto min-w-[260px] rounded-[50px] bg-[#9bcca3] px-[50px] py-[22px] font-sans text-[22px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#7aac84] hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
            >
              Place An Order
            </button>
          </div>

          <div
            ref={imgRef}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="group w-full max-w-[560px] overflow-hidden rounded-[38px] shadow-lg">
              <img
                className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                alt="Amare special order cake"
                src="/amare-cake.png"
              />
            </div>
          </div>
        </section>

        {/* Customer Feedback */}
        <section ref={feedbackRef} className="mt-20 pb-4">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Testimonials
            </span>
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
          </div>
          <h2 className="text-center font-serif text-[36px] font-bold leading-tight text-[#cc4156] lg:text-[40px]">
            What Our Customers Say
          </h2>

          <div className="relative mt-10 grid grid-cols-[48px_minmax(0,1fr)_48px] items-center gap-2">
            <button
              type="button"
              aria-label="Previous feedback"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#6B3A2A] text-[#6B3A2A] transition-all duration-200 hover:bg-[#6B3A2A] hover:text-white hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="overflow-hidden">
              <article
                className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-6 transition-opacity duration-250"
                style={{ opacity: animating ? 0 : 1 }}
              >
                <p className="w-full text-center font-sans text-[18px] font-normal leading-relaxed italic text-gray-700 lg:text-[22px]">
                  {feedbackItems[activeIndex].quote}
                </p>
                <div className="flex flex-col items-center gap-1">
                  <p className="font-serif text-[20px] font-bold text-[#6B3A2A]">
                    {feedbackItems[activeIndex].author}
                  </p>
                  <p className="font-sans text-sm text-gray-500">
                    {feedbackItems[activeIndex].role}
                  </p>
                </div>
              </article>
            </div>

            <button
              type="button"
              aria-label="Next feedback"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#6B3A2A] text-[#6B3A2A] transition-all duration-200 hover:bg-[#6B3A2A] hover:text-white hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-[14px]">
            {feedbackItems.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                aria-label={`Go to feedback ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  index === activeIndex
                    ? "bg-[#6B3A2A] scale-125"
                    : "bg-[#6B3A2A]/30 hover:bg-[#6B3A2A]/60"
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
