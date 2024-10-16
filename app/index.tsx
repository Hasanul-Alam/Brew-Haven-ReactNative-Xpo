import { ScrollView, Text, View } from "react-native";
import Home from "./Home";
import Details from "./Details";

export default function Index() {
  return (
    <View className="flex-1 bg-[#0C0F14] min-h-screen">
        <Details />
    </View>
  );
}
