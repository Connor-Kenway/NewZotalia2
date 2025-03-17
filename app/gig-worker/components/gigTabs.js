import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const GigTabs = ({ pastGigs, currentGigs, pendingGigs }) => {
  const [activeTab, setActiveTab] = useState('pending');

  pastGigs = [
    { gig_id: 1, title: 'Website Redesign', date: '2023-01-15', description: 'Redesign the company website to improve user experience.' },
    { gig_id: 2, title: 'Mobile App Development', date: '2023-02-20', description: 'Develop a mobile app for our e-commerce platform.' },
    { gig_id: 3, title: 'SEO Optimization', date: '2023-03-10', description: 'Optimize the website for search engines to increase traffic.' },
    { gig_id: 4, title: 'Social Media Campaign', date: '2023-04-05', description: 'Create and manage a social media campaign for our new product launch.' }
  ];

  currentGigs = [
    { gig_id: 5, title: 'Backend API Development', date: '2023-05-01', description: 'Develop and maintain backend APIs for our web application.' },
    { gig_id: 6, title: 'UI/UX Design', date: '2023-06-15', description: 'Design the user interface and user experience for our new software product.' }
  ];

  pendingGigs = [
    { gig_id: 7, title: 'Content Writing', date: '2023-07-01', description: 'Write blog posts and articles for our company blog.' },
    { gig_id: 8, title: 'Graphic Design', date: '2023-08-10', description: 'Create graphics and visuals for our marketing materials.' }
  ];

  const renderGigItem = ({ item }) => (
    <View style={styles.gigItem}>
      <Text style={styles.gigTitle}>{item.title}</Text>
      <Text style={styles.gigDate}>{item.date}</Text>
      <Text style={styles.gigDescription}>{item.description}</Text>
    </View>
  );

  const getGigs = () => {
    switch (activeTab) {
      case 'past':
        return pastGigs;
      case 'current':
        return currentGigs;
      case 'pending':
        return pendingGigs;
      default:
        return [];
    }
  };

  const keyExtractor = (item, index) => {
    if (item.gig_id) {
      return item.gig_id.toString();
    } else if (item.id) {
      return item.id.toString();
    } else {
      return index.toString(); // Fallback to index if no id is present
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Gigs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            Current Gigs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
            Pending Gigs
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContent}>
        <FlatList
          data={getGigs()}
          renderItem={renderGigItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<Text style={styles.emptyText}>No {activeTab} gigs to display</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5A2C8F',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#5A2C8F',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  gigItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gigDate: {
    fontSize: 14,
    color: '#666',
  },
  gigDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    color: '#999',
    fontSize: 18, // Adjusted font size
    textAlign: 'center', // Center the text
    marginTop: 20, // Add some margin to the top
  }
});

export default GigTabs;