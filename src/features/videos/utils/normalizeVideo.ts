import type {
  AparatProfileRaw,
  AparatUiPaging,
  AparatVideoRaw,
  ChannelProfile,
  VideoDetail,
  VideoPagination,
  VideoSummary,
} from "@/features/videos/types/video.types";
import { t } from "@/shared/i18n";

const toNumber = (
  value: string | number | undefined | null,
  fallback = 0,
): number => {
  if (value === undefined || value === null || value === "") return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toString = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value;

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
};

const decodeHtmlEntities = (input: string): string =>
  input
    .replace(/&zwnj;/gi, "\u200c")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

export const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;

  return `${pad(minutes)}:${pad(secs)}`;
};

export const toPersianDigits = (value: number | string): string =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit);

export const formatRelativeTime = (
  timediffSeconds?: number,
  fallback = "",
): string => {
  if (timediffSeconds === undefined || !Number.isFinite(timediffSeconds)) {
    return fallback;
  }

  const seconds = Math.max(0, timediffSeconds);

  if (seconds < 60) {
    return t("time.momentsAgo");
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return t("time.minutesAgo", { count: toPersianDigits(minutes) });
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("time.hoursAgo", { count: toPersianDigits(hours) });

  const days = Math.floor(hours / 24);
  if (days < 30) return t("time.daysAgo", { count: toPersianDigits(days) });

  const months = Math.floor(days / 30);
  if (months < 12) {
    return t("time.monthsAgo", { count: toPersianDigits(months) });
  }

  const years = Math.floor(months / 12);
  return t("time.yearsAgo", { count: toPersianDigits(years) });
};

export const formatVisitCount = (count: number): string => {
  if (count >= 1_000_000) {
    return t("numbers.million", {
      count: toPersianDigits((count / 1_000_000).toFixed(1)),
    });
  }

  if (count >= 1000) {
    return t("numbers.thousand", {
      count: toPersianDigits(Math.round(count / 1000)),
    });
  }

  return toPersianDigits(count);
};

const ensureHttps = (url: string): string => {
  if (!url) return "";

  if (url.startsWith("//")) return `https:${url}`;

  if (url.startsWith("http://")) return url.replace("http://", "https://");

  return url;
};

export const normalizeVideoSummary = (
  raw: AparatVideoRaw,
): VideoSummary | null => {
  const uid = toString(raw.uid).trim();
  const title = toString(raw.title).trim();

  if (!uid || !title) return null;

  const duration = toNumber(raw.duration);
  const visitCount = toNumber(raw.visit_cnt);
  const publishedAt = toString(raw.sdate) || toString(raw.create_date);

  return {
    id: toString(raw.id, uid),
    uid,
    title: decodeHtmlEntities(title),
    username: toString(raw.username),
    senderName: decodeHtmlEntities(
      toString(raw.sender_name, toString(raw.username)),
    ),
    visitCount,
    duration,
    durationLabel: formatDuration(duration),
    publishedAt,
    relativeTime: formatRelativeTime(raw.sdate_timediff, publishedAt),
    bigPoster: ensureHttps(toString(raw.big_poster)),
    smallPoster: ensureHttps(toString(raw.small_poster)),
    profilePhoto: ensureHttps(toString(raw.profilePhoto)),
    frame: ensureHttps(toString(raw.frame)),
  };
};

export const normalizeVideoDetail = (
  raw: AparatVideoRaw,
): VideoDetail | null => {
  const summary = normalizeVideoSummary(raw);

  if (!summary) return null;

  const tagsFromArray = Array.isArray(raw.tags)
    ? raw.tags.map((tag) => toString(tag).trim()).filter(Boolean)
    : [];
  const tagsFromString = toString(raw.tag_str)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    ...summary,
    description: decodeHtmlEntities(toString(raw.description)),
    tags: tagsFromArray.length > 0 ? tagsFromArray : tagsFromString,
    likeCount: toNumber(raw.like_cnt),
    catName: toString(raw.cat_name),
    official: toString(raw.official).toLowerCase() === "yes",
  };
};

export const normalizeChannelProfile = (
  raw: AparatProfileRaw,
): ChannelProfile | null => {
  const username = toString(raw.username).trim();

  if (!username) return null;

  return {
    username,
    name: decodeHtmlEntities(toString(raw.name, username)),
    description: decodeHtmlEntities(toString(raw.descr)),
    videoCount: toNumber(raw.video_cnt),
    followerCount: toString(raw.follower_cnt, "۰"),
    picSmall: ensureHttps(toString(raw.pic_s)),
    picMedium: ensureHttps(toString(raw.pic_m)),
    picLarge: ensureHttps(toString(raw.pic_b)),
    coverSrc: raw.cover_src ? ensureHttps(toString(raw.cover_src)) : null,
    official: toString(raw.official).toLowerCase() === "yes",
  };
};

const extractOffset = (url: string | null | undefined): number | null => {
  if (!url) return null;

  const match = url.match(/curoffset\/(\d+)/i);
  if (!match?.[1]) return null;

  const offset = Number(match[1]);
  return Number.isFinite(offset) ? offset : null;
};

export const buildPagination = (params: {
  page: number;
  perPage: number;
  totalItems: number | null;
  ui?: AparatUiPaging | null;
  itemCount: number;
}): VideoPagination => {
  const { page, perPage, totalItems, ui, itemCount } = params;
  const hasNextFromUi = Boolean(ui?.pagingForward);
  const hasPreviousFromUi = Boolean(ui?.pagingBack);
  const totalPages =
    totalItems !== null && perPage > 0
      ? Math.max(1, Math.ceil(totalItems / perPage))
      : null;

  const hasNext =
    totalPages !== null
      ? page < totalPages
      : hasNextFromUi || itemCount >= perPage;
  const hasPrevious =
    totalPages !== null ? page > 1 : hasPreviousFromUi || page > 1;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNext,
    hasPrevious,
    nextOffset:
      extractOffset(ui?.pagingForward ?? null) ??
      (hasNext ? page * perPage : null),
    previousOffset:
      extractOffset(ui?.pagingBack ?? null) ??
      (hasPrevious ? Math.max(0, (page - 2) * perPage) : null),
  };
};
