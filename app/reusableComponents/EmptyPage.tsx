import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyPage = () => {
  return (
    <View className="min-h-screen justify-center items-center -mt-20">
      <View className="w-[100px] h-[100px]">
        <Image
          className="w-full h-full"
          source={{
            uri: `https://i.ibb.co.com/c1nRSwC/empty-page.gif`,
          }}
        />
        <Text className="text-white text-center text-xl font-semibold">
          Nothing Here
        </Text>
      </View>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({});
