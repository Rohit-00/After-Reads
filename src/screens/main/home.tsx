import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import Banner from '../../components/banner'
import { ScrollView } from 'react-native'
import { useState } from 'react'
import BookRecommendations from '../../components/bookRecommendation'
import { colors } from '../../../utils/colors'

interface userData {
  _data:{
    credits:number,
    uid: String
  }
}
export type bookSliderParamList={
  BookSlider:{title:string}
}
export default function Home({navigation}:any) {

  const [datad, setData] = useState<any>()


  
    return (
      
      <View style={{backgroundColor:'#FAFAFA'}}>
        <View style={styles.headingContainer}><Text style={styles.heading}>After Reads</Text></View>
      {/* <StatusBar barStyle='default' backgroundColor={'white'}></StatusBar> */}
      
        <ScrollView horizontal={false} contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>

        <Banner />


        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.horizontalLinks}>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Productivity'})}>Productivity</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Enhance Creativity'})}>Creativity</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Enhance Creativity'})}>Critical Thinking</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Enhance Creativity'})}>Philopshy</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link} onPress={()=>navigation.navigate('Category',{category:'Enhance Creativity'})}>Time Management</Text></TouchableOpacity>
        </View>
        </ScrollView>
        <BookRecommendations heading={'Productivity'} navigation={navigation}/>
        <BookRecommendations heading={'Enhance Creativity'} navigation={navigation}/>
       
        
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
    backgroundColor:'white',
    paddingHorizontal:10,
    paddingVertical:20,
    borderBottomWidth:1,
    borderBottomColor:colors.border
    

  },
    horizontalLinks:{
      flexDirection:'row'
    },
    link:{
      fontSize:14,
      marginHorizontal:9,
      fontWeight:'500',
      backgroundColor:'white',
      padding:12,
      borderRadius:25,
      borderWidth:1,
      borderColor:colors.border
    }
})
