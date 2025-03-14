import React,{useEffect,useState} from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase';

import { colors } from '../../utils/colors';
import { truncateText } from '../../utils/helpers';

export default function BookRecommendations({heading,navigation}:any){
    const [datad, setData] = useState<any>()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getLibrary = async() =>{
          const {data,error} = await supabase.from('recommendations')
          .select('*')
          .eq('category',heading)
          setData(data)
          setLoading(false)
    }
    getLibrary()
      },[])
  return (
    <View>
    <Text style={styles.heading}>{heading}</Text>
    <View style={styles.container}>
    {loading?
    
      <View>
        <Text>Loading...</Text>
      </View>
    
    
    : <FlatList
        data={datad}
        horizontal
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>      
          <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{thumbnail:item.bookThumbnail,id:item.bookId,title:item.bookTitle,author:item.bookAuthor,desc:item.description})}>
          <View>
          <Image source={{ uri: item.bookThumbnail}} style={styles.image}/>
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
    margin:5,
    marginBottom:0,
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius:6,
    borderWidth:1,
    borderColor:colors.background
    
  },
  heading:{
    color:'black',
    fontSize:20,
    margin:5,
    fontWeight:'bold',
    opacity:0.80,
    marginBottom:10,
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
    textAlign:'center'
  }
});