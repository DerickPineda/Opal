import { supabase } from './supabase';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
type uploadVideoProps = {
  uri: string;
  userId: string;
};

// We are going to upload metadata to the supabase table
// We then save the actual file to the supabase storage

// Supabase needs an ArrayBuffer to be used to properly upload videos to storage
export async function uploadVideo({
  uri,
  userId,
}: uploadVideoProps): Promise<string> {
  // Read file as base64
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Convert base64 string to ArrayBuffer
  const buffer = decode(base64);

  // Upload to supabase storage
  const fileName = `${userId}/${Date.now()}.mp4`;
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, buffer, { contentType: 'video/mp4' });

  // Catch any errors
  if (!data?.path) throw new Error('Upliad succeeded but no path returned');

  return data?.path;
}
