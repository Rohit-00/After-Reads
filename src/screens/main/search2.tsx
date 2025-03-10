import React, { useEffect, useState, useRef, lazy } from 'react'
import {  StyleSheet, View, TextInput, ScrollView, Image,  Pressable, TouchableOpacity, StatusBar, ActivityIndicator, Text} from 'react-native'
import axios from 'axios';
import Icon from '@expo/vector-icons/Feather';
import Icon2 from '@expo/vector-icons/AntDesign';
import { supabase } from '../../../utils/supabase';
import { Books } from '../../../types/types';
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
};

export default function Search2({navigation}:any) {
    const [query, setQuery] = useState('')
    const [keyword, setKeyword] = useState('')
    const [books, setBooks] = useState<Books[]>([])
    const [loading, setLoading] = useState<boolean>()

    function addSearch(){
      setKeyword(query)
      setLoading(true)
      console.log(query)
    }


      useEffect(()=>{
          const fetchBooks=async()=>{
          const {data,error} = await supabase.from('Credits')
          .select('value')
          .eq('name','googleBooks')
          console.log(data?.at(0)?.value)
          
          axios 
          .get('https://www.googleapis.com/books/v1/volumes?q='+keyword+'&key='+'AIzaSyDWamESByI1s9Mrmkwf9ZXVqoixaAhjjoY')
          .then((res)=>(
            
           setBooks(res.data.items)))
          
          .then(()=>{
            setLoading(false)
          })
          .catch((err:any)=>{console.log(err.message)})
          }

          fetchBooks()
          
               
},[keyword])





const changeHttpToHttps = (obj: any): any => {
    
  // Base case for recursion: if the value is a string and contains 'http'
  if (typeof obj === 'string' && obj.startsWith('http://')) {
    return obj.replace('http://', 'https://');
  }}        
  
    return (
        
      <View style={styles.container}>
      <StatusBar barStyle='default' backgroundColor={'white'}></StatusBar>
      <View style={styles.searchContainer} >
      <TouchableOpacity onPress={()=>navigation.pop()} style={styles.backButton}><Icon2 name='left' size={24}  style={styles.searchIcon} /></TouchableOpacity>
        <TextInput
        autoFocus={true}
        onChangeText={setQuery}
        style={styles.searchInput}
        placeholder='Search Book, Author'
        onSubmitEditing={addSearch}
        />
        <TouchableOpacity onPress={addSearch} style={styles.searchButton}><Icon name='search' size={24}  style={styles.searchIcon} /></TouchableOpacity>
        </View>
        
        <View style={styles.resultContainer}>

        {loading?
        <View>
        {/* <Skeleton h={180} width={'100%'} marginTop={3} borderTopLeftRadius={15} borderBottomLeftRadius={15}/>
        <Skeleton h={180} width={'100%'} marginTop={3} borderTopLeftRadius={15} borderBottomLeftRadius={15}/>
        <Skeleton h={180} width={'100%'} marginTop={3} borderTopLeftRadius={15} borderBottomLeftRadius={15}/>
        <Skeleton h={180} width={'100%'} marginTop={3} borderTopLeftRadius={15} borderBottomLeftRadius={15}/> */}
        <Text>Loading...</Text>
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
        
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
  },
  
  searchContainer:{
   flexDirection:'row', 
   justifyContent:'space-evenly',
   alignItems:'center',
   backgroundColor:'white',
   paddingBottom:10
  },

  searchInput:{   
    width:'70%',
    height:50,
    paddingLeft:20,
    marginRight:10,
    fontSize:16
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
    color:'black',
    fontSize:18,
    
  },
  bookAuthor:{
    fontSize:14,
    color:'black',
    
  },
  resultContainer:{

  },
  line:{
    height:1,
    backgroundColor:'grey',
    marginHorizontal:20
  }

  
 
})
