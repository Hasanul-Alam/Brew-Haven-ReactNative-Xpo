import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // try {
    //   await login(email, password);
    //   console.log(user)
    // } catch (error) {
    //   setError(error.message)
    // }

    // Add your login logic here (e.g., Firebase Auth)
    // On successful login:
    router.replace("/home"); // Redirect to the homepage after login
  };

  // const navigateToSignUp = () => {
  //   router.push('/login/signUp' as const);
  // }

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      <Text className="text-3xl text-white font-semibold text-center mb-10">
        Login
      </Text>

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
        placeholder="Email"
        placeholderTextColor="#AEAEAE"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        className="bg-[#21262E] text-white px-4 py-3 rounded-lg mt-4"
        placeholder="Password"
        placeholderTextColor="#AEAEAE"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#D17842] py-4 rounded-lg mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-[#AEAEAE] text-sm">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login/signUp")}>
          <Text className="text-[#D17842] text-sm">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
