import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: t("home.title"),
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-page-glow"
      />
      <Container className="relative flex flex-1 flex-col items-center justify-center py-20 text-center sm:py-28">
        <h1 className="max-w-xl text-page-title font-bold text-text-primary sm:text-[2rem] sm:leading-10">
          {t("home.title")}
        </h1>
        <p className="mt-4 max-w-lg text-body text-text-secondary sm:text-section-title">
          {t("home.subtitle")}
        </p>
        <Link
          href="/videos"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-body font-semibold text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {t("home.cta")}
        </Link>
      </Container>
    </div>
  );
}
