import { imageApi } from "../../src/services/index"; // Axios instance for API calls
import * as ImageManipulator from "expo-image-manipulator"; // For compressing images
const getFileNameAndType = (uri) => {
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    return { filename, type };
  };

const compressImage = async (uri) => {
    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], 
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } 
        );
        return manipulatedImage.uri;
    } catch (error) {
        console.error("Failed to compress image:", error);
        return uri; 
    }
};

export const uploadProfilePicture = async (image) => {
    const compressedImageUri = await compressImage(image);
    const { filename, type } = getFileNameAndType(compressedImageUri);
    const formData = new FormData();
    formData.append("file", {
      uri: compressedImageUri,
      name: filename,
      type: type,
    });
    try{
      console.log("Selected image:", image);
      const response = await imageApi.post("/profiles/upload-avatar", formData); // Send image to server
      console.log(response.data);
      return response.data
    }
    catch( error){
      console.error("Failed to upload image:", error);
      return { success: false, message: 'Failed to upload employer profile', error: error.message };
    }
  }