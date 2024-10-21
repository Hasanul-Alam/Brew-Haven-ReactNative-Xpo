import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PageHeader from "@/app/reusableComponents/PageHeader";
import axios from "axios";
import LoadingProducts from "@/app/reusableComponents/LoadingProducts";
import { AuthContext } from "@/app/providers/AuthProvider";
import useAsyncStorage from "@/app/hooks/useAsyncStorage";

const Home = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [coffeeBeanData, setCoffeeBeanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useContext(AuthContext);
  const { loadData } = useAsyncStorage("user");

  useEffect(() => {
    const fetchData = async (productType: string) => {
      const url = `http://192.168.1.6:3000/${
        productType === "coffee" ? "all-coffee" : "all-coffee-bean"
      }`;
      try {
        const response = await axios.get(url);
        if (productType === "coffee") {
          setCoffeeData(response.data);
        } else {
          setCoffeeBeanData(response.data);
        }
      } catch (err) {
        // Assert error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
        console.log(user);
      }
    };

    fetchData("coffee");
    fetchData("coffee-bean");
  }, []);

  // Define Types of Each Item.
  interface Item {
    _id: string;
    name: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
  }

  // Render Item
  const renderItem = ({ item }: { item: Item }) => (
    <View className="bg-[#252A32] rounded-lg p-3 mx-3 mb-5">
      {loading ? (
        <LoadingProducts />
      ) : (
        <View>
          <Image
            source={{ uri: item.imageUrl }}
            className="w-[100px] h-[100px] rounded-lg"
          />
          <Text className="color-white mt-3 uppercase font-semibold">
            {item.name.length > 14 ? item.name.slice(0, 10) + "..." : item.name}
          </Text>
          <Text className="text-white text-xs">
            {item.title.length > 14
              ? item.title.slice(0, 10) + "..."
              : item.title}
          </Text>
          <View className="flex-row justify-between items-center mt-3">
            <Text className="text-white text-lg font-semibold">
              <Text className="text-[#D17842]">$ </Text>
              {item.price}
            </Text>
            <Text
              onPress={() => navigateToDetais(item._id, item.category)}
              className="bg-[#D17842] p-1 rounded text-white"
            >
              <AntDesign name="plus" />
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const router = useRouter();

  // Navigation function with id and category.
  const navigateToDetais = (productId: string, productCategory: string) => {
    router.push(
      `/home/details?productId=${productId}&category=${productCategory}`
    );
  };

  return (
    <SafeAreaView className="bg-[#0C0F14] w-full mx-auto min-h-screen">
      <ScrollView className="mt-14">
        <View className="w-full">
          {/* Header Top */}
          {/* <View className="flex-row justify-between items-center w-[85%] mx-auto">
            <View>
              <View className="bg-[#21262E] px-2 py-1 rounded-lg">
                <Octicons name="apps" color={"#ded9d9"} size={25} />
              </View>
            </View>
            <View className="w-[35px] h-[35px]">
              <Image
                className="w-full h-full rounded-xl"
                source={{
                  uri: "https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg",
                }}
              />
            </View>
          </View> */}
          <View className="w-[85%] mx-auto">
            <PageHeader
              headerTitle=""
              imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg"
            />
          </View>

          {/* Header Title */}
          <View className="w-[85%] mx-auto">
            <Text className="text-white text-4xl w-[80%] capitalize font-semibold my-10">
              Find the best coffe for you
            </Text>
          </View>

          {/* Search Tab */}
          <View className="flex-row bg-[#494c52] items-center px-3 py-2 rounded-lg w-[85%] mx-auto">
            <View className={`mr-2`}>
              <FontAwesome name="search" color={"#ffffff"} />
            </View>
            <TextInput
              placeholder="Search here"
              placeholderTextColor={"#FFFFFF"}
              className="color-white w-full"
            />
          </View>

          {/* Coffee Cards */}
          <View className="flex-1 pt-6 justify-end items-end">
            <View className="w-[95%]">
              <Text className="text-white ml-3 my-3 text-2xl font-semibold">
                Coffee
              </Text>
              {loading ? (
                <LoadingProducts />
              ) : (
                <FlatList
                  data={coffeeData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                />
              )}
            </View>
          </View>

          {/* Coffee Bean Cards */}
          <View className="flex-1 pt-6 justify-end items-end">
            <View className="w-[95%]">
              <Text className="text-white ml-3 mb-3 text-2xl font-semibold">
                Coffee Beans
              </Text>
              {loading ? (
                <LoadingProducts />
              ) : (
                <FlatList
                  data={coffeeBeanData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
