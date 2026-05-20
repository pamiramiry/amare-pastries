import { BestSellerShowcaseSection } from "./sections/BestSellerShowcaseSection";
import { HeroIntroSection } from "./sections/HeroIntroSection";
import { SpecialOrdersAndFeedbackSection } from "./sections/SpecialOrdersAndFeedbackSection/SpecialOrdersAndFeedbackSection";
import { VisitUsContactSection } from "./sections/VisitUsContactSection";

export const Desktop = (): JSX.Element => {
  return (
    <main className="w-full bg-white">
      <HeroIntroSection />
      <BestSellerShowcaseSection />
      <SpecialOrdersAndFeedbackSection />
      <VisitUsContactSection />
    </main>
  );
};
