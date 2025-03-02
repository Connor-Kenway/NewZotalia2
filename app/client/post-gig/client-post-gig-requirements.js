import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ClientPostGigRequirements() {
  const router = useRouter();

  // Pay Type: "payRate" or "inFull"
  const [payType, setPayType] = useState("payRate");

  // Expected hours (digits only) + error
  const [expectedHours, setExpectedHours] = useState("");
  const [hoursError, setHoursError] = useState(null);

  // Start/End date strings
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Control date pickers
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  // Type of Work (tags)
  const [workTags, setWorkTags] = useState([]);
  const availableTags = ["Website", "Chatbot", "Short Video", "Mobile App"];

  // Location type
  const [locationType, setLocationType] = useState("Remote");

  // ---- Digit-only validation for "Expected Hours" ----
  const handleHoursChange = (text) => {
    // If it matches digits only (including empty), no error
    if (/^\d*$/.test(text)) {
      setExpectedHours(text);
      setHoursError(null);
    } else {
      // Show an error
      setHoursError("Digits only");
    }
  };

  // ---- Date Picker Logic ----
  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);

  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);

  const handleConfirmStart = (date) => {
    // Format the date as needed
    const dateString = date.toISOString().split("T")[0]; // e.g. "2023-08-15"
    setStartDate(dateString);
    hideStartPicker();
  };

  const handleConfirmEnd = (date) => {
    const dateString = date.toISOString().split("T")[0];
    setEndDate(dateString);
    hideEndPicker();
  };

  const handleTagPress = (tag) => {
    if (workTags.includes(tag)) {
      setWorkTags(workTags.filter((t) => t !== tag));
    } else {
      setWorkTags([...workTags, tag]);
    }
  };

  const handleNext = () => {
    router.push("/client/post-gig/client-post-gig-description");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create a new Gig Posting</Text>
        <Text style={styles.subtitle}>
          Please fill out these details: pay type, hours, location, etc.
        </Text>

        {/* Pay Type */}
        <Text style={styles.sectionLabel}>Pay Type</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPayType("payRate")}
          >
            <View style={styles.radioOuter}>
              {payType === "payRate" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>Pay Rate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPayType("inFull")}
          >
            <View style={styles.radioOuter}>
              {payType === "inFull" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>In Full</Text>
          </TouchableOpacity>
        </View>

        {/* Expected Hours */}
        <Text style={styles.sectionLabel}>Expected Hours</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter numeric hours..."
          keyboardType="numeric"
          value={expectedHours}
          onChangeText={handleHoursChange}
        />
        {hoursError && <Text style={styles.errorText}>{hoursError}</Text>}

        {/* Duration of Contract */}
        <Text style={styles.sectionLabel}>Duration of Contract</Text>
        <View style={styles.durationRow}>
          {/* Start Date */}
          <TouchableOpacity
            style={[styles.input, styles.dateButton]}
            onPress={showStartPicker}
          >
            <Text style={styles.dateText}>
              {startDate ? startDate : "Start Date"}
            </Text>
          </TouchableOpacity>

          {/* End Date */}
          <TouchableOpacity
            style={[styles.input, styles.dateButton]}
            onPress={showEndPicker}
          >
            <Text style={styles.dateText}>
              {endDate ? endDate : "End Date"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal Date Pickers */}
        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="date"
          onConfirm={handleConfirmStart}
          onCancel={hideStartPicker}
        />
        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="date"
          onConfirm={handleConfirmEnd}
          onCancel={hideEndPicker}
        />

        {/* Type of Work (tags) */}
        <Text style={styles.sectionLabel}>Type of Work</Text>
        <View style={styles.tagsContainer}>
          {availableTags.map((tag) => {
            const isSelected = workTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  isSelected && styles.tagButtonSelected
                ]}
                onPress={() => handleTagPress(tag)}
              >
                <Text
                  style={[
                    styles.tagButtonText,
                    isSelected && styles.tagButtonTextSelected
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* In Person / Remote / Hybrid */}
        <Text style={styles.sectionLabel}>Work Location</Text>
        <View style={styles.radioRow}>
          {["In Person", "Remote", "Hybrid"].map((loc) => (
            <TouchableOpacity
              key={loc}
              style={styles.radioButton}
              onPress={() => setLocationType(loc)}
            >
              <View style={styles.radioOuter}>
                {locationType === loc && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Container + Scroll
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  // Title + Subtitle
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6666",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  // Section label
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 10,
  },
  // Radio row
  radioRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff6666",
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff6666",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
  },
  // Input
  input: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  // Duration row
  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  dateButton: {
    justifyContent: "center",
    width: "48%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    color: "#333",
  },
  // Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    width: "100%",
  },
  tagButton: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagButtonSelected: {
    backgroundColor: "#ffe5e5",
  },
  tagButtonText: {
    fontSize: 14,
    color: "#333",
  },
  tagButtonTextSelected: {
    color: "#ff6666",
    fontWeight: "bold",
  },
  // Next button
  nextButton: {
    backgroundColor: "#ff6666",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
});
