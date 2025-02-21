import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // For picking images from device library
import * as ImageManipulator from "expo-image-manipulator"; // For compressing images
import { useRouter } from "expo-router"; // Expo Router for navigation
import { imageApi } from "../../src/services/index"; // Axios instance for API calls

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
  const compressImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Resize the image to a width of 800px
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image to 70% quality
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.error("Failed to compress image:", error);
      return uri; // Return the original URI if compression fails
    }
  };

  // Extract filename and MIME type from URI
  const getFileNameAndType = (uri) => {
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    return { filename, type };
  };

  // Similar to handleSubmit in web
  const handleSubmit = async () => {

    const compressedImageUri = await compressImage(image);
    const { filename, type } = getFileNameAndType(compressedImageUri);
    const formData = new FormData();
    formData.append("file", {
      uri: compressedImageUri,
      name: filename,
      type: type,
    });
    // In a real app, you might store the selected image URI in AsyncStorage or context
    try{
      console.log("Selected image:", image);
      const response = await imageApi.post("/profiles/upload-avatar", formData); // Send image to server
      console.log(response.data);
      router.push("/client/client-homepage"); // Navigate to confirm page
 
    }
    catch( error){
      console.error("Failed to upload image:", error);
    }
    

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
