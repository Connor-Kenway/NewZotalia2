import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const bookmarkIcon = require("../../assets/icons/bookmark-icon.png");
const profilePicture = require("../../assets/images/JohnDoeProfile.png");

export default function GigApplication() {
  const { id, name, description } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleApply = () => {
    console.log(`Apply pressed for gig ID: ${id}`);
    setModalVisible(true);
  
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navBarText}>Home</Text>
      </View>

      <Text style={styles.sectionTitle}>About this Gig</Text>

      {/* Center the card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Bookmark icon top-right */}
          <TouchableOpacity
            style={styles.bookmarkWrapper}
            onPress={() => console.log("Bookmark pressed")}
          >
            <Image source={bookmarkIcon} style={styles.bookmarkIcon} />
          </TouchableOpacity>

          {/* Large circle for profile */}
          <View style={styles.profileCircle}>
            <Image source={profilePicture} style={styles.profileCircleImage} />
          </View>

          <Text style={styles.clientName}>
            {name || "Asset Management Inc."}
          </Text>

          <Text style={styles.description}>
            {description || ""}
          </Text>
          
          {/* Apply button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You have successfully applied!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => { setModalVisible(false); router.back(); }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    flexDirection: 'row',
    // a simple bottom border for clarity
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  navBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5f4b8b",
    marginLeft: 10,
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
    width: '90%',
    height: '70%',
    marginHorizontal: 20,
    backgroundColor: "#f4f0fa", // a light purple
    borderRadius: 20,
    padding: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    // optional shadow
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
    tintColor: "#5f4b8b", // optional to color the icon
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
  clientName: {
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
  applyButton: {
    backgroundColor: "#5f4b8b",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#5f4b8b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
