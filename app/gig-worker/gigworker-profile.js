import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from "../../src/context/UserContext";
import { signOut } from "../../src/services/authService";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GigTabs from './components/gigTabs';

const sampleProfileImage = require('../assets/images/profile-picture.png');
const editIcon = require('../assets/icons/edit-icon.png');

export default function GigWorkerProfile() {
  const router = useRouter();
  const { setUserType } = useUser(); // get user context
  const [userId, setUserId] = useState(null);
  const [ProfileName, setProfileName] = useState('Angelica Jackson');
  const [followersCount, setFollowersCount] = useState(120);
  const [followingCount, setFollowingCount] = useState(80);
  const [reviewsCount, setReviewsCount] = useState(25);
  const [averageRating, setAverageRating] = useState(4.5);
  const [topCategory, setTopCategory] = useState('Web Development');
  const [gigCount, setGigCount] = useState({ past: 10, current: 2, pending: 5 });
  const [pastGigs, setPastGigs] = useState([
    { id: '1', name: 'AI Bot Design', status: 'completed' },
    { id: '2', name: 'Gig B', status: 'completed' },
  ]);
  const [currentGigs, setCurrentGigs] = useState([
    { id: '3', name: 'Gig C', status: 'in_progress' },
    { id: '4', name: 'Gig D', status: 'in_progress' },
  ]);
  const [pendingGigs, setPendingGigs] = useState([
    { id: '5', name: 'Gig E', status: 'open' },
    { id: '6', name: 'Gig F', status: 'open' },
  ]);

  // Handler for editing profile
  const handleChangeProfile = () => {
    router.push('/gig-worker/gigworker-edit-profile');
  };

  // Switch to Client
  const handleSwitchToClient = () => {
    setUserType("client");
    router.replace("/client/client-homepage");
  };

  // Sign out
  const handleSignOut = async () => {
    console.log("Sign out pressed");
    try {
      await signOut();            
      setUserType(null);      
      router.replace("/auth");
      await AsyncStorage.clear();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  // Handlers for navigating to detailed pages
  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Title at the top */}
        <Text style={styles.title}>Your Profile (Gig Worker)</Text>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image source={sampleProfileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIconWrapper} onPress={handleChangeProfile}>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{ProfileName}</Text>
          <Text style={styles.role}>Analyzer</Text>

          <TouchableOpacity onPress={handleChangeProfile}>
            <Text style={styles.changeProfileText}>Change profile</Text>
          </TouchableOpacity>
        </View>

        {/* Displays Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Profile Info</Text>
          <TouchableOpacity style={styles.infoTOContainer} onPress={() => handleNavigate('/gig-worker/profile-details/top-field-of-work')}>
            <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Top Field of Work: </Text>
            <Text style={styles.infoItemLeft}>{topCategory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer} onPress={() => handleNavigate('/gig-worker/profile-details/resume')}>
            <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Resume: </Text>
            <Text style={styles.infoItemLeft}>Preview Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer} onPress={() => handleNavigate('/gig-worker/profile-details/reviews')}>
            <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Reviews:</Text>
            <Text style={styles.infoItemLeft}>{reviewsCount} reviews, {averageRating}/5 average</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer} onPress={() => handleNavigate('/gig-worker/profile-details/followers-following')}>
            <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Network Followers: </Text>
            <Text style={styles.infoItemLeft}>{followersCount} followers, Following: {followingCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          <GigTabs pastGigs={pastGigs} currentGigs={currentGigs} pendingGigs={pendingGigs} />
        </View>

        {/* Switch to Client Button */}
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchToClient}>
          <Text style={styles.switchText}>Switch to Client</Text>
        </TouchableOpacity>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  changeProfileText: {
    fontSize: 16,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'ghostwhite',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoTOContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  infoItemLeft: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 10,
    flexShrink: 1,
  },
  tabsContainer: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'ghostwhite',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
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
    fontSize: 16,
    fontWeight: '600',
  },
});