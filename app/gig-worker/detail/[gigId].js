import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function GigDetails() {
  const { gig } = useLocalSearchParams();
  const gigData = JSON.parse(gig);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      
      <ScrollView>
        {/* Job Card */}
        <View style={styles.jobCard}>
          {/* Bookmark Icon */}
          <TouchableOpacity style={styles.bookmarkContainer}>
            <Feather name="bookmark" size={24} color="#5C69A7" />
          </TouchableOpacity>
          
          {/* Job Title */}
          <Text style={styles.jobTitle}>{gigData.title}</Text>
          
          {/* Job Description */}
          <Text style={styles.jobDescription}>
            {gigData.description}
          </Text>
          
          {/* Job Details Container */}
          <View style={styles.detailsContainer}>
            {/* Location */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{gigData.location.city}, {gigData.location.state}</Text>
            </View>
            
            <View style={styles.divider} />
            
            {/* Rate */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Rate:</Text>
              <Text style={styles.detailValue}>{gigData.payment_details.rate} {gigData.payment_details.type}</Text>
            </View>
            
            <View style={styles.divider} />
            
            {/* Status */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={styles.detailValue}>{gigData.status}</Text>
            </View>
            
            <View style={styles.divider} />
            
            {/* Start Date */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>{gigData.start_date}</Text>
            </View>
            
            <View style={styles.divider} />
            
            {/* End Date */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>End Date:</Text>
              <Text style={styles.detailValue}>{gigData.end_date}</Text>
            </View>
          </View>
          
          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 50,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  jobCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#F6F7FF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E5F2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    paddingRight: 40, // To prevent overlap with bookmark icon
  },
  jobDescription: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    marginBottom: 30,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E5F2',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  detailValue: {
    fontSize: 15,
    color: '#555555',
    maxWidth: '60%',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E5F2',
    marginHorizontal: 20,
  },
  applyButton: {
    backgroundColor: '#5C9E9C',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});