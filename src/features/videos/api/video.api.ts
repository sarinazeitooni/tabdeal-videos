import { aparatPaths } from "@/features/videos/api/aparat.paths";
import {
  aparatGet,
  assertNoAparatErrors,
  rethrowAparatError,
} from "@/features/videos/api/aparat.request";
import type {
  AparatVideoRaw,
  VideoDetail,
} from "@/features/videos/types/video.types";
import { normalizeVideoDetail } from "@/features/videos/utils/normalizeVideo";
import {
  createAparatApiError,
  isAparatApiError,
} from "@/shared/lib/axios";

interface VideoResponse {
  video?: AparatVideoRaw | null;
  errors?: Array<{ status?: number; detail?: string }>;
}

export const getVideoByUid = async (uid: string): Promise<VideoDetail> => {
  const trimmed = uid.trim();

  if (!trimmed) {
    throw createAparatApiError("Video identifier is required", 400);
  }

  try {
    const data = await aparatGet<VideoResponse>(aparatPaths.video(trimmed));

    assertNoAparatErrors(data, "Video not found");

    const video = data.video ? normalizeVideoDetail(data.video) : null;

    if (!video) throw createAparatApiError("Video not found", 404);

    return video;
  } catch (error) {
    if (isAparatApiError(error) && error.status === 404) {
      throw createAparatApiError("Video not found", 404, error.details);
    }

    return rethrowAparatError(error, "Failed to load video");
  }
};
