import { View, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { colors } from '../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Navigation } from '../navigation/types';
import { useVideoRecorder } from '../camera/useVideoRecorder';

interface UploadVideoScreenProps {
  navigation: Navigation;
}

export function UploadVideoScreen({ navigation }: UploadVideoScreenProps) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [timer, setTimer] = useState<number>(60);

  const { cameraRef, startRecording, stopRecording, videoUri, recording } =
    useVideoRecorder(
      // Place callback function here when it is written
      (uri) => {
        console.log('Passing URI into EditVideoScreen');
        // Navigate to EditVideoScreen and pass in the videoUri and Navigation as props so we can edit.
        // We will then upload the video from there into the backend for processing once the user edits the video
        navigation.navigate('Edit', { videoUri: uri });
      }
    );

  //This is strictly to show the timer when user is recording, function below is just to format it
  useEffect(() => {
    if (!recording) return;

    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          stopRecording();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        <Text className='text-opal-light mb-2 text-lg font-semibold'>
          {recording ? formatTime(timer) : `1:00`}
        </Text>
        <TouchableOpacity
          className='rounded-full w-20 h-20 bg-opal-dark items-center justify-center'
          onPress={recording ? stopRecording : startRecording}
        >
          <View
            className={`${recording ? 'w-12 h-12 aspect-square rounded-md' : 'w-16 h-16 rounded-full'} bg-opal-light`}
          />
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
      <CameraView
        className='flex-1'
        facing={facing}
        mode='video'
        ref={cameraRef}
      />
    </View>
  );
}
