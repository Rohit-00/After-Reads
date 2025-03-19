import { Text, StyleSheet, View,  TouchableOpacity,  ScrollView, StatusBar, Image, Modal} from 'react-native'
import { useEffect, useState, useRef, useContext} from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { supabase } from '../../../utils/supabase';
import { BookmarkContext } from '../../../store/bookmarkContextProvider';
import Markdown from 'react-native-markdown-display';
import { useAuth } from '../../../store/authContext';
import ImageColors from 'react-native-image-colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from '../../../utils/colors';
import { changeHttpToHttps } from '../../../utils/helpers';

const languages = [{id:1,lang:'Arabic'},
  {id:2,lang:'Bengali'},
  {id:3,lang:'Bulgarian'},
  {id:4,lang:'Chinese simplified'},
  {id:5,lang:'Chinese traditional'},
  {id:6,lang:'Croatian'},
  {id:7,lang:'Czech'},
  {id:8,lang:'Danish'},
  {id:9,lang:'Dutch'},
  {id:10,lang:'English'},
  {id:11,lang:'Estonian'},
  {id:12,lang:'Finnish'},
  {id:13,lang:'French'},
  {id:14,lang:'German'},
  {id:15,lang:'Greek'},
  {id:16,lang:'Hebrew'},
  {id:17,lang:'Hindi'},
  {id:18,lang:'Hungarian'},
  {id:19,lang:'Indonesian'},
  {id:20,lang:'Italian'},
  {id:21,lang:'Japanese'},
  {id:22,lang:'Korean'},
  {id:23,lang:'Latvian'},
  {id:24,lang:'Lithuanian'},
  {id:25,lang:'Norwegian'},
  {id:26,lang:'Polish'},
  {id:27,lang:'Portuguese'},
  {id:28,lang:'Romanian'},
  {id:29,lang:'Russian'},
  {id:30,lang:'Serbian'},
  {id:31,lang:'Slovak'},
  {id:32,lang:'Slovenian'},
  {id:33,lang:'Spanish'}, 
  {id:34,lang:'Swahili'}, 
  {id:35,lang:'Swedish'}, 
  {id:36,lang:'Thai'}, 
  {id:37,lang:'Turkish'}, 
  {id:38,lang:'Ukrainian'}, 
  {id:39,lang:'Vietnamese', }]


export default function BookDetails({route,navigation}:any){
    const {addItem,savedItems} = useContext(BookmarkContext)
    const [loading, setLoading] = useState(true)

    const [showModal,setShowModal] = useState<boolean>(false)
    const [color,setColors] = useState<any>('')
    const [cover,setBookCover] = useState<any>([])
    const [isSaved,setIsSaved] = useState<boolean>()
    const [selectedLanguage, setSelectedLanguage] = useState('English')
    const thumbnail = route.params.thumbnail
    const title = route.params.title
    const author = route.params.author
    const desc = route.params.desc
    const {user} = useAuth();

    const id = route.params.id
    const uid = user!.id

    useEffect(()=>{
      
      const fetchBooks=async()=>{
          try{
                const result = await ImageColors.getColors(changeHttpToHttps(thumbnail), {
                  fallback: '#fff',
                  cache:true,
                  key:thumbnail
                })
          
                if (result.platform === 'android') {
                  setColors(result.average);
                  
                  
                } else if (result.platform === 'ios') {
                  setColors(result.primary);
                  
                }
              }
                catch(error){console.log(error)}
        try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
          const coverUrl = response.data.volumeInfo.imageLinks?.medium;
          setBookCover(coverUrl);

        } catch (error) {
          console.error('Error fetching book cover:', error);
        }
      const {data,error} = await supabase
      .from('ReadLater')
      .select('*')
      .eq('bookId',id)
      .eq('uid',uid)
      if(data?.length===0){
        setIsSaved(false)
        setLoading(false)
        }
      else{
        setIsSaved(true)
        setLoading(false)
      }     
      }  
      fetchBooks()      
            },[])
    
    const addToLibrary = async () =>{
      
      const {data,error} = await supabase
      .from('ReadLater')
      .select('*')
      .eq('bookId',id)
      .eq('uid',uid)
       getLibrary()
if(data?.length===0){
  setIsSaved(true)
  try{
      const data = await supabase
      .from('ReadLater')
      .insert([
        {  bookTitle: title,bookId:id,bookThumbnail:cover,description:desc,bookAuthor:author,uid:uid },
      //  {title:title,qoute:"Failure isn’t a necessary evil. In fact, it isn’t evil at all. It is a necessary consequence of doing something new",
      //   author:author,cover:cover,banner_color:'red',button_color:'blue',bookId:id,bookThumbnail:cover,description:desc
      //  }
        // {  bookTitle: title,bookId:id,bookThumbnail:cover,description:desc,bookAuthor:author,category:'banner'},
      ])
      .select()
      getLibrary()
    }catch(e){
      console.log(e)
    }

      }
else{
  setIsSaved(false) 
  await supabase.from('ReadLater')
  .delete()
  .eq('uid',uid)
  .eq('bookId',id)
  
}
    }
    const getLibrary = async() =>{
          const {data,error} = await supabase.from('ReadLater')
          .select('*')
          .eq('uid',uid)
          .order('created_at',{ascending:false})
          addItem(data)
    }
    return (
      
      <View style={{backgroundColor:colors.secondBackground,height:'100%'}}>
        {loading?
      
          <SkeletonPlaceholder backgroundColor={colors.secondBackground} highlightColor={colors.skeletonHighlight}>
            <View style={{flexDirection:'column',height:'100%'}}>
            <View style={{height:300,width:'100%'}}/>
          
              <View style={{flexDirection:'row',marginHorizontal:10,width:'100%',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                <View style={{flexDirection:'row',gap:4}}>
                <View style={{height:50,width:50,borderRadius:100}}/>
                <View style={{height:50,width:50,borderRadius:100}}/>
                <View style={{height:50,width:50,borderRadius:100}}/>
                </View>
                <View style={{height:50,width:130,borderRadius:100,marginRight:20}}/>
            </View>
            <View style={{width:'50%',height:50, margin:5,marginTop:20}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            <View style={{width:'100%',height:20, margin:5}}/>
            </View>
          </SkeletonPlaceholder>
     
        :
        <View style={{backgroundColor:colors.secondBackground,height:'100%'}}>
        <StatusBar backgroundColor={color}></StatusBar>
        <ScrollView
      
        showsVerticalScrollIndicator={false}
       >
       
        <View style={{backgroundColor:color}}>
        <View style={[styles.back]}><TouchableOpacity onPress={()=>{navigation.pop()}} ><Icon name='chevron-back-outline' color='#00C896' size={38} /></TouchableOpacity></View>
        </View>
       
          <View style={[styles.imageContainer,{backgroundColor:color}]}>
        {cover?
        <Image
        source={{uri:(changeHttpToHttps(cover))}}
        style={[styles.bookCover]} 

        />:
        <Image
        source={{uri:(changeHttpToHttps(thumbnail))}}
        style={[styles.bookCover]} 

        />

      }
          
        </View>
            
        <View style={styles.contentContainer}>
        <View style={styles.buttons}>
          <View style={styles.groupButtons}>
          {isSaved===true?<View style={styles.buttonContainer}><TouchableOpacity onPress={addToLibrary}><View style={styles.button}><Icon name='bookmark' size={26} color='white' ></Icon></View></TouchableOpacity><Text style={styles.buttonLabel}>Saved</Text></View>
          :<View style={styles.buttonContainer}><TouchableOpacity onPress={addToLibrary}><View style={styles.button}><Icon name='bookmark-outline' size={26} color='white' ></Icon></View></TouchableOpacity><Text style={styles.buttonLabel}>Save</Text></View>
        }
          
          <View style={styles.buttonContainer}><TouchableOpacity onPress={()=>setShowModal(true)}><View style={styles.button}><Icon name='language-outline' size={26} color='white' ></Icon></View></TouchableOpacity><Text style={styles.buttonLabel}>{selectedLanguage?selectedLanguage:'English'}</Text></View>
          
          </View>
        <View style={styles.readContainer}>
          
          <TouchableOpacity style={styles.readButton} onPress={()=>{navigation.push('Reader',{title:title,author:author,id:id,language:selectedLanguage})}}><Text style={styles.readText}>Read</Text></TouchableOpacity>
        </View>
        </View>
        
        <View style={styles.detailsContainer}>
        <Modal
  animationType="fade"
  transparent={true}
  visible={showModal}
  onRequestClose={() => setShowModal(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => setShowModal(false)}
      >
        <Icon name="close" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles.modalHeader}>Choose a language</Text>
      <ScrollView style={styles.modalBody}>
        {languages.map((item) => (
          <View style={styles.languageContainer} key={item.id}>
            <TouchableOpacity 
              onPress={() => {
                setSelectedLanguage(item.lang);
                setShowModal(false);
              }}
            >
              <Text style={styles.languageText}>{item.lang}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  </View>
</Modal>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}, </Text>
            <Markdown style={styles}>
              {desc}
            </Markdown>
        </View>
       
        </View>
        
        </ScrollView>
        </View>
        }

      </View>
      
    )
  }

const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.secondBackground,
      height:'100%'
    },
    imageContainer:{
      alignItems:'center',
      padding:20,
      height:300,
      
      
      
    },
    contentContainer:{
    position:'relative',
    backgroundColor:colors.secondBackground,
    height:'100%'
    },
    detailsContainer:{
      marginHorizontal:10,
      height:'100%',
      backgroundColor:colors.secondBackground,


    },
   
    back:{
      margin:10,
      position:"absolute",
      
      top:0,
      left:0,
      zIndex:100

    },
    bookCover:{
        height:250,
        width:300,
        resizeMode:'contain'
    },
    buttons:{
  
      flexDirection:'row',
      justifyContent:'space-between',
   
      top:-20
    },
    button:{
      backgroundColor:"#00C896",
      marginHorizontal:10,
      padding:7,
      borderRadius:100,
      width:50,
      height:50,
      alignItems:'center',
      justifyContent:'center'
    },
    buttonContainer:{
      
    },
    buttonLabel:{
      textAlign:'center',
      fontSize:12,
      color:colors.text
    },
    readButton:{
      padding:12,
      paddingHorizontal:30,
      backgroundColor:'#00C896',
      height:55,
      width:130,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:100,

      
    },
    readText:{
      fontWeight:'bold',
      fontSize:18,
      color:'white'
    },
    groupButtons:{
      flexDirection:'row',
      
      justifyContent:'center'
    },
    readContainer:{
      marginHorizontal:10

    },
    title:{
      fontSize:26,
      fontWeight:'bold',
      color:colors.text
    },
    author:{
      fontSize:16,
      color:'#00C896'
    },
    description:{
      marginVertical:10,
      fontSize:14,
      color:colors.text,
    },
    languageText:{
      fontSize:20,
      color:colors.text,
      fontWeight:'bold',
      textAlign:'center',
      
      
    },
    modalHeader:{
      fontWeight:'bold',
      fontSize:20,
      textAlign:'center',
      color:colors.text
    },
    languageContainer:{
      
      marginVertical:2.5,
      paddingVertical:2.5


    },
    body: {
      color:colors.text
    },
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
modalView: {
  backgroundColor: colors.background,
  borderRadius: 20,
  padding: 20,
  width: '90%',
  maxHeight: '80%',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
closeButton: {
  alignSelf: 'flex-end',
  padding: 5
},
modalBody: {
  marginTop: 15
}
})
