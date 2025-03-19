import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabase'
import { colors } from '../../../utils/colors'
import { changeHttpToHttps, truncateText } from '../../../utils/helpers'
import Icon from '@expo/vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

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
    <>
   <View style={styles.headingContainer}>
      <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
        <Icon name='arrow-back' size={24} color={colors.text}/>
      </TouchableOpacity>
      <Text style={styles.heading}>{category}</Text>
    </View>

     <View style={styles.container}>
      {loading?
      <View style={{height:'100%'}}>
      <SkeletonPlaceholder backgroundColor={colors.secondBackground} highlightColor={colors.skeletonHighlight}>
        <View style={{flexDirection:'column',height:'100%'}}>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,justifyContent:'center'}}>
        <View style={{height:250,width:170,margin:20}}/>
        <View style={{height:250,width:170,margin:20}}/>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,justifyContent:'center'}}>
        <View style={{height:250,width:170,margin:20}}/>
        <View style={{height:250,width:170,margin:20}}/>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,justifyContent:'center'}}>
        <View style={{height:250,width:170,margin:20}}/>
        <View style={{height:250,width:170,margin:20}}/>
        </View>
        </View>
      </SkeletonPlaceholder>
      </View>
      :

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
                   <Image source={{ uri: changeHttpToHttps(item.bookThumbnail)}} style={styles.image}/>
                   </View>
                   </TouchableOpacity>
                   <View>
                   <Text style={styles.bookTitle}>{truncateText(item.bookTitle,20)}</Text>
                   <Text style={styles.bookAuthor}>{item.bookAuthor}</Text>
                     </View>
                   </View>
              
      
      )}
    />
      
      }
     
      </View>
    </>
  )
}

export default Category

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
      container:{
        backgroundColor:colors.secondBackground,
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
        
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
        margin:20,
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
    back:{
      margin:10,
     
      
    },
})