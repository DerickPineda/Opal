import { Navigation } from '../navigation/types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState } from 'react';
import { publishVideo } from '../services/publishVideo';

interface EditVideoScreenProps {
  userId: string;
  navigation: Navigation;
  videoUri: string;
}

export function EditVideoScreen({
  userId,
  navigation,
  videoUri,
}: EditVideoScreenProps) {
  const [uploading, setUploading] = useState(false);
  // This is going to allow us to view
  const videoPlayer = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });

  const handleUpload = async () => {
    setUploading(true);
    try {
      await publishVideo({ userId, uri: videoUri });
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className='flex-1 bg-opal-darkest'>
      {/* Video preview */}
      <VideoView
        player={videoPlayer}
        style={{ flex: 1 }}
        nativeControls={true}
        contentFit='cover'
      />

      {/* Action buttons */}
      <View className='flex-row px-8 pb-5 gap-4 pt-2'>
        <TouchableOpacity
          className='flex-1 bg-transparent border-2 border-opal-light rounded-full py-3'
          onPress={() => navigation.navigate('Record')}
        >
          <Text className='text-opal-light text-center font-semibold text-lg'>
            Re-record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-1 bg-opal-light rounded-full py-3'
          disabled={uploading}
          onPress={handleUpload}
        >
          <Text className='text-opal-darkest text-center font-semibold text-lg'>
            {uploading ? 'Uploading...' : 'Upload'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
