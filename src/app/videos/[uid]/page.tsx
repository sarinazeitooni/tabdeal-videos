import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getChannelProfile,
  getVideoByUid,
  VideoDetails,
} from "@/features/videos";
import { siteConfig } from "@/shared/config/site";
import { t } from "@/shared/i18n";
import { Container } from "@/shared/ui/Container";
import { AparatApiError } from "@/shared/lib/axios";

interface VideoPageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { uid } = await params;

  try {
    const video = await getVideoByUid(uid);

    return {
      title: video.title,
      description: video.description || t("video.metadataWatch", { title: video.title }),
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
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { uid } = await params;

  let video = null;
  let channel = null;

  try {
    [video, channel] = await Promise.all([
      getVideoByUid(uid),
      getChannelProfile().catch(() => null),
    ]);
  } catch (error) {
    if (error instanceof AparatApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  if (!video) {
    notFound();
  }

  return (
    <div className="pb-12 pt-6 sm:pt-8">
      <Container>
        <VideoDetails video={video} channel={channel} />
      </Container>
    </div>
  );
}
