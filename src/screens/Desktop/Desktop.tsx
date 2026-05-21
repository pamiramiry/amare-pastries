import { useEffect, useState } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { BestSellerShowcaseSection } from "./sections/BestSellerShowcaseSection/BestSellerShowcaseSection";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { SpecialOrdersAndFeedbackSection } from "./sections/SpecialOrdersAndFeedbackSection/SpecialOrdersAndFeedbackSection";
import { VisitUsContactSection } from "./sections/VisitUsContactSection/VisitUsContactSection";

function HeroNav(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <SiteHeader variant="hero" scrolled={scrolled} />;
}

export const Desktop = (): JSX.Element => {
  return (
    <main className="w-full bg-white">
      <HeroNav />
      <BestSellerShowcaseSection />
      <AboutUsSection />
      <SpecialOrdersAndFeedbackSection />
      <VisitUsContactSection />
    </main>
  );
};
