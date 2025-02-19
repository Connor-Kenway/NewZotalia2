import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../../api/index";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'gig-worker', 'client', or null
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null); // Boolean

  useEffect(() => {
    // Retrieve from AsyncStorage instead of localStorage
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
    //loading the token from async storage
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          setAuthToken(token);
          console.log("Token loaded and set:", token);
        }
      } catch (error) {
        console.error("Failed to load token from AsyncStorage", error);
      }
    };
   
    loadUserType();
    loadToken();
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType, isFirstTimeUser, setIsFirstTimeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
