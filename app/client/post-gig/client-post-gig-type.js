// app/client/client-post-gig-type.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const gigTypes = ["Programming", "AI", "Animation", "UI/UX"];

export default function ClientPostGigType() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(null);

  const handleNext = () => {
    // Pass the selected type to next screen if needed, or store in context
    router.push("/client/post-gig/client-post-gig-requirements");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What kind of gig is this?</Text>
      <View style={styles.list}>
        {gigTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.typeButtonSelected,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.typeButtonText,
                selectedType === type && styles.typeButtonTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6666",
    marginBottom: 20,
  },
  list: {
    width: "80%",
    marginBottom: 30,
  },
  typeButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  typeButtonSelected: {
    backgroundColor: "#ffe5e5",
  },
  typeButtonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  typeButtonTextSelected: {
    color: "#ff6666",
    fontWeight: "bold",
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
