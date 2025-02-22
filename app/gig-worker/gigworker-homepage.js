import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from '../components/tabbar';
import SwitchRoleButton from '../components/toggleUser';


const GigWorkerHomePage = () => {
  return (
    <View style={styles.container}>
        <SwitchRoleButton />
      <View style={styles.feedArea}>
        <View style={styles.placeholder}>
          <Text style={{ color: '#999' }}>Gig Worker Homepage</Text>
        </View>
      </View>
      <TabBar />
    </View>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  feedArea: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '70px', // Leave space for TabBar
    padding: '20px',
    backgroundColor: '#f8f8f8',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    height: '800px', // Just a tall placeholder
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default GigWorkerHomePage;
