import { Text, StyleSheet, View, TextInput} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons';


import { colors } from '../../../utils/colors';

export default function Search({navigation}:any) {
   
    return (
      <View style={styles.container}>
      <View style={styles.headingContainer}>
      <Text style={styles.heading}>Explore</Text>
      </View>
      <View style={styles.searchContainer} >
      <Icon name='search' size={24} color='white' style={styles.searchIcon} />
        <TextInput
        style={styles.searchInput}
        placeholder='Search Book, Author'
        onPress={()=>navigation.push('Search2')}
        />
      </View>
      
      
      </View>
    )
  }


const styles = StyleSheet.create({
  headingContainer:{

  },
  heading:{
    marginTop:'10%',
    fontSize:36,
    color:colors.text,
    fontWeight:'bold'
  },
  container:{
    
    marginHorizontal:10
  },
  
  searchContainer:{
   backgroundColor:colors.secondBackground,
   paddingHorizontal:10,
   flexDirection:'row', 
   marginTop:'7%',
   justifyContent:'center',
   alignItems:'center',
   
  },

  searchInput:{
    flex:1,
    height:50,
    paddingLeft:20,
    fontSize:16,
    paddingRight:0,
    
    borderColor:colors.border,
  },

  searchIcon:{
    opacity:0.50,
    color:colors.text,
  }
 
 
})
