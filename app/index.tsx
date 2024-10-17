import { ScrollView, Text, View } from "react-native";
import Home from "./Home";
import Details from "./Details";
import Cart from "./Cart";
import Payment from "./Payment";
import Login from "./login";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#0C0F14]">
      <Login />
    </ScrollView>
  );
}
