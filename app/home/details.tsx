import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";

const Details = () => {
  // States
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (productCategory: string, productId: string) => {
      const url = `http://192.168.1.6:3000/${
        productCategory === "Beverages"
          ? `all-coffee/${productId}`
          : `all-coffee-bean/${productId}`
      }`;
      try {
        const response = await axios.get(url);
        setProductDetails(response.data);
      } catch (err) {
        // Assert error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData(category as string, id as string);
  }, []);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // Receive productId and category
  const params = useLocalSearchParams();
  const id = params.productId;
  const category = params.category;

  // Interface for typescript
  interface ProductDetails {
    description: string;
    name: string;
    category: string;
    imageUrl: string;
    rating: number;
    ratingCount: number;
    ratingsCount: number;
    price: number;
    title: string;
    favourite: boolean;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0C0F14] min-h-screen">
      <ScrollView>
        <View className="bg-[#0C0F14]">
          <ImageBackground
            className="pt-16 h-[500px] cover"
            source={{ uri: `${productDetails?.imageUrl}` }}
          >
            <View className="flex-1 justify-between">
              {/* Back and favorite icons */}
              <View className="w-[85%] mx-auto">
                <View className="justify-between items-center flex-row">
                  <Text
                    onPress={handleBack}
                    className="text-white bg-[#21262E] p-1 rounded-lg"
                  >
                    <Ionicons name="chevron-back" size={25} />
                  </Text>
                  <Text className="text-white bg-[#21262E] p-1 rounded-lg">
                    <MaterialIcons
                      name="favorite"
                      size={25}
                      color={productDetails?.favourite ? "#DC3535" : "#FFFFFF"}
                    />
                  </Text>
                </View>
              </View>

              <View className="bg-[#0C0F14]/50 pb-3 pt-5 rounded-t-3xl">
                <View className="w-[85%] mx-auto z-10">
                  {/* Coffee name, title, and icons */}
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-white text-2xl font-[600]">
                        {productDetails?.name}
                      </Text>
                      <Text className="text-white capitalize]">
                        {productDetails?.category}
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

                  <View className="flex-row justify-between items-center mt-10">
                    <View className="flex-row gap-2 items-center">
                      <AntDesign name="star" color={"#D17842"} size={25} />
                      <Text className="text-white text-lg font-semibold">
                        {productDetails?.rating}
                      </Text>
                      <Text className="text-white text-xs">
                        (
                        {productDetails?.ratingCount
                          ? productDetails?.ratingCount
                          : productDetails?.ratingsCount}
                        )
                      </Text>
                    </View>
                    <View>
                      <Text className="color-white bg-black text-sm px-3 py-1 rounded-lg">
                        {productDetails?.title?.slice(0, 14)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View className="w-[85%] mx-auto py-6">
            {/* Description */}
            <View>
              <Text className="text-[#AEAEAE] text-xl font-semibold">
                Details
              </Text>
              <Text className="text-[#AEAEAE] mt-2 leading-loose">
                {productDetails?.description}
              </Text>
            </View>

            {/* Size */}
            <View className="mt-4 mb-5">
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
                  <Text className="text-[#D17842]">$ </Text>
                  {productDetails?.price}
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
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
