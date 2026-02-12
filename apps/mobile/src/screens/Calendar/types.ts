import { VideoUI } from '../../services/videos';

export type Video = {
  id: string;
  date: Date;
  videoUrl: string;
  thumbnail_path: string;
};

export type VideosByDate = Record<string, VideoUI>;
