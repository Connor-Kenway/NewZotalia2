import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useFinanceData } from "./hooks/finance/financeData";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const pieChartGraphic = require("../assets/images/gigworker-finance-pieChart.png"); 
const screenWidth = Dimensions.get("window").width;

const pastGigs = [
  { id: "1", name: "Gig A", income: 500 },
  { id: "2", name: "Gig B", income: 300 },
  { id: "3", name: "Gig C", income: 1200 },
];

function getColor(index) {
  const colors = ["#FF6666", "#FFA500", "#66BB6A", "#6A1B9A", "#FFD700"];
  return colors[index % colors.length];
}

export default function GigWorkerFinance() {


  const pieData = pastGigs.map((gig, index) => ({
    name: gig.name,
    cost: gig.income,
    color: getColor(index),
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const renderPastGig = ({ item }) => {
    return (
      <View style={styles.pastGigCard}>
      <Text style={styles.pastGigName}>{item.name}</Text>
        <Text style={styles.pastGigIncome}>${item.income}</Text>
      </View>
    );
  };

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
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"cost"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
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

      {/* Past Gigs Section */}
      <Text style={styles.suggestedTitle}>Past Gigs</Text>
      <FlatList
        data={pastGigs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderPastGig}
        contentContainerStyle={styles.suggestedList}
      />

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
  // Past gig card styles
  pastGigCard: {
    width: 150,
    height: 80,
    backgroundColor: "#f0f0f0",
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
  pastGigName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  pastGigIncome: {
    fontSize: 12,
    color: "#6A1B9A",
    fontWeight: "bold",
  },
});

