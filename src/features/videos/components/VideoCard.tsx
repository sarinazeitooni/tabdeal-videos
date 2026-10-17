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

export function VideoCard({ video }: VideoCardProps) {
  const poster = video.bigPoster || video.smallPoster;

  return (
    <article className="group flex flex-col gap-3">
      <Link
        href={`/videos/${video.uid}`}
        className="relative block overflow-hidden rounded-xl bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-surface-muted">
          {poster ? (
            <Image
              src={poster}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              {t("video.noPoster")}
            </div>
          )}
          <span className="absolute bottom-2 left-2 rounded bg-black/80 px-1.5 py-0.5 text-caption font-medium text-white tabular-nums">
            {toPersianDigits(video.durationLabel)}
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-2 px-0.5">
        <Link
          href={`/videos/${video.uid}`}
          className="line-clamp-2 rounded-sm text-video-title font-semibold text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {video.title}
        </Link>

        <div className="flex items-start gap-2">
          <ChannelAvatar size="sm" className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption font-medium text-text-secondary">
              {video.senderName || t("listing.channelNameFallback")}
            </p>
            <p className="mt-0.5 text-caption text-text-muted">
              {t("video.views", { count: formatVisitCount(video.visitCount) })}
              {video.relativeTime ? ` • ${video.relativeTime}` : null}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
