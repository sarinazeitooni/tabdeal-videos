import type { VideoSummary } from "@/features/videos/types/video.types";
import { VideoCard } from "@/features/videos/components/VideoCard";
import { t } from "@/shared/i18n";

interface VideoListProps {
  videos: VideoSummary[];
}

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/50 px-6 py-16 text-center">
        <p className="text-section-title font-semibold text-text-primary">
          {t("video.emptyTitle")}
        </p>
        <p className="mt-2 text-body text-text-secondary">{t("video.emptyDescription")}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <li key={video.uid}>
          <VideoCard video={video} />
        </li>
      ))}
    </ul>
  );
}
