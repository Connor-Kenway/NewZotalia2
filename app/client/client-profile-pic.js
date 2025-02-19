import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // For picking images from device library
import { useRouter } from "expo-router"; // Expo Router for navigation

export default function ClientProfilePic() {
  const router = useRouter();
  const [image, setImage] = useState(null);

  // Similar to handleImageChange in web, but uses expo-image-picker
  const pickImage = async () => {
    try {
      // Request permission & open image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        // result.assets is an array of selected images
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  };

  // Similar to handleSubmit in web
  const handleSubmit = () => {
    // In a real app, you might store the selected image URI in AsyncStorage or context
    router.push("/client/client-confirm"); // Navigate to confirm page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Picture</Text>

      {/* Button to pick an image */}
      <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
        <Text style={styles.pickButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      {/* Preview the selected image */}
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {/* Next step button */}
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
  pickButton: {
    marginBottom: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  pickButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    resizeMode: "cover",
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
