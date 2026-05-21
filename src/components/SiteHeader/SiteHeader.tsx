import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SITE_NAV_ITEMS, type NavItem } from "../../config/siteNav";

type SiteHeaderProps = {
  variant?: "default" | "hero";
  navItems?: NavItem[];
  /** When variant is hero, pass scroll state for solid nav after scrolling */
  scrolled?: boolean;
};

function isNavItemActive(
  item: NavItem,
  pathname: string,
  hash: string,
): boolean {
  if (item.isRoute) {
    return pathname === item.href;
  }
  if (item.href.startsWith("/#")) {
    const targetHash = item.href.slice(1);
    return pathname === "/" && hash === targetHash;
  }
  return false;
}

export const SiteHeader = ({
  variant = "default",
  navItems = SITE_NAV_ITEMS,
  scrolled = false,
}: SiteHeaderProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, hash } = location;
  const isHome = pathname === "/";

  const goHome = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (item: NavItem) => {
    setMenuOpen(false);
    if (item.href === "/") {
      goHome();
      return;
    }
    if (item.isRoute) {
      navigate(item.href);
      return;
    }
    if (item.href.startsWith("/#")) {
      const id = item.href.replace("/#", "");
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(item.href);
      }
      return;
    }
    const id = item.href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isHero = variant === "hero" && !scrolled;

  const navLinkClass = (active: boolean) => {
    if (isHero) {
      return active
        ? "font-semibold text-[#ffb3c1]"
        : "text-white/95 hover:text-[#ffb3c1]";
    }
    return active
      ? "font-semibold text-brand-pink"
      : "text-gray-800 hover:text-[#6B3A2A]";
  };

  const mobileNavLinkClass = (active: boolean) =>
    active
      ? "font-semibold text-brand-pink"
      : "font-medium text-gray-800 hover:text-[#6B3A2A]";

  return (
    <header
      className={
        isHero
          ? "fixed top-0 z-50 w-full border-0 bg-transparent transition-all duration-500"
          : variant === "hero"
            ? "fixed top-0 z-50 w-full border-0 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-500"
            : "sticky top-0 z-50 w-full border-0 bg-white/95 shadow-sm backdrop-blur-sm"
      }
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-screen-2xl items-center justify-between px-6 py-2 sm:px-10 lg:px-[52px]">
        <Link to="/" onClick={goHome} className="flex shrink-0 items-center">
          <img
            className={`h-[50px] w-auto max-w-[min(240px,58vw)] object-contain sm:h-[56px] ${isHero ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" : ""}`}
            alt="Amare Pastry Co. logo"
            src="/amare-logo.png"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 lg:gap-10"
        >
          <ul className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const active = isNavItemActive(item, pathname, hash);
              const linkClass = `nav-link-hover font-sans text-base tracking-wide transition-colors duration-200 ${navLinkClass(active)}`;
              return (
                <li key={item.label}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      onClick={
                        item.href === "/" ? goHome : () => setMenuOpen(false)
                      }
                      aria-current={active ? "page" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavClick(item)}
                      aria-current={active ? "page" : undefined}
                      className={`${linkClass} bg-transparent border-0 cursor-pointer p-0`}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            to="/special-orders"
            className="btn-cta shrink-0 px-6 py-2.5 text-sm hover:shadow-md"
          >
            Order Ahead
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-0 cursor-pointer p-0"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isHero ? "bg-white" : "bg-[#6B3A2A]"} ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${isHero ? "bg-white" : "bg-[#6B3A2A]"} ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 origin-center ${isHero ? "bg-white" : "bg-[#6B3A2A]"} ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} bg-white border-t border-[#6B3A2A]/10`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => {
            const active = isNavItemActive(item, pathname, hash);
            return (
              <li key={item.label}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    onClick={
                      item.href === "/" ? goHome : () => setMenuOpen(false)
                    }
                    aria-current={active ? "page" : undefined}
                    className={`font-sans text-base ${mobileNavLinkClass(active)}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full text-left font-sans text-base ${mobileNavLinkClass(active)} bg-transparent border-0 cursor-pointer p-0`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
          <li>
            <Link
              to="/special-orders"
              onClick={() => setMenuOpen(false)}
              className="btn-cta block w-full px-6 py-3 text-center text-sm"
            >
              Order Ahead
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
