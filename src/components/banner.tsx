import { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import { supabase } from '../../utils/supabase'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { colors } from '../../utils/colors'
import { changeHttpToHttps } from '../../utils/helpers'


export default function Banner({navigation}:any) {
  const [loading, setLoading] = useState(true)
  const [data,setData] = useState<any>([{
    qoute:'hello',
    author:'Rohit',
    cover : 'https://images'
  }])

  useEffect(()=>{
    const getBook = async() => {
      try{
        const {data} = await supabase
        .from('Banner')
        .select('*')
        setData(data)
        setLoading(false)
  
      }catch(error){
        console.log(error)
      }
  
    }
    getBook()
  },[])
    return (
      <>
      {loading?
      <SkeletonPlaceholder backgroundColor={colors.secondBackground} highlightColor={colors.skeletonHighlight}>
                  <View style={{width:'90%',height:200,borderRadius:6,margin:20}}/>
    
      </SkeletonPlaceholder>
      :
      <View style={[styles.bannerBackground,{backgroundColor:data[data.length-1].banner_color}]}>
        
        <View style={styles.bannerText}>
          <Text style={styles.bannerHeading}>Today's Read</Text>
          <Text style={styles.bannerBody}>{data[data.length-1].qoute}</Text>
          <Text style={styles.bannerAuthor}>-{data[data.length-1].author}</Text>
          <TouchableOpacity
          onPress={()=>navigation.navigate('BookDetails',{thumbnail:data[data.length-1].bookThumbnail,id:data[data.length-1].bookId,title:data[data.length-1].title,author:data[data.length-1].author,desc:data[data.length-1].description})}
          ><Text style={[styles.bannerButton,{backgroundColor:data[data.length-1].button_color}]}>Read</Text></TouchableOpacity>
        </View>
        <View>
          <Image 
          source={{uri:(changeHttpToHttps(data[data.length-1].cover))}}
          style={styles.bannerThumbnail}
          
          />
        </View>
      </View>
}
      </>
    )
  }


const styles = StyleSheet.create({
    bannerBackground:{
        padding:10,

        margin:10,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    bannerText:{
      margin:10,
      width:'60%',
    },
    bannerHeading:{
      fontWeight:'bold',
      fontSize:24,
    },
    bannerBody:{
      fontSize:14
    },
    bannerAuthor:{
      textAlign:'right'

    },
    bannerButton:{
      backgroundColor:'#00C896',
      padding:12,
      marginRight:100,
      textAlign:'center',
      borderRadius:25,
      color:'white',
      marginTop:10,
      width:100
      
    },
    bannerThumbnail:{
      height:180,
      width:110,
      borderRadius:5,
    }
})
