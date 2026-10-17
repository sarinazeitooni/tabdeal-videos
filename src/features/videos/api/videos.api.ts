import { unstable_cache } from "next/cache";
import type {
  AparatProfileRaw,
  AparatUiPaging,
  AparatVideoRaw,
  ChannelProfile,
  VideoDetail,
  VideoListResult,
  VideoSummary,
} from "@/features/videos/types/video.types";
import {
  buildPagination,
  normalizeChannelProfile,
  normalizeVideoDetail,
  normalizeVideoSummary,
} from "@/features/videos/utils/normalizeVideo";
import { siteConfig } from "@/shared/config/site";
import {
  aparatClient,
  createAparatApiError,
  isAparatApiError,
} from "@/shared/lib/axios";

interface VideoByUserResponse {
  videobyuser?: AparatVideoRaw[] | null;
  videoByUser?: AparatVideoRaw[] | null;
  ui?: AparatUiPaging | null;
}

interface VideoResponse {
  video?: AparatVideoRaw | null;
}

interface ProfileResponse {
  profile?: AparatProfileRaw | null;
  errors?: Array<{ status?: number; detail?: string }>;
}

const getVideoList = (payload: VideoByUserResponse): AparatVideoRaw[] => {
  const list = payload.videobyuser ?? payload.videoByUser;
  return Array.isArray(list) ? list : [];
};

const normalizeList = (rawVideos: AparatVideoRaw[]): VideoSummary[] =>
  rawVideos
    .map((video) => normalizeVideoSummary(video))
    .filter((video): video is VideoSummary => video !== null);

const fetchChannelVideosPage = async (params: {
  username: string;
  perPage: number;
  offset: number;
}): Promise<{ videos: VideoSummary[]; ui: AparatUiPaging | null }> => {
  const { username, perPage, offset } = params;
  const path =
    offset > 0
      ? `/videoByUser/username/${encodeURIComponent(username)}/perpage/${perPage}/curoffset/${offset}`
      : `/videoByUser/username/${encodeURIComponent(username)}/perpage/${perPage}`;

  const { data } = await aparatClient.get<VideoByUserResponse>(path);
  return {
    videos: normalizeList(getVideoList(data)),
    ui: data.ui ?? null,
  };
};

const fetchAllChannelVideosUncached = async (
  username: string,
): Promise<VideoSummary[]> => {
  const perPage = 100;
  const collected: VideoSummary[] = [];
  let offset = 0;
  let guard = 0;

  while (guard < 50) {
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
    guard += 1;
  }

  const unique = new Map<string, VideoSummary>();
  for (const video of collected) {
    unique.set(video.uid, video);
  }

  return Array.from(unique.values());
};

const getCachedChannelVideos = unstable_cache(
  async (username: string) => fetchAllChannelVideosUncached(username),
  ["aparat-channel-videos"],
  { revalidate: 300 },
);

export const getChannelProfile = async (
  username = siteConfig.channelUsername,
): Promise<ChannelProfile> => {
  try {
    const { data } = await aparatClient.get<ProfileResponse>(
      `/profile/username/${encodeURIComponent(username)}`,
    );

    if (data.errors?.length) {
      throw createAparatApiError(
        data.errors[0]?.detail ?? "Channel not found",
        404,
        data.errors,
      );
    }

    const profile = data.profile ? normalizeChannelProfile(data.profile) : null;

    if (!profile) {
      throw createAparatApiError("Channel profile is unavailable", 404);
    }

    return profile;
  } catch (error) {
    if (isAparatApiError(error)) throw error;

    throw createAparatApiError("Failed to load channel profile");
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

  if (query) return searchChannelVideos({ username, query, page, perPage });

  const profile = await getChannelProfile(username).catch(() => null);
  const offset = (page - 1) * perPage;
  const { videos, ui } = await fetchChannelVideosPage({
    username,
    perPage,
    offset,
  });

  const totalItems = profile?.videoCount ?? null;

  return {
    videos,
    query: "",
    pagination: buildPagination({
      page,
      perPage,
      totalItems,
      ui,
      itemCount: videos.length,
    }),
  };
};

export const getVideoByUid = async (uid: string): Promise<VideoDetail> => {
  const trimmed = uid.trim();

  if (!trimmed) throw createAparatApiError("Video identifier is required", 400);

  try {
    const { data } = await aparatClient.get<
      VideoResponse & { errors?: Array<{ status?: number; detail?: string }> }
    >(`/video/videohash/${encodeURIComponent(trimmed)}`);

    if (data.errors?.length) {
      throw createAparatApiError(
        data.errors[0]?.detail ?? "Video not found",
        404,
        data.errors,
      );
    }

    const video = data.video ? normalizeVideoDetail(data.video) : null;

    if (!video) throw createAparatApiError("Video not found", 404);

    return video;
  } catch (error) {
    if (isAparatApiError(error)) {
      if (error.status === 404) {
        throw createAparatApiError("Video not found", 404, error.details);
      }

      throw error;
    }

    throw createAparatApiError("Failed to load video", 500);
  }
};
