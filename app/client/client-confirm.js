import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ClientConfirm() {
  const router = useRouter();

  const handleNext = () => {
    // After confirmation, navigate to client-homepage
    router.push("/client/client-homepage");
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
