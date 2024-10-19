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
import React, { useState } from "react";
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PageHeader from "@/app/reusableComponents/pageHeader";

const Home = () => {
  const DATA = [
    {
      id: "1",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "2",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "3",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "4",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "5",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "6",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
    {
      id: "7",
      title: "cappuccino",
      image: "https://i.ibb.co.com/MVfx4QJ/Group-10.png",
      description: "with steamed milk",
      price: 4.2,
    },
  ];

  // Define Types of Each Item.
  interface Item {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
  }

  // Render Item
  const renderItem = ({ item }: { item: Item }) => (
    <View className="bg-[#252A32] rounded-lg p-3 mx-3 mb-5">
      <Image
        source={{ uri: item.image }}
        className="w-[100px] h-[100px] rounded-lg"
      />
      <Text className="color-white mt-3 uppercase font-semibold">
        {item.title}
      </Text>
      <Text className="text-white text-xs">{item.description}</Text>
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-white text-lg font-semibold">
          <Text className="text-[#D17842]">$ </Text>
          {item.price}
        </Text>
        <Text
          onPress={navigateToDetais}
          className="bg-[#D17842] p-1 rounded text-white"
        >
          <AntDesign name="plus" />
        </Text>
      </View>
    </View>
  );

  const router = useRouter();

  const navigateToDetais = () => {
    router.push("/home/details");
  };

  return (
    <SafeAreaView className="bg-[#0C0F14] w-full mx-auto">
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
              <FlatList
                data={DATA} // Data source for the FlatList
                renderItem={renderItem} // Function to render each item
                keyExtractor={(item) => item.id} // Unique key for each item
                horizontal // Set the FlatList to be horizontal
                showsHorizontalScrollIndicator={true} // Show horizontal scroll indicator
              />
            </View>
          </View>

          {/* Coffee Bean Cards */}
          <View className="flex-1 pt-6 justify-end items-end">
            <View className="w-[95%]">
              <Text className="text-white ml-3 mb-3 text-2xl font-semibold">
                Coffee Beans
              </Text>
              <FlatList
                data={DATA} // Data source for the FlatList
                renderItem={renderItem} // Function to render each item
                keyExtractor={(item) => item.id} // Unique key for each item
                horizontal // Set the FlatList to be horizontal
                showsHorizontalScrollIndicator={true} // Show horizontal scroll indicator
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
