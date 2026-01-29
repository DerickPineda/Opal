import { MonthSection } from './MonthSection';
import { Video, VideosByDate } from './types';
import { ScrollView } from 'react-native';

type CalendarGridProps = {
  months: Date[];
  videosByDate: VideosByDate;
  onDayPress: (video?: Video) => void;
};
export function CalendarGrid({
  months,
  videosByDate,
  onDayPress,
}: CalendarGridProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {months.map((month) => (
        <MonthSection
          key={month.toISOString()}
          currentDate={month}
          videosByDate={videosByDate}
          onDayPress={onDayPress}
        />
      ))}
    </ScrollView>
  );
}
