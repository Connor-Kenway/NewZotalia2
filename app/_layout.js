import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { Stack, usePathname } from "expo-router";
import { UserProvider } from "../src/context/UserContext";
import TabBar from "./components/tabbar";

export default function RootLayout() {
  const pathname = usePathname();

  // For example, hide TabBar on anything that includes "/message-chat"
  const hideTabBarRoutes = ["/gig-worker/gigworker-message-chat", "/client/client-message-chat"];
  const shouldHideTabBar = hideTabBarRoutes.some((route) => pathname.startsWith(route));

  return (
    <UserProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Stack screenOptions={{headerShown: false}} />
          {!shouldHideTabBar && <TabBar />}
        </View>
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
  },
});
