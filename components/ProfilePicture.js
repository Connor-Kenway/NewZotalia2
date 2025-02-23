import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfilePicture = ({ onImagePicked }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        if (onImagePicked) {
          onImagePicked(selectedImage);
        }
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
        <Text style={styles.pickButtonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  pickButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
});

export default ProfilePicture;