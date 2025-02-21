import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { api } from "../../src/services/index";
import { jwtDecode } from "jwt-decode";

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
          console.log("Decoded token:", decodedToken);
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
  

      const employer_profileData = { 
        //client_id auto generated
        created_at: new Date().toISOString(),
        user_id: userId,
        company_name: companyName, 
        company_description: description,
        //company_rating is out of 5
        company_rating: 0,
        //dont' worry about this number
        individual_ratings:0
      };
      //calling api
      const profileData_id = {
        id: userId
      }

      //have to setup base profile schema before the employer schema can reference it
      const profiles_response = await api.post("/profiles/", profileData_id);
      //once profiles id is set, the employers table can reference the profile id
     const employers_response = await api.post("/employers/", employer_profileData);

      await AsyncStorage.setItem("clientProfile", JSON.stringify(employer_profileData));

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
