import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileCategories() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the upload-profile step
    router.push("/gig-worker/gigworker-profile-pic");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.description}>
        Select categories/interests looking to work in
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>→</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00796B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
