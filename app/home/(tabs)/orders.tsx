import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import PageHeader from "@/app/reusableComponents/pageHeader";

const Orders = () => {
  return (
    <SafeAreaView className="bg-[#0C014]">
      <ScrollView>
        <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
          <View className="w-[85%] mx-auto">
            {/* Order History Header */}
            {/* <View className="my-5">
              <View className="flex-row justify-between items-center w-full mx-auto">
                <View>
                  <View className="bg-[#21262E] px-2 py-1 rounded-lg">
                    <Octicons name="apps" color={"#ded9d9"} size={25} />
                  </View>
                </View>
                <View>
                  <Text className="text-2xl text-white font-semibold">
                    Order History
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
            <PageHeader headerTitle="Order History" imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg" />

            {/* Order History Card */}
            <View className="card-container mb-5 border border-1 border-[#D17842] py-3 px-2 rounded-xl">
              {/* Date & Amount */}
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-white text-base font-semibold">
                    Order Date
                  </Text>
                  <Text className="text-white text-xs">20th March 2024</Text>
                </View>
                <View>
                  <Text className="text-white text-base font-semibold">
                    Total Amount
                  </Text>
                  <Text className="text-[#D17842] text-xs text-right">
                    $ 74.40
                  </Text>
                </View>
              </View>

              {/* Main Card */}
              <View className="bg-[#21262E] px-3 py-4 rounded-2xl">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row gap-x-5 items-center">
                    <View className="h-[57px] w-[57px] rounded-lg">
                      <Image
                        className="w-full h-full rounded-xl"
                        source={{
                          uri: "https://i.ibb.co.com/d085tCz/Details.png",
                        }}
                      />
                    </View>
                    <View>
                      <Text className="text-base text-white font-semibold">
                        Cappuccino
                      </Text>
                      <Text className="text-xs text-white">
                        With Steamed Milk
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-[#D17842] font-semibold text-xl">
                      $ <Text className="text-white">37.20</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Order History Bottom Button */}
          <View className="flex-1 justify-end mb-3 w-[85%] mx-auto">
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-white bg-[#D17842] text-center text-xl py-2 rounded-xl">
                Download
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
