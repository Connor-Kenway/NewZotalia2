import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from "../../src/context/UserContext";
import { signOut } from "../../src/services/authService";

import { useState, useEffect } from 'react';
import TabBar from '../components/tabbar';
import { fetchFollowers } from '../../src/services/followsServic';
import { fetchGigWorkerProfile } from '../../src/services/clientProfileService';
import { fetchFollowersCount, fetchFollowingCount } from '../../src/services/followsServic';
  const sampleProfileImage = require('../assets/images/profile-picture.png');
  const editIcon = require('../assets/icons/edit-icon.png');

export default function GigWorkerProfile() {
  const router = useRouter();
  const { setUserType } = useUser(); // get user context
  const [gigs, setGigs] = useState([]);
  const [ProfileName, setProfileName] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  //refactor the use effect to load gigs into shared component
  useEffect(() => {
    const loadGigs = async () => {
      console.log('hitting use effect')
      const response = await fetchGigs();
      console.log('after response')
      if (response.success !== false) {
        setGigs(response);
        // setFilteredGigs(response);
        console.log('success')
      } else {
        console.log('failed')
        console.error(response.message);
      }
    };

    loadGigs();
  }, []);
//loads the follower and following count
  useEffect(() => {
    const loadFollowersandFollowingCount = async () => {
      console.log('loading followers and following count');
      const response = await fetchFollowersCount(userId);
      if (response.success !== false) {
        setFollowersCount(response.followed_count);
        console.log('Followers:', response);
      } else {
        console.error(response.message);
      }
      const response2 = await fetchFollowingCount(userId);
      if (response2.success !== false) {
        setFollowingCount(response2.follower_count);
        console.log('Following:', response2);
      } else {
        console.error(response2.message);
      }
    }
    loadFollowersandFollowingCount();
  }, []);

  useEffect(() => {
    const loadProfileName = async () => {
      console.log('hitting use effect')
      const response = await fetchGigs();
      console.log('after response')
      if (response.success !== false) {
        setGigs(response);
        // setFilteredGigs(response);
        console.log('success')
      } else {
        console.log('failed')
        console.error(response.message);
      }
    };

    loadGigs();
  }, []);


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
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

    // Handlers for navigating to detailed pages
    //depending on route might need to pass through different data
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

          <Text style={styles.name}>Angelica Jackson</Text>
          <Text style={styles.role}>Analyzer</Text>

          <TouchableOpacity onPress={handleChangeProfile}>
            <Text style={styles.changeProfileText}>Change profile</Text>
          </TouchableOpacity>
        </View>

        {/* Displays Section */}
        <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Displays:</Text>
          <TouchableOpacity onPress={() => handleNavigate('/gig-worker/profile-details/top-field-of-work')}>
            <Text style={styles.infoItem}>• Top Field of Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('/gig-worker/profile-details/resume-portfolio')}>
            <Text style={styles.infoItem}>• Resume/Built-in portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('/gig-worker/profile-details/reviews')}>
            <Text style={styles.infoItem}>• Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('/gig-worker/profile-details/followers-following')}>
            <Text style={styles.infoItem}>• Followers: {followersCount},  Following: {followingCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Tabs:</Text>
          <Text style={styles.infoItem}>• Past Gigs</Text>
          <Text style={styles.infoItem}>• Current Gigs</Text>
          <Text style={styles.infoItem}>• Pending Gigs</Text>
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
