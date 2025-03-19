import { Appearance, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/Ionicons';

//Auth Screens
import SignUp from './src/screens/auth/signUp';
import SignIn from './src/screens/auth/signIn';

//Main Screens
import Home from './src/screens/main/home';
import Search from './src/screens/main/search';
import Library from './src/screens/main/library';
import Profile from './src/screens/main/profile';
import Welcome from './src/screens/auth/welcome';
import Search2 from './src/screens/main/search2';
import BookDetails from './src/screens/main/bookDetails';
import Reader from './src/screens/main/reader';
import Category from './src/screens/main/category';


import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './store/authContext';
import { BookmarkContextProvider } from './store/bookmarkContextProvider';
import Banner from './src/components/banner';
import { colors } from './utils/colors';


console.log(Appearance.getColorScheme())


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const MainTabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={
      {
        tabBarStyle:{
          height:60,
          position:'absolute',
          backgroundColor:colors.secondBackground,
          margin:5,   
          borderRadius:24,
          borderWidth:0,
          borderTopWidth:0,
          marginBottom:10,
          paddingTop:10,
        },
        
        tabBarShowLabel:false
        
      }
    }>

<Tab.Screen name='Home' component={Home} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='home' size={size} color={'#00C896'}></Icon>:<Icon name='home-outline' color={colors.text} size={size}></Icon>)
          }} />
<Tab.Screen name='Search' component={Search} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='search' size={size} color={'#00C896'}></Icon>:<Icon name='search-outline' color={colors.text} size={size}></Icon>)
          }} />
          
<Tab.Screen name='Library' component={Library} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='bookmark' size={size} color={'#00C896'}></Icon>:<Icon name='bookmark-outline' color={colors.text} size={size}></Icon>)
          }} />
<Tab.Screen name='Profile' component={Profile} options={{headerShown:false, tabBarIcon:({focused,size}:any)=>
            (focused?<Icon name='person' size={size} color={'#00C896'}></Icon>:<Icon name='person-outline' color={colors.text} size={size}></Icon>)
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
    animation:'default',}}>
     {user ? (
        <>
        <Stack.Screen name='Main' component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='Search2' component={Search2} options={{ headerShown: false }} />
        <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Reader' component={Reader} options={{ headerShown: false,animation:'slide_from_bottom' }} />
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
    <BookmarkContextProvider>
    <AuthProvider>
    <NavigationContainer>
      <StackNavigation/>
   </NavigationContainer>
    </AuthProvider>
    </BookmarkContextProvider>
  );
}

const styles = StyleSheet.create({

});
