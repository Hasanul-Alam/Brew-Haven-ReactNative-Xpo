import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Payment = () => {
  const router = useRouter();
  const { cart } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<CartItem[]>([]);

  const cartItems = typeof cart === "string" ? JSON.parse(cart) : cart || [];

  // Interface to avoid typescript error
  interface CartItem {
    id: number;
    price: number;
    quantity: number;
  }

  interface Item {
    _id: any;
    name: string;
    date: string; // or Date if you're using Date objects
  }

  const makeOrdersData = (items: Item[]) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    const totalAmount = cartItems.reduce((accumulator: number, item: any) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    const itemsWithDate = items.map(({ _id, ...rest }) => ({
      ...rest,
      date: formattedDate,
    }));
    return itemsWithDate;
  };

  // handle clear cart
  const handleClearCart = async () => {
    if (user && "email" in user) {
      const response = await axios.delete(
        `https://brew-haven-server.onrender.com/cart/${user.email}`
      );
      if (response.data.deletedCount > 0) {
        alert("items deleted from cart");
      }
    } else {
      console.log("User is not defined or email is missing");
    }
  };

  const handlePayment = async () => {
    const data = await makeOrdersData(cartItems);
    if (data) {
      axios.post("https://brew-haven-server.onrender.com/orders", data).then((res) => {
        if (res.data.insertedCount) {
          handleClearCart();
          // alert("data inserted");
        }
      });
    }
  };

  return (
    <SafeAreaView className="bg-[#0C0F14] flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-[#0C0F14] py-12 w-full flex-1 min-h-screen">
          <View className="w-[85%] mx-auto">
            {/* Payment Header */}
            <View className="my-5">
              <View className="flex-row justify-between items-center w-full mx-auto">
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-[#21262E] p-1 rounded-lg"
                  >
                    <Ionicons
                      onPress={() => router.back()}
                      name="chevron-back"
                      color={"#ded9d9"}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text className="text-2xl text-white font-semibold">
                    Payment
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
            </View>

            {/* Credit Card */}
            <View className="border border-1 border-[#D17842] p-2 rounded-xl mb-5">
              <View className="bg-[#262B33] px-3 py-5 flex-1 justify-between h-[190px] rounded-xl">
                <View className="flex-row justify-between items-center">
                  <View className="w-[31] h-[24]">
                    <Image
                      className="w-full h-full"
                      source={{
                        uri: "https://i.ibb.co.com/W3BhTKd/credit-Card.png",
                      }}
                    />
                  </View>
                  <View className="w-[50] h-[17]">
                    <Image
                      className="w-full h-full"
                      source={{ uri: "https://i.ibb.co.com/g4nsVFW/Visa.png" }}
                    />
                  </View>
                </View>
                {/* Card Number */}
                <View>
                  <Text className="text-white text-center text-lg">
                    4521 9874 6354 7349
                  </Text>
                </View>
                {/* Card Bottom */}
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-white text-xs leading-3">
                      Card holder name
                    </Text>
                    <Text className="text-white text-lg font-semibold leading-5">
                      Hasanul Alam
                    </Text>
                  </View>
                  <View>
                    <Text className="text-white text-xs leading-3">
                      Expiry Date
                    </Text>
                    <Text className="text-white text-lg text-center font-semibold leading-5">
                      30/02
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Other Payment System */}
            <View className="">
              {/* Wallet */}
              <View className="flex-row justify-between bg-[#262B33] px-3 rounded-full items-center py-3 mt-8">
                <View className="flex-row gap-2">
                  <View className="w-[25px] h-[20px]">
                    <Image
                      className="w-full h-full"
                      source={{
                        uri: "https://i.ibb.co.com/CnwbTVg/Wallet.png",
                      }}
                    />
                  </View>
                  <Text className="text-white font-semibold">Wallet</Text>
                </View>
                <View>
                  <Text className="text-white">$ 23.65</Text>
                </View>
              </View>
              {/* Google Pay */}
              <View className="flex-row justify-between bg-[#262B33] px-3 rounded-full items-center py-3 mt-3">
                <View className="flex-row gap-2">
                  <View className="w-[25px] h-[20px]">
                    <Image
                      className="w-full h-full"
                      source={{
                        uri: "https://i.ibb.co.com/Tm0vbrH/Google-Play.png",
                      }}
                    />
                  </View>
                  <Text className="text-white font-semibold">Google Pay</Text>
                </View>
                <View>
                  <Text className="text-white">$ 680.96</Text>
                </View>
              </View>
              {/* Amazon Pay */}
              <View className="flex-row justify-between bg-[#262B33] px-3 rounded-full items-center py-3 mt-3">
                <View className="flex-row gap-2 items-center">
                  <View className="w-[25px] h-[20px]">
                    <Image
                      className="w-full h-full"
                      resizeMode="cover"
                      source={{
                        uri: "https://i.ibb.co.com/hHkt9F7/Amazon.png",
                      }}
                    />
                  </View>
                  <Text className="text-white font-semibold">Amazon Pay</Text>
                </View>
                <View>
                  <Text className="text-white">$ 525.32</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Button */}
          <View className="mt-5 w-[85%] mx-auto flex-1 justify-end">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePayment()}
            >
              <Text className="text-white text-center bg-[#D17842] py-2 text-xl rounded-xl">
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
