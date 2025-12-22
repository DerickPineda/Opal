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
import { SignUpSchema, SignUpType } from '@schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignUpScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    },
  });

  const onSubmit = async (data: SignUpType) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password.password,
      });

      if (error) throw error;

      Alert.alert(
        'Success',
        'Account created! Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account');
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
        <View className='flex-1 justify-center px-8 py-12'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='mb-8'
          >
            <Text className='text-[#a5bfb6] text-lg'>← Back</Text>
          </TouchableOpacity>

          <Text className='text-4xl font-bold text-[#a5bfb6] mb-2'>
            Create Account
          </Text>
          <Text className='text-[#90aaa1] mb-8'>
            Begin your journey with Opal
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

          <View className='mb-6'>
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
              name='password.password'
            />
            {errors.password && (
              <Text className='text-red-400 mt-1'>
                {errors.password.message}
              </Text>
            )}
          </View>

          <View className='mb-8'>
            <Text className='text-[#90aaa1] mb-2'>Confirm Password</Text>
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
              name='password.confirm'
            />
            {errors.password?.confirm && (
              <Text className='text-red-400 mt-1'>
                {errors.password.confirm.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className='bg-[#a5bfb6] rounded-full py-4 mb-4'
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text className='text-[#171916] text-center text-lg font-semibold'>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text className='text-[#90aaa1] text-center'>
              Already have an account?{' '}
              <Text className='text-[#a5bfb6] font-semibold'>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
