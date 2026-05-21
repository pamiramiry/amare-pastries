export type NavItem = {
  label: string;
  href: string;
  isRoute?: boolean;
};

export const SITE_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About Us", href: "/#about-us" },
  { label: "Menu", href: "/menu", isRoute: true },
  { label: "Special Orders", href: "/special-orders", isRoute: true },
  { label: "Contact", href: "/#contact" },
];
