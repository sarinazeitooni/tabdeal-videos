import { unstable_cache } from "next/cache";
import { aparatPaths } from "@/features/videos/api/aparat.paths";
import {
  aparatGet,
  assertNoAparatErrors,
  rethrowAparatError,
} from "@/features/videos/api/aparat.request";
import type {
  AparatProfileRaw,
  AparatUiPaging,
  AparatVideoRaw,
  ChannelProfile,
  VideoListResult,
  VideoSummary,
} from "@/features/videos/types/video.types";
import {
  buildPagination,
  normalizeChannelProfile,
  normalizeVideoSummary,
} from "@/features/videos/utils/normalizeVideo";
import { siteConfig } from "@/shared/config/site";
import { createAparatApiError } from "@/shared/lib/axios";

interface VideoByUserResponse {
  videobyuser?: AparatVideoRaw[] | null;
  videoByUser?: AparatVideoRaw[] | null;
  ui?: AparatUiPaging | null;
}

interface ProfileResponse {
  profile?: AparatProfileRaw | null;
  errors?: Array<{ status?: number; detail?: string }>;
}

const toVideoSummaries = (rawVideos: AparatVideoRaw[]): VideoSummary[] =>
  rawVideos
    .map((video) => normalizeVideoSummary(video))
    .filter((video): video is VideoSummary => video !== null);

const readVideoList = (payload: VideoByUserResponse): AparatVideoRaw[] => {
  const list = payload.videobyuser ?? payload.videoByUser;
  return Array.isArray(list) ? list : [];
};

const fetchChannelVideosPage = async (params: {
  username: string;
  perPage: number;
  offset: number;
}): Promise<{ videos: VideoSummary[]; ui: AparatUiPaging | null }> => {
  const data = await aparatGet<VideoByUserResponse>(
    aparatPaths.videoByUser(params.username, params.perPage, params.offset),
  );

  return {
    videos: toVideoSummaries(readVideoList(data)),
    ui: data.ui ?? null,
  };
};

const fetchAllChannelVideos = async (
  username: string,
): Promise<VideoSummary[]> => {
  const perPage = 100;
  const collected: VideoSummary[] = [];
  let offset = 0;

  for (let guard = 0; guard < 50; guard += 1) {
    const { videos, ui } = await fetchChannelVideosPage({
      username,
      perPage,
      offset,
    });

    if (videos.length === 0) break;

    collected.push(...videos);

    if (!ui?.pagingForward) break;

    const nextOffsetMatch = ui.pagingForward.match(/curoffset\/(\d+)/i);
    const nextOffset = nextOffsetMatch
      ? Number(nextOffsetMatch[1])
      : offset + perPage;

    if (!Number.isFinite(nextOffset) || nextOffset <= offset) break;

    offset = nextOffset;
  }

  return Array.from(
    new Map(collected.map((video) => [video.uid, video])).values(),
  );
};

const getCachedChannelVideos = unstable_cache(
  async (username: string) => fetchAllChannelVideos(username),
  ["aparat-channel-videos"],
  { revalidate: 300 },
);

export const getChannelProfile = async (
  username = siteConfig.channelUsername,
): Promise<ChannelProfile> => {
  try {
    const data = await aparatGet<ProfileResponse>(
      aparatPaths.profile(username),
    );

    assertNoAparatErrors(data, "Channel not found");

    const profile = data.profile ? normalizeChannelProfile(data.profile) : null;

    if (!profile) {
      throw createAparatApiError("Channel profile is unavailable", 404);
    }

    return profile;
  } catch (error) {
    return rethrowAparatError(error, "Failed to load channel profile");
  }
};

const searchChannelVideos = async (params: {
  username: string;
  query: string;
  page: number;
  perPage: number;
}): Promise<VideoListResult> => {
  const { username, query, page, perPage } = params;
  const allVideos = await getCachedChannelVideos(username);
  const normalizedQuery = query.toLocaleLowerCase("fa");

  const matched = allVideos.filter((video) =>
    video.title.toLocaleLowerCase("fa").includes(normalizedQuery),
  );

  const totalItems = matched.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const videos = matched.slice(start, start + perPage);

  return {
    videos,
    query,
    pagination: buildPagination({
      page: safePage,
      perPage,
      totalItems,
      itemCount: videos.length,
      ui: {
        pagingForward: safePage < totalPages ? "next" : "",
        pagingBack: safePage > 1 ? "back" : null,
      },
    }),
  };
};

export const getChannelVideos = async (params: {
  page?: number;
  perPage?: number;
  query?: string;
  username?: string;
}): Promise<VideoListResult> => {
  const page = Math.max(1, params.page ?? 1);
  const perPage = Math.max(
    1,
    Math.min(params.perPage ?? siteConfig.perPage, 50),
  );
  const query = (params.query ?? "").trim();
  const username = params.username ?? siteConfig.channelUsername;

  if (query) {
    return searchChannelVideos({ username, query, page, perPage });
  }

  const profile = await getChannelProfile(username).catch(() => null);
  const { videos, ui } = await fetchChannelVideosPage({
    username,
    perPage,
    offset: (page - 1) * perPage,
  });

  return {
    videos,
    query: "",
    pagination: buildPagination({
      page,
      perPage,
      totalItems: profile?.videoCount ?? null,
      ui,
      itemCount: videos.length,
    }),
  };
};
