import { t } from "@/shared/i18n";

interface VideoPlayerProps {
  frameUrl: string;
  title: string;
}

export const VideoPlayer = ({ frameUrl, title }: VideoPlayerProps) => {
  if (!frameUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-surface-elevated text-body text-text-secondary">
        {t("video.playerUnavailable")}
      </div>
    );
  }

  const embedUrl = frameUrl.includes("?")
    ? `${frameUrl}&titleShow=true&recom=no`
    : `${frameUrl}?titleShow=true&recom=no`;

  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-player">
      <div className="relative aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
