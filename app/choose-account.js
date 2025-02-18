import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUser } from "../src/context/UserContext";

export default function ChooseAccount() {
  const router = useRouter();
  const { setUserType, setIsFirstTimeUser } = useUser() || {};

  if (!setUserType || !setIsFirstTimeUser) {
    console.error("Error: UserContext is not available!");
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Context not available</Text>
      </View>
    );
  }

  const handleSelection = async (type) => {
    console.log(`User selected: ${type}`);
    try {
      await AsyncStorage.setItem("userType", type);
      setUserType(type);
      setIsFirstTimeUser(false);

      if (type === "gig-worker") {
        router.replace("/gig-worker/signup");
      } else {
        router.replace("/client/profile-setup");
      }
    } catch (error) {
      console.error("Failed to store userType in AsyncStorage", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.optionBox, { backgroundColor: "#e0f7fa" }]}
        onPress={() => handleSelection("gig-worker")}
      >
        <Text style={[styles.optionTitle, { color: "#00796B" }]}>
          Sign up as a <Text style={styles.bold}>Gig Worker</Text>
        </Text>
        <Text style={styles.optionText}>"I am looking for gigs"</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionBox, { backgroundColor: "#ffebee" }]}
        onPress={() => handleSelection("client")}
      >
        <Text style={[styles.optionTitle, { color: "#D32F2F" }]}>
          Sign up as a <Text style={styles.bold}>Client</Text>
        </Text>
        <Text style={styles.optionText}>"I am looking to hire gig workers"</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  optionBox: {
    width: "90%",
    maxWidth: 300,
    padding: 20,
    borderRadius: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
