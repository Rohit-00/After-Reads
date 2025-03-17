
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, User } from '@supabase/supabase-js'
import  Constants  from 'expo-constants'
export const supabase = createClient(
  Constants.expoConfig?.extra!.EXPO_PUBLIC_SUPABASE_URL || "",
  Constants.expoConfig?.extra!.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {

      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })

  export class AuthService {
    async signUp(email:string, password:string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return {data, error };
    }
  
    async signIn(email:string, password:string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    }
    async authStateListener (callback: (user: User | null) => void) {
      return supabase.auth.onAuthStateChange((event, session) => {
        callback(session?.user || null);
      })
    }
  }

  export const authService = new AuthService();