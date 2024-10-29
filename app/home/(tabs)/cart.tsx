import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { AuthContext } from "@/app/providers/AuthProvider";
import PageHeader from "@/app/reusableComponents/PageHeader";
import axios from "axios";
import EmptyPage from "@/app/reusableComponents/EmptyPage";

const Cart = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price
  const { user } = useContext(AuthContext) as { user: any };
  const router = useRouter();

  const handleGetProduct = async (email: string) => {
    const response = await axios.get(`https://brew-haven-server.onrender.com/cart/${email}`);
    setProducts(response.data);
    calculateTotalPrice(response.data);
  };

  // Calculate total price
  const calculateTotalPrice = (updatedProducts: ProductDetails[]) => {
    const total = updatedProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };

  // Handle quantity change
  const handleQuantityChange = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        if (action === "increase") {
          product.quantity += 1;
        } else if (action === "decrease" && product.quantity > 1) {
          product.quantity -= 1;
        }
      }
      return product;
    });
    setProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (user && user.email) {
          try {
            await handleGetProduct(user.email); // Call function to fetch cart data
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
  }

  return (
    <SafeAreaView className="bg-[#0C014]">
      <ScrollView>
        <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
          <View className="w-[85%] mx-auto">
            <PageHeader
              headerTitle="Cart"
              imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg"
            />

            {/* Cart Items */}
            {Array.isArray(products) && products?.length > 0 ? (
              products.map((product: ProductDetails) => (
                <View
                  key={product._id}
                  className="bg-[#262B33] mt-5 flex-row gap-x-2 py-3 px-1 rounded-xl items-center"
                >
                  <Image
                    className="w-[110px] h-[120px] rounded-xl"
                    source={{ uri: `${product.imageUrl}` }}
                  />
                  <View>
                    <Text className="text-white text-lg font-semibold">
                      {product.name}
                    </Text>
                    <Text className="text-white text-xs">
                      {product.category}
                    </Text>

                    {/* Size & Price */}
                    <View className="flex-row justify-between my-3 items-center gap-x-8">
                      <Text className="bg-[#0C0F14] text-white text-lg px-5 rounded">
                        {product.size}
                      </Text>
                      <Text className="text-xl text-white">
                        <Text className="text-[#D17842]">$</Text>{" "}
                        {(product.price * product.quantity).toFixed(2)}{" "}
                        {/* Update price based on quantity */}
                      </Text>
                    </View>

                    {/* Quantity & Buttons */}
                    <View className="flex-row justify-between gap-5 items-center">
                      <TouchableOpacity
                        className="bg-[#D17842] p-1 rounded"
                        onPress={() =>
                          handleQuantityChange(product._id!, "decrease")
                        }
                      >
                        <AntDesign color={"#FFFFFF"} name="minus" size={17} />
                      </TouchableOpacity>

                      <Text className="border border-1 border-[#D17842] px-6 py-1 text-center rounded text-white">
                        {product.quantity}
                      </Text>

                      <TouchableOpacity
                        className="bg-[#D17842] p-1 rounded"
                        onPress={() =>
                          handleQuantityChange(product._id!, "increase")
                        }
                      >
                        <AntDesign color={"#FFFFFF"} name="plus" size={17} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <EmptyPage />
            )}
          </View>

          {/* Bottom View */}
          <View
            className={`flex-1 justify-end ${
              Array.isArray(products) && products?.length ? "block" : "hidden"
            }`}
          >
            <View className="w-[85%] mx-auto p-4 rounded-lg mt-5">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-[#AEAEAE] text-xs">Total Price</Text>
                  <View className="flex-row items-center">
                    <Text className="text-[#D17842] text-xl font-semibold">
                      ${" "}
                    </Text>
                    <Text className="text-white text-xl font-semibold">
                      {totalPrice.toFixed(2)}{" "}
                      {/* Display the calculated total price */}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/home/payment",
                        params: {
                          cart: JSON.stringify(products),
                        },
                      })
                    }
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
