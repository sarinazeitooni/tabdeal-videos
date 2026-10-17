import type { ChannelProfile, VideoDetail } from "@/features/videos/types/video.types";
import {
  formatVisitCount,
  toPersianDigits,
} from "@/features/videos/utils/normalizeVideo";
import { VideoPlayer } from "@/features/videos/components/VideoPlayer";
import { t } from "@/shared/i18n";
import { ChannelAvatar } from "@/shared/ui/ChannelAvatar";

interface VideoDetailsProps {
  video: VideoDetail;
  channel?: ChannelProfile | null;
}

export function VideoDetails({ video, channel }: VideoDetailsProps) {
  const channelName = channel?.name || video.senderName || t("listing.channelNameFallback");

  return (
    <div className="flex flex-col gap-6">
      <VideoPlayer frameUrl={video.frame} title={video.title} />

      <div className="flex flex-col gap-4">
        <h1 className="text-page-title font-bold text-text-primary">{video.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <ChannelAvatar size="lg" />
            <div>
              <p className="text-body font-semibold text-text-primary">{channelName}</p>
              {channel?.followerCount ? (
                <p className="text-caption text-text-muted">
                  {t("video.followers", {
                    count: toPersianDigits(channel.followerCount),
                  })}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-caption text-text-muted">
            <span>{t("video.views", { count: formatVisitCount(video.visitCount) })}</span>
            {video.relativeTime ? <span>• {video.relativeTime}</span> : null}
            {video.likeCount > 0 ? (
              <span>• {t("video.likes", { count: toPersianDigits(video.likeCount) })}</span>
            ) : null}
          </div>
        </div>

        {(video.description || video.tags.length > 0 || video.catName) && (
          <section className="rounded-2xl bg-surface-elevated p-5">
            {video.catName ? (
              <p className="mb-3 text-caption text-text-muted">
                {t("video.category", { name: video.catName })}
              </p>
            ) : null}
            {video.description ? (
              <p className="whitespace-pre-wrap text-body leading-8 text-text-secondary">
                {video.description}
              </p>
            ) : (
              <p className="text-body text-text-muted">{t("video.noDescription")}</p>
            )}
            {video.tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface px-3 py-1 text-caption text-text-secondary"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
}
