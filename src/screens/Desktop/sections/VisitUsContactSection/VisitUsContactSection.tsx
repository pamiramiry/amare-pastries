import { MapPin, Phone, Instagram, Facebook, Clock, ShoppingBag } from "lucide-react";
import { UberEatsLink } from "../../../../components/UberEatsLink";
import { useReveal } from "../../../../hooks/useReveal";

const MAPS_URL = "https://www.google.com/maps/place/140+Rogers+Rd+A,+York,+ON+M6E+1P7";

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
        {/* Top Headings */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Visit Us
            </span>
            <span className="h-0.5 w-6 rounded-full bg-[#6B3A2A]" />
          </div>
          <h2 className="mb-4 font-serif text-[36px] font-bold leading-tight text-black md:text-[48px]">
            Visit Our Amare Pastry Shop
          </h2>
          <p className="max-w-2xl font-sans text-base text-gray-600">
            Come experience Toronto's finest handcrafted pastries and cakes — 140 Rogers Rd A
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* Left Column - Info Card */}
          <div className="flex flex-col gap-8 rounded-[24px] border border-[#6B3A2A]/10 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10">
            
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3A2A]/5 text-[#6B3A2A]">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Address
                </span>
                <address className="not-italic">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-base font-medium text-gray-800 transition-colors hover:text-[#6B3A2A]"
                  >
                    140 Rogers Rd A, York, ON M6E 1P7
                  </a>
                </address>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3A2A]/5 text-[#6B3A2A]">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Phone
                </span>
                <a
                  href="tel:+14165871210"
                  className="font-sans text-base font-medium text-gray-800 transition-colors hover:text-[#6B3A2A]"
                >
                  (416) 587-1210
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3A2A]/5 text-[#6B3A2A]">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex w-full flex-col">
                <span className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Hours
                </span>
                <div className="flex w-full max-w-[280px] flex-col gap-2 font-sans text-sm text-gray-800">
                  {[
                    { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
                    { day: "Sunday", hours: "10:00 AM – 7:00 PM" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between gap-4">
                      <span className="font-medium text-gray-600">{day}</span>
                      <span className="font-semibold text-[#6B3A2A]">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3A2A]/5 text-[#6B3A2A]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Delivery
                </span>
                <p className="font-sans text-sm text-gray-600">
                  Order for delivery through Uber Eats.
                </p>
                <UberEatsLink variant="menu" className="!inline-flex !w-fit !px-6 !py-2.5 !text-base" />
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B3A2A]/5 text-[#6B3A2A]">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                  Connect
                </span>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.instagram.com/amarepastrycorp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-sans text-base font-medium text-gray-800 transition-colors hover:text-[#6B3A2A]"
                  >
                    <Instagram className="h-4 w-4 text-[#6B3A2A]" />
                    <span>@amarepastrycorp</span>
                  </a>
                  <a
                    href="https://www.facebook.com/amarepastryco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-sans text-base font-medium text-gray-800 transition-colors hover:text-[#6B3A2A]"
                  >
                    <Facebook className="h-4 w-4 text-[#6B3A2A]" />
                    <span>Amare Pastry Co</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Map */}
          <div className="h-full min-h-[400px] w-full overflow-hidden rounded-[24px] border border-[#6B3A2A]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.2434945647924!2d-79.44998489999999!3d43.684701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b33c0545c86e9%3A0x6c0a4a5cd7a4dd1!2sAmar%C3%A9%20Pastry%20Corp!5e0!3m2!1sen!2sca!4v1779264943396!5m2!1sen!2sca" 
              className="h-full min-h-[400px] w-full grayscale-[15%] transition-all duration-500 hover:grayscale-0"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Amare Pastry Corp Location"
            ></iframe>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#6B3A2A]/10 pt-6 sm:flex-row">
          <img
            src="/amare-logo.png"
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
