import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#D17842",
        tabBarInactiveTintColor: "#AEAEAE",
        tabBarStyle: {
          backgroundColor: "#0C0F14",
          borderTopWidth: 0,
          paddingTop: 0, // Padding for the top
          paddingBottom: 10, // Padding for the bottom
          height: 60, // Set height to ensure enough space
        },
        tabBarIcon: ({ focused, color }) => {
          const iconSize = 24; // Adjust icon size here
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          // Set icon name based on the route name
          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "favourite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "orders") {
            iconName = focused ? "checkmark-done" : "checkmark-done-outline";
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarLabel: () => null, // Hides the label
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="cart"
        options={{ headerShown: false, title: "Cart" }}
      />
      <Tabs.Screen
        name="favourite"
        options={{ headerShown: false, title: "Favourite" }}
      />
      <Tabs.Screen
        name="orders"
        options={{ headerShown: false, title: "Orders" }}
      />
    </Tabs>

    // My Previous Codes
    // <Tabs
    //   screenOptions= {{
    //     tabBarActiveTintColor: "#D17842",
    //     tabBarInactiveTintColor: "#AEAEAE",
    //     tabBarStyle: {
    //       backgroundColor: "#0C0F14",
    //       borderTopWidth: 0,
    //       paddingBottom: 10,
    //     },

    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{ headerShown: false, title: "Home" }}
    //   />
    //   <Tabs.Screen
    //     name="cart"
    //     options={{ headerShown: false, title: "Cart" }}
    //   />
    //   <Tabs.Screen
    //     name="favourite"
    //     options={{ headerShown: false, title: "Favourite" }}
    //   />
    //   <Tabs.Screen
    //     name="orders"
    //     options={{ headerShown: false, title: "Orders" }}
    //   />
    // </Tabs>
    
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
