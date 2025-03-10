import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthService, supabase } from './utils/supabase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Auth Screens
import SignUp from './src/screens/auth/signUp';
import SignIn from './src/screens/auth/signIn';

import { NavigationContainer } from '@react-navigation/native';
import { User } from '@supabase/supabase-js';
import { authService } from './utils/supabase';
import { useEffect, useState } from 'react';


const Stack = createNativeStackNavigator()
export default function App() {
  const [user,setUser] = useState<User | null>(null)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
  authService.authStateListener((user:User | null) => {
    console.log("user",user)
    setUser(user)
    setLoading(false)
  })
},[])

if(loading){
  return <Text>Loading...</Text>
}
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
