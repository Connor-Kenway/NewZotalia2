import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

// Dummy data for now (replace with your backend data)
const dummyGigs = [
  {
    id: "1",
    name: "Gig Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    payRate: "$32/hr",
  },
  {
    id: "2",
    name: "Gig Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    payRate: "$32/hr",
  },
  {
    id: "3",
    name: "Gig Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    payRate: "$32/hr",
  },
  // Add more items as needed
];

export default function GigSearch() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  // Filter button press
  const handleFilter = () => {
    // open filter modal or navigate to filter screen
    console.log("Filter pressed");
  };

  // Navigate to detailed gig listing
  const handleGigPress = (gigId) => {
    // e.g. router.push(`/gig-worker/detail/${gigId}`)
    // For now, just log
    console.log("Gig pressed, id:", gigId);
  };

  // Example filter logic (optional)
  const filteredGigs = dummyGigs.filter((gig) =>
    gig.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderGigItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.gigItem} onPress={() => handleGigPress(item.id)}>

        {/* Gig Info */}
        <View style={styles.gigInfo}>
          <Text style={styles.gigName}>{item.name}</Text>
          <Text style={styles.gigDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>

        {/* Pay Rate + Arrow */}
        <View style={styles.rightContainer}>
          <Text style={styles.payRate}>{item.payRate}</Text>
          <Text style={styles.arrow}>{">"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search gigs..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* List of Gigs */}
      <FlatList
        data={filteredGigs}
        keyExtractor={(item) => item.id}
        renderItem={renderGigItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  topBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6A1B9A",
  },
  filterText: {
    color: "#6A1B9A",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  gigItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#6A1B9A", // If you want the icon tinted
  },
  gigInfo: {
    flex: 1,
    marginRight: 8,
  },
  gigName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  gigDescription: {
    fontSize: 14,
    color: "#888",
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  payRate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 4,
  },
  arrow: {
    fontSize: 16,
    color: "#999",
  },
});
