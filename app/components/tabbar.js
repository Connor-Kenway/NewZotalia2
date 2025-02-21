import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

// Import icons as require statements or URIs:
const homeIcon = require('../assets/icons/home-icon.png');
const searchIcon = require('../assets/icons/search-icon.png');
const financeIcon = require('../assets/icons/finance-icon.png');
const messageIcon = require('../assets/icons/message-icon.png');
const profileIcon = require('../assets/icons/profile-icon.png');

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname(); // For active tab highlighting

  const tabs = [
    { icon: searchIcon, path: '/search', label: 'Search' },
    { icon: financeIcon, path: '/finance', label: 'Finance' },
    { icon: homeIcon, path: '/gig-worker/gigworker-homepage', label: 'Home' },
    { icon: messageIcon, path: '/messaging', label: 'Messages' },
    { icon: profileIcon, path: '/profile', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        // If you want active color for the current route:
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
    // Replace boxShadow with RN shadow + elevation
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
    // tintColor is set dynamically above if you want active/inactive color
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});
