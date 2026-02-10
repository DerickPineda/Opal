import { supabase } from './supabase';
import { SUPABASE_URL } from '../config/env';
export type VideoRow = {
  id: string;
  user_id: string;
  path: string;
  created_at: string;
  thumbnail_path: string;
};

export type VideoUI = {
  id: string;
  date: Date;
  path: string;
  thumbnailUrl: string | null;

  // Keeping for the time being in case needed in the future
  videoUrl?: string;
};

export async function retreiveUserVideos(userId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('id, user_id, created_at, path, thumbnail_path')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos!', error);
    throw error;
  }

  return data as VideoRow[];
}

export function mapVideosByDate(rows: VideoRow[]): Record<string, VideoUI> {
  const map: Record<string, VideoUI> = {};

  for (const row of rows) {
    const date = new Date(row.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
    const thumbNailURL = row.thumbnail_path
      ? `${SUPABASE_URL}/storage/v1/object/public/thumbnails/${row.thumbnail_path}`
      : null;

    map[key] = {
      id: row.id,
      date,
      path: row.path,
      thumbnailUrl: thumbNailURL,
    };
  }

  return map;
}
