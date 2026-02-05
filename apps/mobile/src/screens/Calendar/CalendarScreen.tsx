import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BottomTabs } from '../../navigation/BottomNavigationTab';
import { Navigation } from '../../navigation/types';
import { MonthSection } from './MonthSection';
import { CalendarGrid } from './CalendarGrid';
import { Video, VideosByDate } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  mapVideosByDate,
  retreiveUserVideos,
  VideoRow,
} from '../../services/videos';

type CalendarScreenProps = {
  userId: string;
  videos: VideoRow[];
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

export function CalendarScreen({
  userId,
  navigation,
  videos,
}: CalendarScreenProps) {
  const [videosByDate, setVideosByDate] = useState({});
  // Grab user videos to pass down
  useEffect(() => {
    async function loadVideos() {
      const mapped = mapVideosByDate(videos);
      setVideosByDate(mapped);
    }

    loadVideos();
  }, [videos]);

  // TODO:
  // We are using this as the start date to start generating months user can see their videos
  // This may change to when users first downloaded the app but we will come back to that later
  const APP_START_DATE = new Date(2026, 0, 1);
  const today = new Date();
  const months = generateMonths(APP_START_DATE, today);

  const handleDayPress = (video?: Video) => {
    if (!video) return;

    navigation.navigate('View_Video', {
      video: video,
    });
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
