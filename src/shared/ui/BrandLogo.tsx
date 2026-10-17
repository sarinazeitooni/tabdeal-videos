import Image from "next/image";
import Link from "next/link";
import { t } from "@/shared/i18n";

interface BrandLogoProps {
  href?: string;
  className?: string;
  priority?: boolean;
}

export const BrandLogo = ({
  href = "/",
  className = "",
  priority = false,
}: BrandLogoProps) => (
  <Link
    href={href}
    className={`inline-flex max-w-full shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`.trim()}
    aria-label={t("site.homeAriaLabel")}
  >
    <Image
      src="/images/tabdeal-logo.png"
      alt={t("site.brand")}
      width={110}
      height={32}
      className="h-7 w-auto max-w-full sm:h-8"
      priority={priority}
    />
  </Link>
);
