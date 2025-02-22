import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useUser } from '../../src/context/UserContext';
import { useRouter } from 'expo-router';

export default function SwitchRoleButton() {
  const { userType, setUserType } = useUser();
  const router = useRouter();

  const handleSwitch = () => {
    const newType = userType === "client" ? "gig-worker" : "client";
    setUserType(newType);

    if (newType === "gig-worker") {
      router.replace("/gig-worker/gigworker-homepage");
    } else {
      router.replace("/client/client-homepage");
    }
  };

  return (
    <TouchableOpacity onPress={handleSwitch}>
      <Text style={{ color: 'blue' }}>
        Switch to {userType === "client" ? "Gig Worker" : "Client"}
      </Text>
    </TouchableOpacity>
  );
}
