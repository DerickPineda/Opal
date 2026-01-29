export type Video = {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
};

export type VideosByDate = Record<string, Video>;
