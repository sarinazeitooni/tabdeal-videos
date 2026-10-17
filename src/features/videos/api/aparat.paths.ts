export const aparatPaths = {
  profile: (username: string) =>
    `/profile/username/${encodeURIComponent(username)}`,

  videoByUser: (username: string, perPage: number, offset = 0) => {
    const base = `/videoByUser/username/${encodeURIComponent(username)}/perpage/${perPage}`;
    return offset > 0 ? `${base}/curoffset/${offset}` : base;
  },

  video: (uid: string) => `/video/videohash/${encodeURIComponent(uid)}`,
} as const;
