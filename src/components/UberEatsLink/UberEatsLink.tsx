import { ExternalLink } from "lucide-react";
import { UBER_EATS_URL } from "../../config/externalLinks";

type UberEatsLinkProps = {
  variant?: "hero" | "menu";
  className?: string;
};

export const UberEatsLink = ({
  variant = "menu",
  className = "",
}: UberEatsLinkProps): JSX.Element => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[50px] font-sans font-bold transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]";

  const styles =
    variant === "hero"
      ? "border-2 border-white/60 bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur-sm hover:border-white hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-lg"
      : "border-2 border-[#6B3A2A] px-8 py-3.5 text-base text-[#6B3A2A] hover:bg-[#6B3A2A] hover:text-white sm:text-lg";

  return (
    <a
      href={UBER_EATS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`.trim()}
    >
      Order on Uber Eats
      <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
    </a>
  );
};
