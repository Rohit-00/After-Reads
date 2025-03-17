import {  StyleSheet, View, Pressable , TouchableOpacity,ScrollView} from 'react-native'
import { useState, useEffect, lazy, Suspense } from 'react';
import Icon2 from '@expo/vector-icons/Ionicons';
import {GoogleGenerativeAI} from '@google/generative-ai'

import Markdown from 'react-native-markdown-display'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../../utils/supabase';
import { Text } from 'react-native';
import  Constants  from 'expo-constants';
import { colors } from '../../../utils/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const genAI = new GoogleGenerativeAI(Constants.expoConfig?.extra!.GOOGLE_GEMINI_API_KEY)


export default function Reader({route,navigation}:any){
    const title = route.params.title
    const author = route.params.author
    const id = route.params.id
    const language = route.params.language
    
    const [summary,setSummary] = useState<any>(null)
    const [loading,setLoading] = useState(true)

    

    const storeData = async (id:any,value:any) => {
      try {
        await AsyncStorage.setItem(id, value);
      } catch (e) {
        console.log(e)
      }
    };
    
    const getData = async (id:string) => {
      try {
        const value:any = await AsyncStorage.getItem(id);
        
        if(value){
          setLoading(false)
        }

        return value
        
      } catch (e) {
        console.log(e)
      }
    };

    function refresh(){
      setLoading(true)
      run('Write a summary of the book'+title+'by'+author+".don't give an overview instead explain the whole book. Keep the summary detailed. And write it in"+language+"language")
    }
    async function run(input:string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const prompt = input
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        storeData(id,text)

        
        const { data, error } = await supabase
        .from('BookSummaries')
        .insert([
          { bookId:id,bookTitle:title,summary:text,language:language},
        ])
        .select()
        console.log(error)
        
        setSummary(text)
        setLoading(false)
      }
      catch(err){
        console.log(err)
      }
      }
   
    useEffect(()=>{
      const fetchSummary = async()=>{
        let { data: BookSummaries, error } = await supabase
        .from('BookSummaries')
        .select('*')
        .eq('bookId',id)
        .eq('language',language)
        
        
      if(BookSummaries?.length!==0){
        setSummary(BookSummaries?.at(0).summary)
        setLoading(false)
      }

      else{
        run('Write a summary of the book'+title+'by'+author+".don't give an overview instead explain the whole book. Keep the summary detailed. And write it in"+language+"language"+"and if you can't summarize it then simply reply 'Unable to summarise this book, choose a different one'")
        
      }
    }
      fetchSummary()
    },[])

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
        <View style={styles.back}><TouchableOpacity onPress={()=>{navigation.pop(); setSummary(null)}} ><Icon2 name='close-outline' color='#00C896' size={38} /></TouchableOpacity></View>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
        <View style={styles.buttons}><TouchableOpacity onPress={refresh}><Icon2 name='refresh' color='#00C896' size={32} /></TouchableOpacity></View>
        </View>
        </View>
        <ScrollView style={{ flex:1,height:'100%'}}>
        {loading?
        <SkeletonPlaceholder>
        <View style={{flexDirection:'column',alignItems:'flex-start',margin:10,height:'100%'}}>
       <View style={{width:'70%',height:40,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>
       <View style={{width:'100%',height:20,marginVertical:5}}/>

   

          
          
        </View>
        </SkeletonPlaceholder>
       //What a mess
        :
        <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Markdown style={styles}>{summary?summary:''}</Markdown>
        </View>
        
      }
        
        </ScrollView>
      </View>
    )
  }

const styles = StyleSheet.create({
    title:{
      fontSize:32,
      paddingTop:20,
      lineHeight:30
      
    },
    author:{
      color:'#00C896'
    },
    body:{
      
    },
    heading2:{
      
      fontSize:20
    },
    container:{
      marginHorizontal:10,
      flex:1,
      backgroundColor:colors.secondBackground
    },
    back:{
      marginVertical:10
    },
    iconContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    buttons:{
      marginHorizontal:10
    }
    

    
})
