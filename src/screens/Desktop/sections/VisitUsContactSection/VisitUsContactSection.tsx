import { useEffect, useRef } from "react";
import { MapPin, Phone, Instagram, Facebook, ExternalLink } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
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
  }, []);
  return ref;
}

const MAPS_URL = "https://maps.app.goo.gl/ttB4cwXSYkZTHdgB8";

export const VisitUsContactSection = (): JSX.Element => {
  const ref = useReveal();

  return (
    <section
      id="contact"
      className="w-full border-t-2 border-[#6B3A2A]/20 bg-[#fffafa]"
    >
      <div
        ref={ref}
        className="w-full px-6 py-12 sm:px-8 md:px-12 lg:px-[101px] lg:py-14"
      >
        <div className="flex min-h-[140px] w-full flex-col justify-between gap-10 md:flex-row md:items-start">
          {/* Left - Visit info */}
          <address className="not-italic">
            <div className="flex max-w-[380px] flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 rounded-full bg-[#6B3A2A]" />
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B3A2A]">
                  Find Us
                </span>
              </div>
              <h2 className="font-serif text-[36px] font-bold leading-tight text-black">
                Visit Us
              </h2>

              <div className="flex flex-col gap-4">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 font-sans text-base text-gray-700 hover:text-[#6B3A2A] transition-colors duration-200"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#6B3A2A]" />
                  <span className="group-hover:underline">
                    Amare Pastry Co., Toronto, ON
                  </span>
                </a>
                <a
                  href="tel:+14162223456"
                  className="flex items-center gap-3 font-sans text-base text-gray-700 hover:text-[#6B3A2A] transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#6B3A2A]" />
                  <span>(416) 222-3456</span>
                </a>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-2 rounded-[50px] bg-[#6B3A2A] px-6 py-3 font-sans text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#8B5A3A] hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
              >
                <ExternalLink className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </address>

          {/* Center - Hours */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-[#6B3A2A]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B3A2A]">
                Hours
              </span>
            </div>
            <h3 className="font-serif text-[22px] font-bold text-black">
              Opening Hours
            </h3>
            <div className="flex flex-col gap-2 font-sans text-sm text-gray-700">
              {[
                { day: "Monday – Friday", hours: "10:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 9:00 PM" },
                { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-6">
                  <span className="font-medium text-gray-800">{day}</span>
                  <span className="font-semibold text-[#6B3A2A]">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Social */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-[#6B3A2A]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B3A2A]">
                Connect
              </span>
            </div>
            <h3 className="font-serif text-[22px] font-bold text-black">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/amarepastry.co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#6B3A2A]/30 text-[#6B3A2A] transition-all duration-200 hover:border-[#6B3A2A] hover:bg-[#6B3A2A] hover:text-white hover:scale-110 active:scale-95"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/amarepastryco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#6B3A2A]/30 text-[#6B3A2A] transition-all duration-200 hover:border-[#6B3A2A] hover:bg-[#6B3A2A] hover:text-white hover:scale-110 active:scale-95"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="font-sans text-sm text-gray-500">@amarepastry.co</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#6B3A2A]/10 pt-6 sm:flex-row">
          <img
            src="/amarepastriespnglogo.png"
            alt="Amare Pastry Co."
            className="h-10 w-auto object-contain"
          />
          <p className="font-sans text-sm text-gray-400">
            © {new Date().getFullYear()} Amare Pastry Co. — Crafted with love
            in Toronto.
          </p>
        </div>
      </div>
    </section>
  );
};
