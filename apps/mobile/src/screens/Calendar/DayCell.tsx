import { Video } from './types';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { VideoUI } from '../../services/videos';
type DayCellProps = {
  day: number;
  month: number;
  year: number;
  video?: VideoUI;
  onDayPress: (video?: VideoUI) => void;
};

export function DayCell({ day, month, year, video, onDayPress }: DayCellProps) {
  const currentDate = new Date();
  const videoDate = new Date(year, month, day);
  // Grab the current day
  const currentDay = currentDate.getDate();
  // Use the month and year to only highlight today down below
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const isFuture = currentDate < videoDate;
  const isToday =
    currentDay === day && currentMonth === month && currentYear === year;

  return (
    <TouchableOpacity
      onPress={() => onDayPress(video)}
      className='w-[14.28%] aspect-square rounded-lg overflow-hidden bg-opal-darkest'
    >
      {video ? (
        <Image
          source={{ uri: video.thumbnailUrl! }}
          className='w-full h-full'
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text
            className={`${isToday ? 'text-orange-400' : 'text-opal-light'} text-sm ${isFuture ? 'opacity-40' : ''}`}
          >
            {day}
          </Text>
        </View>
      )}

      {/* Day number overlay */}
      <View
        className={`absolute top-1 left-1 bg-black/50 px-1.5 rounded ${video ? '' : 'hidden'}`}
      >
        <Text
          className={`${isToday ? 'text-orange-400' : 'text-white'} text-xs`}
        >
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
