import { Navigation } from '../navigation/types';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors } from '../constants/colors';

interface EditVideoScreenProps {
  navigation: Navigation;
  videoUri: string;
}

export function EditVideoScreen({
  navigation,
  videoUri,
}: EditVideoScreenProps) {
  // This is going to allow us to view/edit the video
  const videoPlayer = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });
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
          onPress={() => {
            // TODO: Upload video to Supabase
            console.log('Upload video:', videoUri);
          }}
        >
          <Text className='text-opal-darkest text-center font-semibold text-lg'>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
