import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import PageHeader from "@/app/reusableComponents/PageHeader";
import { AuthContext } from "@/app/providers/AuthProvider";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import EmptyPage from "@/app/reusableComponents/EmptyPage";
import LoadingProducts from "@/app/reusableComponents/LoadingProducts";

const Favourites = () => {
  const { user } = useContext(AuthContext) as { user: any };
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle favourite
  const handleGetFavourite = async (email: any) => {
    const response = await axios.get(
      `https://brew-haven-server.onrender.com/favourite/${email}`
    );
    setProducts(response.data);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (user && user.email) {
          try {
            await handleGetFavourite(user.email); // Call function to fetch cart data
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        }
      };

      fetchData();
    }, [user])
  );

  // Interface for typescript error
  interface ProductDetails {
    _id?: string;
    name: string;
    email: string;
    size: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity: number;
    title: string;
    rating: number;
    ratingCount: number;
    description: string;
  }

  return (
    <SafeAreaView className="">
      <ScrollView>
        {loading ? (
          <View className="min-h-screen bg-[#0C0F14]">
            <LoadingProducts />
          </View>
        ) : (
          <View className="bg-[#0C0F14] w-full">
            <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-[85%] mx-auto flex-1">
              <PageHeader
                headerTitle="Favourite"
                imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg"
              />
              {/* Favourite Items */}
              {Array.isArray(products) && products?.length > 0 ? (
                products.map((product: ProductDetails) => (
                  <View className="" key={product._id}>
                    {/* Favourites Cards */}
                    <View className="card-container rounded-t-xl overflow-hidden my-3">
                      <ImageBackground
                        className="pt-16 h-[450px]"
                        source={{ uri: `${product?.imageUrl}` }}
                      >
                        <View className="flex-1 justify-end">
                          <View className="bg-[#0C0F14]/50 pb-3 pt-5 rounded-t-3xl">
                            <View className="w-[85%] mx-auto z-10">
                              {/* Coffee name, title, and icons */}
                              <View className="flex-row items-center justify-between">
                                <View>
                                  <Text className="text-white text-xl font-[600]">
                                    {product.name}
                                  </Text>
                                  <Text className="text-white capitalize]">
                                    {product.category}
                                  </Text>
                                </View>
                                <View className="flex-row gap-2 items-center">
                                  <View className="bg-black p-2 rounded-lg">
                                    <Feather
                                      name="coffee"
                                      color={"#D17842"}
                                      size={25}
                                    />
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

                              <View className="flex-row justify-between items-center mt-10">
                                <View className="flex-row gap-2 items-center">
                                  <AntDesign
                                    name="star"
                                    color={"#D17842"}
                                    size={25}
                                  />
                                  <Text className="text-white text-lg font-semibold">
                                    {product.rating}
                                  </Text>
                                  <Text className="text-white text-xs">
                                    ({product.ratingCount})
                                  </Text>
                                </View>
                                <View>
                                  <Text className="color-white bg-black text-sm px-3 py-1 rounded-lg">
                                    {product.category}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </ImageBackground>
                      <View className="bg-[#262B33] py-5 px-5 rounded-b-xl">
                        <Text className="text-[#AEAEAE] text-xl font-semibold">
                          Description
                        </Text>
                        <Text className="text-[#AEAEAE] mt-2 leading-loose">
                          {product.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <EmptyPage />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
