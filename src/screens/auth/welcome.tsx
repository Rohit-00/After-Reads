import { Text, StyleSheet, View, Image, TouchableOpacity, useColorScheme} from 'react-native'
import { colors } from '../../../utils/colors';
export default function Welcome({navigation}:any) {
    const colorScheme = useColorScheme();
    

    const styles = StyleSheet.create({
        body:{
            
            
        },
        bodyText:{
            color:colors.text,
            marginTop:10,
            fontSize:18,
            fontWeight:'bold',
            fontFamily:'inter',
            textAlign:'center'
            
        },
        highlight:{
            color:"#00C896"
        },
        imageContainer:{
           flex:1.5,
           justifyContent:"flex-end",
           alignItems:'center',
           paddingBottom:30
           
        },
        buttonContainer:{ 
            flex:1,
            justifyContent:'flex-start',
            alignItems:'center',
            marginTop:20,  
            
        },
        image:{
            
            height:250,
            width:250
        },
        container:{
            height:'100%',
            width:'auto',
            alignItems:'center',
            backgroundColor: colors.background
           
            
        },
        
        darkContainer:{
              
        },
        button:{
            fontSize:15,
            fontWeight:'bold',
            color:'white',
            height:50,
            width:300,
            padding:15,
            textAlign:'center',
            borderRadius:30,
            backgroundColor:'#00C896',
            margin:10,
            marginTop:0,
            shadowOffset:{width:10,height:10}
        },
        button2:{
            fontSize:15,
            fontWeight:'bold',
            color:colors.text,
            height:50,
            width:300,
            padding:15,
            textAlign:'center',
            margin:10,
            marginTop:0    
        }
    })
    
    
    return (
      
        <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image 
        source={require('../../../assets/images/ProfileImage.png')}
        style={styles.image} />
        <Text style={styles.bodyText}>
        Revising books made {'\n'}
        easy with <Text style={styles.highlight}> After Reads </Text>
        </Text>
        </View>
        
        <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('SignUp')}>
            <Text style={styles.button}>
            Get Started
            </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={(()=>navigation.navigate('SignIn'))}>
            <Text style={styles.button2}>
            Already have an account
            </Text>
        </TouchableOpacity>
        </View>
        </View>
        
        
      
    )
  }


