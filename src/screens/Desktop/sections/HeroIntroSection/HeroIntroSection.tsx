import { useEffect, useState } from "react";
import { SiteHeader, type NavItem } from "../../../../components/SiteHeader";

const navigationItems: NavItem[] = [
  { label: "About Us", href: "/#about-us" },
  { label: "Menu", href: "/menu", isRoute: true },
  { label: "Special Orders", href: "/special-orders", isRoute: true },
  { label: "Contact", href: "/#contact" },
];

export const HeroIntroSection = (): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SiteHeader
      variant="hero"
      scrolled={scrolled}
      navItems={navigationItems}
    />
  );
};
