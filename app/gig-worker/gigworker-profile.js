import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TabBar from '../components/tabbar';

// const sampleProfileImage = require('../../assets/images/sample-user.jpg');
// const editIcon = require('../../assets/icons/edit-icon.png');

export default function GigWorkerProfile() {
    const handleChangePicture = () => {
        
    };
    
    const handleChangeProfile = () => {
        router.push('/gig-worker/gigworker-edit-profile');
    };

  return (
    <View style={styles.container}>
      {/* Title at the top */}
      <Text style={styles.title}>Your Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.imageWrapper}>
          {/* Small edit icon overlapping the image */}
          <TouchableOpacity style={styles.editIconWrapper} onPress={handleChangeProfile}>
            {/* <Image source={editIcon} style={styles.editIcon} /> */}
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Angelica Jackson</Text>
        <Text style={styles.role}>Analyzer</Text>

        <TouchableOpacity onPress={handleChangeProfile}>
          <Text style={styles.changeProfileText}>Change profile</Text>
        </TouchableOpacity>
      </View>

      {/* Displays Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Displays:</Text>
        <Text style={styles.infoItem}>• Top Field of Work</Text>
        <Text style={styles.infoItem}>• Resume/Built-in portfolio</Text>
        <Text style={styles.infoItem}>• Reviews</Text>
        <Text style={styles.infoItem}>• Followers + Following</Text>
      </View>

      {/* Tabs Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Tabs:</Text>
        <Text style={styles.infoItem}>• Past Gigs</Text>
        <Text style={styles.infoItem}>• Current Gigs</Text>
        <Text style={styles.infoItem}>• Pending Gigs</Text>
      </View>
        <TabBar />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // or use SafeAreaView
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ff6f61',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff', // If you want to tint the edit icon
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  changeProfileText: {
    fontSize: 14,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  infoHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  infoItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 2,
  },
});
