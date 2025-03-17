import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

import TabBar from '../components/tabbar';
import { fetchGigs } from "../../src/services/gigService";

// Dummy data for now (replace with your backend data)
const gigs = [
  {
    gig_id: "1",
    name: "Startup Animation",
    description: "Looking for someone to creat a 2D animation for our startup...",
    payRate: "$45/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-20",
    end_date: "2025-03-21",
  },
  {
    gig_id: "2",
    name: "AI Chatbot Implementation",
    description: "Need a developer to implement an AI chatbot for our website...",
    payRate: "$22/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-22",
    end_date: "2025-03-23",
  },
  {
    gig_id: "3",
    name: "Boba Shop Menu UX Design",
    description: "Looking for a designer to create a modern and clean menu design...",
    payRate: "$80/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-24",
    end_date: "2025-03-25",
  },
  {
    gig_id: "4",
    name: "React Native Developer",
    description: "Need a developer to create a mobile app using React Native...",
    payRate: "$50/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-26",
    end_date: "2025-03-27",
  },
  {
    gig_id: "5",
    name: "Website Redesign",
    description: "Looking for a designer to redesign our website...",
    payRate: "$60/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-28",
    end_date: "2025-03-29",
  },
  {
    gig_id: "6",
    name: "Logo Design",
    description: "Need a designer to create a logo for our new business...",
    payRate: "$35/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-03-30",
    end_date: "2025-03-31",
  },
  {
    gig_id: "7",
    name: "React Developer",
    description: "Need a developer to create a web app using React...",
    payRate: "$45/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-04-01",
    end_date: "2025-04-02",
  },
  {
    gig_id: "8",
    name: "Social Media Manager",
    description: "Looking for someone to manage our social media accounts...",
    payRate: "$20/hr",
    location: {
      city: "San Francisco",
      state: "CA",
    },
    payment_details: {
      payRate: "$45",
      type: "hourly",
    },
    status: "open",
    start_date: "2025-04-03",
    end_date: "2025-04-04",
  },
  // Add more items as needed
];

export default function GigSearch() {
  const router = useRouter();
  // const [gigs, setGigs] = useState([]);
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   const loadGigs = async () => {
  //     console.log('hitting use effect')
  //     const response = await fetchGigs();
  //     console.log('after response')
  //     if (response.success !== false) {
  //       setGigs(response);
  //       // setFilteredGigs(response);
  //       console.log('success')
  //     } else {
  //       console.log('failed')
  //       console.error(response.message);
  //     }
  //   };

  //   loadGigs();
  // }, []);
  // Filter button press
  const handleFilter = () => {
    // open filter modal or navigate to filter screen
    console.log("Filter pressed");
  };

  // Navigate to detailed gig listing
  const handleGigPress = (gig) => {
    console.log('handle gig press', gig)
    router.push({
      pathname: `/gig-worker/detail/${gig.gig_id}`,
      params: { gig: JSON.stringify(gig) }
    });
    console.log("Gig pressed, id:", gig.gig_id);
  };

  // Example filter logic (optional)
  const filteredGigs = gigs.filter((gig) =>
    gig.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderGigItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.gigItem} onPress={() => handleGigPress(item)}>

        {/* Gig Info */}
        <View style={styles.gigInfo}>
          <Text style={styles.gigName}>{item.name}</Text>
          <Text style={styles.gigDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>

        {/* Pay Rate + Arrow */}
        <View style={styles.rightContainer}>
          <Text style={styles.payRate}>{item.category}</Text>
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
        keyExtractor={(item) => item.gig_id}
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
    paddingTop: 25,
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
    color: "#6A1B9A",

  },
});