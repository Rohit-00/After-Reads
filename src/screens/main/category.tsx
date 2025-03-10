import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import { colors } from '../../../utils/colors'
import { truncateText } from '../../../utils/helpers'
import Icon from '@expo/vector-icons/Ionicons';

const MAX_TITLE_LENGTH = 20;


const Category = ({route,navigation}:any) => {
    const category = route.params.category
    const [datad, setData] = useState<any>()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getLibrary = async() =>{
        const {data,error} = await supabase.from('recommendations')
        .select('*')
        .eq('category',category)
        setData(data)
        setLoading(false)
              
        }
        getLibrary()
  
          },[])
  return (
    <View>
   <View style={styles.headingContainer}>
      <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
        <Icon name='arrow-back' size={24} />
      </TouchableOpacity>
      <Text style={styles.heading}>{category}</Text>
    </View>

     <View style={styles.container}>
     <FlatList
        data={datad}
        keyExtractor={(item) => item.bookId}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
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
      />
      </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
    heading:{
        fontSize:20,
        marginHorizontal:10 ,
        
       
     
      },
      flatListContainer: {
        paddingBottom: 120, // Increased bottom padding
      },
      container:{
        backgroundColor:colors.background,
        
      },
      headingContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        padding:10,

      },

    image: {
        width: 150,
        margin:30,
        marginBottom:0,
        height: 200, // Adjust the height as needed
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
        textAlign:'center'
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
    back:{
      margin:10,
     
      
    },
})