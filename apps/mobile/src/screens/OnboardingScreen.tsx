import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '../services/supabase';
import { colors } from '../constants/colors';
import { OnboardingSchema } from '@schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { parsePhoneNumber } from 'libphonenumber-js';

type OnboardingForm = {
  name: string;
  dateOfBirth: Date;
  phoneNumber: string;
};

interface OnboardingScreenProps {
  userId: string;
  onComplete: (name: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  userId,
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingForm>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      name: '',
      dateOfBirth: new Date(2000, 0, 1),
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: OnboardingForm) => {
    setLoading(true);
    try {
      // Format phone number to E.164
      let formattedPhone = data.phoneNumber;
      try {
        const phoneNumber = parsePhoneNumber(data.phoneNumber, 'US'); // Default to US
        if (phoneNumber && phoneNumber.isValid()) {
          formattedPhone = phoneNumber.format('E.164'); // Converts to +16502558506
        } else {
          throw new Error('Invalid phone number');
        }
      } catch (e) {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number'
        );
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        name: data.name,
        date_of_birth: data.dateOfBirth.toISOString().split('T')[0],
        phone_number: formattedPhone,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      onComplete(data.name);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-opal-darkest'
    >
      <ScrollView className='flex-1' contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex-1 justify-center px-8 py-12'>
          <Text className='text-4xl font-bold text-opal-light mb-2'>
            Welcome to Opal
          </Text>
          <Text className='text-opal mb-8'>
            Let's set up your profile to get started
          </Text>

          {/* Name Field */}
          <View className='mb-6'>
            <Text className='text-opal mb-2'>Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='bg-opal-darker text-opal-light rounded-lg px-4 py-3 text-base'
                  placeholder='Your name'
                  placeholderTextColor={colors.opal.dark}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='name'
            />
            {errors.name && (
              <Text className='text-red-400 mt-1'>{errors.name.message}</Text>
            )}
          </View>

          {/* Date of Birth Field */}
          <View className='mb-6'>
            <Text className='text-opal mb-2'>Date of Birth</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className='bg-opal-darker rounded-lg px-4 py-3'
                  >
                    <Text className='text-opal-light text-base'>
                      {formatDate(value)}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={value}
                      mode='date'
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (selectedDate) {
                          onChange(selectedDate);
                        }
                      }}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)}
                      textColor='white'
                    />
                  )}

                  {showDatePicker && Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      className='bg-opal-light rounded-lg px-4 py-3 mt-2'
                    >
                      <Text className='text-opal-darkest text-center text-base font-semibold'>
                        Done
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
              name='dateOfBirth'
            />
            {errors.dateOfBirth && (
              <Text className='text-red-400 mt-1'>
                {errors.dateOfBirth.message}
              </Text>
            )}
          </View>

          {/* Phone Number Field */}
          <View className='mb-8'>
            <Text className='text-opal mb-2'>Phone Number</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='bg-opal-darker text-opal-light rounded-lg px-4 py-3 text-base'
                  placeholder='(650) 255-8506'
                  placeholderTextColor={colors.opal.dark}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType='phone-pad'
                />
              )}
              name='phoneNumber'
            />
            {errors.phoneNumber && (
              <Text className='text-red-400 mt-1'>
                {errors.phoneNumber.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className='bg-opal-light rounded-full py-4'
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text className='text-opal-darkest text-center text-lg font-semibold'>
              {loading ? 'Saving...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
