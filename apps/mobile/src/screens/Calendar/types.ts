export type Video = {
  id: string;
  date: Date;
  videoUrl: string;
  thumbnailUrl?: string;
};

export type VideosByDate = Record<string, Video>;
