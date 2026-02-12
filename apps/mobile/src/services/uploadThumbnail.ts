import * as FileSystem from 'expo-file-system/legacy';
import { generateVideoThumbnail } from './generateVideoThumbnail';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';

type uploadThumbnailProps = {
  userId: string;
  videoUri: string;
};

export async function uploadThumbnail({
  userId,
  videoUri,
}: uploadThumbnailProps) {
  try {
    const thumbnailUri = await generateVideoThumbnail({ uri: videoUri });
    if (!thumbnailUri) return null;

    const base64 = await FileSystem.readAsStringAsync(thumbnailUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = decode(base64);

    const fileName = `${userId}/${Date.now()}_thumbnail.png`;

    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(fileName, buffer, { contentType: 'image/png' });

    if (error) throw error;

    return data?.path ?? null;
  } catch (error) {
    console.error('Error uploading thumbnail! ', error);
    return null;
  }
}
