import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { api } from "../../src/services/index";
import { jwtDecode } from "jwt-decode";
import { employerProfileSetup, EmployerProfile} from "../../src/services/employerProfileService";

export default function ClientProfileInfo() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
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
  
  const handleSubmit = async () => {
    try {
      // Store details (in a real app, you might send to a backend)
      //as of now only this is passed into async local storage instead of
      //the entire employerprofile. maybe we can chaange later
      const employer_profile_data = {
        user_id: userId,
        company_name: companyName,
        company_description: description,
      };
      
      const employerProfile = new EmployerProfile(
        employer_profile_data.user_id,
        employer_profile_data.company_name,
        employer_profile_data.company_description
      );

      const response = await employerProfileSetup(employerProfile);
      if (!response.success) {
        console.error("Failed to set up employer profile:", response);
        alert("Failed to set up employer profile");
        return;
      }

      await AsyncStorage.setItem("clientProfile", JSON.stringify(employer_profile_data));

      // Navigate to the next screen
      router.push("/client/client-profile-pic");
    } catch (error) {
      console.error("Failed to store clientProfile in AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Company Name or Individual Name"
          value={companyName}
          onChangeText={setCompanyName}
          required
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Write short description about your company"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  form: {
    width: "80%",
    maxWidth: 300,
    marginTop: 10,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top", // Ensures text starts at top in Android
  },
  button: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
