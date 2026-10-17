import type { VideoSummary } from "@/features/videos/types/video.types";
import { VideoCard } from "@/features/videos/components/VideoCard";
import { t } from "@/shared/i18n";

interface VideoListProps {
  videos: VideoSummary[];
}

export const VideoList = ({ videos }: VideoListProps) => {
  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-elevated/50 px-6 py-16 text-center">
        <p className="text-heading font-bold text-text-primary md:text-heading-lg">
          {t("video.emptyTitle")}
        </p>
        <p className="mt-2 text-body font-normal text-text-secondary">
          {t("video.emptyDescription")}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid  grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
      {videos.map((video) => (
        <li key={video.uid} className="">
          <VideoCard video={video} />
        </li>
      ))}
    </ul>
  );
};
