import type { ReactNode } from "react";
import Link from "next/link";

import { toPersianDigits } from "@/features/videos/utils/normalizeVideo";
import type { VideoPagination } from "@/features/videos/types/video.types";
import { t } from "@/shared/i18n";

interface PaginationProps {
  pagination: VideoPagination;
  createHref: (page: number) => string;
}

function buildPageItems(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  pages.add(current);

  for (let offset = 1; offset <= 2; offset += 1) {
    if (current - offset > 1) {
      pages.add(current - offset);
    }
    if (current + offset < total) {
      pages.add(current + offset);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1]! > 1) {
      items.push("ellipsis");
    }
    items.push(page);
  });

  return items;
}

export function Pagination({ pagination, createHref }: PaginationProps) {
  const { page, totalPages, hasNext, hasPrevious } = pagination;
  const lastPage = totalPages ?? (hasNext ? page + 1 : page);
  const showFirstLast = Boolean(totalPages && totalPages > 1);

  if (!totalPages || totalPages <= 1) {
    if (!hasNext && !hasPrevious) {
      return null;
    }
  }

  const items = totalPages && totalPages > 1 ? buildPageItems(page, totalPages) : [page];

  return (
    <nav
      dir="ltr"
      aria-label={t("pagination.navAriaLabel")}
      className="flex items-center justify-center gap-1.5 py-8 sm:gap-2"
    >
      {showFirstLast ? (
        <PaginationLink
          href={hasPrevious ? createHref(1) : undefined}
          disabled={!hasPrevious}
          label={t("pagination.first")}
        >
          <DoubleChevron direction="prev" />
        </PaginationLink>
      ) : null}

      <PaginationLink
        href={hasPrevious ? createHref(page - 1) : undefined}
        disabled={!hasPrevious}
        label={t("pagination.previous")}
      >
        <ChevronIcon direction="prev" />
      </PaginationLink>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-body text-text-muted"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={createHref(item)}
            aria-label={t("pagination.pageAriaLabel", { page: toPersianDigits(item) })}
            aria-current={item === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              item === page
                ? "bg-accent font-semibold text-ink"
                : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
            }`}
          >
            {toPersianDigits(item)}
          </Link>
        ),
      )}

      <PaginationLink
        href={hasNext ? createHref(page + 1) : undefined}
        disabled={!hasNext}
        label={t("pagination.next")}
      >
        <ChevronIcon direction="next" />
      </PaginationLink>

      {showFirstLast ? (
        <PaginationLink
          href={hasNext ? createHref(lastPage) : undefined}
          disabled={!hasNext}
          label={t("pagination.last")}
        >
          <DoubleChevron direction="next" />
        </PaginationLink>
      ) : null}
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  label,
  children,
}: {
  href?: string;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted opacity-40"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </Link>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={direction === "next" ? "rotate-180" : ""}
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoubleChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={direction === "next" ? "rotate-180" : ""}
    >
      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L12 12L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
