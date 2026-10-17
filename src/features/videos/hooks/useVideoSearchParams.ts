"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useVideoSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const createHref = useCallback(
    (next: { q?: string; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());

      const nextQuery = next.q !== undefined ? next.q : query;
      const nextPage = next.page !== undefined ? next.page : page;

      if (nextQuery.trim()) {
        params.set("q", nextQuery.trim());
      } else {
        params.delete("q");
      }

      if (nextPage > 1) {
        params.set("page", String(nextPage));
      } else {
        params.delete("page");
      }

      const basePath = pathname.startsWith("/videos") ? pathname : "/videos";
      const qs = params.toString();
      return qs ? `${basePath}?${qs}` : basePath;
    },
    [page, pathname, query, searchParams],
  );

  const setQuery = useCallback(
    (nextQuery: string) => {
      router.push(createHref({ q: nextQuery, page: 1 }));
    },
    [createHref, router],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      router.push(createHref({ page: nextPage }));
    },
    [createHref, router],
  );

  return useMemo(
    () => ({
      query,
      page,
      createHref,
      setQuery,
      setPage,
    }),
    [createHref, page, query, setPage, setQuery],
  );
}
