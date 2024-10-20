import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "@/app/providers/AuthProvider";
import PageHeader from "@/app/reusableComponents/PageHeader";

const Cart = () => {

  const router = useRouter();

  return (
    <SafeAreaView className="bg-[#0C014]">
      <ScrollView>
        <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
          <View className="w-[85%] mx-auto">
            {/* Cart Header */}
            {/* <View className="my-5">
              <View className="flex-row justify-between items-center w-full mx-auto">
                <View>
                  <View className="bg-[#21262E] px-2 py-1 rounded-lg">
                    <Octicons name="apps" color={"#ded9d9"} size={25} />
                  </View>
                </View>
                <View>
                  <Text className="text-2xl text-white font-semibold">
                    Cart
                  </Text>
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
            </View> */}
            <PageHeader headerTitle="Cart" imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg" />

            {/* Cart Card */}
            <View className="bg-[#262B33] mt-5 flex-row gap-x-2 py-3 px-1 rounded-xl items-center">
              <Image
                className="w-[110px] h-[120px] rounded-xl"
                source={{ uri: "https://i.ibb.co.com/d085tCz/Details.png" }}
              />
              {/* Product Details */}
              <View>
                <Text className="text-white text-lg font-semibold">
                  Cappuccino
                </Text>
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

          {/* Bottom View */}
          <View className="flex-1 justify-end">
            <View className="w-[85%] mx-auto p-4 rounded-lg mt-5">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-[#AEAEAE] text-xs">Total Price</Text>
                  <View className="flex-row items-center">
                    <Text className="text-[#D17842] text-xl font-semibold">
                      ${" "}
                    </Text>
                    <Text className="text-white text-xl font-semibold">
                      32.65
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                  onPress={() => router.push('/home/payment')}
                    activeOpacity={0.8}
                    className="bg-[#D17842] px-16 py-2 rounded-full"
                  >
                    <Text className="text-white text-xl font-semibold">
                      Pay
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
