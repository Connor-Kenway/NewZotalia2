import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { useRouter } from "expo-router";
import { RadioButton } from 'react-native-paper';

export default function ProfileCategories() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [workType, setWorkType] = useState('');
  const [payRate, setPayRate] = useState('');
  const [shortTerm, setShortTerm] = useState(false);
  const [longTerm, setLongTerm] = useState(false);

  const handleNext = async () => {
    // Navigate to the upload-profile step
    router.push("/gig-worker/gigworker-profile-pic");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.description}>
        Select your job specialties and preferences
      </Text>

      <Text style={styles.label}>Category</Text>
      <RadioButton.Group onValueChange={value => setCategory(value)} value={category}>
        <View style={styles.radioButtonRow}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="AI" />
            <Text style={styles.radioButtonLabel}>AI</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="UI/UX" />
            <Text style={styles.radioButtonLabel}>UI/UX</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="Programming" />
            <Text style={styles.radioButtonLabel}>Programming</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="Animation" />
            <Text style={styles.radioButtonLabel}>Animation</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Work Type</Text>
      <RadioButton.Group onValueChange={value => setWorkType(value)} value={workType}>
        <View style={styles.radioButtonRow}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="In-person" />
            <Text style={styles.radioButtonLabel}>In-person</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="Remote" />
            <Text style={styles.radioButtonLabel}>Remote</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Minimum Pay Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter minimum pay rate"
        keyboardType="numeric"
        value={payRate}
        onChangeText={setPayRate}
      />

      <Text style={styles.label}>Work Duration</Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={shortTerm}
          onValueChange={setShortTerm}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Short-term</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={longTerm}
          onValueChange={setLongTerm}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Long-term</Text>
      </View>

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
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  radioButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
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
