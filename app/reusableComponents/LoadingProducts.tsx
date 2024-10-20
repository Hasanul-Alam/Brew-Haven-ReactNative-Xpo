import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingProducts = () => {
  return (
    <View className={`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
};

export default LoadingProducts;
