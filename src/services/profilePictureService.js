import { imageApi } from "../../src/services/index"; // Axios instance for API calls

const getFileNameAndType = (uri) => {
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    return { filename, type };
  };

c

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
      router.push("/client/client-homepage"); // Navigate to confirm page
    }
    catch( error){
      console.error("Failed to upload image:", error);
    }
  }