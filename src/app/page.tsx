import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { GradientHeader } from "@/shared/layout/GradientHeader";
import { BrandLogo } from "@/shared/ui/BrandLogo";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: t("home.title"),
  description: siteConfig.description,
};

const HomePage = () => (
  <div className="flex flex-1 flex-col">
    <GradientHeader contentClassName="flex items-center justify-start py-4 sm:py-5">
      <BrandLogo priority />
    </GradientHeader>

    <Container className="flex flex-1 flex-col items-center justify-center px-1 py-16 text-center sm:py-24">
      <h1 className="max-w-xl text-heading-lg font-bold text-text-primary md:text-display">
        {t("home.title")}
      </h1>
      <p className="mt-4 max-w-lg text-body font-normal text-text-secondary">
        {t("home.subtitle")}
      </p>
      <Link
        href="/videos"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-body-tight font-medium text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {t("home.cta")}
      </Link>
    </Container>
  </div>
);

export default HomePage;
