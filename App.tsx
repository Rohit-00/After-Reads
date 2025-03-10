import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthService, supabase } from './utils/supabase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/Ionicons';
//Auth Screens
import SignUp from './src/screens/auth/signUp';
import SignIn from './src/screens/auth/signIn';

//Main Screens
import Home from './src/screens/main/home';

import { NavigationContainer } from '@react-navigation/native';
import { User } from '@supabase/supabase-js';
import { authService } from './utils/supabase';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './store/authContext';
import Search from './src/screens/main/search';
import Library from './src/screens/main/library';
import Profile from './src/screens/main/profile';
import Welcome from './src/screens/auth/welcome';
import Search2 from './src/screens/main/search2';
import BookDetails from './src/screens/main/bookDetails';
import Reader from './src/screens/main/reader';
import Category from './src/screens/main/category';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const MainTabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={
      {
        tabBarStyle:{
          height:60,
          position:'absolute',
          margin:5,   
          borderRadius:24,
          borderWidth:0,
          marginBottom:10,
          paddingTop:10,
        },
        
        tabBarShowLabel:false
        
      }
    }>

<Tab.Screen name='Home' component={Home} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='home' size={size} color={'#00C896'}></Icon>:<Icon name='home-outline' size={size}></Icon>)
          }} />
<Tab.Screen name='Search' component={Search} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='search' size={size} color={'#00C896'}></Icon>:<Icon name='search-outline' size={size}></Icon>)
          }} />
          
<Tab.Screen name='Library' component={Library} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='bookmark' size={size} color={'#00C896'}></Icon>:<Icon name='bookmark-outline' size={size}></Icon>)
          }} />
<Tab.Screen name='Profile' component={Profile} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='person' size={size} color={'#00C896'}></Icon>:<Icon name='person-outline' size={size}></Icon>)
          }} />

    </Tab.Navigator>
  )
}

const StackNavigation = () => {

  const {user,isLoading} = useAuth();
  console.log("homeScreen:",user)

if(isLoading){
  return <Text>Loading...</Text>
}


  return(
  <Stack.Navigator
     screenOptions={{
    headerShown: false,
    animation: 'fade',}}>
     {user ? (
        <>
        <Stack.Screen name='Main' component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='Search2' component={Search2} options={{ headerShown: false }} />
        <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Reader' component={Reader} options={{ headerShown: false }} />
        <Stack.Screen name='Category' component={Category} options={{ headerShown: false }} />
        </>
      ) : (

        <>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='SignIn' component={SignIn} />
        </>
      )}
  </Stack.Navigator>
  )
}

export default function App() {

  return (
    
    <AuthProvider>
    <NavigationContainer>
      <StackNavigation></StackNavigation>
   </NavigationContainer>
    </AuthProvider>
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
