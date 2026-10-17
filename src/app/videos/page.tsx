import type { Metadata } from "next";

import { getChannelVideos, VideoList, VideoSearch } from "@/features/videos";
import { toPersianDigits } from "@/features/videos/utils/normalizeVideo";
import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { Pagination } from "@/shared/ui/Pagination";
import { AparatApiError } from "@/shared/lib/axios";

interface VideosPageProps {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export async function generateMetadata({ searchParams }: VideosPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = firstValue(params.q).trim();

  if (query) {
    return {
      title: t("listing.searchTitle", { query }),
      description: t("listing.searchDescription", { query }),
    };
  }

  return {
    title: t("listing.title"),
    description: siteConfig.description,
  };
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const page = Math.max(1, Number(firstValue(params.page) || "1") || 1);

  let listError: string | null = null;
  let result = null;

  try {
    result = await getChannelVideos({ page, query });
  } catch (error) {
    listError =
      error instanceof AparatApiError
        ? error.message
        : t("listing.loadErrorFallback");
  }

  const createHref = (nextPage: number) => {
    const next = new URLSearchParams();
    if (query) {
      next.set("q", query);
    }
    if (nextPage > 1) {
      next.set("page", String(nextPage));
    }
    const qs = next.toString();
    return qs ? `/videos?${qs}` : "/videos";
  };

  return (
    <div className="relative pb-10 pt-6 sm:pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-page-glow opacity-60"
      />
      <Container className="relative">
        <section className="mb-8 flex flex-col gap-6">
          <VideoSearch initialQuery={query} />

          {query ? (
            <p className="text-body text-text-secondary">
              {t("listing.searchResults", { query })}
              {result?.pagination.totalItems !== null &&
              result?.pagination.totalItems !== undefined
                ? t("listing.resultCount", {
                    count: toPersianDigits(result.pagination.totalItems),
                  })
                : null}
            </p>
          ) : null}
        </section>

        {listError ? (
          <div
            role="alert"
            className="rounded-2xl border border-accent/30 bg-accent/5 px-6 py-10 text-center"
          >
            <p className="text-section-title font-semibold text-text-primary">
              {t("listing.loadErrorTitle")}
            </p>
            <p className="mt-2 text-body text-text-secondary">{listError}</p>
          </div>
        ) : result ? (
          <>
            <VideoList videos={result.videos} />
            <Pagination pagination={result.pagination} createHref={createHref} />
          </>
        ) : null}
      </Container>
    </div>
  );
}
