import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import TabBar from "../components/tabbar";

const pieChartGraphic = require("../assets/images/gigworker-finance-pieChart.png"); 

export default function GigWorkerFinance() {
  // Example suggested gigs (dummy)
  const suggestedGigs = [
    { id: "1", title: "I need a website coded!", price: "$1000" },
    { id: "2", title: "I need a chatbot implemented", price: "$500" },
    { id: "3", title: "I need an animation!", price: "$750" },
  ];

  const renderSuggestedGig = ({ item }) => {
    return (
      <View style={styles.suggestedGigCard}>
        <Text style={styles.suggestedGigTitle}>{item.title}</Text>
        <Text style={styles.suggestedGigPrice}>{item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header / Title */}
      <Text style={styles.title}>Your Finances</Text>

      {/* Pie Chart Placeholder */}
      <View style={styles.chartContainer}>
        <Image source={pieChartGraphic} style={styles.pieChartImage} />
      </View>

      {/* Earned Text */}
      <Text style={styles.earnedText}>You’ve earned $2000 this month!!!</Text>

      {/* Current Gig Card */}
      <View style={styles.currentGigCard}>
        <Text style={styles.currentGigTitle}>Current Gig: Programming</Text>
        <Text style={styles.currentGigDesc}>
          You’re earning $170 with this gig! You could be earning more to reach your goals
        </Text>
      </View>

      {/* Suggested Gigs */}
      <Text style={styles.suggestedTitle}>Suggested Gigs</Text>
      <FlatList
        data={suggestedGigs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderSuggestedGig}
        contentContainerStyle={styles.suggestedList}
      />

      {/* TabBar at the bottom */}
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, // Adjust if you have a header or safe area
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pieChartImage: {
    width: 200,
    height: 200,
    resizeMode: "contain", // or "cover", "stretch", etc.
    marginBottom: 10,
  },
  
  earnedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6A1B9A",
    textAlign: "center",
    marginBottom: 20,
  },
  currentGigCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  currentGigTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  currentGigDesc: {
    fontSize: 14,
    color: "#555",
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 20,
    marginBottom: 10,
  },
  suggestedList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  suggestedGigCard: {
    width: 150,
    height: 80,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestedGigTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  suggestedGigPrice: {
    fontSize: 12,
    color: "#6A1B9A",
    fontWeight: "bold",
  },
});

