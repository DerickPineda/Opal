import { useVideoPlayer, VideoView } from 'expo-video';
import { Navigation } from '../navigation/types';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { VideoUI } from '../services/videos';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';

type WatchVideoScreenProps = {
  video: VideoUI;
  navigation: Navigation;
};

export function WatchVideoScreen({ video, navigation }: WatchVideoScreenProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(true);

  const videoPlayer = useVideoPlayer(videoUrl ?? ' ');
  // Fetch the video everytime we load into the screen
  // We are also going to create a thumbnail to display
  useEffect(() => {
    async function loadVideoUrl() {
      const { data, error } = await supabase.storage
        .from('videos')
        .createSignedUrl(video.path, 60 * 60);

      if (error) {
        console.error('Signed URL error:', error.message);
        setIsLoading(false);
        return;
      }

      setVideoUrl(data.signedUrl);
      setIsLoading(false);
    }

    loadVideoUrl();
  }, [video.path]);

  if (loading || !videoUrl || !videoPlayer) {
    return (
      <View className='flex-1 bg-opal-darkest justify-center items-center'>
        <ActivityIndicator size='large' color={colors.opal.light} />
      </View>
    );
  }
  return (
    <View className='flex-1 bg-opal-darkest'>
      {/* Back Arrow Button */}
      <View pointerEvents='box-none' className='absolute inset-0 z-50'>
        <TouchableOpacity
          className='absolute top-14 left-5'
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name='return-down-back'
            size={50}
            color={colors.opal.light}
          />
        </TouchableOpacity>
      </View>
      <VideoView
        style={{ flex: 1 }}
        player={videoPlayer}
        contentFit='cover'
        nativeControls={true}
      />
    </View>
  );
}
