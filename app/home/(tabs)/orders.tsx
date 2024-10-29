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
import axios from "axios";
import { AuthContext } from "@/app/providers/AuthProvider";
import { useFocusEffect } from "expo-router";
import EmptyPage from "@/app/reusableComponents/EmptyPage";

const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  const { user } = useContext(AuthContext) as { user: any };

  const handleGetData = async (email: any) => {
    const response = await axios.get(
      `https://brew-haven-server.onrender.com/orders/${email}`
    );
    setOrders(response.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (user && user.email) {
          try {
            await handleGetData(user.email);
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        }
      };

      fetchData();
    }, [user])
  );

  // Interfaces for typescript error
  interface Orders {
    productId: number;
    productName: string;
    price?: number;
    quantity?: number;
    date: string;
  }

  interface Order {
    _id: string;
    quantity: number;
    price: number;
    size: string;
    imageUrl: string;
    name: string;
  }

  interface Item {
    id: number;
    name: string;
    price?: number;
    quantity?: number;
    date: string;
  }

  // Function to group orders by date
  const groupByDate = (orders: any) => {
    return orders.reduce((groups: any, order: any) => {
      const { date } = order;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  };

  // Group the orders by date
  const groupedOrders = groupByDate(orders);

  return (
    <SafeAreaView className="bg-[#0C0F14]">
      <ScrollView>
        {orders.length ? (
          <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
            <View className="w-[85%] mx-auto">
              <Text className="text-3xl text-white mb-6">Order History</Text>

              {/* Render grouped orders by date */}
              {Object.keys(groupedOrders).map((date) => (
                <View key={date}>
                  {/* Date & Amount */}
                  <View className="flex-row justify-between items-center mb-3">
                    <View>
                      <Text className="text-white text-base font-semibold">
                        Order Date
                      </Text>
                      <Text className="text-white text-xs">{date}</Text>
                    </View>
                  </View>

                  {/* Render orders for this date */}
                  {groupedOrders[date].map((order: Order) => (
                    <View
                      key={order._id}
                      className="card-container mb-5 border border-1 border-[#D17842] py-3 px-2 rounded-xl"
                    >
                      {/* Main Card */}
                      <View className="bg-[#21262E] px-3 py-4 rounded-2xl">
                        <View className="flex-row justify-between items-center">
                          <View className="flex-row gap-x-5 items-center">
                            <View className="h-[57px] w-[57px] rounded-lg">
                              <Image
                                className="w-full h-full rounded-xl"
                                source={{
                                  uri: order.imageUrl,
                                }}
                              />
                            </View>
                            <View>
                              <Text className="text-base text-white font-semibold">
                                {order.name.length > 14
                                  ? order.name.slice(0, 14) + "..."
                                  : order.name}
                              </Text>
                              <Text className="text-xs text-white">
                                Size: {order.size}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text className="text-[#D17842] font-semibold text-xl">
                              ${" "}
                              <Text className="text-white">
                                {(order.price * order.quantity).toFixed(2)}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
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
        ) : (
          <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
            <View className="w-[85%] mx-auto">
              <EmptyPage />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
