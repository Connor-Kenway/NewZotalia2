import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRouter } from 'expo-router';
import TabBar from '../components/tabbar';

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

  // Called when user swipes left or right
  const onSwipedLeft = (cardIndex) => {
    console.log('Rejected gig:', gigsData[cardIndex].id);
    // Call an API or store the rejection
  };

  const onSwipedRight = (cardIndex) => {
    console.log('Took gig:', gigsData[cardIndex].id);
    // Call an API or store the acceptance
  };

  // Called when user taps the card
  const onTapCard = (cardIndex) => {
    const gigId = gigsData[cardIndex].id;
    router.push(`/gig-worker/gig-detail/${gigId}`);
  };

  // Render each card
  const renderCard = (card) => {
    if (!card) return null;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={() => {
          // We need to find the index of this card to pass to onTapCard
          // But deck-swiper passes that in a callback, so we can do a trick:
          // We'll rely on the onTapCard callback with the currentIndex from the Swiper below.
        }}
      >
        <Image source={card.image} style={styles.cardImage} />
        <Text style={styles.cardName}>{card.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {card.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gig Workers for you</Text>
        <View style={styles.profileIconWrapper}>
          <Image
            source={require('../assets/icons/profile-icon.png')} // example icon
            style={styles.profileIcon}
          />
        </View>
      </View>

      {/* Deck Swiper */}
      <View style={styles.swiperContainer}>
        <Swiper
            cardStyle={{ marginTop: 0 }}
            cardVerticalMargin={0}      
            ref={swiperRef}
            cards={gigsData}
            renderCard={renderCard}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            cardIndex={0}
            backgroundColor={'#fff'}
            stackSize={3}
            infinite={false}
            showSecondCard={true}
            onTapCard={(cardIndex) => onTapCard(cardIndex)}
        />
      </View>

      <TabBar />
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
  // Swiper
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  // Card
  card: {
    flex: 1,
    // width: 353,
    // height: 650,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
});
