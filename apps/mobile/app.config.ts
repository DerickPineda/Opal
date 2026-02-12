import 'dotenv/config';

export default {
  expo: {
    name: 'Opal',
    slug: 'opal',
    extra: {
      supbaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPBASE_ANON_KEY,
    },
  },
};
