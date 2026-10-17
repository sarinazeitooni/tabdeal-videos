"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { t } from "@/shared/i18n";

interface VideoSearchProps {
  initialQuery?: string;
}

export function VideoSearch({ initialQuery = "" }: VideoSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    const params = new URLSearchParams();

    if (trimmed) {
      params.set("q", trimmed);
    }

    const qs = params.toString();
    router.push(qs ? `/videos?${qs}` : "/videos");
  };

  return (
    <form onSubmit={onSubmit} role="search" className="w-full">
      <label htmlFor="video-search" className="sr-only">
        {t("search.label")}
      </label>
      <div className="flex h-12 overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
        <button
          type="submit"
          aria-label={t("search.buttonAriaLabel")}
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-ink transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/40"
        >
          <SearchIcon />
        </button>
        <input
          id="video-search"
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("search.placeholder")}
          className="h-12 w-full bg-transparent px-4 text-body text-text-primary placeholder:text-text-muted focus:outline-none"
          autoComplete="off"
        />
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20L16.5 16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
