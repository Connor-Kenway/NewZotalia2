import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "../src/context/UserContext";

export default function RootIndex() {
  const { userType, isFirstTimeUser, isLoading } = useUser();
  console.log("index.js reading: userType: ", userType, "isFirstTimeUser: ", isFirstTimeUser);

  if (isLoading) {
    return null;
  }

  if (isFirstTimeUser) {
    return <Redirect href="/auth/choose-account" />;
  }

  if (userType === "gig-worker") {
    return <Redirect href="/gig-worker/gigworker-homepage" />;
  }

  if (userType === "client") {
    return <Redirect href="/client/client-homepage" />;
  }

  return <Redirect href="/auth/choose-account" />;
}
