import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_featured: boolean;
};

const categories = ["All", "Cakes & Slices", "Dessert Cups", "Cookies", "Other Desserts", "Drinks"] as const;
type Category = (typeof categories)[number];

const MENU_ITEMS: MenuItem[] = [
  // Cakes & Slices
  {
    id: "beso-vintage-cake",
    name: "Beso De Angel Vintage Cake",
    description: "Our signature Tres Leches cake in a classic all-white vintage design with a middle layer of flan. Optional heart shape, color accents & add-ins available. (ribbons, Sprinkles) serves 12-25",
    price: 75.00,
    category: "Cakes & Slices",
    image_url: "/amare-cake.png",
    is_featured: true,
  },
  {
    id: "impossible-cake",
    name: "Impossible Cake",
    description: "Rich, fudgy, and packed with decadent chocolate Cake. Flan “Quesillo”, Topped with Caramel and Strawberries. Serves 8.",
    price: 45.00,
    category: "Cakes & Slices",
    image_url: "/cake2.png",
    is_featured: false,
  },
  {
    id: "classic-tres-leches-bandeja",
    name: 'Classic Tres Leches "Bandeja"',
    description: "Tres Leches tray cake topped with boarder, strawberries and happy birthday sign. Serves 12.",
    price: 60.00,
    category: "Cakes & Slices",
    image_url: "/amare-strawberies.png",
    is_featured: false,
  },
  {
    id: "impossible-cake-slice",
    name: "Impossible Cake Slice",
    description: "Rich, fudgy, and packed with decadent chocolate Cake. Flan “Quesillo”, Topped with Caramel and Strawberry.",
    price: 6.00,
    category: "Cakes & Slices",
    image_url: "/cake2.png",
    is_featured: false,
  },
  {
    id: "chocoflan-slice",
    name: "Chocoflan Slice",
    description: "A delicious slice of chocoflan.",
    price: 17.99,
    category: "Cakes & Slices",
    image_url: "/cake2.png",
    is_featured: false,
  },
  {
    id: "quesillo-flan-slice",
    name: 'Quesillo "Flan" Slice',
    description: "Classic creamy quesillo flan.",
    price: 17.99,
    category: "Cakes & Slices",
    image_url: "/cake2.png",
    is_featured: false,
  },
  {
    id: "beso-de-angel-slice",
    name: "Beso De Angel Slice",
    description: "Slice of our signature Beso De Angel cake.",
    price: 18.99,
    category: "Cakes & Slices",
    image_url: "/cake2.png",
    is_featured: false,
  },

  // Dessert Cups
  {
    id: "build-your-own-cup",
    name: "Build Your Own",
    description: "Build your own custom tres leches or milk cake cup.",
    price: 12.99,
    category: "Dessert Cups",
    image_url: "/amare-cups.webp",
    is_featured: false,
  },
  {
    id: "classic-cup",
    name: "Classic",
    description: "Classic tres leches milk cake cup.",
    price: 12.99,
    category: "Dessert Cups",
    image_url: "/amare-cup.png",
    is_featured: false,
  },
  {
    id: "berry-delight-cup",
    name: "Berry Delight",
    description: "Topped with fresh berries and rich cream.",
    price: 14.99,
    category: "Dessert Cups",
    image_url: "/amare-strawberies.png",
    is_featured: true,
  },
  {
    id: "cookies-and-cream-cup",
    name: "Cookies and Cream",
    description: "Rich chocolate layers with Oreo pieces.",
    price: 14.99,
    category: "Dessert Cups",
    image_url: "/amare-oreo.webp",
    is_featured: false,
  },
  {
    id: "lotus-bite-cup",
    name: "Lotus Bite",
    description: "Creamy Biscoff layers topped with crushed Lotus cookie crumbles.",
    price: 14.99,
    category: "Dessert Cups",
    image_url: "/amare-lotus.webp",
    is_featured: true,
  },
  {
    id: "dubai-chocolate-cup",
    name: "Dubai Chocolate",
    description: "Premium rich Dubai chocolate layers.",
    price: 15.99,
    category: "Dessert Cups",
    image_url: "/amare-1cup.webp",
    is_featured: false,
  },
  {
    id: "beso-de-angel-cup",
    name: "Beso De Angel in a Cup",
    description: "Our signature Beso De Angel experience in a cup.",
    price: 15.99,
    category: "Dessert Cups",
    image_url: "/amare-3cups.webp",
    is_featured: false,
  },

  // Cookies
  {
    id: "chocolate-chip-cookie",
    name: "Chocolate Chip",
    description: "Classic chocolate chip cookie.",
    price: 3.99,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },
  {
    id: "oreo-stuffed-cookie",
    name: "Oreo Stuffed",
    description: "Cookie stuffed with whole Oreo pieces.",
    price: 4.49,
    category: "Cookies",
    image_url: "/amare-oreo.webp",
    is_featured: false,
  },
  {
    id: "biscoff-stuffed-cookie",
    name: "Biscoff Stuffed",
    description: "Cookie loaded with Biscoff spread.",
    price: 4.49,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },
  {
    id: "dubai-chocolate-cookie",
    name: "Dubai Chocolate",
    description: "Premium Dubai chocolate infused cookie.",
    price: 4.49,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },
  {
    id: "white-chocolate-cookie",
    name: "White Chocolate",
    description: "Thick cookie loaded with white chocolate.",
    price: 3.99,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },
  {
    id: "churro-dulce-cookie",
    name: "Churro Dulce De Leche",
    description: "Churro inspired cookie with Dulce De Leche.",
    price: 4.49,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },
  {
    id: "kinder-bueno-cookie",
    name: "Kinder Bueno",
    description: "Cookie stuffed with Kinder Bueno.",
    price: 4.49,
    category: "Cookies",
    image_url: "/amare-cookies.webp",
    is_featured: false,
  },

  // Other Desserts
  {
    id: "biscoff-banana-pudding",
    name: "Biscoff Banana Pudding",
    description: "Creamy banana pudding with Biscoff layers.",
    price: 16.99,
    category: "Other Desserts",
    image_url: "/amare-spoon.png",
    is_featured: false,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Classic coffee-flavored Italian dessert.",
    price: 17.99,
    category: "Other Desserts",
    image_url: "/amare-spoon.png",
    is_featured: false,
  },
  {
    id: "strawberry-and-cream",
    name: "Strawberry and Cream",
    description: "Fresh strawberries with rich cream.",
    price: 12.99,
    category: "Other Desserts",
    image_url: "/amare-strawberies.png",
    is_featured: false,
  },

  // Drinks
  {
    id: "coffee",
    name: "Coffee",
    description: "Freshly brewed hot coffee.",
    price: 3.99,
    category: "Drinks",
    image_url: "/amare-cup.png",
    is_featured: false,
  },
];

function useStaggerReveal(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((card) => {
      card.classList.remove("reveal", "revealed");
      card.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const idx = cards.indexOf(card);
            setTimeout(() => card.classList.add("revealed"), idx * 70);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.05 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export const MenuPage = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  const cardsRef = useStaggerReveal([filtered]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Special Orders", href: "/#special-orders" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#fffafa]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-[#6B3A2A]/10 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex min-h-[72px] w-full max-w-screen-2xl items-center justify-between px-6 py-3 sm:px-10 lg:px-[52px]">
          <Link to="/" className="flex items-center shrink-0">
            <img
              className="h-[52px] w-auto object-contain"
              alt="Amare Pastry Co. logo"
              src="/amare-new-logo.png"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="nav-link-hover font-sans text-base font-medium tracking-wide text-gray-800 hover:text-[#6B3A2A] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => navigate("/#special-orders")}
              className="rounded-[50px] bg-[#cc4156] px-6 py-2.5 font-sans text-sm font-bold text-white shadow transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-[0.98]"
            >
              Order Ahead
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-0 cursor-pointer p-0"
          >
            <span className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[#6B3A2A] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"} bg-white border-t border-[#6B3A2A]/10`}>
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-base font-medium text-gray-800 hover:text-[#6B3A2A] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Page hero banner */}
      <div className="w-full bg-[#ffccd380] px-6 py-12 sm:px-10 lg:px-[52px]">
        <div className="mx-auto max-w-[1280px]">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#6B3A2A] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Our Menu
            </span>
          </div>
          <h1 className="mt-2 font-serif text-[42px] font-bold leading-tight text-[#cc4156] sm:text-[52px]">
            Everything We Make
          </h1>
          <p className="mt-3 max-w-lg font-sans text-base text-gray-600">
            Fresh, handcrafted desserts made with love in Toronto. Browse our
            full selection below.
          </p>
        </div>
      </div>

      {/* Wave from pink to white */}
      <div className="w-full overflow-hidden leading-[0] bg-[#ffccd380]">
        <svg
          viewBox="0 0 1440 50"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-[40px] w-full sm:h-[50px]"
        >
          <path
            d="M0,25 C240,50 480,0 720,25 C960,50 1200,0 1440,25 L1440,50 L0,50 Z"
            fill="#fffafa"
          />
        </svg>
      </div>

      {/* Category filter */}
      <div className="mx-auto max-w-[1280px] px-4 pb-2 pt-6 sm:px-6 md:px-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-[50px] px-6 py-2.5 font-sans text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#6B3A2A] text-white shadow-md scale-[1.04]"
                  : "border-2 border-[#6B3A2A]/30 text-[#6B3A2A] hover:border-[#6B3A2A] hover:bg-[#6B3A2A]/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 md:px-8 pb-20">
        <div
          ref={cardsRef}
          className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-md transition-all duration-250 hover:-translate-y-[5px] hover:shadow-xl cursor-pointer"
              onClick={() => {
                const el = document.getElementById("special-orders");
                if (el) {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("special-orders")?.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                } else {
                  navigate("/#special-orders");
                }
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-[200px] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-[#6B3A2A]/70">
                  {item.category}
                </span>
                <h3 className="font-serif text-[17px] font-bold leading-snug text-gray-900">
                  {item.name}
                </h3>
                <p className="flex-1 font-sans text-xs leading-relaxed text-gray-500 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-serif text-[18px] font-bold text-[#6B3A2A]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-[#cc4156]/10 px-3 py-1 font-sans text-xs font-semibold text-[#cc4156]">
                    Order
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center font-sans text-gray-400">
            No items in this category yet.
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-[28px] bg-[#ffccd380] px-8 py-12 text-center">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B3A2A]">
              Custom Orders
            </span>
            <span className="h-0.5 w-8 rounded-full bg-[#6B3A2A]" />
          </div>
          <h2 className="font-serif text-[28px] font-bold text-[#cc4156] sm:text-[34px]">
            Want Something Special?
          </h2>
          <p className="max-w-md font-sans text-base text-gray-600">
            We do custom boxes, event packages, and celebration cakes. Reach out
            and we'll make your dessert vision a reality.
          </p>
          <Link
            to="/"
            onClick={() => {
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="mt-2 rounded-[50px] bg-[#6B3A2A] px-10 py-4 font-sans text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#8B5A3A] hover:scale-[1.04] hover:shadow-lg active:scale-[0.98]"
          >
            Get In Touch
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-[#6B3A2A]/10 bg-[#fffafa] px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 sm:flex-row">
          <img
            src="/amare-new-logo.png"
            alt="Amare Pastry Co."
            className="h-10 w-auto object-contain"
          />
          <p className="font-sans text-sm text-gray-400">
            © {new Date().getFullYear()} Amare Pastry Co. — Crafted with love
            in Toronto.
          </p>
        </div>
      </footer>
    </div>
  );
};
