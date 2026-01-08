import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { WelcomeAnimationScreen } from '../screens/WelcomeAnimationScreen';
import { BottomTabs } from './BottomNavigationTab';

const Stack = createNativeStackNavigator();

interface AppStackProps {
  userId: string;
  needsOnboarding: boolean;
  userName: string;
  onOnboardingComplete: (name: string) => void;
}

export function AppStack({
  userId,
  needsOnboarding,
  userName,
  onOnboardingComplete,
}: AppStackProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {needsOnboarding ? (
        <Stack.Screen name='Onboarding'>
          {() => (
            <OnboardingScreen
              userId={userId}
              onComplete={onOnboardingComplete}
            />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name='WelcomeAnimation'>
            {(props) => (
              <WelcomeAnimationScreen
                {...props}
                name={userName}
                onComplete={() => props.navigation.replace('Main')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name='Main' component={BottomTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}
