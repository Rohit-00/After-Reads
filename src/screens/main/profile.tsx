import React,{useCallback,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,Linking,Alert } from 'react-native';
import { useAuth } from '../../../store/authContext';
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
          source={{ uri: 'https://pbs.twimg.com/profile_banners/1750467753272877056/1706179078/1500x500' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Note From The Dev</Text>
        <Text style={styles.profileSubtitle}>This is not an full fledged app, it's just my(Rohit) side project. 
          I'll keep it live untill I couldn't afford the infrastructure cost. You can follow me on X to get updates related to this or my another projects.</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#ff69b4',
    fontSize: 16,
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
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Profile;
