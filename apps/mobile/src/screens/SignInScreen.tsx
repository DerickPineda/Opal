import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '../services/supabase';
import { SignInSchema } from '@schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  email: string;
  password: string;
};

export const SignInScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Navigation will be handled by auth state listener
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1'
    >
      <ScrollView
        className='flex-1 bg-[#171916]'
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className='flex-1 justify-center px-8'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='mb-8'
          >
            <Text className='text-[#a5bfb6] text-lg'>← Back</Text>
          </TouchableOpacity>

          <Text className='text-4xl font-bold text-[#a5bfb6] mb-2'>
            Welcome Back
          </Text>
          <Text className='text-[#90aaa1] mb-8'>
            Sign in to continue your journey
          </Text>

          <View className='mb-6'>
            <Text className='text-[#90aaa1] mb-2'>Email</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='bg-[#29342e] text-[#a5bfb6] rounded-lg px-4 py-3 text-base'
                  placeholder='your@email.com'
                  placeholderTextColor='#6b8077'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              )}
              name='email'
            />
            {errors.email && (
              <Text className='text-red-400 mt-1'>{errors.email.message}</Text>
            )}
          </View>

          <View className='mb-8'>
            <Text className='text-[#90aaa1] mb-2'>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='bg-[#29342e] text-[#a5bfb6] rounded-lg px-4 py-3 text-base'
                  placeholder='••••••••'
                  placeholderTextColor='#6b8077'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name='password'
            />
            {errors.password && (
              <Text className='text-red-400 mt-1'>
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className='bg-[#a5bfb6] rounded-full py-4 mb-4'
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text className='text-[#171916] text-center text-lg font-semibold'>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className='text-[#90aaa1] text-center'>
              Don't have an account?{' '}
              <Text className='text-[#a5bfb6] font-semibold'>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
