import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';

export const HomeScreen = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View className='flex-1 bg-[#171916] justify-center items-center px-8'>
      <Text className='text-[#a5bfb6] text-4xl font-bold mb-4'>
        🎉 Welcome to Opal!
      </Text>
      <Text className='text-[#90aaa1] text-center text-lg mb-8'>
        This is your home screen.{'\n'}
        Next: We'll add video recording!
      </Text>
      <TouchableOpacity
        className='bg-[#a5bfb6] rounded-full px-8 py-3'
        onPress={handleSignOut}
      >
        <Text className='text-[#171916] font-semibold text-lg'>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
