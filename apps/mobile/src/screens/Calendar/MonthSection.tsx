import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Video } from './types';
import { DayCell } from './DayCell';

type MonthSectionProps = {
  currentDate: Date;
  videosByDate: Record<string, Video>;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

// This function will reeturn all the days in the month passed into function
// Using to accurately populate calendar
const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export function MonthSection({ currentDate, videosByDate }: MonthSectionProps) {
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const numberOfDays = daysInMonth(year, monthIndex);
  const firstDayOfMonth = new Date(year, monthIndex);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

  // Build the calendar cells array
  const totalCells = startOffset + numberOfDays;
  const cells = Array.from({ length: totalCells }, (_, index) => {
    if (index < startOffset) return null;
    return index - startOffset + 1;
  });

  return (
    <View className='mb-8'>
      {/* Month Title */}
      <Text className='text-opal-light text-2xl font-semibold mb-4 self-center'>
        {currentMonthName}
      </Text>

      {/* Weekday Labels */}
      <View className='flex-row mb-2'>
        {WEEKDAYS.map((day) => (
          <Text
            key={day}
            className='w-[14.28%] text-center text-opal-light opacity-50'
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className='flex-row flex-wrap'>
        {cells.map((day, index) => {
          if (!day) {
            return <View key={index} className='w-[14.28%] aspect-square' />;
          }

          const dateKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const video = videosByDate[dateKey];

          return (
            <DayCell
              key={index}
              day={day}
              video={video}
              onPress={() => {
                if (videosByDate[dateKey]) {
                  // Open video
                  console.log('Sending to view video screen');
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
