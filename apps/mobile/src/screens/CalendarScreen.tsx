import { View, Text } from 'react-native';
import { BottomTabs } from '../navigation/BottomNavigationTab';
import { Navigation } from '../navigation/types';
interface CalendarScreenProps {
  navigation: Navigation;
}

export function CalendarScreen({ navigation }: CalendarScreenProps) {
  return (
    <View className='flex-1 bg-opal-darkest'>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-opal-light text-2xl'>Calendar Screen</Text>
      </View>

      {/* Bottom Tabs */}
      <BottomTabs navigation={navigation} />
    </View>
  );
}
