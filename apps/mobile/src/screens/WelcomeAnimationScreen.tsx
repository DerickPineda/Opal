import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

interface WelcomeAnimationScreenProps {
  name: string;
  onComplete: () => void;
}

export const WelcomeAnimationScreen: React.FC<WelcomeAnimationScreenProps> = ({
  name,
  onComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(1500),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  }, []);

  return (
    <View className='flex-1 bg-opal-darkest justify-center items-center'>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className='text-5xl font-bold text-opal-light text-center'>
          Welcome{'\n'}
          {name}
        </Text>
      </Animated.View>
    </View>
  );
};
