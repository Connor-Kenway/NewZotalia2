// app/client/client-post-gig-confirm.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function ClientPostGigConfirm() {
  const router = useRouter();

  const handleConfirm = () => {
    // Possibly call an API to create the gig
    console.log("Gig created!");
    // Then navigate to a success page or home
    router.replace("/client/client-homepage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review and Confirm</Text>
      <Text style={styles.subtitle}>Check all your gig details. Ready to post?</Text>

      {/* You can display a summary of the user’s input here if you stored it in context or local state */}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6666",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#ff6666",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
  },
});
