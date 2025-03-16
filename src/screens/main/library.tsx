import { Text, StyleSheet, View,RefreshControl, TouchableOpacity,Button } from 'react-native'
import BookSlider from '../../components/bookSlider'
import { useEffect, useState, useContext } from 'react'
import { supabase } from '../../../utils/supabase'
import { BookmarkContext } from '../../../store/bookmarkContextProvider'
import { colors } from '../../../utils/colors'
import { useAuth } from '../../../store/authContext'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
export type bookSliderParamList={
  BookSlider:{title:string}
}


export default function Library({navigation}:any) {
  const {addItem,savedItems} = useContext(BookmarkContext)
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()
//   const [savedItems,setSavedItems] = useState<any>()
  const uid = user&&user.id
  useEffect(()=>{
    const getLibrary = async() =>{
      const {data,error} = await supabase.from('ReadLater')
      .select('*')
      .eq('uid',uid)
      .order('created_at',{ascending:false})
      addItem(data)
      setLoading(false)

}
getLibrary()
  },[])
    return (
      
      <View style={{backgroundColor:colors.background,height:'100%'}}>
        {loading?
        <SkeletonPlaceholder>
          <View style={{flexDirection:'column',height:'100%'}}>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          <View style={{width:'40%',height:240,borderRadius:6,margin:20}}/>
          </View>
          </View>
        </SkeletonPlaceholder>
        
      :      
      <>
      <View style={styles.headingContainer}>
      <Text style={styles.heading}>Read Later</Text>
    </View>
<BookSlider heading={'Read Later'} data={savedItems} navigation={navigation}/>
</>
}
</View>
      
    )
  }


const styles = StyleSheet.create({
  headingContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'white',
    padding:10,

  },
  heading:{
    fontSize:24,
    marginHorizontal:10,
    marginVertical:10,
    color:colors.text,
    fontWeight:'bold'
 
  },
})
