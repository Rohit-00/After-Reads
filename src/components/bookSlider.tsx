import React from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { changeHttpToHttps, truncateText } from '../../utils/helpers';
import { colors } from '../../utils/colors';


export default function BookSlider({data,navigation}:any){
  return (
   
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 150,
          alignItems: 'center'
        }}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          width: '100%'
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>      
          <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{
            thumbnail: item.bookThumbnail,
            id: item.bookId,
            title: item.bookTitle,
            author: item.bookAuthor,
            desc: item.description
          })}>
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
 
  heading:{
    fontSize:20,
    paddingHorizontal:10 ,
    color:colors.text

  },
  flatListContainer: {
    paddingBottom: 150, 
    width:'100%',
    
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondBackground,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '45%', 
  },
  headingContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:colors.secondBackground,
    padding:10,

  },

image: {
    width: 150,

    marginBottom:0,
    height: 200, 
    resizeMode: 'cover',
    borderRadius:6,
    borderWidth:0.5,
    borderColor:colors.border,
   
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

});