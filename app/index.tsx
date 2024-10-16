import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

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

  if (isLoading) {
    // Show a loading spinner while checking login status
    return (
      <View className="flex-1 justify-center items-center bg-[#0C0F14]">
        <ActivityIndicator size="large" color="#D17842" />
      </View>
    );
  }

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to login page
    return <Redirect href="/login" />;
  }

  // If the user is logged in, redirect to the home page
  return <Redirect href="/home" />;
}

// import { ScrollView, Text, View } from "react-native";
// import Home from "./Home";
// import Details from "./Details";
// import Cart from "./Cart";
// import Payment from "./Payment";
// import Login from "./login";

// export default function Index() {
//   return (
//     <View className="flex-1 bg-[#0C0F14] justify-center">
//       <Login />
//     </View>
//   );
// }
