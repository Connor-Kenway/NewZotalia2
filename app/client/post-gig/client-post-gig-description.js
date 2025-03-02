// app/client/client-post-gig-description.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function ClientPostGigDescription() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const handleNext = () => {
    // Possibly store or pass description
    router.push("/client/post-gig/client-post-gig-confirm");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Description About This Gig</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a short description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 120,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
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
