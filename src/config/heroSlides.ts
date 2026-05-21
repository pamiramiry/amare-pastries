export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  label?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "three-cups",
    src: "/amare-3cups.png",
    alt: "Amare Pastry Oreo, flan, and caramel dessert cups",
    label: "Fan Favourite Cups",
  },
  {
    id: "strawberry-cups",
    src: "/amare-strawberies.png",
    alt: "Amare Pastry strawberry dessert cups with gold leaf",
    label: "Berry Delight Cups",
  },
  {
    id: "signature-cake",
    src: "/amare-cake.png",
    alt: "Amare Pastry Beso De Angel signature cake",
    label: "Beso De Angel Cake",
  },
  {
    id: "cup-trio",
    src: "/amare-cups.webp",
    alt: "Amare Pastry signature dessert cup trio",
    label: "Signature Cup Trio",
  },
  {
    id: "lotus-cup",
    src: "/amare-lotus.webp",
    alt: "Amare Pastry Lotus Biscoff dessert cup",
    label: "Lotus Biscoff Cup",
  },
  {
    id: "oreo-cup",
    src: "/amare-oreo.webp",
    alt: "Amare Pastry Oreo dessert cup",
    label: "Oreo Dream Cup",
  },
];
