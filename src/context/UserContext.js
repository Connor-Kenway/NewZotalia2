import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'gig-worker', 'client', or null
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null); // Boolean

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem("userType");
        console.log("Checking AsyncStorage for userType:", storedUserType);

        if (storedUserType) {
          setUserType(storedUserType);
          setIsFirstTimeUser(false);
          console.log("User type found:", storedUserType);
        } else {
          setIsFirstTimeUser(true);
          console.log("No user type found, setting as first-time user.");
        }
      } catch (error) {
        console.error("Failed to load userType from AsyncStorage", error);
      }
    };

    loadUserType();
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType, isFirstTimeUser, setIsFirstTimeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
