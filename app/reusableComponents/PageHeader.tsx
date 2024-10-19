import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
type PageHeaderProps = {
  headerTitle: string;
  imageUrl: string;
};

const PageHeader = ({ headerTitle, imageUrl }: PageHeaderProps) => {
  return (
    <View className="my-5">
      <View className="flex-row justify-between items-center w-full mx-auto">
        <View>
          <View className="bg-[#21262E] px-2 py-1 rounded-lg">
            <Octicons name="apps" color={"#ded9d9"} size={25} />
          </View>
        </View>
        <View>
          <Text className="text-2xl text-white font-semibold">{headerTitle}</Text>
        </View>
        <View className="w-[35px] h-[35px]">
          <Image
            className="w-full h-full rounded-xl"
            source={{
              uri: `${imageUrl}`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({});
