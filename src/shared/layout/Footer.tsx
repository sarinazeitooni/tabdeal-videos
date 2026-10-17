import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-surface">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 text-caption text-text-muted sm:flex-row">
        <p>{t("site.footerTagline")}</p>
        <p>{t("site.footerCopyright")}</p>
      </Container>
    </footer>
  );
}
