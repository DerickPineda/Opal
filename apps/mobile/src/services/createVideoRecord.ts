import { supabase } from './supabase';

// Here we will upload a record of the video we just created and uploaded to our supabase stoage.
type createVideoRecordProps = {
  userId: string;
  videoPath: string;
  thumbnailPath: string | null;
};

export async function createVideoRecord({
  userId,
  videoPath,
  thumbnailPath,
}: createVideoRecordProps) {
  const { data, error } = await supabase
    .from('videos')
    .insert({ user_id: userId, path: videoPath, thumbnail_path: thumbnailPath })
    .select()
    .single();

  if (error) {
    console.error('Error creating video record: ', error);
    throw error;
  }

  return data;
}
