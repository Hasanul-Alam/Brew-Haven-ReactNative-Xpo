import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Animated,
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
import Alert from "../reusableComponents/Alert";
import LoadingProducts from "../reusableComponents/LoadingProducts";

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
  const [alertVisible, setAlertVisible] = useState(false);

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
    const url = `https://brew-haven-server.onrender.com/${
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

  interface User {
    email: string;
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
    setAlertVisible(true);

    // Auto close the alert after 2.5 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 2500);
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
      axios
        .post("https://brew-haven-server.onrender.com/cart", data)
        .then((res) => {
          if (res.data.insertedId) {
            handleAlert();
          }
        });
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle favourite list
  const handleFavouriteList = async (data: any, isInsert: boolean) => {
    if (isInsert) {
      const response = await axios.post(
        "https://brew-haven-server.onrender.com/favourite",
        data
      );
      if (response.data.insertedId) {
        alert("Favourite inserted");
      }
    } else {
      const response = await axios.delete(
        `https://brew-haven-server.onrender.com/favourite/${data.id}`
      );
      if (response.data.deletedCount > 0) {
        alert("deleted successfully from favourite list");
      }
    }
  };

  // handle favourite
  const handleFavourite = async (product: any, email: any) => {
    const data = {
      id: product._id,
      name: product.name,
      category: product.category,
      rating: product.rating,
      ratingCount: product.ratingCount,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      email: email,
    };

    // Update favourite
    if (product.category === "Beverages") {
      const response = await axios.patch(
        `https://brew-haven-server.onrender.com/all-coffee/${product._id}`,
        { favourite: !product.favourite }
      );
      console.log(!product.favourite);
      if (!product.favourite === true && response.data.modifiedCount > 0) {
        handleFavouriteList(data, true);
        // console.log('add please')
      } else if (
        !product.favourite === false &&
        response.data.modifiedCount > 0
      ) {
        handleFavouriteList(data, false);
        // console.log('delete please')
      }
    } else {
      const response = await axios.patch(
        `https://brew-haven-server.onrender.com/all-coffee-bean/${product._id}`,
        { favourite: !product.favourite }
      );
      if (!product.favourite === true && response.data.modifiedCount > 0) {
        handleFavouriteList(data, true);
      } else if (
        !product.favourite === false &&
        response.data.modifiedCount > 0
      ) {
        handleFavouriteList(data, false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0C0F14] min-h-screen">
      <ScrollView>
        {loading ? (
          <View className="min-h-screen bg-[#0C0F14]">
            <LoadingProducts />
          </View>
        ) : (
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
                    <Text
                      onPress={() =>
                        handleFavourite(productDetails, (user as User).email)
                      }
                      className="text-white bg-[#21262E] p-1 rounded-lg"
                    >
                      <MaterialIcons
                        name="favorite"
                        size={25}
                        color={
                          productDetails?.favourite ? "#DC3535" : "#FFFFFF"
                        }
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
                <Text className="text-[#AEAEAE] text-lg font-semibold">
                  Size
                </Text>
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

            {/* Alert */}
            <Alert
              isVisible={alertVisible}
              onClose={() => setAlertVisible(false)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
