import { supabase } from './supabase';

export type VideoRow = {
  id: string;
  user_id: string;
  path: string;
  created_at: string;
};

export type Video = {
  id: string;
  date: Date;
  storagePath: string;
  thumbnailUrl?: string;
};

export async function retreiveUserVideos(userId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('id, user_id, created_at, path')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos!', error);
    throw error;
  }

  return data as VideoRow[];
}

export function mapVideosByDate(rows: VideoRow[]): Record<string, Video> {
  const map: Record<string, Video> = {};

  for (const row of rows) {
    const date = new Date(row.created_at);
    const key = date.toISOString().split('T')[0];

    map[key] = {
      id: row.id,
      date,
      storagePath: row.path,
    };
  }

  return map;
}
