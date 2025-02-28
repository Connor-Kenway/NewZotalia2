import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useUser } from '../../src/context/UserContext'; // or wherever

// Import icons
const homeIcon = require('../assets/icons/home-icon.png');
const searchIcon = require('../assets/icons/search-icon.png');
const financeIcon = require('../assets/icons/finance-icon.png');
const messageIcon = require('../assets/icons/message-icon.png');
const profileIcon = require('../assets/icons/profile-icon.png');

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userType } = useUser() || {}; // e.g. "gig-worker" or "client"

  const tabs = getTabs(userType || "gig-worker");

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.path;
        const iconTintColor = isActive ? '#6A1B9A' : '#BDBDBD';

        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => router.push(tab.path)}
          >
            <Image source={tab.icon} style={[styles.icon]} />
            <Text style={[styles.label, { color: iconTintColor }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function getTabs(userType) {
  if (userType === "gig-worker") {
    return [
      { icon: searchIcon, path: '/gig-worker/gigworker-search', label: 'Search' },
      { icon: financeIcon, path: '/gig-worker/gigworker-finance', label: 'Finance' },
      { icon: homeIcon, path: '/gig-worker/gigworker-homepage', label: 'Home' },
      { icon: messageIcon, path: 'gig-worker/gigworker-message', label: 'Messages' },
      { icon: profileIcon, path: '/gig-worker/gigworker-profile', label: 'Profile' },
    ];
  } else {
    // client
    return [
      { icon: searchIcon, path: '/client/post-gig/client-gig-post', label: 'Search' },
      { icon: financeIcon, path: '/client/client-finance', label: 'Finance' },
      { icon: homeIcon, path: '/client/client-homepage', label: 'Home' },
      { icon: messageIcon, path: '/client/client-message', label: 'Messages' },
      { icon: profileIcon, path: '/client/client-profile', label: 'Profile' },
    ];
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});
