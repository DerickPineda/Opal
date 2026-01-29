import { View, Text } from 'react-native';
import { BottomTabs } from '../../navigation/BottomNavigationTab';
import { Navigation } from '../../navigation/types';
import { MonthSection } from './MonthSection';
import { CalendarGrid } from './CalendarGrid';
import { Video, VideosByDate } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';

type CalendarScreenProps = {
  navigation: Navigation;
};

// We are using thisn function to get the number of months we are going to load into MonthSection
// We may neex to move this out of CalendarScreen if we start reuing elsewhere or it starts gaining more responsibilty
function generateMonths(start: Date, end: Date): Date[] {
  const months: Date[] = [];
  const current = new Date(start);

  current.setDate(1);

  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  // TODO:
  // We are using this as the start date to start generating months user can see their videos
  // This may change to when users first downloaded the app but we will come back to that later
  const APP_START_DATE = new Date(2025, 0, 1);
  const today = new Date();
  const months = generateMonths(APP_START_DATE, today);

  // TEMP: hardcoded test data
  // We will grab this from the backend -- will come back just testing for now
  const videosByDate: VideosByDate = {
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

  const handleDayPress = (video?: Video) => {
    if (!video) return;

    navigation.navigate('View_Video', { videoId: video.id });
  };

  return (
    <SafeAreaView className='flex-1 bg-opal-darkest' edges={['top']}>
      <View className='flex-1 items-center justify-center'>
        <CalendarGrid
          months={months}
          videosByDate={videosByDate}
          onDayPress={handleDayPress}
        />
      </View>

      {/* Bottom Tabs */}
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
