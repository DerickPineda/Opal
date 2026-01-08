import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';
import { BottomTabs } from '../navigation/BottomNavigationTab';
import { Navigation } from '../navigation/types';
interface HomeScreenProps {
  navigation: Navigation;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View className='flex-1 bg-opal-darkest'>
      {/* Simple tab bar */}
      <View className='flex-1 justify-center items-center px-8'>
        <Text className='text-opal-light text-4xl font-bold mb-4'>
          🎉 Welcome to Opal!
        </Text>
        <Text className='text-opal text-center text-lg mb-8'>
          This is your home screen.{'\n'}
          Next: We'll add video recording!
        </Text>
        <TouchableOpacity
          className='bg-opal-light rounded-full px-8 py-3'
          onPress={handleSignOut}
        >
          <Text className='text-opal-darkest font-semibold text-lg'>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <BottomTabs navigation={navigation} />
    </View>
  );
};
