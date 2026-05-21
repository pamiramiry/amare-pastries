import { useNavigate } from "react-router-dom";
import { useReveal } from "../../../../hooks/useReveal";

const ABOUT_BULLETS = [
  "Handcrafted in Toronto at 140 Rogers Rd",
  "Signature tres leches, cups, cakes & slices",
  "Custom orders for birthdays, showers & events",
];

export const AboutUsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const imgRef = useReveal("left");
  const textRef = useReveal("right");

  return (
    <section id="about-us" className="w-full bg-[#fffafa] py-14 sm:py-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div
          ref={imgRef}
          className="group overflow-hidden rounded-[32px] shadow-xl lg:rounded-[40px]"
        >
          <img
            src="/amare-cake.png"
            alt="Amare Pastry celebration cake and desserts"
            className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-[400px] lg:h-[480px]"
          />
        </div>
        <div ref={textRef}>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Our Story
            </span>
          </div>
          <h2 className="font-serif text-[34px] font-bold leading-tight text-brand-pink sm:text-[40px] lg:text-[44px]">
            Baked With Love
            <br />
            <span className="text-[#6B3A2A]">in Toronto</span>
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-gray-600 lg:text-lg">
            Amare Pastry Co. is a Toronto bakery known for tres leches cakes,
            dessert cups, and celebration treats made fresh with care.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-gray-600 lg:text-lg">
            From everyday pickups to last-minute custom orders, we focus on
            quality ingredients, beautiful presentation, and the kind of service
            our customers rave about on Google.
          </p>
          <ul className="mt-6 flex flex-col gap-3 font-sans text-base text-gray-700">
            {ABOUT_BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B3A2A]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="rounded-[50px] border-2 border-[#6B3A2A] px-8 py-4 font-sans text-lg font-bold text-[#6B3A2A] transition-all duration-200 hover:bg-[#6B3A2A] hover:text-white hover:scale-[1.04] active:scale-[0.98]"
            >
              View Menu
            </button>
            <button
              type="button"
              onClick={() => navigate("/special-orders")}
              className="btn-cta px-8 py-4 text-lg shadow-md hover:shadow-lg"
            >
              Order Ahead
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
