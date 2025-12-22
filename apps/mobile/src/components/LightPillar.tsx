import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  pillarCount?: number;
}

export const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#a5bfb6',
  bottomColor = '#171916',
  pillarCount = 5,
}) => {
  const pillars = Array.from({ length: pillarCount }, (_, i) => ({
    left: (width / (pillarCount + 1)) * (i + 1),
    animValue: useRef(new Animated.Value(0)).current,
    delay: i * 300,
  }));

  useEffect(() => {
    pillars.forEach((pillar) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pillar.animValue, {
            toValue: 1,
            duration: 3000,
            delay: pillar.delay,
            useNativeDriver: true,
          }),
          Animated.timing(pillar.animValue, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {pillars.map((pillar, index) => {
        const opacity = pillar.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.1, 0.3, 0.1],
        });

        const scaleY = pillar.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.8, 1, 0.8],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.pillar,
              {
                left: pillar.left - 60,
                opacity,
                transform: [{ scaleY }],
              },
            ]}
          >
            <LinearGradient
              colors={[topColor, bottomColor]}
              style={styles.gradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#171916',
  },
  pillar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 120,
  },
  gradient: {
    flex: 1,
  },
});
