import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getChannelProfile,
  getVideoByUid,
  VideoDetails,
} from "@/features/videos";
import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { GradientHeader } from "@/shared/layout/GradientHeader";
import { BrandLogo } from "@/shared/ui/BrandLogo";
import { Container } from "@/shared/ui/Container";
import { isAparatApiError } from "@/shared/lib/axios";

interface VideoPageProps {
  params: Promise<{ uid: string }>;
}

export const generateMetadata = async ({
  params,
}: VideoPageProps): Promise<Metadata> => {
  const { uid } = await params;

  try {
    const video = await getVideoByUid(uid);

    return {
      title: video.title,
      description:
        video.description || t("video.metadataWatch", { title: video.title }),
      openGraph: {
        title: video.title,
        description: video.description || undefined,
        images: video.bigPoster ? [{ url: video.bigPoster }] : undefined,
        type: "video.other",
      },
    };
  } catch {
    return {
      title: t("video.notFoundTitle"),
      description: siteConfig.description,
    };
  }
};

const VideoPage = async ({ params }: VideoPageProps) => {
  const { uid } = await params;

  let video = null;
  let channel = null;

  try {
    [video, channel] = await Promise.all([
      getVideoByUid(uid),
      getChannelProfile().catch(() => null),
    ]);
  } catch (error) {
    if (isAparatApiError(error) && error.status === 404) notFound();

    throw error;
  }

  if (!video) notFound();

  return (
    <div className="pb-12">
      <GradientHeader contentClassName="flex items-center justify-start py-4 sm:py-5">
        <BrandLogo href="/videos" priority />
      </GradientHeader>

      <Container className="pt-6 sm:pt-8">
        <VideoDetails video={video} channel={channel} />
      </Container>
    </div>
  );
};

export default VideoPage;
