import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUser } from "../../src/context/UserContext";
import { signUp,signIn } from "../../src/services/authService";

export default function SignUpClient() {
  const router = useRouter();
  const { setUserType, setIsFirstTimeUser } = useUser() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

//   if (!setUserType || !setIsFirstTimeUser) {
//     console.error("Error: UserContext is not available!");
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Context not available</Text>
//       </View>
//     );
//   }

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        const response = await signUp({ email, password });
        // setMessage(response.message);
        
      } catch (error) {
        //setMessage('Sign up failed');
      }
      console.log(email, password)
      const sign_in_response = await signIn({ email, password} );
    router.push("auth/choose-account");

    // // Store user as "client" and move to profile setup
    // try {
    //   await AsyncStorage.setItem("userType", "client");
    //   setUserType("client");
    //   setIsFirstTimeUser(false);

    //   router.push("/client/client-profile-info");
    // } catch (error) {
    //   console.error("Failed to set userType in AsyncStorage", error);
    // }
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "green" }}>Sign Up Now</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleSignIn}>
                <Text style={[styles.signupText, { color: "blue", marginLeft: 5}]}>Sign In
                </Text>
            </TouchableOpacity>
        </View>
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
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  signinContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
