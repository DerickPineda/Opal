import { Video } from './types';
import { TouchableOpacity, View, Text, Image } from 'react-native';
type DayCellProps = {
  day: number;
  video?: Video;
  onPress?: () => void;
};

export function DayCell({ day, video, onPress }: DayCellProps) {
  // Grab the current day
  const currentDay = new Date().getDate();
  const isFuture = currentDay < day;

  return (
    <TouchableOpacity
      onPress={onPress}
      className='w-[14.28%] aspect-square rounded-lg overflow-hidden bg-opal-darkest'
    >
      {video ? (
        <Image source={{ uri: video.thumbnailUrl }} className='w-full h-full' />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text
            className={`${currentDay === day ? 'text-orange-400' : 'text-opal-light'} text-sm ${isFuture ? 'opacity-40' : ''}`}
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
          className={`${currentDay === day ? 'text-orange-400' : 'text-white'} text-xs`}
        >
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
