import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../providers/AuthProvider";
import { UserCredential } from "firebase/auth";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import LoginSignUpButton from "../reusableComponents/LoginSignUpButton";
import useAsyncStorage from "../hooks/useAsyncStorage";
// import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function Login() {
  const { setUser, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loadData, clearStorage } = useAsyncStorage("user");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Type userCredential as UserCredential
      const userCredential: UserCredential = await login(email, password);

      if (userCredential?.user) {
        setUser(userCredential.user);
        setLoading(false);

        // Redirect to the homepage after successfuly signup
        router.replace("/home");
      }
    } catch (error: any) {
      // Add 'any' type to error for proper typing
      setError?.(error.message);
      setLoading(false);
      console.log("Error during signup:", error.code, error.message);
    }
  };

  // Fetch Data From Async Storage.
  const fetchDataFromStorage = async () => {
    try {
      const dataFromStorage = await loadData();
      if (dataFromStorage.email) {
        router.push("/home");
      }
    } catch (error) {
      setError("Session Out Please Login");
    }
  };

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View>
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

          {/* Login Button */}
          <LoginSignUpButton
            buttonTitle={"Login"}
            onPressFunction={handleLogin}
          />

          <View className="flex-row justify-center mt-4">
            <Text className="text-[#AEAEAE] text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("/login/signUp")}>
              <Text className="text-[#D17842] text-sm">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
