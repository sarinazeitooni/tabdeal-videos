import Link from "next/link";

import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";

export function Header() {
  return (
    <header className="relative z-40 overflow-hidden border-b border-border/40 bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-header-gradient"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-page-glow opacity-80"
      />
      <Container className="relative flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={t("site.homeAriaLabel")}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-ink shadow-sm transition-transform group-hover:scale-105">
            <TabdealMark />
          </span>
          <span className="text-section-title font-bold tracking-tight text-text-primary">
            {t("site.brand")}
          </span>
        </Link>
      </Container>
    </header>
  );
}

function TabdealMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7.5h16M7.5 7.5v9.5c0 1.4 1.3 2.5 3 2.5h3c1.7 0 3-1.1 3-2.5V7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.5v3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
