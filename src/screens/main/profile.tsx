import React,{useCallback,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,Linking,Alert } from 'react-native';
import { useAuth } from '../../../store/authContext';
import { colors } from '../../../utils/colors';
  const url = 'https://x.com/byir0nic'


const Profile: React.FC = () => {

  const {signOut} = useAuth();

  const handlePress = useCallback(async () => {
   
    const supported = await Linking.canOpenURL(url);
      await Linking.openURL(url);
  
  }, [url]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/94440631?v=4' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Note From The Dev</Text>
        <Text style={styles.profileSubtitle}>This is not a full fledged app, it's just my(Rohit) side project. 
      You can follow me on X to get updates related to this or my another projects.</Text>
      </View>
      <View style={styles.menuSection}>
       
        <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
          <Text style={styles.menuItemText}>Follow me on X (Byironic)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={async()=>{await signOut()}}>
          <Text style={[styles.menuItemText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign:'justify',
    marginHorizontal:10
  },
  menuSection: {
    marginTop: 16,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemText: {
    fontSize: 18,
    color: colors.text,
  },
});

export default Profile;
