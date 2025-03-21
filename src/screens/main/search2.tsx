import React, { useEffect, useState } from 'react'
import {  StyleSheet, View, TextInput, ScrollView, Image,  Pressable, TouchableOpacity, StatusBar, ActivityIndicator, Text} from 'react-native'
import axios from 'axios';
import Icon from '@expo/vector-icons/Feather';
import Icon2 from '@expo/vector-icons/AntDesign';
import { supabase } from '../../../utils/supabase';
import { Books } from '../../../types/types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from '../../../utils/colors';
import { changeHttpToHttps } from '../../../utils/helpers';
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
};

export default function Search2({navigation}:any) {
    const [keyword, setKeyword] = useState('')
    const [books, setBooks] = useState<Books[]>([])
    const [loading, setLoading] = useState<boolean>()

          const fetchBooks=async()=>{
          if(keyword==='' || keyword===null){
            return;
          }
          setLoading(true)
          try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + keyword);
            const filteredBooks = response.data.items.filter((book: any) => 
              book.volumeInfo?.imageLinks?.thumbnail && book.volumeInfo?.title && book.volumeInfo?.authors && book.volumeInfo?.description
            );
            setBooks(filteredBooks);
          } catch (err: any) {
            console.log(err.message);
          } finally {
            setLoading(false);
          }
               
}

    return (
        
      <View style={styles.container}>
      <StatusBar barStyle='default' backgroundColor={colors.background}></StatusBar>
      <View style={styles.searchContainer} >
      <TouchableOpacity onPress={()=>navigation.pop()} style={styles.backButton}><Icon2 name='left' color={colors.text} size={24}  style={styles.searchIcon} /></TouchableOpacity>
        <TextInput
        placeholderTextColor={colors.text}
        autoFocus={true}
        onChangeText={(text)=>setKeyword(text)}
        style={styles.searchInput}
        placeholder='Search Book, Author'
        onSubmitEditing={fetchBooks}
        />
        <TouchableOpacity onPress={fetchBooks} style={styles.searchButton}><Icon name='search' size={24} color={colors.text} style={styles.searchIcon} /></TouchableOpacity>
        </View>
        
        <View style={styles.resultContainer}>

        {loading?
        <View>
          <SkeletonPlaceholder backgroundColor={colors.secondBackground} highlightColor={colors.skeletonHighlight}>
            <View style={{flexDirection:'column',margin:10}}>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
              <View style={{width:'95%',height:120,borderRadius:6,margin:10}}/>
            
              </View>
          </SkeletonPlaceholder>
  
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:50}}>
        
        {books.map((item:any)=>(<View key={item.id.toString()}>
        
        <Pressable onPress={ ()=>navigation.navigate('BookDetails',{thumbnail:item.volumeInfo.imageLinks.thumbnail,id:item.id,isbn:item.volumeInfo,title:item.volumeInfo.title,author:item.volumeInfo.authors.at(0),desc:item.volumeInfo.description})}>
          <View style={styles.bookContainer}>
        {item.volumeInfo.imageLinks?.thumbnail && (
              <Image               
              source={{ uri: changeHttpToHttps(item.volumeInfo.imageLinks.thumbnail),headers: { 'Accept': 'image/*'},body: 'This is the body', } }
              style={styles.thumbnail}
            />
            )}
        <View style={styles.bookDetails}>
        {item.volumeInfo.title &&<Text style={styles.bookTitle}>{truncateString(item.volumeInfo.title,50)}</Text>}
        <Text style={styles.bookAuthor}>{item.volumeInfo.authors}</Text>
   
        
        </View>
        </View>
            </Pressable>
            <View style={styles.line}></View>
            </View>       
        
      ))}
      </ScrollView>}
        
      </View>
      
      
      </View>
    )
  }


const styles = StyleSheet.create({
  thumbnail:{
    height:100,
    width:70, 
    
     
    
  },
  container:{
    flex:1,
    backgroundColor:colors.secondBackground,
  },
  
  searchContainer:{
   flexDirection:'row', 
   justifyContent:'space-evenly',
   alignItems:'center',
   backgroundColor:colors.background,
   paddingBottom:10
  },

  searchInput:{   
    width:'70%',
    height:50,
    paddingLeft:20,
    marginRight:10,
    fontSize:16,
    color:colors.text
  },
  searchButton:{
    marginRight:10
  },
  searchIcon:{
    padding:2
      },
  backButton:{
    marginLeft:10
  },

  bookContainer:{
    flexDirection:'row',
    marginVertical:10,
    marginHorizontal:0,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  bookDetails:{
    flexDirection:'column',
    width:'65%',
    padding:10,
    justifyContent:'center'
    
    
    
  },
  bookDescription:{
  fontSize:11,
  lineHeight:15
  
  
  
  },
  bookTitle:{
    fontWeight:'bold',
    color:colors.text,
    fontSize:18,
    
  },
  bookAuthor:{
    fontSize:14,
    color:colors.text,
    
  },
  resultContainer:{

  },
  line:{
    height:1,
    backgroundColor:colors.border,
    marginHorizontal:20
  }

  
 
})
