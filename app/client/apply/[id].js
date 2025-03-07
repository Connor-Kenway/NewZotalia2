// client/apply/[id].js
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const bookmarkIcon = require("../../assets/icons/bookmark-icon.png");

export default function WorkerProfile() {
  const { id, name, imageUri, description } = useLocalSearchParams();

  const handleAction = () => {
    console.log(`Client is taking action on worker ID: ${id}`);
    // e.g., call an API to request this worker
  };

  return (
    <View style={styles.container}>
      {/* Basic top bar */}
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>Home</Text>
      </View>

      <Text style={styles.sectionTitle}>About this Worker</Text>

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Bookmark */}
          <TouchableOpacity
            style={styles.bookmarkWrapper}
            onPress={() => console.log("Bookmark pressed")}
          >
            <Image source={bookmarkIcon} style={styles.bookmarkIcon} />
          </TouchableOpacity>

          {/* Worker profile image */}
          <View style={styles.profileCircle}>
            {/* If imageUri is a local require(...) object, do source={imageUri} */}
            <Image source={imageUri} style={styles.profileCircleImage} />
          </View>

          <Text style={styles.workerName}>
            {name || "Unnamed Worker"}
          </Text>

          <Text style={styles.description}>
            {description || "No description provided."}
          </Text>

          {/* Action button */}
          <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
            <Text style={styles.actionButtonText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Then style it similarly
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  navBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5f4b8b",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: "#333",
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    width: "90%",
    height: "70%",
    marginHorizontal: 20,
    backgroundColor: "#f4f0fa", // light purple
    borderRadius: 20,
    padding: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bookmarkWrapper: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 24,
    height: 24,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#5f4b8b",
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  profileCircleImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  workerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5f4b8b",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: "#5f4b8b",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
