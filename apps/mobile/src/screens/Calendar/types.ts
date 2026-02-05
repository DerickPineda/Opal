export type Video = {
  id: string;
  date: Date;
  videoUrl: string;
};

export type VideosByDate = Record<string, Video>;
