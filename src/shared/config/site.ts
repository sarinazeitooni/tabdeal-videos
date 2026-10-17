import { t } from "@/shared/i18n";

export const siteConfig = {
  name: t("site.name"),
  description: t("site.description"),
  channelUsername: process.env.APARAT_CHANNEL_USERNAME ?? "tabdealplatform",
  aparatBaseUrl: process.env.APARAT_API_BASE_URL ?? "https://www.aparat.com",
  perPage: Number(process.env.APARAT_PER_PAGE ?? 12),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
