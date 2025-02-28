import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { GigWorkerProfile, gigWorkerProfileSetup } from "../../src/services/clientProfileService";
import Checkbox from 'expo-checkbox';
import { TextInput } from "react-native-web";
import { jwtDecode } from 'jwt-decode';
export default function ProfileCategories() {
  const router = useRouter();
  //refactor this out
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const getUserId = async () => {
      console.log("Getting user ID from token...");
      try {
        const token = await AsyncStorage.getItem("access_token");
        console.log('pausing on the awiat')
        console.log(token)
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken.sub);
          setUserId(decodedToken.sub);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };
    getUserId();
  }, []);



  const handleNext = async () => {
    // Navigate to the upload-profile step\
    // try{

    //   //call this once you create  new gigWorkerProfile
    //   //the gigWorkerProfile instance does not exist yet
    //   const response = await gigWorkerProfileSetup(gigWorkerProfile);
    //   if (response.success===false) {
    //     console.error("Failed to set up gig worker profile:", response);
    //     alert("Failed to set up gig worker profile");
    //     return;
    //   }
    //   await asyncStorage.setItem("gig-workerProfile", JSON.stringify(gig_worker_profile_data));
    // }
    // catch (error) {
    // }
    router.push("/gig-worker/gigworker-profile-pic");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.description}>
        Select your job specialties and preferences
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00796B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
