import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from './services/supabase';
import { colors } from './constants/colors';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { WelcomeAnimationScreen } from './screens/WelcomeAnimationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { UploadVideoScreen } from './screens/UploadVideoScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { Screen, Navigation } from './navigation/types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('Welcome');

  useEffect(() => {
    checkUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await handleUserSignIn(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        handleSignOut();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await handleUserSignIn(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSignIn = async (id: string) => {
    setUserId(id);

    const { data: profile } = await supabase
      .from('profiles')
      .select('name, onboarding_completed')
      .eq('id', id)
      .single();

    if (profile?.onboarding_completed) {
      setUserName(profile.name);
      setNeedsOnboarding(false);
      setCurrentScreen('WelcomeAnimation');
    } else {
      setNeedsOnboarding(true);
      setCurrentScreen('Onboarding');
    }

    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName('');
    setNeedsOnboarding(false);
    setCurrentScreen('Welcome');
  };

  const handleOnboardingComplete = async (name: string) => {
    setUserName(name);
    setNeedsOnboarding(false);
    setCurrentScreen('WelcomeAnimation');
  };

  const handleWelcomeAnimationComplete = () => {
    setCurrentScreen('Home');
  };

  const navigation: Navigation = {
    navigate: (screen: Screen) => setCurrentScreen(screen),
    goBack: () => {
      if (!isAuthenticated) {
        setCurrentScreen('Welcome');
        return;
      }

      // authenticated back behavior
      if (isAuthenticated) setCurrentScreen('Home');
      else setCurrentScreen('Welcome');
    },
  };

  if (isLoading) {
    return (
      <View className='flex-1 bg-opal-darkest justify-center items-center'>
        <ActivityIndicator size='large' color={colors.opal.light} />
      </View>
    );
  }

  return (
    <>
      {/* Auth Screens */}
      {currentScreen === 'Welcome' && <WelcomeScreen navigation={navigation} />}
      {currentScreen === 'SignIn' && <SignInScreen navigation={navigation} />}
      {currentScreen === 'SignUp' && <SignUpScreen navigation={navigation} />}

      {/* Onboarding */}
      {currentScreen === 'Onboarding' && userId && (
        <OnboardingScreen
          userId={userId}
          onComplete={handleOnboardingComplete}
        />
      )}

      {/* Welcome Animation */}
      {currentScreen === 'WelcomeAnimation' && (
        <WelcomeAnimationScreen
          name={userName}
          onComplete={handleWelcomeAnimationComplete}
        />
      )}

      {/* App Screens */}
      {currentScreen === 'Home' && <HomeScreen navigation={navigation} />}
      {currentScreen === 'Record' && (
        <UploadVideoScreen navigation={navigation} />
      )}
      {currentScreen === 'Calendar' && (
        <CalendarScreen navigation={navigation} />
      )}
    </>
  );
}
