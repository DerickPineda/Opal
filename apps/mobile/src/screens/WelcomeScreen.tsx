import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LightPillar } from '../components/LightPillar';
import { colors } from '../constants/colors';

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View className='flex-1'>
      <LightPillar
        topColor={colors.opal.light}
        bottomColor={colors.opal.darkest}
        pillarCount={7}
      />

      <View className='flex-1 justify-center items-center px-8 z-10'>
        <View className='items-center mb-16'>
          <Text className='text-6xl font-bold text-opal-light mb-4'>Opal</Text>
          <Text className='text-lg text-opal text-center leading-7'>
            Whether self reflection or self therapy.{'\n'}
            Let Opal be a mirror into your day to day.
          </Text>
        </View>

        <View className='w-full max-w-sm'>
          <TouchableOpacity
            className='bg-opal-light rounded-full py-4 mb-4'
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text className='text-opal-darkest text-center text-lg font-semibold'>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-transparent border-2 border-opal-light rounded-full py-4'
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text className='text-opal-light text-center text-lg font-semibold'>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
