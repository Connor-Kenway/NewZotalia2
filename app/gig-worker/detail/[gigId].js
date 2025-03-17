import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GigDetails() {
  const { gig } = useLocalSearchParams();
  const gigData = JSON.parse(gig);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleApplyPress = () => {
    // Simulate successful application
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    router.back();
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.headerTitle}>Home</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        {/* Job Card */}
        <View style={styles.jobCard}>
          {/* Bookmark Icon */}
          <TouchableOpacity style={styles.bookmarkContainer}>
            <Feather name="bookmark" size={24} color="#5C69A7" />
          </TouchableOpacity>
          
          {/* Job Title */}
          <Text style={styles.jobTitle}>{gigData.name}</Text>
          
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
              <Text style={styles.detailValue}>{gigData.payment_details.payRate} {gigData.payment_details.type}</Text>
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
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You have successfully applied!</Text>
            <Text style={styles.jobDescription}>The company will reach out shortly!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 87, 113, 0.4)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5C9E9C',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});