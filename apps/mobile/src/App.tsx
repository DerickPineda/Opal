import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from './services/supabase';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { WelcomeAnimationScreen } from './screens/WelcomeAnimationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { colors } from './constants/colors';

type Screen =
  | 'Welcome'
  | 'SignIn'
  | 'SignUp'
  | 'Onboarding'
  | 'WelcomeAnimation'
  | 'Home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Welcome');
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    checkUser();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event); // For debugging

      if (event === 'SIGNED_IN' && session?.user) {
        await handleUserSignIn(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUserId(null);
        setUserName('');
        setCurrentScreen('Welcome');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await handleUserSignIn(session.user.id);
      } else {
        setCurrentScreen('Welcome');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setCurrentScreen('Welcome');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSignIn = async (id: string) => {
    setUserId(id);

    // Check if user has completed onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, onboarding_completed')
      .eq('id', id)
      .single();

    if (profile?.onboarding_completed) {
      setUserName(profile.name);
      setCurrentScreen('WelcomeAnimation');
    } else {
      setCurrentScreen('Onboarding');
    }
  };

  const navigation = {
    navigate: (screen: Screen) => setCurrentScreen(screen),
    goBack: () => setCurrentScreen('Welcome'),
  };

  const handleOnboardingComplete = (name: string) => {
    setUserName(name);
    setCurrentScreen('WelcomeAnimation');
  };

  const handleWelcomeAnimationComplete = () => {
    setCurrentScreen('Home');
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.opal.darkest,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color={colors.opal.light} />
      </View>
    );
  }

  return (
    <>
      {currentScreen === 'Welcome' && <WelcomeScreen navigation={navigation} />}
      {currentScreen === 'SignIn' && <SignInScreen navigation={navigation} />}
      {currentScreen === 'SignUp' && <SignUpScreen navigation={navigation} />}
      {currentScreen === 'Onboarding' && userId && (
        <OnboardingScreen
          userId={userId}
          onComplete={handleOnboardingComplete}
        />
      )}
      {currentScreen === 'WelcomeAnimation' && (
        <WelcomeAnimationScreen
          name={userName}
          onComplete={handleWelcomeAnimationComplete}
        />
      )}
      {currentScreen === 'Home' && <HomeScreen />}
    </>
  );
}
