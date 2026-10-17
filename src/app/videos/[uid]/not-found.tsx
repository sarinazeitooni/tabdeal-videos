import Link from "next/link";

import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";

export default function VideoNotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-page-title font-bold text-text-primary">
        {t("video.notFoundHeading")}
      </h1>
      <p className="mt-3 text-body text-text-secondary">{t("video.notFoundDescription")}</p>
      <Link
        href="/videos"
        className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-6 font-semibold text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {t("home.cta")}
      </Link>
    </Container>
  );
}
