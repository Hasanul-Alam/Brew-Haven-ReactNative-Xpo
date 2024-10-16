import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const Details = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-[#0C0F14] pb-10">
        <ImageBackground
          className="pt-16 min-h-[70%] cover"
          source={{ uri: "https://i.ibb.co.com/d085tCz/Details.png" }}
        >
          <View className="flex-1 justify-between">
            {/* Back and favorite icons */}
            <View className="w-[85%] mx-auto">
              <View className="justify-between items-center flex-row">
                <Text className="text-white bg-[#21262E] p-1 rounded-lg">
                  <Ionicons name="chevron-back" size={25} />
                </Text>
                <Text className="text-white bg-[#21262E] p-1 rounded-lg">
                  <MaterialIcons name="favorite-border" size={25} />
                </Text>
              </View>
            </View>
            <View className="bg-[#0C0F14]/50 pb-10 pt-5 rounded-t-3xl">
              <View className="w-[85%] mx-auto z-10">
                {/* Coffee name, title and icons */}
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white text-3xl font-[600]">
                      Cappuccino
                    </Text>
                    <Text className="text-white capitalize]">
                      With Steamed Milk
                    </Text>
                  </View>
                  <View className="flex-row gap-2 items-center">
                    <View className="bg-black p-2 rounded-lg">
                      <Feather name="coffee" color={"#D17842"} size={25} />
                    </View>
                    <View className="bg-black p-2 rounded-lg">
                      <MaterialIcons
                        name="water-drop"
                        color={"#D17842"}
                        size={25}
                      />
                    </View>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-6">
                  <View className="flex-row gap-2 items-center">
                    <AntDesign name="star" color={"#D17842"} size={25} />
                    <Text className="text-white text-lg font-semibold">
                      4.5
                    </Text>
                    <Text className="text-white text-xs">(6,879)</Text>
                  </View>
                  <View>
                    <Text className="color-white bg-black text-sm px-3 py-1 rounded-lg">
                      Medium Roasted
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Description */}
        <View className="w-[85%] mx-auto py-6">
          {/* Description */}
          <View>
            <Text className="text-[#AEAEAE] text-xl font-semibold">
              Description
            </Text>
            <Text className="text-[#AEAEAE] mt-2 leading-loose">
              Cappuccino is a latte made with more foam than steamed milk, often
              with a sprinkle of cocoa powder or cinnamon on top.
            </Text>
          </View>
          {/* Size */}
          <View>
            <Text className="text-[#AEAEAE] text-lg font-semibold">Size</Text>
            <View className="flex-row justify-between">
              <Text className="text-white text-xl font-semibold bg-[#52555A] px-10 rounded">
                S
              </Text>
              <Text className="text-white text-xl font-semibold bg-[#52555A] px-10 rounded">
                M
              </Text>
              <Text className="text-white text-xl font-semibold bg-[#52555A] px-10 rounded">
                L
              </Text>
            </View>
          </View>
          {/* Price */}
          <View className="flex-row items-center justify-between mt-8">
            <View>
              <Text className="text-[#AEAEAE] font-semibold">Price</Text>
              <Text className="text-[#FFFFFF] font-semibold text-xl">
                <Text className="text-[#D17842]">$ </Text>4.20
              </Text>
            </View>
            <View>
              <Text className="bg-[#D17842] text-white px-10 text-xl py-2 rounded-lg">
                Add to Cart
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
