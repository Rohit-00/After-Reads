import { useEffect, useState} from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin'
import * as Yup from 'yup';
import { Formik, FormikValues } from 'formik';
import { useAuth } from '../../../store/authContext';
import { colors } from '../../../utils/colors';
import { supabase } from '../../../utils/supabase';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


export default function SignIn({navigation}:any) {
  const { signIn, isLoading,  signOut } = useAuth();
  const [error,setError] = useState('')

  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '836181865562-umip99hk9bh00qnrmdh4bm3n8jue7lc9.apps.googleusercontent.com'})
  })

const handleGoogleSignIn = async () => {
      try{
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo.data!.idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: userInfo.data!.idToken,
          })
          console.log(error, data)
        } else {
          throw new Error('no ID token present!')
        }
      }catch (error: any) {
        console.log(error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      
}
  const onRegister = async (values: FormikValues) => {
    try {
      const {data,error} = await signIn(
        values.email,
        values.password,
      )
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={{flex:1,justifyContent:'center',}}>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.title}>Sign In</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={onRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, touched.email && errors.email && styles.inputError]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && 
              <Text style={styles.errorText}>{errors.email}</Text>
            }

            <TextInput
              style={[styles.input, touched.password && errors.password && styles.inputError]}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && 
              <Text style={styles.errorText}>{errors.password}</Text>
            }

            <TouchableOpacity><Text style={styles.button}  onPress={()=>handleSubmit()}>Sign In</Text></TouchableOpacity>
            </View>
        )}
      </Formik>
      
      <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text style={{textDecorationLine:'underline',color:colors.text}}>Don't have an account? Sign Up</Text></TouchableOpacity>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
     
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
      <AntDesign name="google" size={24} color={'white'} />
        <Text style={styles.googleText}>Sign In with Google</Text>
      </TouchableOpacity>

      
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.secondBackground,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer:{
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  socialContainer:{
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  title: {
    color:colors.text,
    fontSize: 32,
    fontWeight:'bold',
    marginBottom: 16,
  },
  button:{
    backgroundColor:'#00C896',
    width:300,
    textAlign:'center',
    padding:15,
    fontSize:14,
    color:'white',
    fontWeight:'600',
    height:50,
    borderRadius:30,
    marginVertical: 8
  },
  input: {
    width: '85%',
    padding: 10,
    paddingHorizontal:15,
    marginVertical: 8,
    borderRadius: 30,
    height:45,
    backgroundColor:colors.input,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.20,
    shadowRadius: 1.84,
    elevation: 2,
    
  },
  googleButton: {
    color:'black',
    backgroundColor:'white',
    width:300,
    textAlign:'center',
    
    fontSize:14,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    
    fontWeight:'600',
    height:50,
    borderRadius:30,
    marginVertical: 8,
    
  },
  googleText: {
    color: 'black',
    fontWeight:'bold',
  
    fontSize: 14,
    textAlign:'center'
  },
  facebookButton: {
    backgroundColor:'#4267B2',
    width:300,
    padding:15,
    fontSize:14,
    color:'white',
    fontWeight:'600',
    height:50,
    borderRadius:30,
    marginVertical: 8
  },
  facebookText: {
    color: 'white',
    fontWeight:'bold',
    textAlign:'center'
  },
  appleButton: {
    backgroundColor:'black',
    width:300,
    padding:15,
    height:50,
    borderRadius:30,
    marginVertical: 8
  },
  appleText: {
    color: 'white',
    fontWeight:'bold',
    textAlign:'center'
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 0.5,
    height: 1,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: 'gray',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});