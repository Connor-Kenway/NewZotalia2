import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import TabBar from "../components/tabbar";

export default function ClientFinance() {
  // Dummy data for ongoing gigs
  const ongoingGigs = [
    { id: "1", title: "Website Revamp", cost: "$1200", description: "Redesign the landing page" },
    { id: "2", title: "Mobile App QA", cost: "$800", description: "Testing and bug fixes" },
  ];

  // Dummy data for past gigs
  const pastGigs = [
    { id: "3", title: "Logo Design", cost: "$300", description: "Created a new brand logo" },
    { id: "4", title: "SEO Optimization", cost: "$500", description: "Improved site ranking" },
  ];

  const renderGigItem = ({ item }) => (
    <View style={styles.gigItem}>
      <Text style={styles.gigTitle}>{item.title}</Text>
      <Text style={styles.gigCost}>{item.cost}</Text>
      <Text style={styles.gigDescription} numberOfLines={1}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Finances</Text>

      {/* Ongoing Gigs Section */}
      <Text style={styles.sectionHeader}>Ongoing Gigs</Text>
      <FlatList
        data={ongoingGigs}
        keyExtractor={(item) => item.id}
        renderItem={renderGigItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Past Gigs Section */}
      <Text style={styles.sectionHeader}>Past Gigs</Text>
      <FlatList
        data={pastGigs}
        keyExtractor={(item) => item.id}
        renderItem={renderGigItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, // or use SafeAreaView
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginLeft: 16,
    marginBottom: 8,
  },
  gigItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  gigCost: {
    fontSize: 14,
    color: "#6A1B9A",
    fontWeight: "bold",
    marginBottom: 4,
  },
  gigDescription: {
    fontSize: 12,
    color: "#777",
  },
});
