import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import Banner from '../../components/banner'
import { ScrollView } from 'react-native'
import BookRecommendations from '../../components/bookRecommendation'
import { colors } from '../../../utils/colors'
import { StatusBar } from 'expo-status-bar'

export type bookSliderParamList={
  BookSlider:{title:string}
}
export default function Home({navigation}:any) {
  
    return (
      
      <View style={{backgroundColor:colors.secondBackground}} >
        <View style={styles.headingContainer}><Text style={styles.heading}>After Reads</Text></View>
        <ScrollView horizontal={false} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        <Banner navigation={navigation}/>


        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.horizontalLinks}>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Productivity'})}>Productivity</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Enhance Creativity'})}>Creativity</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Critical Thinking'})}>Critical Thinking</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Philosophy'})}>Philosophy</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Time Management'})}>Time Management</Text></TouchableOpacity>
        </View>
        </ScrollView>
        <BookRecommendations heading={'Productivity'} navigation={navigation}/>
        <BookRecommendations heading={'Enhance Creativity'} navigation={navigation}/>
        <BookRecommendations heading={'Philosophy'} navigation={navigation}/>
       
        
        </ScrollView>
        
      </View>
      
    )
  }


const styles = StyleSheet.create({
  heading:{
    fontSize:26,
    marginHorizontal:10,
    color:colors.text,
    fontWeight:'bold',
  },
  headingContainer:{
    backgroundColor:colors.background,
    paddingHorizontal:10,
    paddingVertical:20,

  },
    horizontalLinks:{
      flexDirection:'row'
    },
    link:{
      color:colors.text,
      fontSize:14,
      marginHorizontal:9,
      fontWeight:'500',
      backgroundColor:colors.background,
      padding:12,
      borderRadius:25,
  
      borderColor:colors.border
    }
})
