import React from 'react';
import { Text, StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { changeHttpToHttps, truncateText } from '../../utils/helpers';
import { colors } from '../../utils/colors';


export default function BookSlider({heading,data,navigation}:any){
  return (
   
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
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
        
      />
    </View>
 
  );
}

const styles = StyleSheet.create({
 
  container: {
    width:"100%",
    height:'100%',
    backgroundColor:colors.secondBackground,
  
  },
  image: {
        width: 150,
        margin:30,
        marginBottom:0,
        height: 200, 
        resizeMode: 'cover',
        borderRadius:6,
        borderWidth:0.5,
        borderColor:colors.border,
  },
  heading:{
    color:'black',
    fontSize:20,
    margin:5,
    fontWeight:'bold',
    opacity:0.80,
    marginBottom:10
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
  },
title:{
  color:colors.text,
  fontSize:16,
  fontWeight:'bold',
},
textContainer:{
  justifyContent:'center',
  alignItems:'center',
  
},
  flatListContainer: {
    paddingBottom: 120, 
    alignItems:'center',
    justifyContent:'center'
    
  },
});