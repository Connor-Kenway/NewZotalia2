// app/auth/index.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signIn } from "../../src/services/authService";

export default function AuthIndex() {
  const router = useRouter();

  // Local state for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-In logic
  const handleSignIn = async () => {
    // 1. Validate email & password
    // 2. Make API call to sign in (or check credentials)
    // 3. Navigate to the appropriate homepage
    try {
        const response = await signIn({ email, password });
        // setMessage(response.message);
        } catch (error) {
        //setMessage('Sign up failed');
        }

    if (email === "gig@worker.com") {
      router.replace("/gig-worker/gigworker-homepage");
    } else {
      router.replace("/client/client-homepage");
    }
  };

  // Navigate to sign-up page
  const handleSignUp = () => {
    router.push("/auth/sign-up");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.signupText, { color: "blue", marginLeft: 5 }]}>
            Sign Up
          </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  input: {
    width: "80%",
    maxWidth: 300,
    padding: 12,
    fontSize: 16,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  signInButton: {
    marginTop: 15,
    width: 120,
    height: 45,
    borderRadius: 8,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#333",
  },
});
