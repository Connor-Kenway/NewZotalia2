import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Stub (replace with your actual images)
// const sampleProfileImage = require('../../assets/images/sample-user.jpg');
// const editIcon = require('../../assets/icons/edit-icon.png');

export default function ClientProfile() {
  const router = useRouter();

  // Handler for changing profile details (edit info, etc.)
  const handleChangeProfile = () => {
    console.log("Change profile pressed");
    // e.g., router.push("/client/edit-profile") if you have a screen for editing
  };

  // Handler for sign-out
  const handleSignOut = () => {
    console.log("Sign out pressed");
    // e.g., remove tokens from AsyncStorage, router.replace("/auth"), etc.
  };

  // Placeholder data for "Past Posted Gigs"
  const pastGigs = [
    { id: '1', name: "Website Development", description: "Lorem ipsum dolor sit amet..." },
    { id: '2', name: "Chatbot Implementation", description: "Lorem ipsum dolor sit amet..." },
  ];

  // Renders each gig item
  const renderGigItem = ({ item }) => (
    <View style={styles.gigItem}>
      <Text style={styles.gigName}>{item.name}</Text>
      <Text style={styles.gigDesc} numberOfLines={1}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Your Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.imageWrapper}>
          {/* Profile Image */}
          {/* <Image source={sampleProfileImage} style={styles.profileImage} /> */}
          {/* Edit Icon Overlapping */}
          <TouchableOpacity style={styles.editIconWrapper} onPress={handleChangeProfile}>
            {/* <Image source={editIcon} style={styles.editIcon} /> */}
          </TouchableOpacity>
        </View>

        {/* Name + Role */}
        <Text style={styles.name}>Angelica Jackson</Text>
        <Text style={styles.role}>Recruiter</Text>

        {/* "Change profile" link */}
        <TouchableOpacity onPress={handleChangeProfile}>
          <Text style={styles.changeProfileText}>Change profile</Text>
        </TouchableOpacity>
      </View>

      {/* Displays Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Displays:</Text>
        <Text style={styles.infoItem}>• Category/Industry</Text>
        <Text style={styles.infoItem}>• Reviews</Text>
        <Text style={styles.infoItem}>• Followers + Following</Text>
      </View>

      {/* Past Posted Gigs Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Past Posted Gigs</Text>
        <FlatList
          data={pastGigs}
          keyExtractor={(item) => item.id}
          renderItem={renderGigItem}
          contentContainerStyle={{ paddingVertical: 5 }}
        />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
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
    tintColor: '#fff',
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
  gigItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  gigName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  gigDesc: {
    fontSize: 12,
    color: '#777',
  },
  signOutButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#6A1B9A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
