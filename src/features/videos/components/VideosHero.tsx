import { VideoSearch } from "@/features/videos/components/VideoSearch";
import { GradientHeader } from "@/shared/layout/GradientHeader";
import { BrandLogo } from "@/shared/ui/BrandLogo";

interface VideosHeroProps {
  initialQuery?: string;
}

export const VideosHero = ({ initialQuery = "" }: VideosHeroProps) => (
  <GradientHeader
    className="mb-12 md:mb-16"
    contentClassName="flex flex-col gap-4 py-5 sm:gap-5 sm:py-6 md:gap-6 md:py-8"
  >
    <div className="flex  justify-start">
      <BrandLogo priority />
    </div>
    <VideoSearch initialQuery={initialQuery} />
  </GradientHeader>
);
