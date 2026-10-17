import Link from "next/link";
import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";

const VideoNotFound = () => (
  <Container className="py-20 text-center">
    <h1 className="text-heading-lg font-bold text-text-primary md:text-display">
      {t("video.notFoundHeading")}
    </h1>
    <p className="mt-3 text-body font-normal text-text-secondary">
      {t("video.notFoundDescription")}
    </p>
    <Link
      href="/videos"
      className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-2.5 text-body-tight font-medium text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {t("home.cta")}
    </Link>
  </Container>
);

export default VideoNotFound;
