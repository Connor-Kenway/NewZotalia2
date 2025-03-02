import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function ClientPostGig() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/client/post-gig/client-post-gig-type");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new Gig Posting</Text>
      <Text style={styles.subtitle}>Let’s walk through some steps to post your new gig!</Text>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6666",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  nextButton: {
    backgroundColor: "#ff6666",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
});
