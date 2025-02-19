import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ClientHomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Client Homepage!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
