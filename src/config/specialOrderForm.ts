export const SPECIALTY_MENU_OPTIONS = [
  { id: "beso-vintage", label: "Beso de Angel Vintage Cake" },
  { id: "impossible-cake", label: "Impossible Cake" },
  { id: "tres-leches-bandeja", label: "Tres Leches Bandeja" },
  { id: "impossible-slice", label: "Impossible Cake Slice" },
  { id: "vanilla-cake-pop", label: "Vanilla Bean Cake pop" },
  { id: "beso-slice", label: "Beso de Angel Cake Slice" },
] as const;

export const TRES_LECHES_CUP_OPTIONS = [
  {
    id: "classic",
    label: "Classic Tres Leches",
    image: "/amare-cup.png",
  },
  {
    id: "cookies-cream",
    label: "Cookies and Creme",
    image: "/amare-oreo.webp",
  },
  {
    id: "lotus",
    label: "Lotus Bite",
    image: "/amare-lotus.webp",
  },
  {
    id: "dubai",
    label: "Dubai Chocolate",
    image: "/amare-1cup.webp",
  },
  {
    id: "berry",
    label: "Berry Delight",
    image: "/amare-strawberies.png",
  },
] as const;

export const REFERRAL_OPTIONS = [
  { id: "instagram", label: "Instagram" },
  { id: "doordash", label: "Door Dash" },
  { id: "ubereats", label: "Uber Eats" },
  { id: "friend", label: "Friend/Referral" },
  { id: "other", label: "Other" },
] as const;

export const FORM_INTRO = {
  title: "Amare Pastry - Order Form",
  subtitle:
    "Please complete this form to place a pickup order. Tres leches Cups: 2 hours notice. Specialty Orders: 24-72 hours notice.",
  paymentHelper:
    "You will be contacted via WhatsApp or Email after submitting this form.",
};

export const ORDER_EMAIL_RECIPIENT = "pamiramiry10@gmail.com";
