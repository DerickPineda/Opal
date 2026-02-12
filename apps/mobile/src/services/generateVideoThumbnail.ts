import * as VideoThumbails from 'expo-video-thumbnails';

type generateVideoThumbnailsProps = {
  uri: string;
};

export async function generateVideoThumbnail({
  uri,
}: generateVideoThumbnailsProps) {
  try {
    const { uri: thumbnailUri } = await VideoThumbails.getThumbnailAsync(uri, {
      time: 10000,
    });

    return thumbnailUri;
  } catch (error) {
    console.error('Error creating thumbnail: ', error);
  }
}
