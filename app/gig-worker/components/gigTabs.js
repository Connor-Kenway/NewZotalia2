import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const GigTabs = ({ pastGigs, currentGigs, pendingGigs }) => {
  const [activeTab, setActiveTab] = useState('pending');
  pastGigs = [{"gig_id":1,"title":"Past Gig 1","date":"2021-01-01","description":"random description"},
    {"gig_id":2,"title":"Past Gig 2","date":"2021-02-01","description":"random description"},
    {"gig_id":3,"title":"Past Gig 2","date":"2021-02-01","description":"random description"},
    {"gig_id":4,"title":"Past Gig 2","date":"2021-02-01","description":"random description"}
  ];
  currentGigs = [{"gig_id":3,"title":"Current Gig 1","date":"2021-03-01","description":"random description"},{"gig_id":4,"title":"Current Gig 2","date":"2021-04-01","description":"random description"}];
  pendingGigs = [{"gig_id":5,"title":"Pending Gig 1","date":"2021-05-01","description":"random description"},{"gig_id":6,"title":"Pending Gig 2","date":"2021-06-01","description":"random description"}];
  const renderGigItem = ({ item }) => (
    <View style={styles.gigItem}>
      <Text style={styles.gigTitle}>{item.title}</Text>
      <Text style={styles.gigDate}>{item.date}</Text>
      <Text style={styles.gigDate}>{item.start_date}</Text>
      <Text style={styles.gigDate}>{item.description}</Text>
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
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gigDate: {
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