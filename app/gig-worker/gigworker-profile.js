import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from "../../src/context/UserContext";
import { signOut } from "../../src/services/authService";

import { useState, useEffect } from 'react';
import TabBar from '../components/tabbar';
import { fetchFollowers } from '../../src/services/followsServic';
import { fetchGigWorkerProfile, fetchCountOfGigWorkerReviews, fetchGigWorkerAverageRating, fetchTopWorkCategory, fetchAllGigsCount } from '../../src/services/clientProfileService';
import { fetchFollowersCount, fetchFollowingCount } from '../../src/services/followsServic';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import GigTabs from './components/gigTabs';


  const sampleProfileImage = require('../assets/images/profile-picture.png');
  const editIcon = require('../assets/icons/edit-icon.png');

export default function GigWorkerProfile() {
  const router = useRouter();
  const { setUserType } = useUser(); // get user context
  const [userId, setUserId] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [ProfileName, setProfileName] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [topCategory, setTopCategory] = useState('');
  const [gigCount, setGigCount] = useState({});
  const [pastGigs, setPastGigs] = useState([]);
  const [currentGigs, setCurrentGigs] = useState([]);
  const [pendingGigs, setPendingGigs] = useState([]);
  //gets the user_id
  useEffect(() => {
    const getUserId = async () => {
      console.log("Getting user ID from token...");
      try {
        const token = await AsyncStorage.getItem("access_token");
        console.log('pausing on the await');
        console.log(token);
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken.sub);
          setUserId(decodedToken.sub);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };
    getUserId();
  }, []);
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
  }, [userId]);
//loads the follower and following count
  useEffect(() => {
    const loadFollowersandFollowingCount = async () => {
      console.log('loading followers and following count');
      const response = await fetchFollowersCount(userId);
      console.log(response,"response")
      if (response.success !== false) {
        setFollowersCount(response.followed_count);
        console.log('Followers:', response);
      } else {
        console.error(response.message);
      }
      const response2 = await fetchFollowingCount(userId);
      if (response2.success !== false) {
        console.log('look at this object', response2);
        setFollowingCount(response2.follower_count);
        console.log('Following:', response2);
      } else {
        console.error(response2.message);
      }
    }
    loadFollowersandFollowingCount();
  }, [userId]);
//suppose to load the profile name 
//need to fix this
  // useEffect(() => {
  //   const loadProfileName = async () => {
  //     console.log('hitting use effect')
  //     const response = await fetchGigs();
  //     console.log('after response')
  //     if (response.success !== false) {
  //       setProfileName(response);
  //       // setFilteredGigs(response);
  //       console.log('success')
  //     } else {
  //       console.log('failed')
  //       console.error(response.message);
  //     }
  //   };

  //   loadProfileName();
  // }, []);

  //load the reviews and ratings
  useEffect(() => {
    const loadReviews = async () => {
      const response = await fetchCountOfGigWorkerReviews(userId);
      console.log('please work')
      console.log('is this being hit')
      if (response.success !== false) {
        console.log('in load reviews')
        setReviewsCount(response.count);
        console.log('Review:', response);
      } else {
        console.error(response.message);
      }

      const response2 = await fetchGigWorkerAverageRating(userId);
      if (response2.success !== false) {
        console.log('look at this objecttttt', response2)
        setAverageRating(response2);
        console.log('Average Rating:', response2);
      } else {
        console.error(response2.message);
      }
    };
    loadReviews();
  }, [userId]);

  //load the top category
  useEffect(() => {
    const loadTopCategory = async () => {
      const response = await fetchTopWorkCategory(userId);
      if (response.success !== false) {
        setTopCategory(response);
        console.log('Top Category:', response);
      } else {
        console.error(response.message);
      }
    };
    loadTopCategory();
  }, [userId]);

  //load in the past, present, and pending gigs count
  useEffect(() => {
    const loadGigCount = async () => {
      const response = await fetchAllGigsCount(userId);
      if (response.success !== false) {
        setGigCount(response);
        console.log('Gig Count:', response);
      } else {
        console.error(response.message);
      }
    };
    loadGigCount();
  }, [userId]);

    //loads the past, present, and pending gigs
  useEffect(() => {
      if (userId) {
        const loadGigs = async () => {
          const response = await fetchAllGigs(userId);
          if (response.success !== false) {
            pastGigs = response.filter(gig => gig.status === 'completed');
            currentGigs = response.filter(gig => gig.status === 'in_progress');
            pendingGigs = response.filter(gig => gig.status === 'open');
            setPastGigs(pastGigs);
            setCurrentGigs(currentGigs);
            setPendingGigs(pendingGigs);
          }
        };
        loadGigs();
      }
    }, [userId]);

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
        <Text style={styles.infoHeader}>Profile Info</Text>
          <TouchableOpacity style={styles.infoTOContainer}onPress={() => handleNavigate('/gig-worker/profile-details/top-field-of-work')}>
            <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Top Field of Work: </Text>
            <Text style={styles.infoItemLeft}>{topCategory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer}onPress={() => handleNavigate('/gig-worker/profile-details/resume')}>
          <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer}onPress={() => handleNavigate('/gig-worker/profile-details/reviews')}>
          <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Reviews:</Text>
            <Text style={styles.infoItemLeft}>{reviewsCount} reviews, {averageRating}/5 average</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoTOContainer}onPress={() => handleNavigate('/gig-worker/profile-details/followers-following')}>
          <Icon name="briefcase-outline" size={24} color="#6A1B9A" />
            <Text style={styles.infoItem}>Network Followers: </Text>
            <Text style={styles.infoItemLeft}>{followersCount} followers,  Following: {followingCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs Section */}
        <View style={styles.infoContainer}>
          <GigTabs pastGigs={pastGigs} currentGigs={currentGigs} pendingGigs={pendingGigs}/>
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
    backgroundColor: 'ghostwhite',
    padding: 10,
    
  },
  infoTOContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  infoItem: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    marginBottom: 2,
  },
  infoItemLeft:{
    fontSize: 16,
    color: 'grey',
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