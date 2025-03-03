import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GigDetails() {
  const { gig } = useLocalSearchParams();
  console.log('new screen',gig)
  const gigData = JSON.parse(gig);
  console.log(gigData)
  console.log('gigdata title',gigData.title)
  console.log('gig data description',gigData.description)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gigData.title}</Text>
      <Text style={styles.description}>{gigData.description}</Text>
      <Text style={styles.location}>Location: {gigData.location.city}, {gigData.location.state}</Text>
      <Text style={styles.rate}>Rate: {gigData.payment_details.rate} {gigData.payment_details.type}</Text>
      <Text style={styles.status}>Status: {gigData.status}</Text>
      <Text style={styles.dates}>Start Date: {gigData.start_date}</Text>
      <Text style={styles.dates}>End Date: {gigData.end_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  rate: {
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  dates: {
    fontSize: 16,
    marginBottom: 10,
  },
});