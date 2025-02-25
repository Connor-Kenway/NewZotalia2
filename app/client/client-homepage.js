import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from '../components/tabbar';
import SwitchRoleButton from '../components/toggleUser';

export default function GigWorkerHomePage() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  feedArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
