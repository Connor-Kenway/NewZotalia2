import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { router, useRouter } from "expo-router";
import { GigWorkerProfile, gigWorkerProfileSetup } from "../../src/services/clientProfileService";
import Checkbox from 'expo-checkbox';
import { jwtDecode } from 'jwt-decode';
import { updateProfile } from "../../src/services/defaultProfileService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileName() {
    const rounter = useRouter()
    const [profileName, setProfileName] = useState('')
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
        const response = await updateProfile(userId, profileName);
        if (response.success === false) {
            console.error("Failed to set up gig worker profile:", response);
            alert("Failed to set up gig worker profile");
            return;
        }
        router.push("/gig-worker/gigworker-profile-info");
    }
 
        

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What's your preferred display name?</Text>
            <TextInput
                style={styles.input}
                placeholder="Profile Name"
                value={profileName}
                onChangeText={setProfileName}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
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
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#ff6961",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});