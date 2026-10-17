import type { PaginationMeta } from "@/shared/types/pagination";

export interface VideoSummary {
  id: string;
  uid: string;
  title: string;
  username: string;
  senderName: string;
  visitCount: number;
  duration: number;
  durationLabel: string;
  publishedAt: string;
  relativeTime: string;
  bigPoster: string;
  smallPoster: string;
  profilePhoto: string;
  frame: string;
}

export interface VideoDetail extends VideoSummary {
  description: string;
  tags: string[];
  likeCount: number;
  catName: string;
  official: boolean;
}

export interface ChannelProfile {
  username: string;
  name: string;
  description: string;
  videoCount: number;
  followerCount: string;
  picSmall: string;
  picMedium: string;
  picLarge: string;
  coverSrc: string | null;
  official: boolean;
}

export interface VideoPagination extends PaginationMeta {
  perPage: number;
  totalItems: number | null;
  nextOffset: number | null;
  previousOffset: number | null;
}

export interface VideoListResult {
  videos: VideoSummary[];
  pagination: VideoPagination;
  query: string;
}

export interface AparatVideoRaw {
  id?: string | number;
  title?: string;
  username?: string;
  userid?: string | number;
  visit_cnt?: string | number;
  uid?: string;
  process?: string;
  sender_name?: string;
  big_poster?: string;
  small_poster?: string;
  profilePhoto?: string;
  duration?: string | number;
  sdate?: string;
  create_date?: string;
  sdate_timediff?: number;
  frame?: string;
  official?: string;
  tags?: string[] | null;
  tag_str?: string | null;
  description?: string | null;
  cat_name?: string;
  like_cnt?: string | number;
}

export interface AparatUiPaging {
  pagingForward?: string | null;
  pagingBack?: string | null;
}

export interface AparatProfileRaw {
  pic_s?: string;
  pic_m?: string;
  pic_b?: string;
  username?: string;
  name?: string;
  video_cnt?: string | number;
  follower_cnt?: string;
  descr?: string;
  official?: string;
  cover_src?: string | null;
}
