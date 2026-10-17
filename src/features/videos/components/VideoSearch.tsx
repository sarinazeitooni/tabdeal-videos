"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { t } from "@/shared/i18n";

interface VideoSearchProps {
  initialQuery?: string;
}

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className="shrink-0"
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 20L16.5 16.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const VideoSearch = ({ initialQuery = "" }: VideoSearchProps) => {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    const params = new URLSearchParams();

    if (trimmed) params.set("q", trimmed);

    const qs = params.toString();
    router.push(qs ? `/videos?${qs}` : "/videos");
  };

  return (
    <form onSubmit={onSubmit} role="search" className="w-full ">
      <label htmlFor="video-search" className="sr-only">
        {t("search.label")}
      </label>
      <div className="flex w-full  items-center gap-3 rounded-lg bg-surface-elevated p-4 sm:gap-4 sm:p-3 md:p-4">
        <input
          id="video-search"
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("search.placeholder")}
          className=" flex-1 rounded-md bg-surface-light px-3 py-2.5 text-body-tight font-normal text-text-primary placeholder:text-text-primary focus:outline-none sm:py-3 md:text-title"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label={t("search.buttonAriaLabel")}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-3 py-2.5 text-center text-body-tight font-medium text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-4 sm:py-3"
        >
          <SearchIcon />
          <span>{t("search.button")}</span>
        </button>
      </div>
    </form>
  );
};
