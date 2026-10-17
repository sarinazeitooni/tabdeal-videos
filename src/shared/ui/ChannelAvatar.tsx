import { t } from "@/shared/i18n";

interface ChannelAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

export const ChannelAvatar = ({
  size = "sm",
  className = "",
}: ChannelAvatarProps) => (
  <span
    role="img"
    aria-label={t("video.avatarAlt")}
    className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted ring-1 ring-border ${sizeClasses[size]} ${className}`.trim()}
  >
    <svg
      viewBox="0 0 40 40"
      className="h-full w-full text-text-muted"
      aria-hidden
    >
      <rect width="40" height="40" fill="currentColor" opacity="0.15" />
      <circle cx="20" cy="15" r="7" fill="currentColor" opacity="0.55" />
      <path
        d="M8 34c2.5-7 8-10 12-10s9.5 3 12 10"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  </span>
);
