import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUser } from "../../src/context/UserContext";
import { signIn } from '../../api/auth';

export default function SignInClient() {
  const router = useRouter();
  const { setUserType, setIsFirstTimeUser } = useUser() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  if (!setUserType || !setIsFirstTimeUser) {
    console.error("Error: UserContext is not available!");
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Context not available</Text>
      </View>
    );
  }

  const handleSubmit = async () => {

    //new code inserted
    try {
        console.log(email)
        console.log(password)
      const response = await signIn({ email, password });
      // setMessage(response.message);
    } catch (error) {
      //setMessage('Sign up failed');


      return
    }
    
    // Store user as "client" and move to profile setup
    try {
      await AsyncStorage.setItem("userType", "client");
      setUserType("client");
    //   setIsFirstTimeUser(false);

      router.push("/client/client-profile-info");
    } catch (error) {

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign up as a <Text style={{ color: "red" }}>Client</Text>
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
