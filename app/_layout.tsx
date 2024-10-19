import { Slot, Redirect, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import AuthProvider from "./providers/AuthProvider";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   // Check login status from storage or API (for now, we'll keep it false initially)
  //   // You can integrate Firebase or AsyncStorage for persistence.
  //   const checkLoginStatus = async () => {
  //     // Fetch login state logic
  //   };
  //   checkLoginStatus();
  // }, []);

  if (!isLoggedIn) {
    return <Redirect href="/login" />; // If not logged in, redirect to login
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{headerShown: false}}>
//       <Stack.Screen name="index" options={{headerShown: false}}/>
//       <Stack.Screen name="home" options={{headerShown: false}}/>
//     </Stack>
//   );
// }
