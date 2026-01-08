import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Navigation } from './types';

export function BottomTabs({ navigation }: { navigation: Navigation }) {
  return (
    <View className='flex-row bg-opal-darker border-t border-opal-dark'>
      {/* Home */}
      <TouchableOpacity
        className='flex-1 py-4 items-center'
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name='home' color={colors.opal.light} size={32} />
        <Text className='text-opal-light'>Home</Text>
      </TouchableOpacity>

      {/* Record */}
      <TouchableOpacity
        className='flex-1 py-4 items-center'
        onPress={() => navigation.navigate('Record')}
      >
        <MaterialCommunityIcons
          name='record-circle-outline'
          color={colors.opal.light}
          size={32}
        />
        <Text className='text-opal'>Record</Text>
      </TouchableOpacity>

      {/* Calendar */}
      <TouchableOpacity
        className='flex-1 py-4 items-center'
        onPress={() => navigation.navigate('Calendar')}
      >
        <EvilIcons name='calendar' size={40} color={colors.opal.light} />
        <Text className='text-opal'>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------------ Was having trouble using react-navigation for naigating. So we're doing it manually for the time being. ------------------------

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { HomeScreen } from '../screens/HomeScreen';
// import { UploadVideoScreen } from '../screens/UploadVideoScreen';
// import { CalendarScreen } from 'src/screens/CalendarScreen';
// const Tab = createBottomTabNavigator();

// export function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#29342e',
//           borderTopColor: '#6b8077',
//         },
//         tabBarActiveTintColor: '#a5bfb6',
//         tabBarInactiveTintColor: '#6b8077',
//       }}
//     >
//       <Tab.Screen
//         name='Home'
//         component={HomeScreen}
//         options={{ tabBarLabel: 'Home' }}
//       />
//       <Tab.Screen
//         name='Upload'
//         component={UploadVideoScreen}
//         options={{ tabBarLabel: 'Record' }}
//       />
//       <Tab.Screen
//         name='Calendar'
//         component={CalendarScreen}
//         options={{ tabBarLabel: 'Calendar' }}
//       />
//     </Tab.Navigator>
//   );
// }
