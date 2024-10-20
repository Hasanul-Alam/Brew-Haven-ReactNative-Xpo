import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import LoadingSpinner from "./reusableComponents/LoadingSpinner";
import LoadingProducts from "./reusableComponents/LoadingProducts";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Simulating fetching login status from storage or API
    const checkLoginStatus = async () => {
      // Simulated delay (replace with your actual login check logic)
      setTimeout(() => {
        // Assume no user is logged in for now (update this logic)
        const loggedIn = false; // e.g., check AsyncStorage or Firebase Auth
        setIsLoggedIn(loggedIn);
        setIsLoading(false);
      }, 1000);
    };

    checkLoginStatus();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#0C0F14]">
      {isLoading ? (
        <LoadingSpinner />
        // <View>
        //   <ActivityIndicator size="large" color="#D17842" />
        // </View>
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
