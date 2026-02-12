import { uploadVideo } from './uploadVideo';
import { createVideoRecord } from './createVideoRecord';

type publishVideoProps = {
  userId: string;
  uri: string;
};

export async function publishVideo({ userId, uri }: publishVideoProps) {
  // Upload video to storage bucket
  const { videoPath, thumbnailPath } = await uploadVideo({ uri, userId });
  // Then create a record of the video and return the data
  return createVideoRecord({ userId, videoPath, thumbnailPath });
}
