import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: "About Us", href: "#about-us" },
  { label: "Products", href: "/menu", isRoute: true },
  { label: "Special Orders", href: "#special-orders" },
  { label: "Contact", href: "#contact" },
];

export const HeroIntroSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: (typeof navigationItems)[0]) => {
    setMenuOpen(false);
    if (item.isRoute) {
      navigate(item.href);
      return;
    }
    const id = item.href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b-2 border-[#6B3A2A]/20"
          : "bg-[#fffafa] border-b-2 border-[#6B3A2A]/10"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-screen-2xl items-center justify-between px-6 py-3 sm:px-10 lg:px-[52px]">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            className="h-[56px] w-auto object-contain"
            alt="Amare Pastry Co. logo"
            src="/amarepastriespnglogo.png"
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-[52px]">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className="nav-link-hover font-sans text-base font-medium tracking-wide text-gray-800 hover:text-[#6B3A2A] transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-0 cursor-pointer p-0"
        >
          <span
            className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"} bg-white border-t border-[#6B3A2A]/10`}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => handleNavClick(item)}
                className="font-sans text-base font-medium text-gray-800 hover:text-[#6B3A2A] transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 text-left w-full"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
