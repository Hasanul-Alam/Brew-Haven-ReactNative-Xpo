import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import PageHeader from "@/app/reusableComponents/pageHeader";

const Favourites = () => {
  return (
    <SafeAreaView className="bg-[#0C014]">
      <ScrollView>
        <View className="bg-[#0C0F14] pt-12 pb-5 min-h-screen w-full flex-1">
          <View className="w-[85%] mx-auto">
            {/* Favourites Header */}
            {/* <View className="my-5">
              <View className="flex-row justify-between items-center w-full mx-auto">
                <View>
                  <View className="bg-[#21262E] px-2 py-1 rounded-lg">
                    <Octicons name="apps" color={"#ded9d9"} size={25} />
                  </View>
                </View>
                <View>
                  <Text className="text-2xl text-white font-semibold">
                    Favourite
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
            <PageHeader headerTitle="Favourite" imageUrl="https://i.ibb.co.com/jGMVDW2/coffee-shop.jpg" />

            {/* Favourites Cards */}
            <View className="card-container rounded-t-xl overflow-hidden my-3">
              <ImageBackground
                className="pt-16 h-[450px]"
                source={{ uri: "https://i.ibb.co.com/d085tCz/Details.png" }}
              >
                <View className="flex-1 justify-end">
                  <View className="bg-[#0C0F14]/50 pb-3 pt-5 rounded-t-3xl">
                    <View className="w-[85%] mx-auto z-10">
                      {/* Coffee name, title, and icons */}
                      <View className="flex-row items-center justify-between">
                        <View>
                          <Text className="text-white text-3xl font-[600]">
                            Cappuccino
                          </Text>
                          <Text className="text-white capitalize]">
                            With Steamed Milk
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
                          <AntDesign name="star" color={"#D17842"} size={25} />
                          <Text className="text-white text-lg font-semibold">
                            4.5
                          </Text>
                          <Text className="text-white text-xs">(6,879)</Text>
                        </View>
                        <View>
                          <Text className="color-white bg-black text-sm px-3 py-1 rounded-lg">
                            Medium Roasted
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
                Cappuccino is a latte made with more foam than steamed milk,
                often with a sprinkle of cocoa powder or cinnamon on top.
              </Text>
              </View>
            </View>

            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
