import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { AnimateStyle } from "react-native-reanimated/lib/typescript/Animated";

const Details = () => {
  // States
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>("S");
  const [selectedPrice, setSelectedPrice] = useState(1);
  const [productId, setProductId] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const [successAlert, setSuccessAlert] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.category) {
      setProductCategory(
        Array.isArray(params.category) ? params.category[0] : params.category
      );
    }
    if (params.productId) {
      setProductId(
        Array.isArray(params.productId) ? params.productId[0] : params.productId
      );
    }
    if (productCategory && productId) {
      fetchData(productCategory as string, productId as string);
    }
  }, [params]);

  // Handle Fetch Data
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

  // handle back button
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

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

  const coffeeSizes = [
    {
      size: "S",
      times: 1,
    },
    {
      size: "M",
      times: 1.5,
    },
    {
      size: "L",
      times: 2,
    },
  ];

  const coffeeBeanSizes = [
    {
      size: "250g",
      times: 1,
    },
    {
      size: "500g",
      times: 2,
    },
    {
      size: "1kg",
      times: 4,
    },
  ];

  const handleSizeSelection = (size: string, type: string) => {
    setSelectedSize(size);
    type === "coffee" ? setCoffeeSize(size) : setBeanSize(size);
  };

  const setCoffeeSize = (size: string) => {
    if (size === "S") {
      setSelectedPrice(1);
    } else if (size === "M") {
      setSelectedPrice(1.5);
    } else if (size === "L") {
      setSelectedPrice(2);
    }
  };

  const setBeanSize = (size: string) => {
    if (size === "250g") {
      setSelectedPrice(1);
    } else if (size === "500g") {
      setSelectedPrice(2);
    } else if (size === "1kg") {
      setSelectedPrice(4);
    }
  };

  const sizesToMap =
    productCategory === "Beverages" ? coffeeSizes : coffeeBeanSizes;

  // Using interface to get rid off typescript error.
  interface ProductDetails {
    _id: string;
  }

  const handleAlert = () => {
    setSuccessAlert(true);
    // Hide alert after 2 seconds
    Animated.timing(slideAnim, {
      toValue: 100, // Slide down into view
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100, // Slide up out of view
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setSuccessAlert(false);
      });
    }, 2000);
  };

  const handleAddToCart = async (id: string, email: string) => {
    const mainPrice = productDetails?.price;
    const finalPrice = mainPrice ? (mainPrice * selectedPrice).toFixed(2) : 0;
    const data = {
      name: productDetails?.name,
      email: email,
      size: selectedSize,
      price: finalPrice,
      imageUrl: productDetails?.imageUrl,
      category: productDetails?.category,
      quantity: 1,
    };
    try {
      axios.post('http://192.168.1.6:3000/cart', data)
      .then(res => {
        if(res.data.insertedId){
          handleAlert();
        }
      })
      
    } catch (error: any) {
      setError(error.message);
    }
  };

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
              <View className={`flex-row justify-between items-center`}>
                {sizesToMap.map((item) => (
                  <Text
                    key={item.times}
                    className={`text-white font-semibold bg-[#52555A] px-10 rounded border-2 ${
                      selectedSize === item.size
                        ? "border-blue-500"
                        : "border-0"
                    } ${
                      sizesToMap === coffeeSizes ? "text-xl" : "text-xs py-2"
                    }`}
                    onPress={() =>
                      sizesToMap === coffeeSizes
                        ? handleSizeSelection(item.size, "coffee")
                        : handleSizeSelection(item.size, "beans")
                    }
                  >
                    {item.size}
                  </Text>
                ))}
              </View>
            </View>

            {/* Price */}
            <View className="flex-row items-center justify-between mt-8">
              <View>
                <Text className="text-[#AEAEAE] font-semibold">Price</Text>
                <Text className="text-[#FFFFFF] font-semibold text-xl">
                  <Text className="text-[#D17842]">$ </Text>
                  {productDetails?.price
                    ? (productDetails.price * selectedPrice).toFixed(2)
                    : "0.00"}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (
                    productDetails &&
                    productDetails._id &&
                    user &&
                    "email" in user
                  ) {
                    handleAddToCart(productDetails._id, user.email);
                  } else {
                    console.error(
                      "Either productDetails or user.email is not available."
                    );
                  }
                }}
                className="bg-[#D17842] px-10 py-2 rounded-lg"
              >
                <Text className="text-white text-xl">Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>

          {successAlert && (
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
                opacity: slideAnim.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [0, 1],
                }),
              }}
              className="absolute top-10 w-full bg-[#D17842]/80 py-3 px-5 rounded-lg items-center justify-center mx-auto"
            >
              <Text className="text-white text-lg font-semibold">
                Item added to cart!
              </Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
