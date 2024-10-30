import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { View } from "react-native";
import LoadingSpinner from "./reusableComponents/LoadingSpinner";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const hideSplashScreen = async () => {
      // Wait for 2 seconds before checking login status
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();

      // Simulate fetching login status from storage or API
      const checkLoginStatus = async () => {
        setTimeout(() => {
          const loggedIn = false;
          setIsLoggedIn(loggedIn);
          setIsLoading(false);
        }, 1000);
      };

      checkLoginStatus();
    };

    hideSplashScreen();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#0C0F14]">
      {isLoading ? (
        <LoadingSpinner />
      ) : isLoggedIn ? (
        // If the user is logged in, redirect to the home page
        <Redirect href="/home" />
      ) : (
        // If the user is not logged in, redirect to login page
        <Redirect href="/login" />
      )}
    </View>
  );
}
