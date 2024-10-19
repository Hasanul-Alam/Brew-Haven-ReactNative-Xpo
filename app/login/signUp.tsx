import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../providers/AuthProvider";
import { UserCredential } from "firebase/auth";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import LoginSignUpButton from "../reusableComponents/LoginSignUpButton";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup, setUser, setError } = useContext(AuthContext);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Type userCredential as UserCredential
      const userCredential: UserCredential = await signup(email, password);

      if (userCredential?.user) {
        setUser(userCredential.user);
        setLoading(false); // userCredential.user now exists with proper type
        console.log("User credential:", userCredential);
        // Redirect to the homepage after successful signup
        router.replace("/home");
      }
    } catch (error: any) {
      // Add 'any' type to error for proper typing
      setError?.(error.message);
      setLoading(false);
      console.log("Error during signup:", error.code, error.message);
    }

    // Logging form input data (for debugging purposes)
    console.log("Name: ", name, "Email: ", email, "Password: ", password);
  };

  return (
    <View className="flex-1 bg-[#0C0F14] justify-center px-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View>
          <Text className="text-3xl text-white font-semibold text-center mb-10">
            Sign Up
          </Text>

          <TextInput
            className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
            placeholder="Enter Name"
            placeholderTextColor="#AEAEAE"
            keyboardType="default"
            autoCapitalize="words"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            className="bg-[#21262E] text-white px-4 py-3 rounded-lg my-2"
            placeholder="Email"
            placeholderTextColor="#AEAEAE"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            className="bg-[#21262E] text-white px-4 py-3 rounded-lg"
            placeholder="Password"
            placeholderTextColor="#AEAEAE"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          {/* SignUp Button */}
          <LoginSignUpButton buttonTitle="Sign Up" onPressFunction={handleSignUp} />

          <View className="flex-row justify-center mt-4">
            <Text className="text-[#AEAEAE] text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-[#D17842] text-sm">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
