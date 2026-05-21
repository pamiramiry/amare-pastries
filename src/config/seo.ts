import { UBER_EATS_URL } from "./externalLinks";

/**
 * Site origin for canonical URLs, Open Graph, and JSON-LD.
 * - Local dev: uses your browser origin (e.g. http://localhost:5173)
 * - Production: set VITE_SITE_URL in .env when you have a domain
 */
export function getSiteUrl(): string {
  const env = import.meta.env.VITE_SITE_URL;
  if (env && String(env).trim()) {
    return String(env).replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "http://localhost:5173";
}

/** @deprecated Use getSiteUrl() — legacy alias so older bundles don't throw */
export const SITE_URL = getSiteUrl();

export const BUSINESS = {
  name: "Amare Pastry Co.",
  legalName: "Amare Pastry Corp",
  description:
    "Toronto bakery specializing in tres leches cakes, dessert cups, cookies, and custom celebration cakes. Order ahead for pickup or delivery on Uber Eats.",
  streetAddress: "140 Rogers Rd A",
  addressLocality: "York",
  addressRegion: "ON",
  postalCode: "M6E 1P7",
  addressCountry: "CA",
  telephone: "+1-416-587-1210",
  email: "pamiramiry10@gmail.com",
  latitude: 43.684701,
  longitude: -79.4499849,
  mapsUrl:
    "https://www.google.com/maps/place/140+Rogers+Rd+A,+York,+ON+M6E+1P7",
  instagram: "https://www.instagram.com/amarepastrycorp/",
  facebook: "https://www.facebook.com/amarepastryco",
  uberEats: UBER_EATS_URL,
  priceRange: "$$",
  servesCuisine: ["Bakery", "Desserts", "Latin American", "Cakes"],
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
    { dayOfWeek: "Saturday", opens: "09:00", closes: "19:00" },
    { dayOfWeek: "Sunday", opens: "10:00", closes: "19:00" },
  ],
} as const;

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
};

const DEFAULT_OG_IMAGE = "/amare-3cups.png";

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Amare Pastry Co. | Tres Leches Cakes & Dessert Cups in Toronto",
    description:
      "Order handcrafted tres leches, dessert cups, and custom cakes from Amare Pastry Co. in Toronto. Pickup at 140 Rogers Rd or delivery on Uber Eats.",
    path: "/",
    image: DEFAULT_OG_IMAGE,
  },
  "/menu": {
    title: "Menu | Amare Pastry Co. — Cakes, Cups & Cookies in Toronto",
    description:
      "Browse Amare Pastry Co.'s full menu: Beso De Angel tres leches cake, Lotus & Oreo dessert cups, cookies, slices, and drinks. Toronto pickup & Uber Eats delivery.",
    path: "/menu",
    image: "/amare-cake.png",
  },
  "/special-orders": {
    title: "Order Ahead for Pickup | Amare Pastry Co. Toronto",
    description:
      "Submit a pickup order for tres leches cups or specialty cakes at Amare Pastry Co., Toronto. 2-hour notice for cups; 24–72 hours for custom orders.",
    path: "/special-orders",
    image: "/amare-cake.png",
  },
  "/special-orders/confirmation": {
    title: "Order Received | Amare Pastry Co.",
    description: "Your Amare Pastry Co. pickup order has been submitted.",
    path: "/special-orders/confirmation",
    noindex: true,
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getPageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] ?? PAGE_META["/"];
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${getSiteUrl()}/#bakery`,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: getSiteUrl(),
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl("/amare-logo.png"),
    priceRange: BUSINESS.priceRange,
    servesCuisine: [...BUSINESS.servesCuisine],
    sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.uberEats, BUSINESS.mapsUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    hasMenu: absoluteUrl("/menu"),
    potentialAction: [
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: absoluteUrl("/special-orders"),
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        name: "Order ahead for pickup",
      },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: BUSINESS.name,
    url: getSiteUrl(),
    description: BUSINESS.description,
    publisher: { "@id": `${getSiteUrl()}/#bakery` },
    inLanguage: "en-CA",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type MenuItemForSchema = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
};

export function menuItemListJsonLd(items: MenuItemForSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Amare Pastry Co. Menu",
    description: "Handcrafted desserts, cakes, cups, and cookies in Toronto.",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MenuItem",
        "@id": `${getSiteUrl()}/menu#${item.id}`,
        name: item.name,
        description: item.description,
        image: absoluteUrl(item.image_url),
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/special-orders"),
        },
        menuAddOn: {
          "@type": "MenuSection",
          name: item.category,
        },
      },
    })),
  };
}
