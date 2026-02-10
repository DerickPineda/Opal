import { supabase } from './supabase';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { generateVideoThumbnail } from './generateVideoThumbnail';
import { uploadThumbnail } from './uploadThumbnail';
type uploadVideoProps = {
  uri: string;
  userId: string;
};

// We are going to upload metadata to the supabase table
// We then save the actual file to the supabase storage

// Supabase needs an ArrayBuffer to be used to properly upload videos to storage
export async function uploadVideo({ uri, userId }: uploadVideoProps): Promise<{
  videoPath: string;
  thumbnailPath: string | null;
}> {
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
  if (error || !data?.path)
    throw new Error('Upload succeeded but no path returned');

  // We are now going to try and upload the video thumbnail uri
  const thumbnailPath = await uploadThumbnail({ userId, videoUri: uri });

  // Return both fileName (video path) and thumbnailPath
  return {
    videoPath: data.path,
    thumbnailPath,
  };
}
