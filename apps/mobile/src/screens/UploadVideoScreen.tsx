import { View, Text, TouchableOpacity, Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from 'expo-camera';
import { BottomTabs } from '../navigation/BottomNavigationTab';
import { colors } from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Navigation } from '../navigation/types';

interface UploadVideoScreenProps {
  navigation: Navigation;
}

export function UploadVideoScreen({ navigation }: UploadVideoScreenProps) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <ActivityIndicator size='large' color={colors.opal.light} />;
  }

  if (!permission.granted) {
    // Camera permission are not granted
    return (
      <View className='flex-1 justify-center items-center bg-opal-darkest px-8'>
        <Text className='text-opal-light text-lg text-center mb-4'>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          className='bg-opal-light rounded-full px-7 py-6'
          onPress={requestPermission}
        >
          <Text className='text-opal-darkest font-semibold'>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View className='flex-1 bg-opal-darkest'>
      {/* Back Arrow Button */}
      <View pointerEvents='box-none' className='absolute inset-0 z-50'>
        <TouchableOpacity
          className='absolute top-14 left-5'
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name='return-down-back'
            size={50}
            color={colors.opal.light}
          />
        </TouchableOpacity>
      </View>

      {/* Record button and camera flip button - Bottom Middle */}
      <View className='absolute bottom-10 right-0 left-0 items-center z-50'>
        <TouchableOpacity
          className='rounded-full w-20 h-20 bg-opal-dark items-center justify-center'
          onPress={() =>
            // Need to add function to start recording
            console.log('Record')
          }
        >
          <View className='w-16 h-16 rounded-full bg-opal-light' />
        </TouchableOpacity>
      </View>

      {/* Camera Flip Button - Bottom right */}
      <TouchableOpacity
        className='absolute bottom-14 right-8 z-50'
        onPress={toggleCameraFacing}
      >
        <Ionicons name='camera-reverse' size={40} color={colors.opal.light} />
      </TouchableOpacity>

      {/* Native Camera Surface (No Touchables Inside They Will Not Work) */}
      <CameraView className='flex-1' facing={facing} mode='video' />
    </View>
  );
}
