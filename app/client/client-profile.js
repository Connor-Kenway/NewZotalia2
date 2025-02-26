import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from "../../src/context/UserContext";
import TabBar from '../components/tabbar';

const sampleProfileImage = require('../assets/images/profile-picture.png');
const editIcon = require('../assets/icons/edit-icon.png');

export default function ClientProfile() {
  const router = useRouter();
  const { userType, setUserType } = useUser();

  const handleChangeProfile = () => {
    console.log("Change profile pressed");
    // e.g., router.push("/client/edit-profile");
  };

  const handleSignOut = () => {
    console.log("Sign out pressed");
    // e.g., remove tokens, router.replace("/auth");
  };

  // Switch to gig worker
  const handleSwitchToGigWorker = () => {
    setUserType("gig-worker");
    router.replace("/gig-worker/gigworker-homepage");
  };

  const pastGigs = [
    { id: '1', name: "Website Development", description: "Lorem ipsum..." },
    { id: '2', name: "Chatbot Implementation", description: "Lorem ipsum..." },
  ];

  const renderGigItem = ({ item }) => (
    <View style={styles.gigItem}>
      <Text style={styles.gigName}>{item.name}</Text>
      <Text style={styles.gigDesc} numberOfLines={1}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>Your Profile (Client)</Text>

        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image source={sampleProfileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIconWrapper} onPress={handleChangeProfile}>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Angelica Jackson</Text>
          <Text style={styles.role}>Recruiter</Text>

          <TouchableOpacity onPress={handleChangeProfile}>
            <Text style={styles.changeProfileText}>Change profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Displays:</Text>
          <Text style={styles.infoItem}>• Category/Industry</Text>
          <Text style={styles.infoItem}>• Reviews</Text>
          <Text style={styles.infoItem}>• Followers + Following</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Past Posted Gigs</Text>
          <FlatList
            data={pastGigs}
            keyExtractor={(item) => item.id}
            renderItem={renderGigItem}
            contentContainerStyle={{ paddingVertical: 5 }}
          />
        </View>

        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchToGigWorker}>
          <Text style={styles.switchText}>Switch to Gig Worker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
    alignItems: 'center',
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
  imageWrapper: { position: 'relative' },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
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
  editIcon: { width: 18, height: 18, tintColor: '#fff' },
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
    width: '90%',
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
  gigName: { fontSize: 14, fontWeight: 'bold', marginBottom: 2, color: '#333' },
  gigDesc: { fontSize: 12, color: '#777' },
  switchButton: {
    backgroundColor: "#6A1B9A",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  switchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signOutButton: {
    backgroundColor: '#6A1B9A',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
