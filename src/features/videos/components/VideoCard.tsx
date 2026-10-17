import Image from "next/image";
import Link from "next/link";

import type { VideoSummary } from "@/features/videos/types/video.types";
import { formatVisitCount } from "@/features/videos/utils/normalizeVideo";
import { t } from "@/shared/i18n";
import { toPersianDigits } from "@/shared/lib/digits";
import { ChannelAvatar } from "@/shared/ui/ChannelAvatar";

interface VideoCardProps {
  video: VideoSummary;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const poster = video.bigPoster || video.smallPoster;

  return (
    <article className="flex w-full  flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
      <Link
        href={`/videos/${video.uid}`}
        className="relative block w-full  overflow-hidden rounded-lg bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
            <div className="flex h-full w-full items-center justify-center text-body-tight text-text-muted">
              {t("video.noPoster")}
            </div>
          )}

          <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-body-tight font-medium text-white tabular-nums">
            {toPersianDigits(video.durationLabel)}
          </span>
        </div>
      </Link>

      <div className="flex  flex-col gap-2">
        <Link
          href={`/videos/${video.uid}`}
          className=" break-words text-heading font-bold text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-heading-lg"
        >
          {video.title}
        </Link>

        <div className="flex  items-center gap-2">
          <ChannelAvatar size="sm" />
          <p className="truncate text-body-tight font-normal text-text-secondary">
            {video.senderName || t("listing.channelNameFallback")}
          </p>
        </div>

        <p className="text-body font-normal text-text-muted">
          {t("video.views", { count: formatVisitCount(video.visitCount) })}
          {video.relativeTime ? ` - ${video.relativeTime}` : null}
        </p>
      </div>
    </article>
  );
};
