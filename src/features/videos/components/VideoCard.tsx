import Image from "next/image";
import Link from "next/link";

import type { VideoSummary } from "@/features/videos/types/video.types";
import {
  formatVisitCount,
  toPersianDigits,
} from "@/features/videos/utils/normalizeVideo";
import { t } from "@/shared/i18n";
import { ChannelAvatar } from "@/shared/ui/ChannelAvatar";

interface VideoCardProps {
  video: VideoSummary;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const poster = video.bigPoster || video.smallPoster;

  return (
    <article className="flex w-full min-w-0 flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <Link
        href={`/videos/${video.uid}`}
        className="relative block w-full min-w-0 overflow-hidden rounded-lg bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-surface-muted">
          {poster ? (
            <Image
              src={poster}
              alt={video.title}
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(50vw - 40px), 33vw"
              className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              {t("video.noPoster")}
            </div>
          )}

          <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-caption font-medium text-white tabular-nums">
            {toPersianDigits(video.durationLabel)}
          </span>
        </div>
      </Link>

      <div className="flex min-w-0 flex-col gap-2">
        <Link
          href={`/videos/${video.uid}`}
          className="line-clamp-2 min-w-0 break-words text-video-title font-semibold text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {video.title}
        </Link>

        <div className="flex min-w-0 items-center gap-2">
          <ChannelAvatar size="sm" />
          <p className="truncate text-caption font-medium text-text-secondary">
            {video.senderName || t("listing.channelNameFallback")}
          </p>
        </div>

        <p className="text-caption text-text-muted">
          {t("video.views", { count: formatVisitCount(video.visitCount) })}
          {video.relativeTime ? ` - ${video.relativeTime}` : null}
        </p>
      </div>
    </article>
  );
};
