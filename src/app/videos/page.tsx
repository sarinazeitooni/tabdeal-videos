import type { Metadata } from "next";
import {
  getChannelVideos,
  VideoList,
  VideosHero,
} from "@/features/videos";
import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { toPersianDigits } from "@/shared/lib/digits";
import { isAparatApiError } from "@/shared/lib/axios";
import { Container } from "@/shared/ui/Container";
import { Pagination } from "@/shared/ui/Pagination";

interface VideosPageProps {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
}

const firstValue = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) return value[0] ?? "";

  return value ?? "";
};

export const generateMetadata = async ({
  searchParams,
}: VideosPageProps): Promise<Metadata> => {
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
};

const VideosPage = async ({ searchParams }: VideosPageProps) => {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const page = Math.max(1, Number(firstValue(params.page) || "1") || 1);

  let listError: string | null = null;
  let result = null;

  try {
    result = await getChannelVideos({ page, query });
  } catch (error) {
    listError = isAparatApiError(error)
      ? error.message
      : t("listing.loadErrorFallback");
  }

  const createHref = (nextPage: number) => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);

    if (nextPage > 1) next.set("page", String(nextPage));

    const qs = next.toString();
    return qs ? `/videos?${qs}` : "/videos";
  };

  return (
    <div className="pb-10">
      <VideosHero initialQuery={query} />

      <Container>
        {query ? (
          <p className="mb-6 text-body text-text-secondary">
            {t("listing.searchResults", { query })}
            {result?.pagination.totalItems !== null &&
            result?.pagination.totalItems !== undefined
              ? t("listing.resultCount", {
                  count: toPersianDigits(result.pagination.totalItems),
                })
              : null}
          </p>
        ) : null}

        {listError ? (
          <div
            role="alert"
            className="rounded-2xl border border-accent/30 bg-accent/5 px-6 py-10 text-center"
          >
            <p className="text-heading font-bold text-text-primary md:text-heading-lg">
              {t("listing.loadErrorTitle")}
            </p>
            <p className="mt-2 text-body font-normal text-text-secondary">
              {listError}
            </p>
          </div>
        ) : result ? (
          <>
            <VideoList videos={result.videos} />
            <Pagination
              pagination={result.pagination}
              createHref={createHref}
            />
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default VideosPage;
