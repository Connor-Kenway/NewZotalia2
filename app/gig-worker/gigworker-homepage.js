import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRouter } from 'expo-router';
import { useUser } from '../../src/context/UserContext';

const bookmarkIcon = require('../assets/icons/bookmark-icon.png'); 
// Example data
const gigsData = [
  {
    id: '1',
    name: 'James Doe',
    description: 'I need a Programmer with experience in Java, React JS...',
    image: require('../assets/images/JohnDoeProfile.png'),
  },
  {
    id: '2',
    name: 'Sarah Smith',
    description: 'Looking for a Full-Stack dev, remote or hybrid, starts next month...',
    image: require('../assets/images/profile-picture.png'),
  },
];

export default function GigWorkerHomePage() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const { setUserType } = useUser() || {};

  const onSwipedLeft = (cardIndex) => {
    console.log('Rejected gig:', gigsData[cardIndex].id);
  };

  const onSwipedRight = (cardIndex) => {
    console.log('Took gig:', gigsData[cardIndex].id);
  };

  const onTapCard = (cardIndex) => {
    const gigId = gigsData[cardIndex].id;
    router.push({
      pathname: `/gig-worker/apply/${gigsData[cardIndex].id}`,
      params: {
        name: gigsData[cardIndex].name,
        imageUri: gigsData[cardIndex].image,
        description: gigsData[cardIndex].description,
      }
    });    
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
        <TouchableOpacity style={styles.bookmarkWrapper} onPress={() => console.log('Bookmark pressed')}>
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
    console.log('Rejected gig:', gigsData[0].id);
    swiperRef.current?.swipeLeft(); 
  };

  const handleYesPress = () => {
    console.log('Accepted gig:', gigsData[0].id);
    swiperRef.current?.swipeRight();
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
        <Swiper
          ref={swiperRef}
          cards={gigsData}
          renderCard={renderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
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
