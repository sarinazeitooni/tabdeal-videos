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

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 20.5s-7.5-4.35-7.5-9.2A4.3 4.3 0 0 1 12 7.85a4.3 4.3 0 0 1 7.5 3.45c0 4.85-7.5 9.2-7.5 9.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const VideoDetails = ({ video, channel }: VideoDetailsProps) => {
  const channelName =
    channel?.name || video.senderName || t("listing.channelNameFallback");

  const metaItems = [
    t("video.views", { count: formatVisitCount(video.visitCount) }),
    video.relativeTime || null,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-5">
      <VideoPlayer frameUrl={video.frame} title={video.title} />

      <h1 className="text-page-title font-bold text-text-primary">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChannelAvatar size="lg" />
          <div>
            <p className="text-body font-semibold text-text-primary">
              {channelName}
            </p>
            {channel?.followerCount ? (
              <p className="text-caption text-text-muted">
                {t("video.followers", {
                  count: toPersianDigits(channel.followerCount),
                })}
              </p>
            ) : null}
          </div>
        </div>

        <div
          className="inline-flex items-center gap-2 rounded-lg bg-surface-like px-3 py-2 text-body text-text-primary"
          aria-label={t("video.likes", {
            count: toPersianDigits(video.likeCount),
          })}
        >
          <HeartIcon />
          <span className="tabular-nums">
            {toPersianDigits(video.likeCount)}
          </span>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        {metaItems.length > 0 || video.tags.length > 0 ? (
          <p className="text-caption text-text-muted">
            {metaItems.join(" . ")}
            {metaItems.length > 0 && video.tags.length > 0 ? " . " : null}
            {video.tags.map((tag, index) => (
              <span key={tag}>
                {index > 0 ? (
                  <span className="text-text-muted">{" . "}</span>
                ) : null}
                <span className="text-tag">#{tag}</span>
              </span>
            ))}
          </p>
        ) : null}

        {video.description ? (
          <p className="whitespace-pre-wrap text-body leading-8 text-text-secondary">
            {video.description}
          </p>
        ) : (
          <p className="text-body text-text-muted">{t("video.noDescription")}</p>
        )}
      </section>
    </div>
  );
};
