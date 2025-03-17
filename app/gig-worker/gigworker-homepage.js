import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRouter } from 'expo-router';
import { useUser } from '../../src/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const bookmarkIcon = require('../assets/icons/bookmark-icon.png'); 

// Example data
const gigs = [
  {
    gig_id: '1',
    name: 'James Doe',
    description: 'I need a Programmer with experience in Java, React JS...',
    image: require('../assets/images/JohnDoeProfile.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$45/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-20',
    end_date: '2025-03-21',
  },
  {
    gig_id: '2',
    name: 'Sarah Smith',
    description: 'Looking for a Full-Stack dev, remote or hybrid, starts next month...',
    image: require('../assets/images/profile-picture.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$22/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-22',
    end_date: '2025-03-23',
  },
  {
    gig_id: '3',
    name: 'Michael Johnson',
    description: 'Seeking a Data Scientist with expertise in Python and Machine Learning...',
    image: require('../assets/images/JohnDoeProfile.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$80/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-24',
    end_date: '2025-03-25',
  },
  {
    gig_id: '4',
    name: 'Emily Davis',
    description: 'Need a Graphic Designer for a new marketing campaign...',
    image: require('../assets/images/profile-picture.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$50/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-26',
    end_date: '2025-03-27',
  },
  {
    gig_id: '5',
    name: 'David Wilson',
    description: 'Looking for a Project Manager with experience in Agile methodologies...',
    image: require('../assets/images/JohnDoeProfile.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$60/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-28',
    end_date: '2025-03-29',
  },
  {
    gig_id: '6',
    name: 'Sarah Brown',
    description: 'Seeking a Content Writer for our tech blog...',
    image: require('../assets/images/profile-picture.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$35/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-03-30',
    end_date: '2025-03-31',
  },
  {
    gig_id: '7',
    name: 'Chris Evans',
    description: 'Need a DevOps Engineer to manage our cloud infrastructure...',
    image: require('../assets/images/JohnDoeProfile.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$45/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-04-01',
    end_date: '2025-04-02',
  },
  {
    gig_id: '8',
    name: 'Natalie Portman',
    description: 'Looking for a Marketing Specialist to boost our online presence...',
    image: require('../assets/images/profile-picture.png'),
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
    payment_details: {
      payRate: '$20/hr',
      type: 'hourly',
    },
    status: 'open',
    start_date: '2025-04-03',
    end_date: '2025-04-04',
  },
];

export default function GigWorkerHomePage() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const { setUserType } = useUser() || {};
  const [noMoreGigs, setNoMoreGigs] = useState(false);
  const [userId, setUserId] = useState(null);

  const onSwipedLeft = (cardIndex) => {
    console.log('Rejected gig:', gigs[cardIndex].gig_id);
  };

  const onSwipedRight = (cardIndex) => {
    console.log('Took gig:', gigs[cardIndex].gig_id);
  };

  const onSwipedAll = () => {
    setNoMoreGigs(true);
  };

  const onTapCard = (cardIndex) => {
    const gigId = gigs[cardIndex].gig_id;
    router.push({
      pathname: `/gig-worker/apply/${gigs[cardIndex].gig_id}`,
      params: {gig: JSON.stringify(gigs[cardIndex])}
    });    
  };

  const handleBookmarkPress = () => {
    Alert.alert('Gig bookmarked');
  };

  // Render each card
  const renderCard = (card) => {
    if (!card) return null;
    return (
      <View style={styles.card}>
        <View style={styles.cardBackgroundContainer}>
          <View style={styles.cardPurpleBg} />
          <View style={styles.cardWhiteTop} />
        </View>

        {/* Bookmark icon */}
        <TouchableOpacity style={styles.bookmarkWrapper} onPress={handleBookmarkPress}>
          <Image source={bookmarkIcon} style={styles.bookmarkIcon} />
        </TouchableOpacity>

        {/* Profile image */}
        <Image source={card.image} style={styles.cardImage} />
        <Text style={styles.cardName}>{card.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {card.description}
        </Text>
      </View>
    );
  };

  // X button => swipeLeft, check/arrow => swipeRight
  const handleNoPress = () => {
    console.log('Rejected gig:', gigs[0].gig_id);
    swiperRef.current?.swipeLeft(); 
  };

  const handleYesPress = () => {
    console.log('Accepted gig:', gigs[0].gig_id);
    swiperRef.current?.swipeRight();
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gigs for you</Text>
        <View style={styles.profileIconWrapper}>
          <Image
            source={require('../assets/icons/profile-icon.png')} 
            style={styles.profileIcon}
          />
        </View>
      </View>

      {/* Deck Swiper */}
      <View style={styles.swiperContainer}>
        {noMoreGigs ? (
          <View style={styles.noMoreGigsContainer}>
            <Text style={styles.noMoreGigsText}>No more gigs to display</Text>
            <TouchableOpacity onPress={() => handleNavigate('/gig-worker/gigworker-search')}>
              {/*navigate to search*/}
              <Text style={{ color: '#007BFF' }}>Search for more gigs</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Swiper
            ref={swiperRef}
            cards={gigs}
            renderCard={renderCard}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            onSwipedAll={onSwipedAll}
            onTapCard={onTapCard}
            cardIndex={0}
            backgroundColor="#fff"
            stackSize={3}
            infinite={false}
            showSecondCard={true}
            cardStyle={{
              width: '90%',
              height: '85%',
              borderRadius: 20,
              backgroundColor: '#fff',
            }}
          />
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.circleButton, styles.noButton]} onPress={handleNoPress}>
          <Text style={styles.circleButtonText}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, styles.yesButton]} onPress={handleYesPress}>
          <Text style={styles.circleButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  noButton: {
    backgroundColor: '#ff5252', // red
  },
  yesButton: {
    backgroundColor: '#66bb6a', // kinda green
  },
  // Swiper
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noMoreGigsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreGigsText: {
    fontSize: 20,
    color: '#666',
  },
  // Card
  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9B85EC', 
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  cardBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardPurpleBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#D2C7F7', // your purple color
  },
  cardWhiteTop: {
    position: 'absolute',
    width: '200%',
    height: '55%',
    backgroundColor: '#fff',
    transform: [{ rotate: '-45deg' }],
    top: '-10%',
    left: '-80%',
  },
  bookmarkWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 15,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    alignItems: 'center',
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 999,
  },
});
