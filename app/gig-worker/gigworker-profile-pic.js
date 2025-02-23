import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // For picking images from device library

import { useRouter } from "expo-router"; // Expo Router for navigation
import { imageApi } from "../../src/services/index"; // Axios instance for API calls
import { uploadProfilePicture } from "../../src/services/profilePictureService";
import ProfilePicture from "../../components/ProfilePicture"; // Import the ProfilePicture component

export default function ClientProfilePic() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      console.log("Selected image:", image);
      const response = await uploadProfilePicture(image); // Send image to server
      console.log(response.data);
      if (response.success === false) {
        console.error("Failed to upload gig worker profile picture", response);
        alert("Failed to set up gig worker profile");
        return;
      }
      router.push("/gig-worker/gigworker-homepage");
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Picture</Text>

      <ProfilePicture onImagePicked={setImage} /> {/* Use the ProfilePicture component */}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
