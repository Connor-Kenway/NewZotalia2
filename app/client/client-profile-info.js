import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { api } from "../../src/services/index";

export default function ClientProfileInfo() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);


  const handleSubmit = async () => {
    try {

      //getting profile_id to kink to employer table
      const profile_id = await api.get("/profiles").;
      // Store details (in a real app, you might send to a backend)
      const profileData = { 
        //client_id auto generated
        created_at: new Date().toISOString(),
        user_id: 
        company_name: companyName, 
        company_description: description,
        company_rating: 0,
        individual_ratings:0
      };
      //calling api
      console.log(api)
     const response = await api.post("/employers", profileData);
      cosole.log(response)

      await AsyncStorage.setItem("clientProfile", JSON.stringify(profileData));

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
