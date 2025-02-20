import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UploadProfile() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the gigworker-homepage
    router.push("/gig-worker/gigworker-homepage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.description}>
        <Text style={{ fontWeight: "bold" }}>Upload profile picture</Text> + write a short description
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00796B",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
