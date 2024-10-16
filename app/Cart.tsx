import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";

const Cart = () => {
  return (
    <View className="bg-[#0C0F14] py-12 min-h-screen w-full">
      <View className="w-[85%] mx-auto">
        {/* Cart Header */}
        <View className="my-5">
          <View className="flex-row justify-between items-center w-full mx-auto">
            <View>
              <View className="bg-[#21262E] px-2 py-1 rounded-lg">
                <Octicons name="apps" color={"#ded9d9"} size={25} />
              </View>
            </View>
            <View>
              <Text className="text-2xl text-white font-semibold">Cart</Text>
            </View>
            <View className="w-[35px] h-[35px]">
              <Image
                className="w-full h-full rounded-xl"
                source={{
                  uri: "https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg",
                }}
              />
            </View>
          </View>
        </View>
        {/* Cart Card */}
        <View className="bg-[#262B33] mt-5 flex-row gap-x-2 py-3 px-1 rounded-xl w-full items-center">
          <Image
            className="w-[110px] h-[120px] rounded-xl"
            source={{ uri: "https://i.ibb.co.com/d085tCz/Details.png" }}
          />
          {/* Product Details */}
          <View>
            <Text className="text-white text-lg font-semibold">Cappuccino</Text>
            <Text className="text-white text-xs">With Steamed Milk</Text>
            {/* Size & Price */}
            <View className="flex-row justify-between my-3 items-center gap-x-8">
              <Text className="bg-[#0C0F14] text-white text-xl px-7 rounded">
                M
              </Text>
              <Text className="text-xl text-white">
                <Text className="text-[#D17842]">$</Text> 6.20
              </Text>
            </View>
            {/* Quantity & Increase Decrease Button */}
            <View className="flex-row justify-between gap-5 items-center">
              <View className="bg-[#D17842] p-1 rounded">
                <AntDesign
                  className="bg-[#D17842]"
                  color={"#FFFFFF"}
                  name="minus"
                  size={17}
                />
              </View>
              <TextInput
                className="border border-1 border-[#D17842] px-5 text-center rounded text-white"
                value="1"
              />
              <View className="bg-[#D17842] p-1 rounded">
                <AntDesign
                  className="bg-[#D17842]"
                  color={"#FFFFFF"}
                  name="plus"
                  size={17}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
