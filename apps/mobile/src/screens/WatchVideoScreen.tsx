import { useVideoPlayer, VideoView } from 'expo-video';
import { Navigation } from '../navigation/types';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Video } from './Calendar/types';

type WatchVideoScreenProps = {
  videoId: string;
  navigation: Navigation;
};

export function WatchVideoScreen({
  videoId,
  navigation,
}: WatchVideoScreenProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setIsLoading] = useState(true);

  const videoPlayer = useVideoPlayer(video?.videoUrl ?? '');

  // Fetch the video everytime we load into the screen
  // We are also going to create a thumbnail to display
  useEffect(() => {
    async function loadVideo() {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', videoId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setVideo(data);
      setIsLoading(false);
    }

    loadVideo();
  }, [videoId]);

  if (loading || !video) return;

  return (
    <VideoView
      style={{ flex: 1 }}
      player={videoPlayer}
      contentFit='cover'
      nativeControls
    />
  );
}
