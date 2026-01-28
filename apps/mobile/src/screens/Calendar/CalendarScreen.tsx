import { View, Text } from 'react-native';
import { BottomTabs } from '../../navigation/BottomNavigationTab';
import { Navigation } from '../../navigation/types';
import { MonthSection } from './MonthSection';
import { Video } from './types';

interface CalendarScreenProps {
  navigation: Navigation;
}

// Example data to test with
const videosByDate: Record<string, Video> = {
  '2026-01-01': {
    id: 'vid-1',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://picsum.photos/id/1011/200/200',
  },
  '2026-01-03': {
    id: 'vid-2',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://picsum.photos/id/1025/200/200',
  },
  '2026-01-07': {
    id: 'vid-3',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnailUrl: 'https://picsum.photos/id/1035/200/200',
  },
  '2026-01-14': {
    id: 'vid-4',
    videoUrl: 'https://example.com/video4.mp4',
    thumbnailUrl: 'https://picsum.photos/id/1043/200/200',
  },
  '2026-01-21': {
    id: 'vid-5',
    videoUrl: 'https://example.com/video5.mp4',
    thumbnailUrl: 'https://picsum.photos/id/1050/200/200',
  },
};

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  return (
    <View className='flex-1 bg-opal-darkest'>
      <View className='flex-1 items-center justify-center'>
        <MonthSection currentDate={new Date()} videosByDate={videosByDate} />
      </View>

      {/* Bottom Tabs */}
      <BottomTabs navigation={navigation} />
    </View>
  );
}
