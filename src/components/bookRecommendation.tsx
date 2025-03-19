import React,{useEffect,useState} from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase';

import { colors } from '../../utils/colors';
import { changeHttpToHttps, truncateText } from '../../utils/helpers';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function BookRecommendations({heading,navigation}:any){
    const [datad, setData] = useState<any>()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getLibrary = async() =>{
          const {data} = await supabase.from('recommendations')
          .select('*')
          .eq('category',heading)
          setData(data)
          setLoading(false)
    }
    getLibrary()
      },[])
  return (
    <View style={{marginVertical:10}}>
    <Text style={styles.heading}>{heading}</Text>
    <View style={styles.container}>
    {loading?
    
      <View>
        <SkeletonPlaceholder backgroundColor={colors.secondBackground} highlightColor={colors.skeletonHighlight}>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
            <View style={{width:130,height:200,borderRadius:6,margin:5}}/>
            <View style={{width:130,height:200,borderRadius:6,margin:5}}/>
            <View style={{width:130,height:200,borderRadius:6,margin:5}}/>
            <View style={{width:130,height:200,borderRadius:6,margin:5}}/>
            </View>
        </SkeletonPlaceholder>
      </View>
    
    
    : <FlatList
        data={datad}
        horizontal
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>      
          <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{thumbnail:item.bookThumbnail,id:item.bookId,title:item.bookTitle,author:item.bookAuthor,desc:item.description})}>
          <View>
          <Image source={{ uri: changeHttpToHttps(item.bookThumbnail)}} style={styles.image}/>
          </View>
          </TouchableOpacity>
          <View>
          <Text style={styles.bookTitle}>{truncateText(item.bookTitle,20)}</Text>
          <Text style={styles.bookAuthor}>{item.bookAuthor}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
   
  },
  image: {
    width: 130,
    marginHorizontal:7,
    marginBottom:0,
    height: 200, 
    resizeMode: 'cover',
    borderRadius:6,
    borderWidth:1,
    borderColor:colors.background
    
  },
  heading:{
    color:colors.text,
    fontSize:20,
    margin:5,
    fontWeight:'bold',
    marginBottom:15,
    marginHorizontal:20,
    marginTop:15
  },
  bookTitle:{
    marginTop:5, 
    fontWeight:'bold',
    color:colors.text

  },
  bookAuthor:{
    fontSize:12,
    textAlign:'center',
    color:colors.text
  }
});