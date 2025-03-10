import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '../utils/supabase';
import { supabase } from '../utils/supabase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Subscription,setSubscription] = useState<any>();

  const fetchUser = async () => {
    const { data: { subscription } } = await authService.authStateListener((currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
        setSubscription(subscription)
      });
}

  useEffect(() => {


    fetchUser();

    return () => {
      Subscription?.unsubscribe();
    };
  }, []);

  const signInUser = async(email:string,password:string) => {
    const user : any =  await authService.signIn(email,password)
    fetchUser();
    return user
  }
  const value = {
    user,
    isLoading,
    signUp: authService.signUp,
    signIn: signInUser,
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};